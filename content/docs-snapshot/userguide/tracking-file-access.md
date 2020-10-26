# Tracking File Access<a name="tracking-file-access"></a>

It's possible to track invalid file reads that occur during game run time\. The error message `Invalid File Access` occurs when an attempt is made to read or open files from a thread that is not the streaming thread\. These file access operations can cause stalls that can be quite severe\.

**Note**  
Only access attempts from the main thread and render thread are logged\. This feature is disabled in RELEASE builds\.

## CVars<a name="tracking-file-access-cvars"></a>

The following console variables enable different options for tracking file access\.

**`sys_PakLogInvalidFileAccess`**

`1` \(default\):
+ Access is logged to `game.log`\.
+ Generates a `perfHUD` warning\.
+ The warning is displayed in red in the upper left corner of the screen\.
+ A 3 second\-stall in non\-release builds is induced\.

**`sys_PakMessageInvalidFileAccess`**
+ When a file is accessed, creates a popup dialog on the PC\. At this point, you can choose to break into the debugger, or continue\.

## Where invalid access is defined<a name="tracking-file-access-invalid-access-definition"></a>

The points which define when a file access attempt is considered invalid are set by implementing `ICryPak::DisableRuntimeFileAccess` to return true or false\. The points may need to be tweaked for single player and multiplayer games\.

### Exceptions<a name="tracking-file-access-invalid-access-definition-exceptions"></a>

To add exceptions to file access tracking so that you can ignore files like `game.log`, create an instance of `CDebugAllowFileAccess` in the scope which accesses the file\.

### Resolving file access callstacks<a name="tracking-file-access-invalid-access-definition-resolving-file-access-callstacks"></a>

The files that you collect with `pak_LogInvalidFileAccess 2` must have their callstacks resolved\. To do this requires the following tools from the `XenonStackParse` folder of the `Tools` directory\.:
+ The `.pdb` files from the build
+ The `XenonStackParse` tool
+ The `ProcessFileAccess.py` helper script 

The directory structure for running `ProcessFileAccess.py` should resemble the following:

```
<Root>
--> XenonStackParse
--> FileAccessLogs (this folder should contain the .pdb files)
------> Processed (this folder contains the output from XenonStackParse)
```

Run `ProcessFileAccess.py` from the `FileAccessLogs` directory \(`XenonStackParse` uses the working directory to search for the `.pdb` files\)\. The script creates a folder called `Processed` and a file within it that contains the resolved callstack for each of the log files\.