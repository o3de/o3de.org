---
linkTitle: Duplicate a prefab
title: Duplicate a prefab
description: Learn how to duplicate entities via the Entity Outliner and Viewport.
weight: 200
toc: true
---

You can duplicate entities via the Entity Outliner and Viewport.

## **Duplicating a single prefab**

1.  In the **Entity Outliner**, find or instantiate a prefab.
2.  With the prefab selected, right-click in either the **Entity Outliner** or **Viewport**, to reveal a context menu.
3.  In the context menu, select **Duplicate** (hotkey **Ctrl + D**).  
    ![A](/images/learning-guide/tutorials/game-objects/duplicate-a-prefab/A.png)
4.  In the **Entity Outliner**, a duplicate of the prefab is created underneath the original with matching names and hierarchies.  
    ![B](/images/learning-guide/tutorials/game-objects/duplicate-a-prefab/B.png)
5.  In the **Entity Inspector**, the duplicate of the prefab will have a different **Entity ID** than the original.  
    ![C](/images/learning-guide/tutorials/game-objects/duplicate-a-prefab/C.png)

## **Duplicating a prefab with a child prefab**

1.  In the **Entity Outliner**, find or instantiate a prefab with a nested prefab.
2.  With the root prefab selected, right-click in either the **Entity Outliner** or **Viewport**, to reveal a context menu.
3.  In the context menu, select **Duplicate** (hotkey **Ctrl + D**).
4.  In the **Entity Outliner**, a duplicate of the prefab and it's nested prefab is created underneath the original with matching names and hierarchies.
5.  In the **Entity Inspector**, the duplicate of the prefab and it's nested prefab will have a different **Entity ID** than the original.