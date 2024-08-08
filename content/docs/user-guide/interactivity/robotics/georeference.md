---
linkTitle: Georeference  
title: Georeference
description: Applying to georeference for O3DE level
toc: true
weight: 520
---

## Overview

Your robotics simulation often needs to be placed in a geographical location. 
ROS 2 Gem offers a mechanism to put the simulated level in this context.


### Georeferencing a Level

To set the level's geographical location information, the **Georeference Editor Level Component** needs to be attached to the level entity. 
This component requires:

- A [WGS-84](https://en.wikipedia.org/wiki/World_Geodetic_System#WGS84) location of a known place in the level (e.g, location of the intersection)
- An O3DE entity located in a known place in the level (e.g., the abovementioned intersection). This entity should be located in the location given with WGS-84 coordinates. This entity should also have orientation as follows (ENU):
  - X should point East direction
  - Y should point Nort direction
  - Z should point Up

## Usage

With the Georeference Editor Level Component setup correctly, you can use:
 - ROS 2 GNSS Sensor 
 - Public API to convert geographical location to level coordinate system and _vice versa_ using `GeoreferenceRequestsBus`. 

## Example

Here is a detailed process to build and apply georeference to a simple level that contains a texture. In this particular example, the texture is the orthophoto map of the city center. 
This texture was imported into O3DE and applied as texture to a plane primitive mesh.
The next plane was scaled according to the scale and resolution of the downloaded map.

Next in knowing the location (for example city hall) was placed ENU entity with WGS-84 coordinates:
```
50.06175556 North 
19.93727500 East 
```
Those coordinates need to be added to the Georeference Editor Level Component: \
![GeoreferenceComponent](/images/user-guide/interactivity/robotics/georeference_component.png)

{{< note >}}
Georeference Editor Level Component can be added only to the level entity.
{{< /note >}}


Since then the map has used, and the directions in texture space are:
```
North - up
East - left
```
The ENU entity needs to be rotated accordingly.
The correct location of the ENU entity is shown in the image: \
![enu_location](/images/user-guide/interactivity/robotics/enu_location.png)

{{< note >}}
The ENU entity does not need any additional components. 
{{< /note >}}

You can test if everything works as expected by placing a few simulated GNSS sensors from ROS 2 Gem and moving them on the scene.
In the example shown in the image below, there are three similar GNSS sensors in places marked with colored spheres in the O3DE editor on the left.
On the right, you can see NavSat messages produced by those GNSS sensors visualized in Foxglove studio. 

![simulated_gnss](/images/user-guide/interactivity/robotics/simulated_gnss.png)

