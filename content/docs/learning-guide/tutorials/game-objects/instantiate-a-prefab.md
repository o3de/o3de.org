---
linkTitle: Instantiate a prefab
title: Instantiate a prefab
description: Learn how to load an already existing prefab into the level in a few different ways via the Asset Browser, Entity Outliner, and Viewport.
weight: 200
toc: true
---

You can load an already existing prefab into the level in a few different ways via the Asset Browser, Entity Outliner, and Viewport.

## **Instantiating prefabs via the Entity Outliner**

With this option, where your prefab will be instantiated will depend on what, if anything, was selected first in the **Entity Outliner**. 

1.  In the **O3DE Editor**, create a [new level](https://www.o3de.org/docs/learning-guide/tutorials/environments/create-a-level/) or open an existing level.
2.  In the **Entity Outliner**, right-click on an entity or an empty area to reveal a context menu.
3.  In the context menu, select **Instantiate prefab**.  
    ![A](/images/learning-guide/tutorials/game-objects/instantiate-a-prefab/A.png)
4.  A **Pick Prefab** dialog box will appear.  
    ![B](/images/learning-guide/tutorials/game-objects/instantiate-a-prefab/B.png)
5.  In the **Pick Prefab** dialog box, search for and select a prefab, then select **OK**.

## **Instantiating prefabs via the Viewport**

With this option, where your prefab will be instantiated will depend on what, if anything, was selected first in the **Entity Outliner**. 

1.  Right-click anywhere within the **Viewport**, to reveal a context menu.
2.  In the context menu, select **Instantiate prefab**.
3.  A **Pick Prefab** dialog box will appear.
4.  In the **Pick Prefab** dialog box, search for and select a prefab, then select **OK**.
5.  Your selected prefab will appear in your level in both the **Viewport** and the **Entity Outliner**.

## **Instantiating prefabs via the Asset Browser**

With this option, the prefab will automatically be Instantiated under the level root.

***(Option 1)***

1.  In the **Asset Browser**, search for and select a prefab.
2.  Drag the prefab from the **Asset Browser** into an entity or an empty area within the **Entity Outliner**.

or

***(Option 2)***

1.  In the **Asset Browser**, search for and select a prefab.
2.  Drag the prefab from the **Asset Browser** into the **Viewport**. 

{{< note >}}
Dragging a prefab into the Viewport will automatically place the prefab directly under the level root.
{{< /note >}}

## **Instantiating a nested prefab**

1.  In the **Entity Outliner**, highlight select a prefab.
2.  Enter **Focus Mode.**
3.  Right-click on the prefab name or on a selected entity within the prefab, to reveal a contex menu.
4.  In the context menu, select **Instantiate prefab.**
5.  A **Pick Prefab** dialog box will appear.
6.  In the **Pick Prefab** dialog box, search for and select a prefab, then select **OK**.
7.  A new child prefab is created and nested directly under the prefab name or selected entity.