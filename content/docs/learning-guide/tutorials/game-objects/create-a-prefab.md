---
linkTitle: Create a prefab
title: Create a prefab
description: Learn how to create prefabs in a few different ways via the Entity Outliner.
weight: 200
toc: true
---

You can create prefabs in a few different ways via the Entity Outliner.

## **Creating prefabs from an entity**

1.  In the **O3DE Editor**, create a [new level](https://www.o3de.org/docs/learning-guide/tutorials/environments/create-a-level/) or open an existing level.
2.  Create an entity (hotkey **Ctrl+Alt+N**).
3.  In the **Entity Outliner**, right-click the newly created entity to open a context menu.  
    ![A](/images/learning-guide/tutorials/game-objects/create-a-prefab/A.png)
4.  Select **Create Prefab...** to open a new save dialog box.
5.  In the new save dialog box, enter a name for the prefab.
6.  Choose **Save** to create the prefab.  
    ![B](/images/learning-guide/tutorials/game-objects/create-a-prefab/B.jpg)

## **Saving prefabs**

You will need to save a prefab to disk in order to retain newly made edits/changes.

1.  Right-click the prefab, to reveal a context menu.
2.  Select **Save prefab to file**.

## **Modifying a prefab**

 An asterisk **\*** will display to the right of the prefab's filename when it is modified.

![C](/images/learning-guide/tutorials/game-objects/create-a-prefab/C.jpg)

### **Focus Mode**

To make changes to a prefab you will have to enter the prefab editing mode (aka **Focus Mode**) which you can do in a few different ways.

***(Option 1)***

1.  Double click the prefab.

or

***(Option 2)***

1.  Right-click the prefab, to reveal a context menu.
2.  Select **Open/Edit prefab +**.

Once **Focus Mode** is activated, you will see the prefab turn from a collapsed dark blue capsule to an expanded light blue capsule displaying it's nested content.

![D](/images/learning-guide/tutorials/game-objects/create-a-prefab/D.jpg)

To exit **Focus Mode** you can either double click the prefab or Right-click, to reveal a context menu, and select **Close prefab**.

  

### **Renaming entites within a prefab**  

You can rename the prefab's entity root and it's children within the **Entity Inspector**.

## **Creating a nested prefab**

You can nest multiple entities and prefabs within a single prefab.

  

### **Nesting entities with a prefab**

***(Option 1)*** 


1.  In the **Entity Outliner**, highlight select a prefab.
2.  Enter **Focus Mode.**
3.  Right-click on the prefab name or on a selected entity within the prefab, to reveal a contex menu.
4.  In the context menu, select **Create entity** (hotkey ****Ctrl+Alt+N****)**.**
5.  A new child entity is created and nested directly underneath the prefab name or selected entity.

or

***(Option 2)*** 

1.  In the **Entity Outliner**, create multiple entities or create/instantiate multiple prefabs into the level.
2.  Drag select multiple entities and prefabs.
3.  In the Entity Outliner, right-click, while selected contents are highlighted, to reveal a context menu.
4.  Select **Create Prefab...** to open a new save dialog box.
5.  In the new save dialog box, enter a name for the prefab.
6.  Choose **Save** to create the new nested prefab.