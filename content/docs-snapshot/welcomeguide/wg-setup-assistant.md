# Configuring your Amazon Lumberyard environment with Setup Assistant<a name="wg-setup-assistant"></a>

Lumberyard Setup Assistant configures and maintains your Lumberyard environment based on your development needs\. If you’re continuing from [Installing Amazon Lumberyard](wg-install.md), Setup Assistant should be running on your desktop\. Setup Assistant can also be launched from the Start Menu or desktop shortcuts\.

Lumberyard Setup Assistant performs several important functions:
+ Ensures that you have the required runtime software\.
+ Ensures that you have the required SDKs\.
+ Provides plugins for detected content applications such as Photoshop and Maya\.
+ Validates registry settings, paths, and libraries\.

![\[Lumberyard Setup Assistant.\]](http://docs.aws.amazon.com/lumberyard/latest/welcomeguide/images/ui-sa-install-options-1.23.png)

On first run, Lumberyard Setup Assistant presents two options, **Express Install** and **Custom Install**\. If you’re a content creator, such as a designer or artist, and won’t be compiling code, or if you want to jump right in and use the Lumberyard Editor and tools, select **Express Install**\. You can always revisit Setup Assistant to add development features\. If you’d like to set up Lumberyard for code development, select **Custom Install**\.

You should run Setup Assistant periodically, especially after you make changes to your environment, to validate and repair settings and paths\. You can also customize Setup Assistant with a configuration file to easily integrate your specific directory structure\.

**Note**  
Some Setup Assistant options require the installation of third\-party software and licenses, so make sure that you consult the terms of service before installing third\-party software\.

## Lumberyard Setup Assistant custom installation<a name="custom-installation"></a>

With **Custom Install**, you specify how you would like to use Lumberyard\. Setup Assistant downloads third\-party software and validates that the environment is properly configured based on your choices\.

1.  Custom installation begins with specifying how you intend to use Lumberyard\.   
![\[Lumberyard Setup Assistant Get Started selection.\]](http://docs.aws.amazon.com/lumberyard/latest/welcomeguide/images/ui-sa-get-started-1.24.png)

1.  Verify the **Path** is correct for your Lumberyard installation\. 

1.  Select options based on your development needs: 
   +  **Run your game project** 
   +  **Run the Lumberyard Editor and tools** 
   +  **Compile the game code**\* \- Select this option if you intend to create new projects with Lumberyard\.
   +  **Compile the engine and asset pipeline**\* \- Select this option if you intend to make changes to the engine or asset pipeline\.
   +  **Compile the Lumberyard Editor and tools**\* \- Select this option if you intend to make changes to Lumberyard Editor or other tools\.
   +  **Compile for Android devices**\*
   +  **Setup for Linux Dedicated Server**\*

**Note**  
If you select any of these options, you might need to perform additional tasks, such as installing Microsoft Visual Studio and installing additional required SDKs\. These tasks display on the **Install software** and **Install required SDKs** pages\.

Select **Visual Studio 2017**, **Visual Studio 2019**, or both\.

**Important**  
The version\(s\) of Visual Studio selected here will be enabled as build platforms, and Visual Studio Solutions will be generated\.
+ Once you are satisfied with your selections, choose **Next** to install required software and SDKs\.

  1.  The **Install software** and **Install required SDKs** pages display a red icon if a requirement cannot be found and a green checkmark for installed requirements\. Missing optional software and SDKs display a yellow icon\. Follow the instructions on each page to install the required software and SDKS\.   
![\[Lumberyard Setup Assistant install required sdks.\]](http://docs.aws.amazon.com/lumberyard/latest/welcomeguide/images/ui-sa-install-sdks-1.23.png)
**Note**  
Ensure the **Third\-party path** on the **Install required SDKs** page is correct for your Lumberyard installation\.

  1.  Install desired *optional* software and SDKs on the **Install software**, **Install optional SDKs**, and **Install plugins** pages by following the instructions on each page\. 

  1.  When you have completed installing software and SDKs, the **Summary** page displays information about your Lumberyard environment\. From the **Summary** page, you can launch the Lumberyard Editor by choosing **Launch Editor**\. If you’d like to choose an existing project or create a new project, choose **Configure project** to launch Project Configurator\. 