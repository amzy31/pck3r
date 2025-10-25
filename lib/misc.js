const GLib = imports.gi.GLib;
const { sys_ok, sys_err } = imports.lib.utils;
const { RED, RESET } = imports.lib.colors;

this.clear_command = function() {
    try {
        const [, , stderr, exit_status] = GLib.spawn_command_line_sync('clear');
        if (exit_status === 0) {
            print(sys_ok('This is a funny clear command :D'));
        }
    } catch (e) {
        // pass
    }
};

this.update_command = function() {
    try {
        GLib.chdir('/tmp');
        const [, , stderr, exit_status] = GLib.spawn_command_line_sync(
            'bash -c "sudo rm -rf pck3r && sudo git clone https://github.com/amzy31/pck3r pck3r && cd pck3r && sudo make install"'
        );
        if (exit_status === 0) {
            print(sys_ok('pck3r updated successfully!'));
        } else {
            print(`${sys_err('')}${RED}Failed to update pck3r.${RESET}`);
        }
    } catch (e) {
        print(`${sys_err('')}${RED}Failed to update pck3r.${RESET}`);
    }
};

this.version_command = function() {
    print(`${sys_ok('')}version : 1.0`);
};


