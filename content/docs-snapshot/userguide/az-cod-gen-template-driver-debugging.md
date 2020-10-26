# Template Driver Debugging<a name="az-cod-gen-template-driver-debugging"></a>

****  
AZ Code Generator is in preview release and is subject to change\.

Because template drivers are run from the AZ Code Generator executable using Python, you can't debug them directly\. However, you can debug your driver and template code \(and even Jinja2 itself\) by using the `debug.py` file included with AZ Code Generator\. 

**To debug a template driver with a Python debugger like PyCharm or Visual Studio**

1. Set the debugger to execute the `Bin64\azcg\debug.py` file\. This file launches the utility to generate input JSON and emulates a code\-generation pass in Python so that you can debug as if you were attached to the utility\. 

1. Set the working directory to `Bin64\azcg`\. 

1. Enter the arguments for `AzCodeGenerator.exe` into a file with one argument per line\. Or use a Waf\-generated arguments file as described in [Waf Debugging with AZ Code Generator](az-code-gen-waf-debugging.md)\. 

1. Set the arguments file, prefixed with `@`, as the argument to the script\. 

   The following arguments are required: 
   +  `-codegen-script` – Absolute path to the driver script that you want to debug\. 
   +  `-input-path` – Absolute path on which source file paths are based\. Usually this path is the same as the location of the wscript for a given target\. 
   +  `-input-file` – Relative path from input path to the source file that is used for input\.
   +  `-output-file` – Absolute path where generated code will be written\.

After you have completed the preceding steps, you should be able to launch your debugger and set breakpoints in your driver script\. 

For complete AZ Code Generator parameter information, see [AZ Code Generator Parameters](az-code-gen-parameters.md)\.