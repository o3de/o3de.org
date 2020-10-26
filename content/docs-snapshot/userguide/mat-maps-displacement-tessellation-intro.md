# Tessellation<a name="mat-maps-displacement-tessellation-intro"></a>

In order for displacement mapping to work correctly, tessellation is also required, otherwise there wouldn't be enough geometry to displace\. Tessellation increases the geometry count by subdividing polygons into smaller polygons before it gets displaced\. Phong and PN triangles are the two available tessellation methods\. 

**Phong tessellation** approximates smoothing based on surface normals\. Surfaces with Phong tessellation applied are not perfectly smooth across patch boundaries, causing the object to look inflated\. 

**PN triangle tessellation** is similar to Phong tessellation and is slower, but with better approximation\. 

Tessellation is only supported for the [Illum Shader](shader-ref-illum.md) and [HumanSkin Shader](shader-ref-humanskin.md)\. 

**Topics**
+ [Setting Tessellation Parameters](mat-maps-displacement-tessellation-params.md)
+ [Fixing Tessellation Seams](mat-maps-displacement-tessellation-debug.md)