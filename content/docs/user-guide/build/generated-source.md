---
title: Build generated source files for Open 3D Engine (O3DE)
description: >-
    Learn how to create template files and their inputs using the Open 3D Engine AzAutoGen generator, and then tie them to build
    tasks in CMake for inclusion in your target.
---

For complicated systems which use a lot of boilerplate code, it's useful to perform some kind of light automation to generate source inputs where possible. During builds, **Open 3D Engine (O3DE)** uses the [AzAutoGen](/docs/user-guide/programming/autogen/) tool through a CMake function in order to perform code generation. This emitted source code is stored in your CMake build directory, and picked up to be built in your target.

For a complete description of how to write AzAutoGen templates and inputs for generation, read the [AzAutoGen system documentation](/docs/user-guide/programming/autogen/syntax/). 

## Invoking AzAutoGen from CMake

The following special values can be used in an AzAutoGen invocation during build:

* `$path`  - The path to the final output destination.
* `$fileprefix` - The name of the current file up to the first `.` token. This is equivalent to running the UNIX shell command `basename ${file%%.*}`.
* `$file` - The full name of the input file. This is equivalent to running the UNIX shell command `basename $file`.

{{< important >}}
When generating multiple output files, the output name should _always_ begin with `$path`. Otherwise output files may be placed in an incorrect directory.
{{< /important >}}

### As part of an O3DE build target

To include source code generated from AzAutoGen in a target, use the `AUTOGEN_RULES` argument of `ly_add_target`. This adds a set of value files per template, and specifies the output names for any generated content. Your autogen input files should be part of the `set(FILE ...)` passed as part of the `FILES_CMAKE` parameter, and the output directory is placed at `${CMAKE_CURRENT_BINARY_DIR}/Azcg/Generated` during the build of the target.

Each element of the set passed to `AUTOGEN_RULES` should follow the `input_map,template,output_map` format described in [AzAutoGen source generator](/docs/user-guide/programming/autogen/).

As an example, here is a snippet of how the AzNetworking Framework generates the source code for various types of packets required by the system.

```cmake
ly_add_target(
    NAME AzNetworking STATIC
    NAMESPACE AZ
    # ... Intentionally omitted ...
    AUTOGEN_RULES
        *.AutoPackets.xml,AutoPackets_Header.jinja,$path/$fileprefix.AutoPackets.h
        *.AutoPackets.xml,AutoPackets_Inline.jinja,$path/$fileprefix.AutoPackets.inl
        *.AutoPackets.xml,AutoPackets_Source.jinja,$path/$fileprefix.AutoPackets.cpp
)
```

### Integrating with any target

To run AzAutoGen when building a target which isn't defined by `ly_add_target()`, any build target can have an autogen step added by calling the `ly_add_autogen()` CMake function. This function associates a target with a set of autogen rules, and gives an explicit list out the output files generated which should be included in the target build.

```cmake
ly_add_autogen(
    NAME <Target to add the autogen step to>
    INCLUDE_DIRECTORIES <List of directories to use as include paths>
    AUTOGEN_RULES <Set of autogen rules describing output generation>
    ALLFILES <Files generated which are part of the target source for compilation>
)
```

Each element of the set passed to `AUTOGEN_RULES` should follow the `input_map,template,output_map` format described in [AzAutoGen source generator](/docs/user-guide/programming/autogen/).

## Related topics

| Title | Description |
|-|-|
| [Source generation with AzAutoGen](/docs/user-guide/programming/autogen/) | How to generate new types of network packets for O3DE. |
| [Network auto-packets](/docs/user-guide/networking/autopackets/) | How to create new packet types for `AzNetworking` using AzAutoGen. |
| [Custom Script Canvas nodes](/docs/user-guide/scripting/script-canvas/programmer-guide/custom-nodes/) | Create custom nodes in Script Canvas using XML definitions and turn them into code with AzAutoGen. |
