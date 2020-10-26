# Creating an AZ Module That Is Not a Gem<a name="az-module-create-non-gem"></a>

****  
AZ modules are in preview release and subject to change\. 

Beginning with Lumberyard 1\.5, gems are AZ modules, so the preferred way to build an AZ module is to simply create a new gem\. However, if your project requires an AZ module that must not be built as a gem, follow the steps provided here\.

## A\. Start with a Gem<a name="az-module-create-non-gem-start"></a>

Because gems have all the required code for an AZ module, it's easier to create a gem first and then modify it not to be a gem\. As an added convenience, the new gem names the code for you in an intuitive way\. For an explanation of the code that you get in a new gem, see [Parts of an AZ Module, Explained](az-module-parts.md)\.

**To create and modify a gem**

1. First, create a gem by performing the following steps:

   1. Open the Lumberyard Project Configurator, located at `lumberyard-version\dev\Bin64BuildPlatform\ProjectConfigurator.exe`\. For example, when using Visual Studio 2017 as your build platform, the Project Configurator is located at `lumberyard-version\dev\Bin64vc141\ProjectConfigurator.exe`\.

   1. Select your project \(the default is **SamplesProject**\)\.

   1. Click **Enable Gems**\.

   1. Click **Create a New Gem**\.

   1. Enter the name for your new module\. \(The example on this page uses the name "HelloWorld"\.\)

   1. Click **Ok**\.

1. Move and rename the `code` directory from the new gem to your desired location\. For example, move the directory

   `dev/Gems/HelloWorld/Code` 

   to

   `dev/Code/<optional subfolder>/HelloWorld` 

1. To remove the remaining noncode pieces of the gem, delete the directory `dev/Gems/HelloWorld`\.

## B\. Modify the AZ Module Declaration<a name="az-module-create-non-gem-modify-declaration"></a>

AZ modules that are not gems must not have UUIDs in their names, so you must modify the gem's `.cpp` file accordingly\.

**To modify the `.cpp` file**

1. Remove the code that looks like the following:

   ```
   // DO NOT MODIFY THIS LINE UNLESS YOU RENAME THE GEM
   // The first parameter should be GemName_GemIdLower
   // The second should be the fully qualified name of the class above
   AZ_DECLARE_MODULE_CLASS(HelloWorld_010c14ae7f0f4eb1939405d439a9481a, HelloWorld::HelloWorldModule)
   ```

1. Replace the `AZ_DECLARE_MODULE_CLASS` declaration with one that follows this syntax:

   ```
   AZ_DECLARE_MODULE_CLASS(HelloWorld, HelloWorld::HelloWorldModule)
   ```

   The first argument \(`HelloWorld`\) is a unique identifier to be included in your `project.json` file, and should match the `target` field of your wscript\. You will do these steps later\. The second argument is the same fully qualified name of the class already defined in your `.cpp` file\.

## C\. Remove CryEngine References \(Optional\)<a name="az-module-create-non-gem-remove-cryengine-references"></a>

If your module does not access code from CryEngine \(for example, it does not access `gEnv`\), perform these additional steps\.

**To remove CryEngine references**

1. Make the following changes to your `.cpp` file \(in this example, `HelloWorldModule.cpp`\)\.

   1. Remove `#include <platform_impl.h>` 

   1. Remove `#include <IGem.h>` 

   1. Add `#include <AzCore/Module/Module.h>` 

   1. Change `HelloWorldModule` to inherit directly from `AZ::Module` instead of from `CryHooksModule`\. 

1. Remove the following include statement from the `StdAfx.h` file:

   `#include <platform.h> // Many CryCommon files require that this be included first.`

## D\. Modify the Wscript and Waf Spec Files<a name="az-module-create-non-gem-modify-wscript-waf"></a>

Next, you must modify the default wscript file to remove gem\-specific commands, add your module directory to the wscript file, and add your module to the appropriate [waf spec files](waf-files-spec-file.md)\.

**To modify the wscript and waf spec files**

1.  Modify the wscript contents to resemble the following:

   ```
   def build(bld):
       bld.CryEngineModule(
           target          = 'HelloWorld',
           vs_filter       = 'Game', # visual studio filter path
           file_list       = 'HelloWorld.waf_files',
           platforms       = ['all'],
           configurations  = ['all'],
           pch             = ['source/StdAfx.h'], 
           use             = ['AzFramework'],
           includes        = ['include', 'source'],
       )
   ```

1. Modify the wscript in a parent directory so that waf recurses your module's directory, as in the following example\.

   ```
   # ...
    
   SUBFOLDERS = [
       # ...,
       'HelloWorld'
       ]
    
   # ...
   ```

1. To enable waf to build your module, add the module to the appropriate waf spec files in your Lumberyard directory \(`dev\_WAF_\specs\*.json`\), as in the following example:

   ```
   {
       // ...
       "modules":
       {
           // ...
           "HelloWorld"
       }
       // ...
   }
   ```

## E\. Configure Your Project to Load the New Module<a name="az-module-create-non-gem-load"></a>

When your project launches, it loads the modules listed in the `dev/<project_assets>/Config/Game.xml` file \(the `Editor.xml` file is used when Lumberyard Editor is launched\)\. These files are automatically generated and should not be edited by hand\.

**To configure your project to load your AZ module**

1. To ensure your non\-gem module is included in these automatically generated lists, add the following lines to your `project.json` file \(path location `dev/<project_asset_folder>/project.json`\):

   ```
   {
       // ...
       "flavors": {
           "Game": {
               "modules": [
                   "LmbrCentral",
                   "HelloWorld"
               ]
           },
           "Editor": {
               "modules": [
                   "LmbrCentralEditor",
                   "HelloWorld"
               ]
           }
       }
   }
   ```
**Note**  
The flavors section may be missing from your project\. If it is not present, Lumberyard assumes that the `LmbrCentral` module is used for `Game`, and that the `LmbrCentralEditor` module is used for `Editor`\.

1. From the dev directory, run the following command from a command prompt\.

   ```
   Bin64\lmbr.exe projects populate-appdescriptors 
   ```

   This command modifies the `Game.xml` and `Editor.xml`  files to list the `HelloWorld` module\.

## F\. Add the Module's Public Interfaces to Your Project's Include Paths<a name="az-module-create-non-gem-add-interfaces"></a>

Finally, to make your AZ module's public interfaces available to the rest of your project, you must inform them project of your module's `include` directory\.

**To make your AZ modules public interfaces available to your project**
+ In your project's wscript file, edit the `includes` line to point to your project's include directory, as in the following example\.

  ```
  # ...
  includes = [..., bld.Path('Code/Engine/HelloWorld/include')],
  # ...
  ```