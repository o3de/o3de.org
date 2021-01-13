---
description: ' See the following example for global and group AI in &ALYlong;. '
title: 'Group and Global AI: Factions'
---
# Group and Global AI: Factions {#ai-concepts-example-group-factions}

**Example: AI formations of different factions**

Place on a map three grunts of the following factions\. Note who is hostile to who\.
+ grunts
+ assassins
+ civilians

For example:

```
<Factions>
    <Faction name = "Players">
        <Reaction faction- "Grunts" reaction="hostile"/>
        <Reaction faction- "Civilians" reaction="friendly"/>
        <Reaction faction- "Assassins" reaction="hostile"/>
    </Faction>
    <Faction name="Civilians" default="neutral"/>
    ...
</Factions>
```

\(see `Game/Scripts/AI/Factions.xml`\)