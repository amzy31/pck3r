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
__authors__ = ["M.Amin Azimi .K (amzy-0)", "mehrzero", "https://github.com/amzy-0/pck3r/graphs/contributors"]



if __name__ == "__main__":
    print("""
This is a module not an executeable program
Alternative command :
$ python3 core_pck3r.py
OR
$ python3 installer.py
OR
$ chmod 755 core_pck3r.py ; ./core_pck3r.py
And for installing :
$ chmod 755 installer.py ; ./installer.py
    """)

else:

    from os import system as syscall
    from . import stuff
    # only  user want google.com 
    def only_google_com(browser):
    
        
        if browser == "google-chrome" or browser == "chrome": 

            syscall("%s google.com" % browser) if (syscall("ls /usr/bin/google-chrome")) == 0 else print("%s%sBrowser is not a valid one !!!\nOnly firefox, chrome(google-chrome), chromium%s" % (stuff.sysERR(), stuff.RED, stuff.NRM))
            
        elif browser == "firefox":
            syscall("%s google.com" % browser)

        elif browser == "chromium":
            syscall("%s google.com" % browser)
        
        else:
            print("%s%sBrowser is not a valid one !!!\nOnly : firefox, chrome(google-chrome), chromium%s" % (stuff.sysERR(), stuff.RED, stuff.NRM))

    # only firefox open search (firefox)
    def google_firefox(argv):
        argv_joined = " ".join(argv[3:])
        argv_joined = argv_joined.replace("?", "%3F")
        argv_joined = argv_joined.replace("+", "%2B")
        argv_joined = argv_joined.replace("-", "-&g")
        argv_joined = argv_joined.replace(" ", "+")
        syscall("firefox https://www.google.com/search?q=%s" % argv_joined)

    # other browser (firefox/chrome/chromium)
    def google_other(argv_browser, argv_two):

        if argv_browser == "firefox":
            argv_joined = " ".join(argv_two[3:])
            argv_joined = argv_joined.replace("+", "%2B")
            argv_joined = argv_joined.replace("-", "%-&gs")
            argv_joined = argv_joined.replace("?", "%3F")
            argv_joined = argv_joined.replace(" ", "+")
            syscall("%s https://www.google.com/search?q=%s" % (argv_browser, argv_joined))
            
        elif argv_browser == "chromium" : 
            
            argv_joined = " ".join(argv_two[3:])
            argv_joined = argv_joined.replace("+", "%2B")
            argv_joined = argv_joined.replace("-", "%-&gs")
            argv_joined = argv_joined.replace("?", "%3F")
            argv_joined = argv_joined.replace(" ", "+")    
            print("%s%sBrowser is not a valid one !!!\nOnly firefox, chrome(google-chrome), chromium%s" % (stuff.sysERR(), stuff.RED, stuff.NRM)) if(syscall("ls /usr/bin/chromium")) !=0 else syscall("%s https://www.google.com/search?q=%s" % (argv_browser, argv_joined))


        elif argv_browser == "chrome" or argv_browser == "google-chrome":

            argv_joined = " ".join(argv_two[3:])
            argv_joined = argv_joined.replace("+", "%2B")
            argv_joined = argv_joined.replace("-", "%-&gs")
            argv_joined = argv_joined.replace("?", "%3F")
            argv_joined = argv_joined.replace(" ", "+")    
            print("%s%sBrowser is not a valid one !!!\nOnly firefox, chrome(google-chrome), chromium%s" % (stuff.sysERR(), stuff.RED, stuff.NRM)) if(syscall("ls  /usr/bin/google-chrome")) !=0 else syscall("%s https://www.google.com/search?q=%s" % (argv_browser, argv_joined))

        # Exception
        else : 
            print(stuff.sysERR())
            print("%sBrowser is not a valid one !!!\nOnly firefox, chrome(google-chrome), chromium%s" % (stuff.RED, stuff.NRM))

    
