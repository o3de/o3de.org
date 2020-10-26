# Creating Custom Nodes in Script Canvas<a name="script-canvas-custom-nodes"></a>

Script Canvas uses the [behavior context](component-entity-system-reflection-behavior-context.md)\. The preferred way to expose functionality in Script Canvas is through behavior context bindings\. Behavior context bindings make functionality available to any scripting solution \(such as Lua\) that also uses the behavior context\. However, if you want to create Script Canvas–specific functionality or customized visual scripting experiences, you can use the Script Canvas custom node API\.

If your gem provides custom Script Canvas nodes, you must specify a dependency on the Script Canvas Gem and configure Waf appropriately to compile the nodes\. Functionality that you reflect through the behavior context requires no dependency on the Script Canvas Gem\.

Custom nodes in Script Canvas take advantage of [Automating boilerplate with AZ Code Generator](az-code-gen-intro.md) and boilerplate code\. This reduces complexity and lets you focus on implementing the behavior of the node\.

The following diagram shows the AZ Code Generator process for Script Canvas\.

![\[AZ Code Generator and Script Canvas\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-custom-nodes-1.png)

In **Step 1**, AZ Code Generator processes `MyNode.h` and looks for code generation tags \(source code location: `dev\Gems\ScriptCanvas\Code\Include\ScriptCanvas\CodeGen\CodeGen.h`\)\. After processing, AZ Code Generator creates a file called `MyNode.generated.h`\.

**Note**  
You must include `MyNode.generated.h` in the `MyNode.h` file so that the preprocessor macro that AZ Code Generator produces is resolved by C\+\+ during Step 3\.

In **Step 2**, AZ Code Generator processes `MyNode.h` again, but this time produces a `.cpp` file\.

**Note**  
You must include `MyNode.generated.cpp` the in `MyNode.cpp` file\. This ensures that the generated code can be compiled and has access to all the same `#include` declarations as those found in `MyNode.cpp`\.

In **Step 3**, AZ Code Generator is finished and the build process continues as normal\. `MyNode.cpp` is compiled and succeeds provided all the generated files are correct\.

**Topics**
+ [Script Canvas Tags for AZ Code Generator](script-canvas-custom-nodes-az-code-generator-tags.md)
+ [Dynamic Data Slots](script-canvas-custom-nodes-dynamic-data.md)
+ [Extendable Nodes](script-canvas-custom-nodes-extendable.md)
+ [Implementing Node Behavior](script-canvas-custom-nodes-implementing-behavior.md)
+ [Creating Custom Script Canvas Nodes in a Gem](script-canvas-custom-nodes-gem.md)
+ [Node Libraries](script-canvas-custom-nodes-node-libraries.md)
+ [Node Contracts](script-canvas-custom-nodes-node-contracts.md)