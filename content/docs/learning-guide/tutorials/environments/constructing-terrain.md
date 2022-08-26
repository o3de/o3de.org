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

*Note: You will need to enable the Terrain System as well as create a terrain spawner area.*

### **Enable the Terrain system**

1. In the **O3DE Editor**, create a new level or open an existing level.
2. In the **Entity Outliner**, select the level.prefab.
- ![Enable_the_Terrain_system_2](/images/learning-guide/tutorials/environments/constructing-terrain/Enable_the_Terrain_system_2.png)
3. In the **Entity Inspector**, add both the **Terrain World** and **Terrain World Renderer** components.
- ![Enable_the_Terrain_system_3](/images/learning-guide/tutorials/environments/constructing-terrain/Enable_the_Terrain_system_3.png)

### **Define a spawnable area**

1. Create a new entity (hotkey **Ctrl+Alt+N**). (This will be your **TerrainSpawner** entity.)
- ![Define_a_spawnable_area_1](/images/learning-guide/tutorials/environments/constructing-terrain/Define_a_spawnable_area_1.png)

 *Note: The position of the entity represents the center of the Axis Aligned Box Shape, so a box of 100 x 100 x 100 m will cover an area 50 m in each direction from the entity position.*

2. With the new entity selected, in the Entity Inspector, add a **Terrain Layer Spawner** and an **Axis Aligned Box Shape** component. (You can adjust the dimensions of the Aligned Box Shape component to encompass or intersect with the Terrain Layer Spawner.)

*Note: The box should be positioned within the world height bounds that were set on the Terrain World component. The min/max heights on that component are 0 to 1024 m by default, so the entity should be positioned high enough that the bottom of the box is at least 0. (Or alternatively, the min/max heights can be adjusted to go below 0.*

3. Next, add a **Terrain Height Gradient List** component.
- ![Define_a_spawnable_area_3](/images/learning-guide/tutorials/environments/constructing-terrain/Define_a_spawnable_area_3.png)
4. In the Entity Outliner, create a second entity. (This will contain your **HeightfieldGradient** entity.)
- ![Define_a_spawnable_area_4](/images/learning-guide/tutorials/environments/constructing-terrain/Define_a_spawnable_area_4.png)
5. With the new entity selected, in the Entity Inspector, add an **Image Gradient** component.
6. In the Image Gradient component, select a heightmap for the Image Asset. 

*Note: Changing the sampling type from "Point" to "Bilinear" will make the heights smoother if the image resolution doesn't exactly match the terrain resolution.*

*Note: Images should have their names end in "_gsi" to help ensure they're automatically turned into lossless gradient images. Alternatively, you can right-click on the image in the Asset Browser, choose "Set Texture Settings...", and set the preset to "GSI8", "GSI16", or "GSI32", "GSI". These will produce 8-bit, 16-bit, or 32-bit or auto-bit-detection lossless gradient images. If the preset is "Albedo", it will default to lossy 8-bit values, which doesn't work well for heights.*

7. Next, add the required **Gradient Transfer Modifier** component.
8. Then, add a required Shape component (e.g. **Box Shape, Sphere, Shape, Axis Aligned Box Shape**).
    Typically, this will be a **Shape Reference** so that we can share the same shape as the Terrain Layer Spawner, so that the image always exactly stretches across the entire spawner.
 - ![Define_a_spawnable_area_8](/images/learning-guide/tutorials/environments/constructing-terrain/Define_a_spawnable_area_8.png)
9. In the Shape Reference component (if used), assign the TerrainSpawner entity.
10. In the TerrainSpawner entity, assign the HeightfieldGradient entity within the Terrain Height Gradient List component.
- ![Define_a_spawnable_area_10](/images/learning-guide/tutorials/environments/constructing-terrain/Define_a_spawnable_area_10.png)
11. Now you should see constructed terrain using a heightfield gradient.
- ![Define_a_spawnable_area_11](/images/learning-guide/tutorials/environments/constructing-terrain/Define_a_spawnable_area_11.png)
12. **Save** the level (hotkey **Ctrl+S**).

## **Applying Materials to Terrain**

You can define your terrain surfaces, surface materials, and colors via the Entity Outliner and Entity Inspector.

**Setup**: See Constructing Terrain.

### **Create a Macro Material**

1. In the Entity Outliner, select the TerrainSpawner entity.
- ![Create_a_Macro_Material_1](/images/learning-guide/tutorials/environments/constructing-terrain/Create_a_Macro_Material_1.png)
2. In the Entity Inspector, add a **Terrain Macro Material** component.
- ![Create_a_Macro_Material_2](/images/learning-guide/tutorials/environments/constructing-terrain/Create_a_Macro_Material_2.png)
3. In the Terrain Macro Material component, select a **Color Texture** and a **Normal Texture** from the **Pick Streamingimage** modal.
- ![Create_a_Macro_Material_3](/images/learning-guide/tutorials/environments/constructing-terrain/Create_a_Macro_Material_3.png)
4. **Save** the level (hotkey **Ctrl+S**).

*Note: You can adjust normals as desired within the Terrain Macro Material component.*

### **Assign Surface Materials**

1. In the Asset Editor, create a new **Surface Tag Name List** asset and fill it with all of the surface names you'd like to use, and save the asset in your level or project.
2. Add the **Terrain Surface Gradient List** component.
3. For each surface type, create a new **Image Gradient** entity (similar to the steps for the Height Image Gradient) that contains the weights for that surface.
4. Add each of these entities to the Terrain Surface Gradient List and assign them the desired surface name.

### **Assign Detail Materials**

1. In the Entity Outliner, select the TerrainSpawner entity.
2. In the Entity Inspector, add the **Terrain Surface Materials List** component. (You can add elements and assign a configured tag within the Terrain Surface Materials List component.)
- ![Assign_Detail_Materials_2](/images/learning-guide/tutorials/environments/constructing-terrain/Assign_Detail_Materials_2.png)
3. In the Terrain Surface Materials List component, specify a **Material asset** from the **Pick MaterialAsset**. (Note: A TerrainDetailMaterial will provide additional controls for height-based blending.)
- ![Assign_Detail_Materials_3](/images/learning-guide/tutorials/environments/constructing-terrain/Assign_Detail_Materials_3.png)
4. **Save** the level (hotkey **Ctrl+S**).

## **Physicalizing Terrain**

You can create physicalized terrain via the Entity Outliner.

### **Define a physicalized area**

**Setup**: Enable the **PhysX Gem**.

*Note: You can verify terrain collision using physics objects. See **Physics objects**.*

### **Using Components**

1. In the Entity Outliner, select the TerrainSpawner entity.
2. In the Entity Inspector, add the **Terrain Physics Heightfield Collider** and **Physx Heightfield Collider** components.
- ![Using_Components_2](/images/learning-guide/tutorials/environments/constructing-terrain/Using_Components_2.png)
3. **Save** the level (hotkey **Ctrl+S**).
4. Verify by entering **Game Mode** (hotkey **Ctrl + G**). 

### **Using a physics material**

1. In the Terrain Heightfield Collider, select a Default Surface Physics Material for the entire terrain within the Terrain Physics Heightfield Collider component.
- ![Using_a_physics_material_1](/images/learning-guide/tutorials/environments/constructing-terrain/Using_a_physics_material_1.png)
2. **Save** the level (hotkey **Ctrl+S**).
3. Verify by entering **Game Mode** (hotkey **Ctrl + G**).

