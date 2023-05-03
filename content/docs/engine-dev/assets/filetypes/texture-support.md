---
linkTitle: Texture Files
title: Texture File Type Support
description: Overview of the work required for texture files to fully support the metadata asset relocation

weight: 100
---

## Overview


This page is an investigation into answering the question: "How can we safely support meta data file based asset relocation for image (texture) files?"

## Image File Product Asset Types

* imagemipchain - A mipmap for an image. Generally not used by other systems, they reference the streaming image, the streaming image references the mipmaps to use.
* streamingimage - the core processed image.

## What happens right now if you rename an image file with a stable meta file based UUID?

SubID generation is based on the product asset type, and for mipmaps, the location in the mipmap chain. This means that sub IDs will remain stable when an image is renamed or moved.

This means there are only two concerns with supporting sidecar meta files for images:

* Primary - Incoming references to the source image or product images via path or file name.
* Secondary - Files making use of the current feature to only use one source asset per relative scan folder path.
    * For example, if you have `AutomatedTesting\MyTexture.png` and `MyGem\Assets\MyTexture.png`, right now you will only see one of those. With meta files, both will process.
    * This isn't a unique problem to images, but historically images made more use of this system than other file types.

### What breaks if you move an image?

* Authored materials using the Material Editor reference images via relative path. So if you move an image referenced by a material, that material will break, even if the UUID is stable.
    * TODO: With this reference as a job dependency, it will behave differently than it does now, which hasn't been tested yet.
    * Now: the source asset `sponza_mat_curtainblue.material` has a relative path reference to the source asset `"../Textures/curtain_metallic.png"` via a path and not asset ID. If the file is renamed to `bcurtain_metallic.png`, `sponza_mat_curtainblue.material` is not reprocessed, and the product asset `sponza_mat_curtainblue.azmaterial` remains the same, with the same asset hint to the old image and the asset ID of the old image.
* FBX files and other 3D scene files reference images via absolute or relative path. The scene builder resolves this down to an asset ID for runtime. If you move an image, the FBX file will continue to point at the old file name or location, and will fail to process.
    * TODO: There's a small chance that, due to lack of non-product dependencies on images, a relocation wouldn't break until later.
        * Example: `Car.fbx `references `CarBody.png`. The scene builder resolves this to the UUID + sub ID for `CarBody.streamingimage`. Renaming `CarBody.png` to `CarBody1.png`, the sub ID and UUID are stable. `Car.fbx` does not reprocess after this change because it's not a job or source dependency. `Car.fbx`'s product assets referencing `CarBody.png` appear to just work and continue to reference `CarBody1.png` because the product assets haven't changed. Then, when re-exporting `Car.fbx` with a change, the image stops working. Rolling back the change, the image stays broken because the FBX file can no longer be processed as it was before, it's not able to resolve this path reference.
* UI referencing images with the SimpleAssetReference will break, because the path no longer resolves.
* Texture Atlas lists and Material Types with hardcoded path references will break, because the path no longer resolves.

## Recommendation

Before enabling image relocation:

* Source asset materials should be updated to use asset IDs instead of relative paths.
* Scene files should emit job dependencies on referenced images.

There are other potential concerns that are lower priority, and can be worked around:

* UI references to images via SimpleAssetReference
* Material Types reference images

## Asset Relocation Challenges

### Materials authored in the material editor have path based references to images


Materials generally come from two places right now: Material product assets (azmaterials) generated from scene files, and materials authored in the material editor.

This concern is on the authored materials. Asset relocation issues around textures for materials generated from scene files is less of a concern because that same workflow challenge exists in other engines with sidecar based relocation.

Material source assets reference image source assets via relative path.  These are emitted as job dependencies, so we have more hooks available for us to track and manage this.  However, right now, it's not handled. For example, renaming `bcurtain_metallic.png` only the reprocesses the image and not the material.

This means that right now, the product asset remains the same. It continues to have an asset ID based reference to the image asset, with the old incorrect asset hint.

Because there's a job dependency here, the job would re-process in this case, and not just silently point at the old link (see the other concerns with relocation in this document)

Forcing the material to reprocess causes an error to be emitted.

#### So why is this concern?

It means that, when someone renames an image file referenced via material source assets, all of those jobs will fail until each of those material files are individually updated, even with a stable asset ID. So in this case, when renaming `curtain_metallic.png`, all 3 materials that reference `curtain_metallic.png` by relative path will need to be individually updated. I now have to modify 3 additional source assets:

Instead, if the image was referenced via UUID or asset ID then this rename event would mean that the materials could remain unchanged and would limit the scope of work to just that individual image being renamed, and not the incoming dependencies.

#### What can we do to address this?


* Update materials to reference images via source asset UUID, or product asset asset ID.
* Build a migration tool that users can run that will update all existing materials on their project to the new material format, so they don't have to manually re-open and re-save all materials.
* In the guidance for enabling meta sidecar files for images, explain this situation to users, and ask them to run this tool before enabling meta files for image types.

This will mean that material references to images will be stable across image renaming, because materials will use stable IDs.

### Scene file source assets do not emit job dependencies on images reference by path


In the previous section, authored material source assets had relative path references to image source assets, and they emitted job dependencies on those images. This meant that if the image was renamed with ID stabilization, the job dependency would be the same and the job would re-run, causing the product asset reference to instantly become an error. This is good because it doesn't hide an error for later.

FBX and other scene files also reference source image assets via path, and there's nothing we can do about that. It's a known limitation.

However, the gotcha here is on cache consistency: Right now, without a job dependency, when renaming an image like in the previous section, the FBX file referencing the image will not reprocess. The product asset azmaterial of the FBX file references the product asset via asset ID, but the source asset FBX referenced via path. So now with the rename, the stale azmaterial product asset of the FBX file has a valid asset ID referencing the relocated asset. This means that an asset relocation of an image file may appear to work immediately: rename `CarBody.png` to `CarBody1.png`, and the `Car.azmaterial` product asset of `Car.fbx` appears to render correctly with the asset ID based reference to `CarBody1.streamingimage`. Then, later on someone makes a change to cause `Car.fbx` to reprocess and now the image can't be found and there is an error or warning processing `Car.fbx`. If a user then panics and tries to roll back this change to `Car.fbx`, it will still appear broken, because they had previously been in an unstable state.

#### Why is this concern?


Cache consistency is very important. Situations like this can break user trust in asset processing, create situations where projects work differently on different team members machines, and the time between causing the issue (renaming the texture) and discovering the bug (the reference is broken, the scene builder can't find the texture and the azmaterial product asset no longer has a valid texture) may take a long time. If everyone on the team is working with iterative caches day to day, and someone finally clears their cache or sets up a new project several weeks after the rename, that's a lot of other changes that could have caused the problem.

#### What can we do to address this?


* Update scene files to emit job dependencies on referenced source asset image files.
* Make sure job dependencies are using asset IDs instead of paths before being recorded into the asset database, so that renaming an image file will cause the dependency job for the new name to match the old dependency, and cause the scene files to reprocess.

This will mean that renaming an image referenced by an FBX file will cause that FBX file to reprocess, due to the job dependency. This will maintain cache consistency for a team, and make it easy to quickly find issues when an image was referenced by an FBX file, so the team can go upstream to adjust the Blender, Maya, or other working asset to point at the new image, and re-export the FBX with the new path.

### Scene file source assets have path based references to images


This is a known issue with scene files referencing images, users tend to expect this.

### UI references to images via simple asset reference


UI components tend to use SimpleAssetReference to reference files, instead of actual asset references. This is because the UI system and components were built before proper asset referencing was available.

This includes the texture atlas system, because it's primarily used by UI.

#### Why is this not a major problem?

The UI system predates a lot of current systems and ideally it will be overhauled to use modern solutions (asset references instead of simple asset references, prefabs instead of slices, etc), which would automatically handle this problem.

#### Why is this still a concern?


Content will break, if someone relocates an image file referenced from a UI component.

### Material Types reference images via relative path, and not asset ID


Material type files are hand authored and are sort of code-adjacent, they reference a lot of other content and files via relative path instead of asset IDs, because it's expected that people will type these by hand instead of using a tool to build the material type file: https://www.o3de.org/docs/atom-guide/look-dev/materials/material-type-file-spec/

In other cases of hand-authored content like this: Lua files, C++ files, Python files, shader files, etc, it's an known and expected limitation that path based references won't be stable to asset relocation. Content creators are typically used to this and expect it.