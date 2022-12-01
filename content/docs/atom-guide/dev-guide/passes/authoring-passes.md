---
title: "Authoring Passes"
description: "Authoring Passes in Atom"
toc: true
weight: 1200
---

**Passes** determine how a frame is rendered. You can customize your rendering pipeline by integrating different passes, such as lighting or post process passes. Passes are instantiated from **PassTemplates**, which can be authored in JSON or in C++. If you want to customize the functionality of a pass template, you can define custom `Pass` classes in C++.

For authoring PassTemplates, read the [Authoring PassTemplates](#authoring-a-passtemplate) section below. 

## Root Pass and Pass Registry
Before you begin authoring passes, it's important to understand the Pass System (read the [Pass System](pass-system/) section). The following key points are also important to understand when authoring passes: 
- Passes are structured in a tree of nested passes, starting at the **root pass**. 
- PassTemplates must be registered in the **Pass Registry** in order to use them. 

### Root Pass
At the basis of the pass system is a **root pass**, which begins the tree of nested child passes. Each pass is registered within its parent pass to establish the overall context of the passes. A pass can be either a render pass or a sub-root with nested child passes. 

One of the key passes is `MainPipeline.pass`, which is the parent pass that defines the rendering logic for the pipeline. You can change Atom's default pipeline pass in the asset file `MainRenderPipeline.azasset`.

### Pass Registry
The **pass registry** contains the registry of all possible pass templates. In order to use a pass template, it must be included in the pass registry. Note that the pass registry can contain pass templates that are never used. You can add a pass templates into the pass registry file `PassTemplates.azasset` by including the name of the pass template and a path to the `.pass` file through the `Name` and `Path` properties.

The following sample shows a snippet of the pass registry. You can add a new pass by adding another element in `AssetPaths`. 
```json
// PassTemplates.azasset
{
    "Type": "JsonSerialization",
    "Version": 1,
    "ClassName": "AssetAliasesSourceData",
    "ClassData": {
        "AssetPaths": [
            {
                "Name": "DepthPassTemplate",
                "Path": "Passes/Depth.pass"
            },

            ...

            {
                "Name": "ForwardPassTemplate",
                "Path": "Passes/Forward.pass"
            }

            ...
        ]
    }
}
```

### Constructing the Pass Tree
Each parent pass contains a list of their direct children passes in contextual order. Starting at the root pass, the first level of children passes are listed. The same rules apply for each sub-root pass, ultimately constructing the pass tree. 

## Authoring a PassTemplate
A **PassTemplate** (see `PassTemplate.h`) is used to instantiate a **Pass** (see `Pass.h`). It specifies inputs and outputs for a Pass as well as any **PassAttachments** (see `PassAttachment.h`) owned by that Pass. It can be authored in code as C++ or in data as a JSON file (with a *.pass* extension).

When PassTemplates are authored as data (`.pass`), they are serialized as a PassAsset. A **PassAsset** (see `PassAsset.h`) is a thin wrapper around a PassTemplate that the asset system uses for serialization.

#### Components of a PassTemplate
The components of a PassTemplate vary depending on its `Pass` class. The `Pass` class is specified by the `PassClass` property in the `.pass` file. 

PassTemplates specifies inputs and outputs and defines its function through the components `Slots`, `Connections`, `Image Attachments`, and `PassData`. 

PassTemplates can also contain a `PassRequests` container, that lists child passes. When a PassTemplate gets instantiated as a Pass, each PassRequest creates a child pass. 

A complete breakdown of the PassTemplate JSON file (`*.pass`) can be found in [PassTemplate File Spec](pass-template-file-spec/) section. 


### Registering a Pass Template
Before a PassTemplate can be instantiated, it must be registered with the PassSystem. This makes the PassTemplate discoverable so other passes can find and refer to it by name. The way you register your passTemplate depends on whether you authored it in data (`.pass` file) or in C++ code. 
- **Data**: If authored in a `.pass` file, you must add the path to that file to the list of PassTemplates in the pass registry (`PassTemplates.azasset`).
- **Code**: If authored in C++, you must add your PassTemplate to the PassSystem in code. To do this:
    1. Create a PassTemplate during initialization.
    2. Call `PassSystemInterface.Get()->AddPassTemplate(...)`. This can be found in the files `PassSystem.h` and `PassLibrary.h` in the Atom API reference. 


## Instantiating a Pass
You can instantiate a Pass through the PassSystem in four ways, all of which are equally performant:
1. Using the class of the pass you want directly as a function template parameter. This will call that pass class's `static Create(...)` function.

2. Using the Name of the pass class that you want to instantiate. The PassSystem will use the Name to look up the appropriate PassCreator (the PassSystem holds a map of PassCreators that it can index with a Name). A PassCreator is simply a function pointer to the Pass's `static Create(...)` function.

3.  Using a PassTemplate or Name of a PassTemplate (it will use the Name to query the PassTemplate from the PassSystem). The PassTemplate has the Name of a pass class that is used to query a PassCreator same as for step 2.

4.  Using a PassRequest (`PassRequest.h`). A PassRequest is a small collection of data detailing how to instantiate a PassTemplate. This includes the Name of the PassTemplate (to be used as in step 3) and list of PassConnections (`PassAttachment.h`) to associate the instantiated Pass with its neighbors.

Note: The files `PassRequest.h` and `PassAttachment.h` can be found in the Atom API Reference. 

The example code below demonstrates the different ways to instantiate a pass. 
```cpp
// Assume we've created a Pass class called MyPassClass and a corresponding MyPassTemplate and registered them both with the PassSystem under the names "MyPassClassName" and "MyPassTemplateName" respectively
 
// Example 1: Using the pass class as a template argument
Ptr<Pass> myPass1 = PassSystemInterface::Get()->CreatePass<MyPassClass>(Name("MyPassInstance1"));
 
// Example 2: Using the name of the pass class so the PassSystem will query the registered Create() function and create the pass
Ptr<Pass> myPass2 = CreatePassFromClass(Name("MyPassClassName"), Name("MyPassInstance2"));
 
// Example 3: Using the name of the pass template so the PassSystem will query the registered pass template and use it to create the pass
Ptr<Pass> myPass3 = PassSystemInterface::Get()->CreatePassFromTemplate(Name("MyPassTemplateName"), Name("MyPassInstance3"));
 
// Example 4: Creating a PassRequest with the name of the pass template so the PassSystem will query the registered pass template and use it to create the pass
PassRequest myPassRequest;
myPassRequest.m_name = Name("MyPassInstance4");
myPassRequest.m_templateName = Name("MyPassTemplateName");
Ptr<Pass> myPass4 = PassSystemInterface::Get()->CreatePassFromRequest(&myPassRequest);
```

#### Customized Pass Instantiation
{{< todo issue="https://github.com/o3de/o3de.org/issues/1547">}}
{{< /todo >}}
