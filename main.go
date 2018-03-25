package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/ChimeraCoder/anaconda"
	"github.com/gorilla/mux"

	"google.golang.org/api/drive/v3"
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
	fmt.Println("dump")
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
	fmt.Println("fetch")
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
	/*
		twitterConsumerKey = os.Getenv("TWITTER_CONSUMER_KEY")
		if twitterConsumerKey == "" {
			log.Fatalln("TWITTER_CONSUMER_KEY not found")
		}

		twitterConsumerSecret := os.Getenv("TWITTER_CONSUMER_SECRET")
		if twitterConsumerSecret == "" {
			log.Fatalln("TWITTER_CONSUMER_SECRET not found")
		}

		twitterAccessToken := os.Getenv("TWITTER_ACCESS_TOKEN")
		if twitterAccessToken == "" {
			log.Fatalln("TWITTER_ACCESS_TOKEN not found")
		}

		twitterAccessTokenSecret := os.Getenv("TWITTER_ACCESS_TOKEN_SECRET")
		if twitterAccessTokenSecret == "" {
			log.Fatalln("TWITTER_ACCESS_TOKEN_SECRET not found")
		}

		api = anaconda.NewTwitterApiWithCredentials(
			twitterAccessToken,
			twitterAccessTokenSecret,
			twitterConsumerKey,
			twitterConsumerSecret,
		)
	*/
}

// anaconda.tweet를 그대로 쓰기에는 너무 크다
// 적당히 필요한것만 뺴내기
type simpleTweet struct {
	ID      string        `json:"id"`
	TweetID string        `json:"tweet_id"`
	User    simpleUser    `json:"user"`
	Text    string        `json:"text"`
	Media   []simpleMedia `json:"media"`
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
	if tweet.Retweeted {
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
	}, nil
}

func setUpMux() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/api/fetch/{uid}", fetchHandler)
	r.HandleFunc("/api/dump/{uid}", dumpHandler)
	r.NotFoundHandler = http.HandlerFunc(notFound)

	return r
}

/*
func main() {
	r := setUpMux()

	if os.Getenv("LAMBDA_TASK_ROOT") != "" {
		algnhsa.ListenAndServe(r, nil)

	} else {
		addr := ":8080"
		r := setUpMux()
		http.ListenAndServe(addr, r)
		fmt.Printf("local server running: %s\n", addr)
	}
}
*/

func main() {
	gd := newGdrive()

	dirs, err := gd.mkdir("serina/foo/bar")
	if err != nil {
		panic(err)
	}
	for _, i := range dirs {
		fmt.Printf("%s (%s)\n", i.Name, i.Id)
	}

	// open file
	f, err := os.Open("serverless.yml")
	if err != nil {
		panic(err)
	}
	defer f.Close()

	// create or overwrite
	dir := dirs[len(dirs)-1]
	file, err := gd.upload(f, &drive.File{
		Name: "serverless.yml",
	}, dir)
	if err != nil {
		panic(err)
	}
	fmt.Printf("uploaded: %s (%s)\n", file.Name, file.Id)
}
