---
linktitle: Custom Free Function Nodes
title: Creating Custom Free Function Nodes in Script Canvas
description: Learn how to create custom Script Canvas Free Function Nodes in Open 3D Engine (O3DE).
weight: 200
---

## Instructions
This topic guides you how to create custom Script Canvas Free Function Nodes step by step.

{{< note >}}
The [ScriptCanvasPhysics](https://github.com/o3de/o3de/tree/development/Gems/ScriptCanvasPhysics) Gem demonstrates the finished Gem that creates custom free function nodes in ScriptCanvas.
You can reference the ScriptCanvasPhysics Gem as you follow along this tutorial.
{{< /note >}}

### Step 1: Adding support for custom free function nodes to a Gem
{{< note >}}
This step is only required once for the first time custom free function node creation.
{{< /note >}}

In your Gem's `Code/CMakeLists.txt`, add a section for `AUTOGEN_RULES` and declare `Gem::ScriptCanvas.Extensions` as a build dependency.

The precise place for this section will vary depending on how your Gem is configured. 
However, we recommend that your Gem define a `STATIC` library to make the code available to both runtime and editor projects.

As an example, here is partial definition of Gem's `Code/CMakeLists.txt` that supports Script Canvas custom nodes with following required changes:
1. `Gem::ScriptCanvas.Extensions` must be declared as `BUILD_DEPENDENCIES` of `STATIC` library
1. Add `AUTOGEN_RULES` section for custom free function under `STATIC` library
   ```cmake
   AUTOGEN_RULES
       *.ScriptCanvasFunction.xml,ScriptCanvasFunctionRegistry_Header.jinja,AutoGenFunctionRegistry.generated.h
       *.ScriptCanvasFunction.xml,ScriptCanvasFunctionRegistry_Source.jinja,AutoGenFunctionRegistry.generated.cpp
   ```
1. `STATIC` library must be declared directly as `BUILD_DEPENDENCIES` of Gem runtime module (and it should be included as part of editor module build dependencies hierarchy)
1. `MyGem.Static` includes two .cmake file lists. 
   * We include the common files and the platform specific files which are set in `mygem_files.cmake`.
   * We include AzAutoGen ScriptCanvas free function required templates which are set in `mygem_autogen_files.cmake` (We recommend to keep this file separately for clear scope)

   Example contents of `mygem_autogen_files.cmake`:
   ```cmake
   set(FILES
       ${LY_ROOT_FOLDER}/Gems/ScriptCanvas/Code/Include/ScriptCanvas/AutoGen/ScriptCanvas_Macros.jinja
       ${LY_ROOT_FOLDER}/Gems/ScriptCanvas/Code/Include/ScriptCanvas/AutoGen/ScriptCanvasFunctionRegistry_Header.jinja
       ${LY_ROOT_FOLDER}/Gems/ScriptCanvas/Code/Include/ScriptCanvas/AutoGen/ScriptCanvasFunctionRegistry_Source.jinja
   )
   ```

   The list of autogen templates might be different if you create custom templates for your own purposes. 
   For example, if you were to extend Script Canvas to do something beyond what it provides "out of the box", you could have your own set of templates to generate code in the syntax that you define.
   For more information, refer to the documentation on [AzAutoGen](/docs/user-guide/programming/autogen/).

```cmake
...

ly_add_target(
    NAME MyGem.Static STATIC
    NAMESPACE Gem
    FILES_CMAKE
        mygem_files.cmake
        mygem_autogen_files.cmake                                                                             # 4
    INCLUDE_DIRECTORIES
        PRIVATE
            Source
        PUBLIC
            Include
    BUILD_DEPENDENCIES
        PUBLIC
            AZ::AzCore
            AZ::AzFramework
            Gem::ScriptCanvas.Extensions                                                                      # 1
    AUTOGEN_RULES                                                                                             # 2
        *.ScriptCanvasFunction.xml,ScriptCanvasFunctionRegistry_Header.jinja,AutoGenFunctionRegistry.generated.h
        *.ScriptCanvasFunction.xml,ScriptCanvasFunctionRegistry_Source.jinja,AutoGenFunctionRegistry.generated.cpp
)

ly_add_target(
    NAME MyGem ${PAL_TRAIT_MONOLITHIC_DRIVEN_MODULE_TYPE}
    NAMESPACE Gem
    FILES_CMAKE
        mygem_shared_files.cmake
    INCLUDE_DIRECTORIES
        PRIVATE
            Source
        PUBLIC
            Include
    BUILD_DEPENDENCIES
        PRIVATE
            AZ::AzCore
            Gem::MyGem.Static                                                                                 # 3
)

...
```


### Step 2: Create an XML file for code generation {#create-an-xml-file}
Prepare for code generation by creating an XML file that contains information about:
1. **(Required)** The header file of functions.
1. **(Recommended)** The namespace of functions, which is used to distinguish duplicate function name.
1. **(Optional)** The category of functions, if not presented, will use `Global Methods` instead
1. **(Required)** The function name of each function.

AzAutoGen uses this file to generate C++ code for function registration and reflection.

For example, HelloWorldFunctions.ScriptCanvasFunction.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<ScriptCanvas>
    <Library
        Include="HelloWorldFunctions.h"                   # 1
        Namespace="MyGem::HelloWorldFunctions"            # 2
        Category="Hello World">                           # 3

        <Function Name="HelloWorld"/>                     # 4
      
        <Function Name="HelloWorldTo"/>                   # 4
    </Library>
</ScriptCanvas>
```

### Step 3: Create the function source files {#create-the-function-source-files}
The next step is to implement the C++ functions that will be invoked by the Script Canvas node.

There are two requirements need to keep in mind:
1. The namespace of functions should match with `Namespace` provided in XML file.
2. The function name should match with specific one provided in XML file. (function overload is not supported)

For example, HelloWorldFunctions.h
```cpp
#pragma once
#include <AzCore/std/string/string.h>

namespace MyGem
{
    namespace HelloWorldFunctions
    {
        AZStd::string HelloWorld();
        
        AZStd::string HelloWorldTo(AZStd::string name);
    }
}
```

For example, HelloWorldFunctions.cpp
```cpp
#include "HelloWorldFunctions.h"

namespace MyGem
{
    namespace HelloWorldFunctions
    {
        AZStd::string HelloWorld()
        {
            return "Hello World!";
        }
        
        AZStd::string HelloWorldTo(AZStd::string name)
        {
            return "Hello World to " + name;
        }
    }
}
```

### Step 4: Add source files to CMake {#add-source-files-to-cmake}
Add the XML and function source files to one of Gem's .cmake files, for example `mygem_files.cmake`.

```cmake
set(FILES
    ...
    Include/HelloWorldFunctions.h
    Include/HelloWorldFunctions.cpp
    Include/HelloWorldFunctions.ScriptCanvasFunction.xml
    ...
)
```

### Step 5: Register the new node {#register-the-new-node}
{{< note >}}
This step is only required once for the first time custom free function node creation.
{{< /note >}}

The final step is to register the new node. To do this, you need to modify your Gem's [Gem module](/docs/user-guide/programming/gems/overview/) or [system component](/docs/user-guide/programming/components/system-components/).

In your Gem's module or system component, include the auto-generated registry header file, and invoke `REGISTER_SCRIPTCANVAS_AUTOGEN_FUNCTION` with the sanitized Gem target name.
{{< note >}}
Use the same auto-generated registry header file that you declared in Step 1 under `AUTOGEN_RULES` in your Gem's `Code/CMakeLists.txt`. In our example, it is `AutoGenFunctionRegistry.generated.h`.
{{< /note >}}
{{< note >}}
The sanitized Gem target name should contain letters and numbers only. In our example, it is `MyGemStatic` which refers to the `MyGem.Static` target.
{{< /note >}}
   
For example, in `MyGemSystemComponent.cpp`

```cpp
#include <AutoGenFunctionRegistry.generated.h>

REGISTER_SCRIPTCANVAS_AUTOGEN_FUNCTION(MyGemStatic)
...
```

## Advanced ScriptCanvasFunction.xml Usage
This topic explores additional features we support in function XML file.

### Basic usage
For example, we have `Sum` function, the very basic usage
```cpp
namespace MyGem
{
    namespace HelloWorldFunctions
    {
      int Sum(int a, int b);
    }
}
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScriptCanvas>
    <Library
        Include="HelloWorldFunctions.h"
        Namespace="MyGem::HelloWorldFunctions"
        Category="Hello World">

        <Function Name="Sum"/>
    </Library>
</ScriptCanvas>
```

The basic node will look like following

![Basic Sum](/images/user-guide/scripting/script-canvas/basic-sum.PNG)

### Verbose usage
For the same `Sum` function, we can provide more details in XML
```xml
<Function Name="Sum">
    <Parameter Name="InputA" DefaultValue="1" Description="The input A of sum function."/>
    <Parameter Name="InputB" DefaultValue="1" Description="The input B of sum function."/>
</Function>
```

The verbose node will look like following

![Verbose Sum](/images/user-guide/scripting/script-canvas/verbose-sum.PNG)

### Branch boolean function result
In general, node will only have single `Out` execution slot. But we can create branch on node based on function result.
For example, we have `IsPositive` function
```cpp
bool IsPositive(int input);
```

Basic usage
* **(Required)** `Branch` attribute should be indicated as `Boolean` when function result type is boolean.
* **(Optional)** `BranchWithValue` attribute should be indicated as `True` if you want to include result, default is `False`
```xml
<Function Name="IsPositive" Branch="Boolean" BranchWithValue="True"/>
```

![Basic IsPositive](/images/user-guide/scripting/script-canvas/basic-ispositive.PNG)

Verbose usage
```xml
<Function Name="IsPositive" Branch="Boolean" BranchWithValue="True">
    <Parameter Name="Input" DefaultValue="1" Description="The input of positive check function."/>
    <Out Name="Input is Positive" Description="The out slot for true branch"/>
    <Out Name="Input is not Positive" Description="The out slot for false branch"/>
</Function>
```

![Verbose IsPositive](/images/user-guide/scripting/script-canvas/verbose-ispositive.PNG)

### Branch non-boolean function result
We can also create branch even function result is not boolean, but it has to be coupled with a helper function,
which should take non-boolean result as input and return a boolean result.

For example, we can use `Sum` and `IsPositive` functions together

Basic usage
* **(Required)** `Branch` attribute should be indicated with helper function name which is `IsPositive` in our example.
* **(Optional)** `BranchWithValue` attribute should be indicated as `True` if you want to include result, default is `False`
```xml
<Function Name="IsPositive"/>

<Function Name="Sum" Branch="IsPositive" BranchWithValue="True"/>
```

![Basic Sum IsPositive](/images/user-guide/scripting/script-canvas/basic-sum-ispositive.PNG)

Verbose usage
```xml
<Function Name="Sum" Branch="IsPositive" BranchWithValue="True">
    <Parameter Name="Input A" DefaultValue="1" Description="The input A of sum function."/>
    <Parameter Name="Input B" DefaultValue="1" Description="The input B of sum function."/>
    <Out Name="Sum Is Positive" Description="The out slot for sum result is positive branch"/>
    <Out Name="Sum Is not Positive" Description="The out slot for sum result is non-Positive branch"/>
</Function>
```

![Verbose Sum IsPositive](/images/user-guide/scripting/script-canvas/verbose-sum-ispositive.PNG)

{{< note >}}
For further node name, tooltip and category customization, please refer to [Text Replacement](/docs/user-guide/scripting/script-canvas/editor-reference/text-replacement/)
{{< /note >}}

## Migration instructions for generic function nodes
This topic guides you step-by-step through migrating from generic function nodes to custom free function nodes.

### Step 1: Locate generic function node usage
Generic function nodes are deprecated. Support will be removed in a future release. To prepare, we recommend that you plan for migration as early as possible. Existing graphs will break once generic function nodes are removed.

In your Gem, locate generic function node code by searching for the following three macros:
```cpp
SCRIPT_CANVAS_GENERIC_FUNCTION_NODE(NODE_NAME, CATEGORY, UUID, DESCRIPTION, ...)
SCRIPT_CANVAS_GENERIC_FUNCTION_NODE_WITH_DEFAULTS(NODE_NAME, DEFAULT_FUNC, CATEGORY, UUID, DESCRIPTION, ...)
SCRIPT_CANVAS_GENERIC_FUNCTION_MULTI_RESULTS_NODE(NODE_NAME, CATEGORY, UUID, DESCRIPTION, ...)
```

{{< note >}}
The migration process assumes that the node signature and behavior stay the same. If replacement node signature and behavior are different, you should upgrade your graph manually.
{{< /note >}}

### Step 2: Create replacement custom free function nodes
For detailed instructions on how to create custom free function nodes, refer to the preceding topics.

As an example, here is part of the migration we have done for `Math/Matrix3x3` nodes:
1. Example of replacing `SCRIPT_CANVAS_GENERIC_FUNCTION_NODE`:
   ```cpp
   AZ_INLINE Data::Vector3Type GetRow(const Data::Matrix3x3Type& source, Data::NumberType row) { ... }
   SCRIPT_CANVAS_GENERIC_FUNCTION_NODE(GetRow, k_categoryName, "{C4E00343-3642-4B09-8CFA-2D2F1CA6D595}", "returns vector from matrix corresponding to the Row index", "Source", "Row");
   ```
   Replacement function and ScriptCanvasFunction.xml content:
   ```cpp
   Data::Vector3Type GetRow(const Data::Matrix3x3Type& source, Data::NumberType row) { ... }
   ```
   ```xml
   <Function Name="GetRow">
       <Parameter Name="Source"/>
       <Parameter Name="Row"/>
   </Function>
   ```

1. Example of replacing `SCRIPT_CANVAS_GENERIC_FUNCTION_NODE_WITH_DEFAULTS`:
   ```cpp
   AZ_INLINE Data::BooleanType IsClose(const Data::Matrix3x3Type& lhs, const Data::Matrix3x3Type& rhs, const Data::NumberType tolerance) { ... }
   SCRIPT_CANVAS_GENERIC_FUNCTION_NODE_WITH_DEFAULTS(IsClose, MathNodeUtilities::DefaultToleranceSIMD<2>, k_categoryName, "{020C2517-F02F-4D7E-9FE9-B6E91E0D6D3F}", "returns true if each element of both Matrix are equal within some tolerance", "A", "B", "Tolerance");
   ```
   Replacement function and ScriptCanvasFunction.xml content:
   ```cpp
   Data::BooleanType IsClose(const Data::Matrix3x3Type& lhs, const Data::Matrix3x3Type& rhs, const Data::NumberType tolerance) { ... }
   ```
   ```xml
   <Function Name="IsClose">
       <Parameter Name="A"/>
       <Parameter Name="B"/>
       <Parameter Name="Tolerance" DefaultValue="0.01"/>
   </Function>
   ```

1. Example of replacing `SCRIPT_CANVAS_GENERIC_FUNCTION_MULTI_RESULTS_NODE`:
   ```cpp
   AZ_INLINE std::tuple<Data::Vector3Type, Data::Vector3Type, Data::Vector3Type> GetRows(const Data::Matrix3x3Type& source) { ... }
   SCRIPT_CANVAS_GENERIC_FUNCTION_MULTI_RESULTS_NODE(GetRows, k_categoryName, "{DDF76F4C-0C79-4856-B577-7DBA092CE59B}", "returns all rows from matrix", "Source", "Row1", "Row2", "Row3");
   ```
   Replacement function and ScriptCanvasFunction.xml content:
   ```cpp
   AZStd::tuple<Data::Vector3Type, Data::Vector3Type, Data::Vector3Type> GetRows(const Data::Matrix3x3Type& source) { ... }
   ```
   ```xml
   <Function Name="GetRows">
       <Parameter Name="Source"/>
   </Function>
   ```

### Step 3: Update generic function node macros
Replace each generic function node macro with the `SCRIPT_CANVAS_GENERIC_FUNCTION_REPLACEMENT` macro, using a sanitized replacement node identifier that's derived from ScriptCanvasFunction.xml. We use `Namespace` and `Function Name` to guarantee the uniqueness.

As an example, in [Matrix3x3.ScriptCanvasFunction.xml](https://github.com/o3de/o3de/blob/development/Gems/ScriptCanvas/Code/Include/ScriptCanvas/Libraries/Math/Matrix3x3.ScriptCanvasFunction.xml)
* Namespace: `ScriptCanvas::Matrix3x3Functions`
* Function Name: `GetRow`, `GetRows`, `IsClose`
```xml
<ScriptCanvas>
    <Library
        Include="Include/ScriptCanvas/Libraries/Math/Matrix3x3.h"
        Namespace="ScriptCanvas::Matrix3x3Functions"
        Category="Math/Matrix3x3">
...
        <Function Name="GetRow">
        <Function Name="GetRows">
        <Function Name="IsClose">
...          
    <Library/>  
<ScriptCanvas/>
```
The sanitized replacement node identifiers are: `ScriptCanvas_Matrix3x3Functions_GetRow`, `ScriptCanvas_Matrix3x3Functions_GetRows` and `ScriptCanvas_Matrix3x3Functions_IsClose`
```cpp
...
SCRIPT_CANVAS_GENERIC_FUNCTION_REPLACEMENT(GetRow, k_categoryName, "{C4E00343-3642-4B09-8CFA-2D2F1CA6D595}", "ScriptCanvas_Matrix3x3Functions_GetRow");
SCRIPT_CANVAS_GENERIC_FUNCTION_REPLACEMENT(GetRows, k_categoryName, "{DDF76F4C-0C79-4856-B577-7DBA092CE59B}", "ScriptCanvas_Matrix3x3Functions_GetRows");
SCRIPT_CANVAS_GENERIC_FUNCTION_REPLACEMENT(IsClose, k_categoryName, "{020C2517-F02F-4D7E-9FE9-B6E91E0D6D3F}", "ScriptCanvas_Matrix3x3Functions_IsClose");
...
```

### Step 4: Upgrade existing graphs that are now out of date
At this point, the system has all the required information to do the replacement. To upgrade your graphs, do one of the following:
1. Batch Processing - For convenience you can use the version explorer tool found in Script Canvas Editor in the **Tools / Upgrade Graphs** menu. You can select multiple source graphs in the tool and upgrade them all to the latest version. The tool will save them in the new format, or report errors if the upgrade fails.
1. Single Processing - You can open a specific graph in Script Canvas Editor. The graph will upgrade automatically. Save the graph to keep the new format.
