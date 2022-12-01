---
title: Console variables (CVARs)
---

Console variables (CVARs) can be used to set various editor and runtime options in O3DE. O3DE ships with many built-in CVARs but also supports options for configuring and grouping your own.

## Working with CVARs

You can define your own CVARs in code using the [CVAR macro functions](/docs/user-guide/programming/az-console/#console-variables-cvars). You can also group CVARs together in [console variable groups](/docs/user-guide/editor/console-cvars-commands/#console-variable-groups), which allow you to change multiple CVARs at once. 

You can invoke CVARs in the Editor via the [console](/docs/user-guide/editor/console/).

You can also pass CVARs on the command line when launching O3DE binaries via `--{cvar name} {value}` or `--{cvar name}={value}`. For example, `ServerLauncher.exe --sv_somebool=true`.

Additionally, you can add CVARs to [configuration files](/docs/user-guide/editor/console/#configuring-console-variables-in-configuration-files).

### Discovering CVARs

The fastest way to find all the CVARs settable in the current project is via the [console variables window](/docs/user-guide/editor/console/#viewing-the-console-window). Bringing up the console window will list all the CVARs in the current project as well as allow you to set their values.

You can also begin to type the start of a CVAR name in the console and then use the **Tab** key to show autocomplete and look at all the potential matches. For example, after typing `ed_` you can use **Tab** to cycle through all the CVARs that impact the editor.

![Automatic CVAR expansion in the console](/images/user-guide/appendix/cvars/console_autoexpand.png)

### CVAR console functions

There are built-in console commands that make working with CVARs easier:

| Name             | Description                                                                                                                                                   |
|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DumpCommandsVars | (Legacy) Will dump all the CVARs and their values to a file called `consolecommandsandvars.txt`.<br>Prefer to use the console window to see CVARs and values. | 
| resetcvars       | Resets all CVARs to their initial values.                                                                                                                     |

## Common CVAR prefixes

O3DE uses the following prefixes to make discovering CVARs easier:

| Prefix | Usage                                                                            |
|--------|----------------------------------------------------------------------------------|
| bg_    | **B**oth **G**ames, for common CVARs that can be used on both client and server. |
| cl_    | For client only CVARs.                                                           |
| ed_    | For editor only CVARs.                                                           |
| net_   | For low-level networking CVARs.                                                  |
| physx_ | For NVIDIA PhysX related CVARs.                                                  |
| r_     | For rendering related CVARs.                                                     |
| s_     | For sound related CVARs.                                                         |
| sv_    | For server only CVARs.                                                           |
| sys_   | For low-level core systems CVARs.                                                |

## Examples of CVARs in O3DE

Many O3DE features expose CVARs to aid debugging, troubleshooting and additional visualization. These features include:

* [Networking](/docs/user-guide/networking/settings/)
* [Navigation](/docs/user-guide/interactivity/navigation-and-pathfinding/recast-navigation/#visualizing-the-navigation-mesh)
* [Physics](/docs/user-guide/interactivity/physics/debugging/#physx-debug-console-variables)
