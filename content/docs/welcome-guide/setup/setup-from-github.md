---
title: Setting up O3DE from GitHub
description: Learn how to set up Open 3D Engine (O3DE) by cloning the source from GitHub.
weight: 300
toc: true
---

{{< preview-new >}}

Getting the source for Open 3D Engine (O3DE) from GitHub is a great way to set up your development environment, so you can easily sync future engine updates and make contributions to the open source project base.

The instructions here will guide you through the following steps:

* Configure credentials for Git LFS.
* Fork and clone the O3DE GitHub repo.
* Additional setup steps during O3DE preview.

## Prerequisites

The instructions that follow assume you have the following:

* [Git client](https://git-scm.com/downloads) 1.8.2 or later installed.
* Met all requirements listed in [System Requirements](./requirements.md).

## Configure credentials for Git LFS

The O3DE GitHub repo uses the Git Large File Storage (LFS) system for storing large binary files. The following instructions will prepare your PC to authenticate and download these files automatically when you clone, fetch, or pull from the repo.

**To configure for Git LFS**

1. Verify that **Git LFS** is available on your computer.

    ```cmd
    git lfs install
    ```

1. Verify that you have a **credential manager** setup for Git. Recent versions of Git install a credential manager to store your credentials so that you don't have to enter them for every request.

    ```cmd
    git config credential.helper
    ```

    If you don't see one listed, you can install [Git Credential Manager Core](https://github.com/microsoft/Git-Credential-Manager-Core#readme) as your credential manager.

1. Create a GitHub **personal access token** with `repo` and `read:org` scope.

    1. Go to [https://github.com/settings/tokens](https://github.com/settings/tokens).

        (GitHub menu equivalent: Settings > Developer Settings > Personal Access Tokens)
    1. Choose **Generate new token**.
    1. (Optional) Add an entry under **Note**. This is only for your reference.
    1. Under **Select scopes**, select the following:
        * `repo` (all)
        * `read:org` (under admin:org)
    1. Choose **Generate token**.

## Fork and clone

All contributions to the O3DE repo are expected to be staged in a fork before submitting a pull request.

**To fork and clone O3DE on your PC from GitHub**

1. Create a fork of the O3DE GitHub repo from [{{< links/o3de-source >}}]({{< links/o3de-source >}}). Alternatively, if you are working as a member of a team that has already created a fork, you can skip this step and use your team's existing fork.

    ![Create a fork using the Fork button on the O3DE GitHub repo](/images/welcome-guide/setup-create-fork.png)

    For general instructions and help with creating and using forks in GitHub, see the GitHub Guide on [Forking Projects](https://guides.github.com/activities/forking/).

1. Clone your forked repo. Use your preferred Git UI or a command line to clone the repo in a directory of your choice. You will need your GitHub user name and the personal access token that you created earlier.

    1. Clone the repo from your fork.

        ```cmd
        git clone https://github.com/YOUR-USERNAME/o3de.git
        ```

        {{< note >}}
To save space and improve cloning performance, use the `--depth 1` argument in the git clone command. This creates a shallow clone, which only pulls down the latest commits, and not the entire repo history.
        {{< /note >}}

    1. If you are shown a **Connect to GitHub** dialog box, sign in to GitHub as instructed, using either your browser or your personal access token.

        ![GitHub sign in dialog box](/images/welcome-guide/setup-github-signin.png)

    1. Enter your credentials for the LFS endpoint in the next _sign in_ dialog box. Use your **GitHub user name** and your **personal access token** for the password.

        ![Credential manager asking for LFS credentials](/images/welcome-guide/setup-credential-manager-lfs.png)

    1. Update and verify LFS.

        When the clone operation completes, update LFS and verify that you have all of the files from the LFS endpoint. You should no longer receive credential prompts.

        ```cmd
        cd o3de
        git lfs install
        git lfs pull
        ```

1. Add a remote to track the upstream repo. This will enable you to pull updates from the O3DE repo directly into your local clone.

    ```cmd
    git remote add upstream {{< links/o3de-source >}}.git
    ```

    Verify the upstream repository. You should see the URL for the fork as `origin`, and the URL for the original repository as `upstream`.

    ```cmd
    > git remote -v
    origin  https://github.com/<account>/o3de.git (fetch)
    origin  https://github.com/<account>/o3de.git (push)
    upstream        {{< links/o3de-source >}}.git (fetch)
    upstream        {{< links/o3de-source >}}.git (push)
    ```

1. Any time that you want to sync the latest files from the repo and LFS, you can pull from `upstream main`.

    ```cmd
    git fetch upstream
    git merge upstream/main
    ```

    If new commits were merged from the upstream repo, you can push them to your fork.

    ```cmd
    git push origin
    ```

## Additional setup for O3DE preview

During O3DE preview, there are a few additional steps you must complete before getting started:

* Set the package server URL environment variable.
* Download third-party packages.
* Install additional SDKs.
* Register the engine.

### Set environment variables

1. Set an environment variable for the package server.

    ```cmd
    LY_PACKAGE_SERVER_URLS=https://d2c171ws20a1rv.cloudfront.net
    ```

### Download third-party packages

1. Download the 3rd Party zip file: <https://d2c171ws20a1rv.cloudfront.net/3rdParty-windows-no-symbols-rev13.zip>.

1. Unzip this file into a writable folder. The path, up to and including the 3rdParty folder that was unzipped from this file, will be referred to as the `<3rdParty Path>` in the remainder of this section.

    By default, this location will also act as a cache location for the third-party package downloader (configurable with the `LY_PACKAGE_DOWNLOAD_CACHE_LOCATION` environment variable).

### Install Additional SDK's

1. Install the FBX SDK as instructed in `<3rdParty Path>/FbxSdk/2016.1.2-az.1/README.md`.

1. Install **Wwise version 2019.2.8.7432** using the [Wwise Launcher](https://www.audiokinetic.com/download/). Select the C++ SDK and one or more deployment platforms to install. When the deployment platform is installed, copy the `SDK` directory from the install location into the `<3rdParty Path>/Wwise/2019.2.8.7432` directory that you will create.

### Register O3DE engine

Each time you setup a new O3DE engine directory, you must register it. This creates (or updates) the O3DE manifest in your user directory on your computer.

1. Open a command prompt to the directory where you set up O3DE and use the `o3de register` command as shown.

    ```cmd
    scripts\o3de register --this-engine
    ```

    The manifest file is `<user directory>/.o3de/o3de_manifest.json`. The paths to all the registered engines, projects, gems, and templates are recorded in this file.

You are now ready to create a project! For an introduction to project configuration, see [Intro to Project Configuration](/docs/welcome-guide/get-started/project-config).

For more information about contributing to O3DE and the O3DE code contribution workflow, refer to [Git Workflow](/docs/contributing/to-code/git-workflow.md) in the Contributor's Guide.
