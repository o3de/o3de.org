# Decal<a name="component-decal"></a>

Use the **Decal** component to place a component on an entity\.

## Decal Component Properties<a name="component-decal-properties"></a>

The **Decal** component has the following properties:

**Visible**  
If selected, shows the decal\.

**Projection Type**  
Specifies the type of decal projection: **Planar**, **On Terrain**, or **On Terrain and Static Objects**\.  
Default value: Planar

**Material**  
The decal's material file\.

**Sort Priority**  
Sort priority relative to other decals in the system\.  
Valid values: 0 – 255  
Default value: 16

**Depth**  
Projection depth for deferred decals\.  
Valid values: 0 – 10  
Default value: 1

**Offset**  
Allows offsetting the decal relative to the entity's position\.  
Default value: 0,0,0

**Opacity**  
Degree of transparency for the decal \(only available for deferred decals\)\.

**Deferred**  
Shows **No** for **Planar** and **On Terrain Projection Type**\. Shows **Yes** for **On Terrain and Static Objects**\.

**Max view distance**  
The furthest distance at which this decal can be viewed\.

**View distance multiplier**  
Multiplier to the automatically computed fade\-out camera distance\.

**Minimum spec**  
Minimum spec for the decal to be active\.

## EBus Request Bus Interface<a name="component-decal-ebusrequest"></a>

Use the following request function with the EBus interface to communicate with other components of your game\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

### SetVisibility<a name="decal-ebus-setvisibility"></a>

Sets an explicit value \(true/false\) on the decal's visibility\.

**Parameters**  
`true` or `false`

### Show<a name="decal-ebus-show"></a>

Shows the decal\.

**Parameters**  
None

### Hide<a name="decal-ebus-hide"></a>

Hides the decal\.

**Parameters**  
None

The following is an example of script using the **Request Bus Interface**\.

```
function decalexample:OnActivate()
    DecalComponentRequestBus.Event.Hide(self.entityId)
    DecalComponentRequestBus.Event.Show(self.entityId)
    DecalComponentRequestBus.Event.SetVisibility(self.entityId, false)
end
```