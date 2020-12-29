# Working with Diffuse Maps<a name="mat-maps-diffuse"></a>

When light hits a surface, it splits into two directions: some is reflected immediately off the surface while the rest enters the surface and gets refracted\. The refracted light can be absorbed or scattered underneath the surface and exit again at a different angle\. This absorbed and refracted light is the diffuse color of an object\. 

The diffuse color defines how bright a surface is when lit directly by a white light source with an intensity of 100%\. Physically speaking, it defines what percentage for each component of the RGB spectrum does not get absorbed when light scatters underneath the surface\. 

Texture mapping the diffuse color is like applying an image to the surface of the object\. For example, if you want a wall object to be made out of brick, you can choose an image file with a photograph of bricks\. A diffuse map is always required for objects\. 

The diffuse map should not contain any lighting, shading or shadowing information, as all this gets added dynamically by Lumberyard\. In certain cases, pre\-baked ambient occlusion \(AO\) is required, which is stored in a dedicated AO map in the diffuse channel of the Detail Map\. For more information, see [Working with Detail Maps](mat-maps-detail-intro.md) \.

Diffuse maps can be combined with other texture maps, such as ambient occlusion maps and cavity maps, to create more definition\. 

## Diffuse Mapping Best Practices<a name="mat-maps-diffuse-best-practices"></a>
+ Don't use too light or too dark of a texture that will require too much color compensation\. 
+ Metal objects should have a black diffuse color\. Rusty metal however needs some diffuse color\. 
+ Paint, or use occlusion mapping, to darken cracks and holes\. 
+ Use crisp colors and contrast to define variations in shapes in order to break up the image\. 
+ Create UV maps so that there is a decent compromise of space utilization and stretching\. 