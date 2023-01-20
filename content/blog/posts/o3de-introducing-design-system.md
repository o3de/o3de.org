---
title: "Introducing the Blue Jay Design System for O3DE"
description: "Learn about the new UX design model for Open 3D Engine (O3DE) from Lee Hung Nguyen, one of the UX designers contributing to O3DE."
date: 2022-02-03
slug: intro-to-bjds
author: Lee Hung Nguyen, UX Designer in the SIG UI UX community
blog_img: "/images/blog/announcement_thumbnail.jpg"
full_img: "/images/blog/bjds-logo.jpg"
---

Learn about the new UX design system for Open 3D Engine (O3DE) tools from Lee Hung Nguyen, one of the UX designers contributing to O3DE.

My name is Lee Hung Nguyen, and I am one of the UX Designers in the Special Interest Group for the UI UX community (SIG-UI-UX) that helps to contribute towards the Open 3D Engine (O3DE).

Today, you'll be learning about the design system that the SIG UX UI community has been working on: **the Blue Jay Design System (BJDS).**

### What is the Blue Jay Design System?

**The Blue Jay Design System (BJDS) is a unified design and development system for designers and developers who want to extend the O3DE editor. It consists of a design library of reusable UI components and UX pattern guidelines. Ultimately, these guidelines will help define a more consistent, productive experience for all O3DE users when followed.**

The main goal of BJDS is to help teams build high-quality and consistent digital experiences in O3DE. By utilizing reusable and modular UI components, we can align anyone contributing to the editor's expansion with faster and more consistent development workflows. As 3D engines generally have a high level of complexity for their use cases, we should prepare ourselves for the range of multiple workflows that come with it.

That's why a design system is essential to keep things consistent—to ensure that our workflows and design elements stay consistent and aligned with the greater goal of a usable and intuitive product.

The best way to make sure that tools in the editor are consistent would be to develop a complete set of design standards intended to manage at scale using reusable components and patterns. But first, let's talk about the problems our users was facing based off some research I done with people in the community.

My first port of call was to talk to some the larger partner teams that had already contributed a bunch of great extensions to the engine, but as well as individual solo contributors that use O3DE as a side hobby. We asked questions like; "What things that you have contributed to O3DE?" and "Why was this feature a need for you (and or your team)?".

We discovered that a lot of our contributors were reinventing the wheel on problems that already had solutions. Not because they wanted to. It was because without any proper system in place to help guide the developers on how things should be done, this led to developers doing what felt best for them.

This caused inconsistent replications of the same functionality for our workflows! Which isn't really scalable for an open source community. We knew that the intention for our contributors were positive, but it was just the lack of guidance missing to help put them on the right path. 

So understandably some sort of unified framework for the cross-functional teams is needed. This would help raise the quality bar of standards for consistency in O3DE. As the contributors lacked a central framework to align to, teams would just instinctively work on their own solo initiatives, further breeding inefficiencies. Something that is not ideal for a collaborative community.

To further ensure that the editor upholds the high quality bar defined by these standards, we developed some tenets that contributors should follow:

![Diagram showing the tenets of the O3DE design system](/images/blog/intro-to-bjds/tenets-diagram.jpg)

* **Efficiency:** User interactions and workflows should value efficiency and ease of use.
* **Accessibility:** Accessibility options, such as color contrasts, font and icon legibility, interactions and scalability are built into our the tool from the first step.
* **Familiarity:** Align to our standards of the visual interfaces, tools, branding, and UI elements. No need to reinvent the wheel and confuse users.
* **Modularity:** The key to each element of O3DE, including the interface design and component development.

These tenets were formed to be straightforward and easy to remember. We want to ensure that the BJDS tenets are flexible enough for the community to embrace and employ when contributing to the engine.

### What's included in the Blue Jay Design System

**The Blue Jay Design System** is made up of a set of standardized components and layouts to help accelerate the creation of new workflows in the Editor. It also has [supporting documentation](https://o3de.org/docs/tools-ui/) on the O3DE Learn website, which details the following:

#### UI Components

UI components are the various individual widgets that make up the editor experience. The BJDS documentation outlines details like visual markup properties, rules about how to use them, and guides about when to use them and in which scenario. Currently, with [20 UI components](https://o3de.org/docs/tools-ui/component-library/) detailed (and more coming), these documentation include code samples and API references to integrate into your editor extension.

If you are looking for information on key building blocks that O3DE uses, [UI Components](https://o3de.org/docs/tools-ui/component-library/) is the right place to read. It's the systematic reuse of these components that make up the visual and functional consistency across O3DE.

![Preview @mdash; for the O3DE UI component guidelines](/images/blog/intro-to-bjds/ui-components-preview.jpg)

#### UX Patterns

UX Patterns are a series of best practice solutions that a designer or developer should follow when creating new workflows and components in the Editor. Unlike UI Components, which is mostly about the visual aesthetics and how it mechanically operates, UX Patterns is more about how a user interacts and behaves for a task with a goal in mind.

For example, the anatomy of a component card and it's different types can be found in the [UI Component > Card](https://o3de.org/docs/tools-ui/component-library/uidev-card-widget/) page. What contents go in the card, how a user interacts with it and how O3DE interacts with the card itself can be found in the [UX Patterns > Component Card UX Patterns](https://o3de.org/docs/tools-ui/ux-patterns/component-card/) page.

![Preview image for the O3DE component card guidelines](/images/blog/intro-to-bjds/componentcard-ux-preview.jpg)

Currently we have two UX Pattern pages on O3DE Learn: Component Card and UI Messages for Error Handling. We plan to roll out more pages in the coming months, so stay tuned.

#### O3DE Branding Guidelines

Our [brand guidelines section](https://o3de.org/docs/tools-ui/branding-guidelines/) includes information on how to apply the O3DE brand and downloadable assets such as a PDF style guide, logos files, fonts and so on. These pages are especially important if you are looking to represent the O3DE logo in your product or marketing website.

![Preview image for the O3DE branding guidelines](/images/blog/intro-to-bjds/branding-guidelines-preview.jpg)

If there's a missing asset that you're looking for, don't hesitate to [file a ticket](https://github.com/o3de/sig-ui-ux/issues/new/choose) and the community will help get the right asset you need. We are always happy to help!

### Blue Jay Design System's Roadmap

![Diagram showing the tenets of the O3DE design system](/images/blog/intro-to-bjds/roadmap2.jpg)

Above is our planned roadmap for 2021-2022. These timeframes are estimates based off of our current SIG-UI-UX contributions rate. Times may vary; if we are able to gather more community support and help, items could be completed even sooner.

For a full detailed breakdown on our roadmap, you can read it [here](https://github.com/o3de/o3de.org/projects/8).

#### Looking Forward

The next steps for BJDS involve planning out resources and commitments towards achieving these goals. As Phase 2 comes to a close soon, Phase 3 will be achievable with the help of the SIG-UI-UX community effort. As a core contributor towards this design system, I am looking to help kick-start some of these new pages.

If you would like to help contribute towards the efforts here—by reviewing, writing or letting us know to remind you when we want some feedback—let us know in the #sig-ui-ux channel on [Discord](https://discord.com/invite/o3de)! All the extra eyes and hands are a massive help.

You can see here that the BJDS has big dreams and ambitions. At its core, it's just a design system for an open-source, 3D engine. But as an end goal, we want this to be much more than that.

**We want Blue Jay to become the best design system that all 3D engines can depend on to set the quality benchmark for industry standards.**

This is just the beginning. Let's do it together!
