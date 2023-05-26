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
| compatible_engines | Optional | A list of engine names and optional version specifiers that this gem is known to be compatible with: i.e. `o3de>=2.0.0`, `o3de-sdk==1.2.0`, `o3de-custom` etc. If empty, the gem is assumed compatible with all engines if they meet all the requirements in the `engine_api_dependencies` and `dependencies` fields. See [Gem Versioning](../../../user-guide/gems/gem-versioning.md) for details. |
| dependencies | Optional | The names of any other Gems, your Gem directly depends on with optional version specifiers: i.e. `Atom>=1.0.0`, `PhysX==2.0.0`, `ScriptCanvas` etc. See [Gem Versioning](../../../user-guide/gems/gem-versioning.md) for details. |
| documentation_url | Optional | The URL of the documentation for your gem: i.e. https://www.mydomain.com/docs. |
| download_source_uri | Optional | The URI of the `.zip` file containing the Gem archive.  This is a direct download to the Gem's `.zip` archive: i.e. https://github.com/o3de/o3de-extras/releases/download/1.0/Example-2.0.zip  |
| engine_api_dependencies | Optional | A list of engine API dependencies.  If empty, the Gem is assumed compatible with all versions of any engine APIs. See [Gem Versioning](../../../user-guide/gems/gem-versioning.md) for details. |
| icon_path | Optional | The relative path to the filename of the icon image file, usually `preview.png`. |
| last_updated | Optional | The date this file or Gem was last updated in `YYYY-MM-DD`, `YYYY-MM-DD HH:MM:SS`, or `YYYY-MM-DDTHH:MM:SS` format. |
| license | **Required** | The license this Gem uses: i.e. Apache-2.0 or MIT. |
| license_url | **Required** | The URL for the license website: i.e. https://opensource.org/licenses/Apache-2.0 Or https://opensource.org/licenses/MIT. |
| origin | **Required** |The name of the originator for this Gem: i.e. XYZ Inc. |
| origin_uri | Optional | Deprecated and replaced by `download_source_uri`. |
| origin_url | Optional | The URL of the originator for this gem: i.e. https://www.mydomain.com. |
| platforms | Optional | A list of platforms this Gem is known compatible with: i.e. "Windows","Linux","Android","iOS","MacOS" etc. |
| repo_uri | Optional | The URI for the Gem repository containing this Gem. |
| requirements | Optional | Notice of any requirements your Gem has: i.e. This Gem requires you install X from https://www.mydomain.com. |
| sha256 | Optional | The SHA-256 digest of the `.zip` archive that the `origin_uri` field points to.  You can omit this field for testing, but we highly recommend including it. |
| source_control_ref | Optional | The source control reference for this Gem version.  This can be a tag, commit hash or branch: i.e. `release-1.0.0`, `0462139`, `development` etc.  |
| source_control_uri | Optional | The URI of the source repository for this Gem: i.e. https://github.com/o3de/o3de-extras.  |
| summary | **Required** | A short description of your Gem. |
| type | **Required** | The type of gem which can be `Code`, `Asset` or `Tool`. This field is used as a filter in the Project Manager. |
| user_tags | Optional | A list of user-defined tags used to categorize Gems. This list should always include the name of your Gem, and any other common tags that might help a user discover your gem: i.e. `Network`, `Rendering`, `Utility`, `Scripting` etc. |
| version | Optional | The `MAJOR.MINOR.PATCH` [semantic version](https://semver.org/) that is updated as changes are made to the gem. Developers may use the `dependencies` field in `gem.json` to indicate other gem dependencies and the version ranges they are compatible with. See [Gem Versioning](../../../user-guide/gems/gem-versioning.md) for details. |
| versions_data | Optional | A list of JSON dictionaries containing the changed fields for each Gem version. Usually this data is only stored in a `repo.json` file to keep track of the changes and unique download URIs for each Gem version. |


## `gem.json` Manifest Examples

### ScriptCanvas `Tool` Gem `gem.json` Manifest
ScriptCanvas is a `Tool` type gem that comes with the engine and provides Editor and game functionality.
```json
{
    "gem_name": "ScriptCanvas",
    "display_name": "Script Canvas",
    "version": "1.0.0",
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
    ],
    "compatible_engines":[],
    "engine_api_dependencies":[]
}
```

### AudioEngineWwise `Code` Gem `gem.json` Manifest
AudioEngineWwise is a `Code` type gem that comes with the engine that requires an external application be installed in order to use it.
```json
{
    "gem_name": "AudioEngineWwise",
    "display_name": "Wwise Audio Engine",
    "version": "1.0.0",
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
    ],
    "compatible_engines":[],
    "engine_api_dependencies":[]
}
```

### DevTextures `Asset` Gem `gem.json` Manifest
DevTextures is an `Asset` type gem that comes with the engine and provides general purpose texture assets useful for prototypes and preproduction.
```json
{
    "gem_name": "DevTextures",
    "display_name": "Dev Textures",
    "version": "1.0.0",
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
    "dependencies": [],
    "compatible_engines":[],
    "engine_api_dependencies":[]
}
```