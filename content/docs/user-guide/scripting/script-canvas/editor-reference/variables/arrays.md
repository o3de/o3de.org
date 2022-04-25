---
title: Arrays
description: Learn how to use array variable types in the Open 3D Engine (O3DE) Script Canvas.
weight: 100
---

Arrays provide a dynamic continuous area of memory that can hold storage of a given type.

**To create an array variable**

1. In the **Variable Manager**, do one of the following:
    * Choose **Create Variable**, and then choose **Array**.

    or

    * In the **Variable Type** search box, type **Array**, and then choose **Array**.

    ![Creating an array variable in Script Canvas.](/images/user-guide/scripting/script-canvas/variable-array-containers-1.png)

1. Enter information to create your array, and then choose **Create**.

    ![Enter information to create your array.](/images/user-guide/scripting/script-canvas/variable-array-containers-2.png)

    * For **Variable Name**, enter the name for your array variable.
    * For **Container Type**, use **Array**.
    * For **Type**, choose the data type for the array.
    * (Optional) To pin the array to the list of variables in the **Variable Manager**, select **Pin To Variable List**. Then, when you choose **Create Variable**, the array appears in the list as **Array<_`data_type`_>**. This is useful when you reuse the same type frequently.

    ![Array variable pinned to the variable list in Variable Manager.](/images/user-guide/scripting/script-canvas/variable-array-containers-3.png)

### Array pin icons

Some nodes, like **OnEntitiesSpawned** or **Get String Array**, provide data as arrays. The data pins for the arrays on such nodes have a square icon. The color of the icon shows the data type for the array.

![Array data pins color-coded by data type.](/images/user-guide/scripting/script-canvas/variable-array-containers-4.png)

### Array operation nodes

In the **Node Palette**, the **Containers** section has nodes that you can use to add, get, and remove elements from arrays.

![Container node operations.](/images/user-guide/scripting/script-canvas/variable-array-containers-5.png)

* **Add Element at End** - Adds the element at the end of the container.
* **Clear All Elements** - Removes all elements from the container.
* **Erase** - Erases the element at the specified index or key.
* **For Each** - Iterates through each element of a container.
* **Get Element** - Returns the element at the specified index or key.
* **Get First Element** - Returns the first element in the container.
* **Get Last Element** - Returns the last element in the container.
* **Get Size** - Returns the number of elements in the container.
* **Insert** - Inserts an element into the container at the specified index or key.
* **Is Empty** - Returns whether the container is empty.

All container operation nodes have an **In** pin and a **Source** pin.

All pins have an **Out** pin except **For Each**, which has an **Each** pin that is signalled after each element in the container. The **For Each** node also has a **Break** pin and a **Finished** pin. The **Break** pin stops the iteration when signalled. The **Finished** pin is signalled when all of the elements in the container have been iterated over or the iteration is stopped by the **Break** pin.

![For Each node connection pins.](/images/user-guide/scripting/script-canvas/variable-array-containers-6.png)

#### Automatic data pin typing

The pins on container operation are context-sensitive. Data input and output pins automatically take on the data type of the pin to which they are connected.

**Example**

In the following example, the array type is `string`.

![Connecting a Get container node to a container operation node.](/images/user-guide/scripting/script-canvas/variable-array-containers-7.png)

When you connect the **Array\<String\>** pin to the **Source** pin on the **Add Element at End** node, the following changes occur automatically:

* The **Source** pin changes to the `string` type.
* The **Add Element at End** node box expands to include a **String** text box where you can enter a string value.
* The pin icon and line colors change to the color of the data type that you are using. In the case of this example, the color is blue.
* A **Container** pin for chaining output appears on the target node.

![Example of automatic data pin typing.](/images/user-guide/scripting/script-canvas/variable-array-containers-8.png)

#### Chaining Array Operation Nodes

Array operation nodes typically have a **Container** output pin. You can use this output pin to chain several operations on the same array, as the following image shows.

![Chained array operation nodes.](/images/user-guide/scripting/script-canvas/variable-array-containers-9.png)
