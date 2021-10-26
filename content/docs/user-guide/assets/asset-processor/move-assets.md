---
linkTitle: Move or Delete Assets
title: Move or Delete Assets with Asset Processor Batch
description: Learn how to move assets to new directory locations or delete assets while maintaining internal references with Asset Processor Batch.
weight: 600
toc: true
---

There are many reasons that you might decide to move or delete assets during development of your project in **Open 3D Engine (O3DE)**. If assets are moved manually, all of the references in **Asset Processor** are broken and the asset references must be manually updated. The **Asset Cache** is invalidated and has to be rebuilt, even if the assets haven't changed.

To support asset relocation and removal, the **Asset Processor Batch** tool offers the `--move` and `--delete` commands. These commands can move or delete assets and update references in Asset Processor so the Asset Cache does not become invalidated.

{{< note >}}
Some assets that contain references may be in a binary format. For example, `.fbx` files can be either ascii or binary format. References in binary format files are not automatically updated.

Because moving or deleting files might be a destructive operations, the `--move` and `--delete` commands require an additional `--confirm` option to perform the operation. Using either command without the `--confirm` option only provides a preview of the results of the command.
{{< /note >}}

## Move Syntax

You can use the `--move` command below with Asset Processor Batch to move source assets in your project.

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

## Delete Syntax

You can use the `--delete` command below with Asset Processor Batch to delete source assets in your project.

`--delete=<Path>`

Use the below guidance when specifying a path argument to delete assets.

* The path can be an absolute path or path relative to a scan directory root, such as a project or Gem directory.
* The specified argument *must* refer to files, not directories. To delete a directory, use the directory name with a wildcard, for example, `DirectoryName/*`.
* The path may contain wildcards that match any number of characters in a file or directory name at the current level. If the path ends with a wildcard, it recursively matches any number of characters at any directory level at or below the wildcard's level.

## Options

You can use the additional command line options below when you move or delete assets with Asset Processor Batch.

| Option | Description |
| - | - |
| `--confirm` | Performs a move or delete, modifying files on disk. Without this, move and delete only provide a preview of the result. |
| `--leaveEmptyFolders` | By default, empty folders are removed, even during a `--move`. This option keeps empty folders. |
| `--allowBrokenDependencies` |  By default, move and delete commands fail if there are broken dependencies. This forces the action to proceed despite broken dependencies. |
| `--updateReferences` | This option is only available with the `--move` command. The option attempts to update files that reference the selected files. This is a simple find-and-replace of the absolute path and UUID/AssetId. References in binary assets are not updated. |
| `--enablescm` | Source Control Management is disabled by default in Asset Processor Batch. This enables the source control plugin so that the command can checkout files for edit/move/delete as appropriate. |