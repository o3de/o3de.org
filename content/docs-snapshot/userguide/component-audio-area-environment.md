# Audio Area Environment<a name="component-audio-area-environment"></a>

Using the **Audio Area Environment** component, you can apply environment effects to sounds that an entity triggers\. You must also add a shape component to use the audio area environment component\.

## Audio Area Environment Properties<a name="component-audio-area-environment-properties"></a>

The **Audio Area Environment** component has the following properties:

**Broad\-phase Trigger Area**  
Link this property to an entity that includes a trigger area and shape\. This trigger area is used for broad\-phase checks\. The **Audio Area Environment** component tracks any entity that moves inside the trigger area\.  
Default: None

**Environment name**  
The name of the [Audio Translation Layer \(ATL\)](audio-default-controls.md) environment to apply to entities in the area\.  
Default: None

**Environment fade distance**  
The distance around a shape where the environment amounts will fade based on an entity's distance from the shape\. Only positive, non\-zero values are valid\.  
Default: 1\.0

## Using the Audio Area Environment Component<a name="component-audio-area-environment-setup"></a>

Setting up the **Audio Area Environment** component requires two entities\. The second entity is linked to the **Audio Area Environment** component in the first entity, acting as a broad\-phase trigger area\. When these entities are configured properly, any entity that passes near or through the inner shape of the first entity will have an environment amount applied to any triggered sounds\.

**To set up the Audio Area Environment component**

1. In Lumberyard Editor, right\-click the viewport in your level, and click **Create new component entity**\.

1. Click **Tools**, **Entity Inspector**\. Be sure that your new component entity is selected in the viewport\.

1. In the **Entity Inspector**, click **Add Component**, **Shape**, and then select one of the shape options\.

1. Click **Add Component**, **Audio**, **Audio Area Environment**\.

1. Repeat steps 1 – 4 to add another entity with a **Shape** \(any\) component and a **Trigger Area** component \(located under **Scripting**\)\.

1. Place and size the two entities so that the following conditions are met:
   + The second entity's shape completely encompasses the first entity's shape\.
   + The second entity's shape is larger than the first entity's shape by at least the value for the **Environment fade distance**\. This allows the **Audio Area Environment** component to track an entity's distance from the inner shape when the entity enters the outer trigger area\.

1. \(Optional\) In the **Entity Inspector**, for the **Trigger Area** component, use the **Tag Filters** to filter entities that you don't want the **Audio Area Environment** component to process\.