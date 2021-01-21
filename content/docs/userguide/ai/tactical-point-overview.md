---
description: ' Learn about the tactical point system (TPS) in &ALYlong;. '
title: Tactical Point System Overview
---
# Tactical Point System Overview {#ai-tactical-point-overview}


****

|  |
| --- |
| This topic references tools and features that are [legacy](/docs/userguide/ly-glos-chap#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](/docs/userguide/gems/cryentity-removal-gem) using the [Project Configurator](/docs/userguide/configurator/intro) or the [command line](/docs/userguide/lmbr-exe)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. |

Key features of the Tactical Point system \(TPS\) include:
+ Use of a structured query language
  + Powerful and quick to change in C\+\+ and Lua
+ Query support for a variety of point characteristics, beyond conventional hiding places behind objects:
  + Points near entity positions
  + Points along terrain features
  + Points suggested by designers
  + Arbitrary resolutions of nearby points in the open or on terrain
+ Query combinations, such as:
  + "Find a point somewhere behind me AND to my left, AND not soft cover, AND not including my current spot"
  + "Find a point hidden from my attention target AND visible to the companion"
+ Preferential weighting, such as:
  + Find a point nearest to \(or furthest from\) a specified entity
  + Balance between points near an entity and far from the player
  + Prefer points in solid cover over soft cover
+ Query fallback options, such as:
  + Prioritize good cover nearby; if none exists, go backwards to any soft cover
+ Query visualization:
  + See which points are acceptable and which are rejected, as well as their relative scores
  + See how many expensive tests are being used by a query and on which points
+ Automatic query optimization
  + Understands the relative expense of individual evaluations comprising queries
  + Dynamically sorts points based on potential fitness, according to weighting criteria
  + Evaluates the "fittest" points first, in order to minimize the use of expensive tests
  + Recognizes when the relative fitness of a point indicates that it can't be beat, in order to further reduce evaluations
  + Provides framework for further optimization specific to architecture, level, or locale

In addition to these key feature benefits, this framework offers these advantages from a coding perspective:
+ Separates query from action
  + Arbitrary queries can be made at any time without changing the agent's state
+ Query language is easy to expand
+ Easily adapted for time\-slicing \(and in principle multi\-threading\):
  + Progression through query is fine\-grained
  + Progress is tracked as state, so it can be easily paused and resumed
+ Provides mechanism for delaying expensive validity tests on generated points until needed