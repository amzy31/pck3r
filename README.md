# Pck3r

Pck3r is a **pure Golang Ubuntu package manager and system utility** designed for a fast, simple, and friendly terminal experience.

## Features

- Install Ubuntu packages with `apt`
- Remove and purge packages
- Search Ubuntu repositories
- Update package lists
- Upgrade installed packages
- System upgrade support
- System information
- Install common development and desktop tools
- Interactive terminal interface
- Package name validation
- Safe command execution without shell interpolation

## Requirements

- Ubuntu 24.04 or compatible Debian-based distribution
- Go 1.22+ for building from source
- `apt` and `sudo`

## Build

```bash
git clone https://github.com/amzy-0/pck3r.git
cd pck3r
go build -trimpath -ldflags="-s -w" -o pck3r .
```

## Install

```bash
sudo install -m 755 pck3r /usr/local/bin/pck3r
```

Run:

```bash
pck3r
```

## Package Management

Pck3r provides an interactive interface for common Ubuntu package operations:

- Install packages
- Remove packages
- Purge packages
- Search packages
- Update repositories
- Upgrade the system

The underlying Ubuntu package management system remains `apt`, while Pck3r provides a convenient Go-based interface around it.

## System Tools

Pck3r can also provide installation helpers for commonly used tools and environments, including development runtimes, desktop utilities, Wine, and shell utilities.

## Security

Pck3r executes system commands using Go's process APIs and passes arguments directly rather than constructing commands through an interactive shell. Administrative operations use `sudo` where required.

Always review package names and commands before granting administrative privileges.

## License

GPL-3.0. See [LICENSE](LICENSE) for the full license text.
