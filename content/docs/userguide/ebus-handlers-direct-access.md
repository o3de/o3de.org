# Direct Access to EBus Handlers<a name="ebus-handlers-direct-access"></a>

At run time, EBuses form a communication backbone between a component and other noncomponent subsystems\. In a nontrivial application, EBus activity can consume a substantial amount of CPU and memory usage\. On data\-cache \(D\-Cache\)–sensitive devices such as consoles, the number of data lookups on each EBus call can potentially degrade performance\. To reduce the number of data lookups, you can use a pointer to the EBus handler instead of calling the EBus\.

The result of an EBus interaction is identical to a virtual function call on an EBus handler\. As a result, you can implement this approach by getting a pointer directly to the handler at initialization time\. Later, at run time, you make a direct call to the handler's function\. Because you know in advance whether or not a handler pointer is null, you do not have to initialize a request bus return value every time\.

The code examples in this document compare the two approaches\.

## Using PhysicsComponentRequestBus to Get the Velocity Every Tick<a name="ebus-handlers-direct-access-using-get-velocity"></a>

The following example gets the velocity indirectly by using the physics component EBus\.

```
class PlayerAnimationController : public AZ::Component, private AZ::TickBus::Handler
{
public:
    // AZ::Component
    void Activate() override
    {
        AZ::TickBus::Handler::m_tickOrder = AZ::ComponentTickBus::TICK_PHYSICS + 1; // To be updated after the velocity is determined.
        AZ::TickBus::Handler::BusConnect(); // for OnTick
    }

    void Deactivate() override;
    {
        AZ::TickBus::Handler::BusDisconnect();
    }
private:
    // AZ::TickBus::Handler
    void OnTick(float deltaTime, AZ::ScriptTimePoint time) override
    {
        // Get the velocity indirectly by using the physics component EBus.
        AZ::Vector3 velocity = AZ::Vector3::CreateZero();
        EBUS_EVENT_ID_RESULT(velocity, GetEntityId(), LmbrCentral::PhysicsComponentRequestBus, GetVelocity);

        // Do something with velocity here.
    }
};
```

The following example uses `FindFirstHandler()` to cache the handler and gets the velocity by calling the handler directly\.

```
class PlayerAnimationController : public AZ::Component, private AZ::TickBus::Handler, private AZ::EntityBus::Handler
{
public:
    // AZ::Component
    void Activate() override
    {
        AZ::EntityBus::Handler::BusConnect(GetEntityId()); // For OnEntityActivated/OnEntityDeactivated.
    }

    void Deactivate() override;
    {
        AZ::EntityBus::Handler::BusDisconnect(GetEntityId());
    }
private:
    // AZ::EntityBus::Handler
    void OnEntityActivated(const AZ::EntityId &parentEntityId) override
    {
        // Do this after all the other entity's components have been activated so that the
        // physics component has been already attached to the EBus.
        m_physicsComponentRequests = LmbrCentral::PhysicsComponentRequestBus::FindFirstHandler(GetEntityId());
        AZ::TickBus::Handler::m_tickOrder = AZ::ComponentTickBus::TICK_PHYSICS + 1; // To be updated after the velocity is determined.
        AZ::TickBus::Handler::BusConnect(); // For OnTick.
    }

    void OnEntityDeactivated(const AZ::EntityId &parentEntityId) override
    {
        AZ::TickBus::Handler::BusDisconnect();
        m_physicsComponentRequests = nullptr;
    }

    // AZ::TickBus::Handler
    void OnTick(float deltaTime, AZ::ScriptTimePoint time) override
    {
        // Get the velocity directly from the physics component handler.
        AZ::Vector3 velocity = m_physicsComponentRequests != nullptr ? m_physicsComponentRequests->GetVelocity() : AZ::Vector3::CreateZero();

        // Do something with velocity here.
    }

    LmbrCentral::PhysicsComponentRequests *m_physicsComponentRequests = nullptr;
};
```

## Using TransformBus to Get the WorldTransform's Forward Vector Every Tick<a name="ebus-handlers-direct-access-using-get-worldtransforms-forward-vector"></a>

The following example gets the world transform's forward vector by indirectly by using the transform EBus\.

```
class PlayerAnimationController : public AZ::Component, private AZ::TickBus::Handler
{
public:
    // AZ::Component
    void Activate() override
    {
        AZ::TickBus::Handler::m_tickOrder = AZ::ComponentTickBus::TICK_PHYSICS + 1; // // To be updated after the velocity is determined.
        AZ::TickBus::Handler::BusConnect(); // for OnTick
    }

    void Deactivate() override;
    {
        AZ::TickBus::Handler::BusDisconnect();
    }
private:
    // AZ::TickBus::Handler
    void OnTick(float deltaTime, AZ::ScriptTimePoint time) override
    {
        // Get the forward vector indirectly by using the transform EBus.
        AZ::Transform worldTransform = AZ::Transform::Identity();
        EBUS_EVENT_ID_RESULT(worldTransform, GetEntityId(), AZ::TransformBus, GetWorldTM);
        AZ::Vector3 forward = worldTransform.GetBasisY();

        // Do something with "forward" here.
    }
};
```

The following example caches the handler and calls it directly\. Because every entity has a transform, the entity already has an API operation for accessing the transform\. Using the EBus and the `FindFirstHandler` function is not necessary\.

```
class PlayerAnimationController : public AZ::Component, private AZ::TickBus::Handler, private AZ::EntityBus::Handler
{
public:
    // AZ::Component
    void Activate() override
    {
        AZ::EntityBus::Handler::BusConnect(GetEntityId()); // for OnEntityActivated/OnEntityDeactivated
    }

    void Deactivate() override;
    {
        AZ::EntityBus::Handler::BusDisconnect(GetEntityId());
    }
private:
    // AZ::EntityBus::Handler
    void OnEntityActivated(const AZ::EntityId &parentEntityId) override
    {
        m_worldTransform = &GetEntity()->GetTransform()->GetWorldTM();
        AZ::TickBus::Handler::m_tickOrder = AZ::ComponentTickBus::TICK_PHYSICS + 1; // To be updated after the velocity is determined.
        AZ::TickBus::Handler::BusConnect(); // for OnTick
    }

    void OnEntityDeactivated(const AZ::EntityId &parentEntityId) override
    {
        AZ::TickBus::Handler::BusDisconnect();
        m_worldTransform = nullptr;
    }

    // AZ::TickBus::Handler
    void OnTick(float deltaTime, AZ::ScriptTimePoint time) override
    {
        // Get the forward vector directly from the AZ::Transform.
        AZ::Vector3 forward = m_worldTransform->GetBasisY();

        // Do something with "forward" here.
    }

    const AZ::Transform *m_worldTransform = nullptr;
};
```