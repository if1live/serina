all: build-serina

build-serina:
	cd serina_cli; env GOOS=linux go build -ldflags="-s -w" -o ../bin/serina; cd -
