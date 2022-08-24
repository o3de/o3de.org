---
linkTitle: Scene Manifest
title: Scene Manifest
description: Scene Manifest, instructions how to export the scene graph
weight: 400
toc: true
---

The ```SceneManifest``` contains instructions on what to do with the ```SceneGraph``` content. While anything that implements the IManifestObject can be stored in the manifest, the two most common types are groups and rules (called modifiers in the UI).

![Scene pipeline.](/images/user-guide/assets/scene-pipeline/scene-pipe-scene-settings.png)

The Meshes, Actors, and PhysX tabs are dynamically determined using the scene manifest groups.

## Scene manifest groups and rules

Groups represent the instigator of a set of actions, such as converting and writing to O3DE data. While groups are not particularly tied to a specific file format and can result in multiple products or none at all, they usually revolve around a single type. For example, the MeshGroup works on static meshes and produces primarily render products asset files. Groups aim to contain the minimum amount of configuration options needed for them to do their work. Practically this means that they should always produce valid products, though valid in this case means that the products do not cause crashes, not necessarily valid in that they represent the source data exactly.

In order to get closer or identical to the source data rules need to be added. Rules are used to fine-tune the instructions represented by groups. Usually these are clustered by common functionality such as physics or materials. Rules can have multiple options, but an empty rule can already be enough to add/change processing steps. For instance, by default the Atom Scene Builder generates LODs for a MeshGroup container but adding a blank LodRule will skip this step.

A group and its rules are usually read by one or more export components. The export component responsible for converting static meshes for instance will look for a MeshGroup and if found create a model container with the meshes selected in the MeshGroup. Another export component like the one dealing with physics can react to the notification send by the static mesh exporter that a new collision meshes. It then takes a look at the MeshGroup that was used and goes looking for a CoordinateSystemRule and if found uses the information in the ```SceneGraph``` to update the system.

Both loading and exporting components use this approach to breaking down tasks. Rather than have a single class needing to be aware of all possible combinations, the work is spread to smaller pieces that are connected through a special EBus called the CallProcessor. This also allows easier injection of custom code without having to modify the original source.

After loading a source scene there is always a ```SceneManifest``` present. Attempts will first be made to read the ```SceneManifest``` from a file with the extension .assetinfo. This name is appended to the file path of the source file, such that “example/file.fbx” will cause the Scene pipeline to look for the manifest in “example/file.fbx.assetinfo”. If the file is not found the Scene pipeline will create a new manifest in memory that may or may not get saved to disk later. Rather than create a blank manifest or one with a few default values, several smaller pieces of code (see Components – Behaviors) analyze the ```SceneGraph``` and use various pieces of logic and knowledge to construct a manifest that is likely to produce the results the user is looking for. If the system loads the scene manifest successfully then these same pieces of code get a chance to look at the state of the manifest and the graph so that logic can modify any discrepancies.
