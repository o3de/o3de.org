---
description: ' Export PhysX colliders from .fbx files with FBX Settings to &ALYlong;. '
title: FBX Settings PhysX export
---
# FBX Settings PhysX export {#fbx-physx-export}


****

|  |
| --- |
| This feature is in [preview](/docs/userguide/ly-glos-chap#preview) release and is subject to change\.  |

PhysX colliders are required by **Actors** and **Meshes** to perform collision detection, raycast hit detection, overlap testing, and PhysX simulation\. It's possible to use simple parametric primitive shapes in the **PhysX collider** component to create PhysX colliders, but many situations require colliders that more closely resemble the render mesh than simple shapes\.

The **PhysX** tab in **FBX Settings** has many options to generate PhysX colliders that offer the best resolution and performance for any use scenario\.

## Export PhysX colliders {#fbx-exporting-physx}

1. Copy your `.fbx` file to a sub directory in your project located at `lumberyard_version\dev\your_project`\. The `.fbx` file can contain a mesh or an actor\.

   Alternatively, choose **Import** from the **File** menu in Lumberyard Editor to copy or move the `.fbx` file into your project\.

1. Locate the `.fbx` in **Asset Browser**\.

1. Right click the `.fbx` in **Asset Browser** and choose **Edit Settings** to open **FBX Settings**\.

1. In **FBX Settings**, in the **PhysX** tab, choose the **Hierarchy** button to the right of **Select meshes** and ensure only the meshes required for the **PhysX group** are selected in the mesh list\.

   The selected meshes can be the visible meshes, or meshes that have been created in a content creation application as physics colliders\.

   You can choose **Add another physxmesh** to create additional PhysX mesh groups\. At least one runtime `.pxmesh` asset is produced for each mesh group\. A PhysX mesh group can contain any number of meshes from the **Select meshes** list\.

1. Set the properties for each PhysX mesh group, Add modifiers to each PhysX mesh group as required\.

   Use the **Export as** property to generate the appropriate type of PhysX colliders for your use scenario\. **Export as** has three options and one property that are important to understand:
**Triangle mesh**
Triangle mesh generates a triangle mesh collider from the selected meshes\. Triangle mesh colliders can offer high precision collisions because they can accurately represent the shape of the visible render mesh\. Because triangle meshes can be complex and non\-convex, they might carry a performance penalty compared to convex and primitive colliders\. Triangle mesh colliders can only be used with static and kinematic entities\.
**Primitive**
Primitive either uses the selected primitive shape or determines the most appropriate primitive shape for the collider based on the selected meshes\. The primitive shape is automatically fit over the selected meshes\. Primitive shapes include box, sphere, and capsule\. Primitive shapes offer the highest simulation performance, but might not closely represent the shape of the visible render mesh\. Primitives can be used for static, kinematic, and, dynamic entities\.
**Convex**
Convex generates a convex hull that encompasses the selected meshes\. A convex collider can more accurately represent the shape of the visible render mesh than a primitive collider, at a slight performance cost\. Convex colliders can be used for static, kinematic, and dynamic entities\.
**Decompose Meshes**
When generating **Primitive** or **Convex** colliders, you have the option to decompose meshes\. When enabled, **Decompose Meshes** breaks the selected meshes down into approximately convex parts\. Primitives or convex hulls are generated and fit to each decomposed mesh part\. Many small colliders that more accurately resemble the shape of the visible render mesh are generated\. This option is useful for automatically generating colliders for characters and other complex meshes without authoring colliders in a content creation application or fitting primitive colliders manually\.

   For further information on **PhysX mesh group** properties and modifiers, see [FBX Settings PhysX tab](/docs/userguide/fbx/settings-physx-tab.md)\.

1. Choose the **Update** button at the bottom right of the **FBX Settings** window\. A **File progress** window opens to display information about issues encountered during asset processing\. Choose **OK** to close the **File progress** window\. This step creates or updates the `.assetinfo` file\. **Asset Processor** automatically processes the `.fbx` file and generates the runtime `.cgf` files for meshes, `.pxmesh` files for PhysX, and `.mtl` files for materials\.

1. Close the **FBX Settings** window\.
**Note**
When you close **FBX Settings** after making changes, you might see a pop\-up window warning of unsaved changes\. This is a known issue and can be disregarded\.