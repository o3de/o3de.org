---
title: "MPS Blog Rough Draft"
date: 2055-03-08
slug: mps-sample 
Author: Darrin McPherson
blog_img: "/images/blog/mps-sample/image01.png"
full_img: "/images/blog/mps-sample/image01.png"
---

We are happy to announce the release of the O3DE Multiplayer Sample Game (MPS). The MPS is a fully open source mini game where players battle one another for dominance in a multi-tiered, under-construction, Starbase. This new sample game is intended to serve as an example for the O3DE community to use in the creation of other games as well as to demonstrate a number of features in O3DE, including networking, material canvas, asset creation best practices, and the setup of visual effects setup using the [PopcornFX gem](https://github.com/PopcornFX/O3DEPopcornFXPlugin), and audio effects using the [WWise gem](https://github.com/o3de/o3de/tree/development/Gems/AudioEngineWwise). 

The design intent of the MPS was to create something that would be fun to play, feature exciting exploration that rewarded player mastery, have clear risk vs. reward elements, and feature both player vs. environment, and player vs. player gameplay. We also wanted it to be highly configurable and expandable so that the O3DE community continue to iterate and add to it. From a technical angle, we also wanted a multi-faceted game that would provide a platform to test against when adding new systems to O3DE.

It is best to think of the MPS as a starting point and a toolbox of new features. We encourage you to get creative in how you expand it, adjust it or use its various features to create wholly different games. We look forward to seeing what you make of it!

## Partners & License Terms of Use

This sample was created through a partnership between AWS Gametech, Adobe, KitBash3D and the O3DF. 

* The use of the Y-bot character model as well as the animations contained in character_mps gem are subject to the license terms found [here](https://github.com/o3de/o3de-multiplayersample-assets/tree/main/Gems/character_mps/Assets/Mixamo)
* The use of Kitbash3D High Tech Streets Kit are subject to the license terms found [here](https://github.com/o3de/o3de-multiplayersample-assets/tree/main/Gems/kb3d_mps)

## Installing and Running the O3DE Multiplayer Sample Game

In order to setup and build the MPS you will need to get follow the setup instructions for these two repositories:

1. [Multiplayer Sample Assets](https://github.com/o3de/o3de-multiplayersample-assets#readme)
2. [Multiplater Sample Assets Development](https://github.com/o3de/o3de-multiplayersample/blob/development/README.md)



## Multiplayer Sample Game Design

{{< image-width src="/images/blog/mps-sample/image02.png" width="100%" alt="MPS Game Design." >}} The MPS is a combination of player vs. player and collection gameplay. You and other players compete to earn as many points as you can before the match ends. Points are earned by picking up the gems that spawn around the level. Additionally, you and the rest of the players have an energy shield that protects you. When you shoot other players and when they shoot you, your shield is damaged. Once your shields are depleted, you will respawn, but at the cost of some of your accumulated points.

### Gems & Rounds

{{< image-width src="/images/blog/mps-sample/image03.png" width="100%" alt="MPS Game Design.Gems & Rounds." >}} around the arena are floating gems of various colors. Picking these gems up, by walking through them, will award you points. The amount of points earned depends on the color of the gem. There are 5 gem types: Yellow (1 Point), Blue (3 Points), Green (7 points), Red (10 points), White (20 Points). These values are tunable from within the match controller component. Some of the more valuable gems can be found in hard-to-reach areas or areas where it is easy to fall out of the level, or both! We encourage you to explore the level and find all of the gems.

Each match is comprised of multiple rounds that last 2 minutes each (defaults to 3). The number and duration of rounds is easily configurable in the match controller component. Gems respawn between rounds and each round can spawn different types of gems. By default, the per round gem spawn tables look like this:
 
<table class="center"><style>
table {
    width: 400px;
    border: 1px solid #CCC;
}
td {
    border: 1px solid #CCC;
}
.small {
    width: 1px;
}
.big {
    width: 50%;
}
td > div {
    white-space: nowrap;
}
.center {
  margin-left: auto;
  margin-right: auto;
}
</style>
  <tr>
    <th><center> Round 1 </th>
    <th><center> Round 2 </th>
    <th><center> Round 3 </th>
  </tr>
  <tr>
    <td><center> Yellow</td>
    <td><center> Blue</td>
    <td><center> Green</td>
  </tr>
  <tr>
    <td><center> Blue</td>
    <td><center> Green</td>
    <td><center> Red</td>
  </tr>
  <tr>
    <td><center> Green</td>
    <td><center> Red</td>
    <td><center> White</td>
  </tr>
</table> 

### PvE and Additional Content for the MPS

The original concept of the MPS included traps that the player needed to avoid, as well as other gameplay enhancing items such as a second weapon, a jump pad and a teleporter platform. Ultimately some of these were not implemented for the initial release. We did, however, create all of the assets needed to add these items to the game. We’ve created GitHub Issues for each of these items and we encourage the O3DE community to make use of these assets to expand the MPS.

* [MPS Expansion: Implement the Bubble Gun](https://github.com/o3de/o3de-multiplayersample/issues/228) 
* [MPS Expansion: Implement the Jump Pad](https://github.com/o3de/o3de-multiplayersample/issues/227)
* [MPS Expansion: Implement the Malfunctioning Shield Generator](https://github.com/o3de/o3de-multiplayersample/issues/226)
* [MPS Expansion: Implement the Energy Collector](https://github.com/o3de/o3de-multiplayersample/issues/225) 
* [MPS Expansion: Implement the Defense Turret](https://github.com/o3de/o3de-multiplayersample/issues/224)



## Multiplayer Sample Configuration

There are a number of new components that are part of the MPS Setup. Within these components you can adjust many aspects of the game, including length of match, respawn penalties, and how and when certain gems spawn.

**Match Controller Component Configuration**

 <div class="row">
  <div class="column">
    <img src="/images/blog/mps-sample/image04.png" alt="entity Outliner" style="width:100%">
  </div>
  <div class="column">
    <img src="/images/blog/mps-sample/image05.png" alt="Network Match" style="width:150%">
  </div>
</div> 

**Network Match**
In this component you will set the length of the match and the point penalty applied to each character that is forced to respawn during the round.

* **Round Duration** - Here you will set the duration of each round. 
* **Total Rounds** - Here you will set the number of rounds. When all rounds are completed, the match ends, so this serves to dictate the length of each match as well.
* **Respawn Penalty Percentage** - This sets the percentage of the player’s accrued points that are lost when they are forced to respawn, either by losing all of their shields or falling out of the level. This number can be set to 0 if desired, eliminating any respawn penalty.

{{< image-width src="/images/blog/mps-sample/image06.png" alt="Gem Spawner." >}}

**Gem Spawner**
In this component you can setup the gem types, gem point values, and set which gems spawn in each round.

* **Gem Spawnables -** Here you will assign a tag, select an asset for the gem, and set the number of points that are awarded when the gem is picked up.
    * **Tag** - Gem Tag is determines the gem type to spawn. Gem tags are used in per round spawn tables as well as individual gem spawn points.
    * **Asset** - Here you will assign the asset to use for the gem.
    * **Score** - Here you will set the point value for each gem.
* **Spawn Tables Per Round** - Here you will use Gem Tags from the gem spawnables table to setup gem spawns for each game round. Starting with round [1] you can set the type of gems that spawn during that round. You can use all gem types, or a subset. Note: Spawn Table [0] is not used.
    * **Gem Tag Type** - Using the Gem Tag this specifies the gem that spawns
    * **Gem Weight** - In the event the the spawn point (see below) calls two or more different Gem Tags, this value will influence which of those gems spawn. 
* **Gem Spawn Tag** - This is used in Gem Spawn Points, see below.

{{< image-width src="/images/blog/mps-sample/image07.png" alt="Gem Spawn Tag" >}}

**Gem Spawn Points**
Gem Spawn Points should be created wherever you want a gem to appear in the level.

* **Transform** - The location the gem will appear in the level.
* **Tag** - Here you will enter the tags that correspond with the gems you want to spawn in this location. Entry [0] should be the Gem Spawn tag (set above in the Gem Spawn Tables Per Round component). Additional entries correspond with the gem(s) type you want to spawn in this location.. You can add more than one gem type here. When this happens, the Gem Weight will influence which gem spawns each time. e.g. If you add yellow and green gems and give each a weight of 1, there will be an even chance of either to spawn. If one is set to greater than 1, that gem is more likely to spawn.
* **Script Canvas & Mesh & Material components** - By default, gem spawn points have no visual indicator in the editor as gems only appear in those positions when the game is running. To allow you to visualize gem spawn points in the editor we add the mesh component and assign the gem model and a material that matches the gem that will appear in game. Then, when the game starts, we hide the placeholder gem models using the script canvas component

## **Setting Up Teleporters**

{{< image-width src="/images/blog/mps-sample/image08.png" alt="Teleporters" >}}

Teleporters are another new feature introduced in the MPS. These can be setup to teleport players any where in the level when they pass through the teleport volume.


<div class="row" >
  <div class="column">
    <img src="/images/blog/mps-sample/image09.png" alt="entity Outliner"><br><br>
    <img src="/images/blog/mps-sample/image091.png" alt="entity Outliner"style="width:100%">
  </div>
  <div class="column">
    <img src="/images/blog/mps-sample/image10.png" alt="Network Match" style="width:100%">
  </div>
</div>

**Add the Teleporter Platform asset to the level**

1. In the asset browser, navigate to \o3de-multiplayersample-assets\Gems\level_art_mps\Assets\Teleporter_Platform
2. Select the Teleporter.prefab and drag it into the level at the location you want it to appear. 

**Add the Teleport Enter Volume**

1. Create a multiplayer entity in the level near the teleport platform and name it. Including the word ‘enter’ in the title is helpful in order to differentiate it from the exit point.
2. Add the network teleport component to the multiplayer entity.
3. Add the PhysX collider component and its dependency, the PhysX static rigid body component to the multiplayer entity.
4. In the PhysX collider component, turn the Trigger option on and then choose the box shape. Set the box dimensions to 0.5, 1, 2. This will fit snuggly into the Teleport Platform doorway. Turn on Draw Collider so you can see the volume.
5. Align the volume with the Teleport Platform doorway.

**Add the Teleport Exit point**

1. Create an entity in the location you want the teleporter to exit and name it. Again, using the work ‘exit’ can be helpful.

**Link the Teleport Enter Volume with the Teleport Exit Point**

1. Select the Teleport Enter Volume.
2. In the Network Teleport Component, hit the target reticle symbol and then select the Teleport Exit Point in the entity outliner.

You should now have a functioning teleporter! This describes the standard teleport setup, but feel free to experiment with the location and size of the teleport volumes. 