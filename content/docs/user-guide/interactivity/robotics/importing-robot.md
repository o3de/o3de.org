---
linkTitle: Importing robot
title: Importing robots
description: Importing robots from URDF with ROS 2 Gem in Open 3D Engine (O3DE).
weight: 450
toc: true
---

ROS 2 Gem for O3DE includes a Robot Importer tool, which works with URDF and XACRO formats that are typically used to describe robots.

## About URDF and XACRO formats

URDF and XACRO are robot description standards used widely in the ROS ecosystem. [Unified Robot Description Format (URDF)](http://wiki.ros.org/urdf) is a file format used in robotics to describe the physical characteristics of a robot in a structured and standardized way. It is based on XML and includes information about the robot's joints, links, sensors, and other components, as well as their properties such as mass, inertia, and geometry. 

[XML Macros (XACRO)](http://wiki.ros.org/xacro) is a macro language that is used to simplify the creation and maintenance of URDF files. It is a way to generate URDF files using XML macros that can be expanded and reused across multiple robot models. XACRO allows the user to define parameters and include files, which can be used to make changes to the robot model quickly and easily.

URDF/XACRO files contain complete robot descriptions, including references to external geometry files. While primitive geometries can be defined directly within the URDF/XACRO file, it is common practice to use external mesh files in formats such as DAE (Collada) or STL to represent the visual and collision shapes of the robot.
Robot models are typically made available in packages that include the URDF/XACRO file and additional files containing visualizations and collision shapes, whether those shapes are primitive geometries or external mesh files. These packages may be distributed as ROS workspaces, which makes them easier to use in ROS applications. 


## Introduction to Robot Importer

Robots can be imported into O3DE simulation project with the importer tool included in the ROS 2 Gem. It has the following features:

- Guides you through the import process step by step.
- Reads URDF and XACRO files.
- It copies all required mesh files to the asset folder of your O3DE project.
- It creates a prefab with a multi-body structure using articulations or classic rigid bodies and joints components.

## Importing a robot into your simulation project


When using robot definition files that are a part of a ROS package, you will often need to build a workspace with such package and its dependencies first. Otherwise, the importer may fail to find all required files. Please refer to the documentation of your robot description package, which is often included in its GitHub README file. Building typically involves creating a workspace and buidling it with `colcon build`.

### Loading the robot definition file with Robot Importer

1. Load your project and select a level.

2. Launch URDF/XACRO import wizard. This can be done by selecting **Main Menu > Tools > Robot Importer** or by clicking the **Robot Importer** icon in the toolbar.
  
![Robot Importer](/images/user-guide/gems/ros2/URDF_importer_button.png)

3. Click **Next** on the information page

4. On the next page:

- Select a URDF or XACRO file to be imported by clicking on the **[...]** button
- Select (using the checkbox) if the importer should copy meshes into the O3DE project assets folder or not
- Click **Next**

![Robot Importer](/images/user-guide/gems/ros2/URDF_importer_load_file.png)

> Note: if you leave the **Import meshes...** checkbox unchecked, the importer will try to find matching meshes in the project asset library. Verification of identity of meshes is done by CRC comparison.

5. If you are importing a XACRO file that features parameters to be set, you will be asked to do so on the next page. Parameters can be edited by double-clicking on the value. Click **Next** when finished.

![Robot Importer](/images/user-guide/gems/ros2/URDF_importer_XACRO_parameters.png)

> Note: which parameters must be set for succesful import strictly depends on the XACRO project you are importing. Please refer to its documentation for more information.

If import fails you will see a message with the output of the ROS 2 XACRO executable.

![Robot Importer](/images/user-guide/gems/ros2/URDF_importer_fail.png)

### Processing robot assets

6. If the XACRO or URDF file is loaded correctly you will see a table with a list of all mesh files (assets) used in the model. Each row of the table describes one asset, with information divided into the following columns:

- **URDF mesh path** - path extracted from the URDF
- **Resolved mesh from URDF** - file path of the mesh located in user's filesystem
- **Product asset** - location of the generated asset (`*.azmodel` or `*.pxmesh`) in the O3DE project assets directory
- **Source asset** - location of the asset mesh file in the O3DE project assets directory
- **Type** - the type of the asset, which can be `visual` or `collider`

Besides this information, there is an indication if the asset was imported correctly (green) or if the import failed (red).

Additional information about each asset can be obtained by double-clicking its row. This will open the O3DE Asset Processor showing import details. This information may be especially helpful in case of assets that were not imported correctly.

Click **Next** when finished.

![Robot Importer](/images/user-guide/gems/ros2/URDF_importer_mesh_list.png)

**What to do if there are problems with importing assets?**
If the Source asset field is marked as failed, it is caused by a URDF importer failure to find a reference to the mesh file in the file system. In such a situation, double-check whether the robot's description package was built and sourced correctly.
If the Product asset field is marked as failed, it is caused by the Asset Builder failing to build the product asset. Refer to the Asset Processor output to resolve the issue.
You can do either:

- click **Back**, resolve problems with mesh files and click **Next** to retry import, or
- proceed by clicking **Next** and finish URDF import. Missing meshes can be added afterward in the O3DE editor.

### Creating a robot prefab

7. On the next page:

- Choose a prefab name
- Indicate (using the checkbox) if robot physics should be based on articulations or classic rigid bodies and joints structure.

Click **Create Prefab** when finished.

![Robot Importer](/images/user-guide/gems/ros2/URDF_importer_prefab_creation.png)

> Note: the decision whether to use articulations highly depends on the robot structure and simulation requirements. In general, articulations are more stable and computational efficient, but have some limitations. The 2 main limtations are:
>
>- Articulations are only available in PhysX 5. By default O3DE is build with PhysX 4.
>- Articulations natively only support tree-structures - closed loops are not allowed.
>
>The "rule of thumb" would be to use articulations in robotic simulation whenever it is possible. However please refer to [this documentation](https://nvidia-omniverse.github.io/PhysX/physx/5.1.3/docs/Articulations.html) for more details.

8. The last page of the wizard shows a summary of entities.

![Robot Importer](/images/user-guide/gems/ros2/URDF_importer_summary.png)

### Re-importing robots

- The URDF importer can be used to import URDF files that were already imported. In such cases, however, assets (mesh files) are not updated if they were previously imported correctly. If you intend to perform re-import of assets, you should delete them from O3DE project. This can be done by using the Asset Browser.
