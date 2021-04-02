---
linktitle: "Style Guide"
title: "O3DE Documentation Style Guide"
description: 'The style guide for O3DE documentation.'
date: 2021-04-02T00:23:51-05:00
weight: 400
---

{{< preview-new >}}

## Open 3D Engine Documentation: Style Guidance

This page gives writing style guidelines for the Open 3D Engine (O3DE) documentation.
These are guidelines, not rules. Use your best judgment, and feel free to
propose changes to this document in a pull request.

For additional information on creating new content for the Kubernetes
documentation, read the [Documentation Content Guide](/docs/contribute/to-docs/).

Changes to the style guide are made by SIG Docs as a group. To propose a change
or addition, create a pull request with your changes, (if you haven't already) join the #sig-docs channel on the O3DE discord server, and request reviews of your PR. Discussion may be lively!

{{< note >}}
O3DE documentation uses [Goldmark Markdown Renderer](https://github.com/yuin/goldmark)
with some adjustments along with a few [Hugo Shortcodes](/docs/contribute/style/hugo-shortcodes/) to support banners and entities.
{{< /note >}}

### Language

The English-language documentation uses U.S. English spelling and grammar.

{{< comment >}}[If you're localizing this page, you can omit the point about U.S. English.]{{< /comment >}}

### Documentation formatting standards

{{ < note >}}
For O3DE-specific term usage and syntax, and for the current list of words to avoid, read [the O3DE terminology guidance topic](terminology.md).
{{ </note> }}

#### Topic headings

For new topics, the on-page title should be an H2 `##`. (The H1 is taken from the metadata `title` element.) Use standard capitalization, not sentence capitalization for both the metadata title (`title`), the table-of-contents title (`linktitle`), and the on-page title (`##`).

There should only be one H2 title. Subsequent sections in the topic should start with an H3 (`###`) and use sentence casing for the section title.

Example:

```markdown

---
linktitle: "Page Title"
title: "An O3DE Documentation Page Title"
---

## On-Page Topic Title (Standard Title Capitalization)

...

### H3 for the first topic section title (Sentence title capitalization)

#### H4 for a topic sub-section title (Sentence title capitalization)

...

### H3 for the second topic section title (Sentence title capitalization)

```

#### Use angle brackets to mark placeholders

Use angle brackets for placeholders. Tell the reader what a placeholder
represents. For example:

```shell
git push origin <your-working-branch-name>
```

#### Use bold for user interface elements

Do | Don't
:--| :-----
Click **Fork**. | Click "Fork".
Select **Other**. | Select "Other".

#### Use italics to define or introduce new terms

Do | Don't
:--| :-----
A _cluster_ is a set of nodes ... | A "cluster" is a set of nodes ...
These components form the _control plane_. | These components form the **control plane**.

#### Use code style for filenames, directories, and paths

Do | Don't
:--| :-----
Open the `envars.yaml` file. | Open the envars.yaml file.
Go to the `/docs/tutorials` directory. | Go to the /docs/tutorials directory.
Open the `/_data/concepts.yaml` file. | Open the /\_data/concepts.yaml file.

#### Use the international standard for punctuation inside quotes

Do | Don't
:--| :-----
events are recorded with an associated "stage". | events are recorded with an associated "stage."
The copy is called a "fork". | The copy is called a "fork."

#### Use code style for inline code, commands, and API objects {#code-style-inline-code}

In a Markdown document, use the backtick (`` ` ``).

{{< note >}}
The website supports syntax highlighting for code samples, but specifying a language is optional. Syntax highlighting in the code block should conform to the [contrast guidelines.](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0&showtechniques=141%2C143#contrast-minimum)

#### Use code style for object field names and namespaces

Do | Don't
:--| :-----
Set the value of the `replicas` field in the configuration file. | Set the value of the "replicas" field in the configuration file.
The value of the `exec` field is an ExecAction object. | The value of the "exec" field is an ExecAction object.
Run the process as a DaemonSet in the `kube-system` namespace. | Run the process as a DaemonSet in the kube-system namespace.

#### Use a general descriptor over a component name

Do | Don't
:--| :-----
The Kubernetes API server offers an OpenAPI spec. | The apiserver offers an OpenAPI spec.
Aggregated APIs are subordinate API servers. | Aggregated APIs are subordinate APIServers.

#### Use normal style for string and integer field values

For field values of type string or integer, use normal style without quotation marks.

Do | Don't
:--| :-----
Set the value of `imagePullPolicy` to Always. | Set the value of `imagePullPolicy` to "Always".
Set the value of `image` to nginx:1.16. | Set the value of `image` to `nginx:1.16`.
Set the value of the `replicas` field to 2. | Set the value of the `replicas` field to `2`.

#### Don't include the command prompt

Do | Don't
:--| :-----
git add . | $ git add .
{{< /table >}}

#### Separate commands from output

```shell
git fetch --all
```

The output is similar to this:

```console
remote: Enumerating objects: 93, done.
remote: Counting objects: 100% (93/93), done.
remote: Compressing objects: 100% (34/34), done.
remote: Total 100 (delta 58), reused 91 (delta 57), pack-reused 7
Receiving objects: 100% (100/100), 52.23 KiB | 1.21 MiB/s, done.
Resolving deltas: 100% (58/58), completed with 20 local objects.
From https://github.com/o3de/o3de.org
 * [new branch]        pr/384     -> upstream/pr/384
 * [new branch]        setup      -> upstream/setup
```

### O3DE documentation Hugo shortcodes

[NEED LISTING HERE]

Hugo [Shortcodes](https://gohugo.io/content-management/shortcodes) help create different rhetorical appeal levels. Our documentation supports three different shortcodes in this category: **Note** `{{</* note */>}}`, **Caution** `{{</* caution */>}}`, and **Warning** `{{</* warning */>}}`.

1. Surround the text with an opening and closing shortcode.

2. Use the following syntax to apply a style:

   ```none
   {{</* note */>}}
   No need to include a prefix; the shortcode automatically provides one. (Note:, Caution:, etc.)
   {{</* /note */>}}
   ```

   The output is:

   {{< note >}}
   The prefix you choose is the same text for the tag.
   {{< /note >}}

#### Note

Use `{{</* note */>}}` to highlight a tip or a piece of information that may be helpful to know.

For example:

```
{{</* note */>}}
You can _still_ use Markdown inside these callouts.
{{</* /note */>}}
```

The output is:

{{< note >}}
You can _still_ use Markdown inside these callouts.
{{< /note >}}

You can use a `{{</* note */>}}` in a list:

```
1. Use the note shortcode in a list

1. A second item with an embedded note

   {{</* note */>}}
   Warning, Caution, and Note shortcodes, embedded in lists, need to be indented four spaces. See [Common Shortcode Issues](#common-shortcode-issues).
   {{</* /note */>}}

1. A third item in a list

1. A fourth item in a list
```

The output is:

1. Use the note shortcode in a list

1. A second item with an embedded note

    {{< note >}}
    Warning, Caution, and Note shortcodes, embedded in lists, need to be indented four spaces. See [Common Shortcode Issues](#common-shortcode-issues).
    {{< /note >}}

1. A third item in a list

1. A fourth item in a list

#### Caution

Use `{{</* caution */>}}` to call attention to an important piece of information to avoid pitfalls.

For example:

```
{{</* caution */>}}
The callout style only applies to the line directly above the tag.
{{</* /caution */>}}
```

The output is:

{{< caution >}}
The callout style only applies to the line directly above the tag.
{{< /caution >}}

#### Warning

Use `{{</* warning */>}}` to indicate danger or a piece of information that is crucial to follow.

For example:

```
{{</* warning */>}}
Beware.
{{</* /warning */>}}
```

The output is:

{{< warning >}}
Beware.
{{< /warning >}}

### Markdown elements

[NEED GUIDANCE FOR MARKDOWN ELEMENT USAGE AND FORMATTING HERE]


