---
title: Writing Guidelines for O3DE Documentation
description: The language, writing, and copy standards used to edit all Open 3D Engine (O3DE) documentation for consistency and readability.
linktitle: Writing
weight: 200
toc: true
---

The **Open 3D Engine (O3DE)** documentation project serves a global audience. These guidelines help make your writing accessible to everyone.

## Write for accessibility

Documentation is written in U.S. English. Use simple and precise words wherever possible. Write short and complete sentences. Break up information into smaller bodies of text. 

- **Precise words**: Whenever possible, use precise words that have one definition, or use words based on their primary definition. For example, use "once" only when referring to the number of times that an action is performed. Don't use "once" to mark a point in time, like in "Once the download completes."

- **Short and complete sentences**: Break up long sentences with multiple clauses into several short sentences to improve readability. Sentences must have a subject, verb, and object, and punctuation at the end.

- **Adjectives and adverbs**: Keep adjectives and adverbs close to the words they modify.

    | Do | Don't |
    | :--| :----- |
    | First, select the entity. | Select the entity first. |
    | ... to quickly build proxy geometry. | ... to build proxy geometry quickly. |

- **-ing words**: Be cautious with words that end in *-ing*. Words that end in *-ing* can be verbs, adjectives, or gerunds, and can be ambiguous for ESL readers. If you must use a word that ends in *-ing*,  add a determiner such as *the* before or after the word to clarify whether the word is a verb or an adjective. Take the word "rendering", for example. "Rendering" can be used in many contexts and can cause confusion:

    | Usage | Example |
    | :--| :-- |
    | Noun | ... view the rendering. |
    | Verb | ... rendering the scene. |
    | Adjective | ... the rendering path. |

- **-ed words**: Be cautious with words that end in *-ed*. Words that end in *-ed* can also be ambiguous. Use determiner phrases such as *that is* to clarify the usage of words that end in *-ed*. Take the word "based", for example.

    | Do | Don't |
    | :--| :-- |
    | Atom is a renderer *that is* based on ... | Atom is a renderer based on ... |

- **Helpful words**: Use optional words and phrases to clarify, such as *the*, *that*, *a*, *an*, *because*, *after*, *although*, and *might*.

- **Commas**: Use commas to make sentences easier to read and comprehend. Use the serial or "Oxford" comma in lists. In the following example, observe that a comma appears between the last item in the list and the preceding item.

    **Example**: "**Asset Processor** checks for new files, detects changed files, and uses asset manifest files to process game-ready assets."



## Voice and tone

Use [active voice](https://writing.wisc.edu/handbook/style/ccs_activevoice/) and present-tense verbs wherever possible. Write simply, respectfully, and professionally.

Refer to the user as "you". 

Refer to the O3DE software, O3DE community, or O3D Foundation as "we". For example, you might say "We recommend...". 

## Acronyms, abbreviations, and Latin phrases

When you use acronyms, introduce them in their expanded form followed by the acronym in parentheses. Subsequent on-page references can be by acronym only.

Don't abbreviate common words or Latin phrases; use the complete word or a similar one.

**Exceptions**
Acronyms that don't need to be spelled out:
- Common file formats (Examples: JSON, PDF, JPEG, PNG)
- Other common technical terms (Examples: URL, ID)

| Do | Don't |
| :-- | :-- |
| Welcome to Open 3D Engine (O3DE)! | Welcome to O3DE! |
| For example, Example: | e.g., Ex: |
| versus, compared to | vs. |


## Idioms, slang, colloquialisms, or jargon

Don't use idioms, slang, colloquialisms, or jargon. There are many words and phrases commonly used and understood by native speakers of U.S. English that may be difficult to translate.

Similarly, avoid jokes.

| Type | Definition | Avoid |
| :--| :-- | :-- |
| Idiom | A phrase established to have a meaning that is not discernible from the individual words. | Forward+ rendering provides *the best of both worlds*.
| Slang | Informal and nonstandard vocabulary. | *Chill* for a bit, while the O3DE project compiles.
| Colloquialism | Ordinary and familiar conversational words and phrases, especially those that might be specific to a region. | ... On Create will execute the function *ASAP*.
| Jargon | Specialized terms used in a particular field that are difficult for others to understand. | ... entering the *vertical-slice* phase of development.
