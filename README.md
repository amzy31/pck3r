# Pck3r

![Screenshot](screenshot/pck3r.png)

Pck3r is an easy command-line tool for Linux beginners. It is written in Python and makes package management and system tasks simple on Ubuntu 24.04. It uses the apt package manager.

Pck3r is created by AMZY31 (Amin Azimi) and is licensed under GPL3. We welcome contributions—send pull requests on GitHub: https://github.com/amzy31/pck3r. New features will be added soon!

## Logo

```
  尸⼕长㇌尺
```

## Overview

Hello Linux users! Pck3r makes managing packages on Ubuntu 24.04 easy and fun. Forget hard apt commands—use simple ones instead. Good for new users and experts!

## Commands

### Install Command

Install packages or tools. Pck3r has special ways to install popular tools and uses apt for others.

Built-in packages (special install methods):
- nodejs (Node.js)
- ohmyzsh (Oh My Zsh)
- firefox (Mozilla Firefox)
- google-chrome (Google Chrome)
- steam (Steam gaming platform)
- discord (Discord chat app)
- vscode (Visual Studio Code)
- skype (Skype)
- zoom (Zoom video conferencing)
- vlc (VLC media player)
- virtualbox (VirtualBox virtualization)
- wine (Wine for running Windows apps)

```bash
pck3r install <package>
```

Examples:
- `pck3r install nodejs`
- `pck3r install google-chrome`
- `pck3r install <any_other_package>` (uses apt)

### Clear Command

Clear your terminal screen:

```bash
pck3r clear
```

### System Commands

Manage your system:

- Update package lists:
  ```bash
  pck3r sys update
  ```

- Upgrade installed packages:
  ```bash
  pck3r sys upgrade
  ```

- Full upgrade (update and upgrade):
  ```bash
  pck3r sys updgr
  ```

### Package Commands

List built-in Pck3r packages or search for apt packages:

- List built-in packages:
  ```bash
  pck3r pkg
  ```

- Check if a package is built-in or search for apt packages:
  ```bash
  pck3r pkg <package_name>
  ```

  If `<package_name>` is built-in, it will tell you. Else, it searches apt packages in the repos.

### Version

Check Pck3r version:

```bash
pck3r version
```

## Installation

To install Pck3r for all users:

1. Make sure Python 3 is on your system (it comes with most Linux distros)

2. Clone the repo:
   ```bash
   git clone https://github.com/amzy31/pck3r
   ```

3. Go to the folder:
   ```bash
   cd pck3r
   ```

4. Install for all users:
   ```bash
   make install
   ```

Or run it directly:
```bash
python3 main.py <command>
```

## Update

To update Pck3r to the latest version:

```bash
git pull origin master
```

Then reinstall:
```bash
make install
```

Or use the built-in update command:
```bash
pck3r update
```
