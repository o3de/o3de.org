---
linkTitle: Prefab Files
title: Prefab File Type Support
description: Overview of the work required for prefab files to fully support the metadata asset relocation

weight: 100
---
## Overview
This page is an investigation into answering the question: "How can we safely support meta data file based asset relocation for prefab files?"

This is not an exhaustive investigation, it was time boxed to a couple days.
## Prefab Product Asset Type

* spawnable - a prefab that can be spawned at runtime. Generally referenced via asset references on components, so stable to asset relocation. In many cases can be referenced from code; in that case, if the code reference is not via asset ID, the code will not handle renaming or moving the prefab that generates the spawnable, but that's considered an acceptable workflow - code references aren't expected to be handled.
* network spawnable - referenced the same as spawnables.

## What happens right now if you rename a prefab file with a stable meta file based UUID?
### Prefab to Prefab reference

Prefabs can reference other prefabs. This is done via a path from the scan folder root.

This means that if a prefab is renamed, any prefabs that reference that prefab via nesting (and not referencing spawnables) will have that reference break.

### Prefab to Procedural Prefab reference

Prefabs can also reference procedural prefabs in a similar way to regular prefabs - in the prefab file itself. The slight difference here comes in on the solution, later. For prefab to prefab references, we'll need to track via the source asset's UUID. For prefab to procedural prefab reference, that link will be an asset ID instead, because a procedural prefab is a product asset.

### References to spawnables from components

Spawnables are referenced via asset ID, so they are stable. There is one mild issue here: The asset hint is to the source asset and not the product asset. The workflow also has you select a source asset and not product. This is not an issue currently, but if anything besides prefabs emits spawnables, this will not work well in script canvas.

## Recommendation

* Update Prefabs to reference other Prefabs via source asset UUID, and not relative path.
* Update Prefabs to reference Procedural Prefabs via asset ID, and not relative path.
* Do both of these updates in a way that old prefabs with path based references can be loaded, and the next time a prefab is saved, it saves the stable ID instead of relative path.
* Build a tool that can upgrade all prefabs under a given folder (to handle project and Gem upgrades) that can be shipped to users, and they can run on their projects before enabling prefab asset relocation.

## Related, but not blocking issues

There is a code concept of an AssetID for product assets. This contains the source asset's UUID, the product asset's sub ID, and an asset hint to provide a human readable look at the path.

There is no such concept for source assets. So swapping to UUIDs only means that it will be difficult for humans to visually inspect prefab files, to see what these relationships are.

This is a noticeable drop in quality of life for merging and hand managing prefab files, when users have to look directly at the contents.