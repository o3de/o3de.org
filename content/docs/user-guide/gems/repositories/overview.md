---
linkTitle: Overview
title: Gem Repository Overview
description: Gems repositories provide a way to share Gems in Open 3D Engine (O3DE).
weight: 100
toc: true
---


Gem repositories provide a way to discover, acquire, and share Gems that are not included with **Open 3D Engine (O3DE)**.  Gem repositories are generally hosted online, but you can also add them to your project from a local hard drive which is helpful for testing.


## Add a Gem repository in Project Manager

You can add Gem repositories from the **Gem Repositories** page in Project Manager which you can access from the **Engine** tab, or from the **Gem Catalog** right panel menu.
1. Press the **Add Repository** button. In the dialogue box that opens you can supply the URL or local path for a Gem repository. 
1. If you have a URL for an online Gem repository, copy and paste it into the `Repository Path` field and press the **Add** button.
1. Alternatively, if you want to add a Gem repository from your local hard drive, press the folder button to open the `Browse` dialog box, select the folder with the Gem repository, press the **Select Folder** button, and finally press the **Add** button.

A new entry will be added to the list of Gem repositories, and the Gems provided by the Gem repository will be available to download and add to your projects.

## Add a Gem repository with the o3de command line tool

You can use the `o3de` CLI tool to add Gem repositories with the following command:
```
scripts\o3de.bat register -ru <Gem repository URL>
```

## Anatomy of a Gem repository  

A Gem repository contains a `repo.json` file which contains the metadata for the repository, including a list of URIs for the Gems it provides.

### Folder structure

The recommended folder structure is to put the `repo.json` file at the root of your Gem repository and the `gem.json` files for each Gem it provides in subfolders.  
```
/
   repo.json
   ExampleGem1/
       gem.json
   ExampleGem2/
       gem.json
```

If you are confident you will only ever have one Gem in the repository, it's acceptable to put the `gem.json` in the root folder.

{{< tip >}}
One of the most convenient ways to host a Gem Repository online is to place the `repo.json` file inside the GitHub repository where your Gem's source code is.
{{< /tip >}}

### Format of a repo.json file
The `repo.json` file contains the metadata for the Gem repository and a list of Gems.

```json
{
    "repo_name":"RepositoryName",
    "origin":"RemoteOriginName",
    "repo_uri": "https://o3de.org/repo/v1",
    "summary": "Example Repository",
    "additional_info": "Additional information about your repository including HTML links to any relative website, documentation or licenses.",
    "last_updated": "10/26/2021 04:56pm",
    "gems": [
        "https://o3de.org/repo/v1/ExampleGem/"
    ]
}
```

In the future, the format of the `repo.json` file may be expanded to support projects, templates, and additional Gem repositories.

### Format of gem.json files 

The `gem.json` file for your Gems will need to be modified to include the `origin_uri`, `repo_uri`, `last_updated`, and `sha256` fields.
```json
{
    "gem_name": "TestGem",
    "display_name": "Downloadable Test Gem",
    "license": "Apache-2.0 Or MIT",
    "origin": "Test Creator",
    "origin_uri": "https://o3de.org/repo/v1/TestGem/TestGemV1.zip",
    "repo_uri": "https://o3de.org/repo/v1", 
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
    "documentation_url": "https://o3de.org/docs",
    "dependencies": []
}
```
| Field | Description |
| --- | --- |
| origin_uri | The URI for the `.zip` file containing the Gem archive.  This is a direct link to download the Gem's `.zip` archive. |
| repo_uri | The URI for the Gem repository. |
| last_updated | The date this file or Gem was last updated in `YYYY-MM-DD`, `YYYY-MM-DD HH:MM:SS`, or `YYYY-MM-DDTHH:MM:SS` format. |
| sha256 | The SHA-256 digest of the `.zip` archive that the `origin_uri` field points to.  You can omit this field for testing, but we highly recommend including it. |

{{< note >}}
For a full description of `gem.json` fields and examples see the [`gem.json` manifest documentation](/docs/user-guide/programming/gems/manifest/).
{{< /note >}}
## Creating a Gem repository using a template 

1. Create a new Gem repository using `o3de.bat`.  The following example uses a localhost URL as the repository URI for testing.

    ```
    scripts\o3de.bat create-from-template -tp Templates\GemRepo -dp <repository path on disk> -r ${RepoURI} http://localhost:8080/
    ```

1. Open the `repo.json` file in a text editor and update all the fields except the Gems list.  In the next step, you will update that when adding a Gem to the repository.
    ```json
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

### Add a Gem to the Gem repository
1.  Make a folder inside your Gem repository for the Gem.  In this example, the Gem is named `RemoteExample`. Make a folder named `RemoteExampleV1` and create a `gem.json` file in the folder that looks like this:
    ```json
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
        "documentation_url": "https://o3de.org/docs",
        "dependencies": []
    }
    ```

    The `origin_uri` points to the location of the Gem's `.zip` archive that will be downloaded.

1. Create a Gem, or take an existing Gem, zip up the Gem's contents, not the folder itself, and place the `.zip` in the "RemoteExampleV1" folder, and name it `RemoteExampleV1.zip`.
{{< tip >}}
When creating an archive of your Gem, zip up the contents of the Gem folder, not the folder itself, so that when extracted, the `gem.json` file will be at the root, and not inside a subfolder named `RemoteExampleV1` 
{{< /tip >}}
1. Generate the SHA-256 for your Gem's `.zip` archive and add that value to the `sha256` field of the `gem.json` file located outside the `.zip`.  On Windows, you can use the `certutil` program to generate the SHA-256 value like this:
    ```
    certutil -hashfile C:/path/to/gem.zip SHA256
    ```
    {{< note >}}
It is possible, but not recommended, to leave out the SHA-256 field for testing.
{{< /note >}}
1. Update your `repo.json` file and add the URL for the Gem folder.  This example uses the localhost URL for testing.
    ```json
    {
        ...
        "gems": [
            "http://localhost:8080/RemoteExampleV1/"
        ]
    }
    ```


### Testing your local Gem repository

To test your Gem repository before you upload it to a server, you can host a local server using Python or register the folder path to your Gem repository. If you register the folder path, you'll need to modify the URIs to use absolute paths like `file://c/path/to/gem` instead of `http://localhost:8080/gem`.

1. Use Python to host a local server for testing.
    ```bash
    cd path/to/gem/repository 
    
    # start a local python server on 8080
    python -m http.server 8080
    ```
1. Open up Project Manager and add your Gem repository.  When prompted, use the URL for your local server, which should be `http://localhost:8080/`.
{{< note >}}
Adding the Gem repository may fail if you leave out the trailing slash in the URL.
{{< /note >}}