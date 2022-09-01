---
linkTitle: Gem Manifest File
description: Learn about the format and structure of the manifest file that defines Open 3D Engine Gems.
title: Gem Manifest File (gem.json)
weight: 400
---

The `gem.json` manifest provides data about a Gem. Each Gem must have a `gem.json` file at the root folder of that Gem.

## `gem.json` Manifest Contents
| Field | Required | Description  |
|-|-|-|
| gem_name | **Required** | The name of this gem.  This name must be fewer than 64 characters and contain only alphanumeric, '_' or '-' characters, and start with a letter. |
| display_name | **Required** | The user-friendly display name for this gem.  This name will be displayed in user interfaces and can contain characters not allowed in the `gem_name` field. |
| canonical_tags | **Required** | A list of pre-defined tags used to differentiate types of manifests which can be `Project`, `Template` or `Gem`.  For Gems this field should always be `Gem`.  |
| dependencies | Optional | The names of any other Gems, your Gem directly depends on: i.e. `Atom`, `PhysX`, `ScriptCanvas` etc. |
| documentation_url | Optional | The URL of the documentation for your gem: i.e. https://www.mydomain.com/docs. |
| icon_path | Optional | The relative path to the filename of the icon image file, usually `preview.png`. |
| last_updated | Optional | The date this file or Gem was last updated in `YYYY-MM-DD`, `YYYY-MM-DD HH:MM:SS`, or `YYYY-MM-DDTHH:MM:SS` format. |
| license | **Required** | The license this gem uses: i.e. Apache-2.0 or MIT. |
| license_url | **Required** | The URL for the license website: i.e. https://opensource.org/licenses/Apache-2.0 Or https://opensource.org/licenses/MIT. |
| origin | **Required** |The name of the originator for this gem: i.e. XYZ Inc. |
| origin_uri | Optional | The URI for the `.zip` file containing the Gem archive.  This is a direct link to download the Gem's `.zip` archive. |
| origin_url | Optional | The URL of the originator for this gem: i.e. https://www.mydomain.com. |
| repo_uri | Optional | The URI for the Gem repository containing this Gem. |
| requirements | Optional | Notice of any requirements your Gem has: i.e. This Gem requires you install X from https://www.mydomain.com. |
| sha256 | Optional | The SHA-256 digest of the `.zip` archive that the `origin_uri` field points to.  You can omit this field for testing, but we highly recommend including it. |
| summary | **Required** | A short description of your Gem. |
| type | **Required** | The type of gem which can be `Code`, `Asset` or `Tool`. This field is used as a filter in the Project Manager. |
| user_tags | Optional | A list of user-defined tags used to categorize Gems. This list should always include the name of your Gem, and any other common tags that might help a user discover your gem: i.e. `Network`, `Rendering`, `Utility`, `Scripting` etc. |


## `gem.json` Manifest Examples

### ScriptCanvas `Tool` Gem `gem.json` Manifest
ScriptCanvas is a `Tool` type gem that comes with the engine and provides Editor and game functionality.
```json
{
    "gem_name": "ScriptCanvas",
    "display_name": "Script Canvas",
    "license": "Apache-2.0 Or MIT",
    "license_url": "https://github.com/o3de/o3de/blob/development/LICENSE.txt",
    "origin": "Open 3D Engine - o3de.org",
    "origin_url": "https://github.com/o3de/o3de",
    "type": "Tool",
    "summary": "The Script Canvas Gem provides Open 3D Engine's visual scripting environment, Script Canvas.",
    "canonical_tags": [
        "Gem"
    ],
    "user_tags": [
        "Scripting",
        "Tools",
        "Utility"
    ],
    "icon_path": "preview.png",
    "requirements": "",
    "documentation_url": "https://o3de.org/docs/user-guide/gems/reference/script/script-canvas/",
    "dependencies": [
        "ScriptEvents",
        "ExpressionEvaluation",
        "GraphCanvas"
    ]
}
```

### AudioEngineWwise `Code` Gem `gem.json` Manifest
AudioEngineWwise is a `Code` type gem that comes with the engine that requires an external application be installed in order to use it.
```json
{
    "gem_name": "AudioEngineWwise",
    "display_name": "Wwise Audio Engine",
    "license": "Apache-2.0 Or MIT",
    "license_url": "https://github.com/o3de/o3de/blob/development/LICENSE.txt",
    "origin": "Open 3D Engine - o3de.org",
    "origin_url": "https://github.com/o3de/o3de",
    "type": "Code",
    "summary": "The Wwise Audio Engine Gem provides support for Audiokinetic Wave Works Interactive Sound Engine (Wwise).",
    "canonical_tags": [
        "Gem"
    ],
    "user_tags": [
        "Audio",
        "Utility",
        "Tools"
    ],
    "icon_path": "preview.png",
    "requirements": "Users will need to download Wwise from the <a href='https://www.audiokinetic.com/download/'>Audiokinetic Web Site</a>.",
    "documentation_url": "https://o3de.org/docs/user-guide/gems/reference/audio/wwise/audio-engine-wwise/",
    "dependencies": [
        "AudioSystem"
    ]
}
```

### DevTextures `Asset` Gem `gem.json` Manifest
DevTextures is an `Asset` type gem that comes with the engine and provides general purpose texture assets useful for prototypes and preproduction.
```json
{
    "gem_name": "DevTextures",
    "display_name": "Dev Textures",
    "license": "Apache-2.0 Or MIT",
    "license_url": "https://github.com/o3de/o3de/blob/development/LICENSE.txt",
    "origin": "Open 3D Engine - o3de.org",
    "origin_url": "https://github.com/o3de/o3de",
    "type": "Asset",
    "summary": "The Dev Textures Gem provides a collection of general purpose texture assets useful for prototypes and preproduction.",
    "canonical_tags": [
        "Gem"
    ],
    "user_tags": [
        "Assets",
        "Debug",
        "Utility"
    ],
    "icon_path": "preview.png",
    "requirements": "",
    "documentation_url": "https://o3de.org/docs/user-guide/gems/reference/assets/dev-textures/",
    "dependencies": []
}
```