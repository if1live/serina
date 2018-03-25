package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"os/user"
	"path/filepath"
	"strings"

	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	drive "google.golang.org/api/drive/v3"
)

type gdrive struct {
	srv *drive.Service
}

// getClient uses a Context and Config to retrieve a Token
// then generate a Client. It returns the generated Client.
func getClient(ctx context.Context, config *oauth2.Config) *http.Client {
	cacheFile, err := tokenCacheFile()
	if err != nil {
		log.Fatalf("Unable to get path to cached credential file. %v", err)
	}
	tok, err := tokenFromFile(cacheFile)
	if err != nil {
		tok = getTokenFromWeb(config)
		saveToken(cacheFile, tok)
	}
	return config.Client(ctx, tok)
}

// getTokenFromWeb uses Config to request a Token.
// It returns the retrieved Token.
func getTokenFromWeb(config *oauth2.Config) *oauth2.Token {
	authURL := config.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	fmt.Printf("Go to the following link in your browser then type the "+
		"authorization code: \n%v\n", authURL)

	var code string
	if _, err := fmt.Scan(&code); err != nil {
		log.Fatalf("Unable to read authorization code %v", err)
	}

	tok, err := config.Exchange(oauth2.NoContext, code)
	if err != nil {
		log.Fatalf("Unable to retrieve token from web %v", err)
	}
	return tok
}

// tokenCacheFile generates credential file path/filename.
// It returns the generated credential path/filename.
func tokenCacheFile() (string, error) {
	usr, err := user.Current()
	if err != nil {
		return "", err
	}
	tokenCacheDir := filepath.Join(usr.HomeDir, ".credentials")
	os.MkdirAll(tokenCacheDir, 0700)
	return filepath.Join(tokenCacheDir,
		url.QueryEscape("drive-go-quickstart.json")), err
}

// tokenFromFile retrieves a Token from a given file path.
// It returns the retrieved Token and any read error encountered.
func tokenFromFile(file string) (*oauth2.Token, error) {
	f, err := os.Open(file)
	if err != nil {
		return nil, err
	}
	t := &oauth2.Token{}
	err = json.NewDecoder(f).Decode(t)
	defer f.Close()
	return t, err
}

// saveToken uses a file path to create a file and store the
// token in it.
func saveToken(file string, token *oauth2.Token) {
	fmt.Printf("Saving credential file to: %s\n", file)
	f, err := os.OpenFile(file, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0600)
	if err != nil {
		log.Fatalf("Unable to cache oauth token: %v", err)
	}
	defer f.Close()
	json.NewEncoder(f).Encode(token)
}

func newGdrive() *gdrive {
	ctx := context.Background()

	b, err := ioutil.ReadFile("client_secret.json")
	if err != nil {
		log.Fatalf("Unable to read client secret file: %v", err)
	}

	// If modifying these scopes, delete your previously saved credentials
	// at ~/.credentials/drive-go-quickstart.json
	config, err := google.ConfigFromJSON(b, drive.DriveScope)
	if err != nil {
		log.Fatalf("Unable to parse client secret file to config: %v", err)
	}
	client := getClient(ctx, config)

	srv, err := drive.New(client)
	if err != nil {
		log.Fatalf("Unable to retrieve drive Client %v", err)
	}

	return &gdrive{
		srv: srv,
	}
}

func (g *gdrive) mkdir(dirs string) ([]*drive.File, error) {
	srv := g.srv
	dirList := strings.Split(dirs, "/")

	founds := []*drive.File{}
	for _, dir := range dirList {
		queries := []string{
			"mimeType='application/vnd.google-apps.folder'",
			"trashed=false",
		}
		queries = append(queries, fmt.Sprintf("name='%s'", dir))
		if len(founds) > 0 {
			last := founds[len(founds)-1]
			queries = append(queries, fmt.Sprintf("'%s' in parents", last.Id))
		}

		list := srv.Files.List()
		for _, q := range queries {
			list = list.Q(q)
		}
		r, err := list.Fields("nextPageToken, files(id, name)").Do()
		if err != nil {
			return founds, err
		}

		if len(r.Files) == 0 {
			last := founds[len(founds)-1]
			file, err := srv.Files.Create(&drive.File{
				Name:     dir,
				MimeType: "application/vnd.google-apps.folder",
				Parents:  []string{last.Id},
			}).Fields("id").Do()
			if err != nil {
				return founds, err
			}
			founds = append(founds, file)

		} else if len(r.Files) == 1 {
			f := r.Files[0]
			founds = append(founds, f)

		} else {
			msg := fmt.Sprintf("multiple directory found: %s - %s", dir, dirs)
			return founds, errors.New(msg)
		}
	}
	return founds, nil
}

func (g *gdrive) upload(r io.Reader, f *drive.File, parent *drive.File) (*drive.File, error) {
	srv := g.srv

	res, err := srv.Files.List().
		Q(fmt.Sprintf("name='%s'", f.Name)).
		Q(fmt.Sprintf("'%s' in parents", parent.Id)).
		Fields("nextPageToken, files(id, name)").Do()
	if err != nil {
		return nil, err
	}

	if len(res.Files) == 0 {
		file, err := srv.Files.Create(&drive.File{
			Name:    f.Name,
			Parents: []string{parent.Id},
		}).Media(r).Do()
		if err != nil {
			return nil, err
		}
		return file, nil
	}

	// else..
	prev := res.Files[0]
	file, err := srv.Files.Update(prev.Id, &drive.File{
		Name: f.Name,
	}).Media(r).Do()
	if err != nil {
		return nil, err
	}
	return file, nil
}
