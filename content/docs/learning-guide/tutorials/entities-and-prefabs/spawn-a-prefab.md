---
linktitle: Spawn and Despawn
title: Spawn and Despawn a Prefab
description: Learn to spawn and despawn prefabs with Script Canvas in Open 3D Engine (O3DE).
weight: 300
toc: true
---

In this tutorial, you'll learn how to spawn and despawn prefab instances in **Open 3D Engine (O3DE)**. You'll create a prefab to spawn, create a spawner entity, assemble a spawning script with [Script Canvas Editor](/docs/user-guide/scripting/script-canvas/get-started/editor-interface), and test the results. You should be familiar with [entity and prefab basics](entity-and-prefab-basics) before working through this tutorial.

## Create a prefab

Follow the steps in this section to create a prefab to spawn. If you already have a prefab to use for this tutorial, skip ahead to the next section, [Create a spawner entity](#create-a-spawner-entity). 

1. In **O3DE Editor**, create an entity with a **Mesh** component. You can use any available mesh for this tutorial. Drag a `.azmodel` from **Asset Browser** into the viewport to create an entity with a **Mesh** component.

1. Right-click the new entity in **Entity Outliner** and choose **Create Prefab...** from the context menu.

    {{< image-width "/images/learning-guide/tutorials/entities-and-prefabs/create-prefab.png" "450" "Creating a prefab from an entity." >}}

1. In the **Save As...** window, navigate to a directory in your project, such as the `Prefabs` directory, supply a name for the prefab, and choose **Save**.

1. The entity you created has been converted to an instance of the prefab you just saved. You'll create a script to spawn a prefab instance, so you can remove this instance from the level. Select the prefab instance in Entity Outliner and press **Delete** to remove it.

## Create a spawner entity 

In this section, you'll create an entity that runs the script that spawns the prefab instance.

1. Create a new entity named `Spawner`.

1. Ensure the new entity is placed in the camera view by dragging the entity in the viewport with the translate gizmo. You can display the camera's view frustum by choosing the {{< icon helpers.svg >}} **Helpers** button at the top of the viewport and selecting **Helpers** from the list.

    {{< image-width "/images/learning-guide/tutorials/entities-and-prefabs/viewport-helpers.png" "900" "Placing an entity in the camera frustum." >}}

1. Add a **Script Canvas** component to the spawner entity. In **Entity Inspector**, choose **Add Component** and select **Script Canvas** from the component list.

1. Press **Ctrl + S** to save the level with the spawner entity.

1. In the **Script Canvas** component, click the {{< icon open-in-internal-app.svg >}} **Open application** button to open Script Canvas Editor.

    ![Open Script Canvas Editor from the Script Canvas component.](/images/learning-guide/tutorials/entities-and-prefabs/open-script-canvas-editor.png)

## Spawn a prefab

In this section, you'll create a script that spawns a prefab. You'll learn the basics of Script Canvas Editor including creating variables, placing and connecting nodes, and using references.

1. Script Canvas Editor opens with an empty graph canvas window. For this script, you'll use **On Graph Start** for the entry point so that the script logic runs immediately when the spawner entity is activated. In the **Node Palette**, expand the **Timing** group. Drag an **On Graph Start** node into the graph canvas window. Script Canvas creates an new node graph automatically.

    {{< video src="/images/learning-guide/tutorials/entities-and-prefabs/on-graph-start.mp4" info="Add On Graph Start node in script canvas." autoplay="true" loop="true" >}}

1. The script needs to reference the prefab that you want to spawn. Create a variable to reference the prefab with the following steps:

    1. In **Variable Manager**, choose **Create Variable**, and select **SpawnableScriptAssetRef** from the variable type list.

    2. Give the **SpawnableScriptAssetRef** variable a name. In **Node Inspector**, enter `PrefabRef` in the **Name** property.

    3. Add the prefab you want to spawn to the variable. In Node Inspector, choose the {{< icon file-folder.svg >}} **File** button and select the prefab you want to spawn for the **asset** property.

    ![Setting up a SpawnableScriptAssetRef variable.](/images/learning-guide/tutorials/entities-and-prefabs/prefabref-variable.png)

1. The script needs a variable that holds information about the spawned prefab instance. Create one with the following steps:

    1. In Variable Manager, choose **Create Variable**, and select **EntitySpawnTicket** from the variable type list.

    2. Give the **EntitySpawnTicket** variable a name. In Node Inspector, enter `SpawnTicket` in the **Name** property.

1. Add a **Create Spawn Ticket** node to the graph canvas. Use the search field at the top of the Node Palette to filter the node list. Drag a **Create Spawn Ticket** node into the graph canvas to the right of the **On Graph Start** node.

    {{< note >}}You can also right-click in the graph canvas to access the node list.
    {{< /note >}}

1. Connect the nodes. Drag from the **Out** pin on the **On Graph Start** node to the **Create Ticket** pin on the **Create Spawn Ticket** node to connect the nodes.

    {{< video src="/images/learning-guide/tutorials/entities-and-prefabs/connect-nodes.mp4" info="Click and drag to connect Script Canvas nodes." autoplay="true" loop="true" >}}

1. Add the prefab reference to the **Create Spawn Ticket** node. Right-click on the **Prefab** pin and select **Convert to Reference** from the context menu. The property is automatically set to the **PrefabRef** variable you created in step 1. You can choose the {{< icon settings.svg>}} **Settings** button in the **Prefab** field to select a variable reference if necessary.

    ![Set the prefab reference on the Create Spawn Ticket Script Canvas Node.](/images/learning-guide/tutorials/entities-and-prefabs/set-prefab-reference.png)

1. Add a **Spawn** node from the **Prefab/Spawning** node group to the graph canvas and connect it to the **Create Spawn Ticket** node with the following steps:

    1. Connect the **Ticket Created** pin from the **Create Spawn Ticket** node to the **Request Spawn** pin of the **Spawn** node.

    2. Connect the **SpawnTicket** pin from the **Create Spawn Ticket** node to the **SpawnTicket** pin of the **Spawn** node.

    {{< image-width "/images/learning-guide/tutorials/entities-and-prefabs/connect-spawn-node.png" "900" "Connect the Spawn node to the Create Spawn Ticket node.">}}

1. In addition to spawning prefab instances, the **Spawn** node also needs to populate the **SpawnTicket** variable with data. On the **Spawn** node, right-click on the **SpawnTicketOut** pin and select **Convert to Reference** from the context menu. The property is automatically set to the **SpawnTicket** variable you created in step 2. You can choose the {{< icon settings.svg>}} **Settings** button in the **SpawnTicketOut** field to select a variable reference if necessary.

    ![Set the prefab reference on a Create Spawn Ticket Script Canvas Node.](/images/learning-guide/tutorials/entities-and-prefabs/spawn-ticket-out-ref.png)

1. Press **Ctrl + S** to save the script. In the **Save As** window, name the file `spawn-despawn-prefab.scriptcanvas` and choose **Save**.

The script you've created thus far spawns a prefab instance at the spawner entity's location when it's activated. You can add the script to the spawner entity's **Script Canvas** node, and press **Ctrl + G** to test the script. In the final steps of the tutorial you'll learn how to despawn a prefab.

## Delay and despawn

In this section, you'll add a three second delay to the script, after which, the prefab despawns.

1. Add a **Delay** node from the **Timing** group to the graph canvas and connect it with the following steps:

    1. Connect the **On Spawn Completed** pin of the **Spawn** node to the **Start** pin of the **Delay** node.

    1. On the **Delay** node, set the **Start Time** property to `3` to create a three second delay.

1. Add a **Despawn** node from the **Prefab/Spawning** group to the graph canvas and connect it with the following steps:

    1. Connect the **Done** pin of the **Delay** node to the **Request Despawn** pin of the **Despawn** node.

    1. On the **Despawn** node, right-click on the **SpawnTicket** pin and select **Convert to Reference** from the context menu. The property is automatically set to the **SpawnTicket** variable you created. You can choose the {{< icon settings.svg>}} **Settings** button in the **SpawnTicket** field to select a variable reference if necessary.

1. Press **Ctrl + S** to save the script. The following image displays the complete Script Canvas graph.

    {{< image-width "/images/learning-guide/tutorials/entities-and-prefabs/final-script-canvas.png" "900" "The final script canvas graph.">}}

## Test the results

Now you'll add the script to the spawner entity and test the script.

1. In O3DE Editor, select the spawner entity.

1. In Entity Inspector, In the **Script Canvas** component, choose the {{< icon browse-edit-select-files.svg >}} file browser icon and select the `spawn-despawn-prefab.scriptcanvas` file you created.

    ![Set the script canvas file property](/images/learning-guide/tutorials/entities-and-prefabs/set-script-canvas-source.png)

1. Press **Ctrl + G** to run the level and test the script.

    {{< video src="/images/learning-guide/tutorials/entities-and-prefabs/spawn-despawn-finished.mp4" info="Click and drag to connect Script Canvas nodes." autoplay="true" loop="true" >}}

## Conclusion and next steps

Congratulations! You've learned to spawn and despawn a prefab instance. These are critical concepts to working in O3DE. Here are some ideas for building on what you've learned in this tutorial:

* Can you randomize the delay before despawning the prefab instance?
* See if you can work out how to spawn the prefab instance at a location of your choosing. Hint: Play with the transform properties on the **Spawn** Script Canvas node.
* Can you spawn multiple prefab instances at different locations from a single spawner entity?