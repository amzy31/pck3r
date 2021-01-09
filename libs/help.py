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
    print("""%s
-----------------------------------------
|                                       |
| pck3r : It is a versatile program and |
|                                       |
| you avoid using useless commands and  |
|                                       |
| it is written for Ubuntu...           |
|                                       |
-----------------------------------------

\"install\" command :

    $ pck3r install \"somthing\" :
    {
            nodejs,
            python3pip,
            java,
            wine,
            ohmyzsh,
            or ...
    }

\"clear\" command :

    $ pck3r clear:
    {clear your terminal }

\"iso\" command :

    $ pck3r iso 32/64  \"somthing\":
    {
        mint,
        fedora,
        gentoo,
        or ...
    }

\"dwn\" command :

    $ pck3r dwn \"https/http://somthing\"
    {dwn is downloader for pck3r }

\"sys\" command :

    $ pck3r sys update
    (update your oprating system)

    $ pck3r sys upgrade
    (upgrade your oprating system)

    $ pck3r updgr
    (both, update and upgrade (full upgrade))

\"term\" command :
    $pck3r term
    (command for run, pck3r terminal emulator)

\"google\" command :


    $pck3r google <browser> <search section(word1 word2 word3 ...)
    (quick google search ...)
    (like this : $ pck3r google firefox what is google search engine)

\"tilix\" command :


    $ pck3r tilix
    (tilix terminal ...)

\"dotnet\" command :


    $ pck3r install dotnet
    (installing .NET (dot net ) C0RE, ASP, MCS compiler , ...)

\"pkg\" command :


    $ pck3r pkg <package name>
    (search for packages ...)

\"update\" command :
    $ pck3r update
    (update to last release from github.com/amzy-0/pck3r)
    """ % YEL)