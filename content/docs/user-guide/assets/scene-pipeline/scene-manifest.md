---
linkTitle: Scene Manifest
title: Scene Manifest
description: TBD Scene Manifest
weight: 400
toc: true
---

{{< note >}}
Fill out
{{< /note >}}

The SceneManifest contains instructions on what to do with the SceneGraph content. While anything that implements the IManifestObject can be stored in the manifest, the two most common types are groups and rules (called modifiers in the UI).

## Overview

SceneManifest, groups and rules (modifiers)

Groups represent the instigator of a set of actions, such as converting and writing to O3DE data. While groups are not particularly tied to a specific file format and can result in multiple products or none at all, they usually revolve around a single type. For example the MeshGroup works on static meshes and produces primarily render products asset files. Groups aim to contain the minimum amount of configuration options needed for them to do their work. Practically this means that they should always produce valid products, though valid in this case means that the products do not cause crashes, not necessarily valid in that they represent the source data exactly.

In order to get closer or identical to the source data rules need to be added. Rules are used to fine-tune the instructions represented by groups. Usually these are clustered by common functionality such as physics or materials. Rules can have multiple options, but an empty rule can already be enough to add/change processing steps. For instance, by default the Atom Scene Builder generates LODs for a MeshGroup container but adding a blank LodRule will skip this step.

A group and its rules are usually read by one or more export components. The export component responsible for converting static meshes for instance will look for a MeshGroup and if found create an model container with the meshes selected in the MeshGroup. Another export component like the one dealing with physics can react to the notification send by the static mesh exporter that a new collision meshes. It then takes a look at the MeshGroup that was used and goes looking for a CoordinateSystemRule and if found uses the information in the SceneGraph to update the system.

Both loading and exporting components use this approach to breaking down tasks. Rather than have a single class needing to be aware of all possible combinations, the work is spread to smaller pieces that are connected through a special EBus called the CallProcessor. This also allows easier injection of custom code without having to modify the original source.

After loading a source scene there is always a SceneManifest present. Attempts will first be made to read the SceneManifest from a file with the extension .assetinfo. This name is appended to the file path of the source file, such that “example/file.fbx” will cause the Scene pipeline to look for the manifest in “example/file.fbx.assetinfo”. If the file is not found the Scene pipeline will create a new manifest in memory that may or may not get saved to disk later. Rather than create a blank manifest or one with a few default values, several smaller pieces of code (see Components – Behaviors) analyze the SceneGraph and use various pieces of logic and knowledge to construct a manifest that is likely to produce the results the user is looking for. If a manifest is successfully loaded these same pieces of code get a chance to look at the state of the manifest and the graph so any discrepancies such as added/removed

SceneCore

SceneCore is the central library for the Asset Importer framework. It provides the storage for a graph (SceneGraph) that contains the in-memory representation of the imported data and a dictionary (SceneManifest) that contains the groups and rules that guide the exporting process. It also contains various utilities to make it easier to work with the graph and manifest. Lastly it contains a collection of interfaces that provide the a common "language" for the import and export process to talk. Some of these interfaces are mandatory, such as the IManifestObject, in order for base functionality to be implemented. Others are optional, but advisable to implement as they make code reusable. As an example, if custom mesh data is loaded, it's advisable to have the data container implement the IMesh interface so the UI knows when to present the mesh to the user as a selectable option and for an exporter to know how to interpret the data. Of course if this isn't desired, not implementing the IMesh interface will disable this functionality, but the new data can still be made available in the graph.

// This function is now bound to the CallProcessorBinder, so it will be called as soon as exporting starts. It is a good point 
    // at which to look at the available groups and see if there are groups that need to log the scene graph.
    AZ::SceneAPI::Events::ProcessingResult ExportTrackingProcessor::PrepareForExport(AZ::SceneAPI::Events::PreExportEventContext& context)
    {
        // Before doing any work, the manifest must be searched for instructions about what needs to be done. The instructions 
        // are in the form of groups and rules. In this example, we use this opportunity to log the scene graphs that are 
        // listed in every logging group.
        //
        // In this example, the manifest is cached for later use. This is typically not recommended because multiple builders can
        // be running at the same time, resulting in callbacks from multiple exports that are in flight. In general, you should
        // pass in any required information as a member of the context.
        m_manifest = &context.GetScene().GetManifest();
        
        // The manifest is a flat list of IManifestObjects and relies on AZ_RTTI to determine its content. Content can be retrieved
        // through an index-based approach or an iterator approach. The index-based approach tends to be easier to understand but
        // it also requires you to work with more code. The iterator has more complex syntax and can produce more complicated compile 
        // errors, but it has several utilities that make it more concise to work with and often makes code that better communicates 
        // intention. To provide examples of both cases, the index-based approach is used below, and the iterator approach is used in 
        // the ContextCallback function.
        size_t count = m_manifest->GetEntryCount();
        for (size_t i = 0; i < count; ++i)
        {
            AZStd::shared_ptr<const AZ::SceneAPI::DataTypes::IManifestObject> entry = m_manifest->GetValue(i);

            // The azrtti_cast is a run-time type-aware cast that will return a nullptr if the provided type
            // can't be cast to the target class. That principle is used here to filter for LoggingGroups only.
            const LoggingGroup* group = azrtti_cast<const LoggingGroup*>(entry.get());
            if (group)
            {
                if (group->DoesLogGraph())
                {
                    // For every group, write out the graph information, starting at the node the user selected.
                    LogGraph(context.GetScene().GetGraph(), group->GetGraphLogRoot());
                }
            }
        }

        return AZ::SceneAPI::Events::ProcessingResult::Success;
    }

## Groups

## Rules

## Scene manifest files