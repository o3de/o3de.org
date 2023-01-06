---
title: Crash Reporting with Dump Files
linktitle: Crash Reporting
description: When you encounter a crash in Open 3D Engine (O3DE), it's helpful to generate a dump file with crash reporting information to help track down the problem. 
---

If you encounter a crash with **Open 3D Engine (O3DE)**, you may find helpful information in the dump file, `error.dmp`. The dump file records details about the state of the engine that led to the event of the crash. The dump file is a compact minidump and is located in the `user/log/` directory, within the same parent directory where you ran the O3DE Editor from. For example, if you ran the Editor from `MyProject`'s directory, then you can find the dump files in `/MyProject/user/log/`. 

## Dump file creation

By default, O3DE creates a dump file that includes the stack trace and some variable information. This is set via the `sys_dump_type` [console variable (CVAR)](/docs/user-guide/appendix/cvars/).

If you want to configure the type of crash log information that's generated, set the `sys_dump_type` CVAR to one of the following values:
- `0` -- Disable crash reporting.
- `1` -- Generate a stack trace on crash.
- `2` -- (Default) Generate a stack trace and limited variable information.
- `3` -- Generate a full crash log of the stack trace, and all variable and information.

## Debugging with the dump file

To debug the dump file with **Visual Studio**:

1. Open `user/log/error.dmp` in Visual Studio. This displays a summary of the dump, including a timestamp, the process where the crash occurred, and information about the exception. 

2. Then, you can start the Visual Studio debugger to see the context of the exception, as well as the call stack, and any variable and memory information.

You may also look at other log files in `user/log/` to find more clues as to the cause of the crash. 