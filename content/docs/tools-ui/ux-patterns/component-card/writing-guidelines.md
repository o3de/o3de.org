---
linktitle: Writing Guidelines
title: Writing Guidelines for Component Cards
description: Learn how to write effective UI/UX strings for component cards using the Blue Jay Design System (BJDS) in Open 3D Engine (O3DE)
weight: 200
---

When writing effective UI/UX strings, especially messages, dialogs, and error strings, consider the following advice first:

* Keep strings maximally short. The more words, the more cognitive load on the user.
* Likewise, avoid repeating words.
* Avoid long sentences anywhere, even if there's available space. If a sentence has multiple clauses, especially independent ones, break them into separate sentences. This is easier for the user to process quickly.
* Choose the shortest, simplest, most common words wherever appropriate. (Documentation guidelines suggest an [American 8th grade reading level](https://www.seerinteractive.com/blog/how-to-check-your-contents-reading-level-in-word-for-pc-and-mac/).)
* Use the imperative form. Cognitively, the user wants your instruction to continue their progress.
* Use the active voice. The passive voice sounds like an observation or a suggestion.
* Avoid gendering and gender-specific pronouns. Use "they" if you must refer to a person other than the user, even if you're talking about Alexa!
* Don't be creative. Metaphors, idioms, and analogies don't translate well across different humans. The same is true for many greetings, apologies, or traditionally polite phrasing.
* Use contractions and "friendly" (informal) word syntax!
*  Remove repetitive words. This can reduce situations where titles are too long. Example "Collision" > Continuous "Collision" Detection. The second collision is not needed in the tile as its parent already represents its owned by the collision properties.

Following this advice will save your users precious cognitive load, and will also reduce any future UI string localization time (and thus costs) significantly.


### Grammar 

In line with the guidance above, grammar should be simple and typically imperative in form. _For instructions_, tell the user exactly what to do in as simple a sentence as possible. Favor multiple short sentences rather than compound ones. As a gut check, look at your string – does it have more than one comma? Does it have a semicolon? Parentheses (or other parenthetical notation, like em-dashes)? Rewrite it as multiple short sentences instead. Move verbs to the front where you can.

* Sometimes, the action you indicate will have a predictable result or consequences. Based on available widget real estate and the complexity of the action, you should consider an additional short sentence indicating the result of the action so the user can choose to continue. Example: "Click 'Restart' to close Lumberyard and relaunch it. Your current work will be saved."

There are UI elements where you are not providing instruction, but are instead _communicating results or an observation about the state of the system_. The user wants the key information as soon as possible, so avoid any "set up" to the key message---it should be the first part of the first sentence, with any critical information or suggested actions in subsequent sentences.

* Bad: "Uh oh! You may have forgotten to select the 'Save on Close' checkbox, so if you continue the shutdown, your work will not be automatically saved."
* Good: "Warning: Your work will not be saved if you continue. Select the 'Save on Close' checkbox to automatically save your work before shutdown."

### Units, Metrics, and Math

Most units should be outside of any text entry field, to the left or right as appropriate for that unit or mathematical expression. Users are unreliable and inconsistent in adding them into an entry field. If there are multiple units possible for a field, provide a drop down or other simple selector scoped to the text entry field (or group, if it applies to more than one). If the units or expressions are complex or uncommon in usage, add a tooltip on hover over the field or label.

Units of measurement should be consistently applied throughout the whole product, and can incur localization costs if not applied with consideration for the supported regions. For example, switching from "meters" to "inches" for similar operations, or within the same widget group could be very frustrating for a user. If there is available real estate, spell out the full name of the metric; save abbreviations for where there are clear limitations on available card or group space. Note that many metric abbreviations are overloaded (for example, "M" is used for both "meter" and "million" in English), so make sure the context is very clear to the user.



### Gut check!

Empathy is a creative's strength. When developing an error message, pause, and think: "If I found myself in this situation while using the product, what exactly would I want the UI to tell me, if it were a person? How would I want it phrased or indicated, if I wanted to keep my pace and progress?" You'll find that your initial phrasing is more on point than if you attempted to simply describe it from your own technical point of view.

### Forbidden words

*Forbidden words* are words that may have negative connotations in the current world climate. These words may cause the customer to have a negative reaction. All of them have alternatives, so avoid using them in favor of the approved neutral alternative. When in doubt, ask a developer or writer for a better technical term. Likewise, API reviews often miss this consideration, so if an API name, parameter, or enumeration contains these words, request the developer to change it.


|Forbidden Word	|Use this instead	|
|---	|---	|
|Blacklist/Whitelist	|Deny list/Allow list **or** Exclude list/Include list	|
|---	|---	|
|Master/Slave	| The choice of an alternative depends on the technical context. Some alternatives to consider are: <ol><li> Client/Agent or Controller/Agent </li> <li>Primary/Secondary or Primary/Ancillary <li>Supervisor/Worker </li></ol>|

For a complete list of forbidden words and their approved alternatives, read [Terms to avoid and their alternatives](/docs/contributing/to-docs/terminology#terms-to-avoid-and-their-alternatives) in the O3DE Contributing guide.