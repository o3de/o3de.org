# Using Smart Objects for AI Navigation<a name="ai-nav-off-mesh-smart-objects"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

Smart Objects are an advanced type of AI Control Object that are used to interact with other objects using rules\. Smart Objects can be used for AI movements that would otherwise be impossible to navigate within a mesh\. Smart Objects can be used to have AI Agents duck, jump, rappel and kick down doors\.

As an example, a Smart Object could be used for an agent running alongside the top wall of a building \(first mesh\) and then leaping onto a lamp post below \(second mesh\)\.

For an AI agent to be able to use a Smart Object, its AgentType definition should list one or more SmartObjectUserClasses\.

When using a Smart Object, make sure its flow graph entrance \(**AI:SmartObjectHelper** Start\) and exit \(**AI:SmartObjectHelper** End\) helper points are within the two connected navigation meshes\. They then automatically connect two meshes together when positioned correctly\.

**To set AI agent movement using Smart Objects**

1. In the Rollup Bar, click **AI, SmartObject**\.

1. Under **SmartObject Properties**, for **SmartObjectClass**, click the \(**\.\.\.**\) icon\.

1. In Smart Object Classes, select your asset, and then select the desired movements