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

* [Git client](https://git-scm.com/downloads) installed (1.8.2 or later required, 2.23.4 or later recommended).
* Met all hardware and software requirements listed in [System Requirements](./requirements.md).

## Configure credentials for Git LFS

The O3DE GitHub repo uses the Git Large File Storage (LFS) system for storing large binary files. The following instructions will prepare your PC to authenticate and download these files automatically when you clone, fetch, or pull from the repo.

**To configure for Git LFS**

1. Verify that **Git LFS** is installed.

    ```cmd
    git lfs install
    ```

1. Verify that you have a **credential manager** setup for Git. Recent versions of Git install a credential manager to store your credentials so that you don't have to enter them for every request.

    ```cmd
    git config credential.helper
    ```

    Common examples of results to this `git config` command include `manager-core`, `wincred`, `osxkeychain`, and `cache`. However, if you don't see _anything_ in response to this command, you can install [Git Credential Manager Core](https://github.com/microsoft/Git-Credential-Manager-Core#readme) as your credential manager.

1. Create a GitHub **personal access token** with `repo` and `read:org` scope.

    1. Go to [https://github.com/settings/tokens](https://github.com/settings/tokens).

        (GitHub menu equivalent: Settings > Developer Settings > Personal Access Tokens)
    1. Choose **Generate new token**.
    1. (Optional) Add an entry under **Note**. This is only for your reference.
    1. Under **Select scopes**, select the following:
        * `repo` (all)
        * `read:org` (under admin:org)
    1. Choose **Generate token**. Keep the token handy (but private!) for use in later steps.

    {{< important >}}
This token can be used in place of your GitHub password, so protect it just as you would your GitHub password!
    {{< /important >}}

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

    1. Verify you have the LFS files.

        When the clone operation completes, verify that you have all of the files from the LFS endpoint. You should no longer receive credential prompts.

        ```cmd
        // Change to the directory name that was created when you cloned the engine repo. Default is o3de.
        cd o3de 
        git lfs pull
        ```

1. Add a remote to track the upstream repo. This will enable you to pull updates from the O3DE repo directly into your local clone.

    ```cmd
    git remote add upstream {{< links/o3de-source >}}.git
    ```

    Verify the upstream repository. You should see the URL for the fork as `origin`, and the URL for the original repository as `upstream`.

    ```cmd
    git remote -v
    ```

    Output:

    ```cmd
    origin  https://github.com/<USERNAME>/o3de.git (fetch)
    origin  https://github.com/<USERNAME>/o3de.git (push)
    upstream        {{< links/o3de-source >}}.git (fetch)
    upstream        {{< links/o3de-source >}}.git (push)
    ```

1. Any time that you want to sync the latest files from the repo and LFS, you can pull from the branch you are woking with, such as `upstream main`.

    ```cmd
    git fetch upstream
    git merge upstream/main
    ```

    If new commits were merged from the upstream repo, you can push them to your fork.

    ```cmd
    git push origin
    ```

1. To switch to a release branch, use the `git checkout` or `git switch` command. For example, to switch to branch **0.5**:

    ```cmd
    git fetch upstream
    git checkout --track upstream/0.5
    ```

    To get updates for a release branch, make sure to fetch and merge from the correct upstream branch.

    ```cmd
    git fetch upstream
    git merge upstream/0.5
    ```

## Additional setup for O3DE preview

At this time, O3DE is available for preview. During O3DE preview, there are a few additional steps you must complete before getting started:

* Create a third-party folder for downloaded packages.
* Get the Python runtime.
* Register the engine.

### Create a third-party folder

1. Create a new folder in a writeable location. This folder will be used by the third-party package downloader to download third-party libraries that are needed when building the engine.

1. Create an empty text file named `3rdParty.txt` in this folder. (Later versions of the engine will not require this file.)

### Get the Python runtime

The Python runtime is not included in the GitHub repo. Since it is required by the `o3de` script in the next step, download it now using the script provided in the `python` directory. This script requires CMake to be installed and accessible on your device's path. If you have not installed CMake, or get an error that CMake cannot be found when running the script, refer to the [System Requirements](./requirements.md) page for installation instructions.

1. Open a command prompt to the directory where you setup O3DE and run the `get_python` script as shown. Note that in the 0.5 release branch, you need to temporarily set the LY_PACKAGE_SERVER_URLS environment variable, as shown in the following example.

    ```cmd
    set LY_PACKAGE_SERVER_URLS=https://d2c171ws20a1rv.cloudfront.net
    python\get_python.bat
    ```

### Register O3DE engine

Each time you setup a new O3DE engine directory, you must register it. This creates (or updates) the **O3DE manifest** in your user directory on your computer.

1. Open a command prompt to the directory where you set up O3DE and use the `o3de register` command as shown.

    ```cmd
    scripts\o3de.bat register --this-engine
    ```

    The O3DE manifest file is `<user directory>/.o3de/o3de_manifest.json`. The paths to all the registered engines, projects, gems, and templates are recorded in this file.

You are now ready to create a project! For an introduction to project configuration, see [Intro to Project Configuration](/docs/welcome-guide/get-started/project-config).

For more information about contributing to O3DE and the O3DE code contribution workflow, refer to [Git Workflow](/docs/contributing/to-code/git-workflow.md) in the Contributor's Guide.
