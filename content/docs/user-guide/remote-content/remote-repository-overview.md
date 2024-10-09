---
linkTitle: Remote Repository Overview
title: O3DE Remote Repository Overview
description: Learn about O3DE remote repositories.
weight: 600
toc: true
---

Remote Repositories are `repo.json` files that contain information about Gems, Projects and Templates that can be downloaded or cloned with Git and information about other remote repositories that a user might need to know about to download a Gem dependency, or simply to have access to related content in a different remote repository. The `repo.json` file can be on your local computer, a web server or in a Git repository like those hosted in [GitHub](https://github.com) and the downloadable content can also be in any of those places.  Usually the `repo.json` file is in the same location as the provided content, but it doesn't have to be.

## Anatomy of an O3DE remote repository  

An O3DE remote repository contains a `repo.json` file which contains the metadata for the repository, including the JSON data for the Gems, Projects and Templates it provides.

### Folder structure

#### Single Gem, Project or Template remote repository

If you only intend to have one Gem, Project or Template in a repository, we recommend that you put the `repo.json` file in the same folder as 
 the `gem.json`,`project.json` or `template.json`.

Example of a gem remote repository with a single `example.fbx` asset stored on GitHub:
```
/
    Assets/
        example.fbx
    Registry/
        assetprocessor_settings.setreg
    CMakeLists.txt
    gem.json
    preview.png
    repo.json
```

#### Multiple Gems, Projects or Templates remote repository

If you intend to have multiple Gems, Projects or Templates in your remote repository there are two approaches:

#### 1. Use `Gems`, `Projects`, and `Templates` subfolders 

The recommended folder structure is to put the `repo.json` file at the root of your O3DE remote repository and the Gems, Projects and Templates in corresponding 'Gems', 'Projects', and 'Templates' subfolders
```
/
    repo.json
    Gems/
        ExampleGem1/
            gem.json
        ExampleGem2/
            gem.json
    Projects/
        ExampleProject1/
            project.json
    Templates/
        ExampleTemplate1/
            template.json
```
This approach is useful for contributors who typically commit changes that affect multiple Gems, Projects and Templates, but it means there isn't a simple way to only fetch a single Gem, Project or Template with Git without using an experimental feature like [`git sparse-checkout`](https://git-scm.com/docs/git-sparse-checkout).

#### 2. Use Git branches 

Another approach is to use git branches so each remote object is in a unique branch.  This can be convenient when you want to use Git to clone the repository instead of downloading archives.  It also means you can store many objects in the Git repo, and when users clone it, they can specify the branch they want and only get one object. The downside of this approach is that contributors have to make multiple commits for changes that affect multiple objects because they are in their own branches. 

1. Put the `repo.json` in the `main` branch alongside the `README.md` for the repository.
1. Create a Git branch for each Gem, Project and Template so that each branch only has one object in it at the root of the repository.

Example of a remote repository with 2 gems:

`main` branch contents
```
/
    repo.json
    README.md
```

`ExampleAssetGem` branch contents
```
/
    Assets/
    Registry/
    CMakelists.txt
    gem.json
    preview.png
``` 

`ExampleCodeGem` branch contents
```
/
    Code/
    Registry/
    .gitignore
    CMakelists.txt
    gem.json
    preview.png
``` 


### Format of a repo.json file
The `repo.json` file contains the metadata for the O3DE remote repository. See the [repo.json reference](repo-json-reference) for more details on the `repo.json` schema.

### JSON fields related to O3DE remote repositories

The `gem.json`, `project.json` and `template.json` files in an O3DE remote repository should include `version`, `repo_uri`, `last_updated`, `download_source_uri`, `source_control_uri` and `source_control_ref` fields.

| Field | Description |
| --- | --- |
| download_source_uri | The URI of the `.zip` file containing the Gem archive.  This is a direct download to the Gem's `.zip` archive: i.e. https://github.com/o3de/o3de-extras/releases/download/1.0/Example-2.0.zip  |
| last_updated | The date this file or Gem was last updated in `YYYY-MM-DD`, `YYYY-MM-DD HH:MM:SS`, or `YYYY-MM-DDTHH:MM:SS` format. |
| repo_uri | The URI for the O3DE remote repository. |
| sha256 | The SHA-256 digest of the `.zip` archive that the `download_source_uri` field points to.  You can omit this field for testing, but it should always be used in production. |
| source_control_ref | The source control reference for this Gem version.  This can be a tag, commit hash or branch: i.e. `release-1.0.0`, `0462139`, `development` etc.  |
| source_control_uri | The URI of the source repository for this Gem: i.e. https://github.com/o3de/o3de-extras.  |

{{< note >}}
For a full description of `gem.json` fields and examples see the [`gem.json` manifest documentation](/docs/user-guide/programming/gems/manifest/).
{{< /note >}}