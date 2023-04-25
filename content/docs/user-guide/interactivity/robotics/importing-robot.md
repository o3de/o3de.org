---
linkTitle: Importing robot
title: ROS 2 Importing robot
description: Importing robot from URDF/XACRO files and creating prefab.
toc: true
---


[Unified Robot Definition Format (URDF)](http://wiki.ros.org/urdf/XML) and, [XML Macros (XACRO)](http://wiki.ros.org/xacro) are standards for the description of robots used widely in the ROS ecosystem.
URDF and XACRO files can be imported to O3DE Editor through its ROS 2 Gem to prefab.

### Process of importing

- In Editor with opened level, start Importer by pressing the button **Robot Importer**
  
  ![Robot Importer](/images/user-guide/gems/ros2/importer_button.png). 
- The Robot Importer informs about the need for asset compilation.
- On the next page, choose a file in URDF or XACRO format.
- If the file was in XACRO format:
  - Robot Importer shows parameters and editable values.
  - If the processing of the XARCO file does not succeed, Robot Importer gives detailed information.
- On the next page, Robot Importer shows if all meshes successfully compile. Red lines indicate errors and need further investigation.
- On the next page, choose the name for the prefab and click **Create Prefab** to accomplish import. The new prefab will appear in **Entity Outliner**.


### Additional information

- Every **link** from an imported file is translated to a corresponding entity. An **inertial** property of the link is translated to values in the **PhysX Dynamic Rigid Body** component.
  A **collision** property of the link is translated to values in **PhysX * Collider** component.
- A **visual** part of the entity is in a separate subentity named `*_visual`. It makes robot editing easier (for example: by hiding or moving).
- A **joint** from the parent to the child in an imported file is translated to a **PhysX * Joint** component in the child entity with reference to the parent entity.

- {{< important >}}
  Links connected by joints from an imported file create a chain of links. You cannot have a link that has no inertial properties (in particular: mass) unless it lies on one 
  of two ends of the chain.
  {{< /important >}}


### Example
The project [ROSConDemo - Robot Harvesting Sample](https://github.com/o3de/ROSConDemo) contains a detailed description of 
[creating a robot from an URDF file](https://github.com/o3de/ROSConDemo/blob/development/docs/ImportingURDF/URDF_import_guide.md).

