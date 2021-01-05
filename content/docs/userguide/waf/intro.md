---
description: ' Use the &waf-system; to switch build pipelines and build only what
  you need for your &ALY; game project. '
slug: waf-intro
title: Using the &waf; Build System
---
# Using the Waf Build System<a name="waf-intro"></a>

Lumberyard uses the Waf build system to allow you to switch between various build pipelines and to ensure you build only what is needed\. You can use extensions, such as automatic project generation, or a simple GUI to modify the command line base system for your project requirements\. 

You can run Waf using the following methods:
+ Command line window
+ Waf\-generated, Visual Studio solution file\. Waf creates a Visual Studio solution file along with the projects specified in the selected project specs\. If more than one spec file includes the same project, only one project file is created to prevent duplicates\. Waf uses the project specs to determine the projects, project filters, and possible build configurations\. Waf uses the wscript files to identify individual project definitions\.

**Note**  
Waf is compatible with the version of Python 3 that comes bundled with Lumberyard\.

Lumberyard includes the [Project Configurator](/docs/userguide/configurator/intro.md), a standalone application that allows you to specify to Waf which game templates and assets \(Gems\) to include in the game build\.

**Topics**
+ [Waf File System](/docs/userguide/waf/files.md)
+ [Waf Commands and Options](/docs/userguide/waf/commands.md)
+ [Waf Supported Operating Systems and Compilers](/docs/userguide/waf/platforms-compilers.md)
+ [Waf Project Settings](/docs/userguide/waf/project-settings.md)
+ [Using the Waf Artifacts Cache](/docs/userguide/waf/artifacts-cache.md)
+ [Adding Third\-Party Libraries](/docs/userguide/waf/adding-third-party-libraries.md)
+ [Creating Third\-Party Library Configuration Files for Waf](/docs/userguide/waf/third-party-library-configurations.md)
+ [Waf Extensions](/docs/userguide/waf/extensions.md)
+ [Using Waf](/docs/userguide/waf/using-intro.md)
+ [Adding User Settings to Waf](/docs/userguide/waf/user-settings.md)
+ [Adding Qt 5 Content to Waf](/docs/userguide/waf/qt-content.md)
+ [Using Uber Files](/docs/userguide/waf/uber-files.md)
+ [Debugging Waf](/docs/userguide/waf/debug.md)