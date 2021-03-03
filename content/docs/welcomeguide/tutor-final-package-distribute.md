---
description: ' Learn the process for building and packaging a release of your O3DE
  project. '
title: 'Final step: Package and release a build'
---
# Final step: Package and release a build<a name="tutor-final-package-distribute"></a>

In this tutorial, you will learn the final steps to take now that you've got a finished game and are ready to release it\! You will create a release build, process and package your final assets, and create an indepdendent distribution outside of the **O3DE Editor** for everyone to play and enjoy\.

Most of what you'll be doing in this tutorial takes place outside of the O3DE Editor, using command line tools\. The commands used here assume that you're using Visual Studio 2019\. If you use Visual Studio 2017 instead, make the following changes in each command\-line snippet\.
+ Change `vc142` to `vc141`\.
+ Change `vs2019` to `vs2017`\.

For those parts that do take place in the editor, this tutorial is written for the default **O3DE Editor** layout, so make sure this is the layout you're using\. To set this layout, access the menu bar and select **View**, **Layouts**, and choose **Default Layout**\.

![\[O3DE select default layout\]](/images/welcomeguide/ui-default-layout-1.25.png)

All set up? Let's get started\!

## Create a release build<a name="_create_a_release_build"></a>

1.  Open up a Windows Command Prompt and navigate to the directory of your O3DE install\. By default this is `C:\Amazon\O3DE\<version>`

1.  Navigate to the `dev` directory\.

   ```
   cd dev
   ```

   From this point forward in the tutorial, all paths are relative to `<lumberyard-install-dir>\dev`\.

1.  Start the release build\. This command builds the game, engine, and the included gems in release mode \- it can take a while\! While your game is building, go grab your favorite drink \(or a few\) and spend some time relaxing\. Your build will be there when you get back, after all\. Or if you're ambitious, you can go through the next few steps while waiting for the build to complete \- just know that your system might be a little slow\.

   ```
   lmbr_waf build_win_x64_vs2019_release -p game_and_engine
   ```

   When the release build finishes, keep this window open \- you'll be using it later\!

## Export level and build shaders<a name="_export_level_and_build_shaders"></a>

1.  Start the **O3DE Editor** if it's not already open, and load the level that you want to play in your packaged release\. If you're working with our pre\-packaged levels, use **ch08\_barnyard\_final**\.

1.  Run your game in the editor with **Game** > **Play Game** or press **Ctrl\-E**\.

1.  When your game is running, move the chicken around the world and look at stuff\! As the game renders, the engine picks up which shaders are used in the level and marks them for the shader compiler to process later\. When you've seen all of the level geometry, exit game mode by pressing **Esc**\.

1.  Export the level as a bundled resource package, which is called a *pak file* \(`.pak`\)\. This exports level geometry and information about the entities in the level \- but doesn't bundle any resources *used* in the level\. You'll take that step later\. Access the menu bar and select **Game** > **Export to Engine** or press **Ctrl\-E**\.
![\[O3DE level export\]](/images/welcomeguide/ui-export-level.png)

1.  \(Optional\) Close the O3DE Editor\. You're done with it for now \- the rest of this tutorial is done on the command line\.

1.  Open a **new** Windows Command Prompt, and navigate to the directory of your O3DE install\.

1.  Navigate to the `dev\Tools\CrySCompileServer\x64\profile` directory\.

   ```
   cd dev\Tools\CrySCompileServer\x64\profile
   ```

1.  Start the shader compiler\. When it's started, make sure to leave the window open\. Otherwise you won't get your shaders compiled\!

   ```
   CrySCompileServer.exe
   ```

1.  Go back to your first command line window and run the shader packaging script\. Shader compilation and packaging is finnicky, so we provide a batch script that does the heavy lifting\. You just need your *project name*, *rendering library*, and *target platform*\. Since we're building for Windows PCs, the renderer will use **Direct3D 11** and the target platform will be **pc**\.

   ```
   lmbr_pak_shaders.bat WelcomeGuideTutorials D3D11 pc
   ```

   When this command completes, you'll have shaders packaged at `build\pc\WelcomeGuideTutorials\shadercache.pak` and `build\pc\WelcomeGuideTutorial\shadercachestartup.pak`\.

1.  Close the window where the shader compiler is running\.

## Package assets<a name="_package_assets"></a>

Now you have your shaders and your level data packed\. Importantly, the level pak *doesn't* include all of the assets used *in* the level \- it only contains the data necessary for the level itself, such as geometry and entity placement information\. You'll need to gather up the rest of the assets used for distribution into their own pak file\.

Throughout this section we use the **Asset Bundler**, the tool which takes compiled assets from the **Asset Processor** and bundles them up for your game distribution\.

For all of these steps, you'll go back to the Windows Command Prompt that you opened at the start of this tutorial\.

1.  Gather the auxiliary data that's used by O3DE to launch your game\.

   ```
   Tools\Python\python3 BuildReleaseAuxiliaryContent.py --platforms pc --buildFolder Bin64vc142
   ```

   This creates the directory `welcomeguidetutorials_pc_paks`\. If you explore this directory, you'll see a number of configuration files and pre\-built asset paks contained here\. In particular, all of the levels of the tutorial \- not just your final level \- are packaged here\. If you want, you can delete any levels that you don't want to release with your game\.

1.  Create an *asset list* that contains information about assets that are needed to load the O3DE engine and start your game\.

   ```
   Bin64vc142\AssetBundlerBatch.exe assetLists ^
       --addDefaultSeedListFiles ^
       --addSeed gems.json ^
       --addSeed project.json ^
       --assetListFile engine.assetlist
   ```

   This creates a new file `dev\engine_pc.assetlist`\.

1.  Create the *asset bundle* for the engine\. The asset bundle is a package containing all of the assets that are referenced in the asset list from the previous step\.

   ```
   Bin64vc142\AssetBundlerBatch.exe bundles --assetListFile engine_pc.assetlist --outputBundlePath engine.pak
   ```

   This creates a new file `engine_pc.pak`\.

1.  Create an asset list containing all of the assets used by your level\. Replace `ch08_barnyard_final` with the name of your final level that you're distributing with the game\.

   ```
   Bin64vc142\AssetBundlerBatch.exe assetLists ^
       --platform pc ^
       --addSeed levels\ch08_barnyard_final\level.pak ^
       --assetListFile game.assetlist
   ```

1.  Create the final pak, containing all of the assets used by the game\.

   ```
   Bin64vc142\AssetBundlerBatch.exe bundles ^
       --assetListFile game.assetlist ^
       --outputBundlePath game.pak
   ```

   This creates a new file `game_pc.pak`\.

**Tip**
Your `pak` files that you distribute don't need to follow any specific naming convention\. Choose names that make sense for you \- here we made sure to clarify which resources are required at launch time \(`engine.pak`\), and which resources are used when running the game content \(`game.pak`\)\.

## Put everything together<a name="_put_everything_together"></a>

**Important**
If your build is still running, wait for it to finish before starting this section\.

Now that you have your release built and ready to go, it's time to put it all together into the final package\!

1.  Start by creating a new empty folder anywhere on your PC, and name it what you want\. In all of the following screenshots, we're using a folder named **Flyin' the Coop**\.

1.  Using Windows Explorer or the command line, copy the directory `Bin64vc142.Release` to the folder you've created\. This folder can be renamed to anything you like \- in the following image, it's been named **GameEngine**\.
![\[Release folder containing the release build as 'GameEngine'.\]](/images/welcomeguide/release-folder-1.png)

1.  Copy the **contents** of the `welcomeguidetutorials_pc_paks` directory to your release folder\.
![\[Release folder containing the engine bootstrapping and base assets dir\]](/images/welcomeguide/release-folder-2.png)

1.  Copy the following files from your O3DE `dev` directory into the `welcomeguidetutorials` folder in your release\.
   +  `game_pc.pak`
   +  `engine_pc.pak`

     After copying the files, rename them to `game.pak` and `engine.pak` respectively\.
![\[Assets folder containing the game.pak and engine.pak files\]](/images/welcomeguide/release-folder-3.png)

1.  Copy the **contents** of the `build\pc\WelcomeGuideTutorials` directory into the `welcomeguidetutorials` folder in your release\.
![\[Assets folder containing the shadercache.pak and shadercachestartup.pak files\]](/images/welcomeguide/release-folder-4.png)

1.  There are several levels in the **Levels** directory\. During a release process for a commerical game, you'll normally create a bootstrapper that sets the level to load on launch\. For Flyin' the Coop, the easiest way to load the right level is by launching from the command line\.

   In an open Windows Command Prompt, navigate to your Flyin' the Coop release folder with the `cd` command\. Once you're there, use the following command to start the game\.

   ```
   GameEngine\WelcomeGuideTutorialsLauncher.exe +map ch08_barnyard_final
   ```

   If you're using a map other than `ch08_barnyard_final`, change the map name in this command\.

![\[The final map of the Flyin' the Coop tutorial\]](/images/welcomeguide/final-level-running.png)

Congratulations\! You've built an independent, releasable package for your game\!

## Next steps<a name="_next_steps"></a>

Now that you've completed this tutorial series, you should have a basic familiarity with the O3DE editor and how to use the O3DE build and packaging tools\. It's time to move on to making your own game using what you know\! To help you along the way, the [User Guide](https://docs.aws.amazon.com/lumberyard/latest/userguide/) has feature information, reference materials, and more task\-oriented tutorials\.

Depending on your role in game development, there are a few places that you might want to check out in the User Guide now to familiarze yourself with other parts of O3DE\. To help you find where to start, we've put together [How Open 3D Engine works](wg-how-lumberyard-works.md) and [Create with Open 3D Engine](wg-create-intro.md)\.