# Texture Best Practices<a name="mat-texture-best-practices"></a>

When creating textures, consider the following best practices and guidelines: 
+ Use the fewest number of textures that will do the job\. 
+ For road textures, make sure the texture is horizontal\. 
+ Use detail maps to add detail and crispness to lower\-resolution textures\. Detail maps can be used to add extra grain to wood, extra cracks to a concrete wall, or small scratches to car paint\. 
+ Reuse normal maps and specular maps when possible to save texture memory\. Normal maps are twice as expensive memory\-wise compared to regular textures\. For example, when using several types of floor tiles, brick walls, and concrete walls, create textures so they can use the same normal map and specular map\. 
+ Combine textures for small generic items such as pipes and railings to save on drawcalls\. For example, a house can consist of a wall texture, roof texture, and a detail sheet with all windows, frames, and doors\. This saves on materials and drawcalls\. 
+ Do not make textures bigger than they appear onscreen\. A roof texture on a tall building that neither the player nor the camera can see at close range should be smaller, for example, than a ground texture\. 
+ Use decals to break up and compensate for lack of texture amount\. Dirt and stain decals are an easy way to break up tiled textures\.
+ Use vertex colors to create variety, depth, and color variations\. Vertex painting and pre\-baked vertex lighting is a relatively cheap way to add depth to objects and make them more interesting\. 
+ Use grayscale textures that can be color\-tinted to save on texture memory\. Objects that benefit from this technique include cars, fences, barrels, and crates\. 