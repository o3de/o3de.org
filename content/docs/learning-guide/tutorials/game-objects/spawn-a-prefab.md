---
linkTitle: Spawn a prefab
title: Spawn a prefab
description: Learn how to configure spawning and despawning prefabs, while in Game Mode, via Script Canvas.
weight: 200
toc: true
---

You can configure spawning and despawning prefabs, while in Game Mode, via Script Canvas.

## **Spawning a prefab**

**Setup**: You will need to find or create a prefab with a mesh component which can be plugged into a script canvas script.

In this example, you will be creating a script canvas script to spawn the prefab, when entering Game Mode, and then despawning the same prefab after a 3 second delay.

1.  In the **O3DE Editor**, create a [new level](https://www.o3de.org/docs/learning-guide/tutorials/environments/create-a-level/) or open an existing level.
2.  In the **Entity Outliner**, find or create a new entity with a **Script Canvas** component which will be your spawner entity.  
    ![A](/images/learning-guide/tutorials/game-objects/spawn-a-prefab/A.png)
3.   In the **Entity Inspector**, with the spawner entity selected, open the **Script Canvas Editor** via the **Script Canvas** component where you will create a new graph.  
    ![B](/images/learning-guide/tutorials/game-objects/spawn-a-prefab/B.png)

1.  In the **Variable Manager** panel, click **Create Variable +** and then select **SpawnableAsset** type.  
    ![C](/images/learning-guide/tutorials/game-objects/spawn-a-prefab/C.png)
2.  In the **Node inspector** panel, select a prefab you want to spawn in the **m\_asset** section.  
    ![D](/images/learning-guide/tutorials/game-objects/spawn-a-prefab/D.png)
3.  In the **Script Canvas Editor**, attach a **CreateSpawnTicket** node.  
    ![E](/images/learning-guide/tutorials/game-objects/spawn-a-prefab/E.png)
4.  In the **CreateSpawnTicket** node, right-click the Prefab input, select 'Convert to Reference', and then fill in your **SpawnableAsset** variable.  
    ![F](/images/learning-guide/tutorials/game-objects/spawn-a-prefab/F.png)
5.  Next, you will need to attach this to a **Spawn** Node.  
    ![G](/images/learning-guide/tutorials/game-objects/spawn-a-prefab/G.png)
6.  In the **Spawn** node, right-click the **SpawnTicket** output, select 'Convert to Reference', and then fill in your **SpawnTicketInstance** variable.  
    ![H](/images/learning-guide/tutorials/game-objects/spawn-a-prefab/H.png)
7.  You will need a workaround for manually clearing all SpawnTicket variables when the spawner entity is deactivated (aka Exiting **Game Mode**). One solution is to modify the graph to look like the screenshot below. 
{{< note >}}
You can mouse drag the **SpawnIntanceTicket** variable from the **Variable Manager** into the graph.
{{< /note >}}  
    ![I](/images/learning-guide/tutorials/game-objects/spawn-a-prefab/I.png)
8.  When entering **Game Mode** (hotkey **Ctrl +G**) your prefab will now spawn, at the position of the spawner enitity, and despawn when exiting **Game Mode**.
9.  Finally, in this example, we will add a 3 second delay to despawn the prefab by modifying the graph to use both a **Delay** and **Despawn** node which should look like the screenshot below. In the **Delay** node, enter '3' into the **Start Time** slot. In the **Despawn** node, right-click the **Spawnticket** input, select 'Convert to Reference', and then fill in your **SpawnTicketInstance** variable.  
    ![J](/images/learning-guide/tutorials/game-objects/spawn-a-prefab/J.png)
10.  If you haven't already, remember to **Save** (hotkey **Ctrl + S**) the scriptcanvas graph to disk.
11.  In the **Entity Inspector**, verify that the saved scriptcanvas graph is plugged into the spawner entity's **Script Canvas Source File** slot via the **Script Canvas** component.  
    ![K](/images/learning-guide/tutorials/game-objects/spawn-a-prefab/K.png)
12.  To verify that everything works, enter **Game Mode** (hotkey **Ctrl + G**). If everything is correct, you will see your prefab spawn into the level and then despawn after a 3 second delay.