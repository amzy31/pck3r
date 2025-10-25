const GLib = imports.gi.GLib;
const { after_empty } = imports.lib.utils;

this.pkg_find = function(package_name) {
    if (!package_name) {
        after_empty('pkg', '$ pck3r pkg <package>');
        return;
    }
    const search_term = `${package_name}.+`;
    try {
        const [, , stderr, exit_status] = GLib.spawn_command_line_sync(`apt search ${search_term}`);
        // Note: subprocess.run equivalent, but we don't check exit_status here as in original
    } catch (e) {
        // pass
    }
};
