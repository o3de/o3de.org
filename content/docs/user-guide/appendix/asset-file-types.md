---
description: ' Learn about the asset data file types that Open 3D Engine supports. '
linktitle: Asset file types
title: 'O3DE Asset File Types'
---

See the following tables for supported asset data file types in O3DE.

O3DE supports the `.xml` file format and the following image file formats:
+ `.bmp`
+ `.jpg`
+ `.pgm`
+ `.png`
+ `.raw`
+ `.r16`
+ `.tga`
+ `.tif`

**3D Art Asset File Types**

The following file formats are used for static geometry:


****

| File Type | Where Created | Description |
| --- | --- | --- |
| \*.cgf (Static Geometry File) | DCC tool | Contains static geometry data, such as grouped triangles, tangent spaces, vertex colors, physics data, and spherical harmonics data. |
| \*.chr (Character Asset File) | DCC tool | The base character used for animations. |
| \*.cdf (Character Definition File) | O3DE | Defines the base character and associated attachments. This file is created with Geppetto and contains a reference to the .chr file. |
| \*skin (Character Skinned Render Mesh) | DCC tool | Contains skinned character data, including the mesh, vertex weighting, vertex colors, and morph targets. |
| \*.fbx (Filmbox File) | DCC Tool | Contains mesh, material, camera, and animation data. Provides interoperability between DCC tools. |
| \*.scenesettings (Scene Settings File) | O3DE | Contains configuration and rules settings from an .fbx file.  |
| \*.abc (Alembic Cache File) | DCC tool | Contains non-procedural, application-independent set of baked geometric data such as baked meshes and their materials.  |
| \*.cax (CAD/CAE Exchange File) | O3DE | Contains compressed game assets read from the .abc file and streamed in-game on demand from disk.  |
| \*.trb (Terrain Block File) | O3DE | Contains terrain data and associated level objects such as water and vegetation.  |

**Material and Texture File Types**

The following files are used for the **Material Editor**. For more information, see [Working with shaders and materials](/docs/atom-guide/look-dev/materials/).


****

| File Type | Where Created | Description |
| --- | --- | --- |
| \*.mtl (Material File) | DCC Tool |  Contains settings for shaders, surface types, and references to textures.  |
| \*.dds (DirectDraw Surface) | DCC tool | Contains compressed source texture files. |
| \*.sbsar (Substance Files) | Allegorithmic Substance Designer | Contains procedural materials. |

**Animation File Types**

The following file types are used for the **Animation Editor**. For more information, see [Animation Editor File Types](/docs/user-guide/visualization/animation/character-editor/file-types.md).


****

| File Type | Where Created | Description |
| --- | --- | --- |
| \*.actor (Actor File) | DCC tool | A character with at least one bone.  |
| \*.motion (Motion File) | DCC tool | Individual animation clips for a character, such as walk, run, and so on. |
| \*.motionset (Motion Set File) | O3DE | Contains a list of motion files for a character. For example, you can create a motion set named Run.motionset that contains the run.motion, sprint.motion, and jog.motion files. |
| \*.animgraph (Animation Graph File) | O3DE | Contains the state machines, transitions, conditions, blend trees, and so on. |
| \*.assetinfo (Asset Info File) | O3DE | Contains the configuration and settings for the .actor and .motion files. Animation Editor and the FBX Settings tool can create this file.  |

**Audio Asset File Types**

The following file types are used for the audio system. For more information, see [Adding Audio and Sound Effects](/docs/user-guide/interactivity/audio/).


****

| File Type | Where Created | Description |
| --- | --- | --- |
| \*.bnk (Soundbank File) | Audiokinetic Wwise | Contains compiled sound data and metadata. |
| \*.wem (Encoded Media File) | Audiokinetic Wwise | Compiled streamable audio file. |
