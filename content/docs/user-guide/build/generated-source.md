---
linktitle: Build Generated Source Files
title: Build Generated Source Files with AzAutoGen
description: Learn how to integrate AzAutoGen into Open 3D Engine (O3DE), so it can generate source files when building a target using CMake.
weight: 150
---

For complicated systems that use a lot of boilerplate code, it's useful to perform some kind of light automation to generate source files where possible. To generate files during builds, **Open 3D Engine (O3DE)** uses the **AzAutoGen** tool through a CMake command. O3DE stores the output source code in your CMake build directory and picks up the code to build it in your target.

To use AzAutoGen, you must provide Jinja templates and XML or JSON data files that AzAutoGen can generate output files from. The contents of these files depend on your intended purpose for using AzAutoGen. For a complete description of how AzAutoGen works and how to write templates and data inputs for generation, refer to [Automate Source Generation from Templates with AzAutoGen](/docs/user-guide/programming/autogen/). 


## Integrating with an O3DE target build

AzAutoGen is invoked when CMake builds an O3DE target. To invoke AzAutoGen and generate the output source files for your project or Gem, complete the following steps:

1. Define the autogen rules by passing in a set of `AUTOGEN_RULES` to the `ly_add_target(...)` command in your project's `CMakeLists.txt` file. Each rule maps a set of data input files to a single template and specifies the output filenames for the generated content.

    For specifications on defining autogen rules, refer to the [Autogen rules](#autogen-rules) section on this page. 

2. Add your data input files (`.xml` and `.json`) and templates (`.jinja`) to your project's set of all files, so CMake can locate them when building. 
To do this:
    - In your project's `*_files.cmake` file, pass the filenames into the `set(FILE...)` command. 
    - In your project's `CMakeLists.txt` file, include the `*_files.cmake` file to the `FILE_CMAKE` parameter.

When building, CMake detects the list of autogen rules, deduces the set of generated files, and sets up the appropriate build-time hooks to run AzAutoGen for your project. Then, CMake places the output directory at `${CMAKE_CURRENT_BINARY_DIR}/Azcg/Generated`.

### Example

The following example shows snippets of how the AzNetworking Framework generates the source code for various types of packets that the system requires.

Autogen rules are defined in [`Code/Framework/AzNetworking/CMakeLists.txt`](https://github.com/o3de/o3de/blob/dd0978c59f1d01b39e006e6c3ba3baf6060136cf/Code/Framework/AzNetworking/CMakeLists.txt#L33-L36). It also includes the `aznetworking_files.cmake` file using the `FILES_CMAKE` parameter.
```cmake
ly_add_target(
    NAME AzNetworking STATIC
    NAMESPACE AZ
    FILES_CMAKE
        AzNetworking/aznetworking_files.cmake
    # ...
    AUTOGEN_RULES
        *.AutoPackets.xml,AutoPackets_Header.jinja,$path/$fileprefix.AutoPackets.h
        *.AutoPackets.xml,AutoPackets_Inline.jinja,$path/$fileprefix.AutoPackets.inl
        *.AutoPackets.xml,AutoPackets_Source.jinja,$path/$fileprefix.AutoPackets.cpp
)
```

Data input files and templates are included in [Code\Framework\AzNetworking\AzNetworking\aznetworking_files.cmake](https://github.com/o3de/o3de/blob/dd0978c59f1d01b39e006e6c3ba3baf6060136cf/Code/Framework/AzNetworking/AzNetworking/aznetworking_files.cmake#L12-L17). 
```cmake
set(FILES
    # ...
    AutoGen/AutoPacketDispatcher_Header.jinja
    AutoGen/AutoPacketDispatcher_Inline.jinja
    AutoGen/AutoPackets_Header.jinja
    AutoGen/AutoPackets_Inline.jinja
    AutoGen/AutoPackets_Source.jinja
    AutoGen/CorePackets.AutoPackets.xml
    # ...
)
```


## Autogen rules

An *autogen rule* instructs CMake to use AzAutoGen to generate files. 
You define autogen rules by passing in a set of `AUTOGEN_RULES` to the `ly_add_target(...)` command that's inside your project's `CMakeLists.txt` file.

Each element of the set passed to `AUTOGEN_RULES` should follow the `<input>,<template>,<output>` format. Here, `<input>` is the name of the XML or JSON data input file, `<template>` is the name of the Jinja template file, and `<output>` is the name that you want the generated file to have. 

{{< important >}}
Data input files and Jinja template files must be listed in your project's set of files, which is located in a `*_files.cmake` file, inside a `set(FILES...)` command. For organization, we recommend creating a specific `*_autogen_files.cmake` file and placing Jinja template files there. 
{{< /important >}}

### Data input files

A data input filename can refer to one file explicitly or many files that match a pattern.  If you list a filename explicitly, then it must have a proper path that's absolute or relative to the `CMakeLists.txt` file. If a filename contains a pattern, then the expansion finds all data input files that match the filename.

<!-- TODO: Verify - can explicit filenames be absolute or relative to the CMakeLists.txt file?-->

The input filename supports the following matching operators:
  * `*` - Sequence of characters any length.
  * `?` - Single-character sequence.
  * `[<sequence>]` - Matches any characters in `<sequence>`.
  * `[!<sequence>]` - Matches any characters _not_ in `<sequence>`.

For information about authoring data input files, refer to [Authoring Jinja templates and data inputs](/docs/user-guide/programming/autogen/).

### Jinja Templates

A template filename must be an explicit path to a single `.jinja` file. The path can be absolute or relative to the `CMakeLists.txt` file. 

For information about authoring Jinja templates, refer to [Authoring Jinja templates and data inputs](/docs/user-guide/programming/autogen/).


### Output files

When AzAutoGen feeds data input files into the Jinja2 templates, it generates output files. You must specify the names of the output files you want to generate in the autogen rules. You can use the following *special values* when defining the output filenames:

* `$path`: The path to the final output destination, `${CMAKE_CURRENT_BINARY_DIR}/Azcg/Generated`.
* `$fileprefix`: The name of the current input file up to the first `.` token. This is equivalent to running the UNIX shell command `basename ${file%%.*}`.
* `$file`: The full name of the current input file. This is equivalent to running the UNIX shell command `basename $file`.

{{< important >}}
When generating multiple output files, the output name should _always_ begin with `$path`. Otherwise, AzAutoGen may place output files in an incorrect directory.
{{< /important >}}

### Example

The following example shows how autogen rules are formatted.

```
AUTOGEN_RULES
    # Test wildcarded expansion for xml
    *.AutoEnum.xml,AutoEnum_Header.jinja,$path/$fileprefix.AutoEnum.h
    *.AutoEnum.xml,AutoEnum_Source.jinja,$path/$fileprefix.AutoEnum.cpp
    
    # Test wildcarded expansion for json
    *.AutoStruct.json,AutoStruct_Header.jinja,$path/$fileprefix.AutoStruct.h
    
    # Test explicit data input file
    AzCore/AutoGen/WeaponTypes.AutoStruct.json,AutoStruct_Header.jinja,$path/$fileprefix2.AutoStruct.h
    
    # Test globbing data input files into a single output file
    *.AutoEnum.xml,AutoEnumRegistry_Header.jinja,$path/AutoEnumRegistry.h
```

## Integrating with any target

Most of the time, you want to run AzAutoGen by passing autogen rules into `ly_add_target()`, as outlined in the [Integrating with an O3DE target build](#integrating-with-an-o3de-target-build) section earlier. 
For situations where a target is already defined and AzAutoGen needs to be invoked, use the `ly_add_autogen()` CMake command. This command associates a set of autogen rules, including build outputs, with an existing target. 
The `ly_add_autogen()` function is defined in [LyAutoGen.cmake](https://github.com/o3de/o3de/blob/development/cmake/LyAutoGen.cmake#L9-L15). It takes the following parameters:
```cmake
ly_add_autogen(
    NAME Name of the target to add the autogen step to
    OUTPUT_NAME (optional) Overrides the name of the output target. If not specified, the name will be used.
    INCLUDE_DIRECTORIES List of directories to use as include paths
    AUTOGEN_RULES Set of autogen rules that describe output generation and are passed to the AzAutoGen expansion system
    ALLFILES List of data input files contained by the target and used to generate source code
)
```

## Related topics

| Title | Description |
|-|-|
| [Automate Source Generation from Templates with AzAutoGen](/docs/user-guide/programming/autogen/) | How to generate new types of network packets for O3DE. |
| [Networking Auto-packets](/docs/user-guide/networking/aznetworking/autopackets/) | How to create new packet types for `AzNetworking` using AzAutoGen. |
| [Creating Custom Nodes in Script Canvas](/docs/user-guide/scripting/script-canvas/programmer-guide/custom-nodes/) | How to create custom nodes in Script Canvas using XML definitions and turn the nodes into code with AzAutoGen. |toGen. |
