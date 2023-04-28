---
title: Atom Tools Viewport
description: Learn about the viewport, settings, and interactions shared by many tools in Atom.
toc: true
---

## Viewport
The Atom Tools Viewport is shared by multiple tools like Material Editor and Material Canvas.

The viewport contains the following features and configurable options:
- An interactive camera that you can move and orient in the viewport.
- A model placed at the origin of the scene with a material applied to it. 
- A lighting preset that provides a skybox, image based lighting, directional lights, tone mapping, and other configurable lighting conditions.  
- An optional grid at the origin of the viewport.  
- An optional shadow catcher at the origin of the scene that renders a planar shadow of the viewport model. 
- A toolbar for toggling features and selecting the current model, lighting preset, and render pipeline.

![Viewport](/images/atom-guide/tools/viewport.png)

### Interacting with the viewport
You can view the model or other content in the viewport at different perspectives by controlling the camera, model, or environment.

#### Camera controls
These controls adjust the camera view.
| Control | Action |
| - | - |
| **LMB+Drag**, **RMB+Drag** | Tumble the camera around a pivot or point of interest. |
| **MMB Scroll** | Dolly the camera toward or away from a pivot or point of interest. |
| **MMB+Drag** | Track the camera left, right, up, and down in the direction of mouse movement. |
| **Z** | Reset camera view. |

#### Model and lighting controls
These controls adjust the model and lighting within the current camera view. 
| Control | Action |
| - | - |
| **Ctrl+LMB+Drag** | Tumble the model. |
| **Shift+LMB+Drag** | Rotate the lighting environment horizontally around the model. |

#### Industry-standard controls
Industry-standard controls to orbit, zoom, and pan in the Viewport. 
| Control | Action |
| - | - |
| **Alt+LMB+Drag** | Tumble the camera around a pivot or point of interest. |
| **Alt+RMB+Drag** | Dolly the camera toward or away from a pivot or point of interest. |
| **Alt+MMB+Drag** | Track the camera left, right, up, and down in the direction of mouse movement. |

## Viewport Toolbar
The Viewport Toolbar contains the following set of functions to configure the Viewport:

| Function | Description |
| - | - |
| **Display Grid** | Show or hide the ground plane in the Viewport.    |  |  |
| **Display Shadow** | Show or hide the shadow effect in the Viewport.    |  |  |
| **Alternate Skybox** | Toggle between the primary and alternate skybox settings for the active lighting preset.    |  |  |
| **Tone Mapping** | Select which tone mapping effect will be applied to the viewport.    |  |  |
| **Model Preset** | Select a model preset to preview the material on. A model preset can be configured in the [Model property group](#model) in the Viewport Settings.   |  |  |
| **Lighting Preset** | Select a lighting preset to view your material in a specific image-based lighting (IBL) environment. A lighting preset is a set of image-based lighting (IBL) data that can be configured in the [Lighting property group](#lighting) in the Viewport Settings. |  |  |
| **Render Pipeline** | Select the render pipeline that will be used to render the scene in the viewport. |  |  |

## Viewport Settings
The Viewport Settings window displays options to configure the Viewport properties. These properties control how the Viewport appears and which features are active. You can also create or edit presets for the viewport model and the lighting environments. 

![Viewport Settings](/images/atom-guide/tools/viewport-settings.png)

Viewport Settings contains the following settings groups:

### General
The General property group contains basic properties that are required by the Viewport. 

| Property | Description |
| - | - |
| **Enable Grid** | Show or hide the ground plane. (This property is also accessible in the Viewport Toolbar.) |
| **Enable Shadow Catcher** | Show or hide shadow effects. (This property is also accessible in the Viewport Toolbar.) |
| **Enable Alternate Skybox** | Toggle to display the alternate skybox image if one is specified by the **Skybox Image Asset (Alt)** property in the lighting preset.  |
| **Field of View** | Adjust the camera's field of view. |
| **Display Mapper Type** | Configure tone mapping and color grading |

### Model
The Model property group allows you to manage the list of available model presets, and configure their properties. Model presets are useful for previewing materials on a variety of surfaces. Atom includes a collection of basic models, and you can create additional presets with custom models. Model presets are stored in JSON files (`*.modelpreset.azasset`) and can be configured in the Viewport Settings. 

#### Buttons
These controls are used to create, edit, save, or reset a specific model preset.  
| Button | Description |
| - | - |
| **Add** | Create a new model preset and select a save file location. Model presets can be saved anywhere in your project folder.  |  |  |
| **Select** | Open the **Model Preset Browser**, browse, and select from the list of available model presets. |  |  |
| **Save** | Save changes made to the selected model preset. |  |  |

#### Properties
The following are properties you can configure for the selected model preset.  
| Property | Description |
| - | - |
| **Display Name** | Specify the name of this preset. The name appears in the Viewport Model drop-down list in the Viewport Toolbar.  |  |  |
| **Model Asset** | Assign a model asset for this preset. The model asset must be in FBX format (`.fbx`). |  |  |
| **Preview Image Asset** | Assign an image as the preview icon for this preset. The image appears in the Viewport Model drop-down list in the Model Preset Browser. |  |  |

#### Model Preset Browser
The **Model Preset Browser** window opens when the **Select** button is pressed. The Model Preset Browser window is a separate window that cannot be docked.

![Model Preset Browser](/images/atom-guide/tools/model-preset-browser.png)

### Lighting
The Lighting property group allows you to manage the list of available lighting presets, and configure their properties. Lighting presets are useful for previewing materials in a variety of lighting conditions. Atom includes a collection of lighting presets, and you can create additional presets with a custom skymap image and lighting properties. Lighting presets are stored in JSON files (`*.lightingpreset.azasset`), and can be configured in the Viewport Settings. 

#### Buttons  
These controls are used to create, edit, save, or reset a specific lighting preset.  

| Button | Description |
| - | - |
| **Add** | Create a new lighting preset and select a save file location. Lighting presets can be saved anywhere in your project folder.  |  |  |
| **Select** | Open the **Lighting Preset Browser**, browse, and select from the list of available lighting presets. |  |  |
| **Save** | Save changes made to the selected lighting preset. |  |  |

#### Properties  
The following are properties you can configure for the selected lighting preset.  

| Property | Description |
| - | - |
| **Display Name** | Specify the name of this preset. The name appears in the Viewport Model drop-down list in the Viewport Toolbar.  |  |  |
| **IBL Diffuse Image Asset** | Assign a diffuse lighting cubemap to use for IBL. |  |  |
| **IBL Specular Image Asset** | Assign a specular lighting cubemap to use for IBL. |  |  |
| **Skybox Image Asset** | Assign a diffuse lighting cubemap to use as the skybox, or background. |  |  |
| **Skybox Image Asset (Alt)** | Assign a diffuse lighting cubemap to use an alternative skybox, or background. This allows you to have a different background while using the same lighting settings. Enable this skybox using the **Enable Alternate Skybox** property in the [General](#general) settings. |  |  |
| **Skybox Exposure** | Adjust the brightness of the skybox. |  |  |
| **Shadow Catcher Opacity** | Adjust the opacity level of the ground plane that catches the model's shadows.  |  |  |
| **Exposure** | A group of settings to configure the exposure. |  |  |
| **Lights** | Manage a list of lights for the active lighting preset. |  |  |

#### Lighting Preset Browser  
The **Lighting Preset Browser** window opens when the **Select** button is pressed. The Lighting Preset Browser window is a separate window that cannot be docked.

![Lighting Preset Browser](/images/atom-guide/tools/lighting-preset-browser.png)

{{< note >}}  
Lighting and model presets can be stored in any valid source asset folder in your project or gems. They will automatically be discovered and selectable from the Viewport Toolbar or Viewport Settings Panel. 
{{< /note >}}  
