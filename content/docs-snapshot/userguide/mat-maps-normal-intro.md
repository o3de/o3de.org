# Working with Normal Maps<a name="mat-maps-normal-intro"></a>

The illusion of extra depth and detail to objects is achieved by using normal maps, which are a type of bump map\. Bump maps and normal maps both add detail without increasing the number of polygons\. As such, they are used to "fake" depth and details such as wrinkles, scratches and beveled edges\. Unlike displacement mapping, normal maps affect shading and not the surface itself\. The surface remains flat when seen from an angle\. 

Bump maps store an intensity that represents the relative height \(bump\) of pixels from the viewpoint of the camera\. Traditional normal maps, in addition to storing the height, also store the direction of normals in the RGB values of the texture image\. As such, they are more accurate than bump maps\. 

Lumberyard uses a form of normal mapping, called Tangent Space Normal Mapping, which uses either a height map or is derived from a high\-polygon model\. In a normal map, a color represents a certain normal vector \(surface orientation of a point\)\. For tangent space normal maps the information is relative to the underlying surface\. 

Tangent space normal maps are independent of the underlying geometry which means the texture can be used on other geometry as well\. It will automatically align to the surface regardless of mirroring, rotation, scale or translation\. Only the latter two are supported by traditional \(object or world\) normal maps\. 

An advantage of tangent space normal maps is that the normals are always pointing outwards, so assuming unit length, the normal z coordinate can be reconstructed from the x and y components\. After the coordinate expansion from 0\.\.1 to the \-1\.\.1 range, the z component can be computed in the shader with this formula: z = sqrt\(1 \- x\*x \+ y\*y\)\. This makes it possible to use two\-channel textures \(2 bytes per texel\) to store normal maps\. 

**Topics**
+ [Normal Mapping Best Practices](mat-maps-normal-best-practices.md)
+ [Using Normals with Gloss Maps](mat-maps-normal-gloss.md)