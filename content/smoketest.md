---
title: Docs smoke test page
main_menu: false
draft: true
---

This page serves two purposes:

- Demonstrate how the **Open 3D Engine (O3DE)** documentation uses Markdown.
- Provide a "smoke test" document we can use to test HTML, CSS, and template
  changes that affect the overall documentation.

## Heading levels

The above heading is an H2. The page title renders as an H1. The following
sections show H3-H6.

### H3

This is in an H3 section.

#### H4

This is in an H4 section.

##### H5

This is in an H5 section.

###### H6

This is in an H6 section.

## Inline elements

Inline elements show up within the text of paragraph, list item, admonition, or
other block-level element.

### Inline text styles

- **bold**
- _italic_
- ***bold italic***
- ~~strikethrough~~
- <u>underline</u>
- _<u>underline italic</u>_
- **<u>underline bold</u>**
- ***<u>underline bold italic</u>***
- `monospace text`
- **`monospace bold`**

## Lists

Markdown doesn't have strict rules about how to process lists. Keep the following in mind.

- Make sure you indent sub-list items **two spaces**.

- To end a list and start another, you need a HTML comment block on a new line
  between the lists, flush with the left-hand border. The first list won't end
  otherwise, no matter how many blank lines you put between it and the second.

### Bullet lists

- This is a list item
* This is another list item in the same list
- You can mix `-` and `*`
  - To make a sub-item, indent two spaces.
    - This is a sub-sub-item. Indent two more spaces.
  - Another sub-item.

<!-- separate lists -->

- This is a new list. With Hugo, you need to use a HTML comment to separate two
  consecutive lists. **The HTML comment needs to be at the left margin.**
- Bullet lists can have paragraphs or block elements within them.

  Indent the content to be the same as the first line of the bullet point.
  **This paragraph and the code block line up with the first `B` in `Bullet`
  above.**

  ```bash
  ls -l
  ```

  - And a sub-list after some block-level content

- A bullet list item can contain a numbered list.
    1.  Numbered sub-list item 1
    2.  Numbered sub-list item 2

### Numbered lists

1.  This is a list item
2.  This is another list item in the same list. The number you use in Markdown
    does not necessarily correlate to the number in the final output. By
    convention, we keep them in sync.
3.  {{<note>}}
    For single-digit numbered lists, using two spaces after the period makes
    interior block-level content line up better along tab-stops.
    {{</note>}}

<!-- separate lists -->

1.  This is a new list. With Hugo, you need to use a HTML comment to separate
    two consecutive lists. **The HTML comment needs to be at the left margin.**
2.  Numbered lists can have paragraphs or block elements within them.

    Just indent the content to be the same as the first line of the bullet
    point. **This paragraph and the code block line up with the `N` in
    `Numbered` above.**

    ```bash
    ls -l
    ```

    - And a sub-list after some block-level content. This is at the same
      "level" as the paragraph and code block above, despite being indented
      more.

### Tab lists

Tab lists can be used to conditionally display content, e.g., when multiple
options must be documented that require distinct instructions or context.

{{< tabs name="tab_lists_example" >}}
{{% tab name="Choose one..." %}}
Please select an option.
{{% /tab %}}
{{% tab name="Formatting tab lists" %}}

Tabs may also nest formatting styles.

1. Ordered
1. (Or unordered)
1. Lists

```bash
echo 'Tab lists may contain code blocks!'
```

{{% /tab %}}
{{% tab name="Nested headers" %}}

### Header within a tab list

Nested header tags may also be included.

{{< caution >}}
Headers within tab lists will not appear in the Table of Contents.
{{< /caution >}}

{{% /tab %}}
{{< /tabs >}}

### Checklists

Checklists are technically bullet lists, but the bullets are suppressed by CSS.

- [ ] This is a checklist item
- [x] This is a selected checklist item

## Code blocks

You can create code blocks two different ways by surrounding the code block with
three back-tick characters on lines before and after the code block. **Only use
back-ticks (code fences) for code blocks.** This allows you to specify the
language of the enclosed code, which enables syntax highlighting. It is also more
predictable than using indentation.

```
this is a code block created by back-ticks
```

The back-tick method has some advantages.

- It works nearly every time.
- It is more compact when viewing the source code.
- It allows you to specify what language the code block is in, for syntax
  highlighting.
- It has a definite ending. Sometimes, the indentation method breaks with
  languages where spacing is significant, like Python or YAML.

To specify the language for the code block, put it directly after the first
grouping of back-ticks:

```bash
ls -l
```

Common languages used in O3DE documentation code blocks include:

- `bash` / `shell` (both work the same)
- `cpp`
- `python`
- `json`
- `xml`
- `none` (disables syntax highlighting for the block)

### Code blocks containing Hugo shortcodes

To show raw Hugo shortcodes as in the above example and prevent Hugo
from interpreting them, use C-style comments directly after the `<` and before
the `>` characters. The following example illustrates this (view the Markdown
source for this page).

```none
{{</* codenew file="pods/storage/gce-volume.yaml" */>}}
```

## Links

To format a link, put the link text inside square brackets, followed by the
link target in parentheses. [Link to O3DE Docs](https://www.o3de.org/docs/) or
[Relative link to O3DE.org](/)

You can also use HTML, but it is not preferred.
<a href="https://www.o3de.org">Link to O3DE.org</a>

## Images

To format an image, use similar syntax to [links](#links), but add a leading `!`
character. The square brackets contain the image's alt text. Try to always use
alt text so that people using screen readers can get some benefit from the
image.

![O3DE icon](/img/logos/O3DE-Circle-LogoMark-REV-MONO.svg)


The `image-width` shortcode adds an image with alternate text and restricts the image's width. The `image-width` shortcode can ensure image sizes are consistent within a topic, and that large images and `.svg` diagrams don't scale overly large in wide browser windows.

`image-width` takes three double-quoted named parameters:

1. `src="/images/<image.png>"` - Image file path.
1. `width="<image width>"` - Scale the image by specifying a width in pixels.
1. `alt="<image description>"` - A string describing the image.

`image-width` example:

```markdown
{{</* image-width src="/images/welcome-guide/guide_img.png" width="700" alt="The O3DE Welcome Guide splash image." */>}}
```

`image-width` example output:

{{< image-width src="/images/welcome-guide/guide_img.png" width="700" alt="The O3DE Welcome Guide splash image." >}}

An image can also be a link. This time the O3DE icon links to the O3DE website. Outer square brackets enclose
the entire image tag, and the link target is in the parentheses at the end.

[![O3DE icon](/img/logos/O3DE-Circle-LogoMark-REV-MONO.svg)](https://o3de.org)

You can also use HTML for images, but it is not preferred.

<img src="/img/logos/O3DE-Circle-LogoMark-REV-MONO.svg" alt="O3DE icon" />

## Tables

Simple tables have one row per line, and columns are separated by `|`
characters. The header is separated from the body by cells containing nothing
but at least three `-` characters. For ease of maintenance, try to keep all the
cell separators even, even if you heed to use extra space.

| Heading cell 1 | Heading cell 2 |
|----------------|----------------|
| Body cell 1    | Body cell 2    |

The header is optional. Any text separated by `|` will render as a table.

Markdown tables have a hard time with block-level elements within cells, such as
list items, code blocks, or multiple paragraphs. For complex or very wide
tables, use HTML instead.

<table>
<thead>
  <tr>
    <th>Heading cell 1</th>
    <th>Heading cell 2</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Body cell 1</td>
    <td>Body cell 2</td>
  </tr>
</tbody>
</table>

## Sidebars and Admonitions

Sidebars and admonitions provide ways to add visual importance to text. Use
them sparingly.

### Sidebars

A sidebar offsets text visually, but without the visual prominence of
[admonitions](#admonitions).

> This is a sidebar.
>
> You can have paragraphs and block-level elements within a sidebar.
>
> You can even have code blocks.
>
> ```bash
> sudo dmesg
> ```
>

### Admonitions

Admonitions (notes, warnings, etc) use Hugo shortcodes.

{{< note >}}
Notes catch the reader's attention without a sense of urgency.

You can have multiple paragraphs and block-level elements inside an admonition.

| Or | a | table |
| - | - | - |
| | |
{{< /note >}}

{{< tip >}}
Tips draw attention to a shortcut or best practice related to the preceding content.
{{< /tip >}}

{{< caution >}}
The reader should proceed with caution.
{{< /caution >}}

{{< important >}}
Important information the reader must heed.
{{< /important >}}

{{< todo issue="https://github.com/o3de/o3de.org/issues/432" >}}
Indicates a section needs work, followed by a description of the task and a link to the issue in GitHub.
{{< /todo >}}


{{< todo >}}
Indicates a section needs work, followed by a description of the task and a prompt for someone to create a GitHub issue for this task.
{{< /todo >}}   

{{< known-issue >}}
Indicates a known issue with the process described in the docs. 
{{< /known-issue >}}

{{< known-issue link="https://github.com/o3de/o3de/pull/4856">}}
Indicates a known issue with the process described in the docs and provides a link to an issue, PR, or discussion that provides information about this issue.
{{< /known-issue >}}

The `feature-in-progress` shortcode provides a note for a feature that is in active development with links to open Issues and PRs. It takes three double quote enclosed parameters in order:

1. Feature name.
1. Link to issues. Provide query filtered to open issues with titles that contain the feature name.
1. Link to pull requests. Provide query filtered to open pull requests with titles that contain the feature name.

Example usage:

```markdown
{{</* feature-in-progress "O3DE Editor" "https://github.com/o3de/o3de/issues?q=is%3Aissue+is%3Aopen+in%3Atitle+editor" "https://github.com/o3de/o3de/pulls?q=is%3Apr+is%3Aopen+in%3Atitle+editor" */>}}
```

Example output:

{{< feature-in-progress "O3DE Editor" "https://github.com/o3de/o3de/issues?q=is%3Aissue+is%3Aopen+in%3Atitle+editor" "https://github.com/o3de/o3de/pulls?q=is%3Apr+is%3Aopen+in%3Atitle+editor" >}}

## Includes

To add shortcodes to includes.

### Inline Icons

You can add inline O3DE GUI icons with the `icon` shortcode. Icon `.svg` files are located in `/static/images/icons`.

| Name | Image |
| - | - |
| add.svg | {{< icon "add.svg" >}} |
| align-bottom.svg | {{< icon "align-bottom.svg" >}} |
| align-left.svg | {{< icon "align-left.svg" >}} |
| align-right.svg | {{< icon "align-right.svg" >}} |
| align-top.svg | {{< icon "align-top.svg" >}} |
| animation-editor.svg | {{< icon "animation-editor.svg" >}} |
| arrow_left-default.svg | {{< icon "arrow_left-default.svg" >}} |
| arrow_right-default.svg | {{< icon "arrow_right-default.svg" >}} |
| asset-editor.svg | {{< icon "asset-editor.svg" >}} |
| asset-processor.svg | {{< icon "asset-processor.svg" >}} |
| audio-editor.svg | {{< icon "audio-editor.svg" >}} |
| browse-edit-select-files.svg | {{< icon "browse-edit-select-files.svg" >}} |
| camera.svg | {{< icon "camera.svg" >}} |
| caret-closed.svg | {{< icon "caret-closed.svg" >}} |
| caret-open.svg | {{< icon "caret-open.svg" >}} |
| comment.svg | {{< icon "comment.svg" >}} |
| debug.svg | {{< icon "debug.svg" >}} |
| default-document.svg | {{< icon "default-document.svg" >}} |
| delete.svg | {{< icon "delete.svg" >}} |
| entity.svg | {{< icon "entity.svg" >}} |
| entity-editoronly.svg | {{< icon "entity-editoronly.svg" >}} |
| entity-notactive.svg | {{< icon "entity-notactive.svg" >}} |
| entity-outliner-dot.svg | {{< icon "entity-outliner-dot.svg" >}} |
| error.svg | {{< icon "error.svg" >}} |
| file-folder.svg | {{< icon "file-folder.svg" >}} |
| filter.svg | {{< icon "filter.svg" >}} |
| grid.svg | {{< icon "grid.svg" >}} |
| group.svg | {{< icon "group.svg" >}} |
| help.svg | {{< icon "help.svg" >}} |
| help2.svg | {{< icon "help2.svg" >}} |
| helpers.svg | {{< icon "helpers.svg" >}} |
| info.svg | {{< icon "info.svg" >}} |
| information.svg | {{< icon "information.svg" >}} |
| landscape-canvas-editor.svg | {{< icon "landscape-canvas-editor.svg" >}} |
| layer.svg | {{< icon "layer.svg" >}} |
| level.svg | {{< icon "level.svg" >}} |
| list-view.svg | {{< icon "list-view.svg" >}} |
| local.svg | {{< icon "local.svg" >}} |
| locked.svg | {{< icon "locked.svg" >}} |
| lua-editor.svg | {{< icon "lua-editor.svg" >}} |
| material-editor.svg | {{< icon "material-editor.svg" >}} |
| menu.svg | {{< icon "menu.svg" >}} |
| more.svg | {{< icon "more.svg" >}} |
| move.svg | {{< icon "move.svg" >}} |
| open-in-internal-app.svg | {{< icon "open-in-internal-app.svg" >}}
| parent.svg | {{< icon "parent.svg" >}} |
| pending.svg | {{< icon "pending.svg" >}} |
| picker.svg | {{< icon "picker.svg" >}} |
| pin-button.svg | {{< icon "pin-button.svg" >}} |
| play.svg | {{< icon "play.svg" >}} |
| popout-overlay.svg | {{< icon "popout-overlay.svg" >}} |
| prefab.svg | {{< icon "prefab.svg" >}} |
| prefab-edit.svg | {{< icon "prefab-edit.svg" >}} |
| processing.svg | {{< icon "processing.svg" >}} |
| refresh-active.svg | {{< icon "refresh-active.svg" >}} |
| resolution.svg | {{< icon "resolution.svg" >}} |
| rotate.svg | {{< icon "rotate.svg" >}} |
| scale.svg | {{< icon "scale.svg" >}} |
| script-canvas-editor.svg | {{< icon "script-canvas-editor.svg" >}} |
| select-object.svg | {{< icon "select-object.svg" >}} |
| settings.svg | {{< icon "settings.svg" >}} |
| shadow.svg | {{< icon "shadow.svg" >}} |
| simulate-physics.svg | {{< icon "simulate-physics.svg" >}} |
| sort-a-to-z.svg | {{< icon "sort-a-to-z.svg" >}} |
| sort-manually.svg | {{< icon "sort-manually.svg" >}} |
| sort-z-to-a.svg | {{< icon "sort-z-to-a.svg" >}} |
| tone-mapping.svg | {{< icon "tone-mapping.svg" >}} |
| trackview-editor.svg | {{< icon "trackview-editor.svg" >}} |
| ui-editor.svg | {{< icon "ui-editor.svg" >}} |
| ungroup.svg | {{< icon "ungroup.svg" >}} |
| unlocked.svg | {{< icon "unlocked.svg" >}} |
| valid.svg | {{< icon "valid.svg" >}} |
| visibility-off.svg | {{< icon "visibility-off.svg" >}} |
| visibility-on.svg | {{< icon "visibility-on.svg" >}} |
| warning-yellow.svg | {{< icon "warning-yellow.svg" >}} |
| world.svg | {{< icon "world.svg" >}} |

## Embedding videos with the `video` shortcode

Videos in the `/images/` directory can be embedded in topics with the `video` shortcode. Use this method to include animations in topics rather than animated `.gifs`.

Keep the following in mind when submitting videos in docs contributions:

* `.mp4` is the preferred video format. `.ogg` and `.webm` are also supported by the shortcode, but aren't as well supported by various browsers.
* Videos must be placed in the `/static/images/` directory structure using the same conventions as images.
* Videos should be smaller than 512 KB and must not exceed 1 MB in size.
* Ensure text in the video is legible if required.
* Ensure the video resolution is no larger than necessary.
* Crop and frame the subject of the video appropriately.
* Videos shouldn't include audio unless required by the example.
* Though a poster image is not required, it is recommended.

**Parameters**

`video` **requires** the following named parameters:

1. `src="/images/<video.mp4>"` - Video file path.
1. `info="<video description>"` - A string describing the video.

`video` supports the following **optional** named parameters:

1. `poster="/images/<image.png>"` - A static image that displays while the video loads or if the video fails to load. This image should be the same size and aspect ratio as the video. 
1. `autoplay="true"` - The video plays as soon as it loads.
1. `loop="true"` - The video plays in a loop.
1. `width="<video width>"` - Scale the video by specifying a width in pixels.
1. `muted="true"` - Video is muted if an audio track exists.
1. `type="video/<mp4 OR ogg OR webm>"` - Video type. MP4 is default.

The are two additional options that are always enabled.

1. `preload="auto"` - Loads the video with the page.
1. `controls` - Include player controls for the video.

**Examples**

1. Basic `video` usage with only the required parameters.

    ```markdown
      {{</* video src="/images/contributing/to-docs/TestVideo.mp4" info="This is a test video." */>}}
    ```
    Output:

    {{< video src="/images/contributing/to-docs/TestVideo.mp4" info="This is a test video." >}}

<br>

2. Advanced `video` usage with optional parameters to enable autoplay, loop the video, scale the video to 250 pixels, and include a poster image.

    ```markdown
      {{</* video src="/images/contributing/to-docs/TestVideo.mp4" info="This is a test video." autoplay="true" loop="true" width="250" poster="/images/contributing/to-docs/TestPoster.png" */>}}
    ```

    Output:

    {{< video src="/images/contributing/to-docs/TestVideo.mp4" info="This is a test video." autoplay="true" loop="true" width="250" poster="/images/contributing/to-docs/TestPoster.png" >}}

## Embedding Youtube videos with the `youtube-width` shortcode

Embed Youtube videos in your page by using the `youtube-width` shortcode. The `youtube-width` shortcode is an extended version of Hugo's built-in [`youtube` shortcode](https://gohugo.io/content-management/shortcodes/#youtube) that allows you to control the size of the embedded video. 

`youtube-width` supports the following double-quoted parameters:

1. id
2. title
3. width (using the default value (50%) is recommended)

**Examples** 

1. `youtube-width` example without the `width` parameter uses the default value `width: 50%`:

    ```markdown
    {{</* youtube-width id="CQmjAxr7LZs" title="What is O3DE?" */>}}
    ```

    Output:

    {{< youtube-width id="CQmjAxr7LZs" title="What is O3DE?" >}}

    <br>

2. `youtube-width` example with the `width` parameter:

    ```markdown
    {{</* youtube-width id="CQmjAxr7LZs" title="What is O3DE?" width="100%" */>}}
    ```

    Output:

    {{< youtube-width id="CQmjAxr7LZs" title="What is O3DE?" width="100%" >}}

## Embedding mathematical formulas in TeX and MathML

You can embed mathematical formulas using TeX and MathML input formats, for more information on the MathJax version 3.0 display engine, please refer to the MathJax [documentation](https://docs.mathjax.org/en/latest/index.html).

**Example Usage**

```markdown
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
```

**Example Output**

$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$