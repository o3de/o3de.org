# Cloud Gem Framework Service API<a name="cloud-canvas-cgf-service-api"></a>

****  
This documentation is preliminary and is subject to change\.

**Topics**
+ [Cloud Gem Swagger API Descriptions](#cloud-canvas-cgf-service-api-swagger-descriptions)
+ [Resources](cloud-canvas-cgf-service-api-resources.md)
+ [Operations](cloud-canvas-cgf-service-api-operations.md)
+ [Security](cloud-canvas-cgf-service-api-security.md)
+ [Cloud Gem Framework Extension Object](cloud-canvas-cgf-service-api-cgf-extension-object.md)
+ [Cross\-Gem Communication](cloud-canvas-cgf-service-api-cross-gem-communication.md)
+ [Game Clients](cloud-canvas-cgf-service-api-game-clients.md)
+ [Generated Game Client Code Example](cloud-canvas-cgf-service-api-generated-game-client-code-example.md)
+ [Calling a Game API](cloud-canvas-cgf-service-api-calling-apis.md)
+ [Publishing Your API](cloud-canvas-cgf-service-api-publishing-api-gateway.md)

Lumberyard cloud gems provide services like the [Cloud Gem Portal](cloud-canvas-cloud-gem-portal.md) \(CGP\) that configure and manage a game's operation\. The services are implemented by [AWS Lambda](https://aws.amazon.com/lambda/) function resources\. The game and tools access these services through the [Amazon API Gateway](https://aws.amazon.com/api-gateway/)\. The code that you provide runs in a Lambda function\. API Gateway manages access to the service, provides caching for frequently used results, and supports request throttling\.

The following diagram shows how the Cloud Gem Framework service API interacts with the game client, the Cloud Gem Portal, AWS Lambda, and API Gateway\.

![\[Service API interactions\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cgf-service-api-1.png)

## Cloud Gem Swagger API Descriptions<a name="cloud-canvas-cgf-service-api-swagger-descriptions"></a>

The Lumberyard game engine and tools use API operations to communicate with your cloud gem service\. These APIs are described in the cloud gem's `/dev/Gems/<gem-name>/AWS/swagger.json` file\. This file describes the input and output data for each of the operations that can be performed by the service\. The `swagger.json` file uses the [swagger API definition format](http://swagger.io/), which is an open source framework for RESTful API operations\.

The following is an example `swagger.json` file\.

```
{
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "title": "$RestApiResourceName$",
        "description": "API for the $ResourceGroupName$ service ($DeploymentName$ deployment)."
   },
    "schemes": [
        "https"
    ],
    "consumes": [
        "application/json"
    ],
    "produces": [
        "application/json"
    ],
    "x-amazon-cloud-canvas-lambda-dispatch": {
        "lambda": "$ServiceLambdaArn$"
    },
    "paths": {
        "/service/status": {
            "x-amazon-cloud-canvas-lambda-dispatch": {
                "module": "service_status"
            },
            "get": {
                "operationId": "get_service_status",
                "description": "Returns the service's status. Useful for testing connectivity.",
                "responses": {
                    "200": {
                        "description": "A successful service status response.",
                        "schema": {
                            "$ref": "#/definitions/ServiceStatus"
                        }
                    }
                }
            }
        },
        "/admin/messages": {
            "post": {
                "description": "Add a message to the message table",
                "parameters": [
                    {
                        "name": "msg",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/MessageData"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Unique ID for this new message",
                        "schema": {
                            "$ref": "#/definitions/DetailedMessageData"
                        }
                    }
                }
            },
            "get": {
                "description": "Get the list of N messages starting at a given index and filter with all, active, expired or planned",
                "parameters": [
                    {
                        "description": "The index number of the page to fetch first.  Example: 0",
                        "name": "index",
                        "in": "query",
                        "required": true,
                        "type": "integer"
                    },
                    {
                        "description": "The maximum number of messages to fetch.  Example: 1000",
                        "name": "count",
                        "in": "query",
                        "required": true,
                        "type": "integer"
                    },
                    {
                        "description": "Options available here are 'active', 'planned', 'expired'.  Example: active",
                        "name": "filter",
                        "in": "query",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "The list of detailed messages ",
                        "schema": {
                            "$ref": "#/definitions/DetailedMessageList"
                        }
                    }
                }
            }
        },
        "/admin/messages/{msg_id}": {
            "delete": {
                "description": "Delete an existing message",
                "parameters": [
                    {
                        "name": "msg_id",
                        "description": "The message id to edit.",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Status of the deletion",
                        "schema": {
                            "format": "string"
                        }
                    }
                }
            },
            "put": {
                "description": "Edit an existing message",
                "parameters": [
                    {
                        "name": "msg_id",
                        "description": "The message id to edit.",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    },
                    {
                        "name": "msg",
                        "in": "body",
                        "description": "The new localized message body.",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/MessageData"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Status of the addition",
                        "schema": {
                            "format": "string"
                        }
                    }
                }
            }
        },
        "/player/messages": {
            "get": {
                "description": "Get the list of messages scheduled for a given time and language",
                "parameters": [
                    {
                        "name": "time",
                        "description": "The player's local time.  Example: Jul 18 2017 13:43",
                        "in": "query",
                        "type": "string"
                    },
                    {
                        "name": "lang",
                        "description": "The ISO 639-1 language code. Example: en",
                        "in": "query",
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "The list of messages for that time and language. If no time or lang is provided ti falls back to UTC Eng",
                        "schema": {
                            "$ref": "#/definitions/MessageList"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "ServiceStatus": {
            "type": "object",
            "properties": {
                "status": {
                    "type": "string"
                }
            },
            "required": [
                "status"
            ]
        },
        "MessageData": {
            "type": "object",
            "properties": {
                "message": {
                    "description": "Required - The localized message of the day text.",
                    "type": "string"
                },
                "priority": {
                    "description": "The priority in which to view the message.  0 has the highest priority.",
                    "type": "integer"
                },
                "startTime": {
                    "description": "The date time in which to start displaying the message.  Example: Jul 18 2017 00:00",
                    "type": "string"
                },
                "endTime": {
                    "description": "The date time in which to stop displaying the message.  Example: Jul 19 2017 16:00",
                    "type": "string"
                }
            },
            "required": [
                "message"
            ]
        },
        "DetailedMessageData": {
            "type": "object",
            "properties": {
                "UniqueMsgID": {
                    "description": "The unique message id.",
                    "type": "string"
                },
                "message": {
                    "description": "The localized message body.",
                    "type": "string"
                },
                "priority": {
                    "description": "The priority in which to view the message.  0 has the highest priority.",
                    "type": "integer"
                },
                "startTime": {
                    "description": "The date time in which to start displaying the message.  Example: Jul 18 2017 00:00",
                    "type": "string"
                },
                "endTime": {
                    "description": "The date time in which to stop displaying the message.  Example: Jul 19 2017 16:00",
                    "type": "string"
                }
            }
        },
        "MessageList": {
            "type": "object",
            "properties": {
                "list": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/MessageData"
                    }
                }
            }
        },
        "DetailedMessageList": {
            "type": "object",
            "properties": {
                "list": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/DetailedMessageData"
                    }
                }
            }
        }
    }
}
```

Cloud Canvas uses these API descriptions to generate Lumberyard engine components that execute service APIs for the game\. The [Cloud Gem Portal](cloud-canvas-cloud-gem-portal.md) web application also uses the API descriptions when it makes service requests\. In addition, the API descriptions are used to configure [API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/create-api-using-import-export-api.html) to work with your service\.