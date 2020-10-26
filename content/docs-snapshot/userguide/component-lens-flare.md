# Lens Flare<a name="component-lens-flare"></a>

The **Lens Flare** component allows the placement of a lens flare on an entity\.

## Lens Flare Component Properties<a name="component-lensflare-properties"></a>

The **Lens Flare** component has the following properties:

**Visible**  
If selected, shows the lens flare\.

**Library**  
Select a lens flare library that has been authored by the **Lens Flare** editor\.

**Lens flare**  
Select a lens flare from the available flares in the lens flare library\.Flare Settings

**Minimum spec**  
The minimum spec at which this lens flare is enabled\.  
Default: Low

**FOV**  
The field of view \(FOV\) in degrees around the lens flare\. Use **360** degrees to make the lens flare visible from all angles\.  
Default: 360

**Size**  
The size of the lens flare\.

**Attach to sun**  
If selected, attaches the lens flare to the sun \(as opposed to attaching to the entity\)\.

 **Ignore vis areas**   
If selected, lens flare ignores vis areas\.

 **Indoor only**   
If selected, lens flare is rendered indoors only\.

 **On initially**   
If selected, the lens flare is on when the scene starts\.

 **View distance multiplier**   
Adjust the maximum view distance\. For example, **1\.0** would use the default and **1\.1** would be 10% further than the default\.Color Settings

 **Tint**   
Color of the lens flare\.

 **Tint \[alpha\]**   
Alpha value that sets the flare's transparency\.

 **Brightness**   
Brightness of the lens flare\.Animation

 **Sync with light**   
If selected, uses the animation settings of the provided light\. Select the light entity in the **Light** setting\.

 **Light**   
This setting appears when the **Sync with light** setting is selected\. Use the picker \(hand icon\) to select the light component you want to sync animation settings with\.

 **Style**   
Light animation curve ID \(style\) as it corresponds to values in `Light.cfx`\.

 **Speed**   
Multiple of the base animation rate\.

 **Phase**   
Animation start offset from **0** to **1**\. **0\.1** would be 10% into the animation\.

## EBus Request Bus Interface<a name="component-lensflare-ebusrequest"></a>

Use the following request function with the EBus interface to communicate with other components of your game\.

For more information about using the Event Bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.
+ **SetLensFlareState** \(`On` or `Off`\) – Turns the lens flare on or off\.
+ **TurnOnLensFlare** – Turns the lens flare on\.
+ **TurnOffLensFlare** – Turns the lens flare off\.
+ **ToggleLensFlare** – Toggles the lens flare state \(`on` to `off`, or `off` to `on`\)\.

## EBus Notification Bus Interface<a name="component-lensflare-ebusnotification"></a>

Use the following notification functions with the EBus interface to communicate with other components of your game\.

For more information about using the Event Bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.
+ **LensFlareTurnedOn** – Sends a signal when the lens flare is turned on\.
+ **LensFlareTurnedOff** – Sends a signal when the lens flare is turned off\.

The following is an example of script using the **Request Bus Interface**\.

```
function example:OnActivate()
    LensFlareComponentRequestBus.Event.SetLensFlareState(self.entityId, LensFlareComponentState.Off)
    LensFlareComponentRequestBus.Event.TurnOnLensFlare(self.entityId)
    LensFlareComponentRequestBus.Event.TurnOffLensFlare(self.entityId)
    LensFlareComponentRequestBus.Event.ToggleLensFlare(self.entityId)
end
```