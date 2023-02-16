---
title: Registration
linktitle: Registration
description: Best practices and specifics on the Action Manager registration API calls.
weight: 202
---

The Action Manager architecture requires items to be registered before they can be used. This measure allows the system to provide error messages if an API is called with unknown identifiers, especially if due to a typo.
A second limitation, although it’s not enforced as much, is to register all items at Editor startup. Since the system has been designed for extensibility and customization, registering all elements at a defined time makes them available for use from other system while still enforcing a strict ownership.

To simplify the registration process, the Action Manager architecture provides a set of notification hooks that are triggered on Editor startup. These notifications are split by item type; this allows systems to be certain that an item they require, but is defined elsewhere, has already been registered by the time the hook corresponding to a different item type that has a dependency on it is called. For example, the Action Context registration hook is called first, so by the time the Action registration hook is triggered we can assume all Action Contexts have been registered already and are available.
