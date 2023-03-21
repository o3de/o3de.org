---
linkTitle: Metadata Relocation
title: Metadata Relocation
description: Classes that facilitate metadata relocation system
weight: 100
---

## What it is

Metadata relocation allows files to be moved/renamed without breaking references.  It stores the UUID for a source asset in a .meta file alongside the source.  By moving/renaming the metadata file, Asset Processor (AP) can always keep track of the UUID.

Design Doc: https://github.com/o3de/sig-content/blob/main/rfcs/rfc-77-metadata-asset-relocation.md

User Doc: **TBD**

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
* materialtype - referenced by FBX files - suspect this is a code based dependency
* shader, attimage - referenced by binary pass file and shadervariantlist
* tfxbone, tfxmesh - referenced by binary tfx file
* pak - may be referenced by code? legacy asset
* shadervariantlist - referenced by shadervariantlist.  There is a relative path to a shader file, JSON format

### Too generic
* xml - referenced by uicanvas
* json - referenced by materialtype
* txt - no existing references
* ini - no existing references, but may be referenced by code

### Not suggested to support
* lua - source code file with text references to other lua files
* py - source code (also referenced by FBX files)
* azsl, azsli, srgi - referenced by shader files as a rel path string in a simple JSON data file