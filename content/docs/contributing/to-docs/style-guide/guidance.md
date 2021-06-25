---
title: Guidelines for Writing Open 3D Engine Documentation
description: 
linktitle: Guidelines
weight: 100
toc: true
---

The O3DE documentation project serves a global audience. These guidelines will help your writing follow a style that makes it accessible to everyone.

* Use U.S. English for accessibility.
* Whenever possible, use precise words with only one definition, or the primary definition of words from . For example, use "once" only when referring to the number of times that an action is performed. Don't use "once" to mark a point in time, like in "Once the download completes."
* Use standard and common domain and industry terminology. If there's ambiguity, then use context to make sure the reader understands the meaning.

   {{< note >}}
   For O3DE-specific term usage and syntax, and for the current list of words to avoid, read the [O3DE terminology](/docs/contributing/to-docs/terminology) topic.
   {{< /note >}}

* Be consistent in usage of terms.
* When you use acronyms, introduce them in their expanded form followed by the acronym in parentheses. For example: *Open 3D Engine (O3DE)*. Subsequent on-page references can be by acronym only.
* Prefer to use [active voice](https://writing.wisc.edu/handbook/style/ccs_activevoice/), especially for instructions and technical processes. Writing friendly guides and tutorials might necessitate the use of passive voice from time to time to match the guide tone.
* Keep sentences short.
* Use complete sentences.
* Consider whether information can be more clearly represented in a list or a table.
* Keep adjectives and adverbs close to the words they modify.

    Do | Don't
    :--| :-----
    First, select the entity. | Select the entity first.
    ... to quickly build proxy geometry. | ... to build proxy geometry quickly.

* Avoid words that end in *-ing* when possible. Words that end in *-ing* can be verbs, adjectives, or gerunds, and can be ambiguous for ESL readers. If you must use a word that ends in *-ing*,  add a determiner such as *the* before or after the word to clarify whether the word is a verb or an adjective. Take the word "rendering", for example. "Rendering" can be used in many contexts and can cause confusion:

    Usage | Example
    :--| :--
    Noun | ... view the rendering.
    Verb | ... rendering the scene.
    Adjective | ... the rendering path.

* Watch for words that end in *-ed*. Words that end in *-ed* can also be ambiguous. Use determiner phrases such as *that is* to clarify the usage of words that end in *-ed*. Take the word "rendered", for example.

    Do | Don't
    :--| :--
    Atom is a renderer that is based on ... | Atom is a renderer based on ...

* Don't use idioms, slang, colloquialisms, or jargon. There are many words and phrases commonly used and understood by native speakers of U.S. English that may be difficult to translate. Here are some examples.

    Type | Definition | Example
    :--| :-- | :--
    Idiom | A phrase established to have a meaning that is not discernible from the individual words. | Forward+ rendering provides *the best of both worlds*.
    Slang | Informal and nonstandard vocabulary. | *Chill* for a bit, while the O3DE project compiles.
    Colloquialism | Ordinary and familiar conversational words and phrases, especially those that might be specific to a region. | ... On Create will execute the function *ASAP*.
    Jargon | Specialized terms used in a particular field that are difficult for others to understand. | ... entering the *vertical-slice* phase of development.

* Use optional words and phrases to clarify, such as *the*, *that*, *a*, *an*, *because*, *after*, *although*, and *might*.
* Use commas to make sentences easier to read and comprehend. Use the serial or "Oxford" comma in lists. For example:

    "**Asset Processor** checks for new files, detects changed files, and uses asset manifest files to process game-ready assets."

* Avoid Latin phrases such as *etc.*, *vs.*, *i.e.*, and *e.g.*.
