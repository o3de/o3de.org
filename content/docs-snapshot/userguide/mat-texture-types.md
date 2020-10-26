# Texture Map Types<a name="mat-texture-types"></a>

Source texture files are converted and compiled in `.DDS` format by the Resource Compiler \(RC\)\. If you do not specify presets for the source file, the Resource Compiler will do the following: 
+ Files with a file suffix of \_ddn or \_bump will generate an uncompressed RGBA or U8V8 NormalMap `.DDS` file with height information in the alpha channel\. 
+ Files with a non\-white \(less than 255\) alpha channel will generate a DXT3\-compressed `.DDS` file\. 
+ Files without an alpha channel will generate DXT1 compressed `.DDS` file\. 


**Texture Map Types**  

| Texture Map | Filename Suffix | Description | 
| --- | --- | --- | 
| Diffuse map | \_diff | Defines the main color for an object\. | 
| Normal map  | \_ddn | Defines the direction of normals on an object surface\. The RGB normal map stores the normal direction for each pixel in the texture\. | 
| Normal with Gloss map | \_ddna | Achieves physically\-correct results\. DDNA textures are standard DDN textures with the gloss map stored inside the Alpha channel\. | 
| Environment map | N/A | Makes an object reflective\. The environment map stores the image that is reflected off the object\. | 
| Displacement map | \_displ | Gives more depth and definition to an object when used in tessellations, parallax occlusion mapping \(POM\), and offset bump mapping \(OBM\)\. | 
| Detail map | \_detail | Adds more detail to a surface\. This texture map works like a second material layer and is not affected by the mapping of the object\. | 
| Emittance Multiplier | N/A | Multiplies the emissive color\. | 
| Blend \(layer\) | N/A | Blends multiple textures using an adjustable mask texture and a vertex alpha\.  | 