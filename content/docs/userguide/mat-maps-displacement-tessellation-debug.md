# Fixing Tessellation Seams<a name="mat-maps-displacement-tessellation-debug"></a>

There are two types of seams or cracks that can become noticeable when using tessellation\.

## Border Seams<a name="mat-maps-displacement-tessellation-debug-border-seams"></a>

Border seams occur when different meshes are placed close to each other, or when a mesh consisting of sub\-meshes causes unpleasant cracks because of using different materials with different displacement \(or even same displacement maps with slightly different UV mapping\)\.

The solution involves carefully placing meshes or fade\-out displacement by modifying the displacement map as needed\.

## UV Seams<a name="mat-maps-displacement-tessellation-debug-uv-seams"></a>

UV seams occur when two adjacent triangles share an edge but use separate vertices with different UVs\. This shared edge will have a different displacement on each side due to sampling different places in the displacement map\. Even tiny differences in UV can cause visible seams\. This is automatically fixed by Lumberyard if there is no tiling\. Otherwise you must change the UV mapping to hide such artifacts where possible\.

Phong tessellation and PN Triangle tessellation do not suffer from UV seams as they do not use UV mapping\.