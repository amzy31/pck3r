APP=pck3r
.PHONY: build install clean
build:
	go build -trimpath -ldflags="-s -w" -o $(APP) ./cmd/pck3r
install:
	go install -trimpath -ldflags="-s -w" ./cmd/pck3r
clean:
	rm -f $(APP)
