# Node Contracts<a name="script-canvas-custom-nodes-node-contracts"></a>

Script Canvas uses contracts to validate which node's slots are permitted to connect to other slots\. These contracts have validation rules that prevent runtime connections between invalid configurations\. The Script Canvas editor uses these contracts to prevent users from creating invalid operations\.

Script Canvas has a built\-in set of contracts that are used to validate nodes that are reflected to the behavior context\. If you create a custom node, you can choose to create or specify contracts directly on slots\.

The **Delay** node has the following example of a contract on a custom node:

```
ScriptCanvas_In(ScriptCanvas_In::Name("In", "When signalled, execution is delayed at this node in accordance with the specified properties.")
                ScriptCanvas_In::Contracts({ DisallowReentrantExecutionContract }));
```

In this case, the `DisallowReentrantExecutionContract` is specified for the **In** slot\. This means that the node does not permit its **Out** slot to connect directly back into its **In** slot\.

Slots can have \(and often do have\) multiple contracts\.