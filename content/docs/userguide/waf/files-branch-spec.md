---
description: ' Use the Waf branch spec file to specify the available operating systems
  and configurations for all &ALY; game projects and specs. '
title: Waf Branch Spec (waf_branch_spec.py)
---
# Waf Branch Spec \(waf\_branch\_spec\.py\) {#waf-files-branch-spec}

The `waf_branch_spec.py` is the topmost configuration level of the Waf build system\. It specifies which operating systems and configurations are available for all projects and specs\.

The following is an example `waf_branch_spec.py` file, with explanatory comments for each value moved and enhanced in the table that follows:

```
##############################
# Global constants
##############################
BINTEMP_FOLDER = 'BinTemp'
WAF_FILE_GLOB_WARNING_THRESHOLD = 1000
CACHE_FOLDER = 'Cache'

LMBR_WAF_VERSION_TAG = "9AC1223C-C4C9-4F7B-87E8-C06BC2343C6E"

ADDITIONAL_COPYRIGHT_TABLE = {
}

ADDITIONAL_WAF_MODULES = {
}

ADDITIONAL_SEARCH_PATHS = [
]
##############################
```

The waf\_branch\_spec\.py file manages the following global values:


**Global values**

| Value | Description |
| --- | --- |
| ADDITIONAL\_COPYRIGHT\_TABLE |  \(Optional\) To embed a company name and copyright in the generated binaries, add a name\-value pair here\. Example: <pre>ADDITIONAL_COPYRIGHT_TABLE = {<br />    'MyCompany' : 'Copyright (c) MyCompany'<br />}</pre> You must *also* add 'copyright\_org' to either your `project.json` or wscript module definition file\. Project\.json example: <pre>"copyright_org": "MyCompany"</pre> Wscript module example: <pre>bld.CryEngineModule(<br />  ...<br />    copyright_org = 'MyCompany'<br />  ...<br />)</pre>  |
| ADDITIONAL\_SEARCH\_PATHS | \(Optional\) Provide additional paths to search for the WAF build\. You can use aliases such as @ENGINE@ and @PROJECT@ for the engine and project roots, respectively\. |
| ADDITIONAL\_WAF\_MODULES |  \(Optional\) Specify a table of additional modules that will be loaded by WAF\. The table format is: `'Key' : [ 'Module list' ]` Where `key` is the path of the directory for a set of WAF modules, and the `module list` is a list of WAF python modules to load into the build system, separated by commas and relative to the path directory specified by the key\. Example: <pre>ADDITIONAL_WAF_MODULES = {<br />    'Tools/Build/custom_build' : [<br />        'custom_a.py',<br />        'custom_b.py:win32'<br />    ]<br />}</pre> The above example will load 'custom\_a\.py' for all platforms, and 'custom\_b\.py' only for win32 platforms\. Note that the methods that are exposed in the modules must be decorated accordingly, as they are generally used based on the context of the command, and not through regular python imports\.  |
| BINTEMP\_FOLDER | Subfolder under the base of the project where WAF stores all intermediate and temporary files\. |
| LMBR\_WAF\_VERSION\_TAG | Version stamp \(GUID\) of lmbrwaf that is used to signal that a clean of bintemp is necessary\. Only update this number if there are changes in WAF handling where it is not possible to track stale intermediate files caused by the WAF changes\. To ignore the bintemp cleaning check, set this value to None\. Only update this value as a last resort\. If there were WAF changes that do not affect the generation or tracking of intermediate of generated files, then there is no need to wipe out BinTemp |
| WAF\_FILE\_GLOB\_WARNING\_THRESHOLD | Defines a warning threshold in number of files that were hit during waf\_file [globbing](/docs/userguide/waf/files-filelist#waf-files-filelist-file-globbing)\. |