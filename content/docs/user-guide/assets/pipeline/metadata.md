---
linkTitle: Metadata Asset Relocation
title: Metadata Asset Relocation
description: In Open 3D Engine (O3DE), Metadata Asset Relocation allows files to be moved and renamed freely without breaking existing references by storing a UUID in a side-car file (.meta).
weight: 600
toc: true
---

Metadata Asset Relocation allows files to be moved and renamed freely without breaking existing references by storing a UUID in a side-car file (.meta).  See here for technical details on how the system works: https://github.com/o3de/sig-content/blob/main/rfcs/rfc-77-metadata-asset-relocation.md

By default, the system is currently disabled as not all file types are currently able to be relocated without issue.  File types must be enabled individually.  Once a type is enabled, the Asset Processor will generate metadata files for every file of the given type on startup.  Any file which has a metadata associated with it can then be moved/renamed.  The Asset Processor does not need to be running when moving/renaming files and there are no special tools required to do so.

## How to use
Moving/renaming assets can be done either in the editor via the asset browser or using any file management tool of your choosing.

There is only one requirement when **moving/renaming an asset: the metadata file must be moved/renamed as well**.

Folders can be moved/renamed without having to touch metadata files, but note that all files within a folder must have a metadata file to ensure existing references do not break.

Examples:

* If blue.png is renamed to red.png, the metadata file blue.png.meta must be renamed to red.png.meta.
* If textures/hat.png is moved to character/hat.png, the metadata file must be moved to character/hat.png.meta.


If using source control, metadata files **must** be checked in along with the source asset and updated with any move/rename changes.

There is one exception to the above, which is Intermediate Asset metadata files.  These metadata files follow the same rules as Intermediate Assets: they should not be modified or checked into source control.

## How to Enable
To enable a file type, create a .setreg file with the following settings:
```json
{
    "O3DE":
    {
        "AssetProcessor":
        {
            "Settings":
            {
                "Metadata":
                {
                    "EnabledTypes": [
                    ]
                }
            }
        }
    }
}
```
EnabledTypes is simply an array of strings of file extension to enable.  For example, `".txt", ".png"`

Once a metadata file is generated for an asset and the asset is relocated or any references are saved using the newly generated UUID, the metadata file must be kept alongside the asset.  Not doing so could break references to the file.

Note that AP will continue to use existing metadata files for assets which have them regardless of the above settings.

## Renaming while AP is running
By default, renaming assets manually while Asset Processor is running can prove difficult as AP will try to immediately create a new metadata file for the renamed asset.  To prevent this, AP can be configured to wait for a specified time before it attempts to process a "new" asset, which avoids the automatic creation of an unwanted, new metadata file.  Note that this delay will affect all newly created assets for metadata-enabled types, which is why this is off by default.  The longer the delay time, the longer it will take AP to start processing any newly created metadata-enabled file type.  In a .setreg file, add the following setting:
```json
{
    "O3DE":
    {
        "AssetProcessor":
        {
            "Settings":
            {
                "Metadata":
                {
                    "MetaCreationDelayMs": 5000
                }
            }
        }
    }
}
```
The value specified is the milliseconds to wait.  The above example config will wait 5 seconds before processing an asset.

This setting is mainly useful to help allow manual renaming of assets, but can help in some situations of slow file updates on disk, such as copying a large number of files or fetching latest from source control.  These operations can sometimes be ordered in a way that requires a very high delay setting, such as a Git LFS fetch which may fetch files in groups by type, possibly resulting in metadata files being created on disk long after the source asset was created.  In these situations, it is recommended to close AP first to avoid conflicts caused by AP creating metadata files which already exist in source control.

## Asset Processor Batch
Since Asset Processor Batch is intended for use with automated processes, it will not create metadata files and will not use the meta creation delay, regardless of what settings are configured.  It will make use of any existing metadata files however.