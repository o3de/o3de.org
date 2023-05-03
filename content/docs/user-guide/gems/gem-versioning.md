---
linktitle: Gem Versioning and Compatibility
title: Gem Versioning and Compatibility
description: An overview of how Open 3D Engine Gems declare and use version, compatibility and dependency information.
weight: 400
---

Gem versioning is an important way to convey the kind of changes made to a gem. 

## O3DE Version Numbering

O3DE uses `MAJOR.MINOR.PATCH` [semantic versioning](https://semver.org/) for all the `version` fields in `engine.json`, `gem.json` and `project.json` files.  

- `MAJOR` is for API-breaking changes
- `MINOR` is for non-API-breaking changes that add new APIs or change them in a non-breaking way
- `PATCH` is for all other non-API-breaking changes, usually important fixes

Example: If a breaking API change is made to a gem at version `2.0.1` the `MAJOR` version is incremented and the `MINOR` and `PATCH` are reset to `0` resulting in the new version being `3.0.0`.  See the [semantic versioning](https://semver.org/) page for more examples. 

## O3DE Version Specifiers 

Lists of compatible engines and dependencies use the `<name><version specifier>` format based on [PEP 440](https://peps.python.org/pep-0440/#version-specifiers).

Examples:

| Name | Version Specifier | Combined | Description |
|------|-------------------|----------|-------------|
| o3de | >=2.0.0           | o3de>=2.0.0 | o3de version 2.0.0 or greater |
| o3de-sdk | == 1.2.0      | o3de-sdk==1.2.0 |  o3de-sdk version 1.2.0 | 
| Atom | ~=2.0.0           | Atom~=2.0.0 | Atom version 2.0.0 up to but not including 3.0.0 |

A gem that is known to be compatible with the an engine named `o3de-sdk` version `2.0.1` could include `o3de-sdk==2.0.1` in the `compatible_engines` field in `gem.json`


## Gem Version And Compatibility Information In `gem.json` 

Gem version, dependency and compatibility information is stored in the  `gem.json` file at the root of each gem. If the `gem.json` has no compatibility or dependency information in it, or the fields are empty, the gem is assumed to be compatible with all engines and have no gem dependencies. 


<table class="fixed-table wrapped"><colgroup><col style="" /><col style="" /><col style="" /><col style="" /></colgroup>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
<th>Default</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td>version</td>
<td>The `MAJOR.MINOR.PATCH` [semantic version](https://semver.org/) that is updated as changes are made to the gem. Developers may use the `dependencies` field in `gem.json` to indicate other gem dependencies and the version ranges they are compatible with.</td>
<td>1.0.0</td>
<td>1.2.3</td>
</tr>
<tr>
<td>compatible_engines</td>
<td>A list of engine names and version specifiers that this gem is known to be compatible with. If empty, the gem is assumed compatible with all engines if they meet all the requirements in the `engine_api_dependencies` and `dependencies` fields.</td>
<td>[ ]</td>
<td>

```json
{
    "compatible_engines":[
        "o3de-sdk==1.2.0",
        "o3de>=2.0.0"
    ]
}
```

This gem is compatible with an engine named `o3de-sdk` version `1.2.0`, or any engine named `o3de` version `2.0.0` or greater.

</td>
</tr>
<tr>
<td>engine_api_dependencies</td>
<td>A list of engine API dependencies.  If empty, the gem is assumed compatible with all versions of any engine APIs.</td>
<td>[ ]</td>
<td>

```json
{
    "engine_api_dependencies":[
        "editor>=1.0.0"
    ]
}
```

This gem depends on the `editor` API version `1.0.0` or greater.
</td>
</tr>
<tr>
<td>dependencies</td>
<td>An optional list of gem dependencies.</td>
<td>[ ]</td>
<td>

```json
{
    "dependencies":[
        "Atom>=1.0.0",
        "PhysX==2.0.0"
    ]
}
```
This gem depends on a gem named `Atom` version `1.0.0` or greater and `PhysX` version `2.0.0`.
</td>
</tr>
<tr>
<td>platform</td>
<td>A list of compatible platforms.</td>
<td>[ ]</td>
<td>

```json
{
    "platforms":[
        "Windows",
        "Linux",
        "Android",
        "MacOS"
    ]
}
```
 This gem is known to be compatible with `Windows`, `Linux`, `Android` and `MacOS`
</td>
</tr>
</tbody>
</table>

## Choosing Which Version Field To Use

The `compatible_engines` field is a simple way to list which engines your gem is known to be compatible with and the information in this field is shown to users in the Project Manager. The O3DE community maintains an engine SDK with the name `o3de-sdk` while the engine name in the GitHub source code is `o3de`, so its recommended to at least consider providing compatibility information for these commonly used engines. 

{{< note >}}
At this time you may not use the engine `display_version` in the `compatible_engines` version specifiers, only the `version`. 
{{< /note >}}

The `dependencies` field should always be used to list direct gem dependencies, and if you don't know what versions to depend on just include the gem name without the version specifier part.

Example: The following `gem.json` `dependencies` entry shows a dependency on any version of `Atom`, and `PhysX` version `1.0.0` or greater.
```json
{
    "dependencies": [
        "Atom",
        "PhysX>=1.0.0"
    ]
}
```

If you know your gem is compatible with any engine so long as a gem dependency or API it depends on has no breaking changes, using the `dependencies` or `engine_api_dependencies` field will require fewer future updates. 


## Engine Gem Compatibility

Engine gems do not include version specifiers in their `dependencies` field or any `compatible_engines` or `engine_api_dependencies` because they are known to be compatible and tested with the engine APIs and other gems in the engine so maintaining compatibility information is not needed.


## Registering Gem Versions

When using the `o3de` CLI or Project Manager to register a gem, it will check if the gem is compatible with the engine currently being used.  If any issues are found, they will be displayed to the user and the gem will not be registered.  If the user still wants to register the gem they can use the `--force` parameter to bypass the compatibility checks.

## Gem Version Selection

Multiple versions of the same gem can be registered and different versions can be used by different projects.  When a project is configured, the compatible gem with the highest version number will be selected.

Example:
A `project.json` file specifies a gem dependency on `foo>=1.0.0`, if version `1.0.0` and `2.0.0` of a gem named `foo` are registered, the gem with the highest version, `2.0.0`, will be used, as long as there are no compatibility issues with that gem.  If the user wants to use `1.0.0` they can change the gem dependency in `project.json` to `foo==1.0.0` to indicate version `1.0.0` should be used.

## Gem Dependency Resolution

Gem dependency resolution is run when configuring a project with CMake to ensure the correct gems are used to build.  If gem dependency resolution fails because a requirement cannot be met, an error message is displayed including the list of gems considered.  Though not recommended, you may use the `O3DE_DISABLE_GEM_DEPENDENCY_RESOLUTION` CMake variable to disable gem dependency resolution if it is failing due to a bug, or it is unnecessary for your use case, for example, if you provide your own SDK with all the gems included and are not using any external gems in your project.