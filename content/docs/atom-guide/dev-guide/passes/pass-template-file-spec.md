---
title: "PassTemplate File Specification"
description: "Pass Template File Specification in Atom"
date: 2021-03-09
toc: true
weight: 1100
---

{{< preview-new >}}

This section goes over the elements of a PassTemplate (`*.pass`) file. Note that each element has an equivalent in the C++ [PassTemplate API](/docs/api/gems/atom/class_a_z_1_1_r_p_i_1_1_pass_template.html).

At the top of the `.pass` file is the JSON serialization header. It contains the elements `Type`, `Version`, `ClassName` and `ClassData`. `ClassName` is set to "PassAsset", meaning that the serialized class is a [`PassAsset`](/docs/api/gems/atom/class_a_z_1_1_r_p_i_1_1_pass_asset.html), and `ClassData` contains the PassTemplate itself. 

The PassTemplate will be broken down in the **PassTemplate** section below. The elements in the PassTemplate varies depending on the `PassClass` property.  

The template below shows the high-level structure of the `.pass` file. In this example, the PassTemplate is for a ComputePass. 
```json
{
    "Type": "JsonSerialization",     // JSON Serialization Header         
    "Version": 1,                              
    "ClassName": "PassAsset",                 
    "ClassData": {                             
        "PassTemplate": {             // PassTemplate
            "Name": "DownsamplePassTemplate", 
            "PassClass": "ComputePass",     
            "Slots": [ ... ],
            "PassRequests": [ ... ],
            "ImageAttachments": [ ... ],
            "Connections": [ ... ],
            "FallbackConnections": [ ... ],
            "PassData": { ... },
            }
    }
}   
```


## PassTemplate
You can define the PassTemplate in the `PassTemplate` container. The PassTemplate is serialized and contained by the PassAsset (see *PassTemplate.h*). 

The `PassTemplate` container has the following elements:
- **Name**: The name of the PassTemplate. This name will be used to query and instantiate the PassTemplate from the PassTemplateLibrary.

- **PassClass**: The `Pass` class to create when this template gets instantiated (such as `ParentPass`, `RenderPass`, `ComputePass`, or `FullScreenTrianglePass`). Pass classes are defined in the file __. 

    {{< note >}}
Pass classes must be registered for creation. This is done by calling `PassSystemInterface::AddPassCreator(...)`
    {{< /note >}}

- **[Slots:](#slots)** A list of PassSlots that this PassTemplate can use for attachments. 

- **[PassRequests:](#passrequests)** A list of PassRequests. When the PassTemplate gets instantiated as a Pass, each PassRequest will create a child pass. 

- **[ImageAttachments:](#image-attachments)** A list of image attachments owned by the Pass. 

- **[Connections:](#connections)** A list of connections, that allows this pass to use other pass's resources. 

- **[FallbackConnections:](#fallbackconnections)** A list of FallbackConnections. Each FallbackConnection specifies an input attachment to output, in case the pass is disabled. 

- **[PassData:](#passdata)** Specifies the pass type or method to use with the specified *Draw List*, *Pipeline*, and *Pass SRG*. 



#### Slots
The `Slots` block defines the **PassSlots** that this PassTemplate can use to attach PassAttachments to. In the code side, the list of slots defines a `vector<PassSlot>` (see *PassAttachment.h*).  Each element in the `Slots` block is a PassSlot that represents a slot mapping in the SRG_PerPass `slots` array or structure. 

Each PassSlot contains the following properties:
- **Name**: The name for the attachment slot. 

- **ShaderInputName** *(optional)*: The name of the shader variable (defined in SRG_PerPass) that is using this PassSlot. If omitted, the attachments will be bound in the order it is declared in the SRG_PerPass. This is prone to user error, so it is recommended to specify the shader variables explicitly. 

- **SlotType**: Specifies whether the slot is `Input`, `Output`, or `InputOutput`. In C++, this property serializes to the enum `PassSlotType` (see *PassAttachment.h*). 

- **ScopeAttachmentUsage**: Specifies a `ScopeAttachmentUsage` value, which describes how the attachment is used. ScopeAttachmentUsage values are defined in the enum class `ScopeAttachmentUsage` (see *AttachmentEnums.h*). 

- **LoadStoreAction** *(optional)*: Defines the action taken when the attachment in the PassSlot is loaded or stored. If omitted, this property defaults to `Load` and `Store`. Values are defined in `AttachmentLoadStoreAction` (see *AttachmentLoadStoreAction.h*). This property can define the following actions: 
  
  - **ClearValue** *(optional)*: The value to which that attachment is cleared to. An attachment is cleared if the `Load` action is set to `Clear`. It contains the properties `Type` and `Value`. 
    - **Type**: Specifies a `ClearType` enum value, which defines the type of value to represent. The `ClearValueType` enum contains the values `Vector4Float`, `Vector4Uint`, and `DepthStencil` (see *ClearValue.h*). 
    - **Value**: The value to use. Depending on the `Type` property, the value can either be a "Value" (`float4`), "UintValue" (`uint4`), or "DepthStencilValue".  
  

  - **LoadAction** *(optional)*: Describes what to do when the PassSlot's attachment is loaded by specifying an `AttachmentLoadAction` enum value. The `AttachmentLoadAction` enum contains the values `Load` (default), `Clear`, and `DontCare` (see *AttachmentEnums.h*). 
 
  - **StoreAction** *(optional)*: Describes what to do when the PassSlot's attachment is stored by specifying an `AttachmentStoreAction` enum value. The `AttachmentStoreAction` enum contains the values `Store` (default), and `DontCare`. (see *AttachmentEnums.h*). 
 
  - **LoadActionStencil** *(optional)*: Describes what to do with the stencil when the PassSlot's attachment is loaded by specifying an `AttachmentLoadAction` enum value. The `AttachmentLoadAction` enum contains the values `Load` (default), `Clear`, and `DontCare` (see *AttachmentEnums.h*). 
  
  - **StoreActionStencil** *(optional)*: Describes what to do with the stencil when the PassSlot's attachment is stored by specifying an `AttachmentStoreAction` enum value. The `AttachmentStoreAction` enum contains the values `Store` (default) and `DontCare` (see *AttachmentEnums.h*). 

- **FormatFilter**: A list of formats that are allowed to connect to this PassSlot. Values are defined in the `Format` enum (see *Format.h*). If the list is empty, then the slot accepts attachments of any format. An error is thrown if an attachment tries to connect to this PassSlot and the attachment's format is not in this list. 

- **DimensionFilter**: A list of dimensions (1D, 2D, or 3D) that are allowed to connect to this slot. Values are defined in `ImageDimension` (see *ImageDescriptor.h*). If the list is empty, then the slot accepts attachments of any dimension. An error is thrown if an attachment tries to connect to the PassSlot and the attachment's dimension is not in this list. 

The example below demonstrates the structure of the `Slots` block in a `.pass` file. 
```json
"Slots": [                                 
            {                                         

                "Name": "DownsampleSource",           
                "ShaderInputName": "m_inputTexture",                                                            
                "SlotType": "Input",                                                                             
                "ScopeAttachmentUsage": "Shader",   
                "LoadStoreAction": {                    
                    "ClearValue": {                     
                        "Type": "DepthStencil",      
                        "Value": {                  
                            0.0,                      
                            0.0,                     
                            0.0,                      
                            0.0            
                        }
                    },
                    "LoadAction": "Load",              
                    "StoreAction": "Store",            
                    "LoadActionStencil": "Load",       
                    "StoreActionStencil": "Store"      
                },
                "FormatFilter": [],                                                                            
                "DimensionFilter": []                                                                                                                                     
            },
            ...
]
```

#### PassRequests
When a PassTemplate gets instantiated as a Pass, each PassRequest will create a child Pass. In the code side, this is represented as `vector<PassRequest>`. In the data side, each container under PassRequests is a single pass request. 

Each PassRequest contains the following properties: 
- **Name**: The unique name of the child Pass that will be created from this PassRequest. All child passes under the same parent Pass must have different names to avoid name conflict.

- **TemplateName**: The name of the pass template to use when creating this pass. 

- **Enabled**: Where the pass is enabled or disabled. If omitted, this property defaults to true. 

- **PassData**: PassRequests can hold a packet of custom data. This data is serialized as any `AZStd` component and will be cast to the appropriate type by the instantiated Pass during creation. 


#### Image Attachments
A list of image attachments owned by the Pass. In the code side, the list of image attachments defines a `vector<PassImageAttachmentDesc>` (see PassAttachment.h). Each element in the list is a `PassImageAttachmentDesc`. 

Each image attachment contains the following elements: 
- **Name**: 
- **Lifetime**:
- **SizeSource**:
  - **Source**:
  - **Multipliers**:
- **FormalSource**:
- **ImageDescriptor**:
  - **BindFlags**:
  - **Format**:
  - **SharedQueueMask**:


#### Connections
A **Connections** block allows the exposure and usage of resources from other passes. A pass can use other passes' resources by defining a `Connections` block in its pass template file. A Connections block contains the property `AttachmentRef`, which specifies the name of the attachment or resource and the name of the pass that owns it. It also contains the property `LocalSlot`, which specifies the name of the attachment (or Slot name) within this pass that the resource will be bound to. 

Each connection in this pass is bound to a unique **Slot** that defines and exposes the resource so that it can be used by this pass. 

Each connection in the `Connections` block contains the following properties:
- **LocalSlot**: The name of the slot to connect this attachment to. The slots are defined in this pass template. 

- **AttachmentRef**: Points to an attachment or resource data that belongs to the specified pass. `Pass` contains the name of the pass that this referenced attachment belongs to. `Attachment` is the name of the attachment slot specified in the referenced pass. 

To understand how a Connections block work, take a look at the concrete example below of the *SubsurfaceScatteringPass*. 
```json
{
// The connections block in a pass template (.pass)
...

        "Name": "SubsurfaceScatteringPass",
        "TemplateName": "SubsurfaceScatteringPassTemplate",     // Unique template name - the name will correlate to the pass file via PassTemplates.azassets
        "Enabled": true,
        "Connections": [
            {
                "LocalSlot": "InputDiffuse",          // Local slot is defined in pass file (SubsurfaceScatteringPass.pass)
                "AttachmentRef": {                    // AttachmentRef - points to the attachment / resource data within the source pass
                    "Pass": "MSAAResolveDiffusePass",
                    "Attachment": "Output"              // The attachment Slot name in the owner pass (MSAAResolveDiffusePass)
                }
            },
            {
                "LocalSlot": "InputLinearDepth",
                "AttachmentRef": {
                    "Pass": "DepthToLinearDepthPass",
                    "Attachment": "Output"
                }
            },
            {
                "LocalSlot": "DirectionalLightShadowmap",
                "AttachmentRef": {
                    "Pass": "CascadedShadowmapsPass",   // The name of the pass from which to take the resource
                    "Attachment": "Shadowmap"           // The attachment Slot name in the specified pass - 'CascadedShadowmapsPass' in this case
                }
            }
            ...
        ],

...
}
```

#### FallbackConnections
A render pipeline can contain many passes and any pass can be enabled or disabled. However, in order for the pass hierarchy to function, the connections between the passes must be valid. So, a pass that is disabled must still provide outputs for subsequent passes. A **FallbackConnection** specifies what attachment to provide as a given output when the Pass is disabled. 

A FallbackConnection is not necessary for an InputOutput attachment because the attachment can proceed without writing to it. However, for an Output attachment, a fallbackConnection is necessary because the pass is responsible for creating the Output attachment to provide to the render frame. 

Each fallback in the `FallbackConnections` block contains the following properties:
- **Input**: Specifies what input to use as the fallback.
- **Output**: Specifies which output we are specifying the fallback for. 

The example below demonstrates the structure of the `FallbackConnections` block in a `.pass` file. 
```json
            "FallbackConnections": [
                {
                    "Input" : "DownsampleSource",    
                    "Output" : "DownsampleOutput"    
                }
            ],
```

#### PassData
In most cases, **PassData** specifies the pass type or method to use with the specified *Draw List*, *Pipeline*, and *Pass SRG*. Depending on the functionality of the PassData (via `$type`), there will be different configurable properties in the file. 

In the code side, the `PassData` property is a pointer to the base class PassData (*PassData.h*). The PassData class is meant to be inherited from or expanded on for custom use cases. For example, if you want to customize the PassData, you can define custom PassData structs in C++. This allows customized data to be exposed to the JSON Pass serialization that wouldn't be available through the PassTemplate or PassRequest class serialization. 

The PassData can also be specified in a PassRequest. In this case, any PassData provided by the PassTemplate will be ignored. This is because PassRequest acts as an instantiation of a PassTemplate and may override its PassData. 

The `PassData` block contains the following elements:  
- **$type**: Specifies the pass functionality as implemented by the C++ class. New passes functionality can be introduced into the C++ class. Atom implements functionalities such as RasterPassData, FullscreenTrianglePassData, and ComputePassData. You must match the PassClass in the PassTemplate file to its PassData definition. For eaxmple, RasterPassData must match RasterPass. 
  
- **DrawListTag**: The name of the draw list to apply this pass to. 
- **PipelineViewTag**: The name of the pipeline to apply this pass to. 
- **PassSrgAsset**: `FilePath` contains a path to the pass SRG file. 


The following snippet shows the general structure of PassData in JSON. 
```json
// The PassData block in a pass template (.pass)
"PassData": {
    "$type": "RasterPassData",      // See RasterPass.cpp                                
    "DrawListTag": "forward",
    "PipelineViewTag": "MainCamera",
    "PassSrgAsset": {
        "FilePath": "shaderlib/atom/features/pbr/forwardpasssrg.azsli:PassSrg"
    }
}
```


## PassTemplate Code Sample (.pass)
```json
{
    "Type": "JsonSerialization",                //< JSON serialization header
    "Version": 1,                               //< JSON serialization header
    "ClassName": "PassAsset",                   //< Defines that the serialized class is a PassAsset (see PassAsset.h). A PassAsset is just a bare bones wrapper around PassTemplate used by the asset system.
    "ClassData": {                              //< JSON serialization header
 
        "PassTemplate": {                               //< The serialized PassTemplate contained by the PassAsset (see PassTemplate.h)
 
            "Name": "DownsamplePassTemplate",           //< The name of the PassTemplate. This name will be used to query and instantiate the PassTemplate from the PassTemplateLibrary
 
            "PassClass": "ComputePass",                 
 
            "Slots": [                                  //< The list of input, output and input/output attachment slots this template will use.
                                                        //  Under the hood this is a vector< PassSlot > (see PassAttachment.h).  Each element below is a PassSlot that represents a slot mapping in the SRG_PerPass slots array / structure.
 
                {                                           //< For the first example slot we're going to specify an input slot for an image attachment named "DownsampleSource"
 
                    "Name": "DownsampleSource",             //< Name of the attachment slot. Please note this is just the slot, not the attachment itself.
 
                    "ShaderInputName": "m_inputTexture",    //< Name of the shader variable name in the SRG_PerPass for using this resource attachment.  If omitted, the attachments will be bound in the order it is declared that
                                                            //  will need to be match the shader SRG_PerPass declaration order.   This is prone to user error - please specify the shader variables by name explicitly.
 
                    "SlotType": "Input",                    //< This defines whether the slot is an input, output or an input/output. Serialization of the enum PassSlotType (see PassAttachment.h)
                                                            //  Values for PassSlotType are Input, Output, InputOutput
 
                    "ScopeAttachmentUsage": "Shader",       //< Describes how the attachment will be used. Serialization of enum ScopeAttachmentType (see AttachmentEnums.h). Possible values are:
                                                            //  RenderTarget,  DepthStencil,  Shader (i.e. a ShaderResource with read or read/write access),  Copy,  Pool 
                                                            //  Resolve (for resolving MSAA targets for example),  Predication
  
                    "LoadStoreAction": {                    //< Defines the action taken when the attachment in the slot is loaded or stored (i.e. used for read or write). Serialization of AttachmentLoadStoreAction (see AttachmentLoadStoreAction.h)
                                                            //  It defaults to Load and Store, so we would normally just omit this for our Downsample example, but we expand it here for the sake of the tutorial
 
                        "ClearValue": {                     //< The value to which the attachment will be cleared if the Load action equals Clear
 
                            "Type": "DepthStencil",         //< The type of value this clear represents. Serialization of enum ClearValueType (see ClearValue.h). Possible values are:  Vector4Float,  Vector4Uint,  DepthStencil
 
                            "Value": {                      //< The value to be used as the clear value. Can be either "Value" (float4), "UintValue" (uint4), or "DepthStencilValue". Must match above type.
 
                                0.0,                        //< The four floats for the clear value (or four integers if "UintValue")
                                0.0,                        //  For "DepthStencilValue" these four lines would instead be:
                                0.0,                        //  "Depth": 0.0,
                                0.0                         //  "Sencil": 0
                            }
                        },
 
                        "LoadAction": "Load",               //< Enum specifying what to do when the attachment this slot points to is loaded (see AttachmentLoadAction in AttachmentEnums.h)
                                                            //  Possible values:  Load (default if omitted),  Clear,  DontCare
 
                        "StoreAction": "Store",             //< Enum specifying what to do when the attachment this slot points to is stored (see AttachmentStoreAction in AttachmentEnums.h)
                                                            //  Possible values:  Store (default if omitted),  DontCare
 
                        "LoadActionStencil": "Load",        //< Enum specifying what to do with the stencil (if applicable) when attachment is loaded (see AttachmentLoadAction in AttachmentEnums.h)
                                                            //  Possible values:  Load (default if omitted),  Clear,  DontCare
 
                        "StoreActionStencil": "Store"       //< Enum specifying what to do with the stencil (if applicable) when attachment is stored (see AttachmentStoreAction in AttachmentEnums.h)
                                                            //  Possible values:  Store (default if omitted),  DontCare
                    },
                    "FormatFilter": [],                     //< List of formats that are allowed to connect to this slot (i.e. if an attachment tries to connect to this slot and it's format is not in this list
                                                            //  an error will be thrown). If the list is empty (as is the case here) then the slot will accept attachments of any format. See enum Format in Format.h
 
                    "DimensionFilter": []                   //< List of dimensions (1D, 2D, 3D) that are allowed to connect to this slot (i.e. if an attachment with a dimension not in this list tries to connect
                                                            //  to this slot, an error will be thrown). If the list is empty (as is the case here) then the slot will accept attachments of any dimension.
                                                            //  See enum class ImageDimension in ImageDescriptor.h
                },
                {                                               //< In this example we define a second output slot, this time for a Color attachment named "ColorOutput" that will be cleared to 0.4 when loaded
 
                    "Name": "DownsampleOutput",                 //<
                    "SlotType": "Output",                       //<
                    "ScopeAttachmentUsage": "RenderTarget",     //<
                    "LoadStoreAction": {                        //<
                        "ClearValue": {                         //<
                            "Type": "Vector4Float",             //<
                            "Value": {                          //<
                                0.4,                            //<  Refer to previous attachment slot
                                0.4,                            //<
                                0.4,                            //<
                                0.0                             //<
                            }                                   //<
                        },                                      //<
                        "LoadAction": "Clear",                  //<
                        "StoreAction": "Store",                 //<
                    }
                }
            ],
            "ImageAttachments": [                               //< A list of image attachments owned by the Pass (note that the previous list were attachment slots, not actual attachments)
                                                                //  Under the hood this is a vector< PassImageAttachmentDesc > (see PassAttachment.h), so each element below is a PassImageAttachmentDesc
 
                {                                               //< In this example we'll create a transient Color image attachment named "Color" that has the same size and format as the Parent Pass's "SwapChainOutput" attachment.
 
                    "Name": "DownsampledResult",                //< Name of the attachment (must be unique within the Pass)
 
                    "Lifetime": "Transient",                    //< Enum indicating whether this is a transient or an imported persistent attachment (see AttachmentLifetimeType in AttachmentEnums.h)
                                                                //  Possible values:  0 = Imported,  1 = Transient
 
                    "SizeSource": {                             //< Attachments can calculate their size from an existing attachment or from an attachment slot (see PassAttachmentSizeSource in PassAttachments.h)
 
                        "Source": {                             //< This struct specifies which attachment to use as a source for the size calculations. It does this by specifying the Pass on which the attachment or
                                                                //  attachment slot lives, then by specifying the name of the attachment or attachment slot on that Pass.
 
                            "Pass": "This",                     //< The Pass on which the source attachment resides. This is either the name of a neighboring pass (i.e. a sibling or child in the hierarchy)
                                                                //  or one of the following keywords:
                                                                //  "This" keyword makes the pass refer to itself. For example if you want a Pass's output size to depend on the size of it's input (as is the case here).
                                                                //  "Parent" keyword refers to the pass's parent.
 
                            "Attachment": "DownsampleSource"    //< The name of the attachment or attachment slot on the indicated Pass. Here we want the size of DownsampledResult to depend on DownsampleSource
                        },
                        "Multipliers": {                        //< The multipliers by which to multiply the dimensions of the source attachment to obtain the dimensions of this attachment
                                                                //  For this example, we want DownsampledResult to be half the size of DownsampleSource. (multipliers are floats and calculated pixel values will be rounded up)
 
                            "WidthMultiplier": "0.5",           //< Value by which to multiply the width of the source attachment (can be omitted, defaults to a value of 1)
 
                             "HeightMultiplier": "0.5",         //< Value by which to multiply the height of the source attachment (can be omitted, defaults to a value of 1)
 
                            "DepthMultiplier": "1.0"            //< Value by which to multiply the depth of the source attachment (can be omitted, defaults to a value of 1)
                        }
                    },
                    "FormatSource": {                           //< Similar to "SizeSource", Attachments can use other attachments or attachment slots to specify their format (see PassAttachmentRef in PassAttachments.h)
 
                        "Pass": "This",                         //< Same as with "SizeSource", this is the Pass on which the source attachment resides
 
                        "Attachment": "DownsampleSource"        //< Same as with "SizeSource", this is the name of the attachment or attachment slot on the indicated Pass. Here we want DownsampledResult to have the same format as DownsampleSource
                    }
                    "ImageDescriptor": {                        //< Struct that describes the underlying image of the attachment. Format and size can be overridden by SizeSource and FormatSource. See ImageDescriptor in ImageDescriptor.h
 
                        "BindFlags": "23",                      //< A set of combinable flags which inform the system how an image is to be bound to the pipeline at all stages of its lifetime.
                                                                //  NOTE: it is strongly recommended you omit this since the pass system will auto infer these flags based on all usages of the attachment throughout the pass hierarchy
                                                                //  Flag bits:  000001 = ShaderRead,  000010 = ShaderWrite,  000100 = Color,  0010000 = DepthStencil,  010000 = CopyRead, 100000 = CopyWrite
                                                                //  In this case, 3 = 000011, so we're combining  ShaderRead | ShaderWrite
 
                        "Format": "R16G16B16A16_FLOAT",         //< The format of the attachment, in this case R16G16B16A16_FLOAT. See Format.h in the RHI for a full list of options.
 
                        "SharedQueueMask": "7"                  //< Describes hardware queues as a mask, where each bit represents the queue family. See HardwareQueueClassMask in AttachmentEnums.h
                                                                //  Flag bits:  001 = Graphics,  010 = Compute,  100 = Copy,  111 = All (default value if omitted)
                    }
                }
            ],
            "Connections": [                                //< Specifies connections for the pass's slots. Normally connections are specified when the PassTemplate is instantiated (PassTemplates are building blocks and it's
                                                            //  up to the owner to specify how the instantiated pass should be hooked up). However there are cases like this one where we want to specify connections directly on
                                                            //  the PassTemplate. The most common is when a Pass owns the attachments it outputs. Here, our downsample pass is creating a new image attachment for it's output, so
                                                            //  we need to connect the output slot to that attachment image.
                                                            //  Under the hood "Connections" is a vector< PassConnection > (see PassAttachment.h), so each element below is a PassConnection
 
                {                                           //< Here we connect the "DownsampleOutput" slot to the "DownsampledResult" attachment.
 
                    "LocalSlot": "DownsampleOutput",        //< The name of this Pass's slot we're connecting to. In this example we're connecting the "DownsampleOutput" slot specified above
 
                    "AttachmentRef": {                      //< "AttachmentRef" here works the same way it does for "SizeSource" and "FormatSource" above
 
                        "Pass": "This",                     //< The Pass on which the source attachment resides. In this case the Pass owns the attachment, so it uses the keyword "This" to refer to itself
 
                        "Attachment": "DownsampledResult"   //< The name of the attachment or attachment slot on the indicated Pass. Here we're connecting to the "DownsampledResult" attachment we specified above in "ImageAttachments"
                    }
                }
            ],
            "FallbackConnections": [                        //< A bit of context: Passes can be enabled/disabled, but in order for the pass hierarchy to function the connections must be valid. A pass that is disabled must still provide
                                                            //  outputs for subsequent passes. In the case of InputOutput slots this is not a problem since we can simply pass along the attachment without writing to it. In the case of
                                                            //  Output slots like in this example though, this won't work, as the pass itself is creating the transient attachment for the frame. What we want to do in the case that this
                                                            //  Downsample pass is disabled is pass on the source texture. To do this, we introduce the concept of FallbackConnections. A FallbackConnection simply specifies what attachment
                                                            //  to pass as a given output when the pass is disabled. Note that this is an array of fallback connections, with each entry specifying a fallback for a given output.
                {
                    "Input" : "DownsampleSource",           //< Here we specify what input we'll use as the fallback
 
                    "Output" : "DownsampleOutput"           //< Here we specify which output we're specifying the fallback for
                }
            ],
            "PassData": {                                                   //< Custom pass data structs can be defined in C++, allowing for customized data to be exposed to the JSON Pass serialization that wouldn't be available through
                                                                            //  the PassTemplate/PassRequest class serialization. "PassData" is a pointer to the base PassData (see PasssData.h). The class is not meant to be used in and
                                                                            //  of itself, but rather inherited from and expanded for custom use cases. The type of the actual underlying data is specified in the "$type" field below.
                                                                            //  Note that a Pass's PassData can also be specified in the PassRequest (see section below). If PassData is provided in the PassRequest, then any PassData provided
                                                                            //  by the PassTemplate (like the one here) will be ignored, since a PassRequest acts an instantiation of a PassTemplate and may therefore override it's PassData
 
                "$type": "ComputePassData",                                 //< This field specifies the actual type of the underlying serialized data. In this case we are serializing ComputePassData (see ComputePassData.h). Note that
                                                                            //  whatever custom pass data you define, your pass class should handle it (see ComputePass.h for an example of how it uses ComputePassData)
 
                "ShaderAsset": {                                            //< One member of ComputePassData is the "ShaderAsset", which specifies which compute shader to run
 
                    "FilePath": "Shaders/PostProcessing/Downsample.shader"  //< File path of the compute shader to run
 
                },
 
                "Make Fullscreen Pass": true,                               //< When this setting is set to true, the number of X and Y dispatch groups will be automatically calculated so that the compute pass covers the entire output image
                                                                            //  with one thread per pixel (if the image size doesn't divide evenly we'll round up the number of X and Y dispatch count). The calculated values for X and Y depend
                                                                            //  on the size of the output image (not the on screen resolution), so here it would target the size of the downsampled output image.
                                                                            //  Example: Say our input image is 1024x1024, and the compute shader runs with [numthreads(8,8,1)]. The target output image will be 512x512, and so the dispatch
                                                                            //  group count will be X = 512/8 = 64 and Y = 512/8 = 64.
 
                "PipelineViewTag": "MainCamera",                            //< Specifies a PipelineViewTag that is used to associate this pass with a view. In this case we want to associate it with views tagged "MainCamera".
 
                "ShaderDataMappings": {                                     //< A struct that allows users to map variables directly from JSON to the Pass Shader Resource Group (SRG_PerPass). This bypasses the need for binding these variables in C++.
                                                                            //  The various mapping types are: ColorMappings, UintMappings, FloatMappings, Float2Mappings, Float3Mappings, Float4Mappings, Matrix3x3Mappings and Matrix4x4Mappings.
 
                    "FloatMappings": [                                      //< All mappings of the same type are declared as an array. Each entry in the array is a name-value pair.
                        {
                            "Name": "m_sunIntensityMultiplier",             //< The name of the shader resource group variable that we want to map the value to.
                            "Value": 1.0                                    //< The value we want to map. Note that the type of value is given by the mapping type, in this case float because we are specifying "FloatMappings"
                        }
                    ]
                }
 
            }
        }
    }
}
```