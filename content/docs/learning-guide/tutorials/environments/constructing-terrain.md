---
linkTitle: Constructing Terrain
title: Construct terrain in Open 3D Engine
description: Learn to construct terrain in Open 3D Engine (O3DE).
weight: 200
toc: true
---

## **Constructing Terrain**
You can construct terrain via the Entity Outliner and Entity Inspector using gradient generators.

**Setup**: Enable the Terrain Gem.

*Note: You will need to create both a spawner area and spawnable area.*

### **Define a spawnable area**

1. In the **O3DE Editor**, create a new level or open an existing level.
2. In the **Entity Outliner**, select the level.prefab.
- ![A](/images/learning-guide/tutorials/environments/constructing-terrain/A.png)
3. In the **Entity Inspector**, add both the **Terrain World** and **Terrain World Renderer** components.
- ![B](/images/learning-guide/tutorials/environments/constructing-terrain/B.png)

### **Define a spawnable area**

1. Create a new entity (hotkey **Ctrl+Alt+N**). (This will be your **TerrainSpawner** entity.)
- ![C](/images/learning-guide/tutorials/environments/constructing-terrain/C.png)
2. With the new entity selected, in the Entity Inspector, add a **Terrain Layer Spawner** and an **Axis Aligned Box Shape** component. (You can adjust the dimensions of the Aligned Box Shape component to encompass or intersect with the Terrain Layer Spawner.)
3. Next, add a **Terrain Heigh Gradient List** component.
- ![D](/images/learning-guide/tutorials/environments/constructing-terrain/D.png)
4. In the Entity Outliner, create a second entity. (This will contain your **HeightfieldGradient** entity.)
- ![E](/images/learning-guide/tutorials/environments/constructing-terrain/E.png)
5. With the new entity selected, in the Entity Inspector, add an **Image Gradient** Component.
6. Next, add the required **Gradient Transfer Modifier** component.
7. Then, add a required Shape component (e.g. **Box Shape, Sphere, Shape, Axis Aligned Box Shape**).
    Typically, this will be a Shape Reference so that we can share the same shape as the Terrain Layer Spawner, so that the image always exactly stretches across the entire spawner.
 -  ![F](/images/learning-guide/tutorials/environments/constructing-terrain/F.png)
8. In the Shape Reference component (if used), assign the TerrainSpawner entity.
9. In the TerrainSpawner entity, assign the HeightfieldGradient entity within the Terrain Height Gradient List component.
- ![G](/images/learning-guide/tutorials/environments/constructing-terrain/G.png)
10. Now you should see constructed terrain using a heightfield gradient.
-  ![H](/images/learning-guide/tutorials/environments/constructing-terrain/H.png)
11. **Save** the level (hotkey **Ctrl+S**).

## **Applying Materials to Terrain**

You can generate terrain in a few different ways via the Entity Outliner and Entity Inspector.

**Setup**: See Constructing Terrain.

### **Create a Macro Material**

1. In the Entity Outliner, select the TerrainSpawner entity.
- ![I](/images/learning-guide/tutorials/environments/constructing-terrain/I.png)
2. In the Entity Inspector, add a **Terrain Macro Material** component.
- ![J](/images/learning-guide/tutorials/environments/constructing-terrain/J.png)
3. In the Terrain Macro Material component, select a **Color Texture** and a **Normal Texture** from the **Pick Streamingimage** modal.
- ![K](/images/learning-guide/tutorials/environments/constructing-terrain/K.png)
4. **Save** the level (hotkey **Ctrl+S**).

*Note: You can adjust normals as desired within the Terrain Macro Material component.*

### **Assign Detail Materials**

1. In the Entity Outliner, select the TerrainSpawner entity.
2. In the Entity Inspector, add the **Terrain Surface Materials** List component. (You can add elements and assigned a configured tag within the Terrain Surface Materials List component.)
- ![L](/images/learning-guide/tutorials/environments/constructing-terrain/L.png)
3. In the Terrain Surface Materials List component, specify a **Material asset** from the **Pick MaterialAsset**.
- ![M](/images/learning-guide/tutorials/environments/constructing-terrain/M.png)
4. **Save** the level (hotkey **Ctrl+S**).

## **Physicalizing Terrain**

You can create physicalized terrain in a few different ways via the Entity Outliner.

### **Define a physicalized area**

**Setup**: Enable the **PhysX Gem**.

*Note: You can verify terrain collision using physics objects. See **Physics objects**.*

### **Using Components**

1. In the Entity Outliner, select the TerrainSpawner entity.
2. In the Entity Inspector, add the **Terrain Physics Heightfield Collider** and **Physx Heightfield Collider** components.
- ![N](/images/learning-guide/tutorials/environments/constructing-terrain/N.png)
3. **Save** the level (hotkey **Ctrl+S**).
4. Verify by entering **Game Mode** (hotkey **Ctrl + G**). 

### **Using a physics material**

1. In the Terrain Heightfield Collider, select a Default Surface Physics Material for the entire terrain within the Terrain Physics Heightfield Collider component.
- ![O](/images/learning-guide/tutorials/environments/constructing-terrain/O.png)
2. **Save** the level (hotkey **Ctrl+S**).
3. Verify by entering **Game Mode** (hotkey **Ctrl + G**). 

