---
description: ' Learn more about the AI Bubbles system in &ALYlong;. '
title: AI Bubbles System
---
# AI Bubbles System<a name="ai-bubbles-system"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

The AI Bubbles system collects AI error messages for level designers to address\. This system streamlines the debugging process by helping to track down which system\(s\) are connected to a problem\. To use the AI Bubbles system, programmers need to push important messages into the system, which will then provide notification to the level designers when a problem is occurring\. 

## Message Display Types<a name="ai-bubbles-system-message-types"></a>

Message include a set of information \(agent name, position, etc\.\) that help the designer to understand that something is wrong in the normal flow\. Message notifications can be displayed in any of the following ways:
+ Speech bubble over the AI agent
+ Error message in the console   
![\[Error message in the console\]](/images/userguide/ai/ai_bubbles_console_error_message.png)
+ Blocking Windows message box 

## Specifying Notification Display Types<a name="ai-bubbles-system-message-define"></a>

Use one of the following ways to specify a display type for error messages:

### Console<a name="ai-bubbles-system-message-define-console"></a>

**ai\_BubblesSystem**  
Enables/disables the AI Bubbles System\.

**ai\_BubblesSystemDecayTime**  
Specifies the number of seconds a speech bubble will remain on screen before the next message can be drawn\.

**ai\_BubblesSystemAlertnessFilter**  
Specifies which notification types to show to the designer:   
+ 0 \- No notification types
+ 1 \- Only logs in the console
+ 2 \- Only bubbles
+ 3 \- Logs and bubbles
+ 4 \- Only blocking popups
+ 5 \- Blocking popups and logs
+ 6 \- Blocking popups and bubbles
+ 7 \- All notifications types

**ai\_BubblesSystemUseDepthTest**  
Specifies whether or not the notification needs to be occluded by the world geometries\.

**ai\_BubblesSystemFontSize**  
Specifies the font size for notifications displayed in the 3D world\.

### C\+\+<a name="ai-bubbles-system-message-define-cpp"></a>

In C\+\+, use the method AIQueueBubbleMessage\(\) to define how to display the message notification\.

**Method signature:**

```
bool AIQueueBubbleMessage(const char* messageName, const IAIObject* pAIObject, const char* message, uint32 flags);
```

**Parameters:**

**messageName**  
String describing the message\. This is needed to queue the same message error more than once\. \(The message can be pushed into the system again when it expires is deleted from the queue\.\)

**pAIObject**  
Pointer to the AI object that is connected to the message\.

**message**  
Text of the message to be displayed\.

**flags**  
Notification type\. This parameter can include one or more flags; multiple flags are separated using a pipe \(\|\)\.   
+ eBNS\_Log
+ eBNS\_Balloon
+ eBNS\_BlockingPopup

**Example:**

```
AIQueueBubbleMessage("COPStick::Execute PATHFINDER_NOPATH non continuous", pPipeUser, "I cannot find a path.", eBNS_Log|eBNS_Balloon);
```

### Lua Script<a name="ai-bubbles-system-message-define-lua"></a>

```
local entityID = System.GetEntityIdByName("Grunt.AlienGrunt1");
                AI.QueueBubbleMessage(entityID,"I cannot find a path.");
```