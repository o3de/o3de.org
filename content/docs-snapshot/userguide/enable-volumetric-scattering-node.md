# Enable Volumetric Scattering<a name="enable-volumetric-scattering-node"></a>

Adds a volumetric effect for simulating fog, snow, or other environments\. You can specify the color, speed, and amount for each effect, so that you can simulate various environments, such as lava\.

**Note**  
This effect has high performance impact and can negatively affect the frame rate\.

To disable the effect, see [Disable Volumetric Scattering](disable-volumetric-scattering-node.md)\.

**Contents**
+ [Inputs](#enable-volumetric-scattering-note-input)
+ [Outputs](#enable-volumetric-scattering-node-output)

![\[enablevolumetricscatttering, enablevolumetricscatteringnode\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-volumetric-scattering-node.png)

## Inputs<a name="enable-volumetric-scattering-note-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event |  Triggers the node\.  | 
| Amount | Number |  Sets volumetric scattering amount\. Default value: `1`  | 
| Tiling | Number |  Sets volumetric scattering tiling\. Default value: `1`  | 
|  Speed  | Number |  Sets volumetric scattering animation speed\. Default value: `1`  | 
| Color | Color | Sets volumetric scattering color tint\. | 

## Outputs<a name="enable-volumetric-scattering-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 