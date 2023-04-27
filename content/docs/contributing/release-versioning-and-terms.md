---
linkTitle: Versioning Terminology
title: Open 3D Engine Versioning and Release Terminology
description: Read this topic to understand O3DE's versioning model and release terminology
weight: 500
---

## Open 3D Engine (O3DE) Version Numbering

O3DE engine version information is stored inside the `engine.json` file at the root of the engine.   


| Field | Description |  Global CMake Properties |
|---------------------|------------------------|------------------------|
| engine_name | The name of the engine which is set to `o3de-sdk` when the SDK is created and is `o3de` in the O3DE GitHub repository source code. | | 
| display_version | The `YY.MM.PATCH` year and month version displayed in the SDK installer and Project Manager. This value is only set when creating the SDK and is `00.00` in the O3DE GitHub repository source code. By using a date-oriented scheme for the SDK display version users can easily tell how recently an engine SDK was released, however this scheme is not useful for conveying compatibility which is why we have a separate `version` field.  | `O3DE_DISPLAY_VERSION_STRING` |
| version | The `MAJOR.MINOR.PATCH` [semantic version](https://semver.org/) that is updated as changes are made to the APIs in the engine and can be used for general engine compatibility. Developers may use the `compatible_engines` field in their `gem.json` or `project.json` files to indicate which engine version their gem or project is known to be compatible with. | `O3DE_VERSION_STRING` `O3DE_VERSION_MAJOR` `O3DE_VERSION_MINOR` `O3DE_VERSION_PATCH`|
| api_versions | The `MAJOR.MINOR.PATCH` [semantic version](https://semver.org/) for frameworks and tools included in the engine that are common dependencies. Developers may use the `engine_api_dependencies` field in their `gem.json` or `project.json` files to indicate which engine API versions their gem or project is known to be compatible with. | |
| build | The incremental SDK build number that is only set when the SDK is created and is `0` in the O3DE GitHub repository source code. | `O3DE_BUILD_VERSION` |
| O3DEVersion | Deprecated version field that has been replaced with `display_version`. |
| O3DEBuildNumber | Deprecated build field that has been replaced with `build`. |



| Engine display version | Engine version |  |
|---------------------|------------------------|------------------------|
| 23.05.0   | 1.2.0              | Stable SDK release |
| 00.00 | 2.0.0                  | Development SDK or source |

Example:

A developer may use the `compatible_engines` field in their `gem.json` to indicate that their gem is known to be compatible with any engine in development named `o3de` version `2.0.0` or higher or an SDK engine named `o3de-sdk` that is exactly version `1.2.0`.
```json
{
    "gem_name":"CustomGem",
    "compatible_engines": [
        "o3de>=2.0.0",
        "o3de-sdk==1.2.0"
    ]
}
```


### Engine APIs

The API versions specified in the `api_versions` field in `engine.json` are currently based on the general content inside the engine's `Code` folder and are general in an effort to provide a simple but useful way for developers to indicate compatibility when they expect their gem or tool to be compatibile with multiple engine versions unless breaking changes are made to APIs inside the engine's `Code` folder.

| Engine API Field| Source Path |
|---------------------|------------------------|
| `editor` | `Code/Editor` |
| `framework` | `Code/Framework` |
| `launcher` | `Code/LauncherUnified` |
| `tools` | `Code/Tools` |

Example:

A developer that creates a gem that includes an Editor tool, may update their `gem.json` file to indicate the gem is known to be compatibile with any non-breaking version of the Editor APIs.
```json
{
    "gem_name":"EditorToolGem",
    "engine_api_dependencies": [
        "editor~=1.0.0"
    ]
}
```

## O3DE Release Terminology

* **Stable**: This feature is ready for users to actively develop using it. APIs and functionality can be considered stable and any significant new work will be captured in an RFC before changes are made.
* **Preview**: This feature is almost done and is stable. May still go through small changes.
* **Experimental**: This feature is a work-in-progress. Don't depend on it yet; it may go through significant changes.
