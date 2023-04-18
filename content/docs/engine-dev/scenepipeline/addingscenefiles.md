---
linkTitle: Adding Scene Files
title: Adding Scene Files
description: Describes the steps to take to add support for additional scene file formats.

weight: 100
---

## Overview

O3DE uses the [Open Asset Importer Library](./openassetimporter) to load scene files from a variety of scene formats, including files in the `fbx` format.

This page covers the steps to take to enable additional scene file formats in the scene pipeline.

## Enabling a scene format supported by [Open Asset Importer Library](./openassetimporter)

### Understand the feature set of the O3DE scene pipeline, and the file format you are enabling

There is a lot of variance in what information scene files of different formats can support. For example, the `stl` format does not contain information like UVs for texture mapping. You will want to read through the available documentation for the scene file format you are enabling before moving to the next step.

Understanding what the format you are enabling supports and what the scene pipeline supports will help you figure out your approach to enabling the format, especially in relation to testing, both manual and automated, that will be done before finishing this work. You can read more about the scene pipeline in the [Scene Pipeline](../../user-guide/assets/scene-pipeline) and [Scene Settings](../../user-guide/assets/scene-settings) documentation for O3DE.

Finally, you'll want to understand the current support level for the format you are enabling, in the [Open Asset Importer Library](./openassetimporter) itself. Scene files often have many sub versions, for example `fbx` is not a single static file format, but it has been extended and changed throughout the years, and [Open Asset Importer Library](./openassetimporter) officially supports 2011, 2012, and 2013 versions of the `fbx` file format, but by default will attempt to import other versions of `fbx` files.

### Enable the format for importing

As covered in the [Scene Format Support](../../user-guide/assets/scene-settings/scene-format-support) documentation, the list of enabled scene file formats are managed via the settings registry key `O3DE/SceneAPI/AssetImporter/SupportedFileTypeExtensions`. The first step in enabling a new format is to add that file format to the list here.

O3DE users are encouraged to extend this settings registry key at the project level, and not this global settings level, so they can enable it just for their project. This documentation is for engine contributors, people who want to enable a new scene file format for all O3DE users.

Enabling the format in this workflow is a data change, no code needs to be recompiled. The Asset Processor should be re-launched to make sure it has loaded the latest settings registry file. You can verify you've enabled your chosen format by going to the `Builders` tab of the Asset Processor, selecting the `Scene Builder` from the list, and checking that the new extensions is added to the pattern list.

### Testing the new file format

Once the format is enabled, you will want to test this change. Its recommended that you start with manual testing by adding example files, in the new format, to a local test project.

After you've done a few rounds of manual inspection of scene files in this new format, adding automated tests will help with maintaining support of the new format. Automated tests allow others to extend and change the scene pipeline, as well as update the [Open Asset Importer Library](./openassetimporter) safely around the file format added.

## FAQ

### Why aren't all formats supported by [Open Asset Importer Library](./openassetimporter) enabled by default?

All formats have not been fully tested, and there are not yet automated tests written for many formats. Enabling new formats without automated tests introduces challenges around engine maintenance. Changes to the scene pipeline can effect how these formats are imported. Without automated tests, these issues may be difficult to find before engine consumers discover them, resulting in engine consumers encountering bugs that may impede their project's development.
