---
linkTitle: Scene Files
title: Scene File Type Support
description: Overview of the work required for scene files to fully support the metadata asset relocation

weight: 100
---

## Overview

This page is a investigation into answering the question: "How can we safely support meta data file based asset relocation for scene (FBX) files?"

This is not an exhaustive investigation, it was time boxed to a couple days.
## Scene File Product Asset Types

* azmodel - defines geometry
* procprefab - defines a procedural prefab. This is an entity stack that can be instantiated, and is pre-setup to reference other product assets, to reconstruct the source scene as entities.
* azlod - level of detail information
* actor - skinned meshes, characters
* skinmeta - TODO
* azbuffer - buffer information used by other product assets, defines things like positions of vertices, texture coordinates, etc.
* motion - animation data
* pxmesh - physics mesh
* material - custom properties to pass in to a shader that define how an object looks. Used with models and actors.
* dbgsg, dbgsg.json, dbgsg.xml, procprefab.json - debug data, not relevant to asset relocation

## What happens right now if you rename an FBX file with a stable meta file based UUID?

The UUID will now remain stable, which is good.

If it was just a file move operation, and not a rename, some references will rename stable because product asset file names and sub IDs shuffle only on a rename event, not a relocation event. If a scene file was heavily customized via the asset info file, it may remain more stable, if the product asset file names don't change.

Generally, these issues will be encountered:

* Motion sets with references to motions output from that scene file will break, they have relative path references to the old file names of the product assets.
* Prefabs that reference procedural prefabs generated from the FBX file will break, because prefab to prefab references are relative paths, and not stable IDs.
* Many product assets of the scene file will get new file names, and will also get new sub IDs. This means that, even if the UUID portion of the asset ID is stable, references will still break because the sub ID will change.
    * In many cases, product asset file names are generated based on the source asset file name, and in all cases with scene files, product asset sub IDs are generated based on product asset file name.

These issues will also occur, but solving them is generally of lower importance:
* Material generation may no longer be able to find textures, based on relative paths. Example: If `AutomatedTesting\Objects\MyCar.fbx` references `AutomatedTesting\Objects\MyCarTexture.png` via the relative path `"MyCarTexture.png"`, and MyCar.fbx is moved to `AutomatedTesting\Cars\MyCar.fbx`, then the material will no longer be able to resolve this path to MyCarTexture.png, and the material will appear broken.
    * Note there is workaround for this: We support relative paths both from the scene file, and from scan folders. If the scene file uses scan folder relative paths, those remain stable and the material will continue to work.
* If an FBX file is renamed / moved via our tooling, but a content creator uses a workflow in their content creation tool (Blender, Maya, etc) that outputs the FBX file based on some set of rules, the next time they run this, they'll generate an FBX file at the old path / name, if they don't update their scripts.
    * This can't be handled because the content creation working files are invisible to O3DE.

## Asset Relocation Challenges
### Incoming path based reference to source asset (FBX file)

This challenge type covers anything that references the source asset (FBX file) via a relative path, and would break if the path changed.

Known path based reference to scene source assets:

* Sidecar assetinfo file, that defines asset processing rules.
    * These files are discovered by replacing the extension, and are expected to match the associated scene file.
    * For manual relocation workflows, these will be at the same location as the source asset and the meta file, so it's expected that content creators will move and rename these at the same time.
        * These aren't being combined with .meta files currently due to confusion that may occur with existing workflows expecting to delete .assetinfo files as a means of resetting the settings for a scene file.
* Tooling and python references to FBX files
    * This is not handled, but it's considered OK because this is a code problem that we aren't solving. If you rename an FBX file, and you have some Python based automation (automated scene settings application, other workflow automation) that references that FBX file, that code automation may break.
* Working asset (Maya, Blender, Max native files invisible to O3DE) may reference or remember these files by path, and a relocation event may break that reference.
    * This was always considered out of scope for this feature. If you move an FBX file, go back to Blender, and re-export without updating your Blender workflow to match that move, that is currently considered a content workflow problem and is not something we handle.

### Incoming path based references to product assets

There are path based references to product assets that should be handled. An asset relocation event will break these references right now, even if the UUID is stable.

* procedural prefab product assets - Prefabs reference other prefabs by relative path, and not by a stable ID (UUID for prefab → prefab, asset ID for prefab → procedural prefab).
    * If meta files are enabled for scene files and a procedural prefab is instanced in a game level prefab, when the source FBX for that procedural prefab is moved, the reference from that game level prefab will break.
* motion product assets - Motion set files reference motions by path.  The field storing this information is labeled assetId, but it is just a string, not an `Asset<T>`.
    * If a scene file is relocated or renamed, these path references will break, and remain pointed at the old files.

### References to other scene product files

* azmodel
    * Safe: EditorMeshComponent and MeshComponent reference via asset ID, so paths won't break here (see Sub ID stability section for other details).
    * Will break, but not a problem: Hardcoded references to azmodels can and do exist in Python scripts, C++, and other code files. This is not something users expect to be handled, so it's OK if these references break.
* azlod
    * Safe: Seems to be tracked via `Data::Asset<ModelLodAsset>`. There doesn't appear to be any path construction with swapping extensions to azlod.
* actor
    * TODO
* skinmeta
    * TODO
* azbuffer
    * TODO
* pxmesh
    * Safe: EditorMeshColliderComponent uses a full asset ID to reference pxmesh files.
    * TODO: Other potential references to pxmesh files
* material
    * Safe: EditorMaterialComponent uses a full asset ID to reference materials.
    * TODO: Other potential references to materials

### Outgoing path based references to other content

* material - Outgoing reference to image files as textures
    * Will break, but not a problem: Scene processing only supports relative paths to textures from scene files. This means that, if an FBX file is relocated and the texture isn't, the path based reference will break. This is OK as this is not expected to work.
    * https://github.com/o3de/o3de/blob/development/Code/Tools/SceneAPI/SceneBuilder/Importers/AssImpMaterialImporter.cpp#L178
* Default procedural prefab - Outgoing path based references to other product assets
    * Will not break: The default procedural prefab uses path based references to the other product assets of the scene file, instead of asset ID based references. However, this will continue to work after a relocation event, because the procedural prefab will be re-generated and use the new file name.
* Non-default procedural prefabs - Potentially anything, reference-wise
    * May break, but not a problem: We've setup a boundary for relocation, that code references should be handled by the relevant team and may break. So if an FBX file has a Python based rules processor that generates a non-default prefab, and uses relative paths from that FBX file to find other content to reference, those paths may break in a relocation event.

### Product Path & File Name Stability

There are two issues with product path and file name generation that cause issues here. This is a problem for incoming path based references to these files. However, the bigger issue here is sub ID stability: Sub IDs are generated based on these file names, or the same input that generates these file names.

* By default, several groups are created that use the source asset's name as the group name.
    * This means that if the source asset is renamed, the product name changes. This means that incoming path references break, however it does mean that if we stabilize sub ID generation, we can actually improve the workflow here, if we switch incoming references to use asset IDs instead.
* The default procedural prefab generates product assets with UUIDs in the file names, based on the source asset's file name.
    * This means that, if the source asset is renamed, these UUIDs change.

### Sub ID Stability - Materials

Material sub ID generation is stable to some degree - renaming an FBX results in the material product asset keeping the same sub ID. Material sub ID generation is based on material properties, which means that changing those properties will result in the sub ID changing. This doesn't effect the asset relocation work here, but content creators may encounter this issue and assume it's a bug with asset relocation or asset ID stability.
```c++
uint32_t MaterialAssetBuilderComponent::GetMaterialAssetSubId(uint64_t materialUid)
{
    // [GFX TODO] I am suggesting we use the first two 16bits for different kind of assets generated from a Scene
    // For example, 0x10000 for mesh, 0x20000 for material, 0x30000 for animation, 0x40000 for scene graph and etc.
    // so the subid can be evaluated for reference across different assets generate within this scene file.
    /*const uint32_t materialPrefix = 0x20000;
    AZ_Assert(materialPrefix > materialId, "materialId should be smaller than materialPrefix");
    return materialPrefix + materialId;*/
    return static_cast<uint32_t>(materialUid);
}
```

### Sub ID Stability - Models and other non-material products

Most product assets for scene files generate a sub ID based on product asset name. This is done because it's stable to upstream changes to the scene file, however it means this system is not stable if a scene file is renamed.

## What can we do to address this?
### Fixed path based references to scene files and scene file products to instead use stable IDs

* Update prefabs to reference procedural prefabs and other prefabs by ID (UUID for regular prefabs, asset ID for procedural prefabs), instead of by path.
    * This will also stabilize prefabs for asset relocation - without this change, prefabs will also break when you attempt to relocate them with stable UUIDs.
* Update motion sets to reference motions by asset ID and not by path.
* Double check the remaining product assets of scene files for incoming references.

#### What if we don't do this?

Then renaming an FBX file will cause path based references to products of that FBX to break. Specifically instances of procedural prefabs will reference old location, and motionsets will reference the old location.
### Build a solution for supporting product asset sub ID changes

To stabilize sub IDs, we will need to change the logic for how sub IDs are generated at least once.

This means we will need to have a system to support changing sub IDs for product assets.

There are a few options here:
#### Recommended - Opt-In to new sub IDs

Use a new settings registry value to toggle the opt-in to new sub ID generation for scene files. Make this enabled by default for new projects. To support existing projects, also do the following feature.

Note that this would be a temporary solution - at some point, the old sub ID generation should be deprecated, removed, and all users migrated to the new sub IDs. We don't have a good process for that, yet.
#### Recommended - Sub ID Migration Tool

Build a tool that users who want to use the new sub IDs can run, that will update all sub IDs from the old ones, to the new ones. This would be a tool run once on a project, and it would change all asset ID references to use new sub IDs. This would work best in combination with the previous solution, to let users choose when to opt-in and migrate when they're ready.
#### Not Recommended - Logic for supporting modified and renamed sub IDs

Build some system to track old and new sub IDs to support renaming.

This is the most robust solution, but it is the most time consuming to build.
#### What if we don't build a solution for supporting product asset sub ID changes?

Then changing how sub ID generation works for scene files will break all existing references to scene based product assets that are tracked via asset reference. This means that prefabs with entities that have editor mesh components will end up with incorrect. If we can't change how sub IDs are generated, then renaming FBX files will always result in changing sub IDs.
### Stabilize sub ID generation to not depend on the product asset file name

This sub ID generation should still be done in a predictable, stable way so that renaming and moving groups in the scene settings, as well as making changes to the contents of the scene file, generate stable sub IDs like they do right now.

#### What if we don't do this?

Then renaming FBX files will always cause the sub IDs of FBX product assets to change. Note that moving will work OK, because only the file name is used.
### Do later - Adjust how UUIDs in product asset filenames are generated for product assets created for default procedural prefabs

Stabilize this UUID generation, so renaming a scene file will result in the same UUIDs (or a different output file pattern) for the new files, as the old ones. As part of this work, make sure sub IDs are stabilized.
#### What if we don't do this?

If we stabilize sub IDs across product asset file names changing, we may be fine skipping this work. I recommend we do the other work first, and then see if this is necessary.
## What can't / shouldn't we do?

* Change sub ID generation to be index based with an offset for product asset type: The first azmodel is sub ID 1000, the second azmodel gets sub ID 1001. This shouldn't be done because:
    * That logic would not be stable to changes to the FBX file itself, or the scene settings, which would break references to these product assets.
    * Most of the complication of stabilizing sub IDs is our lack of sub ID migration tooling, so we would still need to solve that.