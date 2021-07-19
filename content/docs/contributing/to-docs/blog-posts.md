---
linkTitle: Blog Posts
title: How to Submit a Blog Post for o3de.org
description: How to create and publish a blog post for display and sharing on o3de.org.
toc: true
weight: 600
---

Blog posts are an important and semi-formal way to deliver announcements, insights, learnings, and professional opinions for the O3DE org and the greater public. Part of growing as a community is establishing a strong blog presence, and we'd love for you to contribute! Here's how.

## Before you start

Blog posts are "ephemeral"&mdash;specifically, they represent a moment in time and have a level of relevance that peaks when published and rapidly falls off as projects progress. In a few select cases, they contain practical advice or technical information that simply doesn't make sense in the larger body of [O3DE technical documentation](https://o3de.org/docs/).

In contrast, technical documentation is "durable" (although much of it requires active update and maintenance). When you have a content idea, ask yourself: Is this ephemeral or opinionated content? If so, it's a blog post. If it's durable and focuses on understanding and using the product, it may be a better fit in the technical docs. If you're unsure, ask **sig-docs-community** on Discord or the sig mailing list.

To draft and submit a blog post, you will need:

* A GitHub account known to O3DE and a basic understanding of simple Git workflows
* A working knowledge of Markdown syntax

If you have never participated in our communities before, we highly recommend you spend some time socializing in them and joining at least one SIG meeting before you start blogging. Regardless, blogs will be reviewed by community maintainers before they are published.

## How the O3DE blog works

It's just like the [docs contribution workflow](get-started.md).

1. Fork the https://github.com/o3de/o3de.org repo.

2. Clone your fork to your local machine. Set `upstream` to o3de.org and `origin` to your fork.

3. Create a branch (preferably one specific to JUST your blog post) for submission.

4. Open your editor of choice and create a draft post using Markdown under thr `/content/blog/posts` folder. Give it a clear, unique filename in all lower-case, with no spaces. (Please use a hyphen `-` as a replacement for spaces. Avoid all other non-alphanumeric characters.)

5. Make sure that your blog post has the following metadata at the top:

    ```metadata
    ---
    title: "YOUR TITLE IN QUOTES HERE. KEEP IT LESS THAN 80 CHARACTERS."
    date: YYYY-MM-DD
    slug: UNIQUE STRING FOR YOUR POST
    author: YOUR PREFERRED AUTHOR NAME HERE. EMPLOYER IS OPTIONAL!
    blog_img: "/images/blog/YOUR-OPTIONAL-ASSOCIATED-IMAGE-THUMBNAIL-HERE"
    full_img: "/images/blog/  YOUR-OPTIONAL-ASSOCIATED-FULL-IMAGE-HERE"
    ---
    ```

    As an example:

    ```metadata
    ---
    title: "Announcing Open 3D Engine!"
    date: 2021-07-06
    slug: welcome-post
    author: Doug Erickson, Amazon Web Services
    blog_img: "/images/blog/announcement_thumbnail.jpg"
    full_img: "/images/blog/atom_showcase.png"
    ---
    ```

    Note that the blog is automated and that the `date` field determines when the blog will first become visible if your pull request is accepted and merged.
6. Commit your changes to your branch. **Ensure your commit(s) are DCO signed!***

7. Push your branch to your fork (`origin`). Go to your fork on GitHub and create a pull request from your fork/branch to o3de/o3de.org/main (`upstream`).

8. Go to your pull request at https://github.com/o3de/o3de.org/pulls and ensure that all checks have passed. If they haven't, fix up your pull request and resubmit it.

9. Go into the O3DE Discord server and share your pull request for review. (Alternatively, mail the sig-docs-community mailing list with a link.) Someone will review it and provide feedback or an okay. A maintainer will merge it when at least one reviewer approves it.

{{< note >}}
The O3DE Community reserves the right to not publish any blog post that does not meet our standards. We also reserve the right to remove any currently published blog post that might conflict with the agreed-upon O3DE strategy or delivery.
{{< /note >}}

## What makes a good O3DE blog post?

Good question! That's really up to the community alongside our established Code of Conduct and Community Tenets. Not sure? Join the O3DE Discord or one of the SIGs, and vet your idea with our members.

Here's some basic Do's and Don'ts to help you scope your effort and avoid an obvious rejection.

**Do:**

* Discuss O3DE! (Duh.) Go deep! Highly technical blog posts, in particular, establish community credibility and provide a resource for people looking for deeper knowledge beyond the tech docs.

* Discuss algorithms, techniques, technologies, and tools that apply directly to O3DE work. Again, not only is your knowledge and experience useful to capture as a published topic, but it helps the larger industry assess the caliber of the people building O3DE.

* O3DE strategy, **if** you are actively participating in a SIG around feature or product strategy, **and** have the approval of a SIG.

* Interviews with, or profiles of, important and established community members. People put a human face on a technical product, and the world reliably likes to hear humans say they have to say. In this case, it should be professional observations, knowledge, and commentary&mdash;and shuld be specifically related to O3DE. Personal opinions, as ever, should be largely technical.

* Write with strong grammar and an eye for easy readability. Rambling monologues may get a gentle request for editorial review and a number of suggestions to "tighten it up". The reader's time is precious, so compressing your thoughts into short, information-dense sentences with regular paragraph breaks is just respectful.

* Include images and diagrams wherever appropriate.

* Consider your audience, which is diverse across many sociocultural and industry axes. Choose your words with respect and care, and be prepared to take feedback sincerely and make changes. No-one knows everything about the folks in the community and the industry, so don't let some initially careless wording caught in review bring you down; just make the changes, internalize the feedback, and keep delivering great content!

**Don't:**

* Get personal. We have no tolerance for using the O3DE blog to call out community individuals&mdash;or any individuals, really&mdash;in any negative way, no matter how concerned you are.

* Get political. Politics pervade every part of life, and we all have different backgrounds, ideologies, and reactions to the way in which culture and society shapes itself. The O3DE blog isn't the place for it, unless you are running a community-approved political initiative and have the blessings of the Linux Foundation.

* Attack or criticize other products, platforms, or companies directly. Showing perf data between O3DE and a similar product/feature pairing is one thing; slagging on a similar product or another company is another. The latter will not be tolerated, regardless of how strongly you feel on the subject.

* Get too egotistical or too hyped. Choose your modifiers and adverbs with care to not oversell (or undersell) anything. Also, while a blog series can really help your resume (if done thoughtfully), the O3DE blog is ultimately about, well, O3DE. Not you.

