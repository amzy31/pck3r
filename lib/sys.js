const GLib = imports.gi.GLib;
const { RED, RESET } = imports.lib.colors;
const { sys_err, after_empty } = imports.lib.utils;

this.sys_command = function(sys_migration) {
    if (!sys_migration) {
        after_empty('sys', '$ pck3r sys {update/upgrade/updgr}\nupdgr : update and full-upgrade, packages.');
        return;
    }
    const action = sys_migration.toLowerCase();
    let cmd;
    if (action === 'update') {
        cmd = 'sudo apt update';
    } else if (action === 'upgrade') {
        cmd = 'sudo apt upgrade';
    } else if (action === 'updgr') {
        cmd = 'bash -c "sudo apt update && sudo apt -y full-upgrade"';
    } else {
        print(`${sys_err('')}${RED}Invalid sys command: ${action}${RESET}`);
        return;
    }
    try {
        const [, , stderr, exit_status] = GLib.spawn_command_line_sync(cmd);
        // Note: subprocess.run equivalent, but we don't check exit_status here as in original
    } catch (e) {
        // pass
    }
};
