# Tutorial Nine: Package and build a release<a name="tutor-ch09-build-and-release"></a>

In this tutorial, you will learn how to export your level for the engine, set a default level, and test your level in a standalone game\. Finally, you’ll learn how to bundle assets and create a stand\-alone release build of your project\.

**Tip**  
If you like, you can follow this chapter in video \(2:51 minutes\) form:  

[![AWS Videos](http://img.youtube.com/vi/https://www.youtube.com/embed/GNF_m4T-nAc?rel=0/0.jpg)](http://www.youtube.com/watch?v=https://www.youtube.com/embed/GNF_m4T-nAc?rel=0)

Begin this tutorial either with the level you created in [Tutorial Eight: Create environment props with White Box and slices](tutor-ch08-create-props-with-slices.md), or by opening `ch08_barnyard_final` from the `Levels` directory of the **WelcomeGuideTutorials** project\. To open a level in Lumberyard, choose **Open Level…​** from the **File** menu in the main menu bar\.

1.  This tutorial is written for the default **Lumberyard Editor** layout, so make sure this is the layout that you’re using\. To set the layout, access the menu bar and select **View**, **Layouts**, and choose **Default Layout**\.   
![\[Lumberyard select default layout\]](http://docs.aws.amazon.com/lumberyard/latest/welcomeguide/images/ui-default-layout-1.25.png)

1.  The level needs to be exported to a run\-time asset for Lumberyard\. To export your level, expand the **Game** menu in top menu bar and choose **Export to Engine** or press **Control \+ E**\. A message appears reporting success\. Choose **OK** to close the message box\. 

1.  There are several levels in the **Levels** directory\. You must specify one level to be the start\-up level that will load when the game begins\. This is done by creating an `autoexec.cfg` file in the root of the **WelcomeGuideTutorials** project folder that specifies the level to load\. An `autoexec.cfg` has been provided for the project\. The file contain a single line: `map ch08_barnyard_final`\. If your working level has been saved under a different name, use a text editor to replace `ch08_barnyard_final` with the name of your level\. 

1.  To test your game as a stand\-alone before committing to bundling the assets, and building a release, find the **WelcomeGameTutorialsLauncher\.exe** in your build folder located in `lumberyard_root\dev\Bin64vc141` \(if you are using Visual Studio 2017\) or located in `lumberyard_root\dev\Bin64vc142` \(if you are using Visual Studio 2019\)\. Run **WelcomeGameTutorialsLauncher\.exe**\. The project runs in a stand\-alone window and automatically loads the level\. Test all the functionality of the keyboard and gamepad\. When you are satisfied everything works, press **Escape** to exit\.   
![\[Lumberyard stand-alone launcher test.\]](http://docs.aws.amazon.com/lumberyard/latest/welcomeguide/images/anim-test-launcher-1.26.gif)