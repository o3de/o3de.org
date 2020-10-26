# AZ Code Generator Integration with Waf<a name="az-code-gen-waf-integration"></a>

****  
AZ Code Generator is in preview release and is subject to change\.

AZ Code Generator is fully accessible for any Waf target as the feature `az_code_gen`\. The `dev\Tools\Build\waf-<version_number>\lmbrwaflib\az_code_generator.py` file contains the core of the Waf integration code\. It includes the `az_code_gen` feature that can be used by any `wscript` file\.

The minimum required information is a list of the files to pass into the code generator and at least one template driver\. This list feeds the code generator one file at a time and invokes the templates specified by the driver\. The files output from the driver are added as dependencies of the build task\. Output files also have the option to be reinjected back into the C\+\+ build for compilation\. Output file paths are automatically added as include paths both for the current target build and as `export_header` entries\.

**Topics**
+ [Basic Integration](#az-code-gen-waf-integration-basic)
+ [Advanced Integration](#az-code-gen-waf-integration-advanced)
+ [Input Files](#az-code-gen-waf-integration-input-files)
+ [Template Drivers](#az-code-gen-waf-integration-template-drivers)
+ [Command Line Parameters](#az-code-gen-waf-integration-command-line-parameters)
+ [Waf Specific Options](#az-code-gen-waf-integration-waf-options)

## Basic Integration<a name="az-code-gen-waf-integration-basic"></a>

In the `wscript` file for the target requiring generated code, add the `az_code_gen` feature as follows\.

`features = ['az_code_gen'],`

Next, specify the files to pass as input to the code generator, as in the following example\.

```
az_code_gen = [
    {
        'files' : ['MySourceFile.h'],
        'scripts' : ['MyTemplateDriver.py']
    }
],
```

The paths given are relative to the target path in both cases\.

Whenever the specified target is compiled, a code generation task passes in the `MySourceFile.h` file to the code generator\. It also invokes the `MyTemplateDriver.py` file to control the output\. For information on how to write a template driver, see [Template Drivers](az-code-gen-template-drivers.md)\.

## Advanced Integration<a name="az-code-gen-waf-integration-advanced"></a>

The AZ Code Generator Waf integration uses passes to define the code generator tasks that must be run during build time\. Each pass determines the set of files, drivers, and environment settings with which to run the code generator\. Currently, all passes are run in parallel without any dependency checking between passes\.

The following example shows the configuration of multiple passes\.

```
az_code_gen = [
    {
        'files' : ['MyCode/MySourceFile.h'],
        'scripts' : ['MyCode/MyTemplateDriver.py']
    },
    {
        'files' : ['MyOtherCode/MyOtherSourceFile.h'],
        'scripts' : ['MyOtherCode/MyOtherTemplateDriver.py']
    }
],
```

This example generates the following two code generation tasks\.

1. Pass in the `MyCode/MySourceFile.h` file to the code generator and invoke the `MyCode/MyTemplateDriver.py` file to control the output\.

1. Pass in `MyOtherCode/MyOtherSourceFile.h` to the code generator and invoke `MyOtherCode/MyOtherTemplateDriver.py` to control the output\.

## Input Files<a name="az-code-gen-waf-integration-input-files"></a>

Each pass provides a list of files that will be used as input to the code generator\. This list can also contain string paths, nodes, and lists\. Top\-level string paths and nodes are passed individually to the code generator\. Note the following:
+ If you provide a list, all files or nodes in that list are used by the code generator at the same time\. This allows for maximum flexibility, but typical usage is one input per task\.
+ The overhead of the Waf task and AZ Code Generator bootstrapping can be significant\. To improve performance, you can pass in multiple input files in one list\.
+ The code generator invokes the same Clang and template driver pipeline for each input file\.

The following example shows several input file specifications\.

```
# Finds this file relative to the build context source node
'files' : [bld.srcnode.find_or_declare('Code/Framework/AzCore/Tests/CodeGen.h')],

'files' : [
# Pass both MyClass.h and MyClass.cpp at the same time to code generator to get more 
# information about MyClass than just the header. Note the nested lists.
    ['MyClass.h', 'MyClass.cpp'] 
]
 
'files' : [
    # Any and all variations are allowed, but because lists provide only one layer of grouping,
    # lists are allowed only at the top level.
    'MySourceFile.h',
    'MyOtherSourceFile.cpp',
    bld.srcnode.find_or_declare('Code/Framework/AzCore/Tests/CodeGen.h'),
    ['MyClass.h', 'MyClass.cpp']
]
```

## Template Drivers<a name="az-code-gen-waf-integration-template-drivers"></a>

To specify template drivers to use for each code generation pass, provide a list of string paths, relative to the target path, as in the following example\.

```
'scripts' : [
    '../../../Framework/AzFramework/CodeGen/AzClassCpp.py', 
    '../../../Framework/AzFramework/CodeGen/AzEBusInline.py', 
    '../../../Framework/AzFramework/CodeGen/AzReflectionCpp.py', 
    '../../../Framework/AzFramework/CodeGen/AzClassInline.py'
],
```

## Command Line Parameters<a name="az-code-gen-waf-integration-command-line-parameters"></a>

All command line parameters for the code generation utility can be specified in each code generation pass\. To do this, provide a list of arguments, as in the following example\.

```
'arguments' : [
    '-OnlyRunDiagnosticsOnMainFile=true',
    '-SuppressDiagnostics=false',
    '-SuppressErrorsAsWarnings=false',
    '-output-redirection=file',
],
```

For a full list of parameters, see [AZ Code Generator Parameters](az-code-gen-parameters.md)\.

## Waf Specific Options<a name="az-code-gen-waf-integration-waf-options"></a>

The Waf integration provides additional options that can be specified in a list for each code generation pass, as in the following example\.

```
'options' : ['PrintOutputRedirectionFile'],
```

`PrintOutputRedirectionFile` – This option, when used in combination with the `-output-redirection=file` parameter, directs Waf to provide AZ Code Generator a path to save extra output during code generation\. The path to this file is listed for each task during the build if errors occur\.

`Profile` – This option enables profiler timings of clang parsing and script execution within the AZ Code Generator tool\.