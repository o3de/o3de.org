# Audio Preload<a name="component-audio-preload"></a>

Using the **Audio Preload** component, you can load and unload ATL preloads, which contain references to soundbanks\. You can specify the loading type as automatic or manual\. The automatic loading type means that preloads load when the component activates and unloads when it deactivates\. The manual loading type means the component does not take any action until the user makes a request\.

## Audio Preload Properties<a name="component-audio-preload-properties"></a>

The **Audio Preload** component has the following properties:

**Preload Name**  
Name of the default ATL Preload that this component loads or unloads\. Modify this property to define a custom default ATL preload\.  
Default: Blank

**Load Type**  
Set to **Auto** or **Manual**\.  
If set to **Auto**, preloads load when component activates and unload when component deactivates\.  
If set to **Manual**, preloads load and unload only when the user makes the request to the interface\.  
Default: Auto

## EBus Request Bus Interface<a name="component-audio-preload-ebusrequest"></a>

Use the following request functions with the EBus interface to communicate with other components of your game\.

For more information about using the Event Bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.


**Load**  

|  |  | 
| --- |--- |
| Name | Load | 
| Description | Loads the default ATL preload \(if it is set\) | 
| Parameters | None | 
| Return | None | 
| Scriptable | Yes | 


**Load**  

|  |  | 
| --- |--- |
| Name | Unload | 
| Description | Unloads the default ATL preload \(if it is set\) | 
| Parameters | None | 
| Return | None | 
| Scriptable | Yes | 


**Load**  

|  |  | 
| --- |--- |
| Name | LoadPreload | 
| Description | Loads an ATL preload by name | 
| Parameters |  **preloadName**  Name of an ATL Preload to load  | 
| Return | None | 
| Scriptable | Yes | 


**Load**  

|  |  | 
| --- |--- |
| Name | UnloadPreload | 
| Description | Unloads an ATL preload by name | 
| Parameters |  **preloadName**  Name of an ATL Preload to unload  | 
| Return | None | 
| Scriptable | Yes | 


**Load**  

|  |  | 
| --- |--- |
| Name | IsLoaded | 
| Description | Returns whether this component has loaded an ATL preload | 
| Parameters |  **preloadName**  Name of an ATL Preload to check  | 
| Return | bool True if this component has already loaded the specified preload, false otherwise | 
| Scriptable | Yes | 