---
linktitle: Creating Custom Nodes
title: Creating Custom Nodes in Script Canvas
description: Learn how to create custom Script Canvas nodes in Open 3D Engine (O3DE).
weight: 200
---

Creating custom nodes in Script Canvas offers you maximum control and flexibility with the functionality of the node. You might wish to create a custom node in the following scenarios:

* When your node has state, time, or latent results.
* When creating complex nodes.
* When you need control over the node's topology.

To make the process of creating a custom node easier, Script Canvas uses a templated, automatic code generation system called [AzAutoGen](/docs/user-guide/programming/autogen/) to significantly reduce the amount of "boilerplate code" you need to write just to get a node up and running, allowing the developer to immediately focus on the functionality of the new node, since the code required for the node to show up in the **Node Palette** is already there.

The following four steps are required to create a custom node:

1. Create a code generation XML file.
1. Create the C++ class files for your node.
1. Add these files to CMake.
1. Reflect the new node by adding it to a library.

You'll see the term _nodeable_ used throughout the O3DE source. A nodeable can refer to both the node that appears in the Node Palette as a result of the AzAutoGen processing, and the mechanism by which a compiled Script Canvas graph can invoke C++ functions.

## Step 1: Create an XML file for code generation {#create-an-xml-file}

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

## Step 2: Create the node class files {#create-the-node-class-files}

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

## Step 3: Add source files to CMake {#add-source-files-to-cmake}

Add the XML and class source files to your project's CMake.

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

## Step 4: Reflect the new node {#reflect-the-new-node}

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

## Adding support for custom nodes to a Gem

In your Gem's `CMakeLists.txt`, add a section for `AUTOGEN_RULES`.

Example:

```
AUTOGEN_RULES
ScriptCanvasNodeable.xml,ScriptCanvasNodeable_Header.jinja,$path/$fileprefix.generated.h
ScriptCanvasNodeable.xml,ScriptCanvasNodeable_Source.jinja,$path/$fileprefix.generated.cpp
```

The precise place for this section will vary depending on how your Gem is configured. However, we recommend that your Gem define a `STATIC` library to make the code available to both editor and runtime projects.

As an example, here is the definition of a complete Gem's `CMakeLists.txt` that supports Script Canvas custom nodes:

```cmake
ly_add_target(
    NAME MyGem.Static STATIC
    NAMESPACE Gem
    FILES_CMAKE
        mygem_common_files.cmake
        mygem_autogen_files.cmake
    INCLUDE_DIRECTORIES
        PRIVATE
            Source
            .
        PUBLIC
            Include
    BUILD_DEPENDENCIES
        PUBLIC
            AZ::AzCore
            AZ::AzFramework
            Gem::ScriptCanvas
    AUTOGEN_RULES
        *.ScriptCanvasNodeable.xml,ScriptCanvasNodeable_Header.jinja,$path/$fileprefix.generated.h
        *.ScriptCanvasNodeable.xml,ScriptCanvasNodeable_Source.jinja,$path/$fileprefix.generated.cpp
)

ly_add_target(
    NAME MyGem ${PAL_TRAIT_MONOLITHIC_DRIVEN_MODULE_TYPE}
    NAMESPACE Gem
    FILES_CMAKE
        mygem_common_files.cmake
    INCLUDE_DIRECTORIES
        PRIVATE
            Source
            .
        PUBLIC
            Include
    BUILD_DEPENDENCIES
        PRIVATE
            AZ::AzFramework
            Gem::MyGem.Static
)

if(PAL_TRAIT_BUILD_HOST_TOOLS)
    ly_add_target(
        NAME MyGem.Editor GEM_MODULE

        NAMESPACE Gem
        FILES_CMAKE
            mygem_common_files.cmake
            mygem_editor_files.cmake            
        INCLUDE_DIRECTORIES
            PRIVATE
                Source
                .
            PUBLIC
                Include
        BUILD_DEPENDENCIES
            PRIVATE
                AZ::AzFramework
                Gem::MyGem.Static
    )
endif()
```

`MyGem.Static` defines two file lists. The first file list, `mygem_common_files.cmake`, contains all the files that are common between the editor and runtime Gem projects. The other file list, `mygem_autogen_files.cmake`, informs the static library which AzAutoGen code generation templates to use, which will generally be the following:

```cmake
set(FILES
    ${LY_ROOT_FOLDER}/Gems/ScriptCanvas/Code/Include/ScriptCanvas/AutoGen/ScriptCanvasNodeable_Header.jinja
    ${LY_ROOT_FOLDER}/Gems/ScriptCanvas/Code/Include/ScriptCanvas/AutoGen/ScriptCanvasNodeable_Source.jinja
)
```

The list of autogen templates might be different if you create custom templates for your own purposes. For example, if you were to extend Script Canvas to do something beyond what it provides "out of the box", you could have your own set of templates to generate code in the syntax that you define. For more information, refer to the documentation on [AzAutoGen](/docs/user-guide/programming/autogen/).

It is important to add all of your node files to the `mygem_common_files.cmake` list, including the node's XML definition file. An example of this can be found in the preceding section, [Add source files to CMake](#add-source-files-to-cmake).

Example:

```cmake
set(FILES
    ...
    Source/MyNode.h
    Source/MyNode.cpp
    Source/MyNode.ScriptCanvasNodeable.xml
    ...
)
```
