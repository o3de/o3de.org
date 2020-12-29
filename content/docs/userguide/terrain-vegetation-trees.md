# Vegetation Texture Mapping<a name="terrain-vegetation-trees"></a>

Vegetation gets its appearance from texture mapping\. Trees use two different sets of textures maps, one for leaves and branches and one for the trunk\. Normal and specular maps can have a gloss map in the alpha channel\.

The texture map you use depends on the type of vegetation:

**Grass** – Diffuse map only

**Leaves and branches \(trees or bushes\)** – Diffuse, specular, normal, and opacity maps

**Tree trunks** – Diffuse, specular and normal maps

Vegetation placement on a terrain texture layer is based on the pivot point of the vegetation object\. Bigger vegetation objects might overlap with other terrain texture layers\. This is most obvious if you have two different materials touching, like grass and mud\.