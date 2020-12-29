# Debugger Configuration<a name="physx-configuration-debugger"></a>

In the **PhysX Configuration** tool, you can specify how to interact with the PhysX Visual Debugger \(PVD\)\. The PVD is a third\-party application that records your PhysX data from Lumberyard Editor\. You can then review this data to see how your physics effects appear\.

For more information, see the NVIDIA [PhysX Visual Debugger \(PVD\)](https://docs.nvidia.com/gameworks/content/gameworkslibrary/physx/guide/Manual/VisualDebugger.html#physxvisualdebugger) documentation\.

**To configure the PhysX Visual Debugger**

1. To get started, [download](https://developer.nvidia.com/physx-visual-debugger) the PVD\. 
**Note**  
You must have a NVIDIA account to download the PVD\. If you don't already have an account, follow the steps to create and then sign in your account\. 

1. Follow the installation steps\.

1. After you install the application, open the PVD\. This application must be running if you want to record data from Lumberyard Editor\.

1. In Lumberyard Editor, open a level or create one that has entities with PhysX components\. For example, you can create a dynamic entity that falls\. For more information, see [Creating a Dynamic PhysX Entity](component-physx-rigid-body-physics.md#example-creating-dynamic-game-entity)\.

1. In Lumberyard Editor, choose **Tools**, **PhysX Configuration**\.

1. Click the **Debugger** tab\.

1. You can specify the following settings\.  
![\[PhysX Visual Debugger settings.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx-configuration-debugger-1.png)  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/physx-configuration-debugger.html)

1. To verify that the PVD is connected to Lumberyard, for **PVD Auto Connect**, choose **Game** or **Editor** and then enter gameplay or editor mode\. Depending on what you choose, the following message appears in the console\.

   ```
   (PhysX) - Successfully connected to the PhysX Visual Debugger (PVD).
   ```

1. Open the PhysX Visual Debugger to view the recorded information\.   
**Example**    
![\[Review the recorded data from Lumberyard Editor in the PhysX Visual Debugger.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx-configuration-debugger-2.png)

1. You can also manually connect or disconnect from the PVD using the following console variable commands\.

   ```
   physx_PvdConnect
   ```

   ```
   physx_PvdDisconnect
   ```

   For more information, see [Debugging PhysX](debugging-physx.md)\.