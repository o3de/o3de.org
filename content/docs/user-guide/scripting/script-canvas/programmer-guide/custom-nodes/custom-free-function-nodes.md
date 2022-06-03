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

### Step 5: Reflect the new node {#reflect-the-new-node}
{{< note >}}
This step is only required once for the first time custom free function node creation.
{{< /note >}}

The final step is to register and reflect the new node.

To do this, you need to modify Gem [System Component](/docs/user-guide/programming/components/system-components/).
In our example, it is named `MyGemSystemComponent.cpp` by default.

1. Include auto-generated registry header file, and invoke `REGISTER_SCRIPTCANVAS_AUTOGEN_FUNCTION` with sanitized Gem target name. 
    {{< note >}}
    Auto-generated registry header file should be the same name declared under `AUTOGEN_RULES` in your Gem's `Code/CMakeLists.txt`. In our example, it is `AutoGenFunctionRegistry.generated.h`.
    {{< /note >}}
    {{< note >}}
    Sanitized Gem target name should contain letters and numbers only. In our example, it is `MyGemStatic` which refers to `MyGem.Static` target.
    {{< /note >}}
   
    For example, in `MyGemSystemComponent.cpp`
  
    ```cpp
    #include <AutoGenFunctionRegistry.generated.h>
    
    REGISTER_SCRIPTCANVAS_AUTOGEN_FUNCTION(MyGemStatic)
    ...
    ```

1. Reflect auto-generated registry through Gem system component Reflect function.

    For example, in `MyGemSystemComponent.cpp`

    ```cpp
    void MyGemSystemComponent::Reflect(AZ::ReflectContext* context)
    {
        ScriptCanvas::AutoGenRegistry::Reflect(context);
        ...
    }
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
