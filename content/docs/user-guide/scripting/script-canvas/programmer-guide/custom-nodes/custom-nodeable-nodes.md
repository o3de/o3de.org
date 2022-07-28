---
linktitle: Custom Nodeable Nodes
title: Creating Custom Nodeable Nodes in Script Canvas
description: Learn how to create custom Script Canvas Nodeable Nodes in Open 3D Engine (O3DE).
weight: 100
---

This topic guides you how to create custom Script Canvas Nodeable Nodes step by step.

You'll see the term _nodeable_ used throughout the O3DE source. 
A nodeable can refer to both the node that appears in the Node Palette as a result of the AzAutoGen processing,
and the mechanism by which a compiled Script Canvas graph can invoke C++ functions.

## Step 1: Adding support for custom nodeable nodes to a Gem
{{< note >}}
This step is only required once for the first time custom nodeable node creation.
{{< /note >}}

In your Gem's `Code/CMakeLists.txt`, add a section for `AUTOGEN_RULES` and declare `Gem::ScriptCanvas` as a build dependency.

The precise place for this section will vary depending on how your Gem is configured. 
However, we recommend that your Gem define a `STATIC` library to make the code available to both runtime and editor projects.

As an example, here is partial definition of StartingPointInput Gem's `Code/CMakeLists.txt` that supports Script Canvas custom nodes with following required changes:
1. `Gem::ScriptCanvas` must be declared as `BUILD_DEPENDENCIES` of `STATIC` library
1. Add `AUTOGEN_RULES` section for custom free function under `STATIC` library
   ```cmake
   AUTOGEN_RULES
       *.ScriptCanvasNodeable.xml,ScriptCanvasNodeable_Header.jinja,$path/$fileprefix.generated.h
       *.ScriptCanvasNodeable.xml,ScriptCanvasNodeable_Source.jinja,$path/$fileprefix.generated.cpp
       *.ScriptCanvasNodeable.xml,ScriptCanvasNodeableRegistry_Header.jinja,AutoGenNodeableRegistry.generated.h
       *.ScriptCanvasNodeable.xml,ScriptCanvasNodeableRegistry_Source.jinja,AutoGenNodeableRegistry.generated.cpp
   ```
1. `STATIC` library must be declared directly as `BUILD_DEPENDENCIES` of Gem runtime module (and it should be included as part of editor module build dependencies hierarchy)
1. `StartingPointInput.Static` includes two .cmake file lists. 
   * We include the common files and the platform specific files which are set in `startingpointinput_files.cmake`.
   * We include AzAutoGen ScriptCanvas free function required templates which are set in `startingpointinput_autogen_files.cmake` (We recommend to keep this file separately for clear scope)

   Example contents of `startingpointinput_autogen_files.cmake`:
   ```cmake
   set(FILES
       ...
       ${LY_ROOT_FOLDER}/Gems/ScriptCanvas/Code/Include/ScriptCanvas/AutoGen/ScriptCanvasNodeable_Header.jinja
       ${LY_ROOT_FOLDER}/Gems/ScriptCanvas/Code/Include/ScriptCanvas/AutoGen/ScriptCanvasNodeable_Source.jinja
       ${LY_ROOT_FOLDER}/Gems/ScriptCanvas/Code/Include/ScriptCanvas/AutoGen/ScriptCanvasNodeableRegistry_Header.jinja
       ${LY_ROOT_FOLDER}/Gems/ScriptCanvas/Code/Include/ScriptCanvas/AutoGen/ScriptCanvasNodeableRegistry_Source.jinja
   )
   ```

   The list of autogen templates might be different if you create custom templates for your own purposes. 
   For example, if you were to extend Script Canvas to do something beyond what it provides "out of the box", you could have your own set of templates to generate code in the syntax that you define.
   For more information, refer to the documentation on [AzAutoGen](/docs/user-guide/programming/autogen/).

```cmake
...
ly_add_target(
    NAME StartingPointInput.Static STATIC
    NAMESPACE Gem
    FILES_CMAKE
        startingpointinput_files.cmake
        startingpointinput_autogen_files.cmake                                                                # 4
    ...
    BUILD_DEPENDENCIES
        PUBLIC
            AZ::AzCore
            AZ::AzFramework
            CryCommon
            Gem::ScriptCanvas                                                                                 # 1
    AUTOGEN_RULES                                                                                             # 2
        ...
        *.ScriptCanvasNodeable.xml,ScriptCanvasNodeable_Header.jinja,$path/$fileprefix.generated.h
        *.ScriptCanvasNodeable.xml,ScriptCanvasNodeable_Source.jinja,$path/$fileprefix.generated.cpp
        *.ScriptCanvasNodeable.xml,ScriptCanvasNodeableRegistry_Header.jinja,AutoGenNodeableRegistry.generated.h
        *.ScriptCanvasNodeable.xml,ScriptCanvasNodeableRegistry_Source.jinja,AutoGenNodeableRegistry.generated.cpp
)

ly_add_target(
    NAME StartingPointInput ${PAL_TRAIT_MONOLITHIC_DRIVEN_MODULE_TYPE}
    NAMESPACE Gem
    FILES_CMAKE
        startingpointinput_shared_files.cmake
    ...
    BUILD_DEPENDENCIES
        PRIVATE
            AZ::AzFramework
            Gem::StartingPointInput.Static                                                                    # 3
)

...
```


## Step 2: Create an XML file for code generation {#create-an-xml-file}

Prepare for code generation by creating an XML file that contains information about the node's class, input pins, output pins, and associated tooltip text. AzAutoGen uses this file to generate C++ code used by your node class when implementing your node's functionality.
The file includes the following XML attributes:
1. **(Required)** The name of custom nodeable class.
1. **(Recommended)** The namespace of functions, which should match with the outer namespace of custom nodeable class.
1. **(Required)** The fully qualified name of custom nodeable class, including namespace name.
1. **(Required)** The sanitized nodeable node name, which will be presented in Script Canvas Editor.
1. **(Optional)** The category of functions, if not presented, will use `Nodes` instead.
1. It defines the latent execution output slot for custom nodeable node.
1. It defines the execution input and output slot for custom nodeable node.

We'll use the following XML, copied from the O3DE source for the **Input Handler** node<!-- , as an example to explain the important sections of this file -->.

File: [InputHandlerNodeable.ScriptCanvasNodeable.xml](https://github.com/o3de/o3de/blob/development/Gems/StartingPointInput/Code/Source/InputHandlerNodeable.ScriptCanvasNodeable.xml)

```xml
<ScriptCanvas Include="Source/InputHandlerNodeable.h" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <Class Name="InputHandlerNodeable"                                                                                  # 1
        Namespace="StartingPointInput"                                                                                  # 2
        QualifiedName="StartingPointInput::InputHandlerNodeable"                                                        # 3
        PreferredClassName="Input Handler"                                                                              # 4
        Category="Input"                                                                                                # 5
        Description="Handle processed input events found in input binding assets">

        <Output Name="Pressed" Description="Signaled when the input event begins." >                                    # 6
            <Parameter Name="value" Type="float"/>
        </Output>
        <Output Name="Held" Description="Signaled while the input event is active." >                                   # 6
            <Parameter Name="value" Type="float"/>
        </Output>
        <Output Name="Released" Description="Signaled when the input event ends." >                                     # 6
            <Parameter Name="value" Type="float"/>
        </Output>
        <Input Name="Connect Event" Description="Connect to input event name as defined in an input binding asset.">    # 7
            <Parameter Name="Event Name" Type="AZStd::string" Description="Event name as defined in an input binding asset. Example 'Fireball'."/>
        </Input>/>
    </Class>
</ScriptCanvas>
```

## Step 3: Create the node class files {#create-the-node-class-files}

The next step is to implement the C++ functions that will be invoked by the Script Canvas node. These source files reference the auto-generated source for your node, and use the `ScriptCanvas::Nodeable` class as a base class.

There are three critical parts that every Script Canvas nodeable header file needs:

1. It must derive from `ScriptCanvas::Nodeable`.
1. It must contain the node definition macro `SCRIPTCANVAS_NODE`.
1. It must include the generated header.

The following code fragment from the `InputHandlerNodeable` header for the **Input Handler** node demonstrates these requirements:

File: [InputHandlerNodeable.h](https://github.com/o3de/o3de/blob/development/Gems/StartingPointInput/Code/Source/InputHandlerNodeable.h)

```cpp
#include <ScriptCanvas/Core/Nodeable.h>
#include <ScriptCanvas/Core/NodeableNode.h>
#include <ScriptCanvas/CodeGen/NodeableCodegen.h>
#include <StartingPointInput/InputEventNotificationBus.h>

#include <Source/InputHandlerNodeable.generated.h>                                                   // (3)

namespace StartingPointInput
{
    //////////////////////////////////////////////////////////////////////////
    /// Input handles raw input from any source and outputs Pressed, Held, and Released input events
    class InputHandlerNodeable
        : public ScriptCanvas::Nodeable                                                              // (1)
        , protected InputEventNotificationBus::Handler
    {
        SCRIPTCANVAS_NODE(InputHandlerNodeable)                                                      // (2)
        ...
    };
}
```

## Step 4: Add source files to CMake {#add-source-files-to-cmake}

Add the XML and class source files to one of Gem's .cmake files.

For example, in `InputHandlerNodeable` we must add the following lines:

File: [startingpointinput_files.cmake](https://github.com/o3de/o3de/blob/development/Gems/StartingPointInput/Code/startingpointinput_files.cmake)
```cmake
set(FILES
    ...
    Source/InputHandlerNodeable.h
    Source/InputHandlerNodeable.cpp
    Source/InputHandlerNodeable.ScriptCanvasNodeable.xml
    ...
)
```

## Step 5: Register the new node {#register-the-new-node}
{{< note >}}
This step is only required once for the first time nodeable node creation.
{{< /note >}}

The final step is to register the new node. To do this, you need to modify your Gem's [Gem module](/docs/user-guide/programming/gems/overview/) or [system component](/docs/user-guide/programming/components/system-components/). Use the **StartingPointInput** Gem from the O3DE source as a reference:

In your Gem's module or system component, include the auto-generated registry header file, and invoke `REGISTER_SCRIPTCANVAS_AUTOGEN_NODEABLE` with the sanitized Gem target name.
{{< note >}}
Use the same auto-generated registry header file that you declared in Step 1 under `AUTOGEN_RULES` in your Gem's `Code/CMakeLists.txt`. In the **StartingPointInput** example, it is `AutoGenNodeableRegistry.generated.h`.
{{< /note >}}
{{< note >}}
The sanitized Gem target name should contain letters and numbers only. In the **StartingPointInput** example, it is `StartingPointInputStatic` which refers to the `StartingPointInput.Static` target.
{{< /note >}}

For example, in [`StartingPointInputGem.cpp`](https://github.com/o3de/o3de/blob/development/Gems/StartingPointInput/Code/Source/StartingPointInputGem.cpp):

```cpp
#include <AutoGenNodeableRegistry.generated.h>
...

REGISTER_SCRIPTCANVAS_AUTOGEN_NODEABLE(StartingPointInputStatic);
...
```

## Advanced ScriptCanvasNodeable.xml usage
This topic explores additional features that we support in the nodeable XML file.

### Base and derived nodeable node
If you have shared logic across multiple nodeable nodes, you can create a base node and multiple derived nodes.

The following example uses the O3DE source for the **Time Delay** node:

File: [TimeDelayNodeable.ScriptCanvasNodeable.xml](https://github.com/o3de/o3de/blob/development/Gems/ScriptCanvas/Code/Include/ScriptCanvas/Libraries/Time/TimeDelayNodeable.ScriptCanvasNodeable.xml)
```xml
<ScriptCanvas Include="Include/ScriptCanvas/Libraries/Time/TimeDelayNodeable.h" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <Class Name="TimeDelayNodeable"
        QualifiedName="Nodeables::Time::TimeDelayNodeable"
        PreferredClassName="Time Delay"
        Base="Nodeables::Time::BaseTimer"    # Declare base class as Nodeables::Time::BaseTimer
        Category="Timing"
        Namespace="ScriptCanvas"
        Description="Delays all incoming execution for the specified number of ticks">

        <Input Name="Start" Description="">
            <Parameter Name="Delay" Type="Data::NumberType" DefaultValue="0.0" Description="The amount of time to delay before the Done is signalled."/>
        </Input>

        <Output Name="Done" Description="Signaled after waiting for the specified amount of times."/>

        <PropertyInterface Property="m_timeUnitsInterface" Name="Units" Type="Input" Description="Units to represent the time in."/>
    </Class>
</ScriptCanvas>
```

The `TimeDelayNodeable` class implements a base class, called `BaseTimer`. In the following base class XML, you can see that the base class defines the shared properties, "Units" and "TickOrder":
File: [BaseTimer.ScriptCanvasNodeable.xml](https://github.com/o3de/o3de/blob/development/Gems/ScriptCanvas/Code/Include/ScriptCanvas/Internal/Nodeables/BaseTimer.ScriptCanvasNodeable.xml)
```xml
<?xml version="1.0" encoding="utf-8"?>

<ScriptCanvas Include="Include/ScriptCanvas/Internal/Nodeables/BaseTimer.h" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <Class Name="BaseTimer"
        QualifiedName="ScriptCanvas::Nodeables::Time::BaseTimer"
        PreferredClassName="BaseTimer"
        Uuid="{64814C82-DAE5-9B04-B375-5E47D51ECD26}"
        BaseClass="True"    # Declare this nodeable as a base class, so it won't be reflected as a node
        Category="Timing"
        Description="Provides a basic interaciton layer for all time based nodes for users(handles swapping between ticks and seconds).">

        <Property Name="m_timeUnits" Type="int" DefaultValue="0" Serialize="true">
            <PropertyData Name="Units"
                Description="Units to represent the time in."
                Serialize="true"
                UIHandler="AZ::Edit::UIHandlers::ComboBox">
                <EditAttribute Key="AZ::Edit::Attributes::GenericValueList" Value="&amp;BaseTimer::GetTimeUnitList"/>
                <EditAttribute Key="AZ::Edit::Attributes::PostChangeNotify" Value="&amp;BaseTimer::OnTimeUnitsChanged"/>
            </PropertyData>
        </Property>

        <Property Name="m_tickOrder" Type="int" DefaultValue="static_cast&lt;int&gt;(AZ::TICK_DEFAULT)" Serialize="true">
            <PropertyData Name="TickOrder" Description="When the tick for this time update should be handled."/>
        </Property>
    </Class>
</ScriptCanvas>
```

{{< note >}}
For further node name, tooltip, and category customization, please refer to [Text Replacement](/docs/user-guide/scripting/script-canvas/editor-reference/text-replacement/).
{{< /note >}}
