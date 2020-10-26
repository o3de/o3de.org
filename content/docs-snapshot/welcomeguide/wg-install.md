# Installing Amazon Lumberyard<a name="wg-install"></a>

Use the download link below to get the latest **Lumberyard Installer** application\.

![\[download button\]](http://docs.aws.amazon.com/lumberyard/latest/welcomeguide/images/download-button.png)

## Run the Lumberyard installer<a name="lumberyard-installer"></a>

Navigate to your `Downloads` directory and run `LumberyardInstaller.exe` to download, extract, and install Lumberyard\.

![\[LumberyardInstaller.exe.\]](http://docs.aws.amazon.com/lumberyard/latest/welcomeguide/images/ui-installer-1.23.png)

The default Lumberyard installation path is `C:\Amazon\Lumberyard\`\. To set a different installation path, choose the **Options** button\. Choose the **Install** button to begin installation\. The process can take some time, depending on your internet connection speed\.

**Note**  
In some situations, the Lumberyard Installer can hang and refuse to progress\. The only known remedy at this time is to forcibly terminate the installer through the Windows Task Manager and reboot, then retry the installation\.

The installer displays an **Installation Successfully Completed** message\. Click **Launch Lumberyard Setup Assistant** to continue with setup\.

## Lumberyard's executables<a name="executables"></a>

 `LumberyardInstaller.exe` creates shortcuts on the desktop and in the Start Menu for three applications:

 [Configuring your Amazon Lumberyard environment with Setup Assistant](wg-setup-assistant.md)   
+ Setup Assistant configures Lumberyard’s environment according to your development needs, and downloads and installs additional software and SDKS\. You can use Setup Assistant at any time to add development features to your Lumberyard environment\.

  SetupAssistant\.exe is located in `lumberyard_version\dev\Tools\LmbrSetup\Win`\.

 [Manage Lumberyard projects with Project Configurator](wg-project-configurator.md)   
+ With Project Configurator, you create, configure, set, and build projects\. When you run Project Configurator for the first time, you see several sample projects that are available to help you learn Lumberyard’s features\.

  ProjectConfigurator\.exe is located in `lumberyard_version` `\dev\Bin64vc141_or_vc142`\.

 [Introduction to the Lumberyard Editor](wg-editor.md)   
+ Lumberyard Editor is Lumberyard’s core application\. In Lumberyard Editor, you create levels, assets, and interactions for your projects\.

  Editor\.exe is located in `lumberyard_version` `\dev\Bin64vc141_or_vc142`\.

## Lumberyard's directory structure<a name="directory-structure"></a>

The default Lumberyard installation location is `C:\Amazon\Lumberyard\lumberyard_version\`\. The root directory contains the following directories and files:
+  `dev` 
  +  `_WAF_`: Waf build system files\.
  +  `Bin64`: Binaries and configuration files for the Resource Compiler\.
  +  `Bin64vc141`: Binaries and configuration files for Visual Studio 2017\.
  +  `Bin64vc142`: Binaries and configuration files for Visual Studio 2019\.
  +  `Code`: Source files and solution files for the Lumberyard engine and tools\.
  +  `Editor`: Editor assets\.
  +  `Engine`: Engine assets\.
  +  `Gems`: Modular components and assets\.
  +  `MultiplayerSample`: Multiplayer sample project that demonstrates how to build a multiplayer game with the component entity system\.
  +  `ProjectTemplates`: Configuration files, libraries, and scripts for the empty template\.
  +  `SamplesProject`: Sample project\.
  +  `StarterGame`: A full example game with 3D environments, event scripting, and basic enemy AI\.
  +  `Tools`: Third\-party tools and plugins\.
  +  `engineroot.txt`: System file required by Lumberyard Setup Assistant to verify the directory\.
+  `3rdParty` 
  + Third\-party software required to use or compile Lumberyard\.
  +  `3rdParty.txt`: System file used by other third\-party tools to verify the directory\.