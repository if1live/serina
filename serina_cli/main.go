package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/akrylysov/algnhsa"
	"github.com/if1live/serina"
)

func main() {
	r := serina.SetUpMux()

	if os.Getenv("LAMBDA_TASK_ROOT") != "" {
		algnhsa.ListenAndServe(r, nil)

	} else {
		addr := ":8080"
		http.ListenAndServe(addr, r)
		fmt.Printf("local server running: %s\n", addr)
	}
}
