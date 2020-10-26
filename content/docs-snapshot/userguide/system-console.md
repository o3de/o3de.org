# Console in Depth<a name="system-console"></a>

The console is a user interface system which handles console commands and console variables\. It also outputs log messages and stores the input and output history\.

## Color coding<a name="system-console-color-coding"></a>

The game console supports color coding by using the color indices 0\.\.9 with a leading $ character\. The code is hidden in the text outputted on the console\. Simple log messages through the `ILog` interface can be used to send text to the console\.

```
This is normal $1one$2two$3three and so on
```

In the preceding example, one renders in red, two in green, and three \(and the remaining text\) in blue\.

## Console Variables<a name="system-console-cvars"></a>

Console variables provide a convenient way to expose variables which can be modified easily by the user either by being entered in the console during runtime or by passing it as command\-line argument before launching the application\.

More information on how to use command\-line arguments can be found in the [Command Line Arguments](http://docs.cryengine.com/display/SDKDOC2/Command+Line+Arguments) article\.

Console variables are commonly referred to as `CVar` in the code base\.

### Registering new console variables<a name="system-console-cvars-registering"></a>

For an integer or float based console variable, it is recommended to use the `IConsole::Register()` function to expose a C\+\+ variable as a console variable\.

To declare a new string console variable, use the `IConsole::RegisterString()` function\.

### Accessing console variables from C\+\+<a name="system-console-cvars-accessing-from-cpp"></a>

Console variables are exposed using the `ICVar` interface\. To retrieve this interface, use the `IConsole::GetCVar()` function\.

The most efficient way to read the console variable value is to access directly the C\+\+ variable bound to the console variable proxy\.

## Adding New Console Commands<a name="system-console-adding-new"></a>

The console can easily be extended with new console commands\. A new console command can be implemented in C\+\+ as a static function which follows the `ConsoleCommandFunc` type\. Arguments for this console command are passed using the `IConsoleCmdArgs` interface\.

The following code shows the skeleton implementation of a console command:

```
static void RequestLoadMod(IConsoleCmdArgs* pCmdArgs);

void RequestLoadMod(IConsoleCmdArgs* pCmdArgs)
{
  if (pCmdArgs->GetArgCount() == 2)
  {
	 const char* pName = pCmdArgs->GetArg(1);
	 // ...
  }
  else
  {
	 CryLog("Error, correct syntax is: g_loadMod modname");
  }
}
```

The following code will register the command with the console system:

```
IConsole* pConsole = gEnv->pSystem->GetIConsole();
pConsole->AddCommand("g_loadMod", RequestLoadMod);
```

## Console Variable Groups<a name="system-console-cvar-groups"></a>

Console variable groups provide a convenient way to apply predefined settings to multiple console variables at once\.

Console variables are commonly referred to as `CVarGroup` in the code base\. Console variable groups can modify other console variables to build bigger hierarchies\.

**Warning**  
Cycles in the assignments are not detected and can cause crashes\.

### Registering a new variable group<a name="system-console-cvar-groups-registering"></a>

To register a new variable group, add a new `.cfg` text file to the `GameSDK\config\CVarGroups` directory\.

`sys_spec_Particles.cfg`

```
[default]
; default of this CVarGroup
= 4
e_particles_lod=1
e_particles_max_emitter_draw_screen=64

[1]
e_particles_lod=0.75
e_particles_max_emitter_draw_screen=1

[2]
e_particles_max_emitter_draw_screen=4

[3]
e_particles_max_emitter_draw_screen=16
```

This creates a new console variable group named `sys_spec_Particles` that behaves like an integer console variable\. By default, this variable has the state `4` \(set in the line following the comment in the example\)\.

On changing the variable, the new state is applied\. Console variables not specified in the `.cfg` file are not set\. All console variables need to be part of the default section\. An error message is output in case of violation of this rule\.

If a console variable is not specified in a custom section, the value specified in the default section is applied\.

### Console variable group documentation<a name="system-console-cvar-groups-documentation"></a>

The documentation of the console variable group is generated automatically\.

`sys_spec_Particles`

```
Console variable group to apply settings to multiple variables

sys_spec_Particles [1/2/3/4/x]:
 ... e_particles_lod = 0.75/1/1/1/1
 ... e_particles_max_screen_fill = 16/32/64/128/128
 ... e_particles_object_collisions = 0/1/1/1/1
 ... e_particles_quality = 1/2/3/4/4
 ... e_water_ocean_soft_particles = 0/1/1/1/1
 ... r_UseSoftParticles = 0/1/1/1/1
```

### Checking if a console variable group value represents the state of the variables it controls<a name="system-console-cvar-groups-checking"></a>

#### From the console<a name="system-console-cvar-groups-checking-from-console"></a>

In the console you can enter in the console variable group name and press tab\. If the variable value is not represented, it will print the value of `RealState`\.

```
sys_spec_Particles=2 [REQUIRE_NET_SYNC] RealState=3
sys_spec_Sound=1 [REQUIRE_NET_SYNC] RealState=CUSTOM
sys_spec_Texture=1 [REQUIRE_NET_SYNC]
```

By calling the console command `sys_RestoreSpec` you can check why the `sys_spec_` variables don't represent the right states\.

#### From C\+\+ code<a name="system-console-cvar-groups-checking-from-cpp"></a>

From the code you can use the member function `GetRealIVal()` and compare its return value against the result of `GetIVal()` in `ICVar`\.

## Deferred execution of command line console commands<a name="system-console-deferred-execution"></a>

The commands that are passed via the command line by using the \+ prefix are stored in a separate list as opposed to the rest of the console commands\.

This list allows the application to distribute the execution of those commands over several frames rather than executing everything at once\.

### Example<a name="system-console-deferred-execution-example"></a>

Consider the following example\.

```
--- autotest.cfg --
hud_startPaused = "0"
wait_frames 100
screenshot autotestFrames
wait_seconds 5.0
screenshot autotestTime

-- console --
StarterGameLauncher.exe -devmode +map SinglePlayer +exec autotest +quit
```

In the example, the following operations were performed:
+ Load the SinglePlayer map\.
+ Wait for 100 frames\.
+ Take a screenshot called autotestFrames\.
+ Wait for 5 seconds\.
+ Take a screenshot called autotestTime\.
+ Quit the application\.

### Details<a name="system-console-deferred-execution-details"></a>

Two categories of commands are defined: blocker and normal\.

For each frame, the deferred command list is processed as a fifo\. Elements of this list are consumed as long as normal commands are encountered\.

When a blocker is consumed from the list and executed, the process is delayed until the next frame\. For instance, commands like `map` and `screenshot` are blockers\.

A console command \(either command or variable\) can be tagged as a blocker during its declaration using the` VF_BLOCKFRAME` flag\.

The following synchronization commands are supported\.


**Optional Title**  

|  Command  |  Type  |  Description  | 
| --- | --- | --- | 
| wait\_frames num: |  <int>  |  Wait for *num* frames before the execution of the list is resumed\.  | 
| wait\_seconds sec: |  <float>  |  Wait for *sec* seconds before the execution of the list is resumed\.  | 