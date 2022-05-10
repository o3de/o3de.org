---
linkTitle: Blog Posts
title: How to Submit a Blog Post for o3de.org
description: How to create and publish a blog post for display and sharing on o3de.org.
toc: true
weight: 600
---

Blog posts are an important and semi-formal way to deliver announcements, insights, learnings, and professional opinions for the **Open 3D Engine (O3DE)** organization and the greater public. Part of growing as a community is establishing a strong blog presence, and we'd love for you to contribute! Here's how.

## Before you start

Blog posts are "ephemeral" &mdash; they represent a moment in time and have a level of relevance that peaks when published and rapidly falls off as projects progress. In a few select cases, they contain practical advice or technical information that simply doesn't make sense in the larger body of [O3DE technical documentation](https://o3de.org/docs/).

In contrast, technical documentation is "durable" (although much of it requires active update and maintenance). When you have a content idea, ask yourself: Is this ephemeral or opinionated content? If so, it's a blog post. If it's durable and focuses on understanding and using the product, it may be a better fit in the technical docs. If you're unsure, ask **sig-docs-community** on Discord or the sig mailing list.

To draft and submit a blog post, you need:

* A GitHub account known to O3DE and a basic understanding of simple Git workflows
* A working knowledge of Markdown syntax

If you have never participated in our communities before, we highly recommend you spend some time socializing in them and joining at least one SIG meeting before you start blogging. Regardless, blogs will be reviewed by community maintainers before they are published.

## How the O3DE blog works

Blog posts are submitted through the same process as the [docs contribution workflow](./get-started).

1. Fork the https://github.com/o3de/o3de.org repo.
1. Clone your fork to your local machine. Set `upstream` to o3de.org and `origin` to your fork.
1. Create a branch for submission. This branch should contain _only_ the necessary content additions for your blog post.
1. Open your editor of choice and create a draft post using Markdown under the `/content/blog/posts` folder. Give it a clear, unique filename in all lowercase, with no spaces. (Use a hyphen `-` as a replacement for spaces. Please do not use any other non-alphanumeric characters.)
1. Make sure that your blog post has the following metadata at the top:

    ```metadata
    ---
    title: The title of your blog post. Please keep it under 80 characters.
    date: YYYY-MM-DD
    slug: <Unique string for your post, usually a condensed form of the title>
    author: YOUR PREFERRED AUTHOR NAME HERE. EMPLOYER IS OPTIONAL!
    blog_img: "/images/blog/<optional thumbnail>"
    full_img: "/images/blog/<optional full image>"
    ---
    ```

    As an example:

    ```metadata
    ---
    title: Announcing Open 3D Engine!
    date: 2021-07-06
    slug: welcome-post
    author: Doug Erickson, Amazon Web Services
    blog_img: "/images/blog/announcement_thumbnail.jpg"
    full_img: "/images/blog/atom_showcase.png"
    ---
    ```

    {{ note }}
    Blog posting is automated and the `date` field determines when the blog will first become visible if your pull request is accepted and merged.
    {{ /note }}
1. Commit your changes to your branch. **Ensure your commit(s) are DCO signed!**
1. Push your branch to your fork (`origin`). Go to your fork on GitHub and create a pull request from your fork/branch to `o3de/o3de.org` against the `main` branch.
1. Go to your pull request at https://github.com/o3de/o3de.org/pulls and ensure that all checks have passed. If they haven't, fix up your pull request and resubmit it.
1. Go into the [O3DE Discord](https://discord.gg/o3de) and share your pull request for review, or send an email to the [O3DE Documentation & Community SIG](https://lists.o3de.org/g/sig-docs-community) mailing list. Someone will review it and provide feedback or an okay. For blog posts, we go through the regular pull request review process with an additional requirement that a relevant SIG, the TSC, or the O3DE marketing committee approve the blog post.
 
{{< note >}}
The Open 3D Foundation and the broader Open 3D Engine community reserve the right to not publish any blog post that does not meet our standards. We also reserve the right to remove any currently published blog post.
{{< /note >}}

## What makes a good O3DE blog post?

Good question! That's really up to the community alongside our established Code of Conduct and Community Tenets. Not sure? Join the O3DE Discord or one of the SIGs, and vet your idea with our members.

Here are some basic "Dos and Don'ts" to help you focus your work and avoid rejection.

### Do

* Discuss O3DE! Go deep! Highly technical blog posts, in particular, establish community credibility and provide a resource for people looking for deeper knowledge beyond the tech docs.

* Discuss algorithms, techniques, technologies, and tools that apply directly to O3DE work. Again, not only is your knowledge and experience useful to capture as a published topic, but it helps the larger industry assess the caliber of the people building O3DE.

* O3DE strategy, **if** you are actively participating in a SIG around feature or product strategy, **and** have the approval of a SIG.

* Interviews with, or profiles of, important and established community members. People put a human face on a technical product, and the world reliably likes to hear humans say what they have to say. In this case, it should be professional observations, knowledge, and commentary&mdash;and should be specifically related to O3DE. Personal opinions, as ever, should be largely technical.

* Write with strong grammar and an eye for easy readability. Rambling monologues may get a gentle request for editorial review and a number of suggestions to "tighten it up." The reader's time is precious, so compressing your thoughts into short, information-dense sentences with regular paragraph breaks is just respectful.

* Include images and diagrams wherever appropriate.

* Consider your audience, which is diverse across many sociocultural and industry axes. Choose your words with respect and care, and be prepared to take feedback sincerely and make changes. No one knows everything about the folks in the community and the industry, so don't let some initially careless wording caught in review bring you down. Make the changes (as appropriate) and keep delivering great content!

### Don't

* Get personal. Do not use the O3DE blog to call out any individuals in a negative way.

* Get political. Politics pervade every part of life, and we all have different backgrounds, ideologies, and reactions to the way in which society shapes itself. The O3DE blog isn't the place for it&mdash;unless you are running a community-approved political initiative and have the blessings of the Linux Foundation.

* Attack or criticize other products, platforms, or companies directly. Showing perf data between O3DE and a similar product/feature pairing is one thing; however, slagging on a similar product or another company is another. The latter will not be tolerated, regardless of how strongly you feel on the subject.

* Exaggerate or overstate your points. Choose your modifiers and adverbs with care to not oversell (or undersell) anything. Favor humble and insightful phrasing and messages over performative or provocative ones. For example, "We've seen a recent increase in users looking for a Physics solution and we're working on a solution" is a little gentler than "The world demands a Physics solution from O3DE and we're here to deliver!" Not sure how to frame your message? Talk to the community in Discord!
