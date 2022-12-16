---
linkTitle: Installer
title: Kythera AI Gem Setup (Installer)
description: Instructions for setting up the Kythera AI Gem for Installer installations of O3DE
weight: 200
toc: true
---



This page tells you how to get the Kythera sample project for **Open 3D Engine (O3DE)** working, or to add the Kythera AI Gem to an existing O3DE project, where O3DE was installed from the Installer or an SDK installation (as documented in the [O3DE Setup Guide](/docs/welcome-guide/setup/)).

{{< note >}}
Only follow these instructions if you installed O3DE via the O3DE Installer or SDK. If you installed O3DE from a source install (for example, using GitHub), please see [Kythera AI Gem Setup (Source)](../source)
{{< /note >}}

Before beginning, make sure you have a working O3DE installation. 

# Installer Build: Running the Kythera Demo Project

### Downloading and configuring the Kythera sample project

[Download the Kythera AI Gem .zip file from Kythera AI’s website](https://www.kythera.ai/kythera-for-o3de)

{{< note >}}
This file is a binary distribution of the Kythera AI Gem. If you need to build the Kythera AI Gem from source, please [contact Kythera AI directly](https://kythera.ai/contact).
{{< /note >}}

Unzip the file into your `Projects` folder. (In the following screenshot the unzipped folder is named `build`, but this might be `output` or `BinOutput`. The name of the folder is not important.)

![](/images/user-guide/gems/kythera-ai/demo-unzip.png)

Navigate into the newly unzipped folder. Inside you will see `Kythera` and `KytheraAiDemo`. Open `KytheraAIDemo` and create a new folder called `build`.

![](/images/user-guide/gems/kythera-ai/demo-buildFolder.png)

You now need to register this project with the engine. You can do this through the **Project Manager** using "Add Existing Project".

![](/images/user-guide/gems/kythera-ai/demo-addExistingProject.png)

Select the “KytheraAIDemo” folder. (Ignore the "Project needs to be rebuilt" message for now.)

![](/images/user-guide/gems/kythera-ai/demo-SelectKytheraProject.png)

Verify that the Engine and project are registered by inspecting the file `%USERPROFILE%\.o3de\o3de\_manifest.json`. Look for a `projects` key with your project path listed, and an `engines` key with your engine path listed.

![](/images/user-guide/gems/kythera-ai/demo-o3deManifest.png)

```
// (file shortened for ease of reading)

"projects": [
  "C:/Users/MyUserName/O3DE/Projects/SomeOtherProject",
  "C:/Users/MyUserName/O3DE/Projects/KytheraAIDemo"
]
```

### Building the Kythera sample project

You can build the Kythera sample project either from the Editor, or from the CMake GUI and Visual Studio (the latter may be useful if you ran into any problems trying to build in the Editor.)


{{< tabs name="Project build instructions" >}}
{{% tab name="Editor" %}}

From the **Build Project** menu, select **Build Now**.

![](/images/user-guide/gems/kythera-ai/demo-editorBuildNow.png)

{{% /tab %}}
{{% tab name="Pre-built SDK engine" %}}

From the **Build Project** menu, select **Open CMake Gui...**

![](/images/user-guide/gems/kythera-ai/demo-openCmakeGUI.png)

In the CMake GUI, set "Where to build the binaries" to the unzipped folder you created, in this case called `build`.

![](/images/user-guide/gems/kythera-ai/demo-cmakeWhereToBuild.png)

1. Click the **Configure** button and let the process complete. This will probably take less than 30 seconds. The final message should be "Configuring done".

   *  This will likely take less than 30 seconds.
    
   *  The final message should be “Configuring done”.
    
2. Then click the **Generate** button and let the process complete.

   *  Again, this will likely take less than 30 seconds.
   *  The final message should be "Generation done".
   
3. Click **Open Project** button which will open Visual Studio.

4. From Visual Studio, find the file `O3DE_SDK/Editor`, and set it as your startup project by choosing **Set as Startup Project** from the context menu.

![](/images/user-guide/gems/kythera-ai/demo-editorSetAsStartupProject.png)

Build this file, either by right clicking it and selecting **Build** or by pressing F5. This will take some time.

{{% /tab %}}
{{< /tabs >}}


### Playing the Kythera sample project

Once the build has finished, start/play the project from the O3DE Editor or by pressing “Play” in Visual Studio.

*   This will open o3de.
    
*   Do not attempt to do anything until all assets have been processed, even when O3DE asks you to select a level. You can see the status of these assets in the app tray. Double click on the double arrow icon.
    

![](/images/user-guide/gems/kythera-ai/demo-tooltrayAssetProcessor.png)

Do not proceed in O3DE until the status of the **Asset Processor** is “idle”

![](/images/user-guide/gems/kythera-ai/demo-assetProcessorIdle.png)

Once all assets have processed, switch to O3DE (which would have opened automatically during this process).

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
        
# Installer Build: Add the Kythera AI Gem to a project

### Downloading and configuring the Kythera gem

[Download the Kythera AI Gem .zip file from Kythera AI’s website](https://www.kythera.ai/kythera-for-o3de) .

Unzip the file in the same location that you made the non-Kythera project. Open this folder and you will see the following.

![](/images/user-guide/gems/kythera-ai/demo-unzip.png)


We will only be using the directory “Kythera”. Make a note of the path to this “Kythera” directory.

Navigate to your **existing** project within the file explorer. Find the “project.json” file:

![](/images/user-guide/gems/kythera-ai/existing-projectJSON.png)

Edit this file. Within “external\_subdirectories” add the path to the “Kythera” Gem.

Forward slashes must be used.

```
(file shortened)

"external_subdirectories": [
  "C:/Users/MyUserName/O3DE/Projects/BinOutput/Kythera"
],
```

Go to the O3DE editor. Find your project and select “Configure Gems”. 

![](/images/user-guide/gems/kythera-ai/existing-editorConfigureGem.png)

Search for Kythera in the top bar, enable, and click “save”:

![](/images/user-guide/gems/kythera-ai/existing-editorActivateGem.png)

### Rebuilding the project

Next, the project needs to be rebuilt. This can be done via the editor’s “build” option, or via the CMake GUI along with Visual studio. 

To rebuild the project via the editor, select here:

![](/images/user-guide/gems/kythera-ai/existing-editorBuild.png)

Or here:

![](/images/user-guide/gems/kythera-ai/existing-editorBuildOption2.png)

Once the build is complete, open the project. 

You will see an error message window which can be closed and ignored for now:

![](/images/user-guide/gems/kythera-ai/existing-xmlErrorMessage.png)

Do not attempt to do anything within o3de until all assets have finished processing and the status of the Asset Processor is “idle”. You can access the Asset Processor via the app tray:

![](/images/user-guide/gems/kythera-ai/demo-tooltrayAssetProcessor.png)

I.E.

![](/images/user-guide/gems/kythera-ai/demo-assetProcessorIdle.png)

Once all assets have been processed, open any level of your choosing, or create a new one.

### Checking that the Kythera AI Gem was successfully added

The easiest way to check that the Kythera AI Gem has been added successfully is to look in the Editor for the Kythera AI toolbar:

![](/images/user-guide/gems/kythera-ai/existing-o3deConfirmingKytheraToolbar.png)

Another check is to add a component to a game object. While doing this, scroll or search for “Kythera”. The presence of these options will indicate a successful installation of the Gem.

![](/images/user-guide/gems/kythera-ai/existing-o3deConfirmingKytheraComponents.png)
