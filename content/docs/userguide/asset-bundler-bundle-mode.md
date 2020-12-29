# Using Bundle Mode to Test Bundles<a name="asset-bundler-bundle-mode"></a>

Bundle mode is a process that lets you enable asset loading to prioritize bundles over loose cache assets\. After you build the seed lists for packaging your game, you can use bundle mode and the `sys_report_files_not_found_in_paks` console variable to test your packaging rules\. Bundle mode makes it easy for you to load and report on issues in all the bundles \(game `.pak` files\) from a location that you specify without creating a release build\. 

Using bundle mode involves two key tasks:
+ Turning on missing asset reporting for assets not in bundles\. This enables "bundle mode"\.
+ Mounting and loading bundles for your game\.

When reporting is enabled, the `sys_report_files_not_found_in_paks` console variable reports when an asset loads that isn't in any of your bundles\. By selectively loading bundles and using the `sys_report_files_not_found_in_paks` command, you can find assets that need to be included in your bundles\.

## Enabling Bundle Mode<a name="asset-bundler-bundle-mode-enabling-bundle-mode"></a>

To enable bundle mode, use the `sys_report_files_not_found_in_paks` console variable and specify a value of `1`,`2`, or `3`\. A value of `1` writes missing files as log entries without issuing warning messages\.

The following list shows valid arguments for the `sys_report_files_not_found_in_paks` console variable\.

```
0 = Disabled 
1 = Log 
2 = Warning 
3 = Error
<Every other value> = Error
```

### Log File Entries<a name="asset-bundler-bundle-mode-log-file-entries"></a>

Missing files are logged with entries similar to the following:

```
Missing from bundle: @assets@\levels\milestone2\auto_resourcelist.txt
```

If you use the `sys_report_files_not_found_in_paks` console variable with the launcher, the error messages are written to a log file in your cache user directory\. On a PC, these are located at `lumberyard_version\dev\Cache\project_name\pc\user\log\logs\pakmissingassets.log`\.

### Setting the Console Variable<a name="asset-bundler-bundle-mode-setting-the-console-variable"></a>

Enabling the console variable before running the editor or launcher ensures that all missing assets are reported\. To ensure that the console variable is always active when you run the editor or launcher, modify the following files:

Editor: `lumberyard_version\dev\editor.cfg`

Runtime: `lumberyard_version\dev\project_name\autoexec.cfg`

You can also enable the console variable at runtime by using the console \(**\~**\) or remote console\. For information about the remote console, see [Universal Remote Console](lumberyard-remote-console.md)\.

## Bundle Mode Commands<a name="asset-bundler-bundle-mode-bundle-mode-commands"></a>

Bundle mode has two commands:
+ **loadbundles** *<bundle\_directory>* *<extension>* – Loads all the bundles from the specified directory into the game\. If no arguments are supplied, the directory defaults to `Bundles` and the extension to `.pak`\.

  For example, if you run the Starter Game project and enter the command `loadbundles` without arguments, Lumberyard loads all source files in the `lumberyard_version\dev\StarterGame\Bundles` directory that have the extension `.pak`\.
+ **unloadbundles** – Unload any bundle that was loaded through the `loadbundles` command\.

## Using Bundle Mode Example<a name="asset-bundler-bundle-mode-using-bundle-mode-example"></a>

The following procedure shows how bundle mode works\. In the example, game mode is entered when a bundle is missing\.

**To test bundle mode**

1. In the console window, enter the following command:

   ```
   sys_report_files_not_found_in_paks 1
   ```

   The `1` argument specifies that missing files are reported as log entries rather than warnings or errors\.

1. Enter game mode\. A list of Missing from bundle errors displays\.  
![\[Missing from bundle errors in the console window.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/assetbundler/asset-bundler-bundle-mode-1.png)

1. Enter the command `loadbundles` to load bundles for the level\.  
![\[Using the loadbundles command.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/assetbundler/asset-bundler-bundle-mode-2.png)

   There are fewer errors, but some assets are still missing\. The [Asset Validation Gem](asset-bundler-asset-validation-gem.md) seed\-related commands can help find the missing assets\.

1. Use the Asset Validation gem `addseedpath` command to add a likely missing bundle\.

   ```
   addseedpath levels\milestone2\level.pak
   ```

1. Enter the `listknownassets` command\.  
![\[Listing known assets in the console.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/assetbundler/asset-bundler-bundle-mode-3.png)

1. Examine the output\. In the following example, the output shows missing button assets\.  
![\[Identifying missing assets in the output.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/assetbundler/asset-bundler-bundle-mode-4.png)

   In the case of the button assets, the bundle was packaged a while ago and must be repackaged\. However, other assets are also still missing\.

1. Add the missing assets to the seed list for the level\.

1. Run the [bundling commands](asset-bundler-command-line-reference.md) for the level\.

1. Drop the bundles into the `Bundles` directory\.

1. Enter an `assetbundlerbatch assetlists` command, as shown in the following example\. Use the `--print` argument to check the output\. In the example, the single\-line command has been formatted for readability\.

   ```
   assetbundlerbatch assetlists 
         --addseed levels\milestone2\level.pak 
         --addseed levels\milestone2\milestonecutscene.scriptevents 
         --addseed levels\milestone2\hardcodedassetreference.luac 
         --print
   ```

1. Verify that the output displays as expected\.

1. Enter the `assetbundlerbatch assetlists` command again to bundle the assets, but this time without the `--print` argument\. The example command is single\-line, but has been formatted for readability\.

   ```
   assetbundlerbatch assetlists 
         --addseed levels\milestone2\level.pak 
         --addseed levels\milestone2\milestonecutscene.scriptevents 
         --addseed levels\milestone2\hardcodedassetreference.luac 
         --platform pc 
         --assetlistfile DemoLevelList.assetlist
   ```

   Output:

   ```
   Saving Asset List file to ( G:\P4\dev\DemoLevelList_pc.assetlist )...
   Save successful! ( G:\P4\dev\DemoLevelList_pc.assetlist )
   ```

1. Enter an `assetbundlerbatch bundles` command, as shown in the following example\.

   ```
   assetbundlerbatch bundles 
         --assetlistfile DemoLevelList_pc.assetlist 
         --platform pc 
         --outputbundlepath G:\P4\dev\DemoProject\Bundles\milestone2.pak
   ```

   Output:

   ```
   Creating Bundle ( G:\P4\dev\DemoProject\Bundles\milestone2_pc.pak )...
   Bundle ( G:\P4\dev\DemoProject\Bundles\milestone2_pc.pak ) created successfully!
   ```

1. Enter the `loadbundles` command to reload the bundles, and then enter game mode\.  
![\[All loaded assets are now in bundles.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/assetbundler/asset-bundler-bundle-mode-5.png)

   All the assets loaded when game mode was entered are now in bundles\.