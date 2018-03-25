package main

import (
	"fmt"
	"os"

	"github.com/if1live/serina"
	drive "google.golang.org/api/drive/v3"
)

func main() {
	gd := serina.NewGDrive()

	dirs, err := gd.Mkdir("serina/dev/sample/")
	if err != nil {
		panic(err)
	}
	for _, i := range dirs {
		fmt.Printf("%s (%s)\n", i.Name, i.Id)
	}

	// open file
	f, err := os.Open("Kasugano.Sora.600.1535814.webp")
	if err != nil {
		panic(err)
	}
	defer f.Close()

	// create or overwrite
	dir := dirs[len(dirs)-1]
	file, err := gd.Upload(f, &drive.File{
		Name: "Kasugano.Sora.600.1535814.webp",
	}, dir)
	if err != nil {
		panic(err)
	}
	fmt.Printf("uploaded: %s (%s)\n", file.Name, file.Id)
}
