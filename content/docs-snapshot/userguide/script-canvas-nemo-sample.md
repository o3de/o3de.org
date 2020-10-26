# Installing the Project N\.E\.M\.O\. Sample<a name="script-canvas-nemo-sample"></a>

Project N\.E\.M\.O \(Nautical Emergency Maneuvers and Operations\) is a complete sample game level that showcases some of the key capabilities of Script Canvas\. The sample level creates a short underwater navigation experience in which the player maneuvers a mini sub through obstacles and collects pickups\. The sample level uses Script Canvas and script events to implement submarine functionality, mines and squid behavior, HUD display, pickups, world space UI, and game end\. 

To use the sample, you must first install and configure Lumberyard\. Then download, configure, and build the project\.

## Step 1: Install and Configure Lumberyard<a name="script-canvas-nemo-sample-preparing"></a>

The following procedure shows you how to install Lumberyard and configure it for the Project N\.E\.M\.O\. sample level\. If Lumberyard is already installed, start with step 2 to configure it\.

**To install and configure Lumberyard for the Project N\.E\.M\.O\. sample level**

1. [Download](https://aws.amazon.com/lumberyard/downloads/) and run the Lumberyard installer\.

1. Do one of the following:
   + If you are installing Lumberyard, click **Launch Lumberyard Setup Assistant**\.
   + If Lumberyard is already installed, click the **Lumberyard Setup Assistant** icon on your desktop\.

1. Click **Customize**\.

1. In **Lumberyard Setup Assistant**, ensure that **Run your game project** and **Run the Lumberyard Editor and tools** are selected\. 

1. Select **Compile the game code** and **Compile the engine and asset pipeline**\.

1. For **Visual Studio Version**, select the version of Visual Studio that you want to use\.

1. Click **Install required SDKs**\.

1. For **Required SDKs**, click **Install all**\.

1. After the required SDKs are installed, close **Lumberyard Setup Assistant**\.

## Step 2: Download, Configure, and Build the Project<a name="script-canvas-nemo-sample-building"></a>

Now you are ready to download, configure, and build the sample project\.

**To download, configure, and build the Project N\.E\.M\.O\. sample level**

1. Download the [NEMO\.zip](https://d2zdx4pxusljwa.cloudfront.net/NEMO.zip) file\.

1. Extract the `NEMO` and `Engine` folders from the `.zip` file to the `lumberyard_version\dev\` directory\.

1. On your desktop, click the **Project Configurator** icon\.

1. In Project Configurator, click the **NEMO** project to select it, and then click **Set as default**\.

1. Close **Project Configurator**\.

1. From a command window on `lumberyard_version\dev\` directory, run the following command:

   ```
   lmbr_waf configure
   ```

1. Run the version of the following command that corresponds to your version of Visual Studio\.

   ```
   lmbr_waf build_win_x64_vs2017_profile -p
                       game_and_engine
   ```
**Note**  
Building the project takes some time\. 

At this point, the Project N\.E\.M\.O\. sample level is ready\. For more information about the sample and how it uses Script Canvas, see the [Amazon Game Tech Blog](http://aws.amazon.com/blogs/gametech/working-with-lumberyards-script-canvas-project-n-e-m-o-sample-now-available/)\.