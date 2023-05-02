---
linkTitle: Importing robot
title: Importing robots
description: Importing robots from URDF with ROS 2 Gem in Open 3D Engine (O3DE).
weight: 450
toc: true
---

[ROS 2 Gem](/docs/user-guide/gems/reference/robotics/ros2/) for **Open 3D Engine (O3DE)** includes a **Robot Importer** tool that imports URDF and XACRO formats, robot descriptions, to the ROS 2 ecosystem.

## About URDF and XACRO formats

URDF and XACRO are robot description standards used widely in the ROS ecosystem. 

[Unified Robot Description Format (URDF)](http://wiki.ros.org/urdf) is an XML-based file format that describes the physical characteristics of a robot in a structured and standardized way. It includes information about the robot's joints, links, sensors, and other components, as well as their properties such as mass, inertia, and geometry. 

[XML Macros (XACRO)](http://wiki.ros.org/xacro) is a macro language that simplifies the creation and maintenance of URDF files. XACRO allows you to generate URDF files using XML macros. In XACRO, you can define parameters and include files, which is useful to change and iterate on robot models. You can also expand and reuse XACRO across multiple robot models. 

URDF/XACRO files contain complete robot descriptions, including references to external geometry files. While you can define primitive geometries directly within the URDF/XACRO file, it's common practice to use external mesh files, in formats such as DAE (Collada) or STL, to represent the visual and collision shapes of the robot.
Robot models are typically available in packages that include the URDF/XACRO file and additional geometry files that contain visualizations and collision shapes, either as primitive geometries or external mesh files. These packages may be distributed as ROS workspaces, which are more straightforward to use in ROS applications. 


## Introduction to Robot Importer

Import robots into your O3DE simulation project using the Robot Importer that's included in the ROS 2 Gem. Robot Importer has the following features:

- Guides you through the import process step by step.
- Reads URDF and XACRO files.
- Copies all required mesh files to the `Assets` folder of your O3DE project.
- Creates a prefab with a multi-body structure using articulations or classic rigid bodies and joints components.

## Importing a robot into your simulation project


### Prerequisite

Before you can use robot description files in a ROS package, you must first build a workspace with the package and its dependencies. This ensures that Robot Importer can find all the required files. 

To build, create a workspace and run `colcon build`. 

For more information, refer to the robot description package's documentation, which is often included in the GitHub repository's README file. 

### Loading the robot definition file with Robot Importer

1. Load your project and select a level in O3DE Editor.

2. Launch Robot Importer from the Editor by doing either of the following:
   - Select **Main Menu > Tools > Robot Importer**
   - Select the **Robot Importer** icon in the toolbar 
  
        ![Robot Importer](/images/user-guide/gems/ros2/URDF_importer_button.png)

3. Read the information page in the Robot Importer. Then select **Next**.

4. Load a URDF file by doing the following:

   - Select a URDF or XACRO file to import by clicking on the **[...]** button.
   - (Optional) Enable the checkbox if you want the importer to copy meshes into the O3DE project `Assets` folder. If disabled, the importer tries to find matching meshes in the project asset library. CRC comparison verifies the identity of meshes.
   - Click **Next**.

   ![Robot Importer](/images/user-guide/gems/ros2/URDF_importer_load_file.png)

5. (Optional) If the selected XACRO file contains parameters, set the parameters' values. To edit parameters, **double-click** on the value. When you're finished, click **Next**.

    ![Robot Importer](/images/user-guide/gems/ros2/URDF_importer_XACRO_parameters.png)

    {{< note >}}
How you set the parameters depends on the XACRO project that you are importing. For a successful import, refer to the XACRO project's documentation.

If your XACRO project fails to import, you will see a message with the output of the ROS 2 XACRO executable, similar to the following.

![Robot Importer](/images/user-guide/gems/ros2/URDF_importer_fail.png)
    {{< /note >}}

### Processing robot assets

After the the XACRO and URDF file loads, Robot Importer displays a table with a list of all the mesh files (assets) used in the model. Each row of the table describes one asset, with information divided into the following columns:

- **URDF mesh path** - Relative file path of the mesh, as defined in the URDF file.
- **Resolved mesh from URDF** - Absolute file path of the mesh located in your filesystem.
- **Product asset** - Relative file path of the generated product asset (`*.azmodel` or `*.pxmesh`) in your O3DE project's `Cache` directory.
- **Source asset** - Relative file path of the source asset in your O3DE project's `Assets` directory.
- **Type** - The type of the asset, either `visual` or `collider`.

    Assets that loaded successfully have a green checkmark, whereas assets that failed to load are marked red. 

To see additional information about each asset, **double-click** its row. This opens the O3DE Asset Processor, which shows import details. This information is especially helpful to troubleshoot assets that failed to import.

Click **Next** when finished.

![Robot Importer](/images/user-guide/gems/ros2/URDF_importer_mesh_list.png)

**What to do if there are problems with importing assets?**

If the **Source asset** field is marked as failed, then Robot Importer could not find a reference to the mesh file in the file system. In such a situation, ensure that the robot's description package is built and sourced correctly.

If the **Product asset** field is marked as failed, then the Asset Builder could not build the product asset. Refer to the Asset Processor output or the log files in the `/user/log` directory

You can either resolve the issues now or after you finish using Robot Importer: 
- To resolve, click **Back** and resolve problems with the mesh files. Then click **Next** to retry import.
- To resolve later, click **Next** and finish URDF import. Then add the missing meshes in the O3DE Editor.

### Creating a robot prefab

1. Create a prefab by doing the following:

   - Enter a prefab name.
   - (Optional) Enable the checkbox if you want to base the robot physics on articulations or classic rigid bodies and joints structure.
    - Click **Create Prefab**.

    ![Robot Importer](/images/user-guide/gems/ros2/URDF_importer_prefab_creation.png)

    {{< note >}}
**Use articulation for joints and rigid bodies** depends on the robot structure and simulation requirements. In general, articulations are more stable and computational efficient, but have some limitations. The 2 main limtations are:
- Articulations are only available in PhysX 5. By default, O3DE is built with PhysX 4.
- Articulations only support tree-structures natively. Closed loops are not allowed.

We recommend to use articulations in robotic simulation whenever possible. For more details, refer to [Articulations](https://nvidia-omniverse.github.io/PhysX/physx/5.1.3/docs/Articulations.html) in NVIDIA PhysX 5 documentation.
    {{< /note >}}

1. After creating a prefab, review a summary of the generated entities.

![Robot Importer](/images/user-guide/gems/ros2/URDF_importer_summary.png)

### Re-importing robots

Use the Robot Importer to re-import URDF files. In some cases, assets (mesh files) don't update if they were previously imported correctly. To work around this and do a complete re-import, delete the assets from your project by using the Asset Browser or in the directory.
