
![release](https://img.shields.io/badge/release-0.3-blue) ![issues](https://img.shields.io/github/issues/amzy31/pck3r) ![license](https://img.shields.io/github/license/amzy31/pck3r)

# Pck3r





## About

pck3r is a command-line utility designed to make common Linux tasks easier, especially for beginners.

It provides a simple interface for common system and package-management tasks without requiring users to remember long terminal commands.

pck3r is primarily designed for Ubuntu and Debian-based Linux distributions that use the apt package manager.

### Logo

```
尸⼕长㇌尺
```

**Goals:**
- Make Linux easier for beginners.
- Simplify common system-management tasks.
- Provide convenient package installation commands.
- Reduce the need to remember complex terminal commands.
- Support Ubuntu and Debian-based distributions.

### Installation

To install pck3r system-wide, run:

./installer.py

After installation, the pck3r command should be available from your terminal.

Usage

``` pck3r <command> [options] ```

#### Commands: 

**install**

Install supported software or packages.

``` pck3r install <package> ```


Examples:

pck3r install nodejs
pck3r install wine
pck3r install ohmyzsh
pck3r install dotnet

clear

Clear the terminal screen.

```pck3r clear```

sys

Manage system updates and upgrades.

Update package information
```pck3r sys update```

Upgrade installed packages
```pck3r sys upgrade```

Update and upgrade
```pck3r sys updgr```


The updgr command performs both update and upgrade operations.

dotnet

Install the .NET development environment supported by pck3r.

```pck3r install dotnet```


Depending on the system and implementation, this may include the .NET runtime, SDK, ASP.NET Core, and C# development tools.

pkg

Search for packages.

```pck3r pkg <package-name>```


Example:

```pck3r pkg firefox```

update

Update pck3r to the latest available release from GitHub.

```pck3r update```


version

Display the installed version of pck3r.

```pck3r version```



Requirements

pck3r is primarily intended for:

Ubuntu/Mint
Debian
Debian-based Linux distributions
Systems using the apt package manager

Some commands may require administrator privileges.

Contributing

Contributions are welcome!

If you would like to improve pck3r, add features, fix bugs, or improve the documentation, feel free to contribute.

Pull Requests
Fork the repository.
Create a new branch.
Make your changes.
Test your changes.
Commit your changes.
Open a pull request.



You are free to use, modify, and redistribute the project according to the terms of the license.

Author: Amin Azimi
GitHub: @amzy31

🐧 Good luck and happy Linux-ing!
