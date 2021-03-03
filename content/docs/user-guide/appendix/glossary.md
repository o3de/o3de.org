---
description: null
title: Glossary
---

# Glossary {#ly-glos-chap}

**actor** {#actor}
A specialized [entity](#entity) that is the basis for characters in a game\.

**additive animation** {#additive_animation}
An animation that can be attached to a base animation to extend its behavior\.

**agent** {#agent}
An autonomous entity used in artificial intelligence \(AI\) that uses sensors to observe its environment and directs its activity towards achieving one or more goals\.

**aim pose** {#aim_pose}
Part of a collection of parametric\-blended poses for making a character take aim at specified points in the game\.

**alpha channel** {#alpha_channel}
An extension of RGB color values for specifying the opacity of an object\. A value of 0\.0 indicates fully transparent while a value of 1\.0 indicates fully opaque\.

**Amazon GameLift** {#amazon_gamelift}
A fully managed [AWS](#aws) service for deploying, operating, and scaling session\-based multiplayer game servers in the cloud\.

**archetype entity** {#archetype}
A special type of [entity](#entity) with linked instances\. If a parameter of the archetype entity is changed, all other instances of that entity parameter are automatically updated\.

**asset** {#asset}
Any art, texture, 3D model, sound effect, or other digital data that is presented to the user in the game\.

**attachment** {#attachment}
A hierarchical object that is attached to characters, respond to real\-world physics, and can be attached, detached, or replaced at runtime in the game\. Character attachments include clothing, weapons, tools, or entire body parts such as heads or hands\.

**AWS** {#aws}
Amazon Web Services, an infrastructure web services platform in the cloud for companies of all sizes\.
See also [http://aws\.amazon\.com](http://aws.amazon.com/what-is-cloud-computing/).

**baked** {#baked}
Performs and stores all calculations for a scene element so that the element does not need to be processed or rendered in real time in the game\. Often used for lighting or physics\. Also referred to as *prebaked*\.

**bind pose** {#bind_pose}
The pose that a character has when you bind the mesh \(skin\) to the skeleton\. The skeleton determines the pose\.

**blend shape** {#blend_shape}
Method that stores a deformed version of a mesh as a series of vertex positions\. In each keyframe of an animation, the vertices are interpolated between these stored positions\. Also known as *morph target animation* or *per\-vertex animation*\.

**blend space** {#blend_space}
Animation blending that is treated as geometry\. A character's kinematic, physical, and other high\-level motion\-related parameters are mapped onto corresponding features that are stored in animation clips\. By storing such motion as parameters, controllable interactive animations are possible\. Specifically, an animation is associated with a 1D, 2D, or 3D location in the blend space\. Also known as a *bspace*\.

**bloom** {#bloom}
Effect that reproduces an imaging artifact of real\-world cameras\. The effect appears as fringes or feathers of illumination bleeding from the border of a bright area in an image, which gives the illusion of a bright light overwhelming the camera\.

**boids** {#boid}
Entities that mimic living animals and that have simulated group behavior and obstacle avoidance\.

**brush** {#brush}
A simple 3D shape that is tied to an entity, and that provides a specific appearance\. Brushes are used for static objects\.

**bspace**
See [blend space](#blend_space).

**bump map** {#bump_map}
A grayscale image that allows more realistic rendering of an object by introducing small displacements of its surface without changing its geometry\. This is done by perturbing the surface normals of a rendered object during lighting\. The amount of perturbation is specified by the values in the bump map\.

**Cloud Canvas** {#cloud_canvas}
A tool for building connected gameplay by using Lumberyard and AWS services, such as Amazon Cognito, Amazon DynamoDB, AWS Lambda, Amazon S3, Amazon SNS, and Amazon SQS\.

**collision proxy** {#collision_proxy}
A simplified geometric shape for approximating a more complex piece of geometry for purposes of a fast first\-pass collision detection\.

**cooking** {#cooking}
Pre\-processing step that converts data such as mesh geometry into formats that PhysX can use\. Cooking also prepares data structures and computes intermediate results that can be performed offline, which saves computation at runtime\.

**cubemap** {#cubemap}
A set of six squares that represent reflections from the environment\. The six squares form the faces of an imaginary cube that surrounds an object\.

**cutscene** {#cutscene}
A noninteractive cinematic game sequence that is typically used to promote plot during gameplay\.

**damping** {#damping}
 The gradual reduction of movement, vibration, or intensity\.

**DCC** {#dcc}
Digital content creation; related to a third\-party product such as Autodesk 3ds Max or Autodesk Maya for creating digital assets\.

**decal** {#decal}
A 2D texture placed on a piece of flat geometry\.

**detail map** {#detail_map}
An image for adding up\-close surface details to an object\.

**diffuse map** {#diffuse_map}
An image for defining the base color and pattern of an object's surface\.

**displacement map** {#displacement_map}
A type of [heightmap](#height_map) that modifies the position of vertices of a surface by a specified amount\.

**DOF** {#dof}
Depth of field\. The degree to which distant objects are in focus relative to closer ones\.

**EBus** {#ebus}
A modular message dispatch system that enables components, entities, and other types of objects to communicate with one another with few or no interdependencies\. Because Ebuses are decoupled from each other, you can more easily build high performing and modular game systems\. Also known as *event bus*\.

**emitter** {#emitter}
An entity that specifies the location from which particles are emitted\.

**entity** {#entity}
A game object with one or more components that provide some behavior or functionality\. An entity consists of a unique ID and a container\.

**environment probe** {#environment_probe}
A technique that uses cube maps to provide a game level or location with realistic ambient lighting\.

**experimental** {#experimental}
A designation for a Lumberyard tool that we recommend that you not use in production yet, as it is still in the early stages of development and we have no current plans to support it\. However, it also means that feature is stable enough and functional for specific use cases\. You may find the experimental feature helpful as a guideline for implementing your own game\-specific features\. API operations are subject to change\.

**gem** {#gem}
A package that contains code and assets to provide a single feature or multiple tightly scoped functions\.

**gloss map** {#gloss_map}
An image that represents the microscale roughness of a surface\. The gloss map is located in the alpha channel of the normal map\.

**heightmap** {#height_map}
A grayscale image used to modify vertex positions of a surface\. Lumberyard uses heightmaps to store terrain surface height data\. White areas represent the high areas while black areas represent the low areas of the terrain\.

**HDR tone mapping** {#hdr_tone_mapping}
The process of converting the tonal values of an image from a high dynamic range \(HDR\) to a lower range\.

**helper** {#helper}
Visual icons attached to objects in Lumberyard Editor that provide object\-specific functionality\.

**IK** {#ik}
Inverse kinematics\. The use of kinematics equations to calculate the positions and orientations of joints of a character's skeleton so that a specific part of the skeleton \(the end effector\) reaches a defined target point\.

**IBL** {#image_based_lighting}
Image\-based lighting\. A rendering technique that involves capturing lighting information, storing it in an environment probe, and projecting it onto a scene\.

**imposter** {#imposter}
Procedurally created 2D sprites that are rendered to look like 3D objects\. In essence, imposters are 2\.5D objects\.

**k\-means clustering** {#kmeansclustering}
Method for partitioning a set of data points into k separate groups\. Each group has a mean calculated from the average of the points it contains and each point is assigned to a group based on which group mean the point is closest to\. The method usually works iteratively, alternating between updating point assignments and updating mean values until a stable partition is reached\.

**keyframe** {#keyframe}
An animation frame that specifies exact positions and orientations of geometry affected by the animation\. Animation frames that exist between keyframes are interpolated based on animation curves\.

**legacy** {#legacy}
A designation for Lumberyard tools that are no longer being advanced and will eventually be removed\.

**level** {#level}
A world or map that represents the space or area available to the player during the course of completing a discrete game objective\. Most games consist of multiple levels\.

**locomotion locator** {#locomotion_locator}
The Y vector of the character root joint quaternion, which is typically the direction in which the character is facing\. The locomotion locator is needed for motions that translate in nonuniform ways, such as stop or start transitions that have changes in acceleration\.

**LOD** {#lod}
Level of detail\. A technique for increasing performance and reducing draw calls by displaying progressively less\-detailed objects the farther they are from the camera\.

**look pose** {#look_pose}
Part of a collection of parametric\-blended poses for making a character look at specified points in the game\.

**mesh** {#mesh}
A collection of vertices that define the surface of an object\.

**minimap** {#mini_map}
A miniature map placed at a screen corner in the game to aid players in orienting themselves in the world\.

**mip map** {#mip_map}
A precalculated, optimized sequence of textures, each of which is a progressively lower resolution representation of the same image\. Used in conjunction with [LOD](#lod) processing\.

**morph target** {#morph_target}
A snapshot of vertex locations for a specific mesh that have been deformed in some way\.

**morph target animation**
See [blend shape](#blend_shape).

**navmesh** {#navmesh}
A navigation mesh, or navmesh, defines the areas of an environment in which a character can move freely without obstructions such as trees, lavas, or other environmental barriers\.

**normal** {#normals}
The vector that is orthogonal to a surface defined by a set of vertices\.

**normal map** {#normal_map}
An image whose pixel values are interpreted as the normal vectors for each point on the surface to which the image is mapped\.

**null bone** {#null_bone}
The character bone associated with a null or root object\.

**parallax mapping** {#parallax_mapping}
A technique that is used to create detail in a texture adding the illusion of depth\. This depth perception changes based on perspective\.

**PBR** {#pbr}
Physically based rendering\. PBR uses real\-world physical rules and properties to define how light interacts with the surface of objects\. Used by the Lumberyard rendering system\.

**per\-vertex animation**
See [blend shape](#blend_shape).

**POM** {#pom}
Parallax occlusion mapping\. POM uses a displacement map to encode surface detail information in a texture\. In this way self\-occlusion and self\-shadowing of an object is possible without changing the surface geometry\.

**prebaked**
See [baked](#baked).

**prefab** {#prefab}
A game object template that stores an asset or a group of assets and all associated properties\.

**Preview** {#preview}
A designation for Lumberyard tools that may be missing key features but are still stable and usable\. The user experience is high quality, functional, and consistent where it exists but may be unfinished\. APIs are subject to change\.

**procedural vegetation** {#procedural_vegetation}
A technique used to automatically cover a large area of terrain with vegetation objects using texture layers\.

**project** {#project}
The collection of levels, assets, and code that make up a game\.

**quaternion** {#quarternion}
Mathematical notation that represents the orientation and rotation of objects in three dimensions\.

**ragdoll** {#ragdoll}
Physical rules used to simulate the realistic movement of a skeletal character\.

**rigging** {#rigging}
The process of building a skeleton hierarchy of bone joints for a character mesh\.

**rope** {#rope}
Used for attaching cloth, hair, or ropes to a character so that the objects can dangle and move realistically against the character\.

**retargeting** {#retargeting}
Applying animations that were created for one model to another\.

**scripts** {#scripts}
Used for creating logic and behaviors for your game project\. You can create scripts with one of the following:
+ Script Canvas is a visual scripting tool that doesn't require you to know how to code\. You can use the **Script Canvas** editor to create Script Canvas graphs\. Script Canvas graphs have the file extension, `.scriptcanvas`, such as `myscriptexample.scriptcanvas`\. You can add your Script Canvas graph to your game entities with the **Script Canvas** component\.
+ Lua is a lightweight and embeddable scripting language\. You can use Lua to facilitate quick iteration of your game project\. Lua scripts have the file extension `.lua` or `.luac`, such as `myscriptexample.lua`\. You can add script functionality to your game entities with the **Lua Script** component\.

**sequence** {#sequence}
The content generated from the Track View for cutscenes or other canned animation triggers\.

**shadow map** {#shadow_map}
A technique for controlling how shadows are added to a scene\. You can use multiple, cascaded shadow maps to control how sun shadows look at varying distances\.

**skinning** {#skinning}
The process of binding bone joints to a model's mesh \(skin\)\.

**skybox** {#skybox}
A cube without the bottom side that contains the environment around a scene\. Usually viewed from the inside of the cube\.

**slices** {#slices}
Cascaded data management system for entities\. Similar to the capability of prefabs, slices are reusable component entity templates that you can easily update\.

**socket** {#socket}
A pivot point on a character where attachments are connected\. Attachments dangle or move according to the properties of the socket\.

**specular map** {#specular_map}
An image that determines the shininess of each area of a surface\.

**SPOM** {#spom}
Silhouette parallax occlusion mapping\. SPOM is similar to [POM](#pom), but affects the silhouette of a mesh similar to tessellation, without the object actually being tessellated\.

**sprite** {#sprite}
A 2D bitmap image\. Multiple sprites can be grouped into a single image known as a sprite sheet\.

**SSDO** {#ssdo}
Screen Space Directional Occlusion is a method for approximating real time global illumination \(GI\)\.

**SSS index** {#sss_index}
Subsurface scattering index\. SSS is used to simulate the diffusion and scattering of light transmitted through translucent objects\.

**tessellation** {#tessellation}
The deformation of a surface using one or more geometric objects with no overlaps or gaps\. Tessellation increases the geometry count of the mesh by subdividing polygons into smaller polygons before it gets displaced\.

**texture mapping** {#texture_map}
The application of an image to a surface\.

**TOD** {#tod}
The time of day in a level\. TOD is used to simulate the changing lighting conditions as the sun crosses the sky\.

**UV mapping** {#uv_map}
The projection of texture coordinates onto a 3D surface\.

**vertex color** {#vertex_color}
A method for adding variety, depth, and color variations to an object surface\.

**virtual reality** {#virtual_reality}
Technology that replicates the gaming environment and simulates a user's presence in it, allowing the player to feel as if they are in the game world as they interact with the environment, characters, and objects\.

**voxel** {#voxel}
A volumetric point in a 3D space, similar to a pixel in a 2D space\.

**Waf** {#waf}
Game build system that allows you to automatically compile a game that targets all supported platforms\.

**white point** {#white_point}
The reference value used to indicate true white in an image or level\.

**z\-fighting** {#z_fighting}
Phenomenon in 3D rendering that occurs when two or more primitives have similar or identical values in the z\-buffer\. Also called stitching\.