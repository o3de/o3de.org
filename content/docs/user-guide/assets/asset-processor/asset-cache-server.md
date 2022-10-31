---
linkTitle: Asset Cache Server Mode
title: Asset Cache Server
description: Enable a feature to reduce asset builds for a team.
weight: 200
toc: true
---

**Asset Cache Server (ACS)** mode allows **Asset Processor** to cache product asset files to a remote directory so that they can be shared across a team.

ACS mode lets Asset Processor fetch preprocessed products of a job from an asset server cache instead of processing it locally. It does this by using a shared directory where Asset Processor writes out product asset archive ZIP files for a processed source asset job. Asset Processor clients retrieve these ZIP files and unzip the product assets instead of processing the source asset from scratch.

# Setting up Asset Processor in ACS mode

Setting up ACS mode so that developers can use it has three parts; setting up an ACS server, setting up ACS clients, and configuring an ACS block.

{{< note >}}
The next sections assume the root folder to be `T:/o3de` but it can be in any folder or it can run on Linux.
{{< /note >}}

## Create the transfer directory

The team needs to create a shared directory that all the team members can access over the network. ACS should work between Windows and Linux, but the `cacheServerAddress` string only accepts a single string such as `T:/o3de/Transfer/Cache` that all the clients are meant to read from. It's possible to have an Asset Processor in ACS mode write to one configured `cacheServerAddress` string via Windows and have another ACS retrieve from a Samba link on Linux. Your team's IT manager can provide a solution for this scenario.

## Using the Shared Cache Tab

The Asset Processor has a tab that manages the settings for the Shared Cache (aka Asset Cache Server).

The panel is broken up into three steps:
 1. Choose a mode via "Set shared cache mode"
 2. Select the transfer directory via "Select a remote folder"
 3. Select the asset patterns that will be cached via "Manage shared cache patterns"

![Create a log tab in Asset Processor](/images/user-guide/assets/asset-processor/acs_snapshot.png)

### Choose a Mode

The Shared Cache mode can be set to:
 1. Inactive - The Shared Cache is not active. All the assets will be processed locally.
 2. Server - The Asset Processor will archive product assets on a remote folder.
 3. Client - The Asset Processor will attempt to retrieve archive product assets from a remote folder.
 
The system defaults to Inactive.

### Select a Transfer Directory

This field should have the full path to the remote folder that was set up in the "Create the transfer directory" step. When the "Save Changes" button is clicked, the system will detect the validity of the transfer directory.

### Manage Shared Cache Patterns

The table shows the active asset patterns that will be cached when the asset is processed on the server. The asset pattern row contains:
 1. a check box to enable or disable the pattern
 2. a text box to store the pattern's name
 3. a combo box how to use the pattern to match source assets (Wildcard or RegEx)
 4. a text box to enter the pattern to match source assets
 5. a button to remove the pattern
 
The enable flag allows a user to toggle the row to disabled to force the local client Asset Processor to process the matching assets. Most of the time the client users will have all patterns enabled.

The `Name` is a label to explain what source assets are being matched. If the name matches the name of an asset builder, the source assets that use the asset builder will cache the product archives.

The `Type` is either `Wildcard` or `RegEx` and tells the system how to use the `Pattern` text to match source asset files. `Wildcard` is normally starts with an asterisk (\*) and is followed by a dot (.) and an extension to match all source assets with a certain extension such as `*.png` and `*.wav` to match PNG and WAV files, respectively. The `RegEx` type interprets the `Pattern` as a regular expression so that projects can specify more advanced matching such as sub-folders or multiple asset types. 

The trash can button can be used to remove an existing asset pattern row. The "+ Add Pattern" can be used to add a new asset pattern row.

### Save or Discard Buttons

The `Save Changes` and `Discard` buttons become enabled when a change to the settings has been detected. The `Save Changes` commits the changes to a settings file. The `Discard` button reverts the panel's values.

The settings file is written to the `{project_folder}/Registry/asset_cache_server_settings.setreg` file. 

If the Remote Folder is set to an invalid folder location, then an error dialog will show up and no settings will be written.

# Asset Cache Server: Settings Details

The settings for the Asset Cache Server are held in `.setreg` files inside the project. The default settings for the Asset Cache Server for the AutomatedTesting project are stored in the `o3de/AutomatedTesting/Registry/asset_cache_server_settings.setreg` file.

This file stores a JSON document where there is a `/AssetProcessor/Settings/Server` key includes at least two keys `assetCacheServerMode` and `cacheServerAddress` to set the Asset Cache Server mode. It can also contain any number of `ACS ` keys to manage the asset patterns to cache.

The `cacheServerAddress` key stores a string field that contains the directory name of the remote folder.

The `assetCacheServerMode` key stores a string to set the mode of the Asset Cache Server. This can be set to `inactive` (the default value) so that the AP will not cache any files (either storing or retrieving). The `server` mode archives the product asset files. The `client` mode retrieves the product archive files.

There can be any number of keys prefixed with `ACS ` to store asset patterns such as `ACS Audio Files` and `ACS PNG Files`. The structure of the `ACS block` is detailed at [`Configuring an ACS block`](#configuring-an-acs-block).

## Configure the Asset Processor in ACS mode as a server

The design of ACS mode is to have one machine contributing to the asset cache in the remote directory and other Asset Processor clients retrieve the cached product asset archive files.

To enable Asset Processor in ACS mode as a server, a `.setreg` file needs these settings:
```json
{
    "Amazon": {
        "AssetProcessor": {
            "Settings": {
                "Server": {
                    "cacheServerAddress": "T:/o3de/cache_server",
                    "assetCacheServerMode": "server",
                    "ACS Atom Image Builder": {
                        "name": "Atom Image Builder",
                        "glob": "*.png",
                        "checkServer": true
                    },
                    "ACS Precompiled Shader Builder": {
                        "name": "Precompiled Shader Builder",
                        "glob": "*.precompiledshader",
                        "checkServer": true
                    },
                    "ACS Scene Builder": {
                        "name": "Scene Builder",
                        "glob": "*.fbx",
                        "checkServer": true
                    },
                    "ACS Shader Asset Builder": {
                        "name": "Shader Asset Builder",
                        "glob": "*.shader",
                        "checkServer": true
                    }
                }
            }
        }
    }
}
```

The previous example enables ACS mode for Asset Processor so that it writes the cached archive files to `T:/o3de/cache_folder` for all FBX files.

The setting key `/AssetProcessor/Settings/Server/assetCacheServerMode` sets the mode of the Asset Cache Server. This example has the `assetCacheServerMode` set to `server`.

The setting key `/AssetProcessor/Settings/Server/cacheServerAddress=<remote_shared_path>` points to a remote directory that the server and all clients can read from and write to. The transfer directory should be set up before launching Asset Processor. This examples sets `<remote_shared_path>` to `T:/o3de/cache_server`.

The setting key `/AssetProcessor/Settings/Server/ACS FBX Glob={}` object specifies FBX source assets as a file type to cache. There can be a number of entries specified in the settings registry where the entry’s title needs to start with the letters ACS such as "ACS Our Textures" and "ACS Audio Files". The "glob" pattern can be used to capture files by extension or some basic matching pattern. It's important to flag the entry with `"checkServer": true` to enable the entry for caching.

## Configure the Asset Processors in ACS mode as clients

To run Asset Processor in ACS mode as a client, the client machine needs access to the remote directory, enable the cache system in client mode, and specify the asset file types to pull from the remote server.

```json
{
    "Amazon": {
        "AssetProcessor": {
            "Settings": {
                "Server": {
                    "cacheServerAddress": "T:/o3de/cache_server",
                    "assetCacheServerMode": "client"
                }
            }
        }
    }
}
```

The setting key `/AssetProcessor/Settings/Server/assetCacheServerMode="client"` enables Asset Processor to run in `client` mode. In this mode, Asset Processor reads the source asset changes, checks the remote directory for the product archives, and processes the asset if it's not found. It's possible to have a hybrid of remote and local source assets since team members will add new assets locally before submitting them to a remote source asset repository.

{{< note >}}
The cache server address should match the ACS server.
{{< /note >}}

## Configuring an ACS block

The asset caching system is configured using opt-in patterns. There are many types of files that process faster than copying an archived file from a remote folder. The most common way to cache the products of a source asset file is using a `"glob"` wild card pattern like `"*.png"` and `"*.wav"` scan patterns. Another way is to add a regular expression to match the source assets that would take a long time to process using `"pattern"` such as `"\/assets\/rock_[\w]*\.asset"` to cache all the rock asset files.

```
"ACS title":
{
   "name": (string) a label for this block, can be used to match any builder by name
   "glob":  (string) wild card pattern i.e. "*.fbx"
   "pattern": (string) a regular expression i.e. "[\w]*\.asset"
   "checkServer": (Boolean) to enable set to true
}
```

This ACS block allows users to configure the types of source assets that should be cached in the remote folder. The block is placed in the JSON path `/AssetProcessor/Settings/Server` object. The title must start with the prefix `"ACS "` to designate the object as a configuration block. The next part is either `"glob"` or `"pattern"` followed by the correct text for a wild card pattern or a regular expression; these are used to tag source assets that need to be cached.

The ``name`` field is used for both the title of the configuration block in the GUI tool, but it is also possible to match all an asset pattern by setting the ``name`` to a name of an asset builder. For example, a configuration block can set the name to "Atom Image Builder" so that all the processed images will be cached.

{{< note >}}
The block should only be set to `"glob"` or `"pattern"`, not both.
{{< /note >}}

The `"checkServer"` Boolean flag is used to enable the block. The default value for `"checkServer"` is false, so to enable the ACS block the Boolean flag needs to be set to true.

An example this JSON ACS block will cache all product assets built by the "XmlBuilderWorker" builder:

```json
"ACS XmlBuilderWorker":
{
   "name": "XmlBuilderWorker",
   "glob":  "*.vegdescriptorlist",
   "checkServer": true
}
```
