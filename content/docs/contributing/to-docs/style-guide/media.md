---
title: Submitting Media to Open 3D Engine Documentation
description: Guidelines for how to submit media (images, video, audio, or assets) as part of documentation.
linktitle: Media
weight: 600
toc: true
---

To add an image, use syntax similar to a link, preceded by an exclamation mark. The text in the brackets is displayed when the image does not load. Inside the parentheses is the link to the image asset, and an optional image title in double quotes.

Image example:

```markdown
![O3DE Logo](/img/logos/O3DE-Logo-with-WordMark-Black-Mono.svg "The O3DE logo")
```

Image output:

![O3DE Logo](/img/logos/O3DE-Logo-with-WordMark-Black-Mono.svg "The O3DE logo")

## Image file location

Images are placed subdirectories of the `/static/` directory of the O3DE documentation repository.

Guide-specific images, such as interface screenshots and diagrams, are located in subdirectories of `/static/images/`. The directory structure of `/static/images/` is a mirror of the directory structure of `/content/docs/`. Shared images like logos are placed in subdirectories of `/static/img/`. When submitting images as part of a PR, ensure the images are placed in the appropriate subdirectories.

## General image guidelines

In order to standardize presentation, and to keep the O3DE documentation repository below 1 GB, please adhere to the following guidelines when you create images for documentation:
  
* Text in images should follow all [copy guidelines](./copy).
* Do not include personal identification information (PII) in your screenshots. PII includes, but it not limited to, names, geographic information, project names, IP addresses, DNS names, and directory paths. We recommend you crop out areas of images that might contain PII and that you create projects specifically for documentation contributions that do not expose PII. Using common image filters to blur or disguise PII is not recommended as they can sometimes be reversed. To remove PII from an image:

  1. In any image editor, draw a rectangle selection box around the PII.

  1. Use the cut tool or **CTRL+X** to cut the information from the image completely.

  1. Fill the empty selection area with a solid color such as black or white.

  1. Save the edited image and include it with your PR.

    {{< important >}}
    Be sure to thoroughly examine all images for PII before adding them to a pull request!
    {{< /important >}}

## Screenshots

Screenshots are images of various O3DE user interfaces, or the interfaces of other applications such  as content creation tools.

* Use the PNG format (`.png`) for all screenshots.
* Take interface screenshots at HD resolution (1920x1080).
* Don't use aggressive compression for interface screenshots. Heavily compressed files may make text and UI elements less legible.
* Screenshots should not exceed 512 KB in size.
* Use the default interface scale for screenshots.
* Use the default interface color theme for screenshots.
* Use the default interface layout whenever possible.
* Don't scale screenshots that have interface elements.
* Crop interface images to contain only the necessary elements whenever possible.
* Screenshots for tutorial and user guide content should contain model, character, and texture assets freely available to O3DE users:
  * Assets distributed as part of O3DE.
  * Assets distributed with permissive and open source licenses such as those found at [The Stanford 3D Scanning Repository](https://graphics.stanford.edu/data/3Dscanrep/).
  * Assets that can be quickly replicated in open source content applications such as [Blender](https://blender.org) and [Krita](https://krita.org/).
  * If you use assets distributed by a third party, provide a proper attribution and link for the asset in the documentation.

## Artful images

Artful images are used for artistic or marketing purposes, such as images that demonstrate output from Atom renderer, or the fidelity of Atom materials.

* Use the PNG format (`.png`) or the JPEG format (`.jpg`) for artful images.
* Artful images may be up to UHD resolution (3840x2160).
* Artful images should not exceed 1 MB in size.
* Artful images may contain assets that are not freely available or easily replicated.

## Image annotations

* We suggest the open source tool [ShareX](https://getsharex.com/) for image annotation.
* Use as little text as possible in annotations. Add an ordered list below the image for text explanations of image annotations.
* Use the [Open Sans](https://fonts.google.com/specimen/Open+Sans) bold font in image annotations.
* Use US English in image annotations.
* Use solid color fills, not gradient fills.
* Avoid colors affected by colorblindness. We recommend using white text and Rhodamine Red C (RGB: 225,0,152 HEX: E10098) for image annotations. See the following annotated image example:

![Example of an image annotation](/images/welcome-guide/ui-editor-labeled.png)

## Diagrams

* Use a diagram tool such as [draw io](https://app.diagrams.net) to create diagrams.
* Use the SVG format (`.svg`) for diagrams.
* Keep diagrams simple. Break complex diagrams into smaller chunks.
* Use as little text as possible in diagrams.
* Use the [Open Sans](https://fonts.google.com/specimen/Open+Sans) font for diagram text.
* Use solid color fills, not gradient fills.
* Avoid colors affected by colorblindness. Be selective about tones of red, green, blue, and yellow.

## Animated images

Animated images are not currently accepted for contribution due to limitations on repository size. If you must demonstrate steps, use a horizontal two to four panel annotated image strip that demonstrates the start, action, and result of the process. See the example below:

![Example of an image strip](/images/contributing/to-docs/image-strip-example.png)

1. **Left-click** on the entity in **Perspective** to select it.
1. **LMB+Drag** on the transform gizmo's **Z** axis to move the entity on the world **Z** axis.