---
linktitle: Style Guide
title: ' O3DE Documentation Contribution: Style Guide '
description: Style guide for contributors to the Open 3D Engine (O3DE) documentation project.
weight: 1000
toc: true
---

{{< preview-new >}}

This page suggests style guidelines for the Open 3D Engine (O3DE) documentation project. These are guidelines, not rules. Use your best judgment, and feel free to
propose changes to this document in a pull request.

This guide is not an exhaustive list of Markdown syntax. It covers common Markdown features and how they are used in O3DE documentation. To see a more comprehensive guide of Markdown syntax, see the [markdown.org Basic Syntax](https://www.markdownguide.org/basic-syntax/) guide. If you are ever in doubt about documentation format, please ping other contributors on the sig-docs mail list or Discord server.

This topic is very important to contributors and we do our best to keep it up to date. However, some guidelines might not be covered here as the documents rapidly evolve. If you note consistent feedback about some unwritten guideline in PRs, please take the time to document it for this guide and submit a pull request.

Changes to the style guide are made by the O3DE Documentation and Community Special Interest Group. To propose a change or addition, do the following:

1. Create a [pull request](/docs/cpntribute/to-docs/submit-a-pr) with your changes.
2. Use the **sig-review** label on your pull request.
3. Join the #sig-docs channel on the O3DE Discord server, and request reviews of your PR.

Discussion can be lively!

{{< note >}}
O3DE documentation uses [Goldmark Markdown Renderer](https://github.com/yuin/goldmark), along with some custom [Hugo Shortcodes](/docs/contribute/style/hugo-shortcodes/) to support banners and entities. For a demonstration of markdown features and shortcodes available in the O3DE documentation, see the [smoketest](/smoketest) page.
{{< /note >}}

## Language

The English-language documentation uses U.S. English spelling and grammar.

[//]: # (If you're localizing this page, you can omit the point about U.S. English.)

## General writer guidance

The O3DE documentation project serves a global audience. To support English as a Second Language (ESL) readers, and to ease localization efforts, please adhere to the following guidelines.

* Use U.S. English for accessibility.

* Whenever possible, use precise words with only one definition, or the primary definition of words from [The American Heritage Dictionary](https://www.ahdictionary.com/).

* Use standard and common domain and industry terminology.

   {{< note >}}
   For O3DE-specific term usage and syntax, and for the current list of words to avoid, read the [O3DE terminology](./terminology) topic.
   {{< /note >}}

* Be consistent in usage of terms.

* When you use acronyms, introduce them in their expanded form followed by the acronym in parentheses. For example: *Open 3D Engine (O3DE)*.

* Use [active voice](https://writing.wisc.edu/handbook/style/ccs_activevoice/).

* Keep sentences short.

* Use complete sentences.

* Consider whether information can be more clearly represented in a list or a table.

* Keep adjective and adverbs close to the words they modify.

* Avoid words that end in *-ing* when possible. Words that end in *-ing* can be verbs, adjectives, or gerunds, and can be ambiguous for ESL readers. If you must use a word that ends in *-ing*,  add a determiner such as *the* before or after the word to clarify whether the word is a verb or an adjective.

* Watch for words that end in *-ed*. Words that end in *-ed* can also be ambiguous. Use determiner phrases such as *that is* to clarify the usage of words that end in *-ed*.

* Don't use idioms, slang, jargon, or colloquialisms.

* Use optional words and phrases to clarify, such as *the*, *that*, *a*, *an*, *because*, *after*, *although*, and *might*.

* Use commas to make sentences easier to read and comprehend.

* Avoid Latin phrases such as *etc.* and *vs.*

## Documentation format standards

With Markdown, sometimes there are multiple methods to achieve the same result. For example, you can enclose words in underscores (`_`) or asterisks (`*`) to create italics. In these situations, it is best to use one method throughout the documentation. To keep both the documentation Markdown source files, and the O3DE documentation on-page presentation consistent, please adhere to the following basic documentation standards.

### Topic headings

Use a series of hashes (`#`) to define section headings. The H1 heading is taken from the metadata `title` element, which displays as the on-page title. Use standard capitalization, not sentence capitalization, for both the metadata title (`title`), the table-of-contents title (`linktitle`).

Section titles should be an H2 (`##`) heading, and use sentence case for the section title.

Subsection titles should start with an H3 (`###`) heading, and use sentence case for the subsection title.

Example:

```markdown
---
linktitle: "Page Title"
title: "An O3DE Documentation Page Title"
---

## H2 for the first section title (Sentence title capitalization)

### H3 for a sub-section title (Sentence title capitalization)

...

## H2 for the second section title (Sentence title capitalization)

### H3 for sub-section title (Sentence title capitalization)

#### H4 for sub-section of a sub-section title (Sentence title capitalization)

```

{{< note >}}
Take care when you name and order the headings. A table of contents for the page is automatically generated in the right gutter using the on=page headings.
{{< /note >}}

## Text format

As mentioned previously, there can be multiple methods to achieve the same result in Markdown. Adhere to the following standards to make both the Markdown source files and the on-page documentation much easier for readers to parse at a glance. Consistency in the Markdown source format also aids automation efforts for documentation.

### Bold text

To bold text, enclose the text in double asterisks (`**`).

Bold example:

```markdown
This is **bold** text.
```

Bold result:

This is **bold** text.

### Italic text

To italicize text, enclose the text in a single asterisk (`*`).

Italic example:

```markdown
This is *italic* text.
```

Italic result:

This is *italic* text.

### Inline code

To format text as inline code, enclose the text in a single backtick (`` ` ``).

Italic example:

```markdown
This is `code` text.
```

Italic result:

This is `code` text.

### Code block

Use code blocks for multi-line code. Some languages are supported for syntax highlighting. The language is specified after the opening back-ticks (` ``` `) of the code block.

Code block example:

````markdown
```python
# Use the 'request' find the type of job via 'jobKey' to determine what to do
def on_process_job(args):
    try:
        # Get request information
        request = args[0]
         ...
```
````

Code block result:

```python
# Use the 'request' find the type of job via 'jobKey' to determine what to do
def on_process_job(args):
    try:
        # Get request information
        request = args[0]
         ...
```

{{< note >}}
Syntax highlighting in the code block should conform to the [contrast guidelines.](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0&showtechniques=141%2C143#contrast-minimum)
{{< /note >}}

### Mark placeholders with angle brackets

Use angle brackets for placeholders. Tell the reader what a placeholder represents. For example:

```shell
git push origin <your-branch-name>
```

### Bold user interface elements

Do | Don't
:--| :-----
Choose **Edit**. | Click "Edit".
.. the **Play** button. | ... the Play button.

### Bold input combinations

Do | Don't
:--| :-----
Press **Enter**. | Press "Enter".
.. **right-click** the asset name ... | ... right-click the asset name ...
Hold **Control + Shift** ... | Hold `Control + Shift` ...
### Bold proper application names

Do | Don't
:--| :-----
Open **Material Editor**. | Open the Material Editor.
In **Asset Processor**, right-click... | In "Asset Processor", right-click...

### Italicize new term introductions and definitions

Do | Don't
:--| :-----
... to create *image based lighting (IBL)*. | ... to create **image based lighting (IBL)**.
A *prefab* is a collection of entities ... | A "prefab" is a collection of entities ...

### Place punctuation outside quotes

Do | Don't
:--| :-----
... assets that are "game-ready". | ... assets that are "game-ready."
... process called "rigging". | ... process called "rigging."

### Code style for filenames, directories, and paths

Do | Don't
:--| :-----
Open the `bootstrap.cfg` file. | Open the bootstrap.cfg file.
... in the `/<project>/levels` directory. | ... in the /\<project\>/levels directory.
Open the `/<project>/game.cfg` file. | Open the /\<project\>/game.cfg file.

### Code style for inline code and commands

Do | Don't
:--| :-----
... set `enable_memory_tracking = True`. | ... set **enable_memory_tracking** = "True".
... enter the command `dump_vars`. | ... enter the command dump_vars.

### Code style for variable names, API objects, namespaces, and so on

Do | Don't
:--| :-----
... value of the `sys_maxfps` field. | ... value of the "sys_maxfps" field.
... use the `WorldRequestBus`. | ... use the "WorldRequestBus".
... in `AZ::Data::AssetData` derived classes. | ... in **AZ::Data::AssetData** derived classes.

### Bold property names, and inline code their values

Do | Don't
:--| :-----
Set the **Color** property to `255,0,0`. | Set the Color property to "255,0,0".
For **Intensity Mode**, select `Candela`. | For `Intensity Mode`, select Candela. 
Valid **Mass** values range from `0` to `Infinity`. | Valid Mass values range from `0` to Infinity.

### Don't include the command prompt

Do | Don't
:--| :-----
`cmake --build ...` | `C:\> cmake --build ...` 

### Separate commands from output

```shell
cmake --build <MyProject> --config profile --target Editor -- /m
```

The output is similar to this:

```console
Microsoft (R) Build Engine version 16.9.0+57a23d249 for .NET Framework
Copyright (C) Microsoft Corporation. All rights reserved.

  Checking Build System
  Building Custom Rule D:/O3DE/Code/Framework/AzCore/CMakeLists.txt
  unity_16_cxx.cxx
  unity_20_cxx.cxx
  unity_19_cxx.cxx
  unity_24_cxx.cxx
  unity_23_cxx.cxx
```

## Lists

Use ordered lists when the order of the items are significant, such as a procedure of sequential steps. Use unordered lists if the order of the items is arbitrary, such as a list of assets.

If the list is longer than four items, or if the list contains call-out shortcode or an image, add newlines between each list element to improve readability.

### Ordered lists

Use `1.` to delineate items in ordered lists. Goldmark automatically numbers the items in the list. Ordered lists are used for procedures.

Ordered list example:

```markdown
1. Step one

1. Step two

    {{</* note */>}}
    This list only contains four steps, but newlines have been added because it contains a  {{</* note */>}} call-out. The call-out is preceded by four spaces to ensure it aligns with the list item. 
    {{</* /note */>}}

1. Step three

1. Step four
```

Ordered list result:

1. Step one

1. Step two

    {{< note >}}
    This list only contains four steps, but newlines have been added because it contains a  {{</* note */>}} call-out. The call-out is preceded by four spaces to ensure it aligns with the list item.
    {{< /note >}}

1. Step three

1. Step four

### Unordered lists

Use `*` to delineate items in unordered lists.

Unordered list example:

```markdown
* Item one
* Item two
* Item three
```

Unordered list result:

* Item one
* Item two
* Item three

### Nested lists

Indent four spaces to nest a list. Nested lists are often used for sub-steps or requirements lists in a procedure.

Nested list example:

```markdown
1. Step one

1. Step two

   * Item one

   * Item two

   * Item three

1. Step three
```

Nested list result:

1. Step one

1. Step two

   * Item one
  
   * Item two
  
   * Item three
  
1. Step three

### Definition lists

Use definition lists for content that lists a pair of terms and their definitions. For example, a glossary.
  
Definition list example:

```markdown
First Term
: This is the definition of the first term.

Second Term
: This is one definition of the second term.
: This is another definition of the second term.
```

Definition list result:

First Term
: This is the definition of the first term.

Second Term
: This is one definition of the second term.
: This is another definition of the second term.

## O3DE documentation Hugo shortcodes

Hugo [Shortcodes](https://gohugo.io/content-management/shortcodes) are used to add complex elements to pages that aren't supported by markdown, such as embedded video links, and call-outs. Shortcodes can be written in other languages, such as HTML. The currently available shortcodes are located in the `/layouts/shortcodes` directory of the O3DE documentation repository. You can create additional shortcodes. To see all the currently available shortcodes, view the [smoketest](/smoketest) page.

{{< important >}}
If you create new shortcodes for O3DE documentation, be sure to add them to the [smoketest](/smoketest) page so that other contributors can discover them and use them!
{{< /important >}}

O3DE documentation supports three different call-out shortcodes: **Note** `{{</* note */>}}`, **Caution** `{{</* caution */>}}`, and **Important** `{{</* important */>}}`. To use a call-out shortcode, enclose the text you wish to display in the opening and closing shortcode brackets.

### Note

Use `{{</* note */>}}` to highlight a tip or a piece of information that is helpful to know.

For example:

```markdown
{{</* note */>}}
You can *still* use Markdown inside these call-outs.
{{</* /note */>}}
```

The output is:

{{< note >}}
You can *still* use Markdown inside these call-outs.
{{< /note >}}

### Caution

Use `{{</* caution */>}}` to call attention to an important piece of information to avoid pitfalls.

For example:

```markdown
{{</* caution */>}}
The call-out style only applies to the line directly above the tag.
{{</* /caution */>}}
```

The output is:

{{< caution >}}
The call-out style only applies to the line directly above the tag.
{{< /caution >}}

### Important

Use `{{</* important */>}}` to indicate information that is crucial to follow.

For example:

```markdown
{{</* important */>}}
Avoid multiple paragraphs in call-outs.
{{</* /important */>}}
```

The output is:

{{< important >}}
Avoid multiple paragraphs in call-outs.
{{< /important >}}

### Shortcodes in lists

You can use a call-out in a list:

```markdown
1. Use the note shortcode in a list.

1. A second item with an embedded note.

   {{</* note */>}}
   Warning, Caution, and Note shortcodes, embedded in lists, need to be indented to the level of the list item; four spaces for the first level, eight spaces for the second level, and so on. See [Common Shortcode Issues](#common-shortcode-issues).
   {{</* /note */>}}

1. A third item in a list

1. A fourth item in a list
```

The output is:

1. Use the note shortcode in a list

1. A second item with an embedded note

    {{< note >}}
    Warning, Caution, and Note shortcodes, embedded in lists, need to be indented to the level of the list item; four spaces for the first level, eight spaces for the second level, and so on. Lists that contain shortcodes should have newlines between each list item and before and after the shortcode. See [Common Shortcode Issues](#common-shortcode-issues).
    {{< /note >}}

1. A third item in a list

1. A fourth item in a list

## Images and visuals

To add an image, use syntax similar to a link, preceded by an exclamation mark. The text in the brackets is displayed when the image does not load. Inside the parentheses is the link to the image asset, and an optional image title in double quotes.

Image example:

```markdown
![O3DE Logo](/img/logos/O3DE-Logo-RGB.svg "The O3DE logo")
```

Image output:

![O3DE Logo](/img/logos/O3DE-Logo-RGB.svg "The O3DE logo")

### Image file location
Images live in subdirectories of the `/static/` directory of the O3DE documentation repository.

Guide specific images, such as interface screenshots and diagrams, are located in subdirectories of `/static/images/`. The directory structure of `/static/images/` is a mirror of the directory structure of `/docs/`. Shared images such as logos, are placed in subdirectories of `/static/img/`. When submitting images as part of a PR, ensure the images are placed in the appropriate subdirectories.

### General image guidelines

In order to standardize presentation, and to keep the O3DE documentation repository below 1 GB, please adhere to the following guidelines when you create images for documentation:

* Don't use aggressive compression.

* Image contributions should be less than 512 KB in size.
  
* Text in images should be U.S. English.

* Do not include personal identification information (PII) in your screenshots.

* Only use model, character, and texture assets freely available to O3DE users:

  * Assets distributed as part of O3DE.

  * Assets distributed with permissive and open source licenses such as those found at [The Stanford 3D Scanning Repository](https://graphics.stanford.edu/data/3Dscanrep/).

  * Assets that can be quickly replicated in open source content applications such as [Blender](https://blender.org) and [Gimp](https://gimp.org).

  * If you use assets distributed by a third party, provide a proper attribution and link for the asset in the documentation.

### Screenshots

* Use `.png` format for all screenshots.

* Take screenshots at HD resolution (1920x1080).

* Use the default interface scale for screenshots.

* Use the default interface color theme for screenshots.

* Use the default interface layout whenever possible.

* Don't scale screenshots that have interface elements.

* Crop interface images to contain only the necessary elements whenever possible.

### Image annotations

* We suggest the open source tool [ShareX](https://getsharex.com/) for image annotation.

* Use as little text as possible in annotations. Add an ordered list below the image for text explanations of image annotations.

* Use a clear, sans display font, such as [Open Sans](https://fonts.google.com/specimen/Open+Sans), in image annotations.

* Use US English in image annotations.

* Use solid color fills, not gradient fills.

* Avoid pure red and green colors in annotations for accessibility.

### Diagrams

* Use [draw io](https://app.diagrams.net) to create diagrams.

* Use `.svg` for diagrams.

* Keep diagrams simple. Break complex diagrams into smaller chunks.

* Use as little text as possible in diagrams.

* Use a clear, sans display font, such as Helvetica, for diagram text.

* Use solid color fills, not gradient fills.

* Use few colors and avoid pure red and green colors for accessibility.

### Animated images

Animated images are not currently accepted for contribution due to limitations on repository size. If you must demonstrate steps, use a horizontal two to four panel annotated image strip that demonstrates the start, action, and result of the process.
