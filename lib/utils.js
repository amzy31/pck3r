const { RED, GREEN, YELLOW, RESET } = imports.lib.colors;
const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;

this.sys_err = (msg) => {
    return `\n${RED}尸⼕长㇌尺 : ERROR !\n${RED}${msg}${RESET}`;
};

this.sys_ok = (msg) => {
    return `\n${GREEN}OK${GREEN}尸⼕长㇌尺 :\n ${GREEN}${msg}${RESET}`;
};

this.print_help = () => {
    // Try to read /bin/pck3r-help first
    const help_path = '/bin/pck3r-help';
    let content;
    try {
        const file = Gio.File.new_for_path(help_path);
        const [success, contents] = file.load_contents(null);
        if (success) {
            content = imports.byteArray.toString(contents);
        } else {
            throw new Error('File not found');
        }
    } catch (e) {
        // fallback to local README.md starting from line 24
        const readme_path = 'README.md';
        try {
            const file = Gio.File.new_for_path(readme_path);
            const [success, contents] = file.load_contents(null);
            if (success) {
                const text = imports.byteArray.toString(contents);
                const lines = text.split('\n');
                if (lines.length > 24) {
                    content = lines.slice(24).join('\n');
                } else {
                    content = lines.join('\n');
                }
            } else {
                throw new Error('File not found');
            }
        } catch (e) {
            print(this.sys_err('Help file not found'));
            return;
        }
    }
    print(`${YELLOW}${content}${RESET}`);
};

this.after_empty = (command, help_contents) => {
    const help_text = help_contents || `$ pck3r ${command} hello`;
    print(`${this.sys_err('')}${RED}After "${command}" is empty!\n${YELLOW}${help_text}${RESET}`);
};
