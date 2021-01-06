---
description: ' Use the &entity-converter; tool to convert entities from the legacy
  entities (CryEntities) to the new &component-system; in &ALYlong;. '
title: Converting Entities with the &entity-converter;
---
# Converting Entities with the Legacy Converter<a name="component-entity-data-converter"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

The Legacy Converter converts your [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy) entities \(CryEntities\) to the new component entity system\. Legacy features will eventually be removed from Lumberyard Editor\. When you use the Legacy Converter, it tries to convert all legacy entities in your level\. You cannot select which entities to convert or skip\. Once an entity is converted, it cannot be converted back to a legacy entity\. 

**Topics**
+ [Converting Your Legacy Entities](#using-the-entity-convertor-tool)
+ [List of Legacy Entity Conversions](#conversion-component-entity-list)

## Converting Your Legacy Entities<a name="using-the-entity-convertor-tool"></a>

If your level has legacy entities, Lumberyard Editor detects them and prompts you to convert them\.

**To convert your legacy entities**

1. Do any of the following to open the Legacy Converter:
   + If the CryEntity Removal gem is enabled, and you load a level that contains legacy entities, the Legacy Converter opens by default\. 
   + In Lumberyard Editor, choose **File**, **Upgrade Legacy Entities**\. 
**Note**  
The CryEntity Removal gem disables all legacy features in Lumberyard Editor\. For more information, see the [CryEntity Removal Gem](/docs/userguide/gems/cryentity-removal-gem.md)\.

1. The dialog box shows the number of legacy entities in your level\. Choose **Convert Entities**\. 

   A progress bar appears that shows the number of entities that the Legacy Converter is processing\. The conversion takes several seconds to complete\.  
![\[The conversion log shows which entities were converted and which were not in Lumberyard.\]](/images/userguide/component/entity_system/legacy-converter-entities-detected.png)

1. After the conversion completes, the dialog box shows the number of converted and unconverted entities\. See the **Status** and **Message** columns for more information\. Choose **OK**\.  
![\[The conversion log shows that entities converted and which did not in Lumberyard.\]](/images/userguide/component/entity_system/legacy-converter-conversion.png)
**Note**  
If the Legacy Converter can't convert an entity, a **Conversion Error** dialog box appears that shows the number of entities that were not converted\. If the CryEntity Removal gem is enabled, unconverted entities remain in your level but cannot be edited\. For more information, choose **View Log**\. You can also choose **Export Log** to save the conversion log as a `.csv` file\.

## List of Legacy Entity Conversions<a name="conversion-component-entity-list"></a>

The Legacy Converter converts each legacy entity to its corresponding component entity\. For a list of legacy entities, see the [Entity Reference](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/entities-entity-library.html) in the *Amazon Lumberyard Legacy Reference*\.

Converted entities keep the same position in the viewport\. For more information, see [Using the Viewport](/docs/userguide/editor/viewport.md)\. 

**Note**  
Some legacy entities cannot be converted at this time\. 

See the following tables for the converted component entity\.

**Contents**
+ [Area Box Entity](#cry-area-box-entity)
+ [Area Sphere Entity](#cry-area-sphere-entity)
+ [Brush, Geom, and Simple Entities](#cry-brush-geom-simple-entities)
+ [Camera Entity](#cry-camera-entity)
+ [Camera Target Entity](#cry-camera-target-entity)
+ [Comment Entity](#cry-comment-entity)
+ [Environment Probe Entity](#cry-environment-probe-entity)
+ [Decal Entity](#cry-decal-entity)
+ [Designer Objects](#cry-designer-objects)
+ [Groups and Layers](#cry-groups-layers)
+ [Light Entity](#cry-light-entity)
+ [Light Entity with Lens Flare](#cry-light-entity-with-lens-flare)
+ [Particle Effect Entity](#cry-particle-effect-entity)
+ [Proximity Trigger Entity](#cry-proximity-trigger)
+ [Tag Point Entity](#cry-tag-point-entity)

### Area Box Entity<a name="cry-area-box-entity"></a>

An area box entity is converted to a component entity that is attached with a **[Box Shape](/docs/userguide/components/shapes.md)** component\.


****  

| Settings in Area Box Entity | Converted Settings in Box Shape Component | 
| --- | --- | 
|  Width  |  Dimensions : x  | 
|  Length  |  Dimensions : y  | 
|  Height  |  Dimensions : z  | 

### Area Sphere Entity<a name="cry-area-sphere-entity"></a>

An area sphere entity is converted to a component entity that is attached with a **[Sphere Shape](/docs/userguide/components/shapes.md)** component\.


****  

| Settings in Area Sphere Entity | Converted Settings in Sphere Shape Component | 
| --- | --- | 
|  Radius  |  Radius  | 

### Brush, Geom, and Simple Entities<a name="cry-brush-geom-simple-entities"></a>

The brush, geom, and simple entities are converted to a component entity that is attached with a **[Mesh](/docs/userguide/components/static-mesh.md)** component or **[Skinned Mesh](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/component-skinned-mesh.html)** component, depending on the asset type\.


****  

| Settings in Brush, Geom, and Simple Entities | Converted Settings in Mesh or Skinned Mesh Components | 
| --- | --- | 
|  Geometry \(set to `.cdf` files\)  |  Character Definition \(Skinned Mesh component\)  | 
|  Geometry \(set to non `.cdf` file\)  |  Static asset \(Mesh component\)  | 

### Camera Entity<a name="cry-camera-entity"></a>

A camera entity is converted to a component entity that is attached with a **[Camera](/docs/userguide/components/camera.md)** component\.


****  

| Settings in Camera Entity | Converted Settings in Camera Component | 
| --- | --- | 
|  FOV  |  Field of View  | 
|  NearZ  |  Near Clip Distance  | 
|  FarZ  |  Far Clip Distance  | 

### Camera Target Entity<a name="cry-camera-target-entity"></a>

The camera target entity is converted to an empty component entity\.

### Comment Entity<a name="cry-comment-entity"></a>

A Comment entity is converted to a component entity that is attached with a **[ Comment  Use the Comment component in Amazon Lumberyard to add text comments for component entities\.   The **Comment** component allows you to add long\-form text comments for component entities\. When enabled, the **Comment** component displays a dialog box that expands based on the size of the comment that you enter\. The following examples demonstrate how you can use the comment text box:  Explain how the scripts or components on an entity interact with other scripts or components Describe how everything in a level ties together Send descriptions, instructions, or notes to team members  

![\[Image NOT FOUND\]](/images/userguide/component/comment-component.png) Comment Properties The **Comment** component has the following property:  

**Comment text box**  
Stores the user comment for the component entity\.  
Default: None   Using the Comment Component You can use this feature by adding the component to an entity in your level\.  To use the Comment component In Lumberyard Editor, right\-click the viewport in your level, and click **Create entity**\. In the **Entity Inspector**, click **Add Component**\. Under **Editor**, click **Comment**\. In the **Entity Inspector**, under **Comment**, add comments for the component entity in the text box\.   ](component-camera.md)** component\.


****  

| Settings in Comment Entity | Converted Settings in Comment Component | 
| --- | --- | 
|  Text  |  Comment  | 

### Environment Probe Entity<a name="cry-environment-probe-entity"></a>

The environment probe entity is converted to a component entity that is attached with an **[Environment Probe](/docs/userguide/components/environment-probe.md)** component\.


****  

| Settings in Environment Probe Entity | Converted Settings in Environment Probe Component | 
| --- | --- | 
|  EnvironmentProbe Params : cubemap\_resolution  |  Environment Probe Settings : Resolution  | 
| EnvironmentProbe Params : Outdoor Only |  Options : Indoor only  | 
| EnvironmentProbe Params : ViewDistanceMultiplier |  Options : View distance multiplier  | 
|  EnvironmentProbe Properties : Active  |  On initially  | 
| EnvironmentProbe Properties : BoxSizeX |  Environment Probe Settings : Area dimensions : X  | 
| EnvironmentProbe Properties : BoxSizeY | Environment Probe Settings : Area dimensions : Y | 
| EnvironmentProbe Properties : BoxSizeZ | Environment Probe Settings : Area dimensions : Z | 
|  Color : Diffuse  |  General Settings : Color  | 
| Color : DiffuseMultiplier | General Settings : Diffuse multiplier | 
| Color : SpecularMultiplier | General Settings : Specular multiplier | 
|  Options : AffectVolumetricFogOnly  |  Options : Volumetric fog only  | 
| Options : AttenuatioinFallofMax  |  Environment Probe Settings : Attenuation fall off  | 
| Options : IgnoresVisAreas |  Options : Ignore vis areas  | 
| Options : Sort Priority |  Environment Probe Settings : Sort priority  | 
| Options : VolumetricFog  |  Options : Volumetric fog  | 
|  OptionsAdvanced : deferred\_cubemap  |  Cubemap generation: Cubemap asset  | 
|  Projection : BoxHeight  | Environment Probe Settings : Box height | 
|  Projection : BoxLength  | Environment Probe Settings : Box length | 
| Projection : BoxProject  | Environment Probe Settings : Box projected | 
| Projection : BoxWidth  | Environment Probe Settings : Box width | 

### Decal Entity<a name="cry-decal-entity"></a>

A decal entity is converted to a component entity that is attached with a **[Decal](/docs/userguide/components/decal.md)** component\.


****  

| Settings in Decal Entity | Converted Settings in Decal Component | 
| --- | --- | 
|  Entity : Mtl  |  Decal Settings : Material  | 
|  Entity : MinSpec  |  Decal Settings : Minimum spec  | 
|  Entity Params : ProjectType  |  Decal Settings : Projection type  | 
|  Entity Params : Deferred  |  Decal Settings : Deferred  | 
|  Entity Params : View Distance Multiplier  |  Options : View distance multiplier  | 
|  Entity Params : SortPriority  |  Decal Settings : View distance multiplier  | 
|  Entity Params : Projection Depth \(Deferred\)  |  Decal Settings : Depth  | 

### Designer Objects<a name="cry-designer-objects"></a>

The Legacy Converter converts designer objects to a component entity that is attached with the following components:
+ **[Mesh](/docs/userguide/components/static-mesh.md)**
+ **[Static Physics](https://docs.aws.amazon.com/lumberyard/latest/userguide/component-static-physics.html)** component\.
+ **[Mesh Collider](https://docs.aws.amazon.com/lumberyard/latest/userguide/component-physics-mesh-collider.html)**

The Legacy Converter converts the original shape of designer objects into `.cgf` files and then saves them to your game project directory\. 


****  

| Settings in Designer Object  | Converted Settings in Mesh Component | 
| --- | --- | 
|  Geometry  |  Mesh asset \(`.cgf` file\)  | 

**Example**  

1. You have a legacy designer object named *Designer1* shaped as a sphere\.   
![\[Legacy designer object before conversion.\]](/images/userguide/component/entity_system/legacy-converter-conversion-designer-object-1.png)

1. With the Legacy Converter, you convert the object into a entity with the **Mesh**, **Static Physics**, and **Mesh Collider** components attached\.  
![\[The log shows that converted legacy designer object.\]](/images/userguide/component/entity_system/legacy-converter-conversion-designer-object-2.png)

1. The Legacy Converter creates a `.cgf` file and saves it to the `lumberyard_version\dev\game-project\Objects\DesignerConversion\level-name\` directory\.   
![\[The converted designer object is a mesh asset file.\]](/images/userguide/component/entity_system/legacy-converter-conversion-designer-object-4.png)

1. In the **Mesh** component, the **Mesh asset** property specifies this `Designer1.cgf` file\. The entity has the same shape as the original designer object\.  
![\[The converted designer object is a mesh asset file.\]](/images/userguide/component/entity_system/legacy-converter-conversion-designer-object-3.png)

**Note**  
You cannot edit a designer object after it is converted into a component entity\. You can use the legacy **Designer Tool** to create your object and convert it again\. For more information, see [Using the Designer Tool](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/entities-designer-tool.html) in the *Amazon Lumberyard Legacy Reference*\.

### Groups and Layers<a name="cry-groups-layers"></a>

Groups and layers are converted to empty component entities with the same names\.

Legacy entities that are nested under legacy groups or layers appear nested under the newly created component entities, which keep the same hierarchy\. 

If a legacy entity belongs to a layer and a group, the converted component entity appears under the converted group component entity\. It also appears as a child of the converted layer component entity\.

**Example**  

1. You have the following legacy entities in your level:
   + LegacyEntityA, LegacyEntityB and LegacyEntityC are grouped under LegacyGroupA, so the hierarchy appears as: LegacyGroupA \[LegacyEntityA, LegacyEntityB, LegacyEntityC\]
   + LegacyEntityA belongs to LegacyLayerA, so the hierarchy appears as: LegacyLayerA \[LegacyEntityA\]

1. You use the Legacy Converter to convert your entities\.

1. The converted entities have the following hierarchy:

   ComponentEntityLayerA \[ComponentEntityGroupA\[ComponentEntityA, ComponentEntityB, ComponentEntityC\]\]

### Light Entity<a name="cry-light-entity"></a>

A light entity with the **Planar Light** setting specified is converted to a component entity that is attached with a **[Area Light](/docs/userguide/components/area-light.md)** component\.

A light entity with the **Projector** setting specified to **Texture** is converted to a component entity attached with a **[Projector Light](/docs/userguide/components/projector-light.md) **component\.

A light entity with neither the **Planar Light** or **Projector** setting specified to **Texture** is converted to a component entity attached with a **[Point Light](/docs/userguide/components/point-light.md)** component


****  

| Settings in Light Entity | Converted Settings Common in Area Light, Projector Light, and Point Light Components | 
| --- | --- | 
|  Entity Params : Outdoor Only  |  Options : Indoor Only  | 
| Entity Params : ViewDistanceMultiplier |  Options : View distance multiplier  | 
| Entity Params : HiddenInGame |  Visible  | 
|  Entity Properties : Active  |  On initially  | 
| Entity Properties : Color : Diffuse |  General Settings : Color  | 
| Entity Properties : Color : DiffuseMultiplier | General Settings : Diffuse multiplier | 
| Entity Properties : Color : SpecularMultiplier | General Settings : Specular multiplier | 
| Entity Properties : Options : AffectsThisAreaOnly |  Options : Affects this area only  | 
| Entity Properties : Options : AffectsVolumetricFogOnly  | Options : Volumetric fog only | 
| Entity Properties : Options : Ambient | General Settings : Ambient | 
| Entity Properties : Options : IgnoresVisArea | Options : Ignore vis areas | 
| Entity Properties : Options : VolumetricFog | Options : Volumetric fog | 
| Entity Properties : Style : LightStyle |  Animation : Style  | 
| Entity Properties : Style : AnimationSpeed |  Animation : Speed  | 
| Entity Properties : Style : AnimationPhase |  Animation : Phase  | 
| Entity Properties : Shadows : CastShadows \(spec\) |  Options : Cast shadow spec  | 
| The following settings appear only in the Entity Inspector when the setting Cast shadow spec has any value, expect Never\. |  | 
| Entity Properties : Shadows : ShadowBias  |  Shadow Settings : Shadow bias  | 
| Entity Properties : Shadows : ShadowResolutionScale | Shadow Settings : Shadow resolution scale | 
| Entity Properties : Shadows : ShadowSlopeBias | Shadow Settings : Shadow slope bias | 
| Entity Properties : Shadows : ShadowUpdateMinRadius | Shadow Settings : Shadow update radius | 
| Entity Properties : Shadows : ShadowUpdateRatio | Shadow Settings : Shadow update ratio | 


****  

| Settings in Light Entity | Converted Settings in Projector Light Component | 
| --- | --- | 
|  AttenuationBulbSize  |  Projector Light Settings : Attenuation bulb size  | 
| Projector : ProjectNearPlane | Projector Light Settings : Near plane | 
|  Projector : ProjectorFov  | Projector Light Settings : FOV | 
|  Projector : Texture  | Projector Light Settings : Texture | 
|  Radius  | Projector Light Settings : Max distance | 


****  

| Settings in Light Entity | Converted Settings in Area Light Component | 
| --- | --- | 
|  Radius  |  Area Light Settings : Max distance  | 
|  Shape : SourceDiameter  | Area Light Settings : Area height | 
|  Shape : SourceWidth  | Area Light Settings : Area width | 


****  

| Settings in Light Entity | Converted Settings in Point Light Component | 
| --- | --- | 
|  AttenuatioinBulbSize  |  Point Light Settings : Attenuation bulb size  | 
|  Radius  |  Point Light Settings : Max distance  | 

### Light Entity with Lens Flare<a name="cry-light-entity-with-lens-flare"></a>

A light entity with a lens flare is converted to a component entity that is attached with a **[Lens Flare](/docs/userguide/components/lens-flare.md)** component and a light component\.

The lens flare asset that is specified for a light entity is converted to the **Lens Flare** component settings: **Library** and **Lens flare**\.


****  

| Settings in Light Entity | Converted Settings in Point Light Component | 
| --- | --- | 
| Entity Properties : Style : FlareFOV |  Flare Settings : FOV  | 

### Particle Effect Entity<a name="cry-particle-effect-entity"></a>

The particle effect entity is converted to a component entity that is attached with a **[Particle](/docs/userguide/components/particle.md)** component\.


****  

| Settings in Particle Effect Entity | Settings in Particle Component | 
| --- | --- | 
|  ParticleEntity Properties : Prime  |  Spawn Settings : Pre\-Roll  | 
|  ParticleEntity Properties : CountScale  |  Spawn Settings : Count scale  | 
|  ParticleEntity Properties : TimeScale  |  Spawn Settings : Time scale  | 
|  ParticleEntity Properties : PulsePeriod  |  Spawn Settings : Pulse period  | 
|  ParticleEntity Properties : Scale  |  Spawn Settings : Speed scale  | 
|  ParticleEntity Properties : Strength  |  Spawn Settings : Strength curve time  | 
|  Audio : EnableAudio  |  Audio Settings : Enable audio  | 
|  Audio : Rtpc  |  Audio Settings : Audio RTPC  | 

### Proximity Trigger Entity<a name="cry-proximity-trigger"></a>

A proximity trigger entity is converted to a component entity attached with a **[Box Shape](/docs/userguide/components/shapes.md)** component, and a **[Trigger Area](/docs/userguide/components/triggerarea.md)** component\.


****  

| Settings in Proximity Trigger Entity | Converted Settings in Box Shape Component | 
| --- | --- | 
|  Entity Properties : DimX  |  Dimensions : x  | 
|  Entity Properties : DimY  |  Dimensions : y  | 
|  Entity Properties : DimZ  |  Dimensions : z  | 

### Tag Point Entity<a name="cry-tag-point-entity"></a>

A tag point entity is converted to an empty component entity\.