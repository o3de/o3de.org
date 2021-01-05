---
description: ' Learn more about the &project-configurator; for &ALYlong;. '
slug: configurator-how-it-works
title: Understanding the &project-configurator;
---
# Understanding the Project Configurator<a name="configurator-how-it-works"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

The Project Configurator is an application for specifying the settings that affect building and editing of your game project\. When you work with the Project Configurator, note the following changes\.

**Topics**
+ [Set Default \(Active\) Project](#configurator-debugging-set-default)
+ [Create a New Project](#configurator-debugging-create-new)
+ [Enable or Disable Gems](#configurator-debugging-enable-disable-gems)
+ [Create a New Gem](#configurator-debugging-create-new-gem)

## Set Default \(Active\) Project<a name="configurator-debugging-set-default"></a>

When you set the default \(active\) project, the Project Configurator modifies the following files with the following information:

`lumberyard_version\dev\bootstrap.cfg`  
The `sys_game_folder` property specifies the project that the editor and PC launcher attempts to load \(for example, `sys_game_folder=SamplesProject`\)\.

`lumberyard_version\dev\_WAF_\user_settings.options`  
The property `enabled_game_projects` is a comma\-separated list of one or more projects to include in a build\.

## Create a New Project<a name="configurator-debugging-create-new"></a>

When you create a new project in the Project Configurator, several things happen:
+ The Project Configurator uses the `EmptyTemplate` to create a new project\. This template is located in the `lumberyard_version\dev\ProjectTemplates\EmptyTemplate` directory\.
+ The contents of `lumberyard_version\dev\ProjectTemplates\EmptyTemplate\code\EmptyTemplate` are copied to the following directory:

  `lumberyard_version\dev\code\NewProjectName`
+ The contents of `lumberyard_version\dev\ProjectTemplates\EmptyTemplate` are copied to the following directory:

  `lumberyard_version\dev\NewProjectName`
+ The `EmptyTemplate` is replaced in both new directories with the name of your new project, including file names and file contents\.

For more information about templates, see [Project Templates](configurator-projects.md#project-configurator-templates)\.

## Enable or Disable Gems<a name="configurator-debugging-enable-disable-gems"></a>

When you enable or disable a gem in a project, the Project Configurator updates the list of enabled gems that is maintained in `lumberyard_version\dev\Game_Project\gems.json`\. 

For more information, see [Enabling Gems](gems-system-using-project-configurator.md)\.
+ Enabling a gem adds that gem name to the list in `gems.json`\.
+ Disabling a gem removes that gem name from the list in `gems.json`\. 
+ Enabling or disabling a gem updates the `Editor.xml` and `Game.xml` files\. You can find these files in the `lumberyard_version\dev\Game_Project\Config` directory\. These files tell Lumberyard to load the required `.dll` files for the gems that you specify\.
**Note**  
The `Editor.xml` and `Game.xml` files are only updated when you enable or disable gems where `"LinkType":"Dynamic"` in the `gem.json` file\. For more information, see [Gem JSON File](gems-system-structure.md#gem-json-file)\.

## Create a New Gem<a name="configurator-debugging-create-new-gem"></a>

When you use the Project Configurator to create a gem, the following takes place:
+ The content of the gem template \(which is part of the Project Configurator resources and is not directly accessible\) is copied into the `lumberyard_version\dev\Gems\Gem_Name` directory\.
+ Strings with the gem name in the copied content are replaced with the name of your gem to make it a valid gem\.

For more information, see [Creating a Gem](gems-system-gems-creating.md)\.