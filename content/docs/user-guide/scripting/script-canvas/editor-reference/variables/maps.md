---
title: Maps
description: Learn how to use key-value pair maps in the Open 3D Engine (O3DE) Script Canvas.
weight: 200
---

Maps in Script Canvas are containers of key-value pairs. In **Variable Manager**, maps are represented with a split-color rectangular icon.

![A map variable in the Script Canvas Variable Manager.](/images/user-guide/scripting/script-canvas/variable-map-containers-1.png)

**To create a map variable**

1. In the **Variable Manager**, do one of the following:
    * Choose **Create Variable**, and then choose **Map**.

    or

    * In the **Variable Type** search box, type **Map**, and then choose **Map**.

    ![Creating a map variable in Script Canvas.](/images/user-guide/scripting/script-canvas/variable-map-containers-2.png)

1. Enter information to create your map, and then click **Create**.

    ![Enter information to create a key-value pair map.](/images/user-guide/scripting/script-canvas/variable-map-containers-3.png)

    * For **Variable Name**, enter the name for your map variable.
    * For **Container Type**, use **Map**.
    * For **Key**, choose a data type for the key.
    * For **Value**, choose a data type for the value.
    * (Optional) To pin the map to the list of variables in the **Variable Manager**, select **Pin To Variable List**. Then, when you choose **Create Variable**, the map appears in the list as **Map<_`key_data_type`_,_`value_data_type`_>**. This is useful when you reuse the same key pair combination frequently.

    ![A map variable pinned to the variable list in the Variable Manager.](/images/user-guide/scripting/script-canvas/variable-map-containers-4.png)

### Map pin icons

You can use **Get** or **Set** nodes to get values from a map or make changes to the map. The data pins for the maps have square icons with two colors. One color represents the data type for the key, the other for the value.

![Dual-color map data pin icons.](/images/user-guide/scripting/script-canvas/variable-map-containers-5.png)

### Map operation nodes, data pin typing, and chaining

Maps use the same container operation nodes as arrays. As with arrays, data pins automatically take on the data types of the map to which they are connected, as the following image shows.

![Container operations for maps.](/images/user-guide/scripting/script-canvas/variable-map-containers-6.png)

As with arrays, maps provide a data output pin that you can use to chain operations on the same map.

![Chained map operations.](/images/user-guide/scripting/script-canvas/variable-map-containers-7.png)
