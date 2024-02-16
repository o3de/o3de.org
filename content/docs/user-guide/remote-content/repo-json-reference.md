---
linkTitle: Repo.json Reference 
title: Repo.json Reference
description: O3DE remote repositories repo.json file reference.
weight: 600
toc: true
---

## `repo.json` Reference 
| Field | Required | Description |
|-|-|-|
| $schemaVersion | **Required** | The JSON schema version that should be used when parsing this file.  The current default is `1.0.0`. |
| additional_info | Optional | Additional information about this O3DE remote repository and the contents it provides. |
| gems_data | Optional | A list of Gem JSON data for each Gem provided by this repository.  The `versions_data` field inside each JSON dictionary contains the changed fields for each version. |
| last_updated | Optional | The date and time this file was last updated in ISO8601 format with UTC offset YYYY-MM-DDTHH:MM:SS.mmmmmmTZD  (e.g. 2012-03-29T10:05:45.12345+06:00).  The following formats are also accepted:`YYYY-MM-DD`, `YYYY-MM-DD HH:MM:SS`, or `YYYY-MM-DDTHH:MM:SS`. 
| origin | **Required** | The name of the originator for this O3DE remote repository: i.e. XYZ Inc. |
| origin_url | Optional | The URL for the originator (author or owner) of this remote repository. |
| projects_data | Optional | A list of Project JSON data for each Project provided by this repository.  The `versions_data` field inside each JSON dictionary contains the changed fields for each version. |
| repo_name | **Required** | The name of this remote repository.  This name must be fewer than 64 characters and contain only alphanumeric, '_' or '-' characters, and start with a letter. |
| repos | Optional | A list of additional remote repository URIs.  This can be useful when a Gem, Project or Template in this remote repository depends on a Gem in another remote repository. |
| repo_uri | **Required** | The URI of this remote repository. |
| summary | Optional | A description of this O3DE remote repository. |
| templates_data | Optional | A list of Template JSON data for each Template provided by this repository.  The `versions_data` field inside each JSON dictionary contains the changed fields for each version. |

## Example `repo.json` 

```json
{
    "$schemaVersion": "1.0.0",
    "repo_name":"Example O3DE Remote Repository",
    "origin":"o3de-example-repository",
    "repo_uri":"https://github.com/o3de/o3de-extras",
    "summary": "An example O3DE remote repository with a single gem.",
    "additional_info": "Additional information about your repository including HTML links to any relative website, documentation or licenses.",
    "last_updated": "2023-09-27",
    "gems_data":[
        {
            "gem_name": "ExampleGem1",
            "version": "1.0.0",
            "display_name": "Example Remote Gem 1",
            "license": "Apache-2.0 Or MIT",
            "license_url": "https://github.com/o3de/o3de/blob/development/LICENSE.txt",
            "origin": "Open 3D Engine - o3de.org",
            "origin_url": "https://github.com/o3de/o3de-extras",
            "type": "Code",
            "summary": "This is an example remote gem",
            "canonical_tags": [
                "Gem"
            ],
            "user_tags": [
                "ExampleGem1"
            ],
            "icon_path": "preview.png",
            "requirements": "",
            "documentation_url": "",
            "dependencies": [],
            "repo_uri": "https://github.com/o3de/o3de-extras",
            "versions_data": [
                {
                    "version": "1.0.0",
                    "download_source_uri": "https://github.com/o3de/o3de-extras/releases/download/2.0/examplegem1-1.0.0-gem.zip",
                    "sha256": "ef75e9811b11e081bd4d16d62b638208fe9f0bd8966cfaff937e64b59343f5f7"
                }
            ]
        }
    ],
    "projects_data":[],
    "templates_data":[],
    "repos":[]
}
```