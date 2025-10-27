.PHONY: all build clean install run

EXEC_NAME := pck3r

all: build

build:
	cp main.js $(EXEC_NAME)
	chmod +x $(EXEC_NAME)

clean:
	rm -f $(EXEC_NAME)

install: build
	sudo cp README.md /bin/pck3r-help
	sudo install -m 755 $(EXEC_NAME) /usr/local/bin/$(EXEC_NAME)
	sudo cp -rf lib/ /usr/local/bin/

run:
	gjs main.js --help
