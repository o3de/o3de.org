# AZ::Console<a name="az-console"></a>

The `AZ::Console` class provides a set of macros for defining variables and mapping functions that you can use to interact with in\-game variables and processes\. Use the macros defined in this class to set the console variables \(cvars\) and functors \(cfuncs\) for your game, and then access them through the Lumberyard console\.

`AZ::Console` is defined in the following header: `%INSTALL-ROOT%\dev\Code\Framework\AzCore\AzCore\Console\IConsole.h`

**Note**  
The console found inside `AzCore` is a console and cvar system intended to replace the legacy CryEngine console and cvar system\. This system is free of any CryEngine code, and depends only on `AzCore`\. 

`AZ::Console` features: 
+ ***Stubbed*** support for multiplayer \(as of v1\.24\)\. Lumberyard will eventually enable cvar replication across multiplayer instances using GridMate\.
+ Basic access protections and anti\-cheat mechanisms for locking down cvars and cfuncs in release builds\.
+ Default support for several C\+\+ types, including bool \(Boolean\), stdint \(all types\), floats, doubles, vectors and quaternions, and enums \(enumerations\)\.
+ Flexible and expandable type support\. You can add support for new cvar types without altering the console code directly\.
+ Support for the legacy CryEngine console, specifically to reduce user confusion\. For users of the in\-game console, legacy cvars and `AZ_CVAR` cvars appear identical\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/az/az-console-1.png)

**Important**  
As of Amazon Lumberyard version 1\.24, AZ::Console does not support the following features present in the CryEngine console:  
Registration of cvars at runtime by name\. Formerly, you could register a CryEngine cvar using `IConsole->Register<String/Int/Float>()` and then retrieve the value of that cvar with `IConsole->GetCVar()`\. `AZ::Console` cvars must be declared at compile\-time using one of the macros in IConsole\.h\.
Custom cvar/cfunc autocomplete callbacks\. Formerly, you could specify an autocomplete callback and attach it to a CryEngine cvar\. `AZ::Console` currently does not support this functionality\.
Remote console support\. The CryEngine console allows remote access by opening a socket on a provided port, and then listening for console commands issued to that socket\. `AZ::Console` currently does not support this functionality\. 

**Topics**
+ [Console variables \(cvars\)](#az-console-cvars)
+ [Console functors \(cfuncs\)](#az-console-cfuncs)
+ [Optional flags](#az-console-flags)
+ [Adding support for new console variable types](#az-console-new-types)

## Console variables \(cvars\)<a name="az-console-cvars"></a>

Declare a cvar using one of two macros from `IConsole.h:`

```
AZ_CVAR(_TYPE, _NAME, _INIT, _CALLBACK, _FLAGS, _DESC) //Standard cvar macro, provides no external linkage.      
```

```
AZ_CVAR_EXTERNABLE(_TYPE, _NAME, _INIT, _CALLBACK, _FLAGS, _DESC) //Cvar macro that creates a console variable with external linkage.   
```

Parameters:
+ **\_TYPE**: The base type of the cvar\.
+ **\_NAME**: The name of the cvar\.
+ **\_INIT**: The initial value to assign to the cvar\.
+ **\_CALLBACK**: An optional callback function invoked when a cvar changes value\. **Note:** These macros do not guarantee that this callback will be run on a specific thread\. The implementor of the callback handler is responsible for ensuring thread safety\.
+ **\_FLAGS**: One or more `AZ::Console::FunctorFlags` that are used to mutate behavior\. Use the logical AND \(`&&`\) and OR \(`||`\) operators to combine flags\. If you do not have any flags to set, use `FunctorFlags::None`\. 
+ **\_DESC**: String that provides a short description of the cvar for display\.

To declare a new cvar in your code, include the `IConsole.h` header\. Then use one of the cvar macros \(such as `AZ_CVAR`\) to declare your new console variable in your own code \(\.cpp\) files\. 

**Note**  
AZ\_CVAR and AZ\_CVAR\_EXTERNABLE variables can be declared only in C\+\+ code \(\.cpp\) files\. AZ\_CVAR\_EXTERNED variables, however, can be declared in either C\+\+ code \(\.cpp\) or header \(\.h\) files\.

Here are some examples\.

```
AZ_CVAR(int32_t, cl_GameServiceRefreshTimeMs, 1000, nullptr, FunctorFlags::None, "Controls the auto-refresh delay for all gameService data, time in milliseconds");
AZ_CVAR(bool,    cl_QuitOnHubDisconnect,     false, nullptr, FunctorFlags::None, "If enabled, the client executable will terminate on disconnect");
```

```
void OnConsoleResUpdate(const int32_t& a_NewWidth)
{
    // Run update for new value
}
 
AZ_CVAR(int32_t, sv_ConsoleWidth, 160, OnConsoleResUpdate, FunctorFlags::ReadOnly, "The width of the server console window");
```

```
AZ_CVAR_EXTERNABLE(uint16_t, net_ServerRateMs, 33, nullptr, FunctorFlags::ReadOnly, "Server tick rate to use for network relevent simulations");
```

Optionally, use the following name prefixes to help organize groups of cvars:
+ **sv\_**: For server only cvars
+ **cl\_**: For client only cvars
+ **bg\_** : "Both games" for common cvars \(client and server\)

These prefixes are useful to quickly limit the scope of autocomplete, and to see groups of associated cvars in the console\. You can use your own prefixes as well\.

To make an existing console variable external \(extern\), use the `AZ_CVAR_EXTERNED` macro:

```
AZ_CVAR_EXTERNED(_TYPE, _NAME)    
```

Make sure that the **\_TYPE **and **\_NAME** parameters match those of the previously defined cvar\.

## Console functors \(cfuncs\)<a name="az-console-cfuncs"></a>

Console functions allow you to register a command with the console that's not associated with a specific type or value\. In Lumberyard, they're purely a mechanism to allow a method to be invoked directly from the Lumberyard in\-game console\. 

There are two types of cfuncs: one to invoke class member methods \(`AZ_CONSOLEFUNC`\), and one to invoke static methods \(`AZ_CONSOLEFREEFUNC`\)\.

To declare a class member method cfunc, use the `AZ_CFUNC` macro from `IConsole.h`:

```
AZ_CONSOLEFUNC(_CLASS, _FUNCTION, _INSTANCE, _FLAGS, _DESC)    
```

Parameters:
+ **\_CLASS**: The class that contains the method \(function\) for invocation\.
+ **\_FUNCTION**: The method to invoke as a callback\. **Note:** These macros do not guarantee that this callback will be run on a specific thread\. The implementor of the callback handler is responsible for ensuring thread safety\.
+ **\_INSTANCE**: The instance of the class on which this method gets invoked \(usually set to `this` for the current instance\)\.
+ **\_FLAGS**: One or more `AZ::Console::FunctorFlags` that are used to mutate behavior\. Use the logical AND \(`&&`\) and OR \(`||`\) operators to combine flags\. If you do not have any flags to set, use `FunctorFlags::None`\.
+ **\_DESC**: String that provides a short description of the cfunc for display\.

Some examples of cfunc declarations:

```
class Example
{
public:
    Example() { AZ_CONSOLEFUNC(Example, Method, this, FunctorFlags::DontReplicate, "Executes the Method method on this Example instance, invoke in the console using Example.Method"); }
    void Method(const StringSet&) {}
};
```

To declare a cfunc for a static method \(or other non\-member function\), use the `AZ_CONSOLEFREEFUNC` macro:

```
AZ_CONSOLEFREEFUNC(_FUNCTION, _FLAGS, _DESC)   
```

Parameters:
+ **\_FUNCTION**: The static method to invoke as a callback\. **Note:** These macros do not guarantee that this callback will be run on a specific thread\. The implementor of the callback handler is responsible for ensuring thread safety\.
+ **\_FLAGS**: One or more `AZ::Console::FunctorFlags` that are used to mutate behavior\. Use the logical AND \(`&&`\) and OR \(`||`\) operators to combine flags\. If you do not have any flags to set, use `FunctorFlags::None`\.
+ **\_DESC**: String that provides a short description of the cfunc for display\.

Example:

```
void ForceEnableMetrics(const StringSet&) {}
    AZ_CONSOLEFREEFREEFUNC(ForceEnableMetrics, FunctorFlags::Null, "If called, force enable metrics");
```

## Optional flags<a name="az-console-flags"></a>

`AZ::Console` provides a set of flags that can be passed to cvar and cfunc declarations and indicate how they should be handled:

```
enum class FunctorFlags
{
    Null           = 0        // Empty flags
,   DontReplicate  = (1 << 0) // Should not be replicated (CURRENTLY UNUSED)
,   ServerOnly     = (1 << 1) // Should never replicate to clients (CURRENTLY UNUSED)
,   ReadOnly       = (1 << 2) // Should not be invoked at runtime
,   IsCheat        = (1 << 4) // Should not be shown in the console for autocomplete
,   IsDeprecated   = (1 << 5) // Command is deprecated, show a warning when invoked
,   NeedsReload    = (1 << 6) // Level should be reloaded after executing this command
,   AllowClientSet = (1 << 7) // Allow clients to modify this cvar even in release (this alters the cvar for all connected servers and clients, be VERY careful enabling this flag) (CURRENTLY UNUSED)
};
```

## Adding support for new console variable types<a name="az-console-new-types"></a>

To add support for a new cvar type, override the two template methods that convert the custom type to a space\-delimited string from a vector of space\-delimited string inputs\.

As an example, an override that converts `AZ::Vector3` to a string and back to a value is declared like this:

```
namespace AZ
{
    // CVar compatibility
    namespace ConsoleTypeHelpers
    {
        template <>
        AZStd::string ValueToString<AZ::Vector3>(const AZ::Vector3& a_Value);
 
        template <>
        bool StringSetToValue<AZ::Vector3>(AZ::Vector3& a_OutValue, const StringSet& a_Arguments);
    }
}
```