---
linkTitle: Source
title: Kythera AI Gem Setup (Source)
description: Instructions for setting up the Kythera AI Gem for Source installations of O3DE
weight: 200
toc: true
---


This document tells you how to set up the Kythera O3DE sample project, or add the Kythera gem to an existing O3DE project, if you installed O3DE using the GitHub/Source method (as documented in the [O3DE Setup Guide](/docs/welcome-guide/setup/setup-from-github/)).

{{< note >}}
Only follow these instructions if you installed O3DE via GitHub/Source (and not via the Installer). If you installed O3DE via the Installer or SDK, please see [Kythera AI Gem Setup (Installer)](../installer)
{{< /note >}}

Make sure you have a working O3DE installation before beginning.

# Running the Kythera demo project

The Kythera demo project has only been tested and confirmed to work on the `main` branch of the O3DE repo.

### Downloading the Kythera sample project

[Download the Kythera AI Gem .zip file from Kythera AI’s website.](https://www.kythera.ai/kythera-for-o3de)

Unzip the file into your project folder.

In the below screenshot, the unzipped file is named “build” but this might be “output” or “BinOutput”. The name of the folder is unimportant.

![](/images/user-guide/gems/kythera-ai/demo-unzip.png)

Navigate into the newly unzipped file Inside you will see “Kythera” and “KytheraAiDemo”. Open “KytheraAIDemo” and create a new folder called “build”.

![](/images/user-guide/gems/kythera-ai/emo-buildFolder.png)


### Configuring the sample project

Open CMake gui. 

*   Set “Where the source code is” to the “KytheraAIDemo” path.
    
*   Set “Where to build the binaries” to the “build” folder that you created inside of “KytheraAIDemo”.
    

![](/images/user-guide/gems/kythera-ai/demo-cmakeSetup.png)

Press the **Configure** button and let the process complete.

*   This will likely take less than 30 seconds.
    
*   The final message should be “Configuring done”.
    

CMake should now have set up the configuration. New variables will be highlighted in red.


{{< tip >}}
In the event of CMAKE configuration failure, check the **Variables** section of CMake:

*   LY\_3RDPARTY\_PATH: This should be set to the correct place but double check it points to the third party path. This path can be obtained inside the Editor, under the “Engine” tab
    
*   ![](/images/user-guide/gems/kythera-ai/demo-3rdpartyPath.png)
*   LY\_PROJECTS: This should already be set to the KytheraAIDemo directory, but double check.
    
*   Optional: LY\_UNITY\_BUILD: Activate the checkbox. This is not essential, but it reduces build time.
    
*   Additionally check that the `project.json` file in the root of your project lists the Kythera Directory included with the .zip file in its `external_subdirectories`, note that since O3DE-2210 setting this value in both CMake and `project.json` simultaneously can cause errors.
{{< /tip >}} 



Press the “Configure” button again and let the process complete.

*   This will likely take less than 30 seconds.
    
*   The final message should be “Configuring done”.
    
*   Check the log for any configuration errors, although there should not be any on this second attempt.
    

Press the “Generate” button and let the process complete.

*   This will likely take less than 30 seconds.
    
*   The final (and likely only) message should be “Generation done”.
    

### Register and build the project

Register the project using one of the following methods


{{< tabs name="Engine registration instructions" >}}
{{% tab name="Command Line" %}}

Option 1 - Register the project via the command line

Open the command line inside of your engine directory and register the project with the following command:


```
C:\%PATHTOINSTALLATIONFOLDER%\o3de\scripts\o3de.bat register -pp 
```

{{% /tab %}}
{{% tab name="Editor" %}}
Register the project with the engine via the editor by clicking here…

![](/images/user-guide/gems/kythera-ai/demo-addExistingProject.png)

Then select the “KytheraAIDemo” folder:

![](/images/user-guide/gems/kythera-ai/demo-SelectKytheraProject.png)

Ignore the “project needs to be rebuilt” message for now.

{{% /tab %}}
{{< /tabs >}}



After registering via either method, verify the Engine, and project is registered by inspecting your %USERPROFILE%\\.o3de\\o3de\_manifest.json, look for a "projects" key with your project path listed, and a "engines" key with your engine path listed.

![](/images/user-guide/gems/kythera-ai/demo-o3deManifest.png)


Forward slashes must be used.

```
// (file shortened for ease of reading)

"projects": [
  "C:/Users/MyUserName/O3DE/Projects/SomeOtherProject",
  "C:/Users/MyUserName/O3DE/Projects/KytheraAIDemo"
]
```

Verify the Kythera Gem is correctly referenced by your project.json located in the root directory of your project. Look for the "external\_subdirectories" key, it should contain a path to the Kythera Gem (it should be by default):

```
// (file shortened for ease of reading)

"external_subdirectories": [
  "../Kythera"
]
```

Return to CMake. Press the “Open Project” button which will open Visual Studio.

Inside Visual Studio, find the following “Editor” file and set it as the startup project.

![](/images/user-guide/gems/kythera-ai/demo-setStartupProject.png)

Build this same file by right clicking and selecting “Build” or by pressing F5.

The build process will likely take a significant amount of time.

<br></br>


### Playing the Kythera sample project

Once the build has finished, start/play the project from the O3DE Editor or by pressing “Play” in Visual Studio.

*   This will open o3de.
    
*   Do not attempt to do anything until all assets have been processed, even when o3de asks you to select a level. You can see the status of these assets in the app tray. Double click on the double arrow icon.
    

![](/images/user-guide/gems/kythera-ai/demo-tooltrayAssetProcessor.png)

Do not proceed in o3de until the status of the asset processor is “idle”

![](/images/user-guide/gems/kythera-ai/demo-assetProcessorIdle.png)

Once all assets have processed, switch to o3de (which would have opened automatically during this process).

Open the Kythera City demo scene:

![](/images/user-guide/gems/kythera-ai/demo-selectKytheraScene.png)

After opening the level check back with the asset processor to make sure no further assets are being processed.

Before playing, the Octree needs to be generated to allow for 3d flight.

*   Click here:
    

![](/images/user-guide/gems/kythera-ai/demo-generateOctree.png)

*   Watch the console and wait until a popup window confirms that the Octree has finished generating. Then click here:
    

![](/images/user-guide/gems/kythera-ai/demo-saveOctree.png)

*   Watch the console until the Octree has finished saving.
    

While not necessary, it is recommended that you turn on Kythera debugging by clicking here:

*   Make sure to select one of the options from the drop down to the right.
    

![](/images/user-guide/gems/kythera-ai/demo-turnOnDebugDraw.png)

Play the scene using “Simulate” (ctrl + P) so that you can control the camera.

<br></br>

### Exploring the Kythera Sample Project

A recommended step to help understand the scene is to open the Kythera inspector via this button:

*   This will open the inspector via your default web browser.
    

![](/images/user-guide/gems/kythera-ai/demo-openInspector.png)

While the scene is playing, the inspector will provide helpful information about each agent’s currently running behavior:

![](/images/user-guide/gems/kythera-ai/demo-behaviorTree.png)

Via the inspector, under the “Live” tab, under the “blackboards” sub tab there are many debug options that can be turned on. Some useful settings:

*   Under Global/ConsoleVariables:
    
    *   DrawNavPaths > set to “1”
        
*   Under Global/DebugOptions
    
    *   Path3D
        
    *   Splines
        
<br></br>


# Source Build: Adding the Kythera Gem to an Existing Project

The Kythera demo project has only been tested and confirmed to work on the “main” branch of the O3DE repo.

If you are familiar with using the O3DE Editor, then the steps for adding the Kythera Gem to an existing project are the same for a Source build as they are for an Installer build. Please follow the steps [here](./Installer).

If you would prefer to not use the O3DE Editor:

1.  Create a new project based on the documentation here: [https://docs.o3de.org/docs/welcome-guide/get-started/project-config/](/docs/welcome-guide/setup/)
    
2.  Rerun the cmake configuration command and add the Kythera Gem directory as an external subdirectory: 


```
cmake -B MyProject/build -S MyProject -DLY_EXTERNAL_SUBDIRS=<path to unpacked zip>\Gems\Kythera
```
    
3.  Add Kythera to your projects `enabled_gems.cmake` which can be found in the Code subdirectory of the project or in the Visual Studio project.
    
4.  Rebuild the project
    

### Opening the project

Once the build is complete, open the project (either through the command line or the Editor). You may see an error message window which can be closed and ignored for now:

![](/images/user-guide/gems/kythera-ai/existing-xmlErrorMessage.png)

Do not attempt to do anything within o3de until all assets have finished processing and the status of the Asset Processor is “idle”. You can access the Asset Processor via the app tray:

![](/images/user-guide/gems/kythera-ai/demo-tooltrayAssetProcessor.png)

I.E.

![](/images/user-guide/gems/kythera-ai/demo-assetProcessorIdle.png)


Once all assets have been processed, open any level of your choosing, or create a new one.

### Checking if adding the Kythera Gem was successful

The easiest way to see if the Kythera Gem was added successfully is to check for the presence of the Kythera toolbar:

![](/images/user-guide/gems/kythera-ai/existing-o3deConfirmingKytheraToolbar.png)

Another check is to add a component to a game object. While doing this, scroll or search for “Kythera”. The presence of these options will indicate a successful installation of the Gem.

![](/images/user-guide/gems/kythera-ai/existing-o3deConfirmingKytheraComponents.png)

<br></br>
### Next steps - Adding XML profiles and making a basic scene

Earlier we ignored an error message regarding missing XML profiles, which is resolved by adding an XML profile. The instructions to do this, and how to get a basic example up and running, can be found here:

[https://www.o3de.org/docs/learning-guide/tutorials/ai/navigation-2d/](https://www.o3de.org/docs/learning-guide/tutorials/ai/navigation-2d/)

The instructions in the above link are also encompassed in the following official Kythera-o3de video:

_Workshop: Kythera AI - Fabio Anderegg, Kythera AI_



{{< youtube-width id="05x81r9vORA" title="Workshop: Kythera AI - Fabio Anderegg, Kythera AI" >}}