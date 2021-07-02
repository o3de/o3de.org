---
title: Setting up O3DE from GitHub
description: Learn how to set up Open 3D Engine (O3DE) by cloning the source from GitHub.
weight: 300
toc: true
---

Getting the source for Open 3D Engine (O3DE) from GitHub is a great way to set up your development environment, so you can easily sync future engine updates and make contributions to the open source project base.

The instructions here will guide you through the following steps:

* Configure credentials for Git LFS.
* Fork and clone the O3DE GitHub repo.
* Build the O3DE engine.
* Register the engine.

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

    If the output from this command is "Git LFS initialized", then you already have Git LFS installed.

1. Verify that you have a **credential manager** setup for Git. Recent versions of Git install a credential manager to store your credentials so that you don't have to enter them for every request.

    ```cmd
    git config credential.helper
    ```

    Common examples of results to this `git config` command include `manager-core`, `wincred`, `osxkeychain`, and `cache`. However, if you don't see _anything_ in response to this command, you can install [Git Credential Manager Core](https://github.com/microsoft/Git-Credential-Manager-Core#readme) as your credential manager.

1. Create a GitHub **personal access token** with `repo` and `read:org` scope.

    1. Go to [https://github.com/settings/tokens](https://github.com/settings/tokens).

        (GitHub menu equivalent: Settings > Developer Settings > Personal Access Tokens)
    1. Choose **Generate new token**.
    1. (Optional) Add an entry under **Note**. This is only for your reference. You can use it as a personal reminder of what the token is for.
    1. Under **Select scopes**, select the following:
        * `repo` (all)
        * `read:org` (under admin:org)
    1. Choose **Generate token**. Keep the token handy (but private!) for use in later steps.

    {{< important >}}
This token can be used in place of your GitHub password, so protect it just as you would your GitHub password!
    {{< /important >}}

## Fork and clone

All contributions to the O3DE repo are expected to be staged in a fork before submitting a pull request. Refer to the documentation on [Contributing to O3DE Code Sources](/docs/contributing/to-code) in the O3DE Contributor Guide for details about the contribution workflow.

**To fork and clone O3DE on your PC from GitHub**

1. Create a fork of the O3DE GitHub repo from [{{< links/o3de-source >}}]({{< links/o3de-source >}}). Alternatively, if you are working as a member of a team that has already created a fork, you can skip this step and use your team's existing fork.

    ![Create a fork using the Fork button on the O3DE GitHub repo](/images/welcome-guide/setup-create-fork.png)

    For general instructions and help with creating and using forks in GitHub, see the GitHub Guide on [Forking Projects](https://guides.github.com/activities/forking/).

1. Clone your forked repo. Use your preferred Git UI or a command line to clone the repo in a directory of your choice. You will need your GitHub username and the personal access token that you created earlier.

    1. Clone the repo from a fork.

        ```cmd
        # Cloning from your personal fork.
        git clone https://github.com/YOUR-USERNAME/o3de.git

        # Cloning from your team's fork.
        git clone https://github.com/TEAM-FORK/o3de.git
        ```

    1. If you are shown a **Connect to GitHub** dialog box, sign in to GitHub as instructed, using either your browser or your personal access token.

        ![GitHub sign in dialog box](/images/welcome-guide/setup-github-signin.png)

    1. Enter your credentials for the LFS endpoint in the next _sign in_ dialog box. Use your **GitHub username** and your **personal access token** for the password.

        ![Credential manager asking for LFS credentials](/images/welcome-guide/setup-credential-manager-lfs.png)

    1. Verify you have the LFS files.

        When the clone operation completes, verify that you have all of the files from the LFS endpoint. You should no longer receive credential prompts.

        ```cmd
        # Change to the directory name that was created when you cloned the engine repo.
        # The default is o3de.
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
    origin  https://github.com/<FORK>/o3de.git (fetch)
    origin  https://github.com/<FORK>/o3de.git (push)
    upstream        {{< links/o3de-source >}}.git (fetch)
    upstream        {{< links/o3de-source >}}.git (push)
    ```

1. Update the LFS URL to include your fork.  This will enable you to push changes to large files.  Open the .lfsconfig file at the root of the repository for complete instructions and the **DISTRIBUTION** to use.

    ```cmd
    git config lfs.url https://<DISTRIBUTION>.cloudfront.net/api/v1/fork/<FORK> 
    ```

    You may be prompted to re-authenticate the next time you pull or push.  Remember to use your GitHub personal access token not your GitHub password.

    If you wish to revert this change you can run the following command:

    ```cmd
    git config --unset lfs.url 
    ```

1. Any time that you want to sync the latest files from the repo and LFS, you can merge changes from the upstream branch you are working with. The default branch is **development**.

    ```cmd
    git fetch upstream
    git merge upstream/development
    ```

1. In a typical contributor workflow, you will primarily work from a branch off of your fork's development branch. You can use the git `switch` command to create your local working branch and set it to track the upstream development branch.

    ```cmd
    git fetch upstream
    git switch -c <NEW_WORKING_BRANCH> upstream/development
    ```

    When set up to track an upstream branch, you can use the git `pull` command whenever you want to sync the latest changes from upstream.

    ```cmd
    git pull
    ```

For more information and examples of common contributor workflows, refer to [O3DE Code Contribution GitHub Workflow](/docs/contributing/to-code/git-workflow.md) in the Contributor Guide.

## Build the engine

Now that you have a local copy of the O3DE source, you can build the engine, including key tools such as the O3DE **Asset Processor**, **Editor**, and **Project Manager**.

1. Create a package directory in a writeable location. This directory will be used by the O3DE package downloader to retrieve external libraries needed for the engine.

1. Get the Python runtime. The Python runtime is not included in the GitHub repo. It is required by the `o3de` script, which you will use to perform common command line functions. This script requires **CMake** to be installed and accessible on your device's path. If you have not installed CMake, or get an error that CMake cannot be found when running the script, refer to the [System Requirements](./requirements.md) page for installation instructions.

    Open a command prompt to the directory where you set up O3DE and run the `get_python` script.

    ```cmd
    python\get_python.bat
    ```

1. Use CMake to create the Visual Studio project for the engine. Supply the build directory, the Visual Studio generator, the path to the packages directory that you created, and any other project options. Paths can be absolute or relative. Alternatively, you can use the CMake GUI to complete this step.

    In the following example, including the `AutomatedTesting` project is optional, but recommended if you plan on contributing changes to the engine source. You should use this project to run automated testing locally before submitting a pull request (PR) in GitHub.

    ```cmd
    cmake -B build/windows_vs2019 -G "Visual Studio 16" -DLY_3RDPARTY_PATH=C:\o3de-packages -DLY_UNITY_BUILD=ON -DLY_PROJECTS=AutomatedTesting
    ```

    {{< caution >}}
Do not use trailing slashes when specifying the path to the packages directory.
    {{< /caution >}}

    {{< note >}}
Unity builds are recommended in many cases for improved build performance. If you encounter a build error, disable unity builds to help debug the problem.
    {{< /note >}}

1. Use CMake to build the test project, engine, and tools. When specifying the Editor as a build target, the AssetProcessor and Project Manager will be built too, since they are dependencies of the Editor. The `profile` build configuration is shown in this example.

    ```cmd
    cmake --build build/windows_vs2019 --target AutomatedTesting.GameLauncher Editor --config profile -- /m
    ```

    {{< note >}}
The `/m` is a recommended build tool optimization, which tells the Microsoft compiler (MSVC) to use multiple threads during compilation to speed up build times.
    {{< /note >}}

The engine will take a while to build. In this example, when the build is complete, the tools can be found in `/build/windows_vs2019/bin/profile`.

## Register the engine

Registering the O3DE engine enables O3DE projects to find the engine, even when they exist in different locations on your computer. The registration process creates (or updates) the **O3DE manifest** in your user directory.

1. Use the `o3de register` command from the O3DE repo to register the engine.

    ```cmd
    scripts\o3de.bat register --this-engine
    ```

    The O3DE manifest file is `<USER_DIRECTORY>/.o3de/o3de_manifest.json`. The paths to all the registered engines, projects, and more are recorded in this file.

You are now ready to create a project! For an introduction to project configuration, refer to [Intro to Project Configuration](/docs/welcome-guide/get-started/project-config).
