# Multiplayer Sample Gameplay Architecture<a name="sample-project-multiplayer-enhanced-architecture"></a>

The Multiplayer sample consists of five main entities and an equal number of supporting gameplay systems\. The following overview provides a conceptual introduction to the architecture of the Multiplayer sample\.

## Principal Entities in the Multiplayer Sample<a name="sample-project-multiplayer-enhanced-architecture-entities"></a>

The principal entities in the Multiplayer sample are ships, asteroids, gravity wells, bullets, and collectibles\. These entities also have some common components\.

### Common Components<a name="sample-project-multiplayer-enhanced-architecture-entities-common-components"></a>

The principal entities in the game share the following components:
+ `SimpleSpacePhysicsComponent` – This component enables objects to move around in space and be affected by gravity\.
+ `CollisionSystemComponent` – These components enable objects to interact with each other in the world\.
+ `NetBindingComponent` – Activates the net binding code of other components on an entity and signals the game that the entity should be replicated across the network\.

### Ships<a name="sample-project-multiplayer-enhanced-architecture-entities-ships"></a>

The Multiplayer sample uses a variety of ships that demonstrate how a selectable game state can be synchronized from a client to a session when the player first joins the game\. Different types of ships also provide a variety of game experiences\. Some ships have long range weapons, and others are short range and have no weapons\. The following components are related to ships:
+ `ShipComponent` – Identifies an object as a ship to Lumberyard\. It also takes commands from the player and converts them on the host into the motion required to move the ship\.
+ `ShipGunComponent` – Handles the firing of bullets\.
+ `ActiveModifiersComponent` – Manages the modifiers that affect the ship\.
+ `CollectibleInterpreterComponent` – Enables a layer of interpretation between a collectible and the actual modifier that is granted\. This enables implementations of a collectible according to the ship type\. For example, ships with guns that receive a collectible get a special laser, while weaponless ships get a nonweapons\-related [buff](https://en.wikipedia.org/wiki/Status_effect#Buffs)\.
+ `HealthComponent` – Determines the relative health of the ship as long as it remains operational\.

### Asteroids<a name="sample-project-multiplayer-enhanced-architecture-entities-asteroids"></a>

Asteroids are the most common slice in the Multiplayer sample\. They exist in three sizes \(small, medium, and large\)\. These asteroid types are functionally the same while they exist\. When destroyed, they react differently by spawning varying amounts of asteroids and collectibles\. Blanketing the playfield with these objects allows for optimization techniques to be implemented that create a reasonable visual experience without overusing bandwidth\. The following components are related to asteroids:
+ `AsteroidComponent` – \- Identifies an object as an asteroid to the game engine\.
+ `DeathActionComponent` – Allows for actions to be taken upon the destruction of the object\. In the sample, the `DeathActionComponent` spawns additional asteroids and collectibles\.
+ `DamageComponent` – Determines how much damage the asteroid does when it collides with a ship\.
+ `HealthComponent` – Determines how much damage an asteroid can take before it is destroyed\.

### Gravity Wells<a name="sample-project-multiplayer-enhanced-architecture-entities-gravity-wells"></a>

Gravity wells create action inside the game by causing objects to be destroyed and spawned even in the absence of user interaction\. This prevents the game state from falling into stasis\. The following components are related to gravity wells:
+ `GravityWellComponent` – Identifies an object as a gravity well\.
+ `GravitySourceComponent` – Applies gravity to physical objects and draws them towards the source object\.

### Bullets<a name="sample-project-multiplayer-enhanced-architecture-entities-bullets"></a>

Ships use bullets to damage asteroids and each other\. The use of bullets drives gameplay and generates points\. The following components are related to bullets\.
+ `BulletComponent` – Identifies an object as a bullet\.
+ `DamageComponent` – Determines how much damage a bullet does when it hits a ship or asteroid\.

### Collectibles<a name="sample-project-multiplayer-enhanced-architecture-entities-collectibles"></a>

Collectibles add fun and excitement to the game and provide a way to enable and test dynamic in\-game changes to otherwise static systems\. The sample uses collectibles to test the handling of constantly shifting objects to find the right balance between natural appearance and controllability\. The following component is related to collectibles\.
+ `CollectibleComponent` – Identifies an object as a collectible\.

## Multiplayer Sample Gameplay Systems<a name="sample-project-multiplayer-enhanced-architecture-gameplay-systems"></a>

The gameplay systems in the Multiplayer sample handle the game logic essential to game operations\.

### Game Manager<a name="sample-project-multiplayer-enhanced-architecture-game-manager"></a>

The `GameManagerComponent` handles all of the general game logic, such as controlling game start and end, managing the results screens, and other tasks not performed by individual game modes\. The `GameManagerComponent` functions as a server\-only component\. A component like this would normally be reserved for use in a dedicated server and not be shipped in a player version of the game\. The component synchronizes no data and is not replicated across the network\.

### Score Attack Game Mode<a name="sample-project-multiplayer-enhanced-architecture-score-attack-game-mode"></a>

The `ScoreAttackGameModeComponent` works with the `GameManagerComponent` to provide the rules for play and synchronize data to players for score attack mode\.

### Asteroid Manager<a name="sample-project-multiplayer-enhanced-architecture-asteroid-manager"></a>

The `AsteroidManagerComponent` creates new asteroids and manages asteroid lifespans\. It decides where, how, and how many asteroids are spawned into the game\. Although it is exported with the level, this component synchronizes no data and should not be included in a player version of the game\.

### Collectible Manager<a name="sample-project-multiplayer-enhanced-architecture-collectible-manager"></a>

The `CollectibleManagerComponent` spawns collectibles in response to the destruction of asteroids\. Although it is exported with the level, this component synchronizes no data and should not be included in a player version of the game\.

### Spawn Manager<a name="sample-project-multiplayer-enhanced-architecture-spawn-manager"></a>

The `SpawnManagerComponent` is a wrapper for the **[Spawner](component-spawner.md)** that allows the sample to spawn objects in complex ways without requiring the use of multiple spawner components\. The spawn manager facilitates the automation of variation among spawned entities\. For example, when an asteroid is spawned, a general type can be specified and the specific type randomly selected in the spawn manager from the supported types\. This removes the need to manually specify a type with each spawn request\.

This approach also promotes ease of maintenance because it enables a single object to handle all objects of a single type\. For example, all asteroids are defined in a single place and are identified by a specific tag \(`SmallAsteroid`, `MediumAsteroid`, or `LargeAsteroid`\)\. This limits the number of interactions required among the objects and the amount of information that must be exchanged\.

In the sample, only one object manager \(for example, asteroid or collectible\) is aware of the location of the spawner for an object\. This location is usually on the object itself\.

## Multiplayer Sample Network Architecture<a name="sample-project-multiplayer-enhanced-architecture-network"></a>

The sample uses a server\-authoritative architecture\. In the sample, client\-side input is processed on the player and converted into RPCs that are processed by the server\.

### Player Object<a name="sample-project-multiplayer-enhanced-architecture-network-player-object"></a>

When each client joins the session, it creates an object on the server that represents the player\. The object provides information relevant to player configuration\. The client maintains full control over player configuration, which the server reads from the object\. The player object consists of a `GamePlayerComponent` and a related `GamePlayerChunk`\.
+ `GamePlayerComponent` – The `GamePlayerComponent` represents the player on the server\. The component is owned by the client and replicated to the server\. This component handles local player configuration such as the player's name and the ship to spawn\. The user can change this information during gameplay\. These changes must be reflected to the server\.
+ `GamePlayerChunk` – The [Replica Chunks](network-replicas-chunks.md) that represents player information on the server\. The `GamePlayerChunk` specifies the display name of the player and the ship that the player wants to spawn\.

### Ship Object<a name="sample-project-multiplayer-enhanced-architecture-network-ship-object"></a>

The ship object consists of a `ShipComponent` and a related `ShipComponentReplicaChunk.`
+ `ShipComponent` – Manages the overall ship logic, controls, and ship configurations\.
+ `ShipComponentReplicaChunk` – Contains the RPCs that are invoked on the client and passed to the server\. The server then validates, sanitizes, and applies the results to the game state\.

### See Also<a name="sample-project-multiplayer-enhanced-architecture-network-see-also"></a>

For more information about networking in the Multiplayer sample, see [Multiplayer Sample Network Features](sample-project-multiplayer-enhanced-network-features.md)\.