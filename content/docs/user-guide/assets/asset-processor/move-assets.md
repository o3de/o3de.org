---
linkTitle: Move or Delete Assets
title: Move or Delete Assets with Asset Processor Batch
description: Learn how to move assets to new directory locations or delete assets while maintaining internal references with Asset Processor Batch.
weight: 600
toc: true
---

There are many reasons that you might decide to move or delete assets during development of your project in **Open 3D Engine (O3DE)**. When assets are moved, all references to the asset will need to be updated. If an asset is moved without updating any references to the moved asset, that upstream content may no longer work correctly due to the broken reference.

To support asset relocation and removal, the **Asset Processor Batch** tool offers the `--move` and `--delete` commands. These commands will check for some, but not all, incoming references to this content, and will perform some automatic reference updating when possible. [See the limitations section for more details.](#Limitations)

{{< note >}}
Some assets that contain references may be in a binary format. For example, `.fbx` files can be either ascii or binary format. References in binary format files are not automatically updated.

Because moving or deleting files might be a destructive operation, the `--move` and `--delete` commands require an additional `--confirm` option to perform the operation. Using either command without the `--confirm` option only provides a preview of the results of the command.
{{< /note >}}

## Asset Processor Batch Move Syntax

You can use the `--move` command below with Asset Processor Batch to move source assets in your project. This operation is also used to rename assets.

`--move=<FromPath>,<ToPath>`

Use the below guidance when specifying `FromPath` and `ToPath` arguments to move assets.

* `FromPath` and `ToPath` can be absolute paths or paths relative to a scan directory root, such as a project or Gem directory.
* The specified paths *must* refer to files, not directories. To rename a directory, use directory names with wildcards (`*`) , for example, `OriginalDirectoryName/*,DirectoryRenamed/*`.
* `FromPath` and `ToPath` may contain wildcards that match any number of characters in a file or directory name at the current level. If the path ends with a wildcard, it recursively matches any number of characters at any directory level at or below the wildcard's level.
* `FromPath` and `ToPath` *must* contain the same number of wildcards.

The examples below illustrate how to use wildcards with the `--move` option.

| Path | Match |
|------|------------|
| `Textures/*` | A wildcard at the end of a path recursively matches every file contained in a directory. It includes the contents of all subdirectories as well. |
| `Materials/*.material` | A wildcard in a file name matches every file at that directory level. In the example, every file with a  `.material` extension in a directory named `Materials` is a match. |
| `Textures*/` | A wildcard at the end of a directory name won't match any directory or file. Paths must refer to files since directories are not tracked in source control. |

## Asset Processor Batch Delete Syntax

You can use the `--delete` command below with Asset Processor Batch to delete source assets in your project.

`--delete=<Path>`

Use the below guidance when specifying a path argument to delete assets.

* The path can be an absolute path or path relative to a scan directory root, such as a project or Gem directory.
* The specified argument *must* refer to files, not directories. To delete a directory, use the directory name with a wildcard, for example, `DirectoryName/*`.
* The path may contain wildcards that match any number of characters in a file or directory name at the current level. If the path ends with a wildcard, it recursively matches any number of characters at any directory level at or below the wildcard's level.

## Asset Processor Batch Relocation Options

You can use the additional command line options below when you move or delete assets with Asset Processor Batch.

| Option | Description |
| - | - |
| `--confirm` | Performs a move or delete, modifying files on disk. Without this, move and delete only provide a preview of the result. |
| `--leaveEmptyFolders` | By default, empty folders are removed, even during a `--move`. This option keeps empty folders. |
| `--allowBrokenDependencies` |  By default, move and delete commands fail if there are broken dependencies. This forces the action to proceed despite broken dependencies. |
| `--updateReferences` | This option is only available with the `--move` command. The option attempts to update files that reference the selected files. This is a simple find-and-replace of the absolute path and UUID/AssetId. References in binary assets are not updated. |
| `--enablescm` | Source Control Management is disabled by default in Asset Processor Batch. This enables the source control plugin so that the command can checkout files for edit/move/delete as appropriate. |

## Asset Processor Batch Relocation Limitations {#Limitations}
The Asset Processor Batch relocation tool has a few limitations:
* References in C++ to assets are not registered or known to this tool. If there is a hardcoded C++ load for the asset, that reference will break when the asset is relocated, and will need to be manually found and updated.
* This tool supports Perforce integration, but no other source control integration. Git will sometimes be able to figure out on its own that a file was relocated, but it won't always. If you relocate an asset without using your source control's file relocation functionality, the new file won't easily map to the old file's history.
* If there is a gap in the dependency graph, such as a builder not properly declaring a Product Dependency on the asset you are relocating, this tool will not know, and that unregistered asset reference will break with the relocation.
* References to this file outside of O3DE will not be updated.
   * Often the source asset is downstream from a DCC tool. The asset relocation tool will not update references like this that are upstream.
      * For example, an FBX file is exported from Blender, and the original asset used to generate it is tracked via a blend file.
   * There may be other files external to O3DE that reference Source Assets.
      * For example, your team may make use of an Excel spreadsheet file to manage some game data, and have a process where that is exported. The asset relocator will not be aware of this and will not update these references.

## Moving, Renaming, and Deleting Assets Manually
If you want to relocate an asset manually without using this tool, or you want to understand what this tool is doing internally, follow this process:
1. Gather all references to both the Source Asset, and to all Product Assets generated from that Source Asset. This includes the following:
   * C++ references, which the relocation will not handle.
   * References from DCC tools.
      * For example, if you want to relocate an image file, it may be referenced by relative path from a Blender .blend file that outputs an FBX file. If you update the FBX file without updating the Blender file, the next time the FBX is exported from Blender, it may include the old path that no longer resolves to the referenced image.
   * Other references in other files that may be specific to your team and project.
      * For example, if you use an Excel spreadsheet to manage game data, and this references the asset you wish to relocate, you will need to update that as well.
1. For each reference, identify how the reference will need to be updated.
   * You may need to involve other team members to perform this action.
      * For example, if you wish to relocate an image referenced from an FBX file, you need to update the original DCC file, such as the Maya file used to export that FBX.
1. You may find it easier to first copy the file to the new location so you can update the old and new references.
   * You may need to be cautious with this step to preserve file history in your source control tool.
1. Now that all references to the file to move, rename, or delete have been gathered, you can update them to all reference the relocated/renamed source and/or product assets. If you are deleting, you'll need to update these references to handle the asset no longer existing.
1. Now you can complete the move, rename, or delete operation. It's recommended you do this in a way that preserves file history in your source control.
