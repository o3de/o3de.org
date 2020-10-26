# AI C\+\+ Class Hierarchy<a name="ai-concepts-cpp-classes"></a>

C\+\+ classes for AI objects are structured as follows\.

 ![\[AI objects hierarchy\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/ai/ai-class_hierarchy.png)

**CAIObject**  
Defines basic AI object properties \(entity ID, position, direction, group ID, faction, etc\.\)

**CAIActor**  
Basic perception and navigation, behavior selection, coordination, blackboard, AI territory awareness, AI proxy

**CAIPlayer**  
AI system's representation of an actual game player

**CPuppet**  
Aiming, firing, stances, covers, a full\-fledged AI agent

**CAIVehicle**  
Vehicle\-specific code