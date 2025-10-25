#!/usr/bin/env gjs

imports.searchPath.unshift('.');
const { print_help, sys_err } = imports.lib.utils;
const { clear_command, update_command, version_command } = imports.lib.misc;
const { install_command } = imports.lib.install;
const { sys_command } = imports.lib.sys;
const { pkg_find } = imports.lib.pkg;
const { RED, RESET } = imports.lib.colors;

function main() {
    const args = ARGV;
    let command = null;
    let subarg = null;

    if (args.length > 0) {
        command = args[0];
        if (args.length > 1) {
            subarg = args[1];
        }
    }

    if (command === '--help' || command === '-h' || !command) {
        print_help();
        return;
    }

    if (command === 'clear') {
        clear_command();
    } else if (command === 'update') {
        update_command();
    } else if (command === 'install') {
        install_command(subarg);
    } else if (command === 'sys') {
        sys_command(subarg);
    } else if (command === 'pkg') {
        pkg_find(subarg);
    } else if (command === 'version') {
        version_command();
    } else {
        print(`${sys_err('')}${RED}No command provided. Use "--help" for a list of available commands.${RESET}`);
    }
}

main();
