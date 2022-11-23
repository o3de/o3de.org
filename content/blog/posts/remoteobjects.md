---
title: "Remote object support in Open 3D Engine "
date: 2022-12-14
slug: remote-objects
author: Philip Conroy
blog_img: "/images/blog/announcement_thumbnail.jpg"
full_img: ""
---

In the 22.10.0 release of Open 3D Engine (O3DE), remote object support was extended to projects and templates

## Background

In the [21.11.0 release](/blog/posts/o3de-22-10-release/) of O3DE, we added the ability to display gems outside of the official Gem catalog. Using Project Manager, you could register an external source from a webserver that had the correct O3DE metadata to display the remote gems and then pull and register them. This made the sharing of Gems the community created easier by removing a lot of the manual steps for downloading an registering Gems.
Before the 22.11.0 release, downloading a new Gem was a manual process, by downloading an extracting the Gem, then using the O3DE CLI scripts to register the Gem for the current engine. The remote Gem functionality automated a lot of these steps, once a valid O3DE repository was registered, a single CLI command could handle the downloading, extracting and registering of the Gem. Project Manager was also updated to display the available Gems from the O3DE repository and then download, register and enable Gems for the current project all in one step.

## What's new

With O3DE 22.10.0 this functionality has been extended to cover projects and templates, so that it is now possible to download and register projects and templates from a remote source. Remote sources have also been extended to cover downloading objects from GitHub repositories.

## Example

### Setup

Let's look at how a remote source with a project is set up for a remote project on GitHub (the steps for a template source is the same). First, looking at the layout of a repo.json file.

```json
{
    "repo_name":"Remote Game Source",
    "origin":"AMZN-Phil",
    "repo_uri": "https://github.com/AMZN-Phil/RemoteO3DEProject.git",
    "summary": "Remote Source for the game, Remote Game",
    "projects": [
        "https://github.com/AMZN-Phil/RemoteO3DEProject.git"
    ]
}
```

This sets up the remote source information, with the name, author and uri for the source. In this example we want to sync the repository with git so we provide the GitHub uri with the .git extension and have a single object in the repository.

The project.json looks like this

```json
{
    "project_name": "RemoteGame",
    "project_id": "{388C33C2-44F3-4C3A-86A4-4AD95216482B}",
    "origin": "AMZN-Phil",
    "origin_uri": "https://github.com/AMZN-Phil/RemoteO3DEProject.git",
    "license": "Apache-2.0 Or MIT",
    "requirements": "This project has no additional requirements.",
    "display_name": "Remote Game",
    "summary": "A short description of RemoteGame.",
    "canonical_tags": [
        "Project"
    ],
    "user_tags": [
        "RemoteGame"
    ],
    "icon_path": "preview.png",
    "engine": "o3de-nightly",
    "external_subdirectories": [
        "Gem"
    ],
    "restricted": "RemoteGame"
}
```

The important field here is the origin_uri field which is the location of the object. Currently for GitHub repositories that we want to sync this will usually be the same as the remote source url.

The repo.json is placed in the same location as project.json in the root of the git repository.


### Downloading using Project Manager

In Project Manager there is now an option to add a remote project.

{{< image-width src="/images/blog/remote-objects/dropdown.PNG" width="100%" alt="Add a Remote Project" >}}

Selecting this brings up the Add a remote project dialog. On entering a valid O3DE repositoriy URL the dialog updates and selects a download folder based on the name of the project and the default projects folder.

{{< image-width src="/images/blog/remote-objects/addremotedialog.PNG" width="100%" alt="Add a Remote Project Config" >}}

There is also the option whether to add the project to the build queue once it has downloaded. On selecting Download the project will be downloaded, registered and available to build and run like any other project.

### Downloading using the O3DE CLI

It is also possible to carry out these steps using the O3DE CLI. First by registering the remote source

```powershell
scripts\o3de.bat register -ru <remote source URL>
```

Then by specifying the project to download by the project name.

```powershell
scripts\o3de.bat download -p <project name>
```