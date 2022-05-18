---
title: "Explore the Past, Present, & Future of O3DE's First-time User Experience"
description: "Learn about how Amazon Web Services developed the first-time user experience for Open 3D Engine (O3DE) from Bhanuja Sanghavi, one of the UX designers contributing to O3DE."
date: 2022-01-26
slug: o3de-ftue-blog-post-1
author: Bhanuja Sanghavi, Amazon Web Services
blog_img: "/images/blog/announcement_thumbnail.jpg"
---

_Learn about how Amazon Web Services developed the first-time user experience for Open 3D Engine (O3DE) from Bhanuja Sanghavi, one of the UX designers contributing to O3DE._

## Welcome to Open 3D Engine's New User Experience!

Hello, I'm Bhanuja! Since September 2020, I have had the opportunity to work as a User Experience (UX) Design Intern for Amazon on its game engine Lumberyard, the predecessor to Open 3D Engine (O3DE). Over the past year, I have worked closely with the UX, Engineering, and Product teams to research the engine's First-time User Experience (FTUE), as well as the solutions to improve the ease and efficiency with which users set up, learn, and create with O3DE.

From the instant that game developers and content creators install the engine for the first time to the moment they begin to dive deep into O3DE's distinctive feature set, the FTUE is essential for shaping the user's path and, eventually, their success in building with O3DE. I'll explain what I mean.

### Why does First-time User Experience Matter?

As humans, we tend to make snap judgements; our brains have evolved to do so. Why? So we can piece together information into understandable groups, and to help us avoid making poor decisions.

What does this have to do with the first-time user experience? Simply put, users take less than a second to form their first opinion of a product, with only a few more seconds to reinforce this first impression. FTUE *is* the comprehensive set of thoughts, insights, and feelings that users experience through their first interaction with a product.

We interpret FTUE as beginning with the engine installation and project creation. An assessment of the engine's capability through its tools and workflows follows closely behind. Finally, the building of an initial game concept completes the FTUE. It is a make-or-break moment for new users, even more so than any other moment of the user's journey.

As the UX team, we are responsible for creating experiences that are intuitive, correspond with user requirements, and are representative of countless user workflows. We are constantly researching and advocating for the needs of our users, so they have a smooth and delightful first-time experience. This allows users to quickly see the value of O3DE, increase their productivity, and unleash their creativity. Ultimately, this boosts the adoption rate at which users select O3DE to build their first game or simulation project.

### History of O3DE's First-time User Experience

Before understanding the present design of O3DE, let's look back at Lumberyard and its first-time user journey.

![Image of Amazon Lumberyard's Project Configurator from v1.28](/images/blog/bjds-posts/01-ui-project-configurator.jpg)

Lumberyard's first-time experience was reported as troublesome by existing users, and had disengaged many new users. During the initial stages, users were provided no assistance in their exploration and navigation of the Project Manager and Gem Catalog, or through the compilation of the build and resolution of errors.

This is where I came into the picture. Along with three other interns, I had the opportunity to work on a month-long Game Jam to learn about Lumberyard. Since we had never used the engine before, we provided our objective feedback for its FTUE. I was able to collect the issues with a diary study and provide my findings to all the other stakeholders. From that diary study, we learned how first-time users used Lumberyard, what their major blockers were, and how these issues occurred. We then generated a list of areas for improvement based on these research findings. Through this initiative, we considered the goals and frustrations of users, and assessed the User Journey Map shaped by the most common FTUE workflows within the engine: *Installation*, *Project Setup*, *Team Setup*, *Engine Exploration*, and *Game Design + Development*.

{{< image-width "/images/blog/bjds-posts/02-ftue-journey-map.jpg" "800" "Full journey map for the O3DE FTUE" >}} 

(*Open this image in a new browser tab to view it in full, or [click this link](https://o3de.org/images/blog/bjds-posts/02-ftue-journey-map.jpg).*)

Generally, the total duration of a user's first-time journey differs between products. We recognise, for O3DE, that these workflows typically take longer than a day to explore. This journey can inevitably be split into *Day 1*, *Week 1,* and *Month 1* phases. With each phase, the user evaluates distinct aspects of the engine, such as Script Canvas or the Material Editor, for their project.

In contrast to the User Journey Map above, the phases below note how a user works on the Game Design workflow in Week 1 as well as the Team Setup in Month 1. According to [Rev the Engine](https://youtu.be/oFeqw-0tsE4) user research, users typically begin their gameplay, actor, work, and look development before collaborating with their team.

![O3DE FTUE journey duration image](/images/blog/bjds-posts/03-ftue-journey-duration.jpg)

### It's always Day 1

Throughout the past year, I have observed a "Day 1" mentality here at Amazon. With this perspective, we're able to make high quality, high velocity decisions while improving through constant experimentation. In a similar way, a user progressing through O3DE's Day 1 workflow is concentrated on making smart (and fast) considerations while experimenting with the engine.

>"_It means being brave enough to fail if it means that by applying lessons learnt, we can better surprise and delight customers in the future._"&mdash;[**Daniel Slater**](https://aws.amazon.com/executive-insights/content/how-amazon-defines-and-operationalizes-a-day-1-culture/)

A user's first day typically consists of the Installation and Project Setup, or the user onboarding experience. User onboarding primarily involves users manoeuvring through a product so they can achieve results faster while trying to understand the product's value. In this case, the game engine.

To learn more about our users' understanding of their Day 1 experience, we carried out numerous studies by interviewing, surveying, and testing over 40 users with varied backgrounds. As a result of our research, we were able to identify the typical behavioural patterns of our users. This allowed us to propose areas of improvement&mdash;the Project Manager and Gem Catalog.

At this point, I worked with the UX team to redesign the Project Manager and Gem Catalog. For those who are new to this, Gems are packages of code or assets that augment game or simulation projects, and the Gem Catalog is a library of Gems that are native to O3DE. We conducted user interviews to understand the overall experience of the Gem system, any suggestions and issues, and the frequency with which users configure their project with Gems.

>"_One of our biggest problems is not knowing what Gems are given to us, when installing or upgrading the application._"&mdash;**O3DE Research Participant**

We found that it was difficult for new users to wrap their mind around the concept of Gems and their use within projects. With 80 Gems native to O3DE, the typical usage varies over two patterns—users either retain the default configuration throughout their development process or they enable all Gems to shorten build and compilation time. It was important to establish an information hierarchy, because of the Gems' low **findability** and **discoverability**.

**Findability**: The ease with which information can be found within a system.

**Discoverability**: The degree to which information can be found within a system.

The fundamental objective for the system's architecture was to allow users to be aware of where they are, what they found, what is around, and what to expect. As a result, we conducted a card sort study where participants were asked to arrange a stack of virtual cards into distinct categories based on their understanding of Gems. We identified the key category for the faceted navigation to be *Features*, which would classify Gems on the basis of their distinctive attributes and functionalities.

![O3DE UX card sort image](/images/blog/bjds-posts/04-card-sort-session.gif)

With the research findings in mind, we established a set of design principles. Our goal was to identify a design solution that aligns with these principles while addressing the needs of all users.

#### Discover, Find Search

Users must be able to explore the Gem Catalog efficiently. We improved the searchability of the catalog with filter, sort, and search functions. This allows users to make appropriate decisions for their project during Gem selection.

#### Reinforce Clarity to Foster Learning

The design must give users constant feedback to help them recognise and recover from errors. By providing help and documentation at all steps, and by creating a clear informational hierarchy we can help reduce error and encourage user confidence.

#### Autonomy to Encourage Contribution and Maintain Consistency and Standards

Users must be able to make their own decisions if they are to feel encouraged to contribute to the engine. We must ensure a design system that helps users to build consistent experiences with ease.

With the initial redesign, we continued to make gradual changes—most notably, the option to view the figurative "shopping cart" of Gems was introduced. Users could now see a list of all Gems they had added for activation. In addition, they could now view extensive information about Gems and were able to refine the list by the status of the Gem.

![Animated O3DE FTUE gem catalog iteration GIF](/images/blog/bjds-posts/05-launcher.gif)

### What's Next?

The outcome of the research has been a compilation of major issues new users face exploring the engine. Previously, it took users almost four hours to install Lumberyard, create a project, enable suitable Gems, and build. The process now can take less than ten minutes with O3DE!

With the growth of O3DE, we envision a great deal of community involvement to follow suit. We are focused on supporting the community through their first journey. In order to maintain, monitor, and manage the Gem Catalog's navigation structure, we see a need to create a systematic approach for addressing the large number of user contributions that accompany a rapidly growing community. Efforts to include community-submitted Gems in the Gem Catalog continue. We remain dedicated to examining and improving the First-time User Experience.

But this is not an endeavor we are working on alone. This is a community-wide effort, and we need your help! What would you like to see when you're onboarding with O3DE? Share your issues, suggestions for improvement, and overall experiences in the [O3DE Discord](https://{{< links/o3de-discord >}}) server! You can share your thoughts with the UX Design team and me directly on the **SIG-UI-UX** channel.

I'm looking forward to hearing from all of you soon!
