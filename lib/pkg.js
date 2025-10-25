const GLib = imports.gi.GLib;
const { after_empty } = imports.lib.utils;

this.pkg_find = function(package_name) {
    if (!package_name) {
        after_empty('pkg', '$ pck3r pkg <package>');
        return;
    }

    // Built-in package list
    const built_in_packages = [
        'firefox', 'ohmyzsh', 'vlc', 'nodejs', 'vscode', 'code', 'codium', 'git', 'zsh', 'curl'
    ];

    const lower_pkg = package_name.toLowerCase();
    if (built_in_packages.includes(lower_pkg)) {
        if (lower_pkg === 'vlc') {
            print(`Package found: vlc (built-in)\nFor latest version on Ubuntu 24.04, add VLC PPA: sudo add-apt-repository ppa:videolan/master-daily && sudo apt update`);
        } else {
            print(`Package found: ${package_name} (built-in)`);
        }
        return;
    }

    // Fallback to apt search
    const search_term = `${package_name}.+`;
    try {
        const [, stdout, stderr, exit_status] = GLib.spawn_command_line_sync(`apt search ${search_term}`);
        if (exit_status === 0 && stdout) {
            print(imports.byteArray.toString(stdout));
        } else if (stderr) {
            print(`Error: ${imports.byteArray.toString(stderr)}`);
        }
    } catch (e) {
        print(`Failed to search for package: ${package_name}`);
    }
};
