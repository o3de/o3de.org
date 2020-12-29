description: ' Debug the &project-configurator; in &ALYlong;. '
slug: configurator-debugging
title: Troubleshooting
---
# Troubleshooting<a name="configurator-debugging"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

Review the following if you experience issues when using the Project Configurator\.

**Perforce integration**  
If you have enabled Perforce integration with the tooling, then the Project Configurator automatically checks the following files out of Perforce\. If not, then update the read only flag manually:
+ `project_asset_folder\gems.json`
+ `project_asset_folder\game.cfg`
+ `lumberyard_version\bootstrap.cfg`
+ `lumberyard_version\dev\game_project_folder\project.json`

**Cannot create a new project**  
Make sure that the `lumberyard_version\dev\game_project_folder\project.json` file is editable\.

Ensure that the name entered is valid and does not contain special characters or whitespaces\.

**Cannot enable or disable a gem**  
Make sure that the `project_asset_folder\gems.json` file is editable before trying to save changes made to gems being enabled or disabled\.

**New project or gem does not appear in Visual Studio**  
Make sure that you have run `lmbr_waf configure` from a command line, which regenerates the Visual Studio solution to include the new project or gem\.

If the project or gem still does not show up in Visual Studio, ensure that the `enabled_game_projects` field in the `lumberyard_version\dev\_WAF_\user_settings.options` file is set to the name of your project\.

**Wrong project gets loaded in Lumberyard Editor**  
Ensure that the `lumberyard_version\dev\bootstrap.cfg` is editable\. Then, open the Project Configurator, select the project to open, and choose **Set as default**\.

![\[Image NOT FOUND\]](/images/userguide/assetbundler/asset-bundler-project-configurator-1.25.png)

Also ensure that the `sys_game_folder` field in the `lumberyard_version\dev\bootstrap.cfg` file is set to the name of your project\.