# Adding a Game Project<a name="waf-using-game-project"></a>

The simplest and recommended method to add a game project to the Lumberyard Waf build system is to use the Project Configurator\. The Project Configurator is a standalone application for telling the Waf build system which game projects and assets to include in a game build\. For more information, see [Creating Lumberyard projects](configurator-intro.md)\.

You can also add a game project with the following steps:
+ Create the project definition
+ Create a game module
+ Update the user settings to include the game

**Note**  
You can build your game project by creating a game project first \(see steps below\) and then creating a spec for just the game \(no modules, just basic spec values\):  

```
{
    "description": "Configuration to build the My Game",
    "visual_studio_name": "My Game"
}
```
When the project is properly defined and all source files are in the correct locations, you can set the **enabled\_game\_projects** value in the `user_settings.options` file\. Configuring this value limits the Visual Studio solution to the launcher projects and your game project\.

**Topics**
+ [Creating the Project Definition](#add-game-project-project-definition)
+ [Creating a Game Module](#add-game-project-game-module)
+ [Updating the User Settings](#add-game-project-user-settings)

## Creating the Project Definition<a name="add-game-project-project-definition"></a>

In the following procedure you set `Code/MyGame` as the project source folder and `MyGame` as the project folder\. The `code_folder` points to your game's module root and the `project_directory` points to the game\-specific assets\. You can define any number of game projects in this file and you can configure which ones to build\.

**To create the project definition**

1. Navigate to the SDK root and locate the `Code` folder and `project directory`\. Typically your game code folder should reside under these locations\.

1. Determine the name for your project\. For this example, use **My Game**\.

1. Add the definitions for the new game project to the `project.json` file \(located in the game project folder under the `lumberyard_version\dev` directory\)\. For this example, add **My Game** to the SDK:

   ```
       "project_name"      : "SamplesProject",
       "product_name"      : "Samples Project",
       "executable_name"   : "SamplesProjectLauncher",
       "code_folder"       : "Code/SamplesProject",
       "modules"           : ["SamplesProject"],
       "project_id": "{D882E365-54D6-586E-BD78-2650F3057D49}",
       "sys_game_folder"   : "SamplesProject",
       "sys_dll_game"      : "SamplesProject",
   ```

## Creating a Game Module<a name="add-game-project-game-module"></a>

You can create a game module after setting the game project definition\. Game modules include wscript files, source files, and a waf\_files configuration file\. You must create separate folders for the game source code and for the resources\. Both should reside under the `code_folder` specified earlier\. For this example you create folders called **GameSource** and **Resources** under the `Code/MyGame` directory\.

### Create a wscript file<a name="game-module-wscript-file"></a>

Because Waf searches for and discovers wscript files recursively through other wscript files, you must include a simple wscript file in the `Code/MyGame` folder that recurses to the `GameSource` folder\.

Create a file with the following:

```
SUBFOLDERS = ['GameSource']
               
def build(bld):
bld.recurse(SUBFOLDERS)
```

Next you must create the source code in the `GameSource` folder\. Include in this folder all of your source files and the corresponding Waf source file configuration \(for example, `MyGame.waf_files`\) to include your game files\.

Create a wscript in the GameSource folder to define the build configuration for your game:

```
def build(bld):
              bld.CryEngineModule(
               	 
               	        target      = 'MyGame',
               	        vs_filter   = 'Game/MyGame',
               	        file_list   = 'MyGame.waf_files',
               	        pch         = 'StdAfx.cpp',
               	        includes    = [ '.' , '..',
               	                        Path('Code/CryEngine/CryCommon'),
               	                        Path('Code/CryEngine/CryAction'),
               	                        Path('Code/CryEngine/CryNetwork')]
               	   )
```

### Create source files<a name="game-module-source-files"></a>

All game projects first need a source file\. If you intend to use pre\-compiled headers you must create standard `StdAfx.h` and `StdAfx.cpp` files\. For this example you create a single C\+\+ file and a corresponding header file \(`MyGameMain.cpp` and `MyGameMain.h`\)\.

### Create a waf\_files configuration file<a name="game-module-waf-files-configuration-file"></a>

You use the waf\_files configuration file to include the source files into the game module\. For this example you create a file called `MyGame.waf_files` and specify it for the project\. This file includes the four files you created from the previous step\. 

Create a waf\_files configuration file called `MyGame.waf_files` with the following:

```
{
    "auto": {
        "Source Files": ["MyGameMain.cpp"],
        "Header Files": ["MyGameMain.h"]
    },
    "none": {"Root": [
        "StdAfx.h",
        "StdAfx.cpp"
    ]}
}
```

## Updating the User Settings<a name="add-game-project-user-settings"></a>

The final step is to update enabled\_game\_projects to include or exclusively set the new game project\. You can do this one of the following ways:
+ In a text editor, edit the `user_settings.options` file \(in the `lumberyard_version\dev\_WAF_\` directory\) to set the value for the `enabled_game_projects`\. The following example sets `MyGame` as the only game project generated\. You can use a comma\-separated list to include multiple game projects in the final solution\.

  ```
  [Game Projects]
  enabled_game_projects = MyGame
  ```
+ Update game projects with the Lumberyard Waf GUI\. 

  To run the GUI, in a command line window, navigate to the `lumberyard_version\dev\` directory and enter the following command: 

  ```
  lmbr_waf show_option_dialog
  ```

  Click **Game Projects** in the Lumberyard Waf window, and select your new project\. You can select more than one project\.  
![\[Use the Lumberyard WAF GUI to select your new project.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/waf/waf-using-game-project-waf-gui.png)
+ Build the project with the following command for your version of Visual Studio\. Use `--enabled-game-projects=MyGame` to override every build command\. This does not include the project in the generated solution, but it sets specific game projects to build during the build commands\.

  ```
  lmbr_waf build_win_x64_vs2017_debug -p game_and_engine --enabled-game-projects=MyGame
  ```