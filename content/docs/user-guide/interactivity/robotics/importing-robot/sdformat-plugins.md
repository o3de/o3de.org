---
linkTitle: SDFormat plugins
title: SDFormat plugins
description: Detailed description of support of SDFormat plugins in Robot Importer.
weight: 470
---

## Introduction

Robots described in either [SDFormat](http://sdformat.org/), [URDF](http://wiki.ros.org/urdf), or [XACRO](http://wiki.ros.org/xacro) format, can be imported into your O3DE simulation project using the Robot Importer. The tool creates O3DE entities and components that model a robot. You can find more details about Robot Importer in the [documentation](/docs/user-guide/interactivity/robotics/importing-robot/). 

SDFormat standard allows the extension of the functionality of the imported robot by adding _plugins_ to the description. The same description can be incorporated into URDF and XACRO files using `<gazebo>` tag. Technically, such a plugin is a dynamically loaded chunk of code that can extend _world_, _model_, or _sensor_ description. Currently, only _models_, _sensors_ and _plugins_ are supported. Please refer to [SDformat sensors page](./sdformat-sensors.md) to learn more about _sensors_ and _plugins_. 

## Plugin import architecture

_Plugin_ import, i.e. the mapping between Gazebo description and O3DE components, is based on the O3DE [reflection system](/docs/user-guide/programming/components/reflection/reflecting-for-serialization/). In particular, O3DE components that are designed to mirror the behavior of SDFormat _plugins_ are registered using a specialized attribute tag. The import structure, called _hook_, implements the conversion scheme between the robot description parameters and O3DE data. The Robot Importer finds all active _hooks_ and checks, if any of them can be used to import SDFormat data. The mapping is extendable, allowing you to add your _hooks_ and map them to existing SDFormat data.

The matching between the _hooks_ and the robot description is done based on the plugins' filenames. This way you can override the default behavior of the Robot Importer using your specific implementation connected with the specific filename. 

### Default model plugins

Two _hooks_ to extend the _models_ are predefined in Robot Importer. They simplify the import, however, due to differences between O3DE and Gazebo, some manual tuning of O3DE components is required to make the robot drivable. For models with _articulations_ enabled consider changing _Force Limit Value_, _Stiffness Value_, and _Damping Value_ in _Motor Configuration_ of wheel links. Finally, make sure the inertia and the mass of each link is configured correctly. Similarly, _Force Limit Value_ in _Motor Configuration_ of wheel joints is a key parameter when importing a robot without _articulation links_. 

#### O3DE Skid Steering Robot Control

_ROS2SkidSteeringModel_ is a pre-defined _hook_ used to map `libgazebo_ros_skid_steer_drive.so` and `libgazebo_ros_diff_drive.so` SDFormat plugins in either ROS or ROS 2 formats into a number O3DE components. In particular, it creates _ROS2RobotControlComponent_, and _SkidSteeringModelComponent_ O3DE components in a base link of the robot alongside _WheelControllerComponent_  components in wheels. 

#### O3DE Ackermann Robot Control

_ROS2AckermannModel_ is a pre-defined hook used to map `libgazebo_ros_ackermann_drive.so` SDFormat plugin into a number of O3DE components. In particular, it creates _ROS2RobotControlComponent_, and _SkidSteeringModelComponent_ O3DE components in a base link of the robot alongside _WheelControllerComponent_  components in wheels. 

You might need to enable motor in joints (or articulation links) of your steering joints manually. Moreover, your import will fail when steering joints in SDFormat description are defined as _Universal Joints_, which are currently not supported in O3DE.

#### O3DE Joint State Publisher

_ROS2JointStatePublisherModel_ is a pre-defined _hook_ used to map `libgazebo_ros_joint_state_publisher.so` SDFormat plugin into the _JointsManipulationEditorComponent_ in O3DE. The component is added to the base link of the robot alongside either _JointsArticulationControllerComponent_ or _JointsPIDControllerComponent_ depending on whether you decide to use articulations in your imported robot.

Note that, as the namespace policy in O3DE differs from Gazebo, this hook won't change the namespace on which joint states are published whether or not you specified it in the SDFormat file. Similarly, you won't be able to specify the names of the joints to be published; O3DE _JointsManipulationEditorComponent_ will publish the states of each joint either way.

#### O3DE Joint Pose Trajectory

_ROS2JointPoseTrajectoryModel_ is a pre-defined _hook_ used to map `libgazebo_ros_joint_pose_trajectory.so` SDFormat plugin into the _JointsTrajectoryComponent_ in O3DE. The component is added to the base link of the robot alongside _JointsManipulationEditorComponent_ and either _JointsArticulationControllerComponent_ or _JointsPIDControllerComponent_ depending on whether you decide to use articulations in your imported robot. Similarly to Joint State Publisher hook, namespace remapping won't be parsed here.

If you plan on importing both Joint State Publisher and Joint Pose Trajectory in one SDFormat file, Joint State Publisher might not get imported because of the order in which plugins are listed in your file. If that happens, _JointsManipulationEditorComponent_ will be added anyway, but parameters of created component might differ from those specified in your robot description. Information about it will be visible in the Robot Importer summary window. For now, there are two ways to resolve this issue:
1. Make sure that `libgazebo_ros_joint_state_publisher.so` plugin is listed before `libgazebo_ros_joint_pose_trajectory.so` in your SDFormat file. If not, you can change their order manually by simply swapping their descriptions (including headlines as well as plugin parameters) using copy-paste.
2. After performing succesful import of your SDFormat file (excluding `libgazebo_ros_joint_state_publisher.so`), go to the base link of your model and manually adjust parameters of the _JointsManipulationEditorComponent_. Note that since this O3DE component serves not only for publishing joint states, but also for actions like setting joints start positions, you might encounter more parameters avilable than just those that define the way your joint states will be published. The parameters that you might need to adjust are all visible under the _Joint State Publisher_ section.

After preforming successful import, you might need to enable motor in joints (or articulation links) of your joints manually in order to be able to adjust their trajectory.

### Extending default mapping

You can extend the default mapping by implementing additional _hooks_ and registering them in the system based on the _SerializeContext_ reflection system. The scheme for adding hooks for models' plugins is alike the scheme for extending sensor support described in detail in [SDformat sensors page](./sdformat-sensors.md). The only difference is that plugins for models require `ROS2::SDFormat::ModelPluginImporterHook` structure registered under `ModelPluginImporterHooks` attribute tag.

<!--- TODO: add a link to the tutorial with step-by-step hook implementation -->
