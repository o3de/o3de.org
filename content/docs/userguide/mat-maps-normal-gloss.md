# Using Normals with Gloss Maps<a name="mat-maps-normal-gloss"></a>

Most materials should have a gloss map as well as a normal map as this can impart a lot of variation to the shading\. Gloss maps are closely related to normal maps, as high frequency details in a normal map can create some roughness as well\. However, gloss is more the microscale roughness of the material while normal represents macro\-scale bumpiness\. Gloss maps are treated like diffuse maps\. 

The Gloss map always goes into the Alpha channel of the Normal map, even if you're using a specular map for metals and metal\-embedded surfaces\.

If the preset **NormalMapWithGlossInAlpha\_highQ** is selected, the Resource Compiler will automatically adjust the gloss map stored in the alpha channel based on the normal variance and lower the gloss where normals are very bumpy\. This can greatly help to reduce shimmering and sparkling highlights artifacts\.

Lumberyard uses DDNA textures, which is a standard DDN texture with the addition of a Gloss map in the alpha channel of the normal map\. DDNA texture map must use the `_ddna.dds` filename suffix \(instead of `_ddn.dds`\) for the Resource Compiler to recognize the texture correctly\.