# Working with Gloss Maps<a name="mat-maps-gloss"></a>

Gloss defines the roughness of a surface\. A low gloss value means that the surface is rough while a high value means the surface is smooth and shiny\. The roughness influences the size and the intensity of specular highlights\. The smoother and glossier a surface is, the smaller the specular highlight will be\. A smaller highlight will at the same time be brighter in order to obey to the rules of energy conservation\. 

For physically\-based shaders, the gloss map is highly important\. Most materials should have a gloss map as well as a normal map as this can impart a lot of variation to the shading\. Gloss maps are closely related to normal maps, as high frequency details in a normal map can create some roughness as well\. However, gloss is more the microscale roughness of the material while normal represents macro\-scale bumpiness\. Gloss maps are treated like diffuse maps\. 

The Gloss map always goes into the Alpha channel of the Normal map, even if you're using a specular map for metals and metal\-embedded surfaces\. 

Gloss mapping is more powerful than the traditional specular mask, as gloss influences not only the brightness of a highlight but also it's size and the sharpness of reflections\. 

When working with textures, gloss maps and normal maps are created first, then diffuse maps\. Diffuse maps should contain no lighting information\. 

The gloss map is always stored in the alpha channel of the normal map\. If the preset **NormalMapWithGlossInAlpha\_highQ** is selected, the Resource Compiler will automatically adjust the gloss map stored in the alpha channel based on the normal variance and lower the gloss where normals are very bumpy\. This can greatly help to reduce shimmering and sparkling highlights artifacts\. 

## Gloss Map Best Practices<a name="mat-maps-gloss-best-practices"></a>
+ Put variation into the gloss map\. Not just random noise but really where the object would be less or more rough\. 
+ If an object has the correct physical specular color but does not show specular highlights on top of the diffuse, the gloss is likely set too low\. Increase the brightness of the gloss map\. 
+ The Glossiness value must be set to 255, otherwise the gloss map will not work\.
+ Non\-metals should have a specular color value between 53 and 61, based on what looks the best\. 
+ For metals \(and for metal parts embedded in non\-metals\), a dedicated specular texture map is used, with the gloss map going into the alpha channel of the normal map\. The gloss map defines the smoothness, reflectivity and tightness of specular highlights\. For metals, the shader doesn't control specular color – the specular texture map does\. Specular color is physically based\. Because of this, set the Specular color value to 255\. 