# Asset IDs and File Paths<a name="asset-pipeline-developers"></a>

Consult this section if you are a game engineer who needs to port older game code or develop new code or tools\.

## File Path Aliases versus Asset IDs<a name="asset-pipeline-developers-asset-names"></a>

All files accessed for the game runtime go through an interface that supports aliasing of file paths by name\. For example, the alias `@ROOT@` refers to the root directory where the `bootstrap.cfg` file is located\. If you need to open a file in the root directory, do not go to the root directory or use the current working directory\. Instead, use the file name, such as `@root@/filename.cfg`\. The various Lumberyard subsystems correctly resolve the alias\.

Other aliases available include the following:
+ `@log@` – For storing forensic data, such as crashes, logs, traces, performance drops, and unit test output\. 
+ `@cache@` – For storing data that can be cleaned out at any time and does not need to persist\. 
+ `@user@` – For storing data that needs to persist between users\. Note that some operating systems may back up this data to the cloud, such as for user preferences\. 
+ `@assets@` – The location of the asset cache\. If no alias is specified, this is assumed, so it is almost never necessary to specify this\.
+ `@devroot@` – The root of your development tree where the editable `engineroot.txt` file is located\. This file is shared by many game projects and used by the editor and other tools\.
+ `@devassets@` – The root of your source asset directory for your game, which is used by the editor and tools\. 

The following are examples of asset IDs:

```
textures/mytexture.dds
objects/rain/droplet.cgf
gamedata.xml
levels/mainlevel/mainlevel.xml
```

The following examples are file paths and not assets IDs:

```
@assets@/textures/mytexture.dds


@root@/system.cfg
C:\dev\mystuff.txt
\\networkdrive\somefile.dat
```

The following example is invalid as it mistakenly assumes that the asset cache has the same name as the game and that it is a child folder of the root directory\. This isn't true on all operating systems:


****  

|  | 
| --- |
| @root@/GameName/textures/mytexture\.dds | 

When referring to assets during runtime, always use the asset ID\. Do not prefix asset IDs with `@assets@` or the game name, and do not concatenate them with custom strings\. Treat asset IDs as immutable data that are not strings and that refer to specific assets\. For example, store `textures/mytexture.dds`, not `gems/rain/mytexture.tif`\.

You can use the `FileIO` interface, which is accessible through `gEnv->pFileIO`, to resolve aliased names to full paths if you want to point to an external disk loading tool such as `Qt QFile()`\. This should almost never be necessary during runtime\. If you do use this, your system cannot use remote asset access or support live reloading\.

## Converting Asset IDs to Full Paths<a name="asset-pipeline-developers-game-code"></a>

If you are writing a new editor tool or porting an existing one from a legacy system, keep in mind the separation between game code and editor code\. Game code cannot manipulate asset IDs, and therefore it is invalid to retrieve the game path or concatenate game names with path names\. The game code and game modules also have no access to source control, so relying on the game to find out where to save files will not work\.

Instead, develop your editor code in such a way that the editor decides where files are saved, and optionally loaded from, and correctly interfaces with source control and the asset processing system\. \(Source control and asset processing are overhead that is governed by the editor tool, not the game\.\)

The following utilities and guidelines are provided to make this easier:
+ Store only asset IDs for all source assets\. For example, if you are writing a file that refers to other files, do not store `C:\lumberyard_version\dev\MyGame\myasset.txt` in the file's data, for example\. Instead, just store `myasset.txt`, its asset ID\. 
+ If you are in an editor tool, link to EditorCore, and then do the following: 
  + \#include `<PathUtil.h>`
  + Call `Path::FullPathToGamePath(string)` to convert any full path into a game asset ID automatically\.
  + Call `Path::GamePathToFullPath(string)` to convert any asset ID into a full source asset name\. 
  + Call `Path::GetEditingGameDataFolder` to see where to save files that do not exist yet, such as for a **File Save** dialog\. 
+ If you are working in a new system that does rely on legacy systems, you can use an EBus, which has the same functionality as described above\. For more information about the EBus, see [Event Bus \(EBus\)](https://docs.aws.amazon.com/lumberyard/latest/userguide/asset-pipeline-ebus.html) in the [Amazon Lumberyard User Guide](https://docs.aws.amazon.com/lumberyard/latest/userguide/)\.
  + `#include <AzToolsFramework/API/EditorAssetSystemAPI.h>`
  + Call EBus messages `ConvertFullPathToRelativeAssetPath` and `ConvertRelativeAssetPathToFullPath` to convert back and forth\. 
  + Call EBus messages `GetAbsoluteDevGameFolderPath` to get the game directory for **File Save** dialogs\. Use this only when you do not have an asset ID already, such as in the case of new files\. 

As an example, the following steps code a tool that provides a list of all available assets of type `sprite`:

**To make a list of available sprite assets**

1. Use the `gEnv->pCryPak` file\-finding functions to search for all asset IDs\. Usually, since `@assets@` is assumed, just the directory name or extensions are all that is required, but aliases are accepted\. 

1. Once you have the asset ID list, call `GamePathToFullPath` or `ConvertRelativeAssetPathToFullPath` to convert the list to full source names\. 

1. Display the appropriate name in the UI, either the real source name or the output name\. 

1. To edit the file, use the source name to check it out from source control\.

1. To save the file, make sure to write it to the source name, not the target name\.

1. When the asset compiler recompiles the asset, it notifies you using the asset ID\. Make sure you compare the incoming name to this asset ID\.

## Live Update Messages<a name="asset-pipeline-developers-messages"></a>

If you are on a PC or you are connected to VFS, you can listen for live update messages from the Asset Pipeline and reload your assets when you get them\.

To do this, do the following:
+ `#include <IAssetSystem.h>`
+ Subscribe a listener to the `AssetSystemBus`\. Subscribers connect through the CRC of the file extensions that they are interested in\. Search for `"AssetChanged"` to see examples in various systems\.

  Here is an example: `BusConnect(AZ_CRC("dds")); // Be notified of all DDS file changes.` 

Once you get your live reload notification, it contains an asset ID\. Consider queueing the request for later if you are in a thread\-sensitive module\.