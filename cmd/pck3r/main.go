package main

import (
	"bufio"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"runtime"
	"strings"
	"syscall"
)

const Version = "2.0.0"

const (
	reset   = "\033[0m"
	red     = "\033[31m"
	green   = "\033[32m"
	yellow  = "\033[33m"
	cyan    = "\033[36m"
	magenta = "\033[35m"
	blue    = "\033[34m"
	bold    = "\033[1m"
)

func banner() {
	fmt.Printf("%s%s\n", cyan, bold)
	fmt.Println("╔══════════════════════════════════════════╗")
	fmt.Println("║                  PCK3R                   ║")
	fmt.Println("║       Ubuntu 24.04 Package Helper        ║")
	fmt.Println("╚══════════════════════════════════════════╝")
	fmt.Print(reset)
}
func ok(s string)     { fmt.Printf("%s✓%s %s\n", green, reset, s) }
func errMsg(s string) { fmt.Fprintf(os.Stderr, "%s✗ PCK3R ERROR:%s %s\n", red, reset, s) }
func warn(s string)   { fmt.Printf("%s⚠%s %s\n", yellow, reset, s) }
func info(s string)   { fmt.Printf("%s→%s %s\n", cyan, reset, s) }

func command(name string, args ...string) *exec.Cmd {
	return exec.Command(name, args...)
}

func run(name string, args ...string) error {
	c := command(name, args...)
	c.Stdin, c.Stdout, c.Stderr = os.Stdin, os.Stdout, os.Stderr
	return c.Run()
}

func runDetached(name string, args ...string) error {
	c := command(name, args...)
	c.Stdout, c.Stderr = nil, nil
	return c.Start()
}

func requireUbuntu() {
	data, err := os.ReadFile("/etc/os-release")
	if err != nil {
		return
	}
	id := ""
	for _, line := range strings.Split(string(data), "\n") {
		if strings.HasPrefix(line, "ID=") {
			id = strings.Trim(strings.TrimPrefix(line, "ID="), `"`)
			break
		}
	}
	if id != "ubuntu" {
		warn("This command was designed for Ubuntu. Your system is not identified as Ubuntu.")
	}
}

func safePackage(s string) bool {
	if len(s) == 0 || len(s) > 128 {
		return false
	}
	for i, r := range s {
		ok := (r >= 'A' && r <= 'Z') || (r >= 'a' && r <= 'z') ||
			(r >= '0' && r <= '9') || strings.ContainsRune("+_.:@/-", r)
		if !ok || (i == 0 && !((r >= 'A' && r <= 'Z') || (r >= 'a' && r <= 'z') || (r >= '0' && r <= '9'))) {
			return false
		}
	}
	return true
}

func ensurePackages(pkgs []string) error {
	if len(pkgs) == 0 {
		return errors.New("no package name was provided")
	}
	for _, p := range pkgs {
		if !safePackage(p) {
			return fmt.Errorf("invalid package name: %s", p)
		}
	}
	return nil
}

func installPackages(pkgs []string) error {
	if err := ensurePackages(pkgs); err != nil {
		return err
	}
	info("Installing: " + strings.Join(pkgs, ", "))
	args := append([]string{"apt", "install", "-y"}, pkgs...)
	if err := run("sudo", args...); err != nil {
		return errors.New("apt could not install the requested package(s)")
	}
	ok("Package installation completed.")
	return nil
}

func removePackages(pkgs []string, purge bool) error {
	if err := ensurePackages(pkgs); err != nil {
		return err
	}
	action := "remove"
	word := "Removing"
	if purge {
		action, word = "purge", "Purging"
	}
	info(word + ": " + strings.Join(pkgs, ", "))
	args := append([]string{"apt", action, "-y"}, pkgs...)
	if err := run("sudo", args...); err != nil {
		return fmt.Errorf("apt %s failed", action)
	}
	ok("Operation completed.")
	return nil
}

func update(andUpgrade bool) error {
	requireUbuntu()
	info("Updating package lists...")
	if err := run("sudo", "apt", "update"); err != nil {
		return errors.New("apt update failed")
	}
	ok("Package lists updated.")
	if andUpgrade {
		return upgrade()
	}
	return nil
}

func upgrade() error {
	requireUbuntu()
	info("Upgrading installed packages...")
	if err := run("sudo", "apt", "full-upgrade", "-y"); err != nil {
		return errors.New("apt full-upgrade failed")
	}
	ok("Ubuntu packages upgraded.")
	return nil
}

func installNode() error {
	requireUbuntu()
	info("Installing Ubuntu-supported Node.js and npm...")
	if err := run("sudo", "apt", "install", "-y", "nodejs", "npm"); err != nil {
		return errors.New("Node.js installation failed")
	}
	ok("Node.js and npm installed.")
	_ = run("node", "--version")
	_ = run("npm", "--version")
	return nil
}

func installDotnet() error {
	requireUbuntu()
	info("Installing the Ubuntu .NET SDK...")
	if err := run("sudo", "apt", "update"); err != nil {
		return errors.New("apt update failed")
	}
	if err := run("sudo", "apt", "install", "-y", "dotnet-sdk-8.0"); err != nil {
		return errors.New("dotnet-sdk-8.0 was not available from your configured Ubuntu repositories")
	}
	ok(".NET SDK installed.")
	_ = run("dotnet", "--version")
	return nil
}

func installWine() error {
	requireUbuntu()
	info("Installing Wine from Ubuntu repositories...")
	if err := run("sudo", "dpkg", "--add-architecture", "i386"); err != nil {
		return errors.New("could not enable 32-bit (i386) packages")
	}
	if err := run("sudo", "apt", "update"); err != nil {
		return errors.New("apt update failed")
	}
	if err := run("sudo", "apt", "install", "-y", "wine64", "wine32", "winetricks"); err != nil {
		return errors.New("Wine installation failed")
	}
	ok("Wine installed.")
	_ = run("wine", "--version")
	return nil
}

func installOhMyZsh() error {
	requireUbuntu()
	info("Installing Zsh and prerequisites...")
	if err := run("sudo", "apt", "install", "-y", "zsh", "curl", "git"); err != nil {
		return errors.New("could not install Zsh prerequisites")
	}
	info("Starting the official Oh My Zsh installer...")
	c := exec.Command("sh", "-c", "curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh | sh")
	c.Stdin, c.Stdout, c.Stderr = os.Stdin, os.Stdout, os.Stderr
	if err := c.Run(); err != nil {
		return errors.New("Oh My Zsh installation failed or was cancelled")
	}
	ok("Zsh + Oh My Zsh installed.")
	return nil
}

func openTilix() error {
	requireUbuntu()
	if _, err := exec.LookPath("tilix"); err != nil {
		info("Tilix is not installed. Installing it first...")
		if err := run("sudo", "apt", "install", "-y", "tilix"); err != nil {
			return errors.New("could not install Tilix")
		}
	}
	if err := runDetached("tilix"); err != nil {
		return fmt.Errorf("could not start Tilix: %w", err)
	}
	return nil
}

func sysInfo() {
	fmt.Printf("\n%sPCK3R system information%s\n", cyan, reset)
	fmt.Printf("OS:           %s %s\n", runtime.GOOS, runtime.Version())
	fmt.Printf("Architecture: %s\n", runtime.GOARCH)
	host, _ := os.Hostname()
	fmt.Printf("Hostname:     %s\n", host)
	fmt.Printf("CPUs:         %d\n", runtime.NumCPU())
	fmt.Printf("Go:           %s\n", runtime.Version())
	if data, err := os.ReadFile("/etc/os-release"); err == nil {
		var name, version string
		for _, line := range strings.Split(string(data), "\n") {
			if strings.HasPrefix(line, "NAME=") {
				name = strings.Trim(strings.TrimPrefix(line, "NAME="), `"`)
			}
			if strings.HasPrefix(line, "VERSION_ID=") {
				version = strings.Trim(strings.TrimPrefix(line, "VERSION_ID="), `"`)
			}
		}
		if name != "" {
			fmt.Printf("Linux:        %s %s\n", name, version)
		}
	}
}

func help() {
	banner()
	fmt.Println(`
Beginner-friendly Ubuntu package helper.

BASIC COMMANDS
  pck3r                          Open the interactive menu
  pck3r install <pkg>            Install package(s)
  pck3r remove <pkg>             Remove package(s)
  pck3r uninstall <pkg>          Purge package(s)
  pck3r search <word>            Search Ubuntu packages
  pck3r clear                    Clear the terminal

SYSTEM
  pck3r update                  apt update
  pck3r upgrade                 apt full-upgrade
  pck3r sys update
  pck3r sys upgrade
  pck3r sys updgr               Update + full upgrade
  pck3r sysinfo                 Show system information

SPECIAL INSTALLERS
  pck3r install nodejs          Node.js + npm
  pck3r install dotnet          .NET SDK 8
  pck3r install wine            Wine + Winetricks
  pck3r install ohmyzsh         Zsh + Oh My Zsh
  pck3r install tilix           Install/open Tilix

VERSION
  pck3r version
`)
}

func prompt(in *bufio.Reader, q string) string {
	fmt.Print(q)
	s, _ := in.ReadString('\n')
	return strings.TrimSpace(s)
}

func interactive() error {
	in := bufio.NewReader(os.Stdin)
	for {
		fmt.Printf("\n%sWhat would you like to do?%s\n\n", cyan, reset)
		fmt.Println("  1) Install a package")
		fmt.Println("  2) Remove a package")
		fmt.Println("  3) Search for a package")
		fmt.Println("  4) Update Ubuntu")
		fmt.Println("  5) Upgrade Ubuntu")
		fmt.Println("  6) Update + upgrade Ubuntu")
		fmt.Println("  7) Install Node.js")
		fmt.Println("  8) Install .NET SDK")
		fmt.Println("  9) Install Wine")
		fmt.Println(" 10) Install Zsh + Oh My Zsh")
		fmt.Println(" 11) Install development tools")
		fmt.Println(" 12) System information")
		fmt.Println(" 13) Open Tilix")
		fmt.Println(" 14) Help")
		fmt.Println("  0) Exit\n")

		choice := prompt(in, "Select an option: ")
		var err error
		switch choice {
		case "0":
			return nil
		case "1":
			p := strings.Fields(prompt(in, "Package name(s): "))
			err = installPackages(p)
		case "2":
			p := strings.Fields(prompt(in, "Package name(s): "))
			err = removePackages(p, false)
		case "3":
			q := prompt(in, "Search term: ")
			if q != "" {
				err = run("apt", "search", q)
			}
		case "4":
			err = update(false)
		case "5":
			err = upgrade()
		case "6":
			err = update(true)
		case "7":
			err = installNode()
		case "8":
			err = installDotnet()
		case "9":
			err = installWine()
		case "10":
			err = installOhMyZsh()
		case "11":
			err = installPackages([]string{"build-essential", "git", "curl", "wget", "python3", "python3-pip", "python3-venv", "pkg-config"})
		case "12":
			sysInfo()
		case "13":
			err = openTilix()
		case "14":
			help()
		default:
			warn("Please choose a number from 0 to 14.")
		}
		if err != nil {
			errMsg(err.Error())
		}
	}
}

func dispatch(args []string) error {
	if len(args) == 0 {
		banner()
		return interactive()
	}
	cmd := args[0]
	switch cmd {
	case "help", "--help", "-h":
		help()
		return nil
	case "version", "--version", "-v":
		fmt.Printf("pck3r %s\n", Version)
		return nil
	case "clear":
		fmt.Print("\033[2J\033[H")
		banner()
		return nil
	case "install":
		if len(args) < 2 {
			return errors.New(`after "install" you must provide a package name`)
		}
		if len(args) == 2 {
			switch args[1] {
			case "nodejs":
				return installNode()
			case "dotnet":
				return installDotnet()
			case "wine":
				return installWine()
			case "ohmyzsh":
				return installOhMyZsh()
			case "tilix":
				return openTilix()
			}
		}
		return installPackages(args[1:])
	case "remove", "rm", "uninstall":
		if len(args) < 2 {
			return fmt.Errorf(`after "%s" you must provide a package name`, cmd)
		}
		return removePackages(args[1:], cmd == "uninstall")
	case "search", "pkg":
		if len(args) < 2 {
			return errors.New("search needs a package name or keyword")
		}
		return run("apt", append([]string{"search"}, args[1:]...)...)
	case "update":
		return update(false)
	case "upgrade":
		return upgrade()
	case "sys":
		if len(args) < 2 {
			return errors.New("use: pck3r sys update | pck3r sys upgrade | pck3r sys updgr")
		}
		switch args[1] {
		case "update":
			return update(false)
		case "upgrade":
			return upgrade()
		case "updgr":
			return update(true)
		}
		return errors.New("use: pck3r sys update | pck3r sys upgrade | pck3r sys updgr")
	case "sysinfo":
		sysInfo()
		return nil
	case "tilix":
		return openTilix()
	default:
		return fmt.Errorf("command not found: %s. Try: pck3r help", cmd)
	}
}

func main() {
	if err := dispatch(os.Args[1:]); err != nil {
		errMsg(err.Error())
		var exitErr *exec.ExitError
		if errors.As(err, &exitErr) {
			if status, ok := exitErr.Sys().(syscall.WaitStatus); ok {
				os.Exit(status.ExitStatus())
			}
		}
		os.Exit(1)
	}
}
