---
title: "Attimage"
linkTitle: "Attimage"
description: "Template for creating attachment image asset definitions used in rendering features."
weight: 70
---

**Template name:** `Attimage`
**CLI:** `--template attimage`
**Suffix:** *(none)* -- the template has no `component_suffix`, so the generated file is named `${Name}.attimage`

An attachment image asset definition for rendering features. Unlike the component templates, Attimage does not generate C++ source. It produces a single `.attimage` data file, with its width, height, pixel format, and uniqueness flag filled in from user input. No CMake or module registration is involved.

**Files generated:**

| File | Conditional |
|---|---|
| `Source/${Name}.attimage` | Always |

**Input variables:**

| Var Name | Type | Default | Description |
|---|---|---|---|
| `width` | int | `1920` | Width of the image in pixels (minimum `1`) |
| `height` | int | `1080` | Height of the image in pixels (minimum `1`) |
| `color_format` | dropdown | `R8G8B8A8_UNORM` | Pixel format for the image. Options are the full set of engine-supported GPU formats (RGBA/BGRA variants, BC/ETC2/ASTC/PVRTC compressed formats, depth formats, YUV formats, and others) -- see the full list in the JSON below. |
| `unique_name` | toggle | `false` | Marks the image as unique when generating the `.attimage` file |

**Commands:**

| Command | Condition | Description |
|---|---|---|
| `replace_text` | Always | Substitutes `${Width}` in the generated `.attimage` file with the `width` value |
| `replace_text` | Always | Substitutes `${Height}` with the `height` value |
| `replace_text` | Always | Substitutes `${Format}` with the `color_format` value |
| `replace_text` | Always | Substitutes `${IsUnique}` with the `unique_name` value |

**Notable features:** The only template with no registration commands. Because it produces a data file rather than a C++ class, there is nothing to add to CMake or a module descriptor. All four commands follow the same `replace_text` pattern, each applied to a different placeholder token inside the `.attimage` file.


## Full Template JSON

```json
{
    "template_name": "AttImage",
    "origin": "Open 3D Engine - o3de.org",
    "origin_url": "https://github.com/o3de/o3de",
    "license": "Apache-2.0 or MIT",
    "license_url": "https://github.com/o3de/o3de/blob/development/LICENSE.txt",
    "display_name": "Attimage Template",
    "summary": "Create an attimage with unique specs.",
    "canonical_tags": [
        "Template"
    ],
    "user_tags": [
        "AttImage"
    ],
    "icon_path": "preview.png",
    "copyFiles": [
        {
            "file": "Source/${Name}.attimage",
            "isTemplated": true
        }
    ],
    "createDirectories": [
        {
            "dir": "Source"
        }
    ],
    "class_wizard": {
        "display_name": "Attimage",
        "class_name": "attimage",
        "description": "An attimage file.",
        "component_suffix": "",

        "input_vars": [
            {
                "input_type": "int",
                "var_name": "width",
                "title": "Width",
                "default_value": 1920,
                "min_value": 1,
                "description": "Width of the image in pixels."
            },
            {
                "input_type": "int",
                "var_name": "height",
                "title": "Height",
                "default_value": 1080,
                "min_value": 1,
                "description": "Height of the image in pixels."
            },
            {
                "input_type": "dropdown",
                "var_name": "color_format",
                "title": "Format",
                "default_value": "R8G8B8A8_UNORM",
                "description": "Color format of the image.",
                "options": [
                    "R32G32B32A32_FLOAT", "R32G32B32A32_UINT", "R32G32B32A32_SINT",
                    "R32G32B32_FLOAT", "R32G32B32_UINT", "R32G32B32_SINT",
                    "R16G16B16A16_FLOAT", "R16G16B16A16_UNORM", "R16G16B16A16_UINT", "R16G16B16A16_SNORM", "R16G16B16A16_SINT",
                    "R32G32_FLOAT", "R32G32_UINT", "R32G32_SINT",
                    "D32_FLOAT_S8X24_UINT",
                    "R10G10B10A2_UNORM", "R10G10B10A2_UINT", "R11G11B10_FLOAT",
                    "R8G8B8A8_UNORM", "R8G8B8A8_UNORM_SRGB", "R8G8B8A8_UINT", "R8G8B8A8_SNORM", "R8G8B8A8_SINT",
                    "R16G16_FLOAT", "R16G16_UNORM", "R16G16_UINT", "R16G16_SNORM", "R16G16_SINT",
                    "D32_FLOAT", "R32_FLOAT", "R32_UINT", "R32_SINT",
                    "D24_UNORM_S8_UINT",
                    "R8G8_UNORM", "R8G8_UNORM_SRGB", "R8G8_UINT", "R8G8_SNORM", "R8G8_SINT",
                    "R16_FLOAT", "D16_UNORM", "R16_UNORM", "R16_UINT", "R16_SNORM", "R16_SINT",
                    "R8_UNORM", "R8_UNORM_SRGB", "R8_UINT", "R8_SNORM", "R8_SINT",
                    "A8_UNORM", "R1_UNORM", "R9G9B9E5_SHAREDEXP", "R8G8_B8G8_UNORM", "G8R8_G8B8_UNORM",
                    "BC1_UNORM", "BC1_UNORM_SRGB", "BC2_UNORM", "BC2_UNORM_SRGB",
                    "BC3_UNORM", "BC3_UNORM_SRGB", "BC4_UNORM", "BC4_SNORM", "BC5_UNORM", "BC5_SNORM",
                    "B5G6R5_UNORM", "B5G5R5A1_UNORM", "A1B5G5R5_UNORM",
                    "B8G8R8A8_UNORM", "B8G8R8X8_UNORM", "R10G10B10_XR_BIAS_A2_UNORM",
                    "B8G8R8A8_UNORM_SRGB", "B8G8R8X8_UNORM_SRGB",
                    "BC6H_UF16", "BC6H_SF16", "BC7_UNORM", "BC7_UNORM_SRGB",
                    "AYUV", "Y410", "Y416", "NV12", "P010", "P016", "YUY2", "Y210", "Y216", "NV11", "AI44", "IA44", "P8", "A8P8",
                    "B4G4R4A4_UNORM", "R4G4B4A4_UNORM",
                    "R10G10B10_7E3_A2_FLOAT", "R10G10B10_6E4_A2_FLOAT",
                    "D16_UNORM_S8_UINT", "X16_TYPELESS_G8_UINT", "P208", "V208", "V408",
                    "EAC_R11_UNORM", "EAC_R11_SNORM", "EAC_RG11_UNORM", "EAC_RG11_SNORM",
                    "ETC2_UNORM", "ETC2_UNORM_SRGB", "ETC2A_UNORM", "ETC2A_UNORM_SRGB", "ETC2A1_UNORM", "ETC2A1_UNORM_SRGB",
                    "PVRTC2_UNORM", "PVRTC2_UNORM_SRGB", "PVRTC4_UNORM", "PVRTC4_UNORM_SRGB",
                    "ASTC_4x4_UNORM", "ASTC_4x4_UNORM_SRGB", "ASTC_5x4_UNORM", "ASTC_5x4_UNORM_SRGB",
                    "ASTC_5x5_UNORM", "ASTC_5x5_UNORM_SRGB", "ASTC_6x5_UNORM", "ASTC_6x5_UNORM_SRGB",
                    "ASTC_6x6_UNORM", "ASTC_6x6_UNORM_SRGB", "ASTC_8x5_UNORM", "ASTC_8x5_UNORM_SRGB",
                    "ASTC_8x6_UNORM", "ASTC_8x6_UNORM_SRGB", "ASTC_8x8_UNORM", "ASTC_8x8_UNORM_SRGB",
                    "ASTC_10x5_UNORM", "ASTC_10x5_UNORM_SRGB", "ASTC_10x6_UNORM", "ASTC_10x6_UNORM_SRGB",
                    "ASTC_10x8_UNORM", "ASTC_10x8_UNORM_SRGB", "ASTC_10x10_UNORM", "ASTC_10x10_UNORM_SRGB",
                    "ASTC_12x10_UNORM", "ASTC_12x10_UNORM_SRGB", "ASTC_12x12_UNORM", "ASTC_12x12_UNORM_SRGB",
                    "A8B8G8R8_UNORM", "A8B8G8R8_UNORM_SRGB", "A8B8G8R8_SNORM",
                    "R5G6B5_UNORM", "B8G8R8A8_SNORM"
                ]
            },
            {
                "input_type": "toggle",
                "var_name": "unique_name",
                "title": "Is Unique",
                "default_value": false,
                "description": "Will be handled as a unique image."
            }
        ],

        "process_commands": [
            {
                "command": "replace_text",
                "args": {
                    "component_name": "${Name}${ComponentSuffix}.attimage",
                    "text_to_replace": "${Width}",
                    "replacement_var": "width"
                }
            },
            {
                "command": "replace_text",
                "args": {
                    "component_name": "${Name}${ComponentSuffix}.attimage",
                    "text_to_replace": "${Height}",
                    "replacement_var": "height"
                }
            },
            {
                "command": "replace_text",
                "args": {
                    "component_name": "${Name}${ComponentSuffix}.attimage",
                    "text_to_replace": "${Format}",
                    "replacement_var": "color_format"
                }
            },
            {
                "command": "replace_text",
                "args": {
                    "component_name": "${Name}${ComponentSuffix}.attimage",
                    "text_to_replace": "${IsUnique}",
                    "replacement_var": "unique_name"
                }
            }
        ]
    }
}
```

## Design Notes

`color_format`'s dropdown options aren't a convenience list. They're the *only* enforcement that exists. The generated `.attimage` file writes the chosen format in verbatim and unquoted, as `"Format": ${Format}`. Whatever string `replace_text` substitutes becomes literal JSON content, not a validated enum. A value outside the real set of engine pixel formats wouldn't just be semantically wrong. It could produce a `.attimage` file that fails to parse as JSON at all. Restricting `color_format` to a fixed `dropdown` is what keeps that from being possible through the GUI or CLI.

The same file mixes two different substitution mechanisms. O3DE's own staging pass fills in `${Name}` automatically, the same as on every other template. `${Width}`, `${Height}`, `${Format}`, and `${IsUnique}` are different. The wizard's own variable resolver doesn't recognize these tokens by name. The template instead runs four separate `replace_text` commands after staging, each mapping one literal token to a `replacement_var` pulled from the matching input variable. This is a simple pattern. Any template author reaching for a non-standard placeholder scheme, rather than a `${var_name}` the wizard's resolver already understands, ends up here: one `replace_text` command per marker.
