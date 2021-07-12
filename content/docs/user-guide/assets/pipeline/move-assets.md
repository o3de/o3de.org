---
description: Learn how to move assets for Open 3D Engine to a new location while keeping internal references consistent.
linktitle: Move assets
title: Move asset files to a new location
weight: 900
---

During development, you might decide to relocate files to change project structure. Doing this manually would break all of
the references in the Asset Processor, and require updating the asset references manually as well. This would invalidate the asset
cache and cause a rebuild - even if nothing had changed.

To support the relocation of assets, the `AssetProcessorBatch` tool offers the `--move` parameter, which allows you to relocate files
and update references in the Asset Processor, without causing any unnecessary rebuilds.

## Move Syntax

`--move=<FromPath>,<ToPath>`

- `FromPath` and `ToPath` can be absolute paths or paths relative to a scan folder root (project or gem folder).
- **Must refer to files**, not folders. To rename a folder, use `SomeFolder/*,SomeFolderRenamed/*`.
- If a folder is referred to here, then no files will be deleted.
- May contain `*` (asterisk) wildcards which will match any number of
  characters in a file or folder name at the current level, unless the
  path ends with wildcard, in which case it will match any number of
  characters at any directory level (recursive).
- `FromPath` and `ToPath` must contain the same number of wildcards.

| Path | Will Match |
|------|------------|
| `Textures*/` | Nothing, paths must refer to files since folders are not tracked in source control. |
| `Textures/*` | Every file contained in a folder named Materials recursively, meaning it includes the contents of all subfolders as well. |
| `Materials/*.material` | Any file ending in .material contained in a folder named Materials. |

## Delete Syntax

`--delete=<Path>`

- `Path` be an absolute path or path relative to a scan folder root (project or gem folder)
- **Must refer to files**, not folders. To rename a folder, use `SomeFolder/*`.
- If a folder is referred to here, then no files will be deleted.
- May contain `*` (asterisk) wildcards which will match any number of
  characters in a file or folder name at the current level, unless the
  path ends with wildcard, in which case it will match any number of
  characters at any directory level (recursive).

## Options

- `--confirm` - Performs an actual move or delete, modifying files on disk.
        Without this, move and delete will only provide a preview of
        what will happen.
- `--leaveEmptyFolders` - By default empty folders will be removed, even during a `--move`. This option keeps empty folders.
- `--allowBrokenDependencies` - By default a move/delete command will fail if it will result in broken dependencies. This will force the action to proceed despite broken dependencies.
- `--updateReferences` [`--move` Only] - Will attempt to update files that reference the selected files. This is a simple find-and-replace of the absolute path and
  UUID/AssetId and will not work for binary assets like FBX.
- `--enablescm` - Source Control Management is disabled by default in Asset Processor Batch. This will enable the source control plugin and
  cause the command to checkout files for edit/move/delete as appropriate.

## Data updated during relocation

- The files selected in `<FromPath>` are moved or deleted.
- In the case of a move, if `--updatereferences` is enabled, any files referencing moved files will be updated to reference the file at the new location (if possible).

## Known Limitations

Binary files cannot have their references updated automatically.
