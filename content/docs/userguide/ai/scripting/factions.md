---
description: ' Learn more about AI agents for factions in &ALYlong;. '
slug: ai-scripting-factions
title: Factions
---
# Factions<a name="ai-scripting-factions"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

AI agents use factions to determine their behavior when encountering other AI agents\. There are a base set of behaviors such as neutral, friendly and hostile\. For example, when an AI in the "Grunt" faction encounters an AI in the "Players" faction, the encounter will be hostile\. Players encountering "Civilians" will be friendly, etc\.

To set up faction communications: 
+ Create an XML file that defines all the factions in your game and their reactions to each other \(see the example\)\. This file should be placed in `\Games\Scripts\AI\`\. The SDK includes a template faction XML file, called `Factions.xml`\. 
+ Set the Faction property for all of your AI agents to one of the defined factions\. 

Example: Faction setup

```
Factions.xml

<Factions>
    <Faction name="Players">
        <Reaction faction="Grunts" reaction="hostile" />
        <Reaction faction="Civilians" reaction="friendly" />
        <Reaction faction="Assassins" reaction="hostile" />
    </Faction>
    <Faction name="Grunts">
        <Reaction faction="Players" reaction="hostile" />
        <Reaction faction="Civilians" reaction="neutral" />
        <Reaction faction="Assassins" reaction="hostile" />
    </Faction>
    <Faction name="Assassins">
        <Reaction faction="Players" reaction="hostile" />
        <Reaction faction="Civilians" reaction="hostile" />
        <Reaction faction="Grunts" reaction="hostile" />
    </Faction>
    <Faction name="HostileOnlyWithPlayers" default="neutral">
        <Reaction faction="Players" reaction="hostile" />
    </Faction>
    <Faction name="Civilians" default="neutral" />
    <Faction name="WildLife" default="neutral" />
</Factions>
```