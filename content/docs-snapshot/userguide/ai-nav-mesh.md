# Multi\-Layer Navigation Mesh \(MNM\)<a name="ai-nav-mesh"></a>

An MNM mesh is automatically created for each navigation area that is added to a level\. During the mesh generation process, the terrain, voxels, static objects, and rigid bodies with zero mass are all accounted for in determining whether an AI agent can move through or must move around something\.

When a navigation mesh is created, the navigation areas are split in small volumes called tiles, which have a fixed size of 8m x 8m x 8m\. Tiles in turns consist of voxels\. The smaller the voxel size, the more accurate \(and more expensive\) the generated mesh\. 

## AI Pathfinding<a name="ai-nav-mesh-pathfinding"></a>

Lumberyard uses the A\* algorithm for pathfinding to search all the triangles of the navigation mesh, with the distance to the destination as the heuristic\. The smaller the mesh, the faster the search\.

The pathfinding algorithm is asynchronously time\-sliced in that requests for paths are not processed immediately but are added to the queue, so it can take a few frames to get the result\.

AI agents must stay within the navigation mesh to be able to follow a path defined by the pathfinding algorithm\. If an agent gets to the boundary of the mesh, it tries to find the closest triangle within a certain range\.