# Creating Rivers<a name="terrain-rivers-intro"></a>

You can add realistic rivers, complete with waterfalls, to your terrain in your environment level\.

The following are best practices and guidelines to keep in mind when creating rivers\.
+ Rivers are 2D objects, which means rivers cannot be made to flow down steep inclines\. However, to make a river flow down gentle inclines, you can rotate the river along the z\-axis slightly \(Z=0\.5 to 1\.0\)\.
+ To create rivers that appear to flow down steep inclines, create multiple rivers and connect them with waterfalls\.
+ The more points you place for the river geometry, the more control you have for direction and curvature\.
+ The wider the river, the further apart the points should be to avoid clipping at sharp corners\.
+ For more realism, paint the bottom of the river a different texture and add vegetation\.
+ For more realism, add particle effects\.

For information on the river entity see [River Entity](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/entities-entity-river.html)\.

**Topics**
+ [Preparing the River Terrain](terrain-rivers-prep-terrain.md)
+ [Creating the River Entity](terrain-rivers-entity.md)
+ [Applying a River Material](terrain-rivers-material.md)
+ [Adjusting River Spline Geometry](terrain-rivers-spline-geometry.md)
+ [Splitting and Merging Rivers](terrain-rivers-split-merge.md)