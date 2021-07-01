---
linkTitle: Octree generation
title: Octree generation
description: Generating an octree for 3D navigation with the Kythera AI Gem
weight: 350
---
The octree is used for 3D flight navigation, and is the 3D equivalent of the [navigation mesh](navmesh-generation) used for ground-based navigation. Like navmeshes, the physical geometry of the level is used as the basis. Unlike navmesh, no dynamic updates are currently supported, and generation must be triggered explicitly.

Bounds Setup
============

Octree generation will take place within bounds components present in the level. We use the **PolygonPrismShape** component to form the bounds, and use a **BoundsOctree** component to mark it for Octree generation. It is possible for an entity to be tagged for both octree and navmesh generation.

Additionally, one entity in the scene should have the single Octree component on it, which supplies global octree generation settings. Default settings will be used otherwise.

Configuration
=============

![](/images/user-guide/gems/kythera-ai/octree-configuration.png)

Octree settings are as above (_details to come)_

*   **Cell Size:** The size of the smallest cells in the octree, in world units. This should normally be set based on the radius of the smallest ship, or a fraction of it (if navigation closer to geometry is required). Ideally, the cell size should be set slightly higher than this value, so that if the radius changes slightly the small ship doesn't immediately jump up into the next category. So for example, if your current ships have radius a little under 4m, you might set the cell size to 4m. Smaller cell sizes will usually result in more nodes and take up more memory, but it's not a direct relationship.
*   **Min Ship Radius:** This specifies the radius of the smallest ship in octree cell size units. Set to 1 if you set the cell size based on the radius of the smallest ship, or to the appropriate multiple if you set it based on a fraction of the ship radius.
*   **Max Ship Radius:** This specifies the maximum radius of ships that can use the octree for navigation, in octree cell size units. A wide range of radii to support will create more nodes, increase memory footprint - a single radii is the ideal.
*   **Tree Depth:** Explicitly set the depth (number of levels) of the octree. Setting this too low will lead to missing chunks. _Using auto-depths instead is recommended._
*   **Hard Boundaries:** Tick this to treat the edge of the nav bounds as a hard boundary. Setting this will prevent AI from leaving the octree, but in many use cases this is not a practical requirement and it does increase memory usage significantly.
*   **Auto Depths:** sets the tree depth based upon the cell size and the bounds size. _Recommended._

Only one configuration is supported for a level, but unlike navmeshes this is designed to accommodate multiple 3D agent (ship) sizes. There is no equivalent to the NavMesh.xml file.

Minimizing Nodes and Memory
===========================

The more nodes in the octree, the longer searches will take and the more memory it will take up. When trying to minimize this:

*   Enable Hard Boundaries if possible
*   Use the largest Cell Size you can - ensuring that the smallest aperture you need will be reliably captured by an off-axis cell. Ask the team for guidance on this.
*   Keep the difference between Min and Max Ship Radius as small as possible - ideally they would be equal. If having trouble with memory while trying to support a very small and very large ship, consider if there is another approach you can take or talk to the Kythera team.
*   Leave Auto Depths enabled

Generation
==========

Trigger a generation or regeneration of the octree with the console command:

`kyt_GenOctree`  
  
A modal dialog will pop up when complete.

Alternatively, use the Generate Octree button (![](/images/user-guide/gems/kythera-ai/toolbar-generate-octree.png)) on the Kythera toolbar.

There is currently no support for runtime, dynamic regeneration of areas of the octree during gameplay, but we do expect to add the feature in future.

Saving
======

To save the navmesh to disk, use:

`kyt_SaveOctree`  
  
Alternatively, use the Save Octree button (![](/images/user-guide/gems/kythera-ai/toolbar-save-octree.png)) on the Kythera toolbar.

Debug Visualisation
===================

Kythera provides debug draw of octrees.

![](/images/user-guide/gems/kythera-ai/octree-debug-visualization.png)

In order to enable octree debug draw, ensure that these console variables are set:

```
kyt_DrawMaster 1kyt_DrawNavOctree [1-3]
```

Navigable octree cells are drawn in yellow, and non-navigable octree cells are drawn in red. 

There are several debug modes:  
 _- 0 = off_  
 _- 1 = draw navigable spaces_  
 _- 2 = draw unnavigable spaces_  
 _- 3 = draw both_