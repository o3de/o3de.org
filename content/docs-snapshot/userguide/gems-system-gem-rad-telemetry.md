# RAD Telemetry Gem<a name="gems-system-gem-rad-telemetry"></a>

RAD Telemetry 3 is an instrumentation\-based profiling and performance visualization middleware product created by [RAD Game Tools](http://www.radgametools.com/telemetry.htm)\. The RAD Telemetry Gem provides a RAD Telemetry 3 integration for Lumberyard for those who have licensed RAD Telemetry\.

The RAD Telemetry Gem provides one example of how to integrate instrumentation\-based profiling middleware\. You could write a gem for your own instrumentation\-based profiler and leverage Lumberyard's existing performance markers\. See the `Profiler.h` file in the `/dev/Code/Framework/AzCore/AzCore/Debug` directory to see how the RAD Telemetry Gem ties into Lumberyard's existing performance markers\.

**Note**  
If the RAD Telemetry Gem is disabled or you do not have the RAD redistributable files for a particular platform, the performance instrumentation compiles to Lumberyard's performance markers\.

**To enable the RAD Telemetry Gem**

1. Extract the Telemetry redistributables from RAD Game Tools to `/Gems/RADTelemetry/External`\. You should see the following subdirectories, which match the subdirectories provided by RAD:
   + `Dll`
   + `Lib`
   + `Include`
   + `Docs`
**Note**  
If you are compiling for case\-sensitive platforms, note that the first letter of each subdirectory listed above is capitalized\.
When compiling a project with the RAD Telemetry Gem enabled, the static `lib` file for the target platform must exist in the `Gems\RADTelemetry\External\Lib` directory\. The Waf build system then compiles with the `AZ_PROFILE_TELEMETRY` defined globally and links RAD Telemetry libraries for the specified platform\. You can add additional platforms by editing the `rad_telemetry.json` file \(located in the `Gems\RADTelemetry\3rdParty` directory\)\.

1. Extract RAD Telemetry Tools to the `/Gems/RADTelemetry/Tools` directory\. This should include `telemetry.exe` and your license file from RAD\.

1. Use the [**Project Configurator** to enable](gems-system-gems.md) the RAD Telemetry Gem for your project\. You must enable this gem \(and any other gem\) for each project\. Gems are not globally enabled\.

1. [Build your project](game-build-intro.md)\. You must build using [`profile` \(preferred\) or `debug`](game-build-intro.md) in order to enable RAD Telemetry\.

## Instrumenting Your Code<a name="gems-system-gem-rad-telemetry-instrumenting"></a>

With the RAD Telemetry Gem, Lumberyard introduces a set of scoped performance markers:
+ `AZ_PROFILE_FUNCTION` – Instruments entire functions\. Automatically names the performance event with the function's name\.
+ `AZ_PROFILE_SCOPE` – Instruments a local scope within a function of interest\. You must provide the name\.
+ `AZ_PROFILE_SCOPE_DYNAMIC` – Instruments a `printf` style format string to dynamically generate a performance event name\. Use the dynamic name sparingly because there may be performance overhead of a string copy and transmission over the network\.

A scoped performance marker constructs an object that calls a `start` event and calls a `stop` event when it is destroyed\. This means that you do not have to worry about early returns\. We recommend that you use the `AZ_PROFILE` events when marking up your code, as it allows you to switch to Driller for a different view of profiling data\.

Lumberyard also uses the following legacy performance event markers:
+ `PROFILE_FUNCTION`
+ `PROFILE_FRAME`

## Capturing with RAD Telemetry<a name="gems-system-gem-rad-telemetry-capture"></a>

See the [RAD Telemetry](http://www.radgametools.com/telemetry.htm) documentation for more information\. The basic procedure is described below\.

**To capture with RAD Telemetry**

1. Set the console variables for the RAD Telemetry capture using either a configuration file or by entering them into the console at runtime\.

   All RAD Telemetry console variables start with `radtm_`\. For example, `radtm_Address` and `radtm_Port` if your Telemetry server is on another machine\. The console variables are defined in the `RADTelemetryModule.cpp` file\. You can augment these console variables to better suit profiling for your title\.

1. Use either `telemetry.exe` or the standalone telemetry server to start your RAD Telemetry server\.

1. Run `radtm_ToggleEnabled` to begin a capture\. You can also set this from the command line when launching your application with `+radtm_ToggleEnabled`\.

1. Run `radtm_ToggleEnabled` again from the console or the remote console, or shut down your game process to end the session\. As currently instrumented, captures can get large quickly, so you may want to perform focused captures around performance scenarios of interest \(under 30 seconds in length\)\.

1. Use the Telemetry visualizer \(`telemetry.exe`\) to analyze your capture\.