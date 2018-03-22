all: build-serina

build-serina:
	env GOOS=linux go build -ldflags="-s -w" -o ./bin/serina
