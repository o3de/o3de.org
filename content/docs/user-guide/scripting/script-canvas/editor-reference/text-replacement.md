---
linkTitle: Text Replacement
title: Script Canvas Node Text Replacement
description: Learn how to customize the text on Script Canvas nodes in Open 3D Engine (O3DE).
weight: 500
---

# Script Canvas - Text Replacement User Documentation

**Script Canvas** has a text replacement system that allows all available nodes to be further customized. Method names, categories, argument names, and tooltips can all be updated to improve their look once in a Script Canvas graph.

## Rules for updating text

The `.names` files have certain fields that should not be modified, they are used by the system to create a key into a database of text fields. 

**The following fields should NOT be changed**:

`base`

`context`

`variant`

`typeid`

Any changes to these fields will result in the Script Canvas Editor being unable to find the desired text to update and will result in the translation data being ignored.

The data within the "details" field can be updated with the following fields:

`name`: The name of the node, argument, or return type.

`category`: The category in the Node Palette to place the node in. Supports nested categories by using the "/" character. Example: "Gameplay/Missions".

`tooltip` Provides a tooltip to the element, this can be the node itself, or any of the node slots when the tooltip is added on a method or arguments

`subtitle` This can be used on the entry details object, it allows overriding the node's subtitle


## Getting started

### Example: Generating a translation file to replace text

Open the Script Canvas Editor. Navigate or search for the desired node in the Node Palette.

We will use AWSGameLiftPlayer in this example

 ![Image 0](/images/user-guide/scripting/script-canvas/text-replacement-0.png)

Right click on any of the nodes under AWSGameLiftPlayer.

![Image 1](/images/user-guide/scripting/script-canvas/text-replacement-1.png)

And select "Generate Translation"

This will open a file explorer window to an auto-generated file called: *AWSGameLiftPlayer.names*

If you do not wish to make any changes to the auto-generated data, you can close the Script Canvas Editor window and reopen it and you will see some changes have taken effect.

![Image 2](/images/user-guide/scripting/script-canvas/text-replacement-2.png)

All the names are now separated by a space and the naming follows the Script Canvas naming convention to use Camel Case.

### Changing the node category

We have succesfully generated translation data for a node, but its category is still under "Other". To change this we will now edit the generated file `AWSGameLiftPlayer.names`.

To change the category, navigate to the outermost `"details"` object and add:
`"category": "AWS Game Lift"`.

In addition, the `"name"` can be simplified from `"AWS Game Lift Player"` to `"Player"`.

```json
{
    "entries": [
        {
            "base": "AWSGameLiftPlayer",
            "context": "BehaviorClass",
            "variant": "",
            "details": {
                "category": "AWS Game Lift",
                "name": "Player"
            },
            "methods": [
                ... STRIPPED FOR SIZE ... (See Appendix 1 for complete file before/after)
            ]
        }
    ]
}
```
After saving the changes to `AWSGameLiftPlayer.names`, close the Script Canvas Editor and open it again.

The nodes are now in the proper category with the given name:

![Image 3](/images/user-guide/scripting/script-canvas/text-replacement-3.png)


## Example: Updating translation files

In this case, we do not need to generate a new translation file, instead we just need to edit it.

![Image 2](/images/user-guide/scripting/script-canvas/text-replacement-1.png)

Select _"Explore Translation Data"_ it will open a file explorer on the file that contains the relevant translation data, in this case, *AWSGameLiftPlayer.names*.

Open the file in your preferred text editor.

Find and update any desired elements. 

## Best Practices

* Do not modify the `base`, `context`, `variant` or `typeid` fields
* Use `Camel Case` syntax with spaces
* Add the `tooltip` field to provide details and context
* Use the `category` field to organize nodes
* Review your changes by closing and reopening the Script Canvas Editor.
* Watch for Asset Processor errors on .names files, ensure JSON syntax is correct
* Commit .names files to source control, this will ensure they are tracked and changes are not overriden
* Generating translation data will overwrite existing translation data, be careful not to lose work, when in doubt, use _Explore Translation Data_ first
* Different kinds of nodes will produce different kinds files, some will have one file for one node, others will have many nodes within a single file. 



## Appendix 1

### Default generated `AWSGameLiftPlayer.names`

```json
{
    "entries": [
        {
            "base": "AWSGameLiftPlayer",
            "context": "BehaviorClass",
            "variant": "",
            "details": {
                "name": "AWS Game Lift Player"
            },
            "methods": [
                {
                    "base": "GetLatencyInMs",
                    "details": {
                        "name": "Get Latency In Ms"
                    },
                    "params": [
                        {
                            "typeid": "{B62C118E-C55D-4903-8ECB-E58E8CA613C4}",
                            "details": {
                                "name": "AWS Game Lift Player"
                            }
                        }
                    ],
                    "results": [
                        {
                            "typeid": "{3F80885A-9011-5172-8D94-87108B31D950}",
                            "details": {
                                "name": "Latency In Ms"
                            }
                        }
                    ]
                },
                {
                    "base": "SetLatencyInMs",
                    "details": {
                        "name": "Set Latency In Ms"
                    },
                    "params": [
                        {
                            "typeid": "{B62C118E-C55D-4903-8ECB-E58E8CA613C4}",
                            "details": {
                                "name": "AWS Game Lift Player"
                            }
                        },
                        {
                            "typeid": "{3F80885A-9011-5172-8D94-87108B31D950}",
                            "details": {
                                "name": "Latency In Ms"
                            }
                        }
                    ]
                },
                {
                    "base": "GetPlayerAttributes",
                    "details": {
                        "name": "Get Player Attributes"
                    },
                    "params": [
                        {
                            "typeid": "{B62C118E-C55D-4903-8ECB-E58E8CA613C4}",
                            "details": {
                                "name": "AWS Game Lift Player"
                            }
                        }
                    ],
                    "results": [
                        {
                            "typeid": "{F8A7460C-2CC2-5755-AFDA-49B1109A751E}",
                            "details": {
                                "name": "Player Attributes"
                            }
                        }
                    ]
                },
                {
                    "base": "SetPlayerAttributes",
                    "details": {
                        "name": "Set Player Attributes"
                    },
                    "params": [
                        {
                            "typeid": "{B62C118E-C55D-4903-8ECB-E58E8CA613C4}",
                            "details": {
                                "name": "AWS Game Lift Player"
                            }
                        },
                        {
                            "typeid": "{F8A7460C-2CC2-5755-AFDA-49B1109A751E}",
                            "details": {
                                "name": "Player Attributes"
                            }
                        }
                    ]
                },
                {
                    "base": "GetPlayerId",
                    "details": {
                        "name": "Get Player Id"
                    },
                    "params": [
                        {
                            "typeid": "{B62C118E-C55D-4903-8ECB-E58E8CA613C4}",
                            "details": {
                                "name": "AWS Game Lift Player"
                            }
                        }
                    ],
                    "results": [
                        {
                            "typeid": "{03AAAB3F-5C47-5A66-9EBC-D5FA4DB353C9}",
                            "details": {
                                "name": "Player Id"
                            }
                        }
                    ]
                },
                {
                    "base": "SetPlayerId",
                    "details": {
                        "name": "Set Player Id"
                    },
                    "params": [
                        {
                            "typeid": "{B62C118E-C55D-4903-8ECB-E58E8CA613C4}",
                            "details": {
                                "name": "AWS Game Lift Player"
                            }
                        },
                        {
                            "typeid": "{03AAAB3F-5C47-5A66-9EBC-D5FA4DB353C9}",
                            "details": {
                                "name": "Player Id"
                            }
                        }
                    ]
                },
                {
                    "base": "GetTeam",
                    "details": {
                        "name": "Get Team"
                    },
                    "params": [
                        {
                            "typeid": "{B62C118E-C55D-4903-8ECB-E58E8CA613C4}",
                            "details": {
                                "name": "AWS Game Lift Player"
                            }
                        }
                    ],
                    "results": [
                        {
                            "typeid": "{03AAAB3F-5C47-5A66-9EBC-D5FA4DB353C9}",
                            "details": {
                                "name": "Team"
                            }
                        }
                    ]
                },
                {
                    "base": "SetTeam",
                    "details": {
                        "name": "Set Team"
                    },
                    "params": [
                        {
                            "typeid": "{B62C118E-C55D-4903-8ECB-E58E8CA613C4}",
                            "details": {
                                "name": "AWS Game Lift Player"
                            }
                        },
                        {
                            "typeid": "{03AAAB3F-5C47-5A66-9EBC-D5FA4DB353C9}",
                            "details": {
                                "name": "Team"
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
```

### Modified `AWSGameLiftPlayer.names`

```json
{
    "entries": [
        {
            "base": "AWSGameLiftPlayer",
            "context": "BehaviorClass",
            "variant": "",
            "details": {
                "name": "Player",
                "category": "AWS Game Lift"
            },
            "methods": [
                {
                    "base": "GetLatencyInMs",
                    "details": {
                        "name": "Get Latency In Ms"
                    },
                    "params": [
                        {
                            "typeid": "{B62C118E-C55D-4903-8ECB-E58E8CA613C4}",
                            "details": {
                                "name": "Player"
                            }
                        }
                    ],
                    "results": [
                        {
                            "typeid": "{3F80885A-9011-5172-8D94-87108B31D950}",
                            "details": {
                                "name": "Latency In Ms",
                                "tooltip
                            }
                        }
                    ]
                },
                {
                    "base": "SetLatencyInMs",
                    "details": {
                        "name": "Set Latency In Ms"
                    },
                    "params": [
                        {
                            "typeid": "{B62C118E-C55D-4903-8ECB-E58E8CA613C4}",
                            "details": {
                                "name": "Player"
                            }
                        },
                        {
                            "typeid": "{3F80885A-9011-5172-8D94-87108B31D950}",
                            "details": {
                                "name": "Latency In Ms"
                            }
                        }
                    ]
                },
                {
                    "base": "GetPlayerAttributes",
                    "details": {
                        "name": "Get Player Attributes"
                    },
                    "params": [
                        {
                            "typeid": "{B62C118E-C55D-4903-8ECB-E58E8CA613C4}",
                            "details": {
                                "name": "Player"
                            }
                        }
                    ],
                    "results": [
                        {
                            "typeid": "{F8A7460C-2CC2-5755-AFDA-49B1109A751E}",
                            "details": {
                                "name": "Player Attributes"
                            }
                        }
                    ]
                },
                {
                    "base": "SetPlayerAttributes",
                    "details": {
                        "name": "Set Player Attributes"
                    },
                    "params": [
                        {
                            "typeid": "{B62C118E-C55D-4903-8ECB-E58E8CA613C4}",
                            "details": {
                                "name": "Player"
                            }
                        },
                        {
                            "typeid": "{F8A7460C-2CC2-5755-AFDA-49B1109A751E}",
                            "details": {
                                "name": "Player Attributes"
                            }
                        }
                    ]
                },
                {
                    "base": "GetPlayerId",
                    "details": {
                        "name": "Get Player Id"
                    },
                    "params": [
                        {
                            "typeid": "{B62C118E-C55D-4903-8ECB-E58E8CA613C4}",
                            "details": {
                                "name": "Player"
                            }
                        }
                    ],
                    "results": [
                        {
                            "typeid": "{03AAAB3F-5C47-5A66-9EBC-D5FA4DB353C9}",
                            "details": {
                                "name": "Player Id"
                            }
                        }
                    ]
                },
                {
                    "base": "SetPlayerId",
                    "details": {
                        "name": "Set Player Id"
                    },
                    "params": [
                        {
                            "typeid": "{B62C118E-C55D-4903-8ECB-E58E8CA613C4}",
                            "details": {
                                "name": "Player"
                            }
                        },
                        {
                            "typeid": "{03AAAB3F-5C47-5A66-9EBC-D5FA4DB353C9}",
                            "details": {
                                "name": "Player Id"
                            }
                        }
                    ]
                },
                {
                    "base": "GetTeam",
                    "details": {
                        "name": "Get Team"
                    },
                    "params": [
                        {
                            "typeid": "{B62C118E-C55D-4903-8ECB-E58E8CA613C4}",
                            "details": {
                                "name": "Player"
                            }
                        }
                    ],
                    "results": [
                        {
                            "typeid": "{03AAAB3F-5C47-5A66-9EBC-D5FA4DB353C9}",
                            "details": {
                                "name": "Team"
                            }
                        }
                    ]
                },
                {
                    "base": "SetTeam",
                    "details": {
                        "name": "Set Team"
                    },
                    "params": [
                        {
                            "typeid": "{B62C118E-C55D-4903-8ECB-E58E8CA613C4}",
                            "details": {
                                "name": "Player"
                            }
                        },
                        {
                            "typeid": "{03AAAB3F-5C47-5A66-9EBC-D5FA4DB353C9}",
                            "details": {
                                "name": "Team"
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
```