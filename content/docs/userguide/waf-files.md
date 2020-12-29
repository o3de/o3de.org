# Waf File System<a name="waf-files"></a>

You can find global configurations and project specs in the `_WAF_` directory at the root project path\. Three subfolders represent settings specific to the following build systems: `android`, `apple`, and `msbuild`\. Defined specs are located in the `specs` directory\.

In addition to the configurations specified in the `_WAF_` directory, you can find other Waf settings in the `waf_branch_spec.py` file in the root directory\. You can modify this file if you need to include support for additional platforms or configurations\. 

The Waf build file system can be grouped into three categories:
+ Waf Module files \(wscript\)
+ Waf file list \(\*\.waf\_files\)
+ Project and compilation files such as \*\.h, \*\.cpp, and so on

**Topics**
+ [Waf File Lists \(\*\.waf\_files\)](waf-files-filelist.md)
+ [Waf Branch Spec \(waf\_branch\_spec\.py\)](waf-files-branch-spec.md)
+ [Waf Projects File \(project\.json\)](waf-files-projects-file.md)
+ [Waf Spec Files \(\*\.json\)](waf-files-spec-file.md)
+ [Waf Module Files \(wscript\)](waf-files-module-files-wscript.md)
+ [Waf User Options and Settings](waf-user-options-and-settings.md)