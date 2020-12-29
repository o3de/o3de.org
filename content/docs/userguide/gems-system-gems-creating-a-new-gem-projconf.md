# Creating a Gem with the Project Configurator<a name="gems-system-gems-creating-a-new-gem-projconf"></a>

Use Project Configurator to create a new, empty gem\.

1. Open the Lumberyard Project Configurator, located at `lumberyard-version\dev\Bin64BuildPlatform\ProjectConfigurator.exe`\. For example, when using Visual Studio 2017 as your build platform, the Project Configurator is located at `lumberyard-version\dev\Bin64vc141\ProjectConfigurator.exe`\.

1. Select the project and click **Enable Gems**\.

1. Click **Create a new Gem** on the gems page for the game project that you selected\.  
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems-system-gems-create-new.png)

1. In the **Create a new gem** dialog box:

   1. For **Name**, enter a name for the gem \(for example, ***MyNewGem***\)\. The name must start with a letter, and only alphanumeric characters and underscore are allowed for the rest of the name\. Other special characters or spaces are not allowed in the name\.

   1. \(Optional\) For **Summary**, enter a description for the gem\. 

      This field also supports hyperlinks using a simple html anchor tag\. When entering this directly into the **Summary** field in the Project Configurator, use the following syntax: 

      **<a href="http://www\.amazon\.com">Amazon</a>**

      If you are editing the `Summary` parameter in the `gem.json` file, use the following syntax:

      ```
      "Summary": "<a href=\"http:\/\/www.amazon.com\">Amazon<\/a>",
      ```

   1. For **Type**, select **Code & Assets** or **Assets Only**\.
      + **Code & Assets** – Contains assets as well as code that performs certain functions upon the assets\.
      + **Assets Only** – Contains only assets and no code\.

   1. Choose **Create Gem**\.   
![\[Create your own gems to use for your game project in Lumberyard.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems-system-gems-create-gem.png)

1. Close the Project Configurator\.

   The following directories and files are created in `\dev\Gems\gem_name\` for 'Assets Only' and 'Code & Assets' gems:
   + `Assets` – Directory of assets for your gem, such as materials, models, textures, and audio files\. The AZ::IO system automatically includes this directory so that you can reference assets provided by your gem\. For example, if you have a material file, `\Assets\materials\MyMaterial.mtl`, you can reference it in your code with the path `materials\MyMaterial.mtl`\.
**Note**  
If this directory is not present, you can manually add it\. If you don't have any assets in your gem, you can remove this folder\.
   + `Gem.json` – Metadata for this gem\. Do not modify the `Uuid` or `Name` fields\. You can specify the following gem metadata fields:
     + `Version` – `n.n.n` \(numerical values only\)\.

       Gem revision is not supported, so you should not plan to increment the revision after shipping the gem\.
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

1. Build your game project:
   + If your gem is a **Code & Assets** gem, you must [build your project](game-build-intro.md)\.
   + If your gem is an **Assets Only** gem, you do not need to build your project\.