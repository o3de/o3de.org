---
title: CVARs
---

Console variables (CVARs) can be used to set various editor and runtime options in O3DE. O3DE ships with many built-in CVARs. 

## Working with CVARs
You can define your own CVARs in code using the [CVAR macro functions](/docs/user-guide/programming/az-console/#console-variables-cvars).

You can invoke CVARs in the Editor via the [console](/docs/user-guide/editor/console/).

You can also pass CVARs on the command line when launching O3DE binaries via `--{cvar name} {value}` or `--{cvar name}={value}`. For example, `ServerLauncher.exe --sv_somebool=true`.

## Common CVAR prefixes
O3DE prefers to use the following prefixes for certain groups of CVARs:

| Prefix | Usage                                                                        |
|--------|------------------------------------------------------------------------------|
| bg_    | *B*oth *G*ames, for common CVARs that can be used on both client and server. |
| cl_    | For client only CVARs.                                                       |
| ed_    | For editor only CVARs.                                                       |
| net_   | For low-level networking CVARs.                                              |
| r_     | For rendering related CVARs.                                                 |
| s_     | For sound related CVARs                                                      |
| sv_    | For server only CVARs.                                                       |


