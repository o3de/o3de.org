---
description: ' Use the &ALYlong; High Quality Shadow component to give an entity its
  own shadow map. '
title: High Quality Shadow
---
# High Quality Shadow<a name="component-high-quality-shadow"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

You can use the **High Quality Shadow** component to give an entity its own shadow map that is a higher resolution than you could achieve with a global shadow map\. This component applies to light from the sun and helps provide crisp, well\-defined shadows\. You can use this on main characters or prominent elements to improve their appearance\. 

This component can impact performance and memory, and should be used sparingly\. As such, it can be useful to dynamically change the **Enabled** setting as performance needs change during the game\. Use the **[Set Enabled](high-quality-shadow-set-enabled.md)** node to enable or disable the **High Quality Shadow** component in the **Script Canvas** editor\. For example, if your main character has a high quality shadow, you can enable it during cutscenes and disable it during gameplay\. 

For more information, see [Shadow Nodes](/docs/userguide/scripting/scriptcanvas/shadow-scripting-nodes.md)\.

## High Quality Shadow Component Properties<a name="component-high-quality-shadow-properties"></a>

The **High Quality Shadow** component has the following properties:

**Enabled**  
Enable the shadow map\.

**Const Bias**  
Avoid the self shadow artifacts\.

**Slope Bias**  
Avoid the self shadow artifacts\.

**Jitter**  
Filter kernel size, which directly affects shadow softness\.

**Bounding Box Scale**  
Set the scale factor for the bounding box of the selected entity\. This is useful if the engine bounding box is too small or too large\.

**Shadow Map Size**  
Set the size of the custom shadow map\. The value automatically rounds to the next power of two\.