# Sensory Models<a name="ai-concepts-sensory-models"></a>

## Overview<a name="ai-concepts-sensory-overview"></a>

This topic describes the modelling and principal operation of the sensors implemented in the Lumberyard AI system\. These include the visual sensors, sound sensors, and a general\-purpose signalling mechanism\.

Sensory information is processed during a full update of each enemy \(the actual time that a sensory event was received is asynchronous\)\. These sensors are the only interface the enemy has with the outside world, and provide the data that the enemy will use to assess their situation and select potential targets\. All sensors are completely configurable, and they can be turned on/off at runtime for any individual enemy\.

## Vision<a name="ai-concepts-sensory-vision"></a>

The visual sensory model is the heart of the AI system\. It is an enemy's most important sense\. The model is designed to simulate vision as realistically as possible, while still maintaining a low execution cost, using a combination of compromises and optimizations\. 

During a full update for an individual enemy, the system traverses all potential targets from the enemy’s point of view and runs each one through a visibility determination routine\. All targets that survive this filtering procedure are placed in a visibility list that is maintained until the next full update\. For a target to persist as "visible" it must pass the visibility test in each full update\. Targets that change from visible to not visible during an update are moved to a memory targets list\. If a previously visible target becomes visible again, it is moved from the memory target list back to the visibility list\. Memory targets have an expiration time to simulate the enemy "forgetting" the target; this time interval is determined by several factors, including the threat index of the target and the length of time it was visible\. Visible targets are given the highest priority and will become the current attention target even if there is another target with a higher threat index\. This approach simulates the natural tendency of humans to act based on what they see faster than on what they remember \(or hear\)\.

## Visibility Determination<a name="ai-concepts-sensory-visibility-determination"></a>

The visibility determination routine determines whether a target is considered visible to an enemy\. It is run against each of the enemy's potential targets during a full update\. 

### Identifying Targets<a name="ai-concepts-sensory-visibility-targets"></a>

Visibility determination can be very CPU intensive; to mitigate this cost, only potential targets are evaluated for visibility\. There is a mechanism to register any AI object as an object that should be included in the visibility determination \(including custom objects\)\. This includes objects such as the grenades in Lumberyard, flashlights, etc\. There are also special objects called attributes, which will be discussed in more detail later in this topic\. 

To be considered a potential target, an AI object must be: 
+ currently active
+ of a different species than the enemy \(enemies don't need to keep track of members of their own team\)

In addition, the visibility determination test is performed automatically against the player, even if the player is of the same species as the enemy\. This rule ensures that the player is accurately specified as an object type and is always taken into account when checking visibility\. 

The game developer can also designate certain AI object types for visibility determination\. These custom types are added to a list maintained by the AI system identifying object types to be included in the visibility check\. Objects can be freely added to and removed from this list, even from script\. To include an object in the list, specify an assessment multiplier to the desired object type\. For example, refer to the file `aiconfig.lua`, which can be found in the `/scripts` directory\. For more about assessment multipliers, see the topics on threat assessment\. 

### Checking Visibility<a name="ai-concepts-sensory-visibility-routine"></a>

Each potential target identified is evaluated for visibility using a series of tests\. In situations where the player is facing a single species, no visibility determination is performed between AI enemy objects, only against the player\.Key measures determining visibility include:

#### Sight\-range test<a name="ai-concepts-sensory-visibility-routine-sightrange"></a>

This check is done first, as it is fast and cheap to filter out all AI objects that are outside the enemy's sight range\. This is done by comparing the distance between enemy and target against the enemy's sight range value\.

**enemy sight range**  
Floating point value that determines how far the enemy can see \(in meters\); the value represents the radius of a sphere with the enemy at the center\.

#### Field\-of\-view test<a name="ai-concepts-sensory-visibility-routine-fieldofview"></a>

Objects that are inside the enemy's sight range sphere are then checked for whether they are also inside the enemy's field of view \(FOV\)\. 

**enemy field of view**  
Floating point value that determines the angle of the enemy's visibility cone \(in degrees\); the cone's tip is at the enemy's head and extends outward in the direction the enemy is facing\.

The FOV is the angle that determines how far the enemy can see to the left and to the right of his current forward orientation \(that is, the scope of his peripheral vision\)\. For example, an FOV of 180 degrees means that the enemy can see everything which is 90 degrees or less to the left and 90 degrees or less to the right of the direction in which he is currently facing\. An FOV of 90 degrees means that he can see 45 degrees or less to the left and 45 degrees to the right of his current forward orientation\. The FOV check is performed using a simple dot product between the enemy's orientation vector and the vector created as the difference between the positions of the potential target and the enemy\. The resulting scalar is then compared to the value of the FOV\. Note that by using a conical shape, FOV is not limited to 2D representations\.

#### Physical ray test<a name="ai-concepts-sensory-visibility-routine-raytest"></a>

Objects that survive the two initial checks are very likely to be seen\. The next check is an actual ray trace through the game world, which is an expensive process\. Because the low layer of the AI system performs distributed updates over all frames, it is very seldom that a large number of rays needs to be shot per frame\. Exceptions include scenes with a high number of objects belonging to different species and huge combat scenes, such as those with more than 20 participants per species\.

The visibility physical ray is used to determine whether there are any physical obstacles between the enemy and the target\. It originates from the head bone of the enemy character \(or if the enemy does not have an animated character, it originates from the entity position – which is often on the ground\) and is traced to the head bone of the target \(if it has one, otherwise the entity position is used\)\. If this visibility ray hits anything in its path, then the target is considered not visible\. If the ray reaches the target without hitting any obstacles, then the target has passed this tests and can be added to the visibility list for this update\.

Not all obstacles are the same\. The physical ray test distinguishes between hard cover and soft cover obstacles\. For more information on how cover type affects enemy behavior, see the section on soft cover later in this topic\. 

#### Perception test<a name="ai-concepts-sensory-visibility-routine-perception"></a>

This test is for player AI objects only \(and other AI objects as defined by the game developer\)\. Once the player has passed all the visibility tests for an enemy, this final test determines whether or not the enemy can see the player object\. Each enemy calculates a perception coefficient for the player target, which ultimately describes the likelihood that the enemy can see the target\.

**perception coefficient \(SOM value\)**  
Floating point value \(between 0 and 10\) that defines how close the enemy is to actually seeing the target\.

The perception coefficient is calculated based on a range of factors, including the distance between enemy and target, height of the target, and whether the target is moving\. The value must reach the maximum value \(currently 10\) before it can receive a definite visual stimulus\-\-that is, see the target\. 

For more details on how a perception value is derived, see the section on calculating perception later in this topic\.

## Soft Cover Visibility and Behavior<a name="ai-concepts-sensory-soft-cover"></a>

The physical ray test also evaluates the surface type of obstacles when determining visibility\. The AI system can discriminate between two types of surfaces: soft cover and hard cover\. The primary difference in a physical sense is that game players can pass through soft cover but cannot pass through hard cover\. Players can hide behind soft cover objects but the visibility determination is slightly “skewed” when a target is behind a soft cover object rather than a hard cover object or just in the open\. When determining a target's visibility behind soft cover, the AI system takes into account whether or not the enemy already identified the target as "living" \(not a memory, sound or other type of target\)\. If the enemy does not have a living target, then the soft cover is considered equal to hard cover and normal visibility determination is performed\. This occurs when the enemy is idle\-\-or when the enemy is looking for the source of a sound but has not yet spotted it\. 

However, the behavior is slightly different when the enemy already has a target identified\. During the physical ray test, if only soft cover is detected between the enemy and their target, then the target will remain visible for short length of time\-\-between 3 and 5 seconds\. If the target remains behind soft cover during this time, the enemy will eventually lose the target and place a memory target at the last known position\. However, if the target leaves soft cover within this time, then the timer is reset and normal visibility rules are put into effect\. 

This behavior simulates the following example: when a soldier perceives that the target has run inside a bush, they do not immediately forget about it because they can make out the target’s silhouette even inside the bush\. But following a target like that is difficult over time, and after a while the soldier will lose track of the target\. The same rules apply to covers made of penetrable cover, like wood, but the rationale is a bit different\. If a target runs behind a thin wooden wall, the soldier knows that bullets will still pierce the wall, so for a short time the target's position is still known, and the enemy continues to shoot through it\. This can make for some really intense situations in a Lumberyard game\. 

In order for this process to work in a closed and rational system, all surfaces in the game need to be properly physicalized \(wood, grass, and glass should be soft cover, while rock, concrete, metal should be hard cover\)\. This is consistently done in Lumberyard\. 

## Perception Calculation<a name="ai-concepts-sensory-perception"></a>

Unlike visibility between AI agents, visibility of player objects to enemy AI agents in Lumberyard is not an on/off switch\. This added layer of complexity is designed to allow for variations in game playing style \(such as action versus stealth\)\. Perception allows the player to make a certain number of mistakes and still be able to recover from them\. \(This is one of the reasons why a player AI object is specifically defined even in the lowest layer of the AI system hierarchy\.\) It is not used with other AI objects, where “switch” vision is used \(that is, the target is visible as soon as a ray can be shot to its position\)\. Note that it is possible to declare some AI objects should also trigger use of a perception coefficient\.

An enemy is given a perception coefficient that describes how close the enemy is to actually seeing a particular target\. The initial value of the perception coefficient is 0 and increases or decreases based on a defined set of rules\. If a player target passes all prior visibility tests, the enemy begins applies the perception coefficient\. Once the maximum value has been reached, the player target is visible to the enemy\. This statement contains several corollaries: 
+ Each enemy has a perception coefficient for each player target it is processing\. 
+ Each enemy will receive notification that the player target is visible only after the perception coefficient reaches maximum value\.
+ The perception coefficient of two different enemies are unrelated, even for the same player target\.
+ There is no game\-level perception coefficient \(that is, a value that determines how any enemy perceives a player target\), although this information could be derived by statistics\.

When an enemy starts receiving notification that a player target is passing the visibility determination routine, it begins calculating the perception coefficient\. This is done by evaluating the following factors, all of which impact the rate at which the coefficient increases\. Keep in mind that a player target must still pass all other phases of the visibility determination routine before the perception coefficient is applied\.

**Distance**  
Distance between the enemy and the player target has the highest influence on perception\. The closer the player target is to the enemy, the faster the coefficient rises, while greater distances cause the coefficient to rise slower\. The increase function is a basic quadratic function\. At distances very close to the enemy, the time to reach maximum perception is almost non\-existent and the target is instantly seen\. In contrast, a player target may be able to move more freely along the boundaries of the enemy's sight range, as the perception value rises more slowly\.

**Height from ground**  
This factor takes into account the player target’s distance above the ground\. The rationale for this behavior is that a prone target is much harder to spot than one who is standing upright\. The AI system measures the distance of the target from the ground based on the “eye height” property of an AI object\. This property is set when the AI object is initialized, and can be changed at any time during execution of the game\. If enemies and players are represented in the game by animated characters, the eye height is calculated using the actual height of the character's head bone\. This factor influences the rate of increase in the perception coefficient as follows: if the player target has a height above ground of less than one meter, the increase due to distance is lowered by 50%\.

**Target motion**  
The perception coefficient is affected by whether or not the player target is moving\. Movement attracts attention, while stationary targets are harder to spot\. This factor influences the rate of increase in the perception coefficient as follows: if the player target is standing still, the increase due to other factors is lowered by additional 50%\.

**Artificial modifiers**  
Additional values can define how fast the perception coefficient increases\. Some affect all enemies in the game world, while some affect only particular targets\. An example of a modifier that affects all enemies is the console variable `ai_SOM_SPEED`\. Its default value varies depending on a game's difficulty level, but it provides a constant multiplier that is applied on top of all other calculations, and it applies to all enemies\. In contrast, it is possible to set a custom multiplier for a specified object type that is used only for certain player targets; however, this setting is limited to the lowest level of the AI system and is not available for tweaking\. 

The effect of perception is cumulative while the target is considered visible to the enemy\. A floating point value is calculated based on the factors described above, and each time the enemy fully updated, this value is added to the perception coefficient \(along with an updated visibility determination\)\. So, for example, a player target that is within the enemy's range of sight might remain unperceived by the enemy significantly longer if they are crouching and motionless\.

At the same time, a non\-zero perception coefficient can fall back to zero over time if value is not increased constantly with each full update\. For example, a player target might become visible for a few seconds, raise the coefficient up to 5, and then break visual contact\. In this scenario, the coefficient will drop slowly to zero\. This scenario was implemented to reward players that tactically advance and then pause before continuing; players can wait for the coefficient to drop to zero before continuing to sneak\. 

A statistical overview of the perception coefficients of all enemies for a player is used for the HUD stealth\-o\-meter, showing as a small gauge to the left and right of the radar circle in the HUD\. It represents the highest perception coefficient of the player across all enemies that currently perceive him\. In effect, it shows the perception coefficient of the one enemy that is most likely to see the player\. so, a full stealth\-o\-meter does not mean that all enemies see the player; it means that there is at least one enemy that can\. An empty stealth\-o\-meter means that currently no enemy can see the player\.

## Attribute Objects<a name="ai-concepts-sensory-attributes"></a>

An attribute object is not a full AI object; instead, it is more of a special helper that can be attributed to an existing AI object\. The attribute is a special class of AI object, specifically defined at the lowest level in the AI system\. Every attribute object must have a principal object associated with it\. The principal object can be any type of an object \(including puppet, vehicle, player, etc,\.\) but cannot be an attribute\. 

Attributes can impact visibility determination\. When an enemy determines that it sees an attribute object, the system will switch the attribute with the principal object before adding it into the visibility list of the enemy\. Thus, an enemy who sees an attribute will believe it is seeing the principal object attached to the attribute\. 

Essentially, attributes are a systematic way of connecting certain events to a single target\. For example, a player switches on a flashlight and the beam hits a nearby wall\. The light hitting the wall creates an attribute object associated with the principal object, which is the player\. In this scenario, the player is hidden, but because an enemy sees the attribute object \(the light on the wall\), it will in fact "see" the player\. The rationale is that enemies have enough intelligence to interpolate the origin of the light ray and thus know the player’s position\. 

This feature is also used with regard to rocks, grenades, rockets etc\. It can be extended to add more features to a game; for example, a target might leave footprints on the ground that evaporate over time\. The footprints spawn attribute objects, which enable any enemy who sees them to perceive the location of the target who left them\. Another application might be blood tracks\. 

To ensure that attribute objects are included in the visibility determination, they must have an assessment multiplier set\. Refer to `aiconfig.lua` in the `Scripts\AI` directory to see where the AI system defines the multiplier for attribute objects\.