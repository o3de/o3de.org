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

We'll use the following XML, copied from the O3DE source for the **Timer** node<!-- , as an example to explain the important sections of this file -->.

File: `Gems/ScriptCanvas/Code/Include/ScriptCanvas/Libraries/Time/TimerNodeable.ScriptCanvasNodeable.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>

<ScriptCanvas Include="Include/ScriptCanvas/Libraries/Time/TimerNodeable.h" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <Class Name="TimerNodeable"
           QualifiedName="Nodeables::Time::TimerNodeable"
           PreferredClassName="Timer"
           Base="ScriptCanvas::Nodeable"
           Icon="Icons/ScriptCanvas/Placeholder.png"
           Category="Timing"
           GeneratePropertyFriend="True"
           Namespace="ScriptCanvas"
           Description="While active, will signal the output at the given interval.">

      <Input Name="Start" Description="Starts the timer"/>
      <Input Name="Stop" Description="Stops the timer"/>

      <Output Name="On Tick" Description="Signaled at each tick while the timer is in operation.">
        <Parameter Name="Milliseconds" Type="Data::NumberType" Description="The amount of time that has elapsed since the timer started in milliseconds."/>
        <Parameter Name="Seconds" Type="Data::NumberType" Description="The amount of time that has elapsed since the timer started in seconds."/>
      </Output>

    </Class>
</ScriptCanvas>
```

The `TimerNodeable` class itself implements a base class, called `BaseTimer`. In the following XML, you can see the additional properties that describe member data for the class.

File: `Gems/ScriptCanvas/Code/Include/ScriptCanvas/Internal/Nodeables/BaseTimer.ScriptCanvasNodeable.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>

<ScriptCanvas Include="Include/ScriptCanvas/Internal/Nodeables/BaseTimer.h" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <Class Name="BaseTimer"
         QualifiedName="ScriptCanvas::Nodeables::Time::BaseTimer"
         PreferredClassName="BaseTimer"
           Uuid="{64814C82-DAE5-9B04-B375-5E47D51ECD26}"
           Base="ScriptCanvas::Nodeable"
           Icon="Icons/ScriptCanvas/Placeholder.png"
           Category="Utilities"
           Version="0"
           EntryPoint="true"
           GeneratePropertyFriend="False"
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
        <PropertyData Name="TickOrder"
                      Description="When the tick for this time update should be handled."
                      />
      </Property>

    </Class>
</ScriptCanvas>
```

## Step 3: Create the node class files {#create-the-node-class-files}

The next step is to implement the C++ functions that will be invoked by the Script Canvas node. These source files reference the auto-generated source for your node, and use the `ScriptCanvas::Nodeable` class as a base class.

There are three critical parts that every Script Canvas nodeable header file needs:

1. It must derive from `ScriptCanvas::Nodeable`.
1. It must contain the node definition macro `SCRIPTCANVAS_NODE`.
1. It must include the generated header.

The following code fragment from the `BaseTimer` header for the Timer node demonstrates these requirements:

File: `Gems/ScriptCanvas/Code/Include/ScriptCanvas/Internal/Nodeables/BaseTimer.h`

```cpp
#include <AzCore/Component/TickBus.h>

#include <Include/ScriptCanvas/Internal/Nodeables/BaseTimer.generated.h> // (3)

#include <ScriptCanvas/CodeGen/NodeableCodegen.h>
#include <ScriptCanvas/Core/Node.h>
#include <ScriptCanvas/Core/Nodeable.h>

namespace ScriptCanvas
{
    namespace Nodeables
    {
        namespace Time
        {
            class BaseTimer
                : public ScriptCanvas::Nodeable         // (1)
                , public NodePropertyInterfaceListener
                , public AZ::TickBus::Handler
                , public AZ::SystemTickBus::Handler
            {
                SCRIPTCANVAS_NODE(BaseTimer)            // (2)

                [...]
            }
        }
    }
}
```

## Step 4: Add source files to CMake {#add-source-files-to-cmake}

Add the XML and class source files to one of Gem's .cmake files.

For example, in `TimerNodeable` we must add the following lines:

```cmake
set(FILES
    ...
    Include/ScriptCanvas/Libraries/Time/TimerNodeable.h
    Include/ScriptCanvas/Libraries/Time/TimerNodeable.cpp
    Include/ScriptCanvas/Libraries/Time/TimerNodeable.ScriptCanvasNodeable.xml
    ...
)
```

## Step 5: Reflect the new node {#reflect-the-new-node}

The final step is to reflect the new node. To do this, add your custom node to a Script Canvas node library. You can use one of the existing node libraries, or create your own.

For an example on how to create your own library, use the **StartingPointInput** Gem from the O3DE source as a reference:

`Gems/StartingPointInput/Code/Source/InputLibrary.h`
`Gems/StartingPointInput/Code/Source/InputLibrary.cpp`

Libraries help with node organization, but their primary function is to ensure all nodes are pulled in and reflected at the appropriate time.

In the **Timer** nodeable example, the node is added to the Script Canvas Gem's **Time** library in: `Gems/ScriptCanvas/Code/Include/ScriptCanvas/Libraries/Time/Time.cpp`.

In this library, there are two places where we need to reference the nodeable:

1. In `InitNodeRegistry`, we call the templated `AddNodeToRegistry` function using the node class.

    ```cpp
    void Time::InitNodeRegistry(NodeRegistry& nodeRegistry)
    {
        AddNodeToRegistry<Time, ScriptCanvas::Nodes::TimerNodeableNode>(nodeRegistry);
    }
    ```

1. In `GetComponentDescriptors`, we add a function pointer to the `AZStd::vector` return value that points to the node's `CreateDescriptor` function.

    ```cpp
    AZStd::vector<AZ::ComponentDescriptor*> Time::GetComponentDescriptors()
    {
        return AZStd::vector<AZ::ComponentDescriptor*>({
            ...
            ScriptCanvas::Nodes::TimerNodeableNode::CreateDescriptor(),
        });
    }
    ```
