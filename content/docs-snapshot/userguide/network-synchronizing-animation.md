# Synchronizing Animations Across a Network<a name="network-synchronizing-animation"></a>

You can use the **[AnimGraph](component-animgraph.md)** component to add an animation graph and motion set to a character\. To synchronize the **AnimGraph** component's parameters \(its EMotion FX animation state\) across the network, use these two components:
+ **[Network Binding](component-network-binding.md)**
+ **[Anim Graph Net Sync](component-animgraph-netsync.md)**

The **Anim Graph Net Sync** component, which is included with the [**EMotion FX Animation**](gems-system-gem-emotionfx-animation.md) gem, requires the **Network Binding** component\. You can add the **Anim Graph Net Sync** component to any entity that has the **Anim Graph** component\.

**Topics**
+ [Adding Animation Synchronization to an Entity](#network-synchronizing-animation-adding-to-an-entity)
+ [Running the Samples Project in a Server and Client Configuration](#network-synchronizing-animation-testing-with-server-and-client-launchers)

## Adding Animation Synchronization to an Entity<a name="network-synchronizing-animation-adding-to-an-entity"></a>

The following procedure shows how to add the **Network Binding** and **Anim Graph Net Sync** components to the Rin character in the [Advanced\_RinLocomotion Sample](animation-editor-rin-locomotion-sample.md) level of the [Samples Project](sample-project-samples.md)\.

**To add animation synchronization to an entity**

1. In the **Project Configurator**, do the following:

   1. Follow the steps in [Choosing a Game Project to Open](configurator-projects.md#project-configurator-launch-projects) to set the **SamplesProject** as your default project\.

   1. Follow the steps in [Enabling Gems](gems-system-using-project-configurator.md) to enable the **Multiplayer** gem for the Samples Project\.

1. Close the **Project Configurator**, and then [launch Lumberyard Editor](lumberyard-editor-intro.md)\.

1. In Lumberyard Editor, choose **File**, **Open Level**, or press **Ctrl\+O**\.

1. In the **Open a Level** dialog box, under **Levels**, **Samples**, choose **Advanced\_RinLocomotion**, and then click **Open**\.

1. Choose **Tools**, **Entity Inspector**\.

1. In the viewport, zoom in and select the Rin character\.  
![\[Select the Rin character in the viewport.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-synchronizing-animation-1.png)

1. In the **Entity Inspector**, ensure that **Rin** appears in the **Name** field\.

1. In the **Entity Inspector** search box, enter **anim**\.  
![\[AnimGraph component properties for the Rin character in the Entity Inspector.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-synchronizing-animation-2.png)

   The **AnimGraph** component for Rin has four parameters:
   + `movement_speed`
   + `movement_direction`
   + `attacking`
   + `jumping`

   Changes in these parameters are replicated to other network peers after you add the **Network Binding** and **Anim Graph Net Sync** components\.

1. In the **Entity Inspector**, choose **Add Component**\.

1. In the **Entity Inspector** search box, enter **Network**\.

1. Choose **Network Binding**\.  
![\[Adding the Network Binding component in the Entity Inspector.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-synchronizing-animation-3.png)

1. In the **Entity Inspector**, click **Add Component**\.

1. In the **Entity Inspector** search box, enter **anim**\.

1. Choose **Anim Graph Net Sync**\.  
![\[Adding the Anim Graph Net Sync component in the Entity Inspector.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-synchronizing-animation-4.png)

   The **Anim Graph Net Sync** component is added to the **Rin** entity\.  
![\[The Anim Graph Net Sync component properties in the Entity Inspector.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-synchronizing-animation-5.png)

   By default, the **Anim Graph Net Sync** component synchronizes only the animation parameters\. For greater precision, you can also choose to synchronize **active nodes** and **motion nodes**, which uses more network bandwidth\.

1. Choose **File**, **Save** or press **Ctrl\+S** to save the level\.

## Running the Samples Project in a Server and Client Configuration<a name="network-synchronizing-animation-testing-with-server-and-client-launchers"></a>

Now that you have added the **Net Binding** and **Anim Graph Net Sync** components to the Rin entity, you can test the synchronization by running server and game launcher applications\.

**To test the animation graph network synchronization**

1. In Lumberyard Editor, choose **Game**, **Export to Engine**, or press **Ctrl\+E** to export your level to the Samples Project game launcher\.

1. In the message box that reports **The level was successfully exported**, click **OK**\.

1. Open a Windows command console on the `lumberyard_version\dev\Bin` directory that you are using\.
   + For Visual Studio 2017, the directory is `lumberyard_version\dev\Bin64vc141\`\.
   + For Visual Studio 2019, the directory is `lumberyard_version\dev\Bin64vc142\`\.

1. Run the following command to start the server:

   ```
   SamplesProjectLauncher.exe +mphost +map advanced_rinlocomotion
   ```

1. Wait until the server game is running and the Rin character renders fully\.

1. Press **Alt\+Tab** to return to the command prompt\.

1. Run the following command to start and connect the client:

   ```
   SamplesProjectLauncher.exe +mpjoin
   ```

1. Wait until the client game is running and the Rin character renders fully\.

1. Press **Alt\+Tab** to return to the server application\.

1. Use the following keys to control the Rin character:
   + To move forward, left, backward, and right, press the **W**, **A**, **S**, and **D** keys, respectively\.
   + To look around, move the pointer\.
   + To attack, press the left mouse button\.
   + To jump, press the **Space** key\.

1. Observe how, as you move the Rin character in the server application, the Rin character in the client application performs the same movements as its counterpart in the server\.

1. In the server application, press the backtick key \(**`**\) to open the console, and then enter **quit**\.

1. In the client application, press the backtick key \(**`**\) to open the console, and then enter **quit**\.