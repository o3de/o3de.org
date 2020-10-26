# Collision Attribute<a name="particle-editor-reference-collision"></a>

In the **Collision** attribute, specify how to control the particle's physical setup\.

![\[Collision attributes in the Particle Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-editor-collision.png)


**CPU Collision Attribute Parameters**  

| Name | Description | 
| --- | --- | 
| Physics Type | Specifies how the particle interacts physically\. [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-collision.html) | 
| Collide Terrain | Includes terrain in particle collisions\. Default value: false  | 
| Collide Static Objects | Includes non\-terrain, static objects in particle collisions\. This is expensive\. Default value: false  | 
| Collide Dynamic Objects | Includes non\-terrain, dynamic objects in particle collisions\. This is expensive\. Default value: false  | 
| On Collide | Upon impact with the static environment, the particle dies\. [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-collision.html)Default value: **Die**  | 
| Max Collision Events | Limits the number of collisions that the particle can have in its physics simulation\. This affects only particles that have Physics Type set to Rigid Body\. Valid values: `0` to `255`Default value: `0` | 
| Bounciness | Controls the elasticity for collision response\. This affects only particles that have Physics Type set to Simple Collision\. You can override this feature by setting Surface Type\. You can also use a special value of –1 to have the particle die on first collision\. Valid values: anyDefault value: `0` | 
| Collision Fraction | Determines the fraction of emitted particles that perform collisions\. Valid values: `0` to `1`Default value: `1`  | 
| Collision Cutoff Distance | Specifies the maximum distance from the camera at which collisions are performed\. A value of 0 means infinite\. Valid values: `0+`Default value: `0`  | 
| Surface Type | Selects from a variety of surface material types for the collision behavior\. If set, Surface Type overrides Bounciness and Dynamic Friction\. Default value: none | 
| Dynamic Friction | The coefficient of dynamic friction\. If set, Surface Type overrides Dynamic Friction\. This affects only particles that have Physics Type set to Simple Collision\. Valid values: `0+`Default value: `1` | 
| Thickness | Controls the fraction of the particle's visible radius to use for the physical radius\. This affects particles that have Physics Type set to Simple Physics and geometry particles that have Physics Type set to Simple Collision\. Valid values: `0+`Default value: `1` | 
| Density | Controls the particle density in kg/m^3\. An example of a physically correct value is Water = 1000\. This affects only particles that have Physics Type set to Simple Physics or Rigid Body\. Valid values: `0+`Default value: `1000`  | 

![\[Collision attributes for GPU in the Particle Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-editor-collision-gpu.png)


**GPU Collision Attribute Parameters**  

| Name | Description | 
| --- | --- | 
| Depth Collision | Specifies how the particle interacts physically\. [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-collision.html) | 
| Cubemap Far Plane | Sets the far plane distance for cubemap depth buffer generation\. Default value: `20` | 
| Die on Collide | Upon impact with the static environment, the particle dies\. [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-collision.html)Default value: **Die** | 
| Bounciness | Controls the elasticity for collision response\. This affects only particles that have Physics Type set to Simple Collision\. You can override this feature by setting Surface Type\. You can also use a special value of –1 to have the particle die on first collision\.Valid values: anyDefault value: `0` | 
| Thickness | Controls the fraction of the particle's visible radius to use for the physical radius\. This affects particles that have Physics Type set to Simple Physics\.Valid values: `0+`Default value: `1` | 