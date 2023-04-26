---
linkTitle: Importing robot
title: ROS 2 Importing robot
description: Importing robot from URDF/XACRO files and creating prefab.
toc: true
---

## Importing robot from URDF/XACRO files and creating prefab

### About URDF and XACRO formats

URDF and XACRO are robot description standards used widely in the ROS ecosystem. [Unified Robotics Description Format (URDF)](http://wiki.ros.org/urdf) is a file format used in robotics to describe the physical characteristics of a robot in a structured and standardized way. It is based on XML and includes information about the robot's joints, links, sensors, and other components, as well as their properties such as mass, inertia, and geometry. [XML Macros (XACRO)](http://wiki.ros.org/xacro) is a macro language that is used to simplify the creation and maintenance of URDF files. It is a way to generate URDF files using XML macros that can be expanded and reused across multiple robot models. Xacro allows the user to define parameters and include files, which can be used to make changes to the robot model quickly and easily.

URDF/XACRO files can contain complete robot descriptions and links to geometry files, but not the geometry as such. Thus typically robot models are made available in packages with additional files containing visualizations and collision shapes. Typical formats of mesh files in robotics are [Collada DAE](https://en.wikipedia.org/wiki/COLLADA) and [STL](https://en.wikipedia.org/wiki/STL_(file_format)). It is also a common practice to make available such robot packages as ROS workspaces, which make them easier to use in ROS applications.

### URDF/XACRO importer - general description

Both URDF and XACRO files can be imported into the O3DE using the importer included in the ROS2 Gem. The main features of the importer:

- The importer can read both: URDF, as well as XACRO files.
- The importer takes into account all features of the XACRO format, such as includes and variables.
- Mesh files can be copied automatically to the asset folder of the O3DE project.
- The importer creates a multi-body structure using articulations or classic rigid bodies and joints models.

### Importing URDF/XACRO - step-by-step

> Before you start:

> 1. Importing URDF/XACRO files requires ROS-ready project with a ROS Gem enabled. Please refer to the [Project Configuration section](project-configuration.md) for details.
> 2. In this section it is assumed, you have already created a O3DE project. Additional information on creating a robotic project can be found in the [Creating a Robotic Simulation section](creating-robotic-simulation.md)
> 3. When using a XACRO files which are a part of a ROS workspace, it may be required to build the workspace first. Otherwise, the importer may fail to find all required files. Please refer to the documentation of the workspace for building instructions (typically you have to place it in the `src` folder of your ROS workspace and perform `colcon build`).

#### Parsing URDF/XACRO file

1. Load your project and select a level.

2. Launch URDF/XACRO import wizard. This can be done by selecting **Main Menu > Tools > Robot Importer** or by clicking the **Robot Importer** icon in the toolbar.
  
![Robot Importer](/images/user-guide/gems/ros2/URDF_importer_button.png)

3. Click **Next** on the information page

4. On the next page:

- Select a URDF or XACRO file to be imported by clicking on the **[...]** button
- Select (using the checkbox) if the importer should copy meshes into the O3DE project assets folder or not
- Click **Next**

![Robot Importer](/images/user-guide/gems/ros2/URDF_importer_load_file.png)

> Note: if you leave the **Import meshes...** checkbox unchecked, the importer will try to find matching meshes in the project asset library.

5. If you are importing a XACRO file that features parameters to be set, you will be asked to do so on the next page. Parameters can be edited by double-clicking on the value. Click **Next** when finished.

![Robot Importer](/images/user-guide/gems/ros2/URDF_importer_XACRO_parameters.png)

> Note: which parameters must be set for succesful import strictly depends on the XACRO project you are importing. Please refer to its documentation for more information.

If import fails you will see a message with the output of the ROS XACRO converter.

![Robot Importer](/images/user-guide/gems/ros2/URDF_importer_fail.png)

#### Loading mesh files

6. If the XACRO or URDF file is loaded correctly you will see a table with a list of all mesh files (assets) used in the model. Each row of the table describes one asset, with information divided into the following columns:

- **URDF mesh path** - path extracted from the URDF
- **Resolved mesh from URDF** - file path of the mesh located in the filesystem
- **Product asset** - location of the asset description (`*.azmodel` or `*.pxmesh`) in the O3DE project assets folder
- **Source asset** - location of the asset mesh file in the O3DE project assets folder
- **Type** - the type of the asset, which can be `visual` or `collider`

Besides this information, there is an indication if the asset was imported correctly (green) or if the import failed (red).

Additional information about each asset can be obtained by double-clicking its row. This will open the O3DE Asset Processor showing import details. This information may be especially helpful in case of assets that were not imported correctly.

Click **Next** when finished.

![Robot Importer](/images/user-guide/gems/ros2/URDF_importer_mesh_list.png)

**What to do if there are problems with importing assets?**

You can do either:

- click **Back**, resolve problems with mesh files and click **Next** to retry import, or
- proceed by clicking **Next** and finish URDF import. Missing meshes can be added afterward in the O3DE editor.

#### Creating O3DE prefab

7. On the next page:

- Choose a prefab name
- Indicate (using the checkbox) if robot physics should be based on articulations, or classic rigid bodies and joints structure.

Click **Create Prefab** when finished.

![Robot Importer](/images/user-guide/gems/ros2/URDF_importer_prefab_creation.png)

> Note: the decision whether to use articulations highly depends on the robot structure and simulation requirements. In general, articulations are more stable and computational efficient, but have some limitations. The most important limtation is that articulations natively only support tree-structures - closed loops are not allowed. The "rule of thumb" would be to use articulations in robotic simulation whenever it is possible. However please refer to [this documentation](https://nvidia-omniverse.github.io/PhysX/physx/5.1.3/docs/Articulations.html) for more details.

8. The last page of the wizard shows a summary of entities.

![Robot Importer](/images/user-guide/gems/ros2/URDF_importer_summary.png)

### Additional information

- The URDF importer can be used to import URDF files that were already imported. In such cases, however, assets (mesh files) are not updated if they were previously imported correctly. If you intend to perform re-import of assets, you should delete them from O3DE project. This can be done by using the Asset Browser.
