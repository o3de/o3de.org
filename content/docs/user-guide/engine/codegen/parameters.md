---
description: Learn the parameters used by the Open 3D Engine code generation tool.
title: AZ Code Generator Parameters
weight: 100
---

{{< preview-migrated >}}

**Topics**
+ [Clang Compilation Parameters](#az-code-gen-parameters-clang-compilation)
+ [Intermediate Data](#az-code-gen-parameters-intermediate-data)
+ [Front End](#az-code-gen-parameters-front-end)
+ [AZ Code Generator Parameter List](#az-code-gen-parameters-list)

## Clang Compilation Parameters {#az-code-gen-parameters-clang-compilation}

The following `AzCodeGenerator.exe` parameters apply to Clang compilation.


****

|  Parameter  |  Description  |
| --- | --- |
|  -SuppressIncludeNotFoundError  |  Suppresses unknown \#include statements at compile time.  |
|  -OnlyRunDiagnosticsOnMainFile  |  Ignores build warnings and errors on all files, except for the main file. |
|  -SuppressDiagnostics  |  Ignores build warnings and errors on all files.  |
|  -SuppressErrorsAsWarnings  |  Downgrades any build errors to warnings. Allows Clang to succeed even if there are errors.  |

## Intermediate Data {#az-code-gen-parameters-intermediate-data}

To include information about code outside of the input file in the intermediate JSON data, use the following option.

```
-inclusion-filter=<wildcard filter for files to allow>
```

## Front End {#az-code-gen-parameters-front-end}

You can choose the front end to use by specifying either the `-Clang` (the default) or `-JSON` option.

## AZ Code Generator Parameter List {#az-code-gen-parameters-list}

The following list shows all AZ Code Generator parameters.

Usage: `AzCodeGenerator.exe [options]`


****

| Option | Category | Description |
| --- | --- | --- |
| -Clang | General | Uses the Clang compiler front end. |
| -clang-settings-file=<string> | Code parsing | The path to the file that contains Clang configuration settings. |
| -codegen-script=<string> | Python | The absolute path and file name of the code generation script to invoke. |
| -debug | General | Enables debug output. |
| -debug-buffer-size=<uint> | General | Buffers the last n characters of debug output until program termination. The default is 0, which specifies immediate print out. |
| -debug-only=<debug string> | General | Enables a specific type of debug output. |
| -define=<string> | Code parsing | Specifies a preprocessor definition. |
| -DelayedTemplateParsing | AST traversal | Consumes and stores template tokens for parsing at the end of the translation unit. |
| -EnableIncrementalProcessing | AST traversal | Enables incremental processing. |
| -force-include=<string> | Code parsing | List of headers to forcibly include in Clang parsing. |
| -help | General | Displays basic options in categorized format. |
| -help-hidden | General | Displays all available options in categorized format. |
| -help-list | General | Displays basic options in list format. |
| -help-list-hidden | General | Displays all available options in list format. |
| -include-path=<string> | Code parsing | The header includes the path. |
| -inclusion-filter=<string> | Code filtering | Specifies a wildcard filter so that files other than those specified by input-files are parsed by Clang into intermediate data. |
| -info-output-file=<filename> | General | File to which to append -stats output. |
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
| -input-file=<string> | Code parsing | (Required) The path to the input file, relative to `input-path`. |
| -input-path=<string> | Code parsing | (Required) The absolute path to the input folder. All input-file paths must be relative to this folder. |
| -intermediate-file=<string> | Code parsing | The path to a file that stores the JSON AST from Clang parsing. |
=======
| -input-file=<string> | Code parsing | (Required) The path to input file, relative to `input-path`. |
| -input-path=<string> | Code parsing | (Required) The absolute path to the input folder. All input-file paths must be relative to this folder. |
| -intermediate-file=<string> | Code parsing | Path to a file that stores the JSON AST from Clang parsing. |
>>>>>>> 2e2f9f62 (Various editorial fixes (via #364))
=======
| -input-file=<string> | Code parsing | (Required) The path to the input file, relative to `input-path`. |
| -input-path=<string> | Code parsing | (Required) The absolute path to the input folder. All input-file paths must be relative to this folder. |
| -intermediate-file=<string> | Code parsing | The path to a file that stores the JSON AST from Clang parsing. |
>>>>>>> 7506c167 (Apply suggestions from code review)
=======
| -input-file=<string> | Code parsing | (Required) The path to input file, relative to `input-path`. |
| -input-path=<string> | Code parsing | (Required) The absolute path to the input folder. All input-file paths must be relative to this folder. |
| -intermediate-file=<string> | Code parsing | Path to a file that stores the JSON AST from Clang parsing. |
>>>>>>> 2e2f9f62 (Various editorial fixes (via #364))
=======
| -input-file=<string> | Code parsing | (Required) The path to the input file, relative to `input-path`. |
| -input-path=<string> | Code parsing | (Required) The absolute path to the input folder. All input-file paths must be relative to this folder. |
| -intermediate-file=<string> | Code parsing | The path to a file that stores the JSON AST from Clang parsing. |
>>>>>>> 7506c167 (Apply suggestions from code review)
| -JSON | General | Uses raw JSON input for the front end. |
| -noscripts | General | Disables the running of code generation scripts. |
| -OnlyRunDiagnosticsOnMainFile | Clang compilation | Runs diagnostics (error and warning checking) only on the main file that is compiled. Ignores errors and warnings from all other files. |
| -output-path=<string> | Code parsing | (Required) The absolute path to the output folder. |
| -output-redirection | Output |  Redirects output and error messages from Clang and Python internal utilities. Options: `=none` - No output redirection. Clang and Python output to `stdout` and `stderr`. `=null` - Redirect Clang and Python to null, effectively suppressing output. `=file` - Redirect Clang and Python to disk. Use `redirect-output-file` to specify the path.   |
| -output-using-json | Output | Outputs using JSON objects instead of plain text. Use this option to ease parsing for calling applications. |
| -print-all-options | General | Prints all option values after command-line parsing. |
| -print-options | General | Prints nondefault options after command-line parsing. |
| -profile | General | Enables AZ Code Generator's internal profiler and emits timings for Clang parsing and script execution. |
| -python-debug-path=<string> | Python | Path to Python debug libraries and scripts for AzCodeGenerator.exe to use in debugging. |
| -python-home=<string> | Python | (Required) The location of Python. Az Code Generator ignores `PYTHONHOME`. |
| -python-home-debug=<string> | Python | The location of the debug Python. Az Code Generator ignores `PYTHONHOME`. |
| -python-path=<string> | Python | The path to Python libraries and scripts for AzCodeGenerator.exe. |
| -redirect-output-file=<string> | Output | The file path for redirected output. Use in combination with the -output-redirection=file option. The default file name is output.log. |
| -resource-dir=<string> | Code parsing | The path to the resource directory for Clang. |
| -stats | General | Enables statistics output from program (available with asserts). Use the -info-output-file=<filename> option to specify the output file. |
| -SkipFunctionBodies | AST traversal | Does not traverse function bodies. |
| -SuppressDiagnostics | Clang compilation | Hides Clang compilation diagnostic information. |
| -SuppressErrorsAsWarnings | Clang compilation | Suppresses compilation errors during parsing by reporting them as warnings. |
| -SuppressIncludeNotFoundError | AST traversal | Suppresses \#include not found errors. |
| -track-memory | General | Enables -time-passes memory tracking. Performance might be slow when this option is used. |
| -v | General | Outputs verbose debug information. |
| -version | General | Displays the version of AzCodeGenerator.exe. |
| -view-background | General | Executes the graph viewer in the background. This option creates a .tmp file that must be deleted manually. |
