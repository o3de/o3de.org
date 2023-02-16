---
title: Identifiers
linktitle: Identifiers
description: Unique strings used to address all of the individual elements of the system.
weight: 203
---

In the Action Manager architecture, Items are addressed via string identifiers.
These are used to refer to actions, menus, toolbars... (etc) so that they are accessible from anywhere, regardless of what system defined them. We use strings for this purpose as they are easier to read, discover and share between different environments (C++, Python) rather than IDs or other obfuscated methods.

Identifiers need to be unique per item type in the architecture, but don’t need to be for different types.
For example, it is possible to register an Action and a Menu with the same identifier string, as the APIs expect a specific identifier type and there is no possible misdirection.
Trying to register two different items of the same type to the same identifier will instead result in a failure.

## Identifier Standard

The system does not enforce a specific structure for the identifier string, so any string can be used. To prevent collisions, though, we define a recommended standard to make these identifiers easier to recognize, readable, and prevent repetitions.

Following the standard, an identifier string should be built as follows:

```
`o3de` . <item type> . <system/Gem> . <category (optional)> . <item name>
```

As an example, the action to restore the default editor layout is registered with the following identifier:

```
o3de.action.layout.restoreDefault
```

where

* `action` is the item type
* `layout` is the editor system
* `restoreDefault` is the item name


Categories can be used to group items that are related, like part of a subsystem or specific mode of the main system or Gem.


## Identifier Headers

To streamline development in the O3DE C++ codebase, some common identifiers are defined as constants in specific headers to easily reference them in multiple files. Nonetheless, there is no requirement for Gems to include a file from the main Editor for the system to work, and just using the same identifier string will work as expected. By the same principle, identifiers can be used from different languages seamlessly (for example, Python).