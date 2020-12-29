description: ' Create a game project in the &ALYlong; &project-configurator; or from
  a command line. '
slug: configurator-projects
title: Creating and Switching Game Projects
---
# Creating and Switching Game Projects<a name="configurator-projects"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

Use the Project Configurator to create and change the settings that affect building and editing of a game project\. You can use the Project Configurator to do the following:
+ Create a game project
+ Enable or disable gems \(code and assets files\) from your game project
+ Switch game projects

**Topics**
+ [Project Templates](#project-configurator-templates)
+ [Creating a Game Project in Lumberyard](#creating-a-game-project)
+ [Choosing a Game Project to Open](#project-configurator-launch-projects)
+ [Switching Game Projects](#project-configurator-different-project)

## Project Templates<a name="project-configurator-templates"></a>

When you create your game project with the Project Configurator, you can use the following templates: 

### Empty Template<a name="project-configurator-empty-template"></a>

The **Empty** template has the minimum features required for the editor to load and run a game project:
+ **CryLegacy** – Enables the editor and launcher to load a game project that contains legacy code
+ **Legacy Game Interface** – Enables the editor and launcher to load a game project that contains legacy game interface code
+ **LyShine** gem – Provides access to the in\-game UI system for Lumberyard
+ **Maestro** gem – Provides access to cinematics features

### Default Template<a name="project-configurator-default-template"></a>

The **Default** template builds on the **Empty** template and enables the following gems to provide basic features for game development:
+ **Amazon GameLift** – Provides capabilities to use this service and create game sessions
+ **Camera** – Includes a basic camera component for runtime rendering
+ **ChatPlay** – Includes the interface for triggering events based on Twitch chat activity
+ **Cloud Canvas** – Provides visual scripting capabilities to power your game backend with AWS services
+ **Gestures** – Allows gesture\-based input, including click/tap, drag, hold, pinch, rotate, and swipe
+ **Http Requestor** – Adds support to handle HTTP and HTTPS requests
+ **In\-App Purchases** – Provides the in\-app purchasing API for Android and iOS
+ **Input Management Framework** – Converts input to user\-defined gameplay events
+ **LyShine** – Provides access to the in\-game UI system for Lumberyard
+ **PBS Reference Materials** – Includes a set of physically based shading reference materials and texture assets
+ **Physics Entities** \(Legacy\) – Provides physics entity modifiers to simulate physical events
+ **Primitive Assets** – Provides primitive objects to manipulate in your level

To see the gems that enabled for the **Default** template, create a project from that template and choose **Enable Gems**\.

The **Default** template also includes a simple level for you to manipulate components and entities in the editor and experiment with other assets in a neutral, gray environment\. The simple level includes a camera, a single light, an environment probe for reflections, and primitive objects with physics enabled\. The objects are provided by the [Primitive Assets Gem](gems-system-gem-primitive-assets.md)\.

**Note**  
When you create your game project, we recommend the **Default** template and its set of gems\. This template helps you start designing and developing quickly\. Some of the gems in the template are optional\. 
To create a base project without optional gems, use the **Empty** template\. This template creates a basic project using the minimum features to start a game\.

## Creating a Game Project in Lumberyard<a name="creating-a-game-project"></a>

You can create a game project using the Project Configurator or command line\. When you create a game project, the following are also created:
+ A game gem that includes your game\-specific code\. The gem is named after your game project and is located in the `MyNewProject\Gem` directory\.
+ A Visual Studio solution file specific to your game\.

------
#### [ Project Configurator ]

**To create a game project in the Project Configurator**

1. Open the Project Configurator with your preferred method:
   + Open Lumberyard Setup Assistant and, on the **Summary** page, click **Configure project**
   + Open the Lumberyard Project Configurator, located at `lumberyard-version\dev\Bin64BuildPlatform\ProjectConfigurator.exe`\. For example, when using Visual Studio 2017 as your build platform, the Project Configurator is located at `lumberyard-version\dev\Bin64vc141\ProjectConfigurator.exe`\.

1. In the Project Configurator, click **Create new**\.
**Note**  
If **Create new** is unavailable, open Lumberyard Setup Assistant and select **Compile the game code**\.  
In Lumberyard version 1\.23, if you intend to create new projects, the following options must be selected:  
**Run your game project**
**Run the Lumberyard Editor and tools** – Use Lumberyard Editor to create a game
**Compile the game code**\* – Compile the game code to include any changes that you have made
**Compile the engine and asset pipeline**\* – Compile the engine code and asset pipeline to include any changes that you have made
**Compile the Lumberyard Editor and tools**\* – Compile Lumberyard tools to include any changes that you have made
\*If you select any of these options, you may need to perform additional tasks, such as installing Microsoft Visual Studio\. If so, these tasks display on the **Install software** and **Required SDKs** pages\. Follow the instructions in Lumberyard Setup Assistant to obtain the software and third\-party SDKs that aren't installed\.  
![\[Create a new game project with Project Configurator and Lumberyard Setup Assistant.\]](/images/configurator/setup/ui-create-new-project-A-1.25.png)

1. In the **Create a new project** window, do the following:

   1. Enter a name for your project\.

      Only alphanumeric characters are allowed\. Don't use special characters or spaces in the name\. Don't use single C\+\+ keywords such as if, while, break, new, and virtual\.

   1. Choose one of the following: **Default** or **Empty**\.

   1. Click **Create project**\.  
![\[Create a new project in the Project Configurator.\]](/images/configurator/setup/ui-create-new-project-B-1.22.png)

1. When your project is created, click **Continue**\.

1. In the Project Configurator, select the new project and click **Set as default** to make it the default project that Lumberyard Editor loads\.

1. \(Optional\) Click **Enable Gems** to add gems to your project\.
**Note**  
If you selected **Code & Assets** gems, you must build your project\.

   1. At a command\-line prompt, navigate to the `lumberyard_version\dev\` directory\.

   1. To configure Lumberyard, enter the following command\.

      ```
      lmbr_waf configure
      ```

   1. Build the game project\. 
**Note**  
In Lumberyard version 1\.23, the initial build time for a new project can be lengthy\. It can take approximately one hour on higher end systems\.

      For more information, see [Building Lumberyard projects](game-build-intro.md)\.

1. Close the Project Configurator\.

1. Open Lumberyard Editor with your preferred method:
   + Open Lumberyard Setup Assistant and, on the **Summary** page, click **Launch editor**
   + Start `Editor.exe` from one of the following directories:
     + For Visual Studio 2017: `lumberyard_version\dev\Bin64vc141`
     + For Visual Studio 2019: `lumberyard_version\dev\Bin64vc142`

------
#### [ Command Line ]

When you create a game project from a command line, you can enter `lmbr` for a list of all possible commands that you can use with [Lmbr\.exe](lmbr-exe.md)\.

**To create a game project from a command line**

1. At a command\-line prompt, navigate to the following directory: 

   `lumberyard_version\dev\Tools\LmbrSetup\Win\`

1. To create your project, enter the following command\.

   ```
   lmbr projects create MyNewProject
   ```

1. To set your new project as the default or active project, enter the following command\.

   ```
   lmbr projects set-active MyNewProject
   ```

1. To configure Lumberyard to run this project, navigate to the following directory: `lumberyard_version\dev\`

1. Enter the following command\.

   ```
   lmbr_waf configure
   ```

1. Build the game project\. 

   For more information, see [Building Lumberyard projects](game-build-intro.md)\.

------

## Choosing a Game Project to Open<a name="project-configurator-launch-projects"></a>

Use the Project Configurator to set default game project that opens in Lumberyard Editor\.

**To open a game project**

1. Open the Project Configurator with your preferred method:
   + From the desktop, double\-click the Project Configurator icon
   + Open the Lumberyard Project Configurator, located at `lumberyard-version\dev\Bin64BuildPlatform\ProjectConfigurator.exe`\. For example, when using Visual Studio 2017 as your build platform, the Project Configurator is located at `lumberyard-version\dev\Bin64vc141\ProjectConfigurator.exe`\.

1. On the **Summary** page, select the project and click **Set as default**\.  
![\[Choose a new default project in the Project Configurator.\]](/images/configurator/setup/ui-set-default-project-1.25.png)

1. \(Optional\) Click **Enable Gems** and select the additional features and assets that you want available to design your game\. If you select a gem labeled with **Code & Assets**, you must build your project from a command line\. 

   For more information, see [Building Lumberyard projects](game-build-intro.md)\.

1. \(Optional\) Choose **Advanced Settings** and verify that the **System entity** and **Memory** settings are appropriate for your project\.

1. Close the Project Configurator\.

1. After setting the default project, open Lumberyard Editor with your preferred method:
   + From the desktop, double\-click the Lumberyard Editor icon
   + For Visual Studio 2017, navigate to the `lumberyard_version\dev\Bin64vc141` directory and double\-click `Editor.exe`
   + For Visual Studio 2019, navigate to the `lumberyard_version\dev\Bin64vc142` directory and double\-click `Editor.exe`

   After the first launch and each time you change projects, Asset Processor runs in the background\. Asset Processor manages your assets and project files\. While Lumberyard Editor opens, you can see messages appear with status information\. 

   For more information, see [Using Asset Processor](asset-pipeline-processor.md)\.

## Switching Game Projects<a name="project-configurator-different-project"></a>

To switch projects, you must close Lumberyard Editor\. With the Project Configurator, you then specify a different project and its gems and system settings for the editor to open\.

When you switch projects, you can specify the following:
+ Name of the project to open
+ \(Optional\) Gems enabled for the project
+ \(Optional\) System settings for the editor to use

**To switch game projects**

1. In Lumberyard Editor, choose **File**, **Project Settings**, **Switch Projects**\.  
![\[Switch projects option on the Project Settings sub menu of the File menu in Lumberyard Editor\]](/images/configurator/setup/ui-editor-switch-project-1.22.png)

1. You must close Lumberyard Editor before you can open the Project Configurator\. In the dialog box, choose **Save**\.

1. Follow the procedure in [Choosing a Game Project to Open](#project-configurator-launch-projects)\.