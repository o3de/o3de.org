---
title: Setting up O3DE from GitHub
description: Learn how to set up and build Open 3D Engine (O3DE) from its GitHub source.
weight: 300
toc: true
---

Getting the source for Open 3D Engine (O3DE) from GitHub is a great way to set up your development environment. This method lets you easily sync future engine updates and make contributions to the open source project base. For instructions on setting up O3DE from GitHub, check out the following video or the tutorial on this page.

The video and written instructions guide you through the following steps:

* Configure credentials for Git LFS.
* Fork and clone the O3DE GitHub repo.
* Build the O3DE engine.
* Register the engine.

{{< youtube id="CIw9UoMMeX8" title="Setting up O3DE from GitHub" >}}

## Prerequisites

The instructions here assume that you have:

* [Git client](https://git-scm.com/downloads) installed (1.8.2 or later required, 2.23.4 or later recommended).
* Met all hardware and software requirements listed in [O3DE System Requirements](../requirements).
* Configured the required software as described in the [Software configuration](../requirements#software-configuration) section of the system requirements topic.

## Configure credentials for Git LFS

The O3DE GitHub repo uses the Git Large File Storage (LFS) system for storing large binary files. The following instructions will prepare your PC to authenticate and download these files automatically when you clone, fetch, or pull from the repo.

**To configure for Git LFS**

1. Verify that **Git LFS** is installed.

    ```cmd
    git lfs install
    ```

    If the output from this command is "Git LFS initialized", then you already have Git LFS installed.

1. Verify that you have a **credential manager** set up for Git. Recent versions of Git install a credential manager to store your credentials so that you don't have to enter them for every request.

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

1. (Optional) If you don't expect to make changes to these files, ignore this step. Otherwise, update the LFS URL to include your fork. This lets you push changes to files in the LFS. For complete instructions and the **DISTRIBUTION** to use, open the `.lfsconfig` file at the root of the repository.

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

For more information and examples of common contributor workflows, refer to [O3DE Code Contribution GitHub Workflow](/docs/contributing/to-code/git-workflow) in the Contributor Guide.

## Build the engine

Now that you have a local copy of the O3DE source, you can build the engine, including key tools such as **Asset Processor**, **O3DE Editor**, and **Project Manager**.

Choose one of the following build types based on the primary focus of your development work, then follow the instructions in the corresponding tab:

1. **Source engine** - Choose this build type if you plan to make frequent changes to the engine source code.

1. **Pre-built SDK engine** - Choose this build type if you're primarily interested in project development and you plan to make only infrequent changes (or no changes) to the engine source.

{{< tabs name="Engine build instructions" >}}
{{% tab name="Source engine" %}}

1. Create a package directory in a writeable location. The following examples use the directory `C:\o3de-packages`.

    ```cmd
    mkdir C:\o3de-packages
    ```

    The O3DE package downloader uses this directory to retrieve external libraries needed for the engine.

1. Get the Python runtime, which isn't included in the GitHub repo. The `o3de` script (part of the **O3DE CLI**) requires this runtime. You'll use this script to run common command line functions. This script also requires **CMake** to be installed and accessible on your device's path. If you haven't installed CMake, or you get an error that CMake cannot be found when running the script, refer to the [O3DE System Requirements](../requirements) page for installation instructions.

    Open a command prompt and change to the directory where you set up O3DE, then run the `get_python` script.

    ```cmd
    python\get_python.bat
    ```

1. Use CMake to create the Visual Studio project for the engine. Supply the build directory, the Visual Studio generator, the path to the packages directory that you created, and any other project options. Paths can be absolute or relative. Alternatively, you can use the CMake GUI to complete this step.

    ```cmd
    cmake -B build/windows_vs2019 -G "Visual Studio 16" -DLY_3RDPARTY_PATH=C:\o3de-packages
    ```

    The preceding command specifies several noteworthy custom definitions (`-D`). All are optional but recommended in this example.

    * `LY_3RDPARTY_PATH` : The path to the downloadable package directory, also known as the "third-party path". Do not use trailing slashes when specifying the path to the packages directory.

1. (Optional) Use CMake to build the source engine. This step is optional because in the "source engine" build model, the engine is built inside of every project. If you plan on working with projects, to avoid building the engine twice, consider waiting until you learn how to create and build a project, which we cover in our documentation on creating projects. The following command builds the engine without a project.

    The following example shows the `profile` build configuration.

    ```cmd
    cmake --build build/windows_vs2019 --target Editor --config profile -- /m
    ```

    The `/m` is a recommended build tool optimization. It tells the Microsoft compiler (MSVC) to use multiple threads during compilation to speed up build times.

    The engine takes a while to build. If you've used all the example commands in these steps, when the build is complete, you can find the engine tools and other binaries in `C:\o3de\build\windows_vs2019\bin\profile`.

{{% /tab %}}
{{% tab name="Pre-built SDK engine" %}}

1. Create a package directory in a writeable location. The following examples use the directory `C:\o3de-packages`.

    ```cmd
    mkdir C:\o3de-packages
    ```

    The O3DE package downloader uses this directory to retrieve external libraries needed for the engine.

1. Get the Python runtime, which isn't included in the GitHub repo. The `o3de` script (part of the **O3DE CLI**) requires this runtime. You'll use this script to run common command line functions. This script also requires **CMake** to be installed and accessible on your device's path. If you haven't installed CMake, or you get an error that CMake cannot be found when running the script, refer to the [O3DE System Requirements](../requirements) page for installation instructions.

    Open a command prompt and change to the directory where you set up O3DE, then run the `get_python` script.

    ```cmd
    python\get_python.bat
    ```

1. Use CMake to create the Visual Studio project for the engine. Supply the build directory, the Visual Studio generator, the path to the packages directory that you created, and any other project options. Paths can be absolute or relative. Alternatively, you can use the CMake GUI to complete this step.

    ```cmd
    cmake -B build/windows_vs2019 -G "Visual Studio 16" -DLY_3RDPARTY_PATH=C:\o3de-packages -DLY_VERSION_ENGINE_NAME=o3de-install -DCMAKE_INSTALL_PREFIX=C:\o3de-install
    ```

    The preceding command specifies several noteworthy custom definitions (`-D`). All are optional but recommended in this example.

    * `LY_3RDPARTY_PATH` : The path to the downloadable package directory, also known as the "third-party path". Do not use trailing slashes when specifying the path to the packages directory.
    * `LY_VERSION_ENGINE_NAME` : The name you want to give the engine. Giving the install layout a different engine name ("o3de-install") than the source engine ("o3de") enables useful side-by-side options.
    * `CMAKE_INSTALL_PREFIX`: The path to the installed build of the engine source. The directory you specify here is your engine install directory. You will find the Project Manager, Editor, and other tools in the subdirectory `bin/Windows/profile/Default`. If you don't specify this option, the engine SDK binaries will be built to `<ENGINE_SOURCE>/install/bin/Windows/profile/Default`.

1. Use CMake to build the engine as an SDK, the same as if you installed the engine from an installer tool. The following example shows the `profile` build configuration.

    ```cmd
    cmake --build build/windows_vs2019 --target INSTALL --config profile -- /m
    ```

    The `/m` is a recommended build tool optimization. It tells the Microsoft compiler (MSVC) to use multiple threads during compilation to speed up build times.

    The engine takes a while to build. If you've used all the example commands in these steps, when the build is complete, you can find the engine tools and other binaries in `C:\o3de-install\bin\Windows\profile\Default`.

{{% /tab %}}
{{< /tabs >}}

{{< note >}}
CMake [unity builds](https://cmake.org/cmake/help/latest/prop_tgt/UNITY_BUILD.html) are on by default. This is a CMake feature that can greatly improve build times by merging source files into single compilation units. If you encounter a build error, disabling unity builds might help debug the problem. To disable unity builds, run the `cmake` project generation command with the `-DLY_UNITY_BUILD=OFF` argument to regenerate your project files.
{{< /note >}}

## Register the engine

Registering the O3DE engine enables O3DE projects to find the engine, even when they exist in different locations on your computer. The registration process creates (or updates) the **O3DE manifest** in your user directory.

Choose the tab that corresponds to the engine build type you chose in the preceding set of instructions.

{{< tabs name="Engine registration instructions" >}}
{{% tab name="Source engine" %}}

1. Open a command window if you don't already have one open. Change your current directory to the source engine directory.

    ```cmd
    cd C:\o3de
    ```

1. Use the `o3de` script to register the engine.

    ```cmd
    scripts\o3de.bat register --this-engine
    ```

    The O3DE manifest file is `<USER_DIRECTORY>/.o3de/o3de_manifest.json`. The paths to all the registered engines, projects, and more are recorded in this file.

{{% /tab %}}
{{% tab name="Pre-built SDK engine" %}}

1. Open a command window if you don't already have one open. Change your current directory to the pre-built engine directory.

    ```cmd
    cd C:\o3de-install
    ```

1. Get the Python runtime for the pre-built engine.

    ```cmd
    python\get_python.bat
    ```

1. Use the `o3de` script to register the engine.

    ```cmd
    scripts\o3de.bat register --this-engine
    ```

    The O3DE manifest file is `<USER_DIRECTORY>/.o3de/o3de_manifest.json`. The paths to all the registered engines, projects, and more are recorded in this file.

{{% /tab %}}
{{< /tabs >}}

You're now ready to create a project. For an introduction to project configuration, refer to [Project Creation with Open 3D Engine](/docs/welcome-guide/create).

## Side-by-side engines
 
 In the preceding sections, you learned how to set up and configure the O3DE engine as either a source engine or a pre-built SDK engine. You also have the option of registering both engines in a side-by-side configuration. This is one way to isolate your engine source code development from your project development.

 For example, if the engine source is in `C:\o3de` and the pre-built SDK engine is in `C:\o3de-install`, you can give each engine its own engine name so that you can register both in the O3DE manifest using the `o3de` script's `register` command. To test your engine modifications, you can build a test project using the source engine project creation instructions, which builds the engine in the project directory. When you're ready to update the SDK engine that your production project uses, you can build a new version of the SDK engine from `C:\o3de` using the `INSTALL` target. This updates the binaries in `C:\o3de-install`.

To update the name of an engine, open `engine.json` in the engine root directory and change the `engine_name` field. Then run `scripts\o3de.bat register --this-engine` again from that directory. New projects that you create from this engine will use the new engine name. To update the configured engine for an existing project, open `project.json` in the project root directory and change the `engine` field to use the new engine name.
