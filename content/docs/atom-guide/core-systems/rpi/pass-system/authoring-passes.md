# Authoring Passes

Each pass is registered within its parent pass to establish the overall context of the passes. The entire pass system is defined through a root node. 

## Root Pass and Pass Registry
The pass system is a nested tree of passes where every pass can be a render pass or a sub-root with nested child passes. For the main renderer, the **root pass** is *MainPipeline.pass*. The root can be changed in the pipeline asset file *MainRenderPipeline.azasset*. (The pipeline asset file can also be changed in the file *../dev/bootstrap.cfg* with the parameter `m_defaultPipelineAssetPath`)

The **pass registry**, which lives in the file *PassTemplates.azasset*, contains the registry of all possible passes. When adding a new pass, you must include the name of the pass template and a path to its file. PassTemplates.azasset contains the following properties:
- **Name**: The name of the pass template. 
- **Path**: The path to the file where the pass template was defined. 


Within the root pass, all of the passes are listed in their contextual order. Each listing has a reference to the pass file (via `Name`) that contains most of the passes information regarding exposed resources and attachments. Passes use connections to use resources from other passes. These resources, along with other properties, are also represented in the Shader Resource Group: SRG_PerPass. 

## Introducing Pass Templates in the Root Pass
### Connections
**Connections** exposes resources from other passes to be used in this pass. A pass can use other passes' resources by defining a `Connections` block in its pass template file. The pass's resources must be exposed via `Slots` in the pass file. Each connection is bound within the specific pass to a unique **Slot** name that defines the resource. (Connections are also bound to the SRG_PerPass in the shader code.)

The pass template file (*.passtemplate*) contains the following elements:
- **Name**: The name of this pass. 
- **TemplateName**: A unique template name. The name will correlate to the pass file in the pass registry, *PassTemplates.azassets*. 
- **Enabled**
- **Connections**: A list of connections. Each connection contains the following elements: 
  - **LocalSlot**: The name of the slot to connect this attachment to. The slots are defined in the corresponding pass file (*.pass*) for this pass template. 
  - **AttachmentRef**: Points to an attachment or resource data within the specified pass. `Pass` contains the name of the pass that this referenced attachment belongs to. `Attachment` is the name of the attachment slot specified in the referenced pass. 

```json
{
       "Name": "SubsurfaceScatteringPass",
       "TemplateName": "SubsurfaceScatteringPassTemplate",
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
         ],
 ..
 ..
}
```
### Pass Data
**PassData** defines what pass type or method to use with what draw list, pipeline, and pass SRG. 
Custom pass data structs can be defined in C++, allowing for customized data to be exposed to the JSON Pass serialization that wouldn't be available through the PassTemplate/PassRequest class serialization. The `PassData` property is a pointer to the base class PassData (*PassData.h*). The class is not meant to be used in and of itself, but rather it is meant to be inherited from or expanded on for custom use cases. 

A pass's PassData can also be specified in the PassRequest. In this case, any PassData provided by the PassTemplate will be ignored. This is because PassRequest acts as an instantiation of a PassTemplate and may override its PassData. 

Depending on the functionality of the PassData (via `$type`), there will be different configurable properties in the file. 

PassData contains the following elements. 
- **$type**: Specifies the pass functionality as implemented by the C++ class. New passes functionality can be introduced into the C++ class. Atom implements functionalities such as RasterPassData, FullscreenTrianglePassData, and ComputePassData. You must match the PassClass in the PassTemplate file to its PassData definition. For eaxmple, RasterPassData must match RasterPass. 
- **DrawListTag**: The name of the draw list to apply this pass to. 
- **PipelineViewTag**: The name of the pipeline to apply this pass to. 
- **PassSrgAsset**: `FilePath` contains a path to the pass SRG file. 
```json
"PassData": {
    "$type": "RasterPassData",      // See RasterPass.cpp                                
    "DrawListTag": "forward",
    "PipelineViewTag": "MainCamera",
    "PassSrgAsset": {
        "FilePath": "shaderlib/atom/features/pbr/forwardpasssrg.azsli:PassSrg"
    }
}
```

### ExeuteAfter
Since the FrameGraph can parallelize passes, **ExecuteAfter** is needed to define an order of execution. You only need to specify the ExecuteAfter property if the order cannot be deducted by the resource dependency. If the pass has dependencies on other passes, the dependency graph will apply the correct pass order when submitting them. 

## Pass File (*.pass)
The pass file (*.pass*) contains the missing data to link between the Connections declared in the parent pass, and the actual shader Slots. 

Consider the following example of the SkyBox pass (*SkyBox.pass*). **Slots** contains all the matching data to match between Connections declared for this pas in the root pass, which in this case is *MainePipeline.pass*. In order to hook each of the exposed resources into the shader, the slot is used as the slot in SRG_PerPass. This is done using the keyword **ShaderInputName**, which will identify the resource name in the SRG in a unique way. If this is omitted from the slot data, the SRG will match resources to slots by order of appearance. It is recommended to use ShaderInputName because it guarantees readability and correct matching between the Slots resources and the SRG resources. While this can be avoided for simple shaders with a few inputs, it is error proned and not recommended. 

*Note: Skybox.pass can be found in the folder *../dev/Gems/Atom/Feature/Common/Assets/Passes/*.*

```json
"ClassData": {
    "PassTemplate": {
        "Name": "SkyBoxTemplate",
        "PassClass": "FullScreenTriangle",          // Association with the type of pass (implemented in C++) - must match the PassData $type defined in the root pass
        "Slots": [                                  // Slots definition including matching data to the defined Connections in the root pass
            {
                "Name": "SpecularInputOutput",      // Will match the name given in the Attachment field of the Connection
                "SlotType": "InputOutput",
                "ScopeAttachmentUsage": "RenderTarget"
            },
            {
                "Name": "ReflectionInputOutput",
                "SlotType": "InputOutput",
                "ScopeAttachmentUsage": "RenderTarget"
            },
            {
                "Name": "SkyBoxDepth",
                "ShaderInputName": "m_skyBoxDepth", // Here we explicitly define the slot /resource name in the SRG_PerPass
                "SlotType": "InputOutput",
                "ScopeAttachmentUsage": "DepthStencil"
            }
        ],
        "PassData": {                               // If appears here, will override the root pass
            "$type": "FullscreenTrianglePassData",
            "ShaderAsset": {
                "FilePath": "shaders/skybox/skybox.shader"
            },
            "PipelineViewTag": "MainCamera",
            "ShaderDataMappings": {
                "FloatMappings": [                  // Data associated with the shader SRG_PerPass. can be Color, Uint, Float, Float[X], Matrix3x3 or Matrix4x4
                    {
                        "Name": "m_sunIntensityMultiplier",
                        "Value": 1.0
                    }
                ]
            }
        }
    }
}
```

## Authoring a PassTemplate
The class `PassTemplate` (*PassTemplate.h*) is used to instantiate a `Pass` (*Pass.h*). It specifies inputs and outputs for a Pass, as well as any `PassAttachments` (*PassAttachment.h*) owned by that Pass. A PassTemplate can be authored in code as C++ or in data as a JSON file (*.pass*). 

When authored as data, pass template files are serialized as a `PassAsset` (*PassAsset.h*), which is a thin wrapper around a PassTemplate used by the Asset System for serialization. 


The following example breaks down the contents of a PassTemplate authored in data as a JSON file. Each of these elements are also applied when authoring a PassTemplate in C++. 

```json
{
    "Type": "JsonSerialization",                //< JSON serialization header
    "Version": 1,                               //< JSON serialization header
    "ClassName": "PassAsset",                   //< Defines that the serialized class is a PassAsset (see PassAsset.h). A PassAsset is just a bare bones wrapper around PassTemplate used by the asset system.
    "ClassData": {                              //< JSON serialization header
 
        "PassTemplate": {                               //< The serialized PassTemplate contained by the PassAsset (see PassTemplate.h)
 
            "Name": "DownsamplePassTemplate",           //< The name of the PassTemplate. This name will be used to query and instantiate the PassTemplate from the PassTemplateLibrary
 
            "PassClass": "ComputePass",                 //< The name of the Pass class to create when this template gets instantiated. In this case, our DownsamplePassTemplate will create a pass of class ComputePass.
                                                        //  Pass classes are registered for creation with PassSystemInterface::AddPassCreator(...)
 
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
                                                                            //  on the size of the output image (not the on screen resolution), so here it woudl target the size of the downsampled output image
                                                                            //  Example: Say our input image is 1024x1024, and the compute shader runs with [numthreads(8,8,1)]. The target output image will be 512x512, and so the dispatch
                                                                            //  group count will be X = 512/8 = 64 and Y = 512/8 = 64.
 
                "PipelineViewTag": "MainCamera",                            //< Specifies a PipelineViewTag that is used to associate this pass with a view. In this case we want to associate it with views tagged "MainCamera"
 
                "ShaderDataMappings": {                                     //< A struct that allows users to map variables directly from JSON to the Pass Shader Resource Group (SRG_PerPass). This bypasses the need for binding these variables in C++
                                                                            //  The various mapping types are: ColorMappings, UintMappings, FloatMappings, Float2Mappings, Float3Mappings, Float4Mappings, Matrix3x3Mappings and Matrix4x4Mappings
 
                    "FloatMappings": [                                      //< All mappings of a same type are declared as an array. Each entry in the array being a name-value pair.
                        {
                            "Name": "m_sunIntensityMultiplier",             //< The name of the shader resource group variable that we want to map the value to
                            "Value": 1.0                                    //< The value we want to map. Note that the type of value is given by the mapping type, in this case float because we are specifying "FloatMappings"
                        }
                    ]
                }
 
            }
        }
    }
}
```

## Registering a Pass
Before a PassTemplate can be instantiated, it must be registered with the PassSystem. 

## Instantiating a Pass in C++
A Pass can be created through the PassSystem in four ways (all are equally performant):  
1. Using the class of the pass you want directly as a function template parameter. This will call that pass class's static Create( ) function (see Authoring a Pass Class below).

2. Using a Name of the pass class you want to instantiate. The PassSystem will use the Name to lookup the appropriate PassCreator (the PassSystem holds a map of PassCreators that it can index with a Name). A PassCreator is simply a function pointer to the Pass's static Create( ) function.

3.  Using a PassTemplate or Name of a PassTemplate (it will use the Name to query the PassTemplate from the PassSystem). The PassTemplate has the Name of a pass class that is used to query a PassCreator same as for step 2.

4.  Using a PassRequest (see PassRequest.h). A PassRequest is a small collection of data detailing how to instantiate a PassTemplate. This includes the Name of the PassTemplate (to be used as in step 3) and list of PassConnections (see PassAttachment.h) to hookup the instantiated Pass to it's neighbors.

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

## Instantiating a Pass in Data
To instantiate Passes in a data-driven way, PassTemplates have lists of PassRequests that are used to instantiate child passes. When a PassTemplate is instantiated, it iterates over its list of PassRequests and uses them to create child passes. BSince the child passes may be instantiated from PassTemplates that have child PassRequests, we can specify entire pass hierarchies. 

![pass-architectrure](../../../../../static/images/atom-guide/core-systems/rpi/pass-template-request-hierarchy.svg)

### Pass Requests
The follow example demonstrates .pass file where the defined PassTemplate includes PassRequests. 
When a PassTemplate gets instantiated as a Pass, each PassRequest will create a child Pass. On the code side, this is represented as `vector<PassRequest>`. On the data side, each container under PassRequests is a single pass request. 

Each PassRequest contains the following elements: 
- **Name**: The unique name of the child Pass that will be created from this PassRequest. All child passes under the same parent Pass must have different names to avoid name conflict.
- **TemplateName**: The name of the pass template to use when creating this pass. 
- **Enabled**: Where the pass is enabled or disabled. If omitted, this property defaults to true. 
- **PassData**: PassRequests can hold a packet of custom data. This data is serialized as any `AZStd` component and will be cast to the appropriate type by the instantiated Pass during creation. 

    For more information, see [PassData](#pass-data).

```json
{
    "Type": "JsonSerialization",                                
    "Version": 1,                                               
    "ClassName": "PassAsset",                                   
    "ClassData": {                                              
        "PassTemplate": {                                   
            //< See above example for explanation of these variables    
            "Name": "MainPipeline",                         
            "PassClass": "ParentPass",                       
            "Slots": [                                       
                {                                            
                    "Name": "SwapChainOutput",               
                    "SlotType": "Output",                    
                    "ScopeAttachmentUsage": "RenderTarget"   
                }
            ],
            //< List of PassRequests 
            "PassRequests": [                                   
                { 
                    "Name": "ForwardPass", 
                    "TemplateName": "ForwardPassTemplate",
                    "Enabled": true, 
                    "PassData": {
                    //  Here our "ForwardPassTemplate" defined above will create a pass of type RasterPass. Refer to RasterPass.cpp to see how it casts the custom data from the PassRequest.
 
                        "$typeName": "RasterPassData",          //< Here we specify what type the custom data is, in this case RasterPassData (see RasterPassData.h)
 
                        "m_data": {                             //< Wraps the serialized RasterPassData.
 
                            "DrawListTag": "forward",           //< We provide a DrawListTag for the Pass. A DrawListTag is an identifier used to match DrawItems with Passes (see DrawList.h and DrawItem.h in the RHI).
                                                                //  In this case, the pass will query the view for the DrawList with the tag "forward" and render the items in that DrawList (see View.h and DrawListContext.h).
 
                            "PipelineViewTag": "MainCamera",    //< We provide a PipelineViewTag for the Pass. This tells the pass which views it needs to use for rendering.
 
                            "PerPassSrgPath" : "shaderlib/shaderresourcegroups/forwardpasssrg_passsrg.azsrg"    //< This points to the per-pass SRG that will be used when rendering this pass.
                        }                                                                                       //  If the pass renders DrawItems from a DrawList, all those DrawItems must use the same per-pass SRG as defined here.
                    }
                },
                {                                               //<
                    "Name": "TonemapPass",                      //< This PassRequest will create a Pass called "TonemapPass" using the PassTemplate "TonemapTemplate".
                    "TemplateName": "TonemapTemplate",          //<
                    "Enabled": true,                            //<
 
                    "Connections": {                            //< List of PassConnections to apply to our "TonemapPass" Pass.
                                                                //  Under the hood this is a vector< PassConnection > (see PassAttachment.h), so each "element" below is a PassConnection.
 
                        {                                       //< This PassConnection will connect TonemapPass.Input to ForwardPass.ColorOutput.
 
                            "LocalSlot": "Input",               //< The name of the slot on this pass ("TonemapPass" in this case) we want to connect to. In this case we want to connect the slot labeled "Input".
 
                            "AttachmentRef": {                  //< This specifies the other end of the connection. AttachmentRef works the same way here as it does in the "ForwardPassTemplate" example above.
 
                                "Pass": "ForwardPass",          //< We want to connect to a slot on the Pass called "ForwardPass".
 
                                "Attachment": "ColorOutput"     //< The slot on "ForwardPass" we want to connect to is "ColorOutput".
                            }
                        }
                    }
                },
                {                                               //<
                    "Name": "CopyToSwapChain",                  //< This PassRequest will create a Pass called "CopyToSwapChain" using the PassTemplate "FullscreenCopyTemplate"
                    "TemplateName": "FullscreenCopyTemplate",   //<
 
                    "Connections": {                            //< List of PassConnections to apply to our "CopyToSwapChain" Pass.
 
                        {                                       //< This PassConnection will connect CopyToSwapChain.Input to TonemapPass.Output.
 
                            "LocalSlot": "Input",               //< We want to connect the "Input" slot of the "CopyToSwapChain" Pass.
 
                            "AttachmentRef": {
                                "Pass": "TonemapPass",          //< We want to connect to "TonemapPass".
 
                                "Attachment": "Output"          //< The slot on "TonemapPass" we want to connect to is called "Output".
                            }
                        },
                        {                                       //< Here we specify a second connection: from CopyToSwapChain.Output to Parent.SwapChainOutput.
                                                                //  Parent in this case refers to the Parent of "CopyToSwapChain", which is the pass that will be instantiated from the "MainPipeline" PassTemplate defined by this file.
 
                            "LocalSlot": "Output",              //< Connecting "Output" slot of "CopyToSwapChain" Pass.
 
                            "AttachmentRef": {
                                "Pass": "Parent",               //< "Parent" in this case is a keyword to specify the Parent of the Pass in question, i.e. the Parent Pass of "CopyToSwapChain", i.e. this file.
 
                                "Attachment": "SwapChainOutput" //< Connecting to the "SwapChainOutput" slot, which is defined above under "Slots".
                                                                //  Note that when connecting sibling passes (passes that live under the same parent), we want to connect inputs to outputs.
                            }                                   //  When we're connecting passes to their parent or children, we want to connect outputs to outputs and inputs to inputs,
                        }                                       //  since the parent pass just acts as a wrapper around it's child passes.
                    }
                }
            ]
        }
    }
}
```

## Creating Passes in Code
In some cases you need to write custom logic to create your passes. For example, if you want to downsample a screen space image down to a 1x1 texture, such as for eye adaptation, you need custom logic to recursively create downsample passes that feed into each other. Recursion and other programmatic logic isn't handled by the data driven pass system, so it needs to be written in C++ code. All Passes except for the root are owned by a ParentPass (*ParentPass.h*). The root pass is owned by the PassSystem (*PassSystem.h*). The ParentPass class has an overrideable method called `CreateChildPassesInternal()`. To write custom Pass creation code, create a pass class that derives from ParentPass and override the `CreateChildPassesInternal()` to implement your custom Pass creation logic.

## Authoring a Pass Class
The base Pass class has five virtual behavior functions that derived classes can override to implement custom behavior. 

When creating your own Pass class, you can override some or all of these functions to customize the behavior and logic of your Pass. Passes are organized into a tree hierarchy and traversed in septh-first order, so whenever one of these functions is invoked on a Pass, it will also be invoked on all the Pass's children in depth-first-order. 

## ParentPass and RenderPass
There is a split in the Pass System between two types of Passes: ParentPass and RenderPass (see RenderPass.h). These are the only two classes that inherit directly from Pass. A ParentPass is simply a Pass that contains child Passes. It's purpose is to construct the Pass tree hierarchy and it does no rendering work itself. In contrast, a RenderPass has no child Passes, but it does implement some form of render work. When creating your own Pass class, you should always inherit from one of these classes or their derived classes, never from Pass directly.

### Implementing a ParentPass
A ParentPass is a container for child passes. It's inputs and outputs act as proxies for it's children's inputs and outputs. It doesn't do any render work itself but merely forwards render calls to it's children. In addition to the original five virtual behavior functions defined in Pass, ParentPass adds a sixth virtual behavior function called CreateChildPassesInternal( ). If you're deriving from ParentPass or one of it's derivatives, you can override the CreateChildPassesInternal( ) function to implement custom logic for creating passes. This is useful if you need to programmatically create Passes based on some parameters, as the data-driven side of the Pass System does not allow for this.

### Implementing a RenderPass
**RenderPass** is the base class for all Passes that implement some form of rendering work. A RenderPass is a **ScopeProducer** (*ScopeProducer.h*) that will submit **Scopes** (*Scope.h*) to the RHI FrameGraph (*FrameGraph.h*). During rendering, RenderPass will receive callbacks to its functions: `SetupFrameGraphDependencies`, `CompileResources`, and `BuildCommandList`. These functions on the RenderPass can be overriden by derived classes to customize behavior.
- **`SetupFrameGraphDependencies(...)`**: This is where the Pass declares dependencies so that the RHI FrameGraph can successfully build its graph. The Pass tells the RHI what attachments it will use.

    *For an example, see `RasterPass::SetupFrameGraphDependencies` in *RasterPass.cpp* and `RenderPass::BindAttachments` in *RenderPass.cpp*.*

- **`CompileResources(...)`**: This is where the Pass can compile ShaderResourceGroups and access Image and Buffer views from the context. 

    *For an example, see `RasterPass::CompileResources` in *RasterPass.cpp*.*

- **`BuildCommandList(...)`**: This is where the Pass can add work items (DrawItem, CopyItem, or DispatchItem) to the command list for deferred executions in the RHI. 

For an example on using these functions, see the file *RasterPass.cpp* in the folder *../dev/Gems/Atom/RPI/Code/Source/RPI.Public/Pass/*.

### RenderPasses in Atom
Atom has three derived classes of RenderPass that implement the most common use cases. You can derive from any of these classes and override any virtual functions to implement your desired behavior. 
- **RasterPass**: Rasterizes objects to the screen. Objects are matched to passes via DrawListTags. 
- **ComputePass**: Dispatches a compute shader. There is an option to make it a fullscreen compute shader so that the number of X and Y dispatch groups are auto calculated based on the size of the output image and the X and Y thread count per group specified in the shader. 
- **FullscreenTrianglePass**: Renders a triangle that covers the screen so that every pixel of the output image is written to. 