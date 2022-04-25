---
description:  Learn how to create and reflect components in C++ using the O3DE Component Entity System. 
linktitle: Overview
title: Overview of Open 3D Engine Entities and Components
weight: 100
---

Open 3D Engine is a an *entity-component system (ECS)* engine, meaning that rather than using a polymorphism system where objects derive from one another ("is-a" relationships), it uses composition ("has-a" relationships). A common example from polymorphism is "a car *is a* vehicle", where in a system based on composition you would say "a car *has the components of a vehicle*." Using this method makes it much easier to extend objects, design for reuse, and keep base implementations as flexible as possible for performance and ease of use. Developers add functionality to O3DE by creating new components, or composing existing components together and adding functionality through scripting or C++.

In addition to components which reside on entities, O3DE has *system components* which are long-lived singletons that manage entire systems. Long-lived components or those with singleton behavior can be registered with the engine rather than an individual entity.
