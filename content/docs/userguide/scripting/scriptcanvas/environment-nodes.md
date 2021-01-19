---
description: ' Use environment nodes in the &ALYlong; &script-canvas; editor to configure
  sky effects. '
title: Environment Nodes
---
# Environment Nodes {#script-canvas-environment-nodes}

You can use environment nodes in the **Script Canvas** to configure sky elements, such as sun position, moon position, and the skybox material\. You can use these nodes to have specific control over the individual elements\.

Some environment nodes \(for example, **[Set Sun Latitude](/docs/userguide/set-sun-latitude-node.md)**\) have a **Force Update** parameter\. You can use this parameter to make sudden changes to the sky appearance\. Since time normally passes slowly with only gradual changes in sky appearance, Lumberyard updates only a portion of the sky for each frame, for better performance\. When the sky appearance changes gradually, players are unlikely to notice this optimization\. However, if the sky appearance suddenly changes by a large amount, players can notice unusual effects\. To avoid this, specify `True` for the **Force Update** parameter to update the entire sky in a single frame\.

You can use the time of day system to manage high\-level control for automatically updating the appearance of the sky\. For more information, see [Adding Sky Effects](/docs/userguide/sky/intro.md) and [Time of Day Nodes](/docs/userguide/scripting/scriptcanvas/time-of-day-nodes.md)\.

**Topics**
+ [Get Moon Latitude](/docs/userguide/get-moon-latitude-node.md)
+ [Get Moon Longitude](/docs/userguide/get-moon-longitude-node.md)
+ [Get Sun Latitude](/docs/userguide/get-sun-latitude-node.md)
+ [Get Sun Longitude](/docs/userguide/get-sun-longitude-node.md)
+ [Get Wind Direction](/docs/userguide/get-wind-direction-node.md)
+ [Set Moon Latitude](/docs/userguide/set-moon-latitude-node.md)
+ [Set Moon Longitude](/docs/userguide/set-moon-longitude-node.md)
+ [Set Skybox Angle](/docs/userguide/set-sky-box-angle.md)
+ [Set Skybox Material](/docs/userguide/set-sky-box-material.md)
+ [Set Skybox Stretch](/docs/userguide/set-sky-box-stretch.md)
+ [Set Sun Latitude](/docs/userguide/set-sun-latitude-node.md)
+ [Set Sun Longitude](/docs/userguide/set-sun-longitude-node.md)
+ [Set Wind Direction](/docs/userguide/set-wind-direction-node.md)