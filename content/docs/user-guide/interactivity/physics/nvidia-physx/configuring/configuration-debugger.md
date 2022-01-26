---
linkTitle: Debugger Configuration
title: Debugger Configuration
description: ' Configure debugging for the PhysX system in Open 3D Engine. '
weight: 400
---

In **PhysX Configuration**, you can specify how to interact with **PhysX Visual Debugger (PVD)**. PhysX Visual Debugger is a third-party application that records your PhysX data from **O3DE Editor**. You can then review this data to see how your physics effects appear.

For more information, see NVIDIA [PhysX Visual Debugger](https://docs.nvidia.com/gameworks/content/gameworkslibrary/physx/guide/Manual/VisualDebugger.html#physxvisualdebugger) documentation.

## Install PhysX Visual Debugger

1. To get started, [download](https://developer.nvidia.com/physx-visual-debugger) PhysX Visual Debugger.

    {{< note >}}
You must have a NVIDIA account to download PhysX Visual Debugger. If you don't already have an account, create and sign in to your account.
{{< /note >}}

1. Follow the installation steps.

1. After you install the application, open PhysX Visual Debugger. This application must be running if you want to record data from O3DE Editor.

1. In O3DE Editor, open a level or create one that has entities with PhysX components. For example, you can create a simple dynamic entity that responds to gravity.

## Configure PhysX Debugger in O3DE

1. In O3DE Editor, choose **Tools**, **PhysX Configuration**.

1. Click the **Debugger** tab.

1. You can specify the following settings.

    ![PhysX Visual Debugger settings.](/images/user-guide/interactivity/physics/nvidia-physx/configuring/physx-configuration-debugger-1.png)

1. To verify that PhysX Visual Debugger is connected to O3DE, for **PVD Auto Connect**, choose **Game** or **Editor** and then enter game or editor mode. Depending on what you choose, the following message appears in the **Editor Console**.

    ```
    (PhysX) - Successfully connected to PhysX Visual Debugger.
    ```

1. Open PhysX Visual Debugger to view the recorded information.

    **Example:**
    
    ![Review the recorded data from O3DE Editor in PhysX Visual Debugger.](/images/user-guide/interactivity/physics/nvidia-physx/configuring/physx-configuration-debugger-2.png)

1. You can also manually connect or disconnect from PhysX Visual Debugger using the following console variable commands.

   ```
   physx_PvdConnect
   ```

   ```
   physx_PvdDisconnect
   ```

   For more information, see [Debugging PhysX](/docs/user-guide/interactivity/physics/debugging/).
