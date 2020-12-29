# Displacement Maps and Tessellation<a name="mat-maps-displacement-intro"></a>

Displacement mapping allows you to displace the actual surface geometry of an object to give you extra depth and detail than is available using bump mapping, offset bump mapping or parallax occlusion mapping \(POM\) techniques, which all "fake" surface detail\. Displacement mapping results are dependent on how far the camera is from the object\. 

Displacement mapping uses a texture map, called the height map, which is used to define the value of vertex height displacement\. Specifically, this is a scalar displacement that is stored in the alpha channel of a `_displ` texture file\. 

In order for displacement mapping to work correctly, you need to also apply tessellation to your object, otherwise there wouldn’t be enough geometry to displace\. Tessellation increases the geometry count by subdividing polygons into smaller polygons before it gets displaced\.

**Topics**
+ [Displacement Mapping Best Practices](mat-maps-displacement-best-practices.md)
+ [Setting Displacement Mapping Parameters](mat-maps-displacement-params.md)
+ [Tessellation](mat-maps-displacement-tessellation-intro.md)