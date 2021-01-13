---
description: ' Use lmbr.exe to modify your &ALYlong; project capabilities, create
  new projects, save active projects, and enable, disable, or create gems. '
title: Managing Game Projects with Lmbr.exe
---
# Managing Game Projects with Lmbr\.exe {#lmbr-exe}


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

`Lmbr.exe` is a command\-line tool for managing capabilities, game projects, and Gems\.

**To find the `Lmbr.exe` file**

1. Navigate to one of the following directories:
   + For Visual Studio 2017: `lumberyard_version\dev\Bin64vc141`
   + For Visual Studio 2019: `lumberyard_version\dev\Bin64vc142`

1. In a command line prompt, enter the following command to see the commands that you can run\. 

   ```
   lmbr -help
   ```

   The list of possible commands appears\.  
![\[Lmbr.exe help commands.\]](/images/userguide/configurator-lmbr.png)

You can also use `-help` on other commands\. For example, to see more information about Lumberyard capabilities, you can enter the following commands: 

```
lmbr capabilities -help
```

```
lmbr capabilities list -help
```

**Topics**
+ [Projects Commands](/docs/userguide/lmbr-exe-project.md)
+ [Gems Commands](/docs/userguide/lmbr-exe-gem.md)
+ [Capabilities Commands](/docs/userguide/lmbr-exe-capabilities.md)
+ [ThirdPartySDKs Commands](/docs/userguide/lmbr-exe-thirdpartysdks.md)
+ [Packages Commands](/docs/userguide/lmbr-exe-packages.md)