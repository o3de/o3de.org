---
description: Use the Quality system to define quality levels and the console variable settings for each level.
title: Quality System
linkTitle: Quality System
---

The Quality system gives you the ability to define quality levels and console variable settings for each quality level. Applications typically run on different hardware and need different settings to achieve the best performance on each device and accomodate user preferences.


## Quality groups

Quality groups (e.g. `q_general`, `q_graphics`, `q_physics` etc.) can be defined in [Settings Registry](/docs/user-guide/settings/) `.setreg` files to make it easier to group similar settings in your application.  Quality levels (e.g. `Low`, `Medium`, `High`, `VeryHigh`) can be defined within each group to accomodate the needs of your application. 

The Quality system creates console variables on demand for each quality group so you can change the active quality level for that group at runtime using the console, for this reason we recommend that you use a lowercase group name with a `q_` prefix, which is short for `quality`.  For example, you may define a quality group for your game named `q_game` and set the quality level at runtime using the console command like the one below where `<quality level>` is the number index or text name of the quality level.
```
q_game <quality level>
```

Quality group objects should be defined at the path `O3DE/Quality/Groups` and have the following format.

```json
{
    "O3DE": {
        "Quality": {
            "Groups": {
                "q_general": {
                    "Description" : "Description with values e.g.. 0 : Low, 1 : Medium, 2 : High",
                    "Levels": [ // quality level names
                        "Low",
                        "Medium",
                        "High",
                        ...
                    ],
                    "Default": 2, // default quality level index in the Levels array
                    "Settings": { // console variable settings for each quality level
                        // an array can be provided with the setting value for each level
                        "r_example":[32, 64, 128],
                        // a single value can be provided to be used by every quality level
                        "r_example2": 2,
                        // if a setting doesn't have values defined for all quality levels,
                        // the last value in the array will be used for higher quality levels  
                        "r_example3": [1, 2] ,
                        ...
                    }
                }
            }
        }
    }
}
```

The default quality group to use on application start up is defined at the path `O3DE/Quality/DefaultGroup`.
```json
{
    "O3DE": {
        "Quality": {
            "DefaultGroup": "q_general"
        }
    }
}
```

O3DE includes a single quality group `q_general` in `Registry/quality.setreg` that defines 4 quality levels `Low`, `Medium`, `High`, and `VeryHigh` and defines the default level as `High`.

#### O3DE/Registry/quality.setreg
```json
{
    "O3DE": {
        "Quality": {
            "DefaultGroup": "q_general",
            "Groups": {
                "q_general": {
                    "Description" : "Default quality group. 0 : Low, 1 : Medium, 2 : High, 3 : VeryHigh",
                    "Levels": [
                        "Low",
                        "Medium",
                        "High",
                        "VeryHigh"
                    ],
                    "Default": 3,
                    "Settings": {
                        // console variable settings
                    }
                }
            }
        }
    }
}
```

The Atom Feature Common Gem also includes a `Registry/quality.setreg` file that defines the quality groups `q_graphics` and `q_shadows` for graphics and demonstrates how to create settings that change the quality level for other groups. 

#### O3DE/Gems/Atom/Feature/Common/Registry/quality.setreg
```json
{
    "O3DE": {
        "Quality": {
            "Groups": {
                "q_general": {
                    "Settings": {
                        "q_graphics": [ 0, 1, 2, 3 ] // map q_general levels 1 to 1 with graphics levels
                    }
                },
                "q_graphics": {
                    "Description": "Graphics quality settings.  0 : Low, 1 : Medium, 2 : High, 3 : VeryHigh",
                    "Levels": [
                        "Low",
                        "Medium",
                        "High",
                        "VeryHigh"
                    ],
                    "Default": 3,
                    "Settings": {
                        "q_shadows": [ 0, 1, 2, 3 ]
                    }
                },
                "q_shadows": {
                    "Description": "Shadow quality settings.  0 : Low, 1 : Medium, 2 : High, 3 : VeryHigh",
                    "Levels": [
                        "Low",
                        "Medium",
                        "High",
                        "VeryHigh"
                    ],
                    "Settings": {
                        // shadows console variable settings
                    }
                }
            }
        }
    }
}
```

In the example above, when the user sets the quality level for the `q_general` quality group to `Low` or `0` the quality level for `q_graphics` and `q_shadows` will also be set to that level.


## Quality levels 

Quality levels can be defined in Settings Registry JSON files within each quality group JSON object.  

Quality levels within each group JSON object should be defined in the following format.
```json
{
    "O3DE": {
        "Quality": {
            "Groups": {
                "q_general": {
                    "Levels": [ // quality level names should be a single word
                        "Low",
                        "Medium",
                        "High",
                        "VeryHigh"
                        ...
                    ]
                }
            }
        }
    }
}
```

Each group can have it's own quality levels defined with custom names and number.  Providing quality level names other than `Low`, `High`, etc. can be useful when defining levels for settings that aren't necessarily better or worse, for example you may have settings for power consumption levels like `HighPerformance`, `Balanced`, `EnergyEfficient`. 

## Customizing quality levels for your project

To override and customize the quality settings in the engine and the gems your project uses, define your own `.setreg` file in your projects `Registry` folder that contains the appropriate JSON content.  For example, if you wanted to override the default quality level in your game to be `VeryHigh` and provide a specific shadow console variable for a specific quality level you could add the following `.setreg` file to your project.

### Project/Registry/quality.setreg

```json
{
    "O3DE": {
        "Quality": {
            "Groups": {
                "q_general": {
                    "Default": 3 // change the default level to VeryHigh instead of High
                },
                "q_shadows": {
                    "Settings": {
                        // example console variable setting for each of the 4 quality
                        // levels in q_shadows (Low, Medium, High, VeryHigh)
                        "r_shadowResolution": [128, 512, 1024, 4096]
                    }
                }
            }
        }
    }
}
```

## Platform specific quality settings

Quality settings can easily be customized for specific platforms because of the existing platform abstraction built into the Settings Registry.  By placing quality `.setreg` files in the appropriate `Registry/Platform/<platform name>` folder they will be used for that specific platform and override any settings in the `Registry/` folder.

For example, to change the default quality level on the Android platform you could add the following `.setreg` file to your project.

### Project/Registry/Platform/Android/quality.setreg

```json
{
    "O3DE": {
        "Quality": {
            "Groups": {
                "q_general": {
                    "Default": 0 // change the default level to Low 
                }
            }
        }
    }
}
```

Customizing the quality settings for other platforms is as simple as placing Settings Registry files in the appropriate platform folder.

`<project path>/Registry/Platform/Android|iOS|Linux|Mac|Windows`