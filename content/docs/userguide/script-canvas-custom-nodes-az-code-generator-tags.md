# Script Canvas Tags for AZ Code Generator<a name="script-canvas-custom-nodes-az-code-generator-tags"></a>

Script Canvas provides a variety of tags that AZ Code Generator uses\. These tags can be found in the source code location `dev\Gems\ScriptCanvas\Code\Include\ScriptCanvas\CodeGen\CodeGen.h`\. Because the tags are well documented in the code, this guide focuses on showing how to use them rather than on covering each one in detail\.

The following example shows the **Delay** node, which uses a variety of different code generation features\. The source code files are located in the directory `dev\Gems\ScriptCanvas\Code\Include\ScriptCanvas\Libraries\Time`\.

The first tag is `ScriptCanvas_Node`, which is in the `Countdown.h` file\. This tag is used as the class declaration of a node and generates the necessary reflection for the node\.

```
ScriptCanvas_Node(Countdown,
    ScriptCanvas_Node::Name("Delay")
    ScriptCanvas_Node::Uuid("{FAEADF5A-F7D9-415A-A3E8-F534BD379B9A}")
    ScriptCanvas_Node::Description("Counts down time from a specified value.")
);
```

Note that while internally the class name is `Countdown`, the code specifies that **Delay** be used as the node name in Script Canvas editor\. AZ Code Generator uses the `ScriptCanvas_Node` tag to produce the following code in `Countdown.generated.h`:

```
#define AZ_GENERATED_Countdown \
public: \
    AZ_COMPONENT(Countdown, "{FAEADF5A-F7D9-415A-A3E8-F534BD379B9A}", ScriptCanvas::Node ); \
    static void Reflect(AZ::ReflectContext* reflection); \
    void ConfigureSlots() override; \
    bool IsEntryPoint() const override; \
    using Node::GetInput; \
    friend struct CountdownProperty;
```

The `ScriptCanvas_Node` looks like the following in the `CodeGen.h` file when you compile the project:

```
define ScriptCanvas_Node(ClassName, ...) AZ_JOIN(AZ_GENERATED_, ClassName)
```

When the project is compiled, the preprocessor finds `AZ_GENERATED_Countdown` in the `Countdown.generated.h` file and replaces that macro with the generated code\.

## Generating the Node Topology<a name="script-canvas-custom-nodes-topology"></a>

After you have declared the node, the next step is to generate the node's topology\. The topology can include a variety of tags, as the following table shows\.


****  

| **Tag** | **Description** | 
| --- | --- | 
| ScriptCanvas\_In | Provides a named Input execution slot to the node\. | 
| ScriptCanvas\_Out | Provides a named Output execution slot to the node\. | 
| ScriptCanvas\_Property | This tag must precede a member variable in the class that you want to expose to Script Canvas for editing and scripting\. By default, the property is exposed with an Input and Output slot\. However, you can use the Input or Output attributes to expose only one or the other\. | 
| ScriptCanvas\_PropertyWithDefaults | Like ScriptCanvas\_Property, but specifies default values\. | 
| Property | Reflects a property to the serialization context that does not need to be an editable property or an input property\. For more information, see [Serializing "Hidden" Node Properties](script-canvas-custom-nodes-implementing-behavior.md#script-canvas-custom-nodes-serializing-hidden-properties)\. | 
| EditProperty | Reflects a property to the serialization context and to the EditContext with EditContext attribute support\. For more information, see [Serializing "Hidden" Node Properties](script-canvas-custom-nodes-implementing-behavior.md#script-canvas-custom-nodes-serializing-hidden-properties)\. | 

Each of these tags has attributes that can be configured\. For example, the `Countdown.h` \(**Delay**\) node has the following topology:

```
// Inputs
ScriptCanvas_In(ScriptCanvas_In::Name("In", "When signalled, execution is delayed at this node according to the specified properties.")
                ScriptCanvas_In::Contracts({ DisallowReentrantExecutionContract })); 
ScriptCanvas_In(ScriptCanvas_In::Name("Reset", "Resets the delay.")
                ScriptCanvas_In::Contracts({ DisallowReentrantExecutionContract })); 
// Outputs
ScriptCanvas_Out(ScriptCanvas_Out::Name("Out", "Signalled when the delay reaches zero.")); 
// Data
ScriptCanvas_Property(float,
    ScriptCanvas_Property::Name("Time", "Amount of time to delay, in seconds")
    ScriptCanvas_Property::Input); 
ScriptCanvas_Property(bool,
    ScriptCanvas_Property::Name("Loop", "If true, the delay will restart after triggering the Out slot") ScriptCanvas_Property::ChangeNotify(AZ::Edit::PropertyRefreshLevels::EntireTree)
    ScriptCanvas_Property::Input); 
ScriptCanvas_Property(float,
    ScriptCanvas_Property::Name("Hold", "Amount of time to wait before restarting, in seconds") ScriptCanvas_Property::Visibility(&Countdown::ShowHoldTime)
    ScriptCanvas_Property::Input); 
ScriptCanvas_Property(float,
    ScriptCanvas_Property::Name("Elapsed", "The amount of time that has elapsed since the delay began.") ScriptCanvas_Property::Visibility(false)
    ScriptCanvas_Property::Output
    ScriptCanvas_Property::OutputStorageSpec
);
```

In the **Script Canvas** editor, the node shows the **Time**, **Loop**, **Hold**, and **Elapsed** properties that were defined:

![\[Properties on the Delay node\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-custom-nodes-2.png)