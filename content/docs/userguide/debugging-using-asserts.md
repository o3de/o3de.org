# Using the `sys_asserts` Console Variable \(CVAR\)<a name="debugging-using-asserts"></a>

Manage assert notifications in Lumberyard with the `sys_asserts` console variable\. The following table shows the possible values and their meanings\.


| Value | Description | 
| --- | --- | 
| 0 | Ignore assert condition checks\. Assert expressions are not evaluated\. This option offers the best performance of all of these values\. | 
| 1 | If asserts and assert call stacks are available, they are logged and printed to the console or terminal\. This is the default value\. | 
| 2 | If asserts and assert call stacks are available, they are logged and printed to the console or terminal\. This value displays a dialog box with options to ignore the current assert, ignore all asserts, or break on the assert\. | 

**Note**  
Prior to Lumberyard version 1\.21, when a debugger was attached and an assert was triggered, the debugger triggered a breakpoint on the assert\. In the new implementation, asserts print to the log at setting `sys_asserts=1` and display a dialog box at setting `sys_asserts=2`\. This gives you the option to break on the assert rather breaking automatically\.

## Example Outputs<a name="debugging-using-asserts-example-outputs"></a>

`sys_asserts=1` produces output similar to the following:

```
(System) - Trace::Assert
e:\dev\Code\CryEngine\Cry3DEngine\Particle.cpp(1289): (68792) 'void __cdecl CParticle::Update(const struct SParticleUpdateContext &,float,bool)'
(System) - e:\dev\code\cryengine\cry3dengine\particle.cpp (1290) : CParticle::Update
(System) - e:\dev\code\cryengine\cry3dengine\particlecontainer.cpp (777) : CParticleContainer::UpdateParticleStates
(System) - e:\dev\code\cryengine\cry3dengine\particlecontainer.cpp (731) : CParticleContainer::UpdateParticles
(System) - e:\dev\code\cryengine\cry3dengine\particleemitter.cpp (87) : <lambda_11fc931574fd38d67807576e751a0e04>::operator()
```

`sys_asserts=2` opens a dialog box like the following:

![\[Assert dialog box\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/debugging-using-asserts-1.png)

The following table describes the options for the **Assert** dialog box\.


****  

| Option | Description | 
| --- | --- | 
| Ignore | Ignores the current assert and continues running the application\. The same assert no longer triggers the dialog box to display\. | 
| Ignore All | Prevents the current assert and all future asserts from displaying a dialog box\. To prevent decreases in performance, prints debug information to the log only after completion\. | 
| Break | Breaks on the assert\. If a debugger is attached, creates a breakpoint and breaks at the breakpoint in the debugger\. If a debugger is not attached, stops the application\. | 

## Setting the Assert Level at Initialization<a name="debugging-using-asserts-setting-at-initialization"></a>

To set the assert level at engine initialization, add an entry to a project's `game.cfg` file\. The following example shows a `game.cfg` file for the SamplesProject\.

```
sys_game_name = "SamplesProject"
sys_localization_folder = Localization
ca_useIMG_CAF = 0
collision_classes = "Ship=0,Shield=1,Asteroid=2"
r_DisplayInfo=3
sys_asserts=2
```

## Setting the Assert Level at Runtime<a name="debugging-using-asserts-setting-at-runtime"></a>

You can set the `sys_asserts` console variable at runtime in the console window\. The following image shows an example\.

![\[Setting the sys_asserts console variable at runtime.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/debugging-using-asserts-2.png)

## Setting the Assert Level for Mobile Devices<a name="debugging-using-asserts-mobile-devices"></a>

When debugging mobile platforms, you can use the Windows\-based [Universal Remote Console](lumberyard-remote-console.md) to set the assert level in the command\-line window of the application\.

![\[Using the Universal Remote Console to set the assert level for mobile platforms.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/debugging-using-asserts-3.png)

## **Setting an Assert in Source Code**<a name="debugging-using-asserts-setting-in-source-code"></a>

To add an assert in source code, use the `AZ_Assert` macro\.

```
AZ_Assert(m_useCount >= 0, "AssetData has been deleted")
```

For more information, see [Tracing](cpp-best-practices-lumberyard-tracing.md)\.