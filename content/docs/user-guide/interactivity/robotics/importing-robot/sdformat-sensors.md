---
linkTitle: SDFormat sensors
title: SDFormat sensors
description: Detailed description of support of SDFormat sensors in Robot Importer.
weight: 100
---

## Introduction

Robots described in either [SDFormat](http://sdformat.org/), [URDF](http://wiki.ros.org/urdf), or [XACRO](http://wiki.ros.org/xacro) format, can be imported into your O3DE simulation project using the Robot Importer. The tool creates O3DE entities and components that model a robot. You can find more details about Robot Importer in the [documentation](/docs/user-guide/interactivity/robotics/importing-robot/). 

Similarly, the robots' [sensors](http://sdformat.org/spec?ver=1.10&elem=sensor) are imported from the description files into O3DE using ROS 2 sensor components available in [ROS 2 Gem](/docs/user-guide/gems/reference/robotics/ros2/). Note, that the sensor's description can be stored directly in SDFormat files or using `<gazebo>` tag in URDF and XACRO files.

## Sensor import architecture

Sensor import, i.e. the mapping between Gazebo description and O3DE components, is based on the O3DE [reflection system](/docs/user-guide/programming/components/reflection/reflecting-for-serialization/). In particular, O3DE components that are designed to mirror the behavior of SDFormat sensors and/or plugins are registered using a specialized attribute tag. The import structure, called _hook_, implements the conversion scheme between the robot description parameters and O3DE data. The Robot Importer finds all active _hooks_ and checks, if any of them can be used to import SDFormat data. The mapping is extendable, allowing you to add your _hooks_ and map them to existing SDFormat data.

It is important to note, that implementation of sensors in [ROS 2 Gem](/docs/user-guide/gems/reference/robotics/ros2/) exposes ROS 2 communication interfaces by design, which makes it comparable to Gazebo sensor plugins. Therefore, you do not have to define a Gazebo sensor plugin if you want to make ROS 2 topics available. On the other hand, both sensor and plugin names must match the _hook's_ definition to be added to O3DE representation of the robot if the plugin definition exists in the robot description file. This way you can override the default behavior of the Robot Importer with your specific implementation of the same sensor.

### SDF sensor tag mappings

Four basic sensors' _hooks_ are predefined in Robot Importer. These can be summarized as follows:

| _Hook_ name        | Supported SDFormat sensors | Supported SDFormat plugins    | O3DE sensor component       |
| ------------------ | -------------------------- | ----------------------------- | --------------------------- |
| _CameraSensorHook_ | `camera_sensor`            | `libgazebo_ros_camera`        | `ROS2CameraSensorComponent` |
|                    | `depth_camera`             | `libgazebo_ros_depth_camera`  |                             |
|                    | `rgbd_camera`              | `libgazebo_ros_openni_kinect` |                             |
| _GNSSSensorHook_   | `gps`, `navsat`            | `libgazebo_ros_gps_sensor`    | `ROS2GNSSSensor`            |
| _ImuSensorHook_    | `imu`                      | `libgazebo_ros_imu_sensor`    | `ROS2ImuSensorComponent`    |
| _LidarSensorHook_  | `lidar`, `ray`             | `libgazebo_ros_ray_sensor`    | `ROS2LidarSensorComponent`  |
|                    | `gpu_lidar`, `gpu_ray`     | `libgazebo_ros_laser`         | _see information below_     |

GPU implementation of ray/lidar sensors is not included in ROS 2 Gem and requires additional [O3DE RGL Gem](https://github.com/RobotecAI/o3de-rgl-gem). GPU sensors are mapped during the import to run on a CPU if this Gem is not available.

### Extending default mapping

You can extend the default mapping by implementing additional _hooks_ and registering them in the system based on the _SerializeContext_ reflection system. Typically, this consists of three tasks.

First, you need to declare `ROS2::SDFormat::SensorImporterHook` structure that consists of the following:
* set of SDFormat sensors associated with your import scheme
* set of plugin names associated with your import scheme
* set of the supported parameters in the input robot description (used for import verbose only)
* registered callback function that is invoked by Robot Importer when _hook's_ definition matches the input data

The registered callback function creates a number of O3DE components that are necessary to simulate a particular sensor. Additionally, it parses the robot description file to read certain processing parameters and lists the supported sensors and plugins. Your sample implementation for `sdf::SensorType::NAVSAT` that implements `libgazebo_myps_sensor.so` in O3DE can look as follows:

```cpp
ROS2::SDFormat::SensorImporterHook ROS2SensorHooks::MyGNSSSensor()
{
    ROS2::SDFormat::SensorImporterHook importerHook;
    importerHook.m_sensorTypes = AZStd::unordered_set<sdf::SensorType>{ sdf::SensorType::NAVSAT };
    importerHook.m_supportedSensorParams = AZStd::unordered_set<AZStd::string>{ ">update_rate", ">my_parameter" };
    importerHook.m_pluginNames = AZStd::unordered_set<AZStd::string>{ "libgazebo_mygps_sensor.so" };
    importerHook.m_sdfSensorToComponentCallback = [](AZ::Entity& entity, const sdf::Sensor& sdfSensor) 
        -> ROS2::SDFormat::SensorImporterHook::ConvertSensorOutcome
    {
        if (!sdfSensor.NavSatSensor())
        {
            return AZ::Failure(AZStd::string("Failed to read parsed SDFormat data of %s NavSat sensor", sdfSensor.Name().c_str()));
        }
        const float myUpdateRate = sdfSensor.UpdateRate();
        const float myParameter = sdfSensor.Element()->Get<float>("my_parameter", 1.0f).first;
        if (Utils::CreateComponent<MyO3DEEditorComponent>(entity, myUpdateRate, myParameter))
        {
            return AZ::Success();
        }
        else
        {
            return AZ::Failure(AZStd::string("Failed to create NavSat MyO3DEEditorComponent."));
        }
    };

    return importerHook;
}
```

Your second task is to implement your desired simulation behavior in an O3DE component, which would be created by the Robot Importer. Finally, you need to define and register your _hook_ via the _SerializeContext_ reflection system using `SensorImporterHooks` attribute tag. This allows the Robot Importer to find and add your _hook_ to the mapping. The registration can be done in any O3DE editor component and multiple _hooks_ can be registered at once. For simplicity, you might want to add the registration directly to your O3DE component. A sample code implementing the registration scheme can be as follows:
```cpp
void MyO3DEEditorComponent::Reflect(AZ::ReflectContext* context)
{
    if (auto serializeContext = azrtti_cast<AZ::SerializeContext*>(context))
    {
        const ROS2::SDFormat::SensorImporterHook& myImporterHook = CreateMyHook();
        const ROS2::SDFormat::SensorImporterHook& anotherImporterHook = CreateAnotherHook();
        serializeContext->Class<MyO3DEEditorComponent, BaseClassOfMyO3DEEditorComponent>()
                ->Attribute(
                    "SensorImporterHooks",
                    ROS2::SDFormat::SensorImporterHooksStorage{ AZStd::move(myImporterHook), AZStd::move(anotherImporterHook) });
    }
    // more reflection code goes here
}
```

<!--- TODO: add a link to the tutorial with step-by-step hook implementation -->
