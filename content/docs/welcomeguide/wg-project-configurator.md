---
description: ' Learn about the Amazon Lumberyard Project Configurator and basic project
  management. '
slug: wg-project-configurator
title: Manage Lumberyard projects with Project Configurator
---
# Manage Lumberyard projects with Project Configurator<a name="wg-project-configurator"></a>

Project Configurator configures and manages your Lumberyard projects\. If you’re continuing from [Configuring your Amazon Lumberyard environment with Setup Assistant](wg-setup-assistant.md), Project Configurator should be running on your desktop\. Project Configurator can also be launched from the Start Menu or desktop shortcuts\.

With Project Configurator, you can:
+ Set a default project\.
+ Create new projects\.
+ Add code or asset features to your project by enabling Gems\.
+ Create new Gems that can be added to projects\.
+ Build projects\.
+ Set advanced game and editor settings per project\.

![\[Lumberyard Project Configurator.\]](/images/welcomeguide/ui-project-configurator-1.24.png)

## Select a project<a name="project-select"></a>

Lumberyard has several example projects that you can work with to learn Lumberyard’s features\. To select a project, choose the project’s icon\. The selected project is highlighted with a check mark\.

**Important**  
If you’re new to Lumberyard and would like to explore its tools and features quickly, we strongly recommend using the default **StarterGame** project\. Changing or modifying the default project, or creating a new project will require rebuilding the Lumberyard game and engine\. The initial build for a Lumberyard project can take two hours or more depending on your system specifications\.

![\[Lumberyard Project Configurator.\]](/images/welcomeguide/ui-pc-set-active-1.24.png)

To load a project in Lumberyard Editor, the project must be set to default\. While the project is selected, choose the **Set as default** button in the upper right\-hand corner of the Project Configurator window\. If the **Set as default** button is inactive, the selected project is already the default project\.

![\[Lumberyard Project Configurator.\]](/images/welcomeguide/ui-pc-set-default-1.24.png)

## Create a new project<a name="project-create"></a>

When you create a new project Project Configurator creates a new directory in `lumberyard_version\dev\` with your project’s name\. Any project\-specific files like configuration data, assets, levels, and scripts live within this project directory\. Throughout this process, Project Configurator creates the necessary files and Visual Studio solutions, then builds your project\. This process can take some time\.

1.  Choose the **Create new** button in the upper left of the Project Configurator to bring up the **Create a new project** window\.   
![\[Lumberyard Project Configurator create new.\]](/images/welcomeguide/ui-pc-create-new-1.24.png)

1.  In **Create a new project** give your project a name in the upper left and select either the **Default** or **Empty** project template\.   
![\[Lumberyard Project Configurator new project.\]](/images/welcomeguide/ui-pc-new-project-1.23.png)
**Note**  
Many features in Lumberyard are implemented in packaged extensions called Gems\. The **Default** project template contains a basic set of commonly used Gems\. The **Empty** project template contains a minimal set of required Gems\. Once you have created a project, you can add or remove Gems\.

1.  Choose **Create project**\. A new window displays your progress as your project is created and built\. The build process can take some time based on your system\.   
![\[Lumberyard Project Configurator new project build.\]](/images/welcomeguide/ui-pc-project-build-1.24.png)

1.  When your new project has been built, choose **Continue** to return to the main Project Configurator interface\. Your new project should be selected\. If not, choose the project icon to select it\. Choose the **Set as default** button to make your project the default project\. 

1.  Your project is now ready\. You can move on to Lumberyard Editor or take the time to explore some of the advanced features of the Project Configurator before moving on\. Next to your new project icon are three links: 
   +  **Enable Gems** 

     Choose **Enable Gems** to open the Gems editor\. Gems are packaged extensions that add new features and assets to your project\. You can create your own Gems here, similarly to how you created a new project\. Scrolling down the list of available Gems, you’ll notice that some gems are enabled \(their box is checked\)\. To add or remove Gems, check or uncheck the box next to the Gem\.  
![\[Lumberyard Project Configurator Gems editor.\]](/images/welcomeguide/ui-pc-gems-1.23.png)
**Note**  
Adding or removing Gems might require rebuilding your project, which can take some time\. To rebuild your project, choose the **Rebuild** button on the main Project Configurator page\.
   +  **Advanced Game Settings** 

     Choose **Advanced Game Settings** to open the game settings view\. In this view, you can modify your project’s memory allocation and other settings that are exposed by Lumberyard, as well as the Gems that have been added to your project\.
   +  **Advanced Editor Settings** 

     Choose **Advanced Editor Settings** to open the settings view\. In this view, you can modify Lumberyard Editor settings for your project\.