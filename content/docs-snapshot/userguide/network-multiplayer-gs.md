# Tutorial: Getting Started with Multiplayer<a name="network-multiplayer-gs"></a>

This tutorial walks you through the steps to create a simple multiplayer test game level\. These steps include binding an entity to the network and connecting a client to the host\. At the end of the tutorial, you should have a level with a simple network bound entity that is ready for a multiplayer game\.

This tutorial guides you through the following tasks:
+ Create a level and add entities\.
+ Bind an entity’s **Transform** component to the network\.
+ Connect a client to the server and verify network replication\.

## Prerequisites<a name="network-multiplayer-gs-prerequisites"></a>

This tutorial assumes the following:
+ You installed Amazon Lumberyard\.
+ You created a game project\. For more information, see [Creating and Switching Game Projects](configurator-projects.md)\.
+ Your game project has the **Multiplayer** gem\. You can enable the gem in Lumberyard's [Project Configurator](configurator-intro.md)\. After enabling the gem, [build your project](game-build-intro.md)\.

**Note**  
This tutorial uses Visual Studio 2017\.

**Topics**
+ [Prerequisites](#network-multiplayer-gs-prerequisites)
+ [Step 1: Creating a Level and Adding a Sphere and a Box](#network-multiplayer-gs-step-1-create-a-level-and-add-a-sphere-and-a-cube)
+ [Step 2: Binding Sphere Transform Components to the Network](#network-multiplayer-gs-step-2-binding-sphere-transform-components-to-the-network)
+ [Step 3: Connecting a Client to the Server](#network-multiplayer-gs-step-3-connect-a-client-to-the-server)
+ [Related Tasks and Tutorials](#network-multiplayer-gs-related-tasks-and-tutorials)
+ [Configuring the Multiplayer Sample for Amazon GameLift](network-multiplayer-gs-gamelift.md)

## Step 1: Creating a Level and Adding a Sphere and a Box<a name="network-multiplayer-gs-step-1-create-a-level-and-add-a-sphere-and-a-cube"></a>

Your first step is to create a level and prepare a simple sphere and box shape so that you can test Lumberyard's networking features\.

**To create a level, sphere, and box**

1. In the Lumberyard Project Configurator, select a project that has the Multiplayer gem enabled, and then click **Set as default**\.

1. Open Lumberyard Editor, create a level, and enter a name\.  
![\[Create a level in Lumberyard Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-multiplayer-gs-1.png)

1. In the Lumberyard Editor viewport, right\-click and choose **Create entity**\.

1. With the entity selected, click **Tools**, **Entity Inspector**\. Use the **Entity Inspector** to name the entity **CameraEntity**\.

1. Click **Add Component**\.

1. Select the **Camera** component to attach it to the entity\.  
![\[Attach a Camera component to the camera entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-multiplayer-gs-2.png)

1. In the Lumberyard Editor viewport, right\-click and choose **Create entity**\.

1. With the entity selected, use the **Entity Inspector** to name the entity **SphereEntity**\.

1. In the **Entity Inspector**, click **Add Component**, **Rendering**, **Mesh** to attach a **Mesh** component to the **SphereEntity**\.  
![\[Adding a Mesh component to the SphereEntity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-multiplayer-gs-3.png)

1. In the **Mesh** component, click the \(**…**\) icon next to **Mesh asset**\.  
![\[Click the ellipsis next to Mesh asset\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-multiplayer-gs-4-mesh-asset-ellipsis.png)

1. In the **Pick Static Mesh** window, expand **Engine**, **Objects**, **default**, and select **`primitive_sphere.cgf`**\.  
![\[In the Pick Static Mesh window, choose primitive_sphere.cgf.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-multiplayer-gs-4-pick-static-mesh.png)

1. Click **OK**\.

1. In the viewport, right\-click and choose **Create entity**\.

1. With the entity selected, use the **Entity Inspector** to name the entity **BoxEntity**\.

1. In the **Entity Inspector**, click **Add Component**, **Rendering**, **Mesh** to attach a **Mesh** component to the **BoxEntity**\.

1. In the **Mesh** component, click the \(**…**\) icon next to **Mesh asset**\.

1. In the **Pick Static Mesh** window, under **Engine**, **Objects**, **default**, select **`primitive_cube.cgf`**\.

1. Click **OK**\.

1. In the viewport, select the **SphereEntity**\. In the **Entity Inspector**, click **Add Component**, **Physics**, **Rigid Body Physics**\.  
![\[Choose the Rigid Body Physics component for the sphere entity\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-multiplayer-gs-sphere-entity-rigid-body-physics.png)

1. Select the **BoxEntity**\. In the **Entity Inspector**, click **Add Component**, **Physics**, **Rigid Body Physics**\.

1. Select the **SphereEntity**\. In the **Entity Inspector**, click **Add Component**, **Physics**, **Mesh Collider**\.  
![\[Choose the Mesh Collider component for the sphere entity\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-multiplayer-gs-sphere-entity-mesh-collider.png)

1. Select the **BoxEntity**\. In the **Entity Inspector**, click **Add Component**, **Physics**, **Mesh Collider**\.

1. In the viewport, move the sphere and box entities above the plane so that they have room to fall\.

   **To move the sphere and box entities above the plane**

   1. In the viewport, select the entity\. 

   1. On the **EditMode** toolbar, choose the **Move** ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-multiplayer-gs-editmode-move-icon.png) icon\. 

   1. On the **EditMode** toolbar, choose the **Constrain to Z Axis** ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-multiplayer-gs-editmode-z-icon.png) icon\.

   1. In the viewport, drag the item up vertically\.

1. In the **Entity Inspector**, **Rigid Body Physics** component, ensure that **At rest initially** is unchecked\. This allows the sphere and box to begin simulating after the level is loaded\.  
![\[Ensure that the At rest initially property is unchecked\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-multiplayer-gs-5.png)

You now have two simple component entities with rigid body physics in the level that you created\.

## Step 2: Binding Sphere Transform Components to the Network<a name="network-multiplayer-gs-step-2-binding-sphere-transform-components-to-the-network"></a>

After you create the initial level with the sphere and the box, you bind the sphere’s **Transform** component to the network\. This allows the sphere's changes to be replicated over the network to clients\. 

**To bind the sphere’s transform to the network**

1. Select the sphere entity\. 

1. In the **Entity Inspector**, click **Add Component**, **Networking**, **Network Binding**\. Adding the **NetBinding** component to the entity allows the host to replicate the **Transform** component of the sphere to all clients\.  
![\[Add a Network Binding component to an entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-multiplayer-gs-6.png)

1. With the sphere entity selected, in the **Transform** component, ensure that the **Network Sync**, **Sync to replicas** property is enabled\.  
![\[Ensure that Sync to replicas property is enabled\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-multiplayer-gs-sync-to-replicas.png)

You have now created a server authoritative sphere entity that enables changes to the sphere to replicate over the network\. However, you didn't bind the box to the network, so changes in the box will remain unreplicated\.

## Step 3: Connecting a Client to the Server<a name="network-multiplayer-gs-step-3-connect-a-client-to-the-server"></a>

This step shows you how to connect a client to the server instance and then observe your networked sphere in action\.

**To connect a client game to the host game**

1. In Lumberyard Editor, choose **Game**, **Export to Engine**, or press **Ctrl\+E** to export your level\.

1. Run the game launcher from the `Bin` directory that you are using\. The name of your launcher is `your_game_project_nameLauncher.exe`\.

   For Visual Studio 2017, the directory is `lumberyard_version\dev\Bin64vc141\`\. 

   For Visual Studio 2019, the directory is `lumberyard_version\dev\Bin64vc142\`\. 

1. Press the **`** key \(above the **Tab** key\) to open the console\.

1. Run the command map *MultiplayerTutorial* where *MultiplayerTutorial* is the name of the level to load\.  
![\[Run the map command\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-multiplayer-gs-7.png)

1. Press the **`** key to open the console\. Run the command mphost to make your client host a network session\.  
![\[Run the mphost command\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-multiplayer-gs-8.png)

1. Move the first launcher window to one side so that you will be able to see the second launcher window\. Use the launcher again to open a second instance of the game\. Press the **`** key to open the second console\.

1. Run the command sv\_port 0 to set the client port to `0` \(the ephemeral port\)\.
**Note**  
On a single computer, only one process is allowed to bind to a particular port\. Therefore, to run more than one game process on the same computer \(as in this multiplayer sample\), you must use ephemeral ports\. The `sv_port` console variable defines the UDP port on the local machine for the multiplayer sample, and the setting of `0` specifies the ephemeral port\. This allows two clients on the same computer to talk to each other\.

1. Run the command mpjoin to join to the host game\. You should see the sphere synchronized by location on the client\. However, the box will be desynchronized and have different locations on the client and host\.  
![\[Synchronized sphere\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-multiplayer-gs-9.png)

You have successfully created a simple networked level\. You can now use the **Network Binding** component to connect clients to servers and synchronize transforms of entities\.

## Related Tasks and Tutorials<a name="network-multiplayer-gs-related-tasks-and-tutorials"></a>

You have created a simple networking sample to see the effects of networking in Lumberyard\. See the following to learn more about what else you can add to your game:
+  [Configuring the Multiplayer Sample for Amazon GameLift](network-multiplayer-gs-gamelift.md) 
+ [Using Amazon GameLift](https://docs.aws.amazon.com/lumberyard/latest/userguide/network-gamelift-using.html)