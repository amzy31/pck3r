#!/usr/bin/python3

""" 

Short description of this Python module.
Longer description of this module.
This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.
This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with
this program. If not, see <http://www.gnu.org/licenses/>.

"""
__authors__ = ["M.Amin Azimi .K (amzy-0)", "mehrziro", "https://github.com/amzy-0/pck3r/graphs/contributors"]

"""
pck3r terminal
this is an other simple PyGTK terminal
and you can fork, edit, ... this terminal
UNDER GPL3 LICENSE ONLY !!!
"""


#color zone
NRM = "\x1B[0m"
RED = "\x1B[31m"
GRN = "\x1B[32m"
YEL = "\x1B[33m"
BLU = "\x1B[34m"
MAG = "\x1B[35m"
CYN = "\x1B[36m"
WHT = "\x1B[37m"
#end of color zone

if __name__ == "__main__":
    print("""%s
This is a module not an executeable program
Alternative command :
$ python3 core_pck3r.py
OR
$ python3 installer.py
OR
$ chmod 755 core_pck3r.py ; ./core_pck3r.py
And for installing :
$ chmod 755 installer.py ; ./installer.py
    """ % RED)

else:
    import gi
    gi.require_version("Gtk", "3.0")
    gi.require_version("Vte", "2.91")

    from gi.repository import Gtk, Vte
    from gi.repository import GLib
    from os import getcwd, getenv, environ

    terminal = Vte.Terminal()
    terminal.spawn_sync(
    Vte.PtyFlags.DEFAULT,
    environ["HOME"],
    [getenv("SHELL")],
    [],
    GLib.SpawnFlags.DO_NOT_REAP_CHILD,
    None,
    None,
    )


    win = Gtk.Window()
    win.connect("delete_event", Gtk.main_quit)
    win.add(terminal)
    win.show_all()

    Gtk.main()