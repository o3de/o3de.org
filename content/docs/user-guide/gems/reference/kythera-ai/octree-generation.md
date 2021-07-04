---
linkTitle: Octree Generation
title: Octree Generation
description: Generating an octree for 3D navigation with the Kythera AI Gem in Open 3D Engine (O3DE)
weight: 350
toc: true
---

The octree is used for 3D flight navigation, and is the 3D equivalent of the [navigation mesh](navmesh-generation) used for ground-based navigation. Like navmeshes, the physical geometry of the level is used as the basis. Unlike navmeshes, no dynamic updates are currently supported, and generation must be triggered explicitly.

## Bounds setup

Octree generation will take place within bounds components present in the level. Use the **Polygon Prism Shape** component to form the bounds, and use a **Bounds Octree** component to mark it for octree generation. It is possible to tag an entity for both octree and navmesh generation.

One entity in the scene should have the **Octree** component on it, which supplies global octree generation settings. Default settings will be used otherwise.

## Configuration

![Octree component settings](/images/user-guide/gems/kythera-ai/octree-configuration.png)

| Property | Description |
| - | - |
| **Cell Size** | The size of the smallest cells in the octree in world units. The cell size should be set slightly larger than the radius of the smallest ship, so that if the radius changes slightly, the smallest ship doesn't immediately jump up into the next category. You can set this property to a fraction of the radius of the smallest ship if navigation closer to geometry is required. For example, if your current ships have a radius just under 4m, you might set the cell size to `4`. Smaller cell sizes usually result in more nodes and require more memory, but it's not a direct relationship. |
| **Min Ship Radius** | This specifies the radius of the smallest ship in octree cell size units. Set this property to `1` if you set the cell size based on the radius of the smallest ship, or to the appropriate multiple if you set it based on a fraction of the ship radius. |
| **Max Ship Radius** | This specifies the maximum radius of ships that can use the octree for navigation, in octree cell size units. A wide range of radii will create more nodes, and require more memory. A single radius is ideal. |
| **Tree Depth** | Explicitly set the depth (number of levels) of the octree. Setting this too low will result in missing chunks. Using auto-depths is recommended. |
| **Hard Boundaries** | When selected, the edge of the nav bounds is a hard boundary. This will prevent AI from leaving the octree. In many use cases this is not a practical requirement and it does increase memory usage significantly |
| **Auto Depths** | When selected, sets the tree depth based upon the cell size and the bounds size. Using auto-depths is recommended. |

Only one configuration is supported for a level. However, unlike navmeshes, this is designed to accommodate multiple 3D agent (ship) sizes. There is no equivalent to the NavMesh.xml file.

## Minimizing Nodes and Memory

The more nodes in the octree, the longer searches will take and the more memory is required. To improve performance and decrease memory usage do the following:

* Enable **Hard Boundaries**, if possible.

* Use the largest possible **Cell Size**. Ensure that the smallest aperture you require will be reliably captured by an off-axis cell. Ask the Kythera team for guidance on this.

* Keep the difference between **Min Ship Radius** and **Max Ship Radius** as small as possible. Ideally they should be equal. If you have trouble with memory while trying to support a very small ship and very large ship, consider if there is another approach you can take or talk to the Kythera team.

* Leave Auto Depths enabled.

## Generation

To generate or regenerate the octree, use the console command `kyt_GenOctree`.  
  
A modal dialog will pop up when complete.

Alternatively, use the **Generate Octree** button (![Generate octree icon](/images/user-guide/gems/kythera-ai/toolbar-generate-octree.png)) on the Kythera toolbar.

## Saving

To save the octree to disk, use the console command `kyt_SaveOctree`. 
  
Alternatively, use the Save Octree button (![Save octree icon](/images/user-guide/gems/kythera-ai/toolbar-save-octree.png)) on the Kythera toolbar.

## Debug Visualisation

Kythera provides debug draw of octrees.

![Octree debug visualization](/images/user-guide/gems/kythera-ai/octree-debug-visualization.png)

To enable octree debug draw, use the console variables `kyt_DrawMaster 1` and  `kyt_DrawNavOctree <1-3>`.

Navigable octree cells are drawn in yellow, and non-navigable octree cells are drawn in red. 

There are several debug modes:

 * `0` off  
 * `1` draw navigable spaces 
 * `2` draw unnavigable spaces  
 * `3` draw both
