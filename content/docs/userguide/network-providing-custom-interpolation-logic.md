# Providing Your Own Interpolation Logic for the Transform Component<a name="network-providing-custom-interpolation-logic"></a>

You can add your own interpolation logic for the Transform component by using a common framework available in C\+\+\. This topic shows you how to use C\+\+, serialization, and the Lumberyard Editor UI to write your own interpolation mode\.

**Topics**
+ [Adding Your Interpolation Mode to the Lumberyard Editor UI](#network-providing-custom-interpolation-logic-lumberyard-editor-ui)
+ [Implementing Interpolation Logic in C\+\+](#network-providing-custom-interpolation-logic-implementing-in-c)
+ [Rotation Interpolation](#network-providing-custom-interpolation-logic-rotation)

## Adding Your Interpolation Mode to the Lumberyard Editor UI<a name="network-providing-custom-interpolation-logic-lumberyard-editor-ui"></a>

You can start from the user interface in the editor for the Transform component — specifically, with the interpolation options\. The following image shows the Transform component's **None** or **Linear** interpolation options in the Entity Inspector\.

![\[Position interpolation options for the Transform component\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-providing-custom-interpolation-logic-1.png)

Seeing how these options are implemented in the code can help you understand the changes that are required to add your own options\.

The **None** and **Linear** interpolation options in the Entity Inspector come from the serialization of `AzToolsFramework:: TransformComponent:: Reflect`, which is the editor variation of `TransformComponent`\.

The following related source code can be found in the file `dev\Code\Framework\AzToolsFramework\AzToolsFramework\ToolsComponents\TransformComponent.cpp`\.

```
    namespace AzToolsFramework
    {
        void TransformComponent::Reflect(AZ::ReflectContext* context)
        {
            // Reflect data for script, serialization, editing.
            if (AZ::SerializeContext* serializeContext = azrtti_cast<AZ::SerializeContext*>(context))
            {
...
                if (AZ::EditContext* ptrEdit = serializeContext->GetEditContext())
                {
                    ptrEdit->Class<TransformComponent>("Transform", "Controls the placement of the entity in the world in 3d")->
...
                    ClassElement(AZ::Edit::ClassElements::Group, "Network Sync")->
                        Attribute(AZ::Edit::Attributes::AutoExpand, true)->
 
                        DataElement(AZ::Edit::UIHandlers::Default, &TransformComponent::m_netSyncEnabled, "Sync to replicas", "Sync to network replicas.")->
                        DataElement(AZ::Edit::UIHandlers::ComboBox, &TransformComponent::m_interpolatePosition,
                            "Position Interpolation", "Enable local interpolation of position.")->
                        EnumAttribute(AzFramework::InterpolationMode::NoInterpolation, "None")->
                        EnumAttribute(AzFramework::InterpolationMode::LinearInterpolation, "Linear")->
 
                        DataElement(AZ::Edit::UIHandlers::ComboBox, &TransformComponent::m_interpolateRotation,
                            "Rotation Interpolation", "Enable local interpolation of rotation.")->
                        EnumAttribute(AzFramework::InterpolationMode::NoInterpolation, "None")->
                        EnumAttribute(AzFramework::InterpolationMode::LinearInterpolation, "Linear");
 
...
                }
            }
...
        }
    }
```

A line of code like the following adds these options to Lumberyard Editor\. It contains an enum value and a string name for the value that appears in the editor\. The reflection code for the position and rotation options is similar\.

```
EnumAttribute(AzFramework::InterpolationMode::NoInterpolation,"None")->
```

`AzFramework:: InterpolationMode:: NoInterpolation` is an enum value from the `AzFramework` namespace\. You can find the related source code in the file `dev\Code\Framework\AzFramework\AzFramework\Math\InterpolationSample.h`\.

```
namespace AzFramework
{
    /**
    * Behavior types for smoothing of transform between network updates.
    */
    enum class InterpolationMode : AZ::u32
    {
        NoInterpolation,
        LinearInterpolation,
    };
}
```

Following this example, you can add your own enum value\. The following example calls it `MyInterpolation`\.

```
namespace AzFramework
{
    /**
    * Behavior types for smoothing of transform between network updates.
    */
    enum class InterpolationMode : AZ::u32
    {
        NoInterpolation,
        LinearInterpolation,
        MyInterpolation,          // <--- NEW CONTENT
    };
}
```

Next, update `AzToolsFramework:: TransformComponent ::Reflect` as in the following example\.

```
 namespace AzToolsFramework
    {
        void TransformComponent::Reflect(AZ::ReflectContext* context)
        {
            // Reflect data for script, serialization, editing.
            if (AZ::SerializeContext* serializeContext = azrtti_cast<AZ::SerializeContext*>(context))
            {
...
 
                        DataElement(AZ::Edit::UIHandlers::ComboBox, &TransformComponent::m_interpolatePosition,
                            "Position Interpolation", "Enable local interpolation of position.")->
                        EnumAttribute(AzFramework::InterpolationMode::NoInterpolation, "None")->
                        EnumAttribute(AzFramework::InterpolationMode::LinearInterpolation, "Linear")->
                        EnumAttribute(AzFramework::InterpolationMode::MyInterpolation, "My Mode")->           // <--- NEW CONTENT
 
...
                }
            }
        }
    }
```

## Implementing Interpolation Logic in C\+\+<a name="network-providing-custom-interpolation-logic-implementing-in-c"></a>

Now that Lumberyard Editor has your new option, you can implement it in your code\.

The `AzToolsFramework:: TransformComponent` is simply a component that the editor uses to create the game component counterpart `AzFramework:: TransformComponent`\. Examine the following source code for the `TransformComponent` class\. The code shows where the interpolation samples are kept and the interpolated value is calculated\. The code is in the file `dev\Code\Framework\AzFramework\AzFramework\Components\TransformComponent.h`\.

```
namespace AzFramework
{
    class TransformComponent
        : public AZ::Component
        , public AZ::TransformBus::Handler
        , public AZ::TransformNotificationBus::Handler
        , public AZ::EntityBus::Handler
        , public AZ::TickBus::Handler
        , private AZ::TransformHierarchyInformationBus::Handler
        , public NetBindable
    {
...
 
    private:
 
...
        void CreateTranslationSample();
        void CreateRotationSample();
 
        AZStd::unique_ptr<Sample<AZ::Vector3>>    m_netTargetTranslation; // <--- Sample<> is the base templated class for all interpolation logic.
        AZStd::unique_ptr<Sample<AZ::Quaternion>> m_netTargetRotation;
        AZ::Vector3 m_netTargetScale;
...
    };
}   // namespace AZ
```

`Sample<>` is the base abstract class for all interpolation logic\. Notice that it's abstracted away to support either vectors for position or quaternions for rotation\. The following code shows the source for the `Sample` class in the file `dev\Code\Framework\AzFramework\AzFramework\Math\InterpolationSample.h`\.

```
namespace AzFramework
{
    template<typename Value>
    class Sample
    {
    public:
        virtual ~Sample() = default;
        using TimeType = unsigned int;
 
        Sample()
            : m_targetValue()
            , m_targetTimestamp(0)
            , m_previousValue()
            , m_previousTimestamp(0)
        {
        }
 
        void SetNewTarget(Value newValue, TimeType timestamp)     // <---- Network stack provides you these values every time it gets them.
        {
            m_targetValue = newValue;
            m_targetTimestamp = timestamp;
        }
 
        virtual Value GetInterpolatedValue(TimeType time) = 0;    // <---- Provide your own interpolation logic here.
 
        Value GetTargetValue() const
        {
            return m_targetValue;
        }
 
        TimeType GetTargetTimestamp() const
        {
            return m_targetTimestamp;
        }
 
    protected:
        void SetPreviousValue(Value previousValue, TimeType previousTimestamp)
        {
            m_previousValue = previousValue;
            m_previousTimestamp = previousTimestamp;
        }
 
        Value m_targetValue;
        TimeType m_targetTimestamp;
 
        Value m_previousValue;
        TimeType m_previousTimestamp;
    };
}
```

The simplest implementation is no interpolation at all, for which the code is already written\. You can find it in the same file: `dev\Code\Framework\AzFramework\AzFramework\Math\InterpolationSample.h`\.

```
template<typename T>
class UninterpolatedSample;
 
template<>
class UninterpolatedSample<AZ::Vector3> final
    : public Sample<AZ::Vector3>
{
public:
    AZ::Vector3 GetInterpolatedValue(TimeType /*time*/) override final
    {
        return GetTargetValue();
    }
};
```

The following code shows an implementation of linear interpolation that is included with Lumberyard \(`dev\Code\Framework\AzFramework\AzFramework\Math\InterpolationSample.h`\)\.

```
namespace AzFramework
{
    template<typename T>
    class LinearlyInterpolatedSample;
 
    template<>
    class LinearlyInterpolatedSample<AZ::Vector3> final
        : public Sample<AZ::Vector3>
    {
    public:
        AZ::Vector3 GetInterpolatedValue(TimeType time) override final
        {
            AZ::Vector3 interpolatedValue = m_previousValue;
            if (m_targetTimestamp != 0)
            {
                if (m_targetTimestamp <= m_previousTimestamp || m_targetTimestamp <= time)
                {
                    interpolatedValue = m_targetValue;
                }
                else if (time > m_previousTimestamp)
                {
                    float t = float(time - m_previousTimestamp) / float(m_targetTimestamp - m_previousTimestamp);
 
                    // lerp translation
                    AZ::Vector3 deltaPos = t * (m_targetValue - m_previousValue);
                    interpolatedValue = m_previousValue + deltaPos;
 
                    AZ_Assert(interpolatedValue.IsFinite(), "interpolatedValue is not finite!");
                }
            }
 
            SetPreviousValue(interpolatedValue, time);
            return interpolatedValue;
        }
    };
}
```

The following example shows a completed implementation called `MyInterpolatedSample` that provides only vector interpolation for position\.

```
namespace AzFramework
{
    template<typename T>
    class MyInterpolatedSample;
 
    template<>
    class MyInterpolatedSample<AZ::Vector3> final
        : public Sample<AZ::Vector3>
    {
        ...
    }
}
```

Finally, you must enable `TransformComponent` to choose your class implementation\. You can do that in the switch case statement in `AzFramework:: TransformComponent:: CreateTranslationSample()`\. The source code is in the file `dev\Code\Framework\AzFramework\AzFramework\Components\TransformComponent.cpp`\.

```
void AzFramework::TransformComponent::CreateTranslationSample()
{
    switch(m_interpolatePosition)
    {
    case InterpolationMode::LinearInterpolation:
        m_netTargetTranslation = AZStd::make_unique<LinearlyInterpolatedSample<AZ::Vector3>>();
        break;
    case InterpolationMode::NoInterpolation:
    default:
        m_netTargetTranslation = AZStd::make_unique<UninterpolatedSample<AZ::Vector3>>();
        break;
    }
}
```

Provide a new case statement for your enum option\. The option creates an instance of your `MyInterpolationSample` class\.

```
void AzFramework::TransformComponent::CreateTranslationSample()
{
    switch(m_interpolatePosition)
    {
    case InterpolationMode::MyInterpolation:                                                // <--- NEW CONTENT
        m_netTargetTranslation = AZStd::make_unique<MyInterpolatedSample<AZ::Vector3>>();   // <--- NEW CONTENT
        break;                                                                              // <--- NEW CONTENT
    case InterpolationMode::LinearInterpolation:
        m_netTargetTranslation = AZStd::make_unique<LinearlyInterpolatedSample<AZ::Vector3>>();
        break;
    case InterpolationMode::NoInterpolation:
    default:
        m_netTargetTranslation = AZStd::make_unique<UninterpolatedSample<AZ::Vector3>>();
        break;
    }
}
```

That's it\! Now you can select your new option in the Entity Inspector, and your custom interpolation logic does the work\.

## Rotation Interpolation<a name="network-providing-custom-interpolation-logic-rotation"></a>

The preceding example shows how to provide your own position interpolation\. Rotation interpolation is similar, but with the following minor differences:
+ You have to provide template implementation of `MyInterpolationSample<Quaternion>`\.
+ You have to write similar code in `AzFramework:: TransformComponent:: CreateRotationSample()` instead of in `::CreateTranslationSample()`\.
+ In the location for the interpolation options, the `AzToolsFramework:: TransformComponent` has a separate definition for rotation interpolation\.