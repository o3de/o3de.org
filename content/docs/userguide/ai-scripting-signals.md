---
description: ' Send and receive signals between AI agents in &ALYlong;. '
title: Signals
---
# Signals<a name="ai-scripting-signals"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

The Lumberyard AI system includes a fully customizable Signal system that enables AI entities to communicate with each other\. Communication consists of signal events that can be sent by an AI agent to another single agent \(including itself\), or to a group of AI agents currently active in the game\. 

This topic describes how to send and receive signals between AI agents\. 

[Signals Reference](ai-scripting-signals-reference.md)

## Sending Signals<a name="ai-scripting-signals-sending"></a>

Signals are sent from an AI agent's behavior to one or more other AI agents using the method `AI:Signal()`\.

```
AI:Signal(Signal_filter, signal_type, *MySignalName*, sender_entity_id);
```

**Signal\_filter**  
Group of AI agents to receive the signal\. Allowed values include:  
+ 0 – AI agent specified with the entity\_id parameter \(usually but not always the sender itself \)\.
+ SIGNALFILTER\_LASTOP – AI agent's last operation target \(if it has one\)\. 
+ SIGNALFILTER\_TARGET – AI agent's current attention target\. 
+ SIGNALFILTER\_GROUPONLY – All AI agents in the sender's group \(same group id\) within communication range\. 
+ SIGNALFILTER\_SUPERGROUP – All AI agents in the sender's group \(same group id\) within the whole level\. 
+ SIGNALFILTER\_SPECIESONLY – All AI agents of the sender's species within communication range\. 
+ SIGNALFILTER\_SUPERSPECIES – All AI agents of the sender's species within the whole level\. 
+ SIGNALFILTER\_HALFOFGROUP – Half the AI agents in the sender's group, randomly selected\. 
+ SIGNALFILTER\_NEARESTGROUP – Nearest AI agent in the sender's group\. 
+ SIGNALFILTER\_NEARESTINCOMM – Nearest AI agent in the sender's group within communication range\. 
+ SIGNALFILTER\_ANYONEINCOMM – All AI agents within communication range\. 
+ SIGNALID\_READIBILITY – Special signal used to make the recipient perform a readability event \(sound/animation\)\. 

**signal\_type**  
Type of signal, which determines how the recipient will process it\. Allowed values include:  
+ 1 – Recipient processes signal only if it is enabled and not set to "ignorant" \(see `AI:MakePuppetIgnorant`\)\.
+ 0 – The entity receiving the signal will process it if it's not set to ignorant\.
+ \-1 – The entity receiving the signal will process it unconditionally\.

**MySignalName**  
The actual identifier of the signal\. It can be any non\-empty string; for the signal recipient, it must exist a function with the same name either in its current behavior, its default behavior or in the `Scripts/AI/Behaviors/Default.lua` script file in order to react to the received signal\.

**entity\_id**  
The entity id of the signal's recipient\. Usually you may want to put entity\.id \(or self\.id if it's called from the entity and not from its behavior\), to send the signal to the sender itself, but you can also put any other id there to send the signal to another entity\.

## Receiving Signals<a name="ai-scripting-signals-receiving"></a>

The action to be performed once a signal is received is defined in a function like this:

```
MySignalName = function(self, entity, sender)
```

**self**  
The recipient entity's behavior\.

**entity**  
The recipient entity\.

**sender**  
The signal's sender\.

This function is actually a callback which, exactly like the system events, can be defined in the recipient entity's current behavior, the default idle behavior \(if it's not present in current behavior\) or in the `Scripts/AI/Behaviors/Default.lua` script file \(if not present in the default idle behavior\)\.

As for system events, a signal can be used also to make a character change its behavior; if we add a line like the following in a character file:

```
Behaviour1 = {
    OnEnemySeen   = *Behaviour1*,
    OnEnemyMemory = *Behaviour2*,
    &#8230;
    MySignalName  = *MyNewBehaviour*,
}
```

This means that if the character is currently in Behaviour1, and receives the signal MySignalName, after having executed the callback function above it will then switch its behavior to MyNewBehaviour\.

## Signal Example<a name="ai-scripting-signals-example"></a>

A typical example is when a player's enemy spots the player: its OnEnemySeen system event is called, and let's suppose he wants to inform his mates \(The guys with his same group id\)\. In his default idle behavior \(i\.e\., `CoverAttack.lua` if the character is Cover\), we modify its OnEnemySeen event like this: 

```
OnEnemySeen = function( self, entity, fDistance ) 
    -- called when the enemy sees a living enemy 

    AI:Signal(SIGNALFILTER_GROUPONLY, 1, "ENEMY_SPOTTED",entity.id); 
end,
```

Here we have defined a new signal called ENEMY\_SPOTTED\.

The next step is to define the callback function\. Let's assume the other members in the group have the same character, we then add the callback function to the same idle behavior in which we have just modified OnEnemySeen\.

```
ENEMY_SPOTTED = function (self, entity, sender) 
    entity:Readability("FIRST_HOSTILE_CONTACT"); 
    entity:InsertSubpipe(0, "DRAW_GUN"); 
End,
```

This will make the guys \(including the signal sender itself, who has the same behavior\) change their animation and producing some kind of alert sound \(readability\), and then draw their gun\. Notice that by modifying its idle behavior, we create a default callback which will be executed for any behavior the character is in\. Later on, we may want to override this callback in other behaviors\. For example, if we wanted the character to react differently whether it's in idle or attack behavior, we'll add the following callback function in the `CoverAttack.lua` file:

```
ENEMY_SPOTTED = function (self, entity, sender) 
    entity:SelectPipe(0, "cover_pindown"); 
End,
```

Where "cover\_pindown" is a goalpipe that makes the guy hide behind the nearest cover place to the target\.

We can extend this to other characters: if there are group members with different characters \(i\.e\. Scout, Rear etc\) and we want them to react as well, we must add the ENEMY\_SPOTTED callback also to their idle/attack behavior\. Finally, we want the guys to switch their behavior from idle to attack if they see an enemy\. 

We'll then add the following line to the character \(`Scripts/AI/Characters/Personalities/Cover.lua` in the example\):

```
CoverIdle = { 
    &#8230; 
    ENEMY_SPOTTED = *CoverAttack*, 
},
```

## Behavior Inheritance<a name="ai-scripting-signals-inheritance"></a>

If specific signals are to be used in more than one behavior, there is an inheritance mechanism\. Behavior classes can either directly inherit a more general implementation by keyword `Base = [CRYENGINE:ParentBehaviorName]` or indirectly, as a character's Idle behavior as well as the default behavior \(defined in file DEFAULT\.lua\) are considered as fallback behaviors if a signal is not implemented in the current behavior\.