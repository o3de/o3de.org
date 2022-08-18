---
linkTitle: Overview
title: Gem Repository Overview
description: Gems Repositories provide a way to share additional Gems.
weight: 100
toc: true
---


Gem Repositories provide a way to discover, acquire and share Gems outside those that come with the default Open 3D Engine.  While most Gem Repositories are hosted online, they can also exist locally on a hard drive which is useful for testing.


## Adding an Existing Gem Repository  

### From the Project Manager Gem Repositories Page

Gem Repositories can be added from the Gem Repositories page in the Project Manager.
1. Press the `Add Repository` button. A dialog will open asking for a `Repository URL` or `Local Path`. 
1. If you have a URL for an online Gem Repository, copy + paste it into the `Repository Path` field and press `Add`.
1. Alternately, if you want to add a Gem Repository on your local hard drive, press the folder button to open the `Browse` dialog, select the Gem Repository folder and press `Add`.

A new entry will be added to the list of Gem Repositories and the Gems provided by the Gem Repository will be available to download and add to your projects.

### From the o3de command line tool

Gem Repositories can also be added using the `o3de` CLI tool using the following command:
```
scripts\o3de.bat register -ru <Repository URL>
```

## Anatomy of a Gem Repository  

A Gem Repository contains a `repo.json` file which provides the metadata for the repository including a list of URIs for the Gems it provides.

### Folder structure

The recommended folder structure is to put the `repo.json` file at the root of your Gem Repository and the `gem.json` files for the Gems it provides in subfolders.  
```
/
   repo.json
   ExampleGem1/
       gem.json
   ExampleGem2/
       gem.json
```

Alternately, if you are certain you will only ever have one gem in the repository, it's OK to put the `gem.json` in the root folder.

{{< note >}}
One of the most convenient ways to host a Gem Repository online is to place the `repo.json` file inside your existing GitHub repository where your Gem's source code is.
{{< /note >}}

### Format of a repo.json file
The `repo.json` file provides the metadata for the Gem Repository and list of Gems.

```
{
    "repo_name":"RepositoryName",
    "origin":"RemoteOriginName",
    "repo_uri": "http://localhost:8080/",
    "summary": "Example Repository",
    "additional_info": "Example repository hosted on local http server.",
    "last_updated": "10/26/2021 04:56pm",
    "gems": [
        "http://localhost:8080/ExampleGem/"
    ]
}
```

In the future, the format of the `repo.json` file will be expanded to support projects, templates and additional Gem Repositories.

### Format of gem.json files 

The `gem.json` file for your Gem(s) will need to be modified to include the `origin_uri`, `repo_uri`, `last_updated` and `sha256` fields.
```
{
    "gem_name": "TestGem",
    "display_name": "Downloadable Test Gem",
    "license": "Apache-2.0 Or MIT",
    "origin": "Test Creator",
    "origin_uri": "http://localhost:8080/TestGem/gem.zip",
    "repo_uri": "http://localhost:8080/", 
    "last_updated": "2021-11-18",
    "sha256":"",
    "type": "Tool",
    "summary": "The Downloadable Test Gem provides an example of a downloadable test Gem.",
    "canonical_tags": [
        "Gem"
    ],
    "user_tags": [
        "Gameplay",
        "Simulation",
        "Utility"
    ],
    "icon_path": "preview.png",
    "requirements": "",
    "documentation_url": "https://o3de.org/",
    "dependencies": []
}
```
| Field | Description |
| --- | --- |
| origin_uri | The URI for the `.zip` file containing the Gem archive - this is a direct link to download the Gem `.zip` archive. |
| repo_uri | The URI for the Gem Repository |
| last_updated | The date this file or Gem was last updated in YYYY-MM-DD format |
| sha256 | The SHA256 digest of the `.zip` archive pointed to by the `origin_uri` field - for testing you can omit this field, but it is highly recommended you include it. |

## Creating a Gem Repository  

### Using a Template

1. Create a new gem repo using `o3de.bat`.  This example uses a localhost URL as the repository URI for testing.

    ```
    scripts\o3de.bat create-from-template -tp Templates\GemRepo -dp <repo path on disk> -r ${RepoURI} http://localhost:8080/
    ```

1. Open the `repo.json` file in a text editor and update all the fields except the gem's list - we'll update that when adding a gem to the repository in the next step.
    ```
    {
        "repo_name":"RepositoryName",
        "origin":"RemoteOriginName",
        "repo_uri": "http://localhost:8080/",
        "summary": "Example Repository",
        "additional_info": "Example repository hosted on local http server.",
        "last_updated": "10/26/2021 04:56pm",
        "gems": [
        ]
    }
    ```

### Add a Gem to the Gem Repository
1.  Make a folder inside your Gem Repository for the Gem.  In this example we'll assume the gem is named "RemoteExample" and make a folder named "RemoteExampleV1" and place a `gem.json` in there that looks like this:
    ```
    {
        "gem_name": "RemoteExample",
        "display_name": "Example Remote Gem",
        "license": "Apache-2.0 Or MIT",
        "origin":"RemoteOriginName",
        "origin_uri": "http://localhost:8080/RemoteExampleV1/RemoteExampleV1.zip",
        "sha256":"",
        "type": "Code",
        "summary": "An example remote gem.",
        "canonical_tags": [
            "Gem"
        ],
        "user_tags": [
            "Gameplay"
        ],
        "icon_path": "preview.png",
        "requirements": "",
        "documentation_url": "https://o3de.org/docs/user-guide/gems/reference/gameplay/achievements/",
        "dependencies": []
    }
    ```

    The `origin_uri` points to the location of the gem `.zip` archive that will be downloaded

1. Create a Gem, or take an existing Gem, zip up the contents and place it in the "RemoteExampleV1" folder, and name it `RemoteExampleV1.zip`
1. Generate the sha256 for your Gem .zip archive and add that value to the "sha256" field in the `gem.json` file that is outside the .zip.  On Windows, you can use the `certutil` program to generate the SHA256 value like this:
    ```
    certutil -hashfile C:/path/to/gem.zip SHA256
    ```
    {{< note >}}
    It is possible to leave out the sha256 field for testing, but discouraged
    {{< /note >}}
1. Update your repo.json file and add the URL for the gem folder.  In this example we'll use the localhost URL for testing.
    ```
    {
        ...
        "gems": [
            "http://localhost:8080/RemoteExampleV1/"
        ]
    }
    ```

### Testing your local Gem Repository

To test your Gem Repository before you upload it to a server, you can host a local server using Python or register the folder path to your Gem Repository, but if you register the folder path, you'll need to modify the URIs to use absolute paths like `file://c/path/to/gem` instead of `http://localhost:8080/gem`

1. Use Python to host a local server for testing
    ```
    cd path/to/gem/repository 
    
    # start a local python server on 8080
    python -m http.server 8080
    ```
1. Open up the Project Manager and add your Gem Repository, when prompted use the URL for your local server which should be "http://localhost:8080/"
    {{< note >}}
    Adding the Gem Repository may fail if you leave out the trailing slash in the URL.
    {{< /note >}}