const GLib = imports.gi.GLib;
const { RED, GREEN, YELLOW, RESET } = imports.lib.colors;
const { sys_err, sys_ok, after_empty } = imports.lib.utils;

const install_firefox = () => {
    const script = `
sudo install -d -m 0755 /etc/apt/keyrings
wget -q https://packages.mozilla.org/apt/repo-signing-key.gpg -O- | sudo tee /etc/apt/keyrings/packages.mozilla.org.asc > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/packages.mozilla.org.asc] https://packages.mozilla.org/apt mozilla main" | sudo tee -a /etc/apt/sources.list.d/mozilla.list > /dev/null
echo '
Package: *
Pin: origin packages.mozilla.org
Pin-Priority: 1000
' | sudo tee /etc/apt/preferences.d/mozilla
sudo apt-get update && sudo apt-get install firefox
`;
    try {
        const [, , stderr, exit_status] = GLib.spawn_command_line_sync(`bash -c "${script}"`);
        if (exit_status === 0) {
            print(sys_ok('Firefox installed successfully!'));
        } else {
            print(`${sys_err('')}${RED}Firefox installation failed.${RESET}`);
        }
    } catch (e) {
        print(`${sys_err('')}${RED}Firefox installation failed.${RESET}`);
    }
}

install_vscode = ()=> {
    const script = `
wget -qO - https://gitlab.com/paulcarroty/vscodium-deb-rpm-repo/raw/master/pub.gpg | gpg --dearmor | sudo dd of=/usr/share/keyrings/vscodium-archive-keyring.gpg
echo 'deb [ signed-by=/usr/share/keyrings/vscodium-archive-keyring.gpg ] https://download.vscodium.com/debs vscodium main' | sudo tee /etc/apt/sources.list.d/vscodium.list
sudo apt update && sudo apt install -y codium
`;
    try {
        const [, , stderr, exit_status] = GLib.spawn_command_line_sync(`bash -c "${script}"`);
        if (exit_status === 0) {
            print(sys_ok('VSCodium (open-source VS Code) installed successfully!'));
        } else {
            print(`${sys_err('')}${RED}VSCodium installation failed.${RESET}`);
        }
    } catch (e) {
        print(`${sys_err('')}${RED}VSCodium installation failed.${RESET}`);
    }
}

const install_nodejs = () => {
    const script = `
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - ;
sudo apt install -y nodejs ;
sudo apt-get update ;`;
    try {
        const [, , stderr, exit_status] = GLib.spawn_command_line_sync(`bash -c "${script}"`);
        if (exit_status === 0) {
            print(sys_ok('Node.js installed successfully!'));
        } else {
            print(`${sys_err('')}${RED}\nPlease retry...\n$pck3r install nodejs${RESET}`);
        }
    } catch (e) {
        print(`${sys_err('')}${RED}\nPlease retry...\n$pck3r install nodejs${RESET}`);
    }
}

const install_ohmyzsh = () => {
    try {
        // Install git and zsh
        print('Installing Oh My Zsh...');
        let [, , stderr, exit_status] = GLib.spawn_command_line_sync('sudo apt install -y git zsh');
        if (exit_status !== 0) throw new Error('Failed to install git and zsh');

        // Check if curl is available
        try {
            GLib.spawn_command_line_sync('curl --version');
        } catch (e) {
            print(`${sys_err('')}${RED}"curl" is required for using "oh-my-zsh" ; installing curl...${RESET}`);
            [, , stderr, exit_status] = GLib.spawn_command_line_sync('sudo apt install -y curl');
            if (exit_status !== 0) throw new Error('Failed to install curl');
        }

        // Install Oh My Zsh
        [, , stderr, exit_status] = GLib.spawn_command_line_sync(
            'bash -c "curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh | bash"'
        );
        if (exit_status === 0) {
            print(sys_ok('Oh My Zsh installed successfully!'));
        } else {
            print(`${sys_err('')}${RED}Oh My Zsh installation failed.${RESET}`);
        }
    } catch (e) {
        print(`${sys_err('')}${RED}Oh My Zsh installation failed.${RESET}`);
    }
}

handle_generic_install= (package_name) => {
    print(`${sys_ok('')}${YELLOW}[WAIT FOR PROCESSING]${RESET}`);
    try {
        const [, stdout, stderr, exit_status] = GLib.spawn_command_line_sync(`sudo apt install -y ${package_name}`);
        if (exit_status === 0) {
            if (stdout) {
                print(imports.byteArray.toString(stdout));
            }
            print(sys_ok(`Package ${package_name} installed successfully!`));
        } else {
            if (stderr) {
                print(`Error: ${imports.byteArray.toString(stderr)}`);
            }
            print(`${sys_err('')}${RED}Package(s) or Command(s) not found: ${package_name}${RESET}`);
        }
    } catch (e) {
        print(`${sys_err('')}${RED}Package(s) or Command(s) not found: ${package_name}${RESET}`);
    }
}

this.install_command = (package_name) => {
    if (!package_name) {
        after_empty('install', '$ pck3r install {package name}');
        return;
    }
    const pkg = package_name.trim().toLowerCase();
    if (pkg === 'nodejs') {
        install_nodejs();
    } else if (pkg === 'ohmyzsh') {
        install_ohmyzsh();
    } else if (pkg === 'firefox') {
        install_firefox();
    } else if (pkg === 'vscode' || pkg === 'code') {
        install_vscode();
    } else {
        handle_generic_install(pkg);
    }
};
