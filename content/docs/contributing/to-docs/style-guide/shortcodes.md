---
title: Hugo Shortcodes Used in O3DE Documentation
description: A list of the shortcodes used in Open 3D Engine (O3DE) documentation.
linktitle: Shortcodes
weight: 600
toc: true
---

To enrich **Open 3D Engine (O3DE)** documentation pages with complex elements such as embedded video links and call-outs, use Hugo [shortcodes](https://gohugo.io/content-management/shortcodes). Markdown doesn't support these complex elements, but you can write shortcodes in other languages, such as HTML. You can review all currently available shortcodes in the `/layouts/shortcodes` directory of the O3DE docs repository.

## Callout Boxes

O3DE documentation supports four different call-out shortcodes: **Note** `{{</* note */>}}`, **Tip** `{{</* tip */>}}`, **Caution** `{{</* caution */>}}`, and **Important** `{{</* important */>}}`. To use a call-out shortcode, enclose the text that you want to display in the opening and closing shortcode brackets.

### Note

Use `{{</* note */>}}` to draw attention to a clarification or information that's of special interest to the reader. For shortcuts and best practices, consider using a `{{</* tip */>}}` instead.

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

### Tip

Use `{{</* tip */>}}` to draw attention to a shortcut or best practice. While the information should contain practical advice that's relevant to the preceding content, it should _not_ contain information that's essential or critical to completing a step or using a feature.

For example:

```markdown
{{</* tip */>}}
You can spawn multiple instances of `AssetBuilder.exe` and attach them to Visual Studio.
{{</* /tip */>}}
```

The output is:

{{< tip >}}
You can spawn multiple instances of `AssetBuilder.exe` and attach them to Visual Studio.
{{< /tip >}}

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

Use `{{</* important */>}}` to indicate information that is critical to follow.

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

You can use a call-out in a list. Make sure to indent the first call-out shortcode, as explained in the following note:

```markdown
1. Use the note shortcode in a list.
1. A second item with an embedded note.

    {{</* note */>}}
Warning, Caution, Tip, and Note shortcodes, when embedded in lists, need to be indented to the level of the list item; four spaces for the first level, eight spaces for the second level, and so on.

Lists that contain shortcodes should have newlines between each list item and before and after the shortcode.
{{</* /note */>}}

1. A third item in a list
1. A fourth item in a list
```

The output is:

1. Use the note shortcode in a list
1. A second item with an embedded note

    {{< note >}}
Warning, Caution, Tip, and Note shortcodes, when embedded in lists, need to be indented to the level of the list item; four spaces for the first level, eight spaces for the second level, and so on.

Lists that contain shortcodes should have newlines between each list item and before and after the shortcode.
{{< /note >}}

1. A third item in a list
1. A fourth item in a list
