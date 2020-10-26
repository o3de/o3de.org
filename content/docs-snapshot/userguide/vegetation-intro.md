# Adding Vegetation<a name="vegetation-intro"></a>

You can add realistic trees, bushes, grasses, and other vegetation to your Lumberyard terrain\.

**Topics**
+ [Vegetation Best Practices](#vegetation-best-practices)
+ [Vegetation Recommendations](#vegetation-best-recommendations)
+ [Vegetation Texture Mapping](terrain-vegetation-trees.md)
+ [Adding Trees and Bushes](vegetation-trees.md)
+ [Adding Grass](vegetation-grass-intro.md)
+ [Adding Vegetation Bending Effects](vegetation-bending-intro.md)
+ [Vegetation Parameters](vegetation-params-ref.md)
+ [Vegetation Debugging](vegetation-debugging.md)
+ [Using SpeedTree 8 for Lumberyard](vegetation-speedtree-lumberyard-intro.md)

## Vegetation Best Practices<a name="vegetation-best-practices"></a>

Keep in mind the following best practices, recommendations, and guidelines when you add vegetation to your terrain level\.
+ Manually place vegetation to get the most control and best results\.
+ To save memory, place grass manually\.
+ Keep the polygon count for grass blades as low as possible\.
+ Do not exceed a diameter of 8 meters for grass patches\. This size provides a balance between performance and coverage\.
+ Grasses and small plants do not require specular or opacity texture maps\. For more information, see [Working with Textures](mat-texture-intro.md)\.
+ Set the **Opacity** texture at a much lower resolution than the other maps\.
+ Use a **Glossiness** value of 8 or above for realistic results\. 
+ Use the automerged method to apply wind bending effects to grass\.
+ Use a maximum of 72 bones per tree for touch bending\.

## Vegetation Recommendations<a name="vegetation-best-recommendations"></a>

The following settings are recommended when creating vegetation in your DCC tool\.


****  

| Vegetation | Polygon Range | Texture Size | Proxies | Material IDs | 
| --- | --- | --- | --- | --- | 
| Grass | 0\-300 | 512x512 | Bending | Grass, grass proxy | 
| Bushes | 300\-600 | 1024x1024 | Bending, collision | Leaf, leaf proxy | 
| Small Trees | 600\-1000 | \(2\) 1024x1024 | Bending, collision \*\* | Trunk, leaf, leaf proxy | 
| Large Trees |  | \(2\) 1024x1024 | Bending, collision \*\*\* | Trunk, leaf, leaf proxy, trunk proxy | 

\*\* Smaller breakable tree trunks are physicalized\.

\*\*\* Larger non\-breakable tree trunks are not physicalized\.