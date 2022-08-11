---
title: Exploring the world of graphics via Atom, O3DE’s renderer
date: 2022-07-13
slug: graphics-atom-intro
author: Judy Ng
blog_img: "/images/blog/graphics-atom-intro/atom-graphics-intro-thumbnail.png"
full_img: ""
---
Hello all! I'm Judy, an intern at Amazon working on the Open 3D Engine (O3DE), specifically the Atom renderer. I interned with Amazon in the summer of 2021, focused on contributing to Atom, and have returned to Amazon as an intern again this summer! So far, I’ve learned graphics fundamentals and applied that knowledge to write a custom shader and make my own material type. Here are some details about my journey learning about graphics and Atom.

## Learning through doing

Having minimal previous experience with graphics, I took the technology of the computer display for granted. However, through my work with shaders, I gained an appreciation for the complexity of displaying these millions of pixels that create images on a screen. Diving deeper into Atom, with complicated 3D graphics, I learned about *passes*, *materials*, and *shaders*. While I’d heard of these terms before, I didn’t know what exactly they meant, but the best way I learned about them was simply through my hands-on experience in working with them.

The first project in my internship this summer involved creating a material type with vertex shaders that allow for vegetation bending. This material type enables materials to appear to sway and bend naturally with the wind.

I began by simply editing a vertex shader of the *StandardPBR* material type to display the object at an offset from the original position. All I added was `position.x += 5`.

{{< image-width src="/images/blog/graphics-atom-intro/offset.png" width="100%" alt="The step of drawing the shaderball at an offset" >}}

I was ecstatic to see something show up at an offset from just this one line of shader code. However, I was quite confused as to why there was a gray outline of the material at the original position, with the texture offset as expected. This was when I realized the importance of passes. StandardPBR has many passes, with each pass rendering a different part of the material. In my case above, I had edited the vertex shader for the *forward pass*, while the *depth pass* still used an unedited vertex shader. These sequential passes were necessary because the outputs of one could be used as an input for another.

From there, I started writing my own material type. I referenced the shader code in a `.azsl` file via entry points in a `.shader` file, which itself was referenced in the overarching `.materialtype` file. This gave me a broad view of how Atom renders each material and also taught me the function of each shader resource group, function, pass, and more. While the number of files and connections were intimidating at first, once I became familiar with the terms and what each component did, I appreciated Atom’s pipeline organization and code modularization.

An interesting aspect of graphics that I noticed is the focus on optimization. While many fields of computer science promote optimization, graphics optimization appears particularly important because a low frame rate is obvious. Also, since graphics rely heavily on vector math and physics, optimizing graphics code isn’t necessarily limited to choosing which data structure or algorithm to use, but also which mathematical model to deploy. I encountered a simple example when I needed to use an oscillation function to mimic vegetation bending. The most obvious function is the sine wave. However, I learned that using sine is considered relatively slow, so it is more ideal to use a sine lookup table or to use triangle waves.

## Looking back

{{< image-width src="/images/blog/graphics-atom-intro/tree.png" width="100%" alt="The progress of making a tree." >}}

As I added more shader code and more passes, I saw my material evolving, eventually looking and swaying like a real-life tree! That, to me, was one of the most rewarding parts of using O3DE and writing shader code: the almost immediate visual feedback. Additionally, looking back at the process, I appreciate the beauty of how everything fits together. My material type uses multiple passes, with each pass editing a particular part of the material via my custom shaders.

{{< image-width src="/images/blog/graphics-atom-intro/tree-sway.gif" width="100%" alt="GIF of trees swaying." >}}

I'm thankful for this internship at Amazon, and for the experience to be part of the O3DE community and contribute to Atom while learning graphics. One of Amazon's leadership principles that resonates with me is [customer obsession](https://www.amazon.jobs/en/principles). This principle is reflected in the way Atom is built. Its shaders generally aren't written to be end-all be-all, but instead, are openly customizable. Because Atom is part of this real-time 3D engine, those who use the engine may want to make their own material types or write their own custom shaders. The material types included in O3DE seem to be common features that game developers may want, such as skin. While I was still new to graphics, working with these general-purpose materials was helpful since they served as great templates. In turn, the point of my projects for my internship this summer is to create and write tutorials to allow users to learn and create custom material types, just as I did.
