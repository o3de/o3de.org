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
| [Write for accessibility](guidance#write-for-accessibility) | Documentation is written in U.S. English. Use simple and precise words wherever possible. Write short and complete sentences. Break up information into smaller bodies of text. |
| [Voice and tone](guidance#voice-and-tone) | Use [active voice](https://writing.wisc.edu/handbook/style/ccs_activevoice/) and present-tense verbs wherever possible. Write simply, respectfully, and professionally.  <br><br>Refer to the user as "you". Refer to the O3DE software, O3DE community, or O3D Foundation as "we". |
| [O3DE terminology](../terminology#o3de-specific-terms) | Use O3DE-specific terms as defined in the terminology page. Update the terminology page if you introduce new terms. |
| [Standard domain and industry terminology](../terminology#standard-domain-and-industry-terminology) | Use terminology that is standard in the domain or industry. If there's ambiguity, include additional context to make sure the reader understands the meaning. |
| [Terms to avoid](../terminology#terms-to-avoid-and-their-alternatives) | Aim for inclusivity in your choice of words. |
| [Acronyms, abbreviations, and Latin phrases](guidance#acronyms-abbreviations-and-latin-phrases) | Write acronyms or abbreviations in their expanded form first, followed by the acronym in parentheses. Don't abbreviate common words or use Latin phrases; use the complete word or a similar one.  |
| [Idioms, slang, colloquialisms, or jargon](guidance#idioms-slang-colloquialisms-or-jargon) | Don't use them. These words and phrases may be understood by native U.S. English speakers, but are difficult to translate.  |
| **Formatting** |
| [Hugo](../hugo) and [Markdown](format) | Documentation is written in Markdown (`.md`) files and built by [Hugo](https://gohugo.io/), a static site generator. It's primarily formatted using [Markdown syntax](https://www.markdownguide.org/basic-syntax/), with support for in-line HTML. Additional content formatting includes images, videos, and callout boxes. Callout boxes are implemented through [shortcodes](shortcodes). |
| [Metadata](metadata) | Documentation must comply with metadata requirements, including *linktitle*, *title*, and *description*. Use *weight* to override the default alphabetical sort order. |
| [Topic headings](format.md#topic-headings) | Section titles must use H2 (`##`) headings. Subsection titles follow as H3 (`###`) and H4 (`####`) headings. Topic headings must use sentence case. The H1(`#`) heading is reserved for the page title which is specified in the topic's metadata.  |
| [User interface, inputs, and hotkeys](format#user-interface-inputs-and-hotkeys) | Bold all instances. |
| [Files, directories, and paths](format#files-directories-and-paths) | Use `code-style` formatting. Provide context on what a path is relative to. When applicable, link to the file in the [o3de repository](https://github.com/o3de/o3de).  |
| [Applications, tools, Gems, and components](format/#applications-tools-gems-and-components) | Bold only the first on-page occurrence. Subsequent occurrences on the same page remain unformatted.  |
| [Code, commands, and API objects](format#code-commands-and-apis) | Use `code-style` formatting for commands and API objects. Use code blocks for multiple lines of code. |
| [Terminology](format/#terminology) | Be consistent in the use of terms. Italicize new terms, and follow with a definition. Terms that are unique to O3DE must be included in the [Terminology page](../terminology#o3de-specific-terms). |
| [Trademark terminology](format/#trademark) | Properly format trademark titles and terminology according to its use from the source. Provide a link to the source's relevant material. |
| **Additional content** |
| [Images](media#adding-images-with-markdown-syntax) | Static images must be `.png` format. Diagrams must be `.svg` format. |
| [Animated images](media.md#animated-images) | Use short videos to demonstrate a feature's functionality. Prefer to use `.mp4` files that are less than 512 KB. Videos must not exceed 1 MB in size. Use of `.gif` format is deprecated and no longer permitted. |