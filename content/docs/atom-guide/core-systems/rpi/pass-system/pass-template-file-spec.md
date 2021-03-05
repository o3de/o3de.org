# Pass Template File Spec

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