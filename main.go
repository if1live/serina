package serina

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path"
	"strconv"
	"strings"
	"time"

	"github.com/ChimeraCoder/anaconda"
	"github.com/gorilla/mux"
	drive "google.golang.org/api/drive/v3"
)

func responseErr(w http.ResponseWriter, err error, status int) {
	type ErrorResponse struct {
		Message string `json:"message"`
	}
	resp := ErrorResponse{
		Message: err.Error(),
	}
	data, _ := json.Marshal(resp)
	str := string(data)
	http.Error(w, str, status)
}

func getTweetID(r *http.Request) (int64, error) {
	vars := mux.Vars(r)
	tweetIDStr := vars["uid"]
	return strconv.ParseInt(tweetIDStr, 10, 64)
}

func dumpHandler(w http.ResponseWriter, r *http.Request) {
	tweetID, err := getTweetID(r)
	if err != nil {
		responseErr(w, err, http.StatusInternalServerError)
		return
	}

	tweet, err := api.GetTweet(tweetID, nil)
	if err != nil {
		responseErr(w, err, http.StatusInternalServerError)
		return
	}

	//w.Header().Set("Content-Type", "applicaiton/json")
	data, _ := json.Marshal(tweet)
	w.Write(data)
}

func fetchHandler(w http.ResponseWriter, r *http.Request) {
	tweetID, err := getTweetID(r)
	if err != nil {
		responseErr(w, err, http.StatusInternalServerError)
		return
	}

	tweet, err := fetchTweet(tweetID)
	if err != nil {
		responseErr(w, err, http.StatusInternalServerError)
		return
	}

	//w.Header().Set("Content-Type", "applicaiton/json")
	data, _ := json.Marshal(tweet)
	w.Write(data)
}

func uploadHandler(w http.ResponseWriter, r *http.Request) {
	tweetID, err := getTweetID(r)
	if err != nil {
		responseErr(w, err, http.StatusInternalServerError)
		return
	}

	tweet, err := fetchTweet(tweetID)
	if err != nil {
		responseErr(w, err, http.StatusInternalServerError)
		return
	}
	log.Printf("fetch tweet: %d", tweetID)

	// url 받는건 동시에 여러개 처리 가능
	type FetchResult struct {
		data  []byte
		media simpleMedia
		idx   int
	}
	fetchCh := make(chan FetchResult)
	for i, media := range tweet.Media {
		go func(index int, media simpleMedia) {
			resp, err := http.Get(media.URL)
			if err != nil {
				panic(err)
			}
			defer resp.Body.Close()
			log.Printf("fetch media [%d]: %s", index, media.URL)

			data, _ := ioutil.ReadAll(resp.Body)
			r := FetchResult{
				data:  data,
				media: media,
				idx:   index,
			}
			fetchCh <- r
		}(i, media)
	}

	gd := NewGDrive()
	now := time.Now()
	date := now.Format("2006-01-02")

	// prepare dir
	dirname := fmt.Sprintf("serina/%s", date)
	dirs, err := gd.Mkdir(dirname)
	if err != nil {
		responseErr(w, err, http.StatusInternalServerError)
		return
	}
	parent := dirs[len(dirs)-1]
	log.Printf("dirname : %s [%s]", dirname, parent.Id)

	// 구글 드라이브 업로드는 동시에 처리가능
	type UploadResult struct {
		file *drive.File
		err  error
	}
	uploadCh := make(chan UploadResult)

	go func() {
		// upload tweet json
		tweetData, _ := json.Marshal(tweet)
		jsonfile, err := gd.Upload(bytes.NewReader(tweetData), &drive.File{
			Name: fmt.Sprintf("%d.json", tweetID),
		}, parent)
		log.Printf("upload tweet: %s id=%s", jsonfile.Name, jsonfile.Id)

		if err != nil {
			uploadCh <- UploadResult{err: err}
		} else {
			uploadCh <- UploadResult{file: jsonfile}
		}
	}()

	// upload media
	for i := 0; i < len(tweet.Media); i++ {
		result := <-fetchCh
		order := result.idx + 1

		go func(order int, media simpleMedia, data []byte) {
			ext := path.Ext(strings.Replace(media.URL, ":orig", "", -1))
			filename := fmt.Sprintf("%d_%d%s", tweetID, order, ext)
			file, err := gd.Upload(bytes.NewReader(data), &drive.File{
				Name: filename,
			}, parent)
			log.Printf("upload media [%d]: %s id=%s", order, file.Name, file.Id)

			if err != nil {
				uploadCh <- UploadResult{err: err}
			} else {
				uploadCh <- UploadResult{file: file}
			}
		}(order, result.media, result.data)
	}

	filenames := []string{}
	for i := 0; i < len(tweet.Media)+1; i++ {
		upload := <-uploadCh
		if upload.err != nil {
			responseErr(w, err, http.StatusInternalServerError)
			return
		}
		filenames = append(filenames, upload.file.Name)
	}

	type Response struct {
		ID        string   `json:"id"`
		Directory string   `json:"directory"`
		Files     []string `json:"files'`
	}
	resp := Response{
		ID:        strconv.FormatInt(tweetID, 10),
		Directory: dirname,
		Files:     filenames,
	}

	data, _ := json.Marshal(resp)
	w.Write(data)
}

func notFound(w http.ResponseWriter, r *http.Request) {
	type Response struct {
		Path string `json:"path"`
	}
	resp := Response{
		Path: r.URL.Path,
	}
	data, _ := json.Marshal(resp)
	w.Write(data)
}

var twitterConsumerKey string
var twitterConsumerSecret string
var twitterAccessToken string
var twitterAccessTokenSecret string
var api *anaconda.TwitterApi

func init() {
	twitterConsumerKey = os.Getenv("TWITTER_CONSUMER_KEY")
	twitterConsumerSecret := os.Getenv("TWITTER_CONSUMER_SECRET")
	twitterAccessToken := os.Getenv("TWITTER_ACCESS_TOKEN")
	twitterAccessTokenSecret := os.Getenv("TWITTER_ACCESS_TOKEN_SECRET")

	twitterEnvs := []string{
		twitterAccessToken,
		twitterAccessTokenSecret,
		twitterConsumerKey,
		twitterConsumerSecret,
	}
	valid := true
	for _, e := range twitterEnvs {
		if e == "" {
			valid = false
			break
		}
	}
	if valid {
		api = anaconda.NewTwitterApiWithCredentials(
			twitterAccessToken,
			twitterAccessTokenSecret,
			twitterConsumerKey,
			twitterConsumerSecret,
		)
	}
}

type simpleTweet struct {
	ID      string         `json:"id"`
	TweetID string         `json:"tweet_id"`
	User    simpleUser     `json:"user"`
	Text    string         `json:"text"`
	Media   []simpleMedia  `json:"media"`
	Dump    anaconda.Tweet `json:"dump"`
}

type simpleMedia struct {
	ID   string `json:"id"`
	Type string `json:"type"`
	URL  string `json:"url"`
}

func newSimpleMedia(media anaconda.EntityMedia) simpleMedia {
	switch media.Type {
	case "video":
		return makeMediaVideo(media)
	case "animated_gif":
		return makeMediaAnimatedGif(media)
	case "photo":
		return makeMediaPhoto(media)
	default:
		return makeMediaPhoto(media)
	}
}

func makeMediaVideo(media anaconda.EntityMedia) simpleMedia {
	maxBitrate := -1
	selectedVariant := anaconda.Variant{}
	for _, v := range media.VideoInfo.Variants {
		if v.Bitrate > maxBitrate {
			maxBitrate = v.Bitrate
			selectedVariant = v
		}
	}

	return simpleMedia{
		ID:   media.Id_str,
		Type: media.Type,
		URL:  selectedVariant.Url,
	}
}

func makeMediaAnimatedGif(media anaconda.EntityMedia) simpleMedia {
	// 사실상 비디오랑 같은 취급
	return makeMediaVideo(media)
}

func makeMediaPhoto(media anaconda.EntityMedia) simpleMedia {
	postfix := ":orig"
	url := media.Media_url_https + postfix
	return simpleMedia{
		ID:   media.Id_str,
		Type: media.Type,
		URL:  url,
	}
}

type simpleUser struct {
	ID         string `json:"id"`
	Name       string `json:"name"`
	ScreenName string `json:"screen_name"`
}

func newSimpleUser(u anaconda.User) simpleUser {
	return simpleUser{
		ID:         u.IdStr,
		Name:       u.Name,
		ScreenName: u.ScreenName,
	}
}

func fetchTweet(uid int64) (simpleTweet, error) {
	tweet, err := api.GetTweet(uid, nil)
	if err != nil {
		return simpleTweet{}, err
	}

	var t anaconda.Tweet
	if tweet.Retweeted && tweet.RetweetedStatus != nil {
		t = *tweet.RetweetedStatus
	} else {
		t = tweet
	}

	mediaCount := len(t.ExtendedEntities.Media)
	mediaList := make([]simpleMedia, mediaCount)
	for i := 0; i < mediaCount; i++ {
		media := t.ExtendedEntities.Media[i]
		mediaList[i] = newSimpleMedia(media)
	}

	return simpleTweet{
		ID:      strconv.FormatInt(uid, 10),
		TweetID: t.IdStr,
		Media:   mediaList,
		User:    newSimpleUser(t.User),
		Text:    t.FullText,
		Dump:    tweet,
	}, nil
}

func SetUpMux() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/api/fetch/{uid}", fetchHandler)
	r.HandleFunc("/api/dump/{uid}", dumpHandler)
	r.HandleFunc("/api/upload/{uid}", uploadHandler)
	r.NotFoundHandler = http.HandlerFunc(notFound)

	return r
}
