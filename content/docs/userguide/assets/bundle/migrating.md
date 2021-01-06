---
description: ' Learn how to migrate your existing &ALYlong; game project to use the
  &asset-bundler; system. '
title: Migrating a Game Project to the &asset-bundler;
---
# Migrating a Game Project to the Asset Bundler<a name="asset-bundler-migrating"></a>

If you already have an existing Lumberyard project, and you want to use the new Asset Bundler for your game assets, complete the following steps to update your project: 
+ Fix missing product dependencies\.
+ Create a release build using files that are generated with the Asset Bundler\.

## Fix Missing Dependencies<a name="asset-bundler-migrating-fix-dependencies"></a>

The Asset Bundler relies on accurate and complete product dependency information to ensure that all assets that are needed for runtime are included in the asset bundle\. This procedure shows how to use new and existing Lumberyard tools to find and fix missing product dependencies\.

1. Identify missing product dependencies in your project\. The missing dependency scanner tool is useful for finding missing product dependencies in projects that don't currently use asset bundling\.
   + [Using the Missing Dependency Scanner](/docs/userguide/assets/bundle/missing-dependency-scanner.md)
   + [Resolving Missing Assets](/docs/userguide/assets/bundle/assets-resolving.md)

1. Update your custom asset builders to output product dependencies\. Be sure to add false positive results to the exclusion list using the file tagging system\.
   + [Implement the Callback for ProcessJobFunction](asset-builder-custom.md#asset-builder-custom-create-builder-class-processjob-callback)
   + [Using the File Tagging System to Include or Exclude Assets](/docs/userguide/assets/bundle/file-tagging.md)

1. Create a seed list and add your required assets as seeds\. You can create a dependencies XML file \(such as `Check Engine/Engine_Dependencies.xml`\) to include optional assets or add multiple seeds using wildcards\. Include the dependencies XML file in the seed list\. 
   + [What is the Amazon Lumberyard Asset Bundler?](/docs/userguide/assets/bundle/overview.md)

1. After you add missing product dependencies and create seed lists, check that product dependencies are being emitted correctly using the Asset Validation Gem with seed mode enabled\.
   + [Using the Asset Validation Gem to Verify Seeds](/docs/userguide/assets/bundle/asset-validation-gem.md)

1. Generate asset bundles using the Asset Bundler command line tools\.
   + [Build and bundle assets for release in Lumberyard](/docs/userguide/assets/bundle/tutorial-release.md)
   + [Lumberyard Asset Bundler Command\-Line Tool Reference](/docs/userguide/assets/bundle/command-line-reference.md)

1. Have the system load up the bundles that you created in Step 5\. Then, use bundle mode to identify any missing assets in the bundle\. Ideally, you don't want to see any missing dependencies, but there is no requirement to resolve them all\.
   + [Using Bundle Mode to Test Bundles](/docs/userguide/assets/bundle/bundle-mode.md)

## Create Release Build with New Asset Bundling System<a name="asset-bundler-migrating-replace-bundles"></a>

After you generate asset bundles to deliver with your game, switch your release build process to use the new asset bundling system\. Use the following instructions to generate content including asset bundles for a release build\. 

1. Configure your game project and set it as the active project\. Go to the starter game walkthrough \([Build and bundle assets for release in Lumberyard](/docs/userguide/assets/bundle/tutorial-release.md)\) and follow Steps 1 through 4\. Be sure to specify your own game project name instead of "StartGame\." The instructions provided in the walkthrough are for PC builds\. If your game uses another operating system, such as macOS, iOS, or Android, specify the correct profile in your `lmbr_waf` and `lmbr_pak_shaders` calls\.

1. If your game runs on the PC operating system, you are ready to create the release build for your game\. You can do this by using command line calls, as described in Steps 5 through 6 of the starter game walkthrough\. Alternatively, create custom scripts to generate your asset bundles and make `.pak` files for your content\. You can customize the samples described in the next section\.

1. If your game runs on any operating system other than PC, follow these steps:

   1. Create a custom RC config file\. You can use the file `RCJob_Generic_MakeAuxiliaryContentPC.xml` as a template and update the operating system and any OS\-specific settings\.

   1. Create a customized batch file\. You can use the file `Build_AssetBundler_AuxiliaryContent_PC.bat` as a template and update the operating system\. You also must update the reference to the RC config file to point to the file that you created in the previous step\.

   1. Run the customized batch file to generate auxiliary data and the asset bundles\.

   1. Add the new bundle files to the directory `gamename_platform_paks/gamename`\. You can do this manually or create custom scripts based on the samples described in the next section\.

## Release Build Sample Scripts<a name="asset-bundler-migrating-replace-bundles-script"></a>

The following sample scripts show how you can simplify and automate basic release build processes for your game projects\. 
+ [`generate_bundle.py`](#asset-bundler-migrating-replace-bundles-script-generatebundle) – This script uses the Lumberyardcommand line calls to generate asset bundle files\.
+ [`ProjectName_MakePaks.py`](#asset-bundler-migrating-replace-bundles-script-makepaks) – This script creates a folder titled `gamename_pc_paks` and copies the base bundle files to the subfolder `gamename_platform_paks/gamename`\. 

### generate\_bundle\.py<a name="asset-bundler-migrating-replace-bundles-script-generatebundle"></a>

```
import argparse
import subprocess
import os
import platform
 
class Args(object):
 
    '''An object that returns None for any undefined properties.'''
 
    def __init__(self, **kwargs):
        if kwargs:
            for k, v in kwargs.items():
                self.__dict__[k] = v
 
    def __str__(self):
        return str(self.__dict__)
 
    def __getattr__(self, name):
        if name in self.__dict__:
            return self.__dict__[name]
        else:
            return None
 
def generate_bundle(args):
    pak_name = args.level
    seed_list_file = 'ProjectName/SeedAssetList.seed'
    asset_list_path = os.path.join('ProjectName', 'AssetLists', pak_name + '_' + args.platform + '.assetlist')
    bundle_path = os.path.join('ProjectName', 'Bundles', pak_name + '_' + args.platform + '.pak')
     
    if platform.system() == 'Windows':
        asset_bundler_batch = 'Bin64vc141/AssetBundlerBatch.exe'
    elif platform.system() == 'Darwin':
        asset_bundler_batch = './BinMac64/AssetBundlerBatch'
 
    asset_lists_command = [
        asset_bundler_batch,
        'assetLists',
        '--assetListFile={0}'.format(asset_list_path),
        '--platform={0}'.format(args.platform),
        '--allowOverwrites']
 
    if args.level:
        seed = 'levels'
        seed = os.path.join(seed, args.level, 'level.pak')
        asset_lists_command.append('--addSeed={0}'.format(seed))
 
    if args.base:
        asset_lists_command.append('--seedListFile={0}'.format(seed_list_file))
        asset_lists_command.append('--addDefaultSeedListFiles')
 
    if args.seedListFile:
        asset_lists_command.append('--seedListFile={0}'.format(args.seedListFile))
 
    # Generate the asset list file
    subprocess.check_call(asset_lists_command)
 
    # Generate the bundle file
    subprocess.check_call(
        [asset_bundler_batch,
        'bundles',
        '--assetListFile={0}'.format(asset_list_path),
        '--outputBundlePath={0}'.format(bundle_path),
        '--platform={0}'.format(args.platform),
        '--allowOverwrites'])
 
    print("Asset list file is stored at {}".format(asset_list_path))
     
    expected_bundle_path = os.path.join('ProjectName', 'Bundles', pak_name + '.' + args.platform + '.pak')
    if os.path.exists(expected_bundle_path):
        os.remove(expected_bundle_path)
 
    os.rename(bundle_path, expected_bundle_path)
    print("Bundle file is stored at {}".format(expected_bundle_path))
 
parser = argparse.ArgumentParser()
parser.add_argument('--level', help='Specify the level name')
parser.add_argument('--platform', required=True, help='Specifies the platform that will be referenced when generating Bundles.')
parser.add_argument('--base', action='store_true', help='Specifies whether it is the base level.')
parser.add_argument('--seedListFile', help='Specifies the seed list file(s) for the level.')
 
parser.set_defaults(func=generate_bundle)
 
args = Args(**parser.parse_args().__dict__)
args.func(args)
```

### ProjectName\_MakePaks\.py<a name="asset-bundler-migrating-replace-bundles-script-makepaks"></a>

```
import argparse
import subprocess
import os
import sys
import shutil
 
def main(context, platformList):
    for platform in platformList:
        # run MakePaks batch (i.e. BuildSamplesProject_Paks_PC.bat) to make base install paks
        subprocess.check_call([context['PakScript'], context['PlatformArgFormat'].format(platform)])
        # run GenerateBundle.py script to generate a level pak
        subprocess.check_call(context['GenerateBundleCmd'] + ['--platform', platform])
        # copy the bundle from ProjectName/Bundles/levelName.<platform>.pak into Cache/ProjectName/<platform>_paks
        shutil.copyfile(os.path.join(context['BundleFolder'], 'levelName.{}.pak'.format(platform)),
            os.path.join(context["CachePath"], "{}_paks".format(platform), "projectname", 'levelName.{}.pak'.format(platform)))
         
dev_dir = os.path.dirname(os.path.realpath(__file__))
 
context = {
    'PakScript': '',
    'GenerateBundleCmd': '',
    'BundleFolder': os.path.join(dev_dir, "ProjectName", "Bundles"),
    'CachePath': os.path.join(dev_dir, "Cache", "ProjectName"),
    'PlatformArgFormat': ''
}
 
# Run this to make the install paks for your app
mygame_pak_script = 'ProjectName_MakePaks.{}'
python = ''
 
if sys.platform == 'darwin':
    context['PakScript'] = os.path.join(dev_dir, mygame_pak_script.format('sh'))
    python = 'python'
    context['PlatformArgFormat'] = '-p={}'
else:
    context['PakScript'] = os.path.join(dev_dir, mygame_pak_script.format('bat'))
    python = os.path.join(dev_dir, 'Tools', 'Python', 'python.cmd')
    context['PlatformArgFormat'] = '{}'
 
 
context['GenerateBundleCmd'] = [python, os.path.join(dev_dir, 'generate_bundle.py'), '--level', 'levelName', '--base']
 
 
parser = argparse.ArgumentParser()
parser.add_argument('--platform', help='Specifies the platform that will be referenced when generating Bundles.')
args = parser.parse_args()
 
print(args)
main(context, [args.platform])
```