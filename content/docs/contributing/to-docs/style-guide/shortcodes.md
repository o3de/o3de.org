---
title: Hugo Shortcodes Used in Open 3D Engine Documentation
description: A list of the shortcodes used in Open 3D Engine (O3DE) documentation.
linktitle: Shortcodes
weight: 500
toc: true
---

To enrich Open 3D Engine (O3DE) documentation pages with complex elements such as embedded video links and call-outs, use Hugo [shortcodes](https://gohugo.io/content-management/shortcodes). Markdown doesn't support these complex elements, but you can write shortcodes in other languages, such as HTML. You can review all currently available shortcodes in the `/layouts/shortcodes` directory of the O3DE docs repository and on the [smoketest](/smoketest) page. You can also create additional shortcodes.

{{< important >}}
If you create new shortcodes for O3DE documentation, be sure to add them to the [smoketest](/smoketest) page so that other contributors can discover them and use them!
{{< /important >}}

## Callout Boxes

O3DE documentation supports three different call-out shortcodes: **Note** `{{</* note */>}}`, **Caution** `{{</* caution */>}}`, and **Important** `{{</* important */>}}`. To use a call-out shortcode, enclose the text that you want to display in the opening and closing shortcode brackets.

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

### Call-out boxes in lists

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
