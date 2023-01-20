---
title: Using the sys_asserts Console Variable (CVAR)
linktitle: CVAR Asserts
description: Learn how to use asserts in Open 3D Engine (O3DE) to debug your game code.
---

Manage assert notifications in **Open 3D Engine (O3DE)** with the `sys_asserts` [console variable (CVAR)](/docs/user-guide/appendix/cvars/). The following table shows the possible values and their meanings.


| Value | Description |
| --- | --- |
| 0 | Ignore assert condition checks. Assert expressions are not evaluated. This option offers the best performance of all of these values. |
| 1 | If asserts and assert call stacks are available, they are logged and printed to the console or terminal. This is the default value. |
| 2 | If asserts and assert call stacks are available, they are logged and printed to the console or terminal. This value displays a dialog box with options to ignore the current assert, ignore all asserts, or break on the assert. |

## Example Outputs 

`sys_asserts=1` produces output similar to the following:

```
(System) - Trace::Assert
<path>\Particle.cpp(1289): (68792) 'void __cdecl CParticle::Update(const struct SParticleUpdateContext &,float,bool)'
(System) - <path>\particle.cpp (1290) : CParticle::Update
(System) - <path>\particlecontainer.cpp (777) : CParticleContainer::UpdateParticleStates
(System) - <path>\particlecontainer.cpp (731) : CParticleContainer::UpdateParticles
(System) - <path>\particleemitter.cpp (87) : <lambda_11fc931574fd38d67807576e751a0e04>::operator()
```

`sys_asserts=2` opens a dialog box like the following:

![Assert dialog box](/images/user-guide/programming/debugging/debugging-using-asserts-1.png)

The following table describes the options for the **Assert** dialog box.


****

| Option | Description |
| --- | --- |
| Ignore | Ignores the current assert and continues running the application. The same assert no longer triggers the dialog box to display. |
| Ignore All | Prevents the current assert and all future asserts from displaying a dialog box. To prevent decreases in performance, prints debug information to the log only after completion. |
| Break | Breaks on the assert. If a debugger is attached, creates a breakpoint and breaks at the breakpoint in the debugger. If a debugger is not attached, stops the application. |

## Setting the Assert Level at Initialization 

To set the assert level at engine initialization, add an entry to a project's `game.cfg` file. The following example shows a `game.cfg` file for the SamplesProject.

```
sys_game_name = "SamplesProject"
sys_localization_folder = Localization
ca_useIMG_CAF = 0
collision_classes = "Ship=0,Shield=1,Asteroid=2"
r_DisplayInfo=3
sys_asserts=2
```

## Setting the Assert Level at Runtime 

You can set the `sys_asserts` console variable at runtime in the console window. The following image shows an example.

![Setting the sys_asserts console variable at runtime.](/images/user-guide/programming/debugging/debugging-using-asserts-2.png)

## Setting the Assert Level for Mobile Devices 

When debugging mobile platforms, you can use the Windows-based Universal Remote Console to set the assert level in the command-line window of the application.

![Using the Universal Remote Console to set the assert level for mobile platforms.](/images/user-guide/programming/debugging/debugging-using-asserts-3.png)

## **Setting an Assert in Source Code** 

To add an assert in source code, use the `AZ_Assert` macro.

```
AZ_Assert(m_useCount >= 0, "AssetData has been deleted")
```

For more information, see [Tracing](/docs/user-guide/programming/debugging/tracing/).
