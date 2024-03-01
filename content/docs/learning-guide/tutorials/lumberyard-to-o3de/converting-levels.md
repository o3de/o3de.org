---
linkTitle: Converting Levels
title: Converting Levels
description: Learn how to convert Lumberyard .slice and .ly files to O3DE .prefab
weight: 400
toc: true
---

This tutorial teaches you how to use **SerializeContextTools** to convert legacy level files (*.ly*, *.slice*) to O3DE prefabs.

| O3DE Experience | Time to Complete | Feature Focus | Last Updated |
| - | - | - | - |
| Intermediate | 15 Minutes | Convert `.ly` and `.slice` files to `.prefab` and test them in O3DE | February 27, 2024 |

{{< note >}}
This is a C++ tool located in the O3DE project. You will need to build this tool yourself in order to use it. Check [Settings up O3DE from GitHub](/docs/welcome-guide/setup/setup-from-github/) to learn how to make your O3DE solution.
{{< /note >}}

## Launch the Legacy Asset Converter application



![Serialize Context Tools project](/images/learning-guide/tutorials/lumberyard-to-o3de/serialize-context-tools.png)


```cmd
convert-slice -specializations=editor -project-path=YOUR_LUMBERYARD_REPO\dev\StarterGame -files=YOUR_LUMBERYARD_REPO\dev\StarterGame\Levels\*.ly -slices=YOUR_LUMBERYARD_REPO\dev\Gems\StarterGame\*.slice,YOUR_LUMBERYARD_REPO\dev\StarterGame\slices\*.slice
```

![Launch arguments](/images/learning-guide/tutorials/lumberyard-to-o3de/serialize-context-tools-launch.png)


## Copy the prefab files to your O3DE project

Todo

## Open and edit the converted level

Todo


![StarterGame level prefab](/images/learning-guide/tutorials/lumberyard-to-o3de/starter-game-prefab.png)

