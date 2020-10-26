# Creating a Gem from the Command Line<a name="gems-system-gems-creating-a-new-gem-cmdline"></a>

You can also use the command line to create a gem\. You can do this in either the command line or the [Project Configurator](gems-system-gems-creating-a-new-gem-projconf.md)\.

If you add a **Code & Assets** gem, you must [build your project](game-build-intro.md) after adding the gem\. **Asset Only** gems do not require a rebuild\.

**To create a gem with the command line**

1. Open a command\-line prompt and navigate to the `lumberyard_version\dev\Bin64vc141` directory\.

1. Enter one of the following commands:
   + Create a **Code & Asset** gem if your gem contains assets as well as code that performs certain functions upon the assets\.

     ```
     lmbr gems create MyNewGem
     ```
   + Create an **Assets Only** gem if your gem contains only assets and no code\.

     ```
     lmbr gems create MyNewGem -asset-only
     ```

1. Close the command line\.

   The following directories and files are created in `\dev\gems\gem_name\` for 'Assets Only' and 'Code & Assets' gems:
   + `Assets` – Directory of assets for your gem, such as materials, models, textures, and audio files\. The AZ::IO system automatically includes this directory so that you can reference assets provided by your gem\. For example, if you have a material file, `\Assets\materials\MyMaterial.mtl`, you can reference it in your code with the path `materials\MyMaterial.mtl`\.
**Note**  
If this directory isn't present, you can manually add it\. If you don’t have any assets in your gem, you can remove this folder\.
   + `Gem.json` – Metadata for this gem\. Don't modify the `Uuid` or `Name` fields\. You can specify the following gem metadata fields:
     + `Version` – `n.n.n` \(numerical values only\)\.

       Gem revision isn't supported, so you shouldn't plan to increment the revision after shipping the gem\.
     + `DisplayName` – Friendly display name\. Can contain spaces\.
     + `Tags` – Searchable tags that are displayed in Project Configurator under the gem's summary\. Enter this as a comma\-separated list of strings\.
     + `IconPath` – Path to the gem's display icon\.
     + `Summary` – Detailed description of the gem\. This parameter supports hyperlinks\. To specify a hyperlink, use the following syntax:

       ```
       "Summary": "<a href=\"http:\/\/www.amazon.com\">Amazon<\/a>",
       ```
     + `Dependencies` – You can specify a dependency on another gem or on an engine version\. Edit the `_comment` metadata\.

       ```
       "Dependencies": [       
          {           
              "Uuid": "540faf970c994668b5d02c66a39c6625",           
              "VersionConstraints": [
                  ">1"           
              ],           
              "_comment": "zzzTestVer001"       
          }
       ],
       ```
   + `preview.png` – Preview image displayed in the **Project Configurator** gem’s list\.

   For 'Code & Assets' gems, the following files and directories are also created \(in addition to the files listed above\):
   + `Code\gem_name.waf_files` – Waf files json for your gem that specifies which files are built, how files should be combined into uber files, and how files are filtered in the Visual Studio Project\.
   + `Code\gem_name_test.waf_files` – Additional files to include when building with the test specification\.
   + `Code\wscript` – Waf wscript Python file that defines libraries and other build settings used by your gem\.
   + `Code\Include\gem_name\gem_name_Bus.h` – Globally visible header that can be included by any project that uses your gem, or by other gems that depend on it\. External code can call into your gem's module and receive events from your module through public event buses\. Event buses allow simple and safe function calls between different modules of code\.
   + `Code\Source\gem_nameModule.cpp` – Implementation of the `gem_nameModule`\. Starting in Lumberyard 1\.5, new gems are built around AZ modules\. The default module registers one system component, the `gem_nameSystemComponent`\.
   + `Code\Source\gem_nameSystemComponent.h` – Header for the `gem_nameSystemComponent` implementation\. This component is registered by the `gem_nameModule` and is a handler for the `gem_nameBus`\.
   + `Code\Source\gem_nameSystemComponent.cpp` – `gem_nameSystemComponent` implementation\. Inside this component are the typical `Activate`, `Deactivate`, `Init`, and `Reflect` methods\.
   + `Code\Source\StdAfx.cpp` – `Code\Source\StdAfx.h`
   + `Code\Tests\gem_nameTest.cpp`

1. If your gem is labeled **Assets Only**, you don't need to build your project\.

   If your gem is labeled **Code & Assets** gem, you must [build your project](game-build-intro.md)\.