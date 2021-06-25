[Kythera AI Gem](index.md)

# Kythera AI Gem Setup

Download the Kythera AI Gem .zip file from Kythera AI’s website: <insert URL here>.

To build the Kythera AI demo project
====================================

The demo project (called ShooterDemo) is part of the downloaded zip file.

*   Make sure O3DE is set up according the official guide: [https://docs.o3de.org/docs/welcome-guide/setup/setup-from-github/](https://docs.o3de.org/docs/welcome-guide/setup/setup-from-github/)
    
*   Unpack the .zip file into a folder - for this example we’ll use `C:\dev\kythera`. If you use a different path, substitute c:\\dev with the folder you unpacked the Kythera AI Gem into.
    
*   Create a `build` directory in the unpacked `ShooterDemo` folder (`C:\dev\kythera\ShooterDemo\build`)
    
*   Open a shell prompt and `cd` into the build directory
    
*   Run the following cmake command (with the correct paths substituted):
    
*   `cmake .. -G "Visual Studio 16" -DLY_3RDPARTY_PATH=<3rdParty cache path> -DLY_EXTERNAL_SUBDIRS=<path to unpacked zip/Gems/Kythera> -DLY_UNITY_BUILD=ON`
    
*   Open the generated Visual Studio Solution `ShooterDemo.sln`
    
*   Set `Code/Sandbox/Editor/Editor` as your startup project, then build and run it. The ShooterDemo project contains multiple levels showing off some features of Kythera AI.
    
