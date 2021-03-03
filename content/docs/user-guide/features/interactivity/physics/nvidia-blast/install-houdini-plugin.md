---
description: ' Install Houdini plug-ins to create destruction assets for simulations
  in Amazon Lumberyard with NVIDIA Blast. '
title: Install SideFX Houdini plug-ins for NVIDIA Blast
---
# Install SideFX Houdini plug\-ins for NVIDIA Blast {#nvidia-blast-install-houdini-plugin}


****

|  |
| --- |
| This feature is an [experimental](/docs/userguide/ly-glos-chap#experimental) release and is subject to change\.  |

 To create NVIDIA Blast assets, you must install a set of plug\-ins and Houdini Digital Assets for SideFX Houdini\.

**Note**
NVIDIA Blast for Lumberyard requires a SideFX Houdini commercial or indie license to create assets\. The apprentice license is not sufficient\. For more information on Houdini, see [SideFX's home page](https://www.sidefx.com/)\.
The precompiled Houdini plug\-ins supplied with the **NVIDIA Blast** gem require Houdini 18\.0\.

**Contents**
+ [Install NVIDIA Blast plug\-ins](#nvidia-blast-plugin-install)
+ [Enable the Blast tool shelf](#nvidia-blast-tool-enable)

## Install NVIDIA Blast plug\-ins {#nvidia-blast-plugin-install}

**To install plug\-ins**

1. Run `install_plugin.bat` from the `houdini` directory located at `lumberyard_installation\dev\Gems\Blast\houdini`\.

1. Grant the installer script administrator privileges when requested\.

   The plug\-ins are installed into various directories in `C:\Users\user_name\Documents\houdini18.0\`\.

1. To verify the installation, you can check for the following files in your Houdini user directory\.

   The `C:\Users\user_name\Documents\houdini18.0\otls` directory contains these three files:
   + `blastExport.hda`
   + `fractureHierarchy.hda`
   + `fractureSingle.hda`

   The `C:\Users\user_name\Documents\houdini18.0\toolbar` directory contains these three files:
   + `default.shelf`
   + `Fracture.shelf`
   + `shelf_tool_assets.json`

   The `C:\Users\user_name\Documents\houdini18.0\dso` directory contains these five files:
   + `BlastExportPlugin.dll`
   + `BlastExportPlugin.exp`
   + `BlastExportPlugin.ilk`
   + `BlastExportPlugin.lib`
   + `BlastExportPlugin.pdb`

   The `C:\Users\user_name\Documents\houdini18.0\dependencies` directory contains eleven `NvBlast*.dll` files and four `PhysX*.dll` files\.

1. Verify that the installation script has added your `houdini` user directory to the **PATH** environment variable in Windows:

   `C:\Users\user_name\Documents\houdini18.0\`

**Note**
If Houdini is running prior to installation of the NVIDIA Blast tools for Houdini, restart Houdini for the changes to take effect\.

**Important**
Some Houdini installations create the Houdini user directory at `C:\Users\user_name\houdini18.0\` rather than in the `Documents` directory\. If Houdini does not load the NVIDIA Blast tools, check to see if Houdini has created a user directory at `C:\Users\user_name\houdini18.0\`\. If the directory exists and contains Houdini files such as `dso.cache`, move the above files to `C:\Users\user_name\houdini18.0\` and add `C:\Users\user_name\houdini18.0\` to the **PATH** environment variable\.

## Enable the Blast tool shelf {#nvidia-blast-tool-enable}

The NVIDIA Blast installation for Houdini includes a tool shelf that you can enable to speed up the process of creating assets for NVIDIA Blast\.

**To enable the Blast tool shelf**

1. In Houdini, choose the **\+** button in the **Toolbar** to the far right\.

1. From the list, choose **Shelves** to expose the **Shelf list**\.

1. From the **Shelf list** choose **Fracture tools for Blast** to add the shelf to the **Toolbar**\.

![\[Enable the NVIDIA Blast tool shelf in Houdini.\]](/images/user-guide/physx/blast/ui-blast-houdini-shelf-enable.png)