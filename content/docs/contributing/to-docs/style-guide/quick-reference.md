---
linkTitle: Quick Reference
title: "Style Guide: Quick Reference"
description: A condensed reference of the Style Guide for contributors to the Open 3D Engine (O3DE) documentation.  
weight: 150
toc: true
---

Follow the O3DE Docs Style Guide in your documentation. This ensures that the documentation is consistent and helpful to users. 

| **Language** |  |
| --- | --- |
| [Write for accessibility](guidance.md#write-for-accessibility) | Documentation is written in U.S. English. Use simple and precise words, wherever possible. Write short and complete sentences. Break up information into smaller bodies of text. |
| [Voice and tone](guidance.md#voice-and-tone) | Use [active voice](https://writing.wisc.edu/handbook/style/ccs_activevoice/) and present-tense verbs wherever possible. Speak simply, respectfully, and professionally.  <br><br>Refer to the user as "you"; don't use "we". |
| [O3DE terminology](../terminology#o3de-specific-terms) | Use O3DE-specific terms as defined by the O3DE Documentation Terminology and Usage. Update the terminology if you introduce new terms. |
| [Standard domain and industry terminology](../terminology#standard-domain-and-industry-terminology) | Use terminology that is standard in the domain or industry. If there's ambiguity, then write context to make sure the reader understands the meaning. |
| [Terms to avoid](../terminology#terms-to-avoid-and-their-alternatives) | Aim for inclusivity in your choice of words. |
| [Acronyms, abbreviations, and latin phrases](guidance.md#acronyms-abbreviations-and-latin-phrases) | Write acronyms or abbreviations in their expanded form first, followed by the acronym in parentheses. Don't abbreviate common words or Latin phrases; use the complete word or a similar one.  |
| [Idioms, slang, colloquialisms, jokes, or jargon](guidance.md#idioms-slang-colloquialisms-jokes-or-jargon) | Don't use. These words and phrases may be understood by native U.S. English speakers, but are difficult to translate.  |
| **Formatting** |
| [Hugo](../hugo.md) and [Markdown](format.md) | Documentation is written in Markdown (`.md`) files and built by [Hugo](https://gohugo.io/), a static site generator. It's primarily formatted using [Markdown syntax](https://www.markdownguide.org/basic-syntax/), with support for in-line HTML. Additional content formatting includes images, videos, and callout boxes. Callout boxes are implemented through [shortcodes](shortcodes.md). |
| [Metadata](metadata.md) | Documentation must comply with metadata requirements, including *sectiontitle*, *title*, *description*, and *weight*. |
| [Topic headings](format.md#topic-headings) | Don't use H1 (`#`) heading; instead, topic title is defined by `title` in the metadata. Section titles must be an H2 (`##`) heading. Subsection titles follow as H3 (`###`) and H4 (`####`) headings.  |
| [User interface, inputs, and hotkeys](format.md#user-interface-inputs-and-hotkeys) | Bold all instances. |
| [Files, directories, and paths](format.md#files-directories-and-paths) | Use code-style. Provide context on what the path is relative to. When applicable, link to the file in the [o3de repository](https://github.com/o3de/o3de).  |
| [Applications, Tools, Gems, and components](format.md/#applications-tools-gems-and-components) | Bold only the first on-page appearance. Subsequent appearances on the same page remain unformatted.  |
| [Code, commands, and API objects](format.md#code-commands-and-apis) | Use code-style for commands and API objects. Use code blocks for multiple lines of code. For API documentation, you may need to use advanced formatting -- see [[Formatting for API Documentation]]. |
| [Terminology](format.md/#terminology) | Be consistent in the use of terms. Italicize new terms, and follow with definition. Terminology that's unique to O3DE must be included in the Terminology page.  |
| [Trademark terminology](format.md/#trademark) | Properly format trademark titles and terminology according to its use from the source. Provide a link to the source's relevant material. |
| **Additional content** |
| [Images](media.md#adding-images-with-markdown-syntax) | Static images must be `.png` format. Diagrams must be `.svg` format. |
| [Animated images](media.md#animated-images) | Use short videos (of a few seconds) to demonstrate a feature's functionality. Prefer to use `.mp4` files that are less than 512 KB. `.ogg` and `.webm` formats, and up to 1 MB of size are also accepted. `.gif` format is not permitted. |