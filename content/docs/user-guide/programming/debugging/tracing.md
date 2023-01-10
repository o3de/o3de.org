---
title: Debug Tracing
linktitle: Tracing
description: Learn best practices for debug tracing in Open 3D Engine (O3DE). 
---

**Recommended**: For code tracing needs, use `AZ_*` tracing macros.

**Reason**: Error handling and tracing functions provide useful messages formatted for readability about errors that occur. To facilitate debugging, `AZ_*` tracing functions indicate where in code the errors occurred.

The following table describes the `AZ_Tracing` macros and their uses.


****

| AZ Tracing Macro | Description |
| --- | --- |
| `AZ_Assert` |  Use for critical errors when the program cannot continue. `AZ_Assert` macros print an error message, the file name and line number where the error occurred, and then break program execution.  |
| `AZ_Error` |  Use when an obvious error has occurred but the program can continue safely. `AZ_Error` macros print an error message and the file name and line number where the error occurred. In some environments, `AZ_Error` notifies the user that an error has occurred.  |
| `AZ_Warning` |  Use when an error might have occurred. `AZ_Warning` macros print an error message and the file name and line number of the possible error, but take no other action.  |
| `AZ_TracePrintf` |  Use for informational purposes only. `AZ_TracePrintf` macros print a message but take no other action.    |

 For source code, see `Code\Framework\AzCore\AzCore\Debug\Trace.*`.

## Suppressing AZ Trace Messages in Unit Tests

You can use macros to suppress AZ trace messages.

* `AZ_TEST_START_ASSERTTEST` - Enable `AZ_Error` and `AZ_Assert` trace messages
* `AZ_TEST_STOP_ASSERTTEST` - Disable `AZ_Error` and `AZ_Assert` trace messages

