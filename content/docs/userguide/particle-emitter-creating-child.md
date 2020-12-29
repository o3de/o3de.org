# Creating Child Emitters<a name="particle-emitter-creating-child"></a>

To create a child emitter, you first set the parent effect and then attach the child emitter to the parent particles\. You can attach multiple child emitters to the parent particle\. A particle effect can have any number of child effects \(also called subeffects\), which you can nest in a library by dragging and dropping where needed\.

**To create child emitters**

1. In Lumberyard Editor, choose **Tools**, **Particle Editor**\.

1. In the **Libraries** panel, right\-click the emitter for which you want to create a child emitter\. Choose **Add New**, **Add Particle**\.

1. Enter a name for the child emitter and then press **Enter**\.

**To assign an existing emitter to be a child**
+ Drag the emitter on top of another emitter\. The selected emitter is nested underneath as a child\. 

**To remove a child emitter from a parent**
+ Drag the child emitter to the preferred location\. Alternatively, you can drag the child emitter to the library name to detach it from its parent and make it appear at the bottom of the emitter stack\.

Lumberyard has two types of child effects:
+ **Regular child effects** – These effects behave like separate effects, though they are spawned with and attached to their parent effect\. Each child effect has its own independent parameters and lifetime, allowing for an overall effect that consists of several parts\.
+ **Second\-generation child effects** – These effects are attached to individual particles of the parent effect\. A separate emitter is spawned for each particle of the parent effect, and those emitters move with their parent particles\. This allows you to create more complex effects\. You can nest second\-generation effects multiple times in order to create third\-generation \(and greater\) effects\.

An example of a child effect is attaching an emitter to a parent particle and leaving trailing particles behind\. You can achieve this effect using the **Spawn Indirection** attribute\.