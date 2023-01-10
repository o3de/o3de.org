---
title: "Remote object support in Open 3D Engine "
date: 2022-12-14
slug: remote-objects
author: Philip Conroy
blog_img: "/images/blog/announcement_thumbnail.jpg"
full_img: ""
---

## Background

In the [21.11.0 release](/blog/posts/o3de-22-10-release/) of O3DE, we added the ability to display Gems outside the official Gem catalog. Using Project Manager, you can register an external Gem source on a web server with O3DE metadata to display, pull, and register remote Gems. This new workflow makes sharing Gems the community creates easier by removing manual steps.
Before the 22.11.0 release, adding an external Gem was a manual process of downloading and extracting the Gem, then using the O3DE CLI scripts to register the Gem for the current engine. The remote Gem functionality automates these steps. Once a valid O3DE repository is registered, a single CLI command downloads, extracts, and registers the Gem. Project Manager was also updated to display Gems from a remote repository and then download, register and enable Gems for the current project⁠—all in one step.

## What's new

With O3DE 22.10.0, we extended this functionality to projects and templates. It is now possible to download and register projects and templates from a remote source. Additionally, remote sources can download O3DE objects directly from GitHub repositories.

## Example

### Setup

Let's look at how a remote source with a project is set up as a remote repository on GitHub (the steps for a template source is the same). First, look at the layout of a `repo.json` file:

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

The `repo.json` file sets up the repository with the name, author, and uri of the remote source. In this example, we want to sync the repository with Git, so we provide the GitHub uri with the `.git` extension and add a single O3DE object to the repository.

The `project.json` file looks like this:

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

The important field here is the `origin_uri`, which is the O3DE object's location. For GitHub repositories that we want to sync, this will usually be the same as the remote source's url.

The `repo.json` is placed in the same location as `project.json` in the root of the Git repository.


### Download with Project Manager

In Project Manager, there is now an option to add a remote project.

{{< image-width src="/images/blog/remote-objects/dropdown.PNG" width="100%" alt="Add a Remote Project" >}}

Selecting **Add a Remote Project** brings up the **Add a remote project** dialog. After entering a valid O3DE repository URL, the dialog updates and selects a download folder based on the remote project's name and the default project folder.

{{< image-width src="/images/blog/remote-objects/addremotedialog.PNG" width="100%" alt="Add a Remote Project Config" >}}

There is also an option to add the project to the build queue once the download finishes. After selecting **Download**, the project will be download, register, and be available to build and run like any other O3DE project.

### Download with the O3DE CLI

You can also add a remote project with the O3DE CLI. First, register the remote source:

```powershell
scripts\o3de.bat register -ru <remote source URL>
```

Then, specify the project to download by the project name:

```powershell
scripts\o3de.bat download -p <project name>
```