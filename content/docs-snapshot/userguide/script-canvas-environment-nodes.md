# Environment Nodes<a name="script-canvas-environment-nodes"></a>

You can use environment nodes in the **Script Canvas** to configure sky elements, such as sun position, moon position, and the skybox material\. You can use these nodes to have specific control over the individual elements\.

Some environment nodes \(for example, **[Set Sun Latitude](set-sun-latitude-node.md)**\) have a **Force Update** parameter\. You can use this parameter to make sudden changes to the sky appearance\. Since time normally passes slowly with only gradual changes in sky appearance, Lumberyard updates only a portion of the sky for each frame, for better performance\. When the sky appearance changes gradually, players are unlikely to notice this optimization\. However, if the sky appearance suddenly changes by a large amount, players can notice unusual effects\. To avoid this, specify `True` for the **Force Update** parameter to update the entire sky in a single frame\.

You can use the time of day system to manage high\-level control for automatically updating the appearance of the sky\. For more information, see [Adding Sky Effects](sky-intro.md) and [Time of Day Nodes](script-canvas-time-of-day-nodes.md)\.

**Topics**
+ [Get Moon Latitude](get-moon-latitude-node.md)
+ [Get Moon Longitude](get-moon-longitude-node.md)
+ [Get Sun Latitude](get-sun-latitude-node.md)
+ [Get Sun Longitude](get-sun-longitude-node.md)
+ [Get Wind Direction](get-wind-direction-node.md)
+ [Set Moon Latitude](set-moon-latitude-node.md)
+ [Set Moon Longitude](set-moon-longitude-node.md)
+ [Set Skybox Angle](set-sky-box-angle.md)
+ [Set Skybox Material](set-sky-box-material.md)
+ [Set Skybox Stretch](set-sky-box-stretch.md)
+ [Set Sun Latitude](set-sun-latitude-node.md)
+ [Set Sun Longitude](set-sun-longitude-node.md)
+ [Set Wind Direction](set-wind-direction-node.md)