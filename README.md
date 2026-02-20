![release](https://img.shields.io/badge/release-0.1-blue) ![issues](https://img.shields.io/github/issues/amzy31/pck3r) ![license](https://img.shields.io/github/license/amzy31/pck3r)

# pck3r: C++ Package Manager for Windows 🖥️

Pck3r is a modern package manager for Windows 10 x64, built in C++ for speed and flexibility. 🚀 It helps you easily install, update, and manage software using MSI/EXE files, with a simple interface and clear commands. 😊

## Requirements ✅

- Windows 10 x64 🪟
- g++ compiler (MinGW or similar) 💻

## Setup ⚙️

1. Compile the project:

```bash
g++ -Iinclude -o pck3r.exe main.cpp -lurlmon -lshell32
```

2. Run with commands:

```bash
.\pck3r.exe [command] [options]
```

## Commands 🛠️

- **install**: Install a package 📦

```bash
.\pck3r.exe install [package_name]
```

Supported packages include:

- nodejs 🟢
- Google Chrome 🌐
- firefox 🦊
- WinRAR 📦

- **cls**: Clear terminal (for fun) 🧹

```bash
.\pck3r.exe cls
```

- **version**: Show version 🔢

```bash
.\pck3r.exe version
```

- **help**: Show help info ❓

```bash
.\pck3r.exe /help
```

## Development 💻

The project is modular for easy updates and extensions. The main program handles commands and delegates to modules. 🧩

## License 📄

Pck3r is licensed as per the [LICENSE](./LICENSE) file.

