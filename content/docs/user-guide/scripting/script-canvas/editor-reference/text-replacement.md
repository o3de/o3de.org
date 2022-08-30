---
linkTitle: Node Text Replacement
title: Script Canvas Node Text Replacement
description: Learn how to customize the text on Script Canvas nodes in Open 3D Engine (O3DE).
weight: 500
---

**Script Canvas** has a text replacement system that allows all available nodes to be further customized. Method names, categories, argument names, and tooltips can all be updated to improve their wording in a Script Canvas graph.

## How it works

When Script Canvas nodes are created, the developer can provide identifying and clarifying details such as the node's name, their category in the **Node Palette**, the names of their arguments and return values, and their tooltips. However, all of these details can be overridden using text replacement files.

Text replacement files use a JSON format and a file extension of `.names`. You can find all the text replacement files that were generated for the nodes and included with O3DE in the directory `[Gems/ScriptCanvas/Assets/TranslationAssets](https://github.com/o3de/o3de/tree/development/Gems/ScriptCanvas/Assets/TranslationAssets)`.

You can generate or update `.names` files for new or existing nodes using **Script Canvas Editor**, as shown in the following sections.

**Asset Processor** processes all the `.names` files for Script Canvas Editor to use in the Node Palette and when drawing the nodes in a graph.

## Rules for updating text

To customize a node in a `.names` file, you can update any of the following fields contained within any `details` field:

| Field | Description |
| --- | --- |
| `name` | The name of the node, argument, or return type. |
| `category` | The category in the Node Palette to place the node in. Supports nested categories by using the "/" character. Example: "Gameplay/Missions". |
| `tooltip` | Provides a tooltip to the element. This can be the node itself, or any of the node slots when the tooltip is added on a method or argument. |
| `subtitle` | This can be used on the entry details object. It overrides the node's subtitle. |

{{< important >}}
Some fields in a `.names` file should _not_ be modified. They are used by the system to create a key into a database of text fields.
{{< /important >}}

**The following fields should NOT be changed**:

* `base`
* `context`
* `variant`
* `typeid`

Any changes to these fields will result in the Script Canvas Editor being unable to find the desired text to update and will result in the translation data being ignored.

## Getting started

### Example: Generating a translation file to replace text

1. Open Script Canvas Editor.

1. Navigate or search for the desired node in the Node Palette. We will use AWSGameLiftPlayer in this example.

    ![AWSGameLiftPlayer cateogry displayed in the Node Palette](/images/user-guide/scripting/script-canvas/text-replacement-0.png)

1. Right-click on any of the nodes under AWSGameLiftPlayer.

    ![Context menu displayed after right-clicking an AWSGameLiftPlayer node](/images/user-guide/scripting/script-canvas/text-replacement-1.png)

1. Choose **Generate Translation**. This will open a File Explorer window to an auto-generated file named `AWSGameLiftPlayer.names`.

    If you do not wish to make any changes to the auto-generated data, you can close the Script Canvas Editor window and reopen it. Any changes from generating or editing the `.names` file will appear.

    ![Nodes names in AWS Game Lift Player category displayed with spaces](/images/user-guide/scripting/script-canvas/text-replacement-2.png)

    In this example, all of the names are now separated by a space, and the naming follows the Script Canvas naming convention to use camel case.

### Example: Changing the node category

You've successfully generated translation data for a node, but its category is still under "Other". To change this, edit the generated file `AWSGameLiftPlayer.names`.

1. Navigate within the file to the outermost `details` field and add
`"category": "AWS Game Lift"`.

1. In addition, simplify the `name` from `"AWS Game Lift Player"` to `"Player"`.

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

1. After saving the changes to `AWSGameLiftPlayer.names`, close Script Canvas Editor and open it again.

    The nodes are now in the proper category with the given name:

    ![Node palette with Player nodes placed in AWS Game Lift category](/images/user-guide/scripting/script-canvas/text-replacement-3.png)

### Example: Updating translation files

In this scenario, you don't need to generate a new translation file. Instead you only need to edit it.

1. Right-click on any of the nodes under AWSGameLiftPlayer.

    ![Context menu displayed after right-clicking an AWSGameLiftPlayer node](/images/user-guide/scripting/script-canvas/text-replacement-1.png)

1. Choose **Explore Translation Data** in the context menu. It will open a File Explorer window on the file that contains the relevant translation data. In this example, the file is `AWSGameLiftPlayer.names`.

1. Open the file in your preferred text editor.

1. Find and update any desired elements.

1. Save your changes to `AWSGameLiftPlayer.names`, close Script Canvas Editor, and open it again. You should see your updates to the node(s).

## Best practices

Use the following text replacement best practices when working with `.names` files.

* Do not modify the `base`, `context`, `variant`, or `typeid` fields.
* Use camel case syntax with spaces.
* Add the `tooltip` field to provide details and context.
* Use the `category` field to organize nodes.
* Review your changes by closing and reopening the Script Canvas Editor.
* Watch for Asset Processor errors on `.names` files. These can be caused by errors in the JSON syntax.
* Commit `.names` files to source control; this will ensure they are tracked and changes are not overriden.
* Generating translation data will overwrite existing translation data. Be careful not to lose work. When in doubt, use the **Explore Translation Data** menu action first.
* Different kinds of nodes produce different kinds of `.names` files. Some `.names` files define a single node; others define many nodes within a single file.

## Appendix

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
