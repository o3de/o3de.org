# Implementing Node Behavior<a name="script-canvas-custom-nodes-implementing-behavior"></a>

After you have defined the topology for the node, you can focus on implementing the behavior for the node\.

## Adding Slots<a name="script-canvas-custom-nodes-adding-slots"></a>

In addition to using AZ Code Generator to set up the node's topology, it is also possible to manually add execution and/or data slots if preferred\. The following example from the **IsNull** logic node adds a **Reference** input slot for data reference and an **Is Null** output slot\. The output slot returns a Boolean value depending on the evaluation of the data that was input\. The source code is in the location `\dev\Gems\ScriptCanvas\Code\Include\ScriptCanvas\Libraries\Logic\IsNull.cpp`\.

```
void IsNull::OnInit()
{
    AZStd::vector<ContractDescriptor> contracts;
    auto func = []() { return aznew IsReferenceTypeContract(); };
    ContractDescriptor descriptor{ AZStd::move(func) };
    contracts.emplace_back(descriptor); 
    AddInputDatumUntypedSlot("Reference", &contracts);
    AddOutputTypeSlot("Is Null", "", AZStd::move(Data::Type::Boolean()), OutputStorage::Optional);
}
```

When the node is initialized, the added slots appear in the Script Canvas editor\.

![\[Slots added to the Is Null node\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-custom-nodes-3.png)

## Receiving Input Signals<a name="script-canvas-custom-nodes-receiving-input-signals"></a>

Nodes can receive input signals when a node's execution slot is triggered\. To detect which signal has been triggered, implement `OnInputSignal`, as in the following example\.

```
void OnInputSignal(const SlotId&) override; 
```

To get the ID of the input signal, AZ Code Generator provides some convenient helper functions in a namespace that corresponds to the generated node\. These helper functions make it easier to access the node's properties and slot IDs\.

As an example, in the **Delay** node two input slots can be signaled: **In** and **Reset**\.

![\[Delay node In and Reset input slots\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-custom-nodes-4.png)

In the following code, the **Delay** node's **In** and **Reset** slots use the generated helper functions `CountdownProperty::GetInSlotId(this)`; and `CountdownProperty::GetResetSlotId(this)`; to get their IDs\. The source code is from `dev\Gems\ScriptCanvas\Code\Include\ScriptCanvas\Libraries\Time\Countdown.cpp`\.

```
void Countdown::OnInputSignal(const SlotId& slot)
{
    const SlotId& inSlotId = CountdownProperty::GetInSlotId(this);
    const SlotId& resetSlotId = CountdownProperty::GetResetSlotId(this); 
    if (slot == resetSlotId || (slot == inSlotId && !AZ::TickBus::Handler::BusIsConnected()))
    {
        // Disconnect required when resetting
        AZ::TickBus::Handler::BusDisconnect(); 
        m_countdownSeconds = CountdownProperty::GetTime(this);
        m_looping = CountdownProperty::GetLoop(this);
        m_holdTime = CountdownProperty::GetHold(this); 
        m_currentTime = m_countdownSeconds; 
        AZ::TickBus::Handler::BusConnect();
    }
}
```

You can use these IDs to determine what action the node should take\.

## Sending Output Signals<a name="script-canvas-custom-nodes-sending-output-signals"></a>

After the **Delay** node is finished, it uses the `SignalOutput(outSlot)` function to signal the output slot that execution is ready to continue\.

![\[The Delay node Out slot\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-custom-nodes-5.png)

To call the function, you must know the output slot ID to pass\. The following example is from `Duration.cpp`\.

```
const SlotId doneSlot = DurationProperty::GetDoneSlotId(this);
[...]
SignalOutput(doneSlot);
```

**Note**  
If your node is connected to one or more buses during its lifetime, ensure that it disconnects from those buses before it exits\. Otherwise, your node might be handling events that it no longer should\.

## Querying Inbound Data<a name="script-canvas-custom-nodes-querying-inbound-data"></a>

The **Delay** node example has the inbound data slots **Time**, **Loop**, and **Hold**\.

![\[Delay node inbound data slots\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-custom-nodes-6.png)

Script Canvas properties that specify the `ScriptCanvas_Property::Input` attribute can be queried by the node to do necessary processing\. To do this, use the code\-generated convenience helpers `CountdownProperty::Get{PropertyName}(this);`\. The following source code is in `dev\Gems\ScriptCanvas\Code\Include\ScriptCanvas\Libraries\Time\Countdown.cpp`\.

```
m_countdownSeconds = CountdownProperty::GetTime(this);
m_looping = CountdownProperty::GetLoop(this);
m_holdTime = CountdownProperty::GetHold(this);
```

You can often use these properties on the stack; you do not have to assign these properties to member variables\. In the **Delay** node example, member variables are used to cache the values\.

## Sending Outbound Data<a name="script-canvas-custom-nodes-sending-outbound-data"></a>

Many nodes might want to return a value or push forward data as a result of a computation\. In the **Delay** node example, the **Elapsed** slot outputs the elapsed time\.

![\[Delay node Elapsed slot\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-custom-nodes-7.png)

To output the elapsed time, the node gets the ID of the **Elapsed** slot and then pushes a data value into it \(`dev\Gems\ScriptCanvas\Code\Include\ScriptCanvas\Libraries\Time\Countdown.cpp`\)\.

```
const SlotId elapsedSlot = CountdownProperty::GetElapsedSlotId(this); 
Datum o(Data::Type::Number(), Datum::eOriginality::Copy);
o.Set(m_elapsedTime);
if (auto* slot = GetSlot(elapsedSlot))
{
    PushOutput(o, *slot);
}
```

## Serializing "Hidden" Node Properties<a name="script-canvas-custom-nodes-serializing-hidden-properties"></a>

In some cases you might want your node to serialize its properties but not expose them as slots on a node\. In this case, the `Property` and `EditProperty` tags are useful\.

You can use the `Property` tag to serialize any property without exposing it to the node's property grid\. Because it is not exposed, it is not user configurable\.

The `EditProperty` tag both serializes and provides an `EditContext` for the specified property\. This makes the property user configurable through the node's property grid\.