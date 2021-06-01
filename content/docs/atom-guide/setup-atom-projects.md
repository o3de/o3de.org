---
title: "Setting Up Atom Projects"
description: "Set up Atom projects using the Open 3D Engine"
toc: true
weight: 200
---

{{< preview-new >}}


Get to know the Atom Renderer and its features by setting up an Atom project with the Open 3D Engine. This tutorial covers how to set up two Atom projects: **Atom Test** and **Atom Sample Viewer**.

- **Atom Test**: This project contains a collection of levels that demonstrate Atom's features in the O3DE Editor.
- **Atom Sample Viewer**: This project is a standalone application that is intended for developers and engineers who want to test out Atom's individual functionalities features. Although you will not run the O3DE Editor, O3DE is still required to build this project.

## Prerequisites

The instructions that follow assume you have the following: 

- O3DE installed on your computer and a GitHub account set up. For help, see [Setup](/docs/welcome-guide/setup/) in the Welcome Guide.
- An O3DE engine registered in the O3DE manifest. When setting up O3DE from GitHub, you must manually register the engine. For help, see
[Register O3DE engine](/docs/welcome-guide/setup/setup-from-github/#register-o3de-engine).
- Met all hardware and software requirements listed in
[System Requirements](/docs/welcome-guide/setup/requirements/).

## Setting up the Atom projects

This tutorial uses the following project name and directories in the examples:

- O3DE engine directory: `C:/o3de`
- Atom Test project directory: `C:/AtomTest`
- Atom Sample Viewer project directory: `C:/AtomSampleViewer`
- Package directory (created earlier during [setup](/docs/welcome-guide/setup/setup-from-github/#create-a-packages-directory)): `C:/o3de-packages`

## Clone the Atom project repos

To get a local copy of the Atom projects, you must clone their repository from GitHub into a directory outside of the O3DE repository. 

- **Atom Test:** `git clone https://github.com/aws-lumberyard-dev/o3de-atomtest.git AtomTest`
- **Atom Sample Viewer:** `git clone https://github.com/aws-lumberyard-dev/o3de-atom-sampleviewer.git AtomSampleViewer`

## Update the Atom project repos

We are continuing to update the Atom project repositories. Follow these steps to ensure you have the latest updates to the Atom repositories. 

1. In a command line window, navigate to the directory of the Atom repository. 
    - **Atom Sample Viewer:** `cd <path-to-repo>/AtomSampleViewer`
    - **Atom Test:**  `cd <path-to-repo>/AtomTest`
2. Add a remote repository called `upstream`, which points to the original repository. This makes it easier to fetch and pull changes made to the repos. 
    - **Atom Sample Viewer:** `git remote add upstream https://github.com/aws-lumberyard/o3de-atom-sampleviewer.git`
    - **Atom Test:**  `git remote add upstream [https://github.com/aws-lumberyard/o3de-atomtest.git](https://github.com/aws-lumberyard/o3de-atomtest.git)`
3. Fetch the latest updates from `upstream`, and pull the updates into your branch. 

    ```markdown
    git fetch upstream
    git branch -u upstream/main
    git pull
    ```

{{< note >}}

The Atom project repositories have different branches that correspond to the version branches of the O3DE repository. If you are using the `0.5` branch of O3DE, make sure that you are also in the `0.5` branch of the Atom project. You can switch branches using the command `git branch <name-of-branch>`.

{{< /note >}}

## Generate CMake project

Generate a Visual Studio solution for the Atom projects. From within the directory of the Atom project repository, enter the following in a command line window: `cmake -B build -S. -DLY_3RDPARTY_PATH=C:/o3de-packages`

## Build and run

To build the Atom Sample Viewer:

1. Open the solution file `AtomSampleViewer.sln` in Visual Studio.
2. In the **Solution Explorer** panel, navigate to the project `AtomSampleViewer/Standalone/AtomSampleViewerStandalone`. Right-click it and choose **Build**. 
3. The build files can be found in the directory `C:/AtomSampleViewer/build/bin/profile`.
4.  To launch the Atom Sample Viewer, run `C:/AtomSampleViewer/build/bin/profile/AtomSampleViewerStandalone.exe`.

To build the Atom Test project:

1. In a command line window, navigate to the O3DE repository.

    ```shell
    cd C:/o3de
    ```

2. Register the project. This adds the Atom Test project to the list of known projects in the O3DE manifest, located at `<user-directory>/.o3de/o3de_manifest.json`.

    ```bash
    scripts/o3de.bat register —project-path C:/AtomTest
    ```

3. Use CMake to create the Visual Studio project in the Atom Test project directory. Supply the build directory, the project directory, the Visual Studio generator, the path to the packages directory, and any other project options. Paths can be absolute or relative.

    ```bash
    cmake -B AtomTest/build -S AtomTest -G "Visual Studio 16" -DLY_3RDPARTY_PATH=C:/o3de-packages -DLY_UNITY_BUILD=ON
    ```

4. Use CMake to build the project launcher, O3DE Editor, and Asset Processor. Building the profile configuration is shown here. When specifying the Editor as a build target, the Asset Processor will be built too, since it is a dependency of the Editor.

    ```bash
    cmake --build AtomTest/build --target AtomTest.GameLauncher Editor --config profile -- /m
    ```

5. The build files can be found in the directory `C:/AtomTest/build/bin/profile`.
6. To launch the Editor, run `C:/AtomTest/build/bin/profile/Editor.exe`. 


You are all set up to explore Atom with the Atom Test project or the Atom Sample Viewer project! Check out the graphics samples in the [Atom Sample Viewer](atom-sample-viewer/) section. 