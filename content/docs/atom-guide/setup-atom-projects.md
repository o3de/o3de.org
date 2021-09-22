---
title: "Setting Up Atom Projects"
description: "Set up Atom projects using the Open 3D Engine"
toc: true
weight: 200
---

Get to know the Atom Renderer and its features by setting up an Atom project with the Open 3D Engine. This tutorial covers how to set up two Atom projects: **Atom Test** and **Atom Sample Viewer**.

- **Atom Test**: This project contains a collection of levels that demonstrates Atom's features in the O3DE Editor.
- **Atom Sample Viewer**: This project is a standalone application that is intended for developers and engineers who want to test out Atom's individual features. Although you will not run the O3DE Editor, O3DE is still required to build this project.

## Prerequisites
Before setting up the Atom projects, you must have the O3DE engine installed on your computer. Follow the instructions in the [Setup](/docs/welcome-guide/setup) section of the Get Started Guide to set up O3DE.


## Setting up the Atom projects

This tutorial uses the following project name and directories in the examples:

- O3DE engine directory: `C:\o3de`
- Atom Test project directory: `C:\AtomTest`
- Atom Sample Viewer project directory: `C:\AtomSampleViewer`
- Package directory (created earlier during [setup](/docs/welcome-guide/setup/setup-from-github/#create-a-packages-directory)): `C:\o3de-packages`

## Clone project repos

To get a local copy of the Atom projects, you must clone their repository from GitHub. For best practice, clone the repo into a directory outside of the O3DE repository. 

Atom Test
: 
    ```cmd
    git clone https://github.com/o3de/o3de-atomtest.git C:\AtomTest
    ```

Atom Sample Viewer
: 
    ```cmd    
    git clone https://github.com/o3de/o3de-atom-sampleviewer.git C:\AtomSampleViewer
    ```

## Update the local project repos

The community is continuing to update the Atom project repositories. This step ensures your local copy has the latest updates from the Atom repositories. 

In a command line window, navigate to the directory of the Atom repository and pull the latest changes from `origin/main` into your branch. 

Atom Test
: 
    ```cmd
    cd C:\AtomTest
    git pull origin main
    ```

Atom Sample Viewer
: 
    ```cmd    
    cd C:\AtomSampleViewer
    git pull origin main
    ```


## Generate CMake project

Use CMake to generate a Visual Studio solution, which is used in the next step to build the Atom project. 

Atom Test
: 
    ```cmd
    cmake -B "C:\AtomTest\build" -S "C:\AtomTest" -G "Visual Studio 16" -DLY_3RDPARTY_PATH=C:\o3de-packages
    ```

Atom Sample Viewer
: 
    ```cmd    
    cmake -B "C:\AtomSampleViewer\build" -S "C:\AtomSampleViewer" -G "Visual Studio 16" -DLY_3RDPARTY_PATH=C:\o3de-packages
    ```

## Register project to O3DE
*This step is for the Atom Test project only.* 

Register the Atom Test project to add it to the list of known projects in the O3DE manifest, located at `<user-directory>/.o3de/o3de_manifest.json`. 

Atom Test
: 
    ```cmd
    C:\o3de\scripts\o3de.bat register --project-path C:\AtomTest
    ```

## Build and run

**Atom Sample Viewer**  

1. Open the solution file `AtomSampleViewer.sln` in Visual Studio.
2. In the **Solution Explorer** panel, navigate to the project `AtomSampleViewer/Standalone/AtomSampleViewerStandalone`. Right-click it and choose **Build**. 
3. When the project is done building, you can find the build files in the directory `C:/AtomSampleViewer/build/bin/profile`. From there, you can launch `AtomSampleViewerStandalone.exe`.

You are all set up to explore Atom with the Atom Sample Viewer project! Check out the [Atom Sample Viewer](atom-sample-viewer/) section to learn about the graphics samples provided.


**Atom Test**  

1. Use CMake to build the project launcher, O3DE Editor, and Asset Processor. The following command builds using the profile configuration. When specifying the Editor as a build target, the Asset Processor will be built too, since it is a dependency of the Editor.

    ```cmd
    cmake --build "C:\AtomTest\build" --target AtomTest.GameLauncher Editor --config profile -- /m
    ```

2. When the project is done building, you can find the build files in the directory `C:\AtomTest\build\bin\profile`. From there, you can launch `Editor.exe`, `AssetProcessor.exe`, and other tools. 

You are all set up to explore Atom with the Atom Test project! Check out the [Atom Gem's component reference](/docs/user-guide/components/reference/atom/) in the O3DE User Guide to learn how to use the components in the Atom Test project. 
