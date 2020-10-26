# Tracing<a name="cpp-best-practices-lumberyard-tracing"></a>

**Recommended**: For code tracing needs, use `AZ_*` tracing macros\.

**Reason**: Error handling and tracing functions provide useful messages formatted for readability about errors that occur\. To facilitate debugging, `AZ_*` tracing functions indicate where in code the errors occurred\.

The following table describes the `AZ_Tracing` macros and their uses\.


****  

| AZ Tracing Macro | Description | 
| --- | --- | 
| AZ\_Assert |  Use for critical errors when the program cannot continue\. `AZ_Assert` macros print an error message, the file name and line number where the error occurred, and then break program execution\.  | 
| AZ\_Error |  Use when an obvious error has occurred but the program can continue safely\. `AZ_Error` macros print an error message and the file name and line number where the error occurred\. In some environments, `AZ_Error` notifies the user that an error has occurred \(for example, in a message box or onscreen message\)\.  | 
| AZ\_Warning |  Use when an error might have occurred\. `AZ_Warning` macros print an error message and the file name and line number of the possible error, but take no other action\.  | 
| AZ\_TracePrintf |  Use for informational purposes only\. `AZ_TracePrintf` macros print a message but take no other action\.  | 

 For source code, see `lumberyard_version\dev\Code\Framework\AzCore\AzCore\Debug\Trace.*`\.

## Suppressing AZ Trace Messages in Unit Tests<a name="cpp-best-practices-lumberyard-tracing-unit-tests"></a>

You can use macros to suppress AZ trace messages\. Starting in Lumberyard version 1\.21, the following macros for suppressing AZ Trace messages in the AZ Unit Test framework have equivalent macros with new names\. The old macros will be removed in a future release\.


| Old Macro Name | New Macro Name | 
| --- | --- | 
| AZ\_TEST\_START\_ASSERTTEST | AZ\_TEST\_START\_TRACE\_SUPPRESSION | 
| AZ\_TEST\_STOP\_ASSERTTEST | AZ\_TEST\_STOP\_TRACE\_SUPPRESSION | 

The old macros only suppressed the *AZ\_Error* and *AZ\_Assert* trace messages, but their names implied application termination\. The new macros are equivalent in functionality to the old macros but have names that more accurately reflect their functionality\.

For source code, see `lumberyard_version\dev\Code\Framework\AzCore\AzCore\UnitTest\UnitTest.h`\.