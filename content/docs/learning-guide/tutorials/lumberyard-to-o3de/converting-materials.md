---
linkTitle: Converting Materials
title: Converting Materials
description: Learn to run the converter tool to process Lumberyard .mtl files to O3DE .azmaterial and associated textures
weight: 200
toc: true
---

This tutorial teaches you how to use the **Legacy Asset Converter** to convert legacy material files (*.mtl*) to Atom materials (*.azmaterial*). This utility will also convert Metallic, Normal and Roughness textures to an acceptable Atom format.

| O3DE Experience | Time to Complete | Feature Focus | Last Updated |
| - | - | - | - |
| Beginner | 10 Minutes | Convert .mtl files and test them in O3DE | February 27, 2024 |

## Launch the Legacy Asset Converter application

This utility application lies in the AtomLyIntegration gem, there is a **first-time setup** to do in order for the application to find the engine. Open the folder `YOUR_O3DE_INSTALL_FOLDER\Gems\AtomLyIntegration\TechnicalArt\DccScriptingInterface`, copy the file `settings.local.json.example` and rename it to `settings.local.json`. You will need to open it with a text editor to **replace the paths to match your install** of O3DE.

```json
{
	"O3DE_DEV": "C:\\depot\\o3de-dev",
	"PATH_O3DE_3RDPARTY": "C:\\depot\\3rdParty",
	"PATH_O3DE_BIN": "C:\\depot\\o3de-dev\\build\\\windows_vs2019\\bin\\profile",
    "DCCSI_LOG_PATH": "{your_path}\\user\\log\\DCCsi"
}
```

{{< note >}}
"O3DE_DEV" is the location of your local O3DE github repository. "PATH_O3DE_3RDPARTY" is the 3rd party install folder (by default `C:\Users\CURRENT_USER\.o3de\3rdParty`). "PATH_O3DE_BIN" is the folder where the O3DE `editor.exe` is available. "DCCSI_LOG_PATH" is the location where the logs for this tool will be outputed, you can use anything.
{{< /note >}}

The utility rely on the **local O3DE python install**, made accessible via a .bat file for Windows and .sh for Linux. Now that the settings are set, you can open a command line on the `DccScriptingInterface` folder and run :

- `.\python foundation.py`
- `.\python config.py`

Finally, you will be able to **open the Legacy Asset Converter** from this folder via the following command :

- `.\python SDK\Maya\Scripts\Python\legacy_asset_converter\main.py`

## Convert materials and textures

The tool will greet you with a friendly UI that will allow you to select options for the conversion. You can leave the "Actions" values to their default.

![Legacy Asset Converter](/images/learning-guide/tutorials/lumberyard-to-o3de/legacy-asset-converter.png)

1. Click on the button to set the input folder containing the *.mtl* files.
2. Click on the button to set the output folder.
3. Click to launch the conversion
4. You can follow the progress via this bar

Most of the assets for the **StarterGame** project are located in the folder `LUMBERYARD_FOLDER\dev\Gems\StarterGame`. It is recommended to convert one Gem at a time by using its `Assets` folder as input, as it will keep the folder hierarchy. Some materials are not yet supported by the conversion, you can check the `legacy_asset_converter\constants.py` file to see the supported types.

{{< known-issue >}}
For now the utility **only handle *.fbx* files as entry** and will only convert their associated *.mtl* files. Materials with no .fbx association such as terrain or effect materials will not be converted (will be fixed in the near future).
{{< /known-issue >}}

## Import the materials in O3DE

Launch O3DE and open a project (check the [Get Started](/docs/welcome-guide) section if you don't know how to proceed). Then simply open your export folder and **copy the content of `Assets` into your O3DE project `Assets` folder**. The asset processor will detect and compile the new content, and you will be able to open the material files.
