---
linkTitle: Metadata Relocation
title: Metadata Relocation
description: Describes the classes that facilitate the Open 3D Engine (O3DE) metadata relocation system, which enables asset files to be moved or renamed without breaking references.

weight: 100
---

## What it is

Metadata relocation allows files to be moved/renamed without breaking references.  It stores the UUID for a source asset in a .meta file alongside the source.  By moving/renaming the metadata file, Asset Processor (AP) can always keep track of the UUID.

Design Doc: https://github.com/o3de/sig-content/blob/main/rfcs/rfc-77-metadata-asset-relocation.md

User Doc: **TBD**

## Why it's needed
Content creators often want to rename and move files, to improve project organization, and to fix typos. However, there are challenges with renaming and moving files: content tends to reference other content, and renaming or moving one file can potentially break incoming references to that file, from other files. Metadata relocation allows for the stabilization of asset identification via a UUID that remains the same as a file is moved and renamed, so that the file references can automatically handle that file operation.

## Why use sidecar files
Asset ID stabilization via sidecar files provides a low friction workflow for asset relocation that can be done outside of O3DE tools, including with the source control tools that teams are probably already using. Other solutions either involve leaving bread crumb files or bread crumb information that can become a long term maintenance headache, or attempting to do a reference fix up every time a file is relocated or renamed, requiring custom tools to manage that reference fix up. In both cases, content creators may still move a file without using those systems, breaking references. Sidecar files are visible and discoverable, so content creators are more likely to move assets with the sidecar files, keeping references between assets in a project more stable long term.

## High level design

### Key pieces of the system:

* `AzToolsFramework::MetadataManager` - Handles creation of metadata files and provides an API for reading/writing any generic value to/from a metadata file.
* `AzToolsFramework::UuidUtilComponent` - Provides a small API for assigning a UUID to a file.  Can be used by any tool to assign a UUID to an asset before creating the asset.
* `AssetProcessor::UuidManager` - Central place for requesting the UUID for an asset.  Handles assigning UUIDs for assets that don't have a metadata yet as well as reading UUIDs from existing metadata files.  Also serves as a lookup for legacy UUIDs.
* `AssetProcessor::AssetCatalog::BuildRegistry` - is primarily where all assets will be iterated and have GetUuid called, causing all metadata files to be loaded and cached.  Also handles updating the database for any out-of-date UUIDs in the Sources, SourceDependency, or ProductDependencies tables.
* `AssetProcessor::ProductOutputUtil` - handles renaming products (prefixing with scanfolder ID) to avoid on-disk filename conflicts due to multiple files having the same relative path.
* `AssetProcessor::SourceAssetReference` - class for passing around source asset paths in a way that allows the consuming system easy access to the relative path, absolute path, and scanfolder ID.  UUID metadata allows multiple files to have the same relative path so referring to a file by only a relative path is no longer sufficient.

The system is designed to allow enabling metadata-based UUIDs for assets by type.  So only enabled asset types will have UUIDs generated and saved in metadata files.  For non-enabled types, UuidManager will return the old path-based UUID (unless a metadata file already exists for that file, in which case, it will still use the metadata UUID).

Metadata files store the canonical, randomly generated UUID, a list of all legacy UUIDs (using previous generation methods), the timestamp of when the metadata file was created (for resolving conflicts between 2 files having the same legacy UUID, the older one wins) and the original file path.

Getting a file type to be fully supported means every system that can generate a reference to that type of file must do so using UUIDs (typically through `Asset<T>` references).  Path-based references won't work.

## Unit Tests

There are serveral unit tests for each system.  Most can be found in these locations:

* Code\Tools\AssetProcessor\native\tests\assetmanager\
    * DelayRelocationTests
    * AssetProcessorManagerTest
    * SourceDependencyTests
* Code\Tools\AssetProcessor\native\tests\UuidManagerTests
* Code\Framework\AzToolsFramework\Tests\Metadata\
    * MetadataManagerTests
    * UuidUtilTests

## File Support

Below is a rough list of most filetypes supported by the engine categorized by relocatability based on analysis of their dependencies.  Testing and deeper analysis may reveal some of these types require more work to be fully supported.

### Files which may already work
All references to these files appear to be done via AssetID.  The sub IDs generated for product assets of these source assets appear to be stable and not based on the source asset names. 

* animgraph
* azasset
* dat
* emfxworkspace
* exr
* filetag
* inputbindings
* motionset
* names
* pass
* pem
* physxconfiguration
* physxmaterial
* postfxlayercategories
* precompiledshader
* resourcepool
* scriptcanvas
* scriptevents
* stars
* surfacetagnamelist
* tfx
* ts
* uicanvas
* vegdescriptorlist
* setreg

### Files which require some work to support
Fully supporting asset relocation for assets in this category will require some improvements to the usage of these assets. Work to support files in this category can include: Stabilizing product asset sub ID, so that when a file is renamed, the sub IDs of product assets don't change, and changing references to these assets (or their product assets) from other assets to use asset IDs instead of relative paths.

* azshadervariant
* shader, materialpipeline, template
* material
* prefab
* fbx
* font, fontfamily
* ttf, otf
* sprite
* texture file types (jpg, png, dds, tif, etc)

### Unknown
These are files which need further analysis to determine if support is useful or feasible and how much work, if any, is required to fully support them.

* materialtype - referenced by FBX files - suspect this is a code based dependency
* shader, attimage - referenced by binary pass file and shadervariantlist
* tfxbone, tfxmesh - referenced by binary TFX file

* pak - may be referenced by code? legacy asset
* shadervariantlist - referenced by shadervariantlist.  There is a relative path to a shader file, JSON format

### Too generic
These file extensions tend to be used by a variety of different types of content, which means that a file extension based approach to supporting relocation won't work as cleanly here. XML files, for example, can describe multiple different types of content, some of which will handle asset relocation easier than others. The easiest path forward to supporting relocation for this kind of content is to get content types to use specific file extensions instead of these generic ones. For example, even though prefab files are in the JSON format, they do not have the JSON extension.

* xml - referenced by uicanvas
* json - referenced by materialtype
* txt - no existing references
* ini - no existing references, but may be referenced by code

### Not suggested to support
These are files where users generally want to use path based references between files, and sidecar meta files would be seen more as clutter than a useful tool to stabilize these paths. Code files like Python, for example, already have an established pattern for referencing other Python files, so it does not make sense to try and use meta files to stabilize the references here.
* lua - source code file with text references to other Lua files

* py - source code (also referenced by FBX files)
* azsl, azsli, srgi - referenced by shader files as a relative path string in a simple JSON data file