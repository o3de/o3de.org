# Using the Waf Build System<a name="waf-intro"></a>

Lumberyard uses the Waf build system to allow you to switch between various build pipelines and to ensure you build only what is needed\. You can use extensions, such as automatic project generation, or a simple GUI to modify the command line base system for your project requirements\. 

You can run Waf using the following methods:
+ Command line window
+ Waf\-generated, Visual Studio solution file\. Waf creates a Visual Studio solution file along with the projects specified in the selected project specs\. If more than one spec file includes the same project, only one project file is created to prevent duplicates\. Waf uses the project specs to determine the projects, project filters, and possible build configurations\. Waf uses the wscript files to identify individual project definitions\.

**Note**  
Waf is compatible with the version of Python 3 that comes bundled with Lumberyard\.

Lumberyard includes the [Project Configurator](configurator-intro.md), a standalone application that allows you to specify to Waf which game templates and assets \(Gems\) to include in the game build\.

**Topics**
+ [Waf File System](waf-files.md)
+ [Waf Commands and Options](waf-commands.md)
+ [Waf Supported Operating Systems and Compilers](waf-platforms-compilers.md)
+ [Waf Project Settings](waf-project-settings.md)
+ [Using the Waf Artifacts Cache](waf-artifacts-cache.md)
+ [Adding Third\-Party Libraries](waf-adding-third-party-libraries.md)
+ [Creating Third\-Party Library Configuration Files for Waf](waf-third-party-library-configurations.md)
+ [Waf Extensions](waf-extensions.md)
+ [Using Waf](waf-using-intro.md)
+ [Adding User Settings to Waf](waf-user-settings.md)
+ [Adding Qt 5 Content to Waf](waf-qt-content.md)
+ [Using Uber Files](waf-uber-files.md)
+ [Debugging Waf](waf-debug.md)