---
title: Resource Mapping Schema
description: View the JSON resource mapping schema used by AWS Gems in the Open 3D Engine (O3DE).
toc: true
weight: 320
---

The AWS Core Gem provides the following JSON schema for resource mapping.

```json
{
    "$schema": "http://json-schema.org/draft-04/schema",
    "type": "object",
    "title": "The AWS Resource Mapping Root schema",
    "required": ["AWSResourceMappings", "AccountId", "Region", "Version"],
    "properties": {
        "AWSResourceMappings": {
            "type": "object",
            "title": "The AWSResourceMappings schema",
            "patternProperties": {
                "^.+$": {
                    "type": "object",
                    "title": "The AWS Resource Entry schema",
                    "required": ["Type", "Name/ID"],
                    "properties": {
                        "Type": {
                            "$ref": "#/NonEmptyString"
                        },
                        "Name/ID": {
                            "$ref": "#/NonEmptyString"
                        },
                        "AccountId": {
                            "$ref": "#/AccountIdString"
                        },
                        "Region": {
                            "$ref": "#/RegionString"
                        }
                    }
                }
            },
            "additionalProperties": false
        },
        "AccountId": {
            "$ref": "#/AccountIdString"
        },
        "Region": {
            "$ref": "#/RegionString"
        },
        "Version": {
            "pattern": "^[0-9]{1}.[0-9]{1}.[0-9]{1}$"
        }
    },
    "AccountIdString": {
        "type": "string",
        "pattern": "^[0-9]{12}$"
    },
    "NonEmptyString": {
        "type": "string",
        "minLength": 1
    },
    "RegionString": {
        "type": "string",
        "pattern": "^[a-z]{2}-[a-z]{4,9}-[0-9]{1}$"
    },
    "additionalProperties": false
}
```
