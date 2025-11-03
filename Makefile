# pck3r Makefile for user-local installation and cleanup

.PHONY: install clean

INSTALL_DIR := $(HOME)/.pck3r
BIN_DIR := $(HOME)/.local/bin
BINARY := pck3r

install: clean 
	@echo "Installing pck3r to $(INSTALL_DIR)..."
	mkdir -p $(INSTALL_DIR)
	mkdir -p $(BIN_DIR)
	echo '#!/usr/bin/env gjs\nimports.searchPath.unshift(".");const{print_help:print_help,sys_err:sys_err}=imports.lib.utils;const{clear_command:clear_command,update_command:update_command,version_command:version_command}=imports.lib.misc;const{install_command:install_command}=imports.lib.install;const{sys_command:sys_command}=imports.lib.sys;const{pkg_find:pkg_find}=imports.lib.pkg;const{RED:RED,RESET:RESET}=imports.lib.colors;function main(){const args=ARGV;let command=null;let subarg=null;if(args.length>0){command=args[0];if(args.length>1){subarg=args[1]}}if(command==="--help"||command==="-h"||!command){print_help();return}if(command==="clear"){clear_command()}else if(command==="update"){update_command()}else if(command==="install"){install_command(subarg)}else if(command==="sys"){sys_command(subarg)}else if(command==="pkg"){pkg_find(subarg)}else if(command==="version"){version_command()}else{print(`${sys_err("")}${RED}No command provided. Use "--help" for a list of available commands.${RESET}`)}}main();' > $(INSTALL_DIR)/$(BINARY)
	chmod +x $(INSTALL_DIR)/$(BINARY)
	ln -sf $(INSTALL_DIR)/$(BINARY) $(BIN_DIR)/$(BINARY)
	@echo "pck3r installed successfully! Ensure $(BIN_DIR) is in your PATH (e.g., add 'export PATH=\"\$$PATH:$(BIN_DIR)\"' to ~/.bashrc and source it)."

clean:
	@echo "Cleaning up pck3r installation..."
	rm -rf $(INSTALL_DIR)
	rm -f $(BIN_DIR)/$(BINARY)
	@echo "Cleanup complete."
