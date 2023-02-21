---
linkTitle: Blog Posts
title: How to Submit a Blog Post for o3de.org
description: How to create and publish a blog post for display and sharing on o3de.org.
toc: true
weight: 600
---

# Blog Process

 This guide provides guidance on the process of publishing a blog on the O3DE website. This document covers selecting a topic, identifying an author, designing the blog, and publishing on site. Additionally, it offers troubleshooting tips in case any issues arise during the blog's publication. 

 To ensure a smooth publishing process, it is crucial to keep all relevant parties informed about the scheduled release date and any updates related to it. This includes the author of the blog and other stakeholders, such as the Marketing Committee. Clear communication with all parties involved can prevent any confusion or delays in the publishing process.

Checklist

- [ ] 1. Identify potential blog
- [ ] 2. Identify person who will write the blog
- [ ] 3. Plan date for blog arrival
    - [ ] 3.1. Plan allocated time for when blog may be delayed
    - [ ] 3.2. Plan soft date for publish
- [ ] 4. PR Stage
    - [ ] 4.1. Markdown design
    - [ ] 4.2. Publish date finalized
    - [ ] 4.3. Social Media
    - [ ] 4.4. PR Stage Timeline
    - [ ] 4.5. Testing the blog on local machine
- [ ] 5. Social Media
- [ ] 6. Blog goes live
    - [ ] Follow-up
        - [ ] 7.0. Check to make sure blog is live on day its supposed to. 
        - [ ] 7.1. Contact Docs if blog has not gone live
    - [ ] Social Media posting
        
        

Terms:
PR - Pull Request
SIG - Special Interest Group
TSC - Technical Steering Committee


1. **Identify potential blog**
    If you're searching for content, it's advisable to focus on the latest additions to the engine. Pay attention to the upcoming features, popular discussion topics, and PRs that are gaining momentum. Additionally, take note of the topics that generate interest during SIG  or TSC meetings. 
2. **Who is writing the blog?**
    To find a suitable candidate for writing the blog, begin by identifying the area of the feature you wish to highlight. Determine which SIG it's related to and whether there's a PR with a designated feature owner. Look for an individual who's showcasing the feature or someone on from within their SIG. Start by reaching out to them and asking if they're interested in writing the blog.
    
    If the blog is technical in nature, it's crucial that it's written by the engineer responsible for designing the feature. They can best provide a clear representation of what the feature is attempting to showcase.
    
3. **Plan date for blog arrival**
    Once you've found a blog writer, you'll need to discuss with them their availability to complete the blog. Avoid pressuring them, especially if they have a busy schedule. It's advisable to ask for a deadline and add a few extra days to allow for unexpected delays. 
    1. **Plan allocated time for blog**
         If the author estimates that they can finish the blog by March 1st, it's typical to plan for the blog to arrive between March 7th to 14th. This provides a buffer in case any unexpected last-minute tasks arise that need to be addressed before the blog can be finalized. 
    2. **Plan soft date for publish**
         Once you have a deadline, it's essential to schedule a soft date on the calendar. This date allows you to plan for other blogs and events around it. Make sure to consider the PR stage and social media while planning. 
        
4. **PR Stage** 
    This stage involves creating the PR and submitting the blog, and it typically requires the most effort. You'll need to complete the blog in markdown, which entails formatting it correctly and adding any necessary links and images. Make sure to adhere to the Website Markdown guidelines on the following page: https://github.com/o3de/community/tree/main/markdown/o3de-website/website-markdown
    1. **Markdown Design**
        In order for the blog to render properly (Show on the website in proper format), it is required that you follow a few steps. The markdown guide can be found in https://github.com/o3de/community/tree/main/markdown/o3de-website/website-markdown and includes templates, examples and code that can be used to help draft a markdown of the blogs. To view how this would look, refer to step 4 part e. 
    2. **Publish date finalized**
         Once you have the completed blog in your possession, you can start planning for its release date. It's important to allow enough time for the PR stage, which typically takes 1-2 weeks (7 to 14 days) to ensure the blog is properly reviewed and any necessary corrections are made before it's merged. During the PR stage, you can also plan for the social media promotion of the blog. 
    3. **Social Media**
         Now that you have a blog in the PR stage, it's important to reach out to the Marketing team either through Discord or email. This will help you establish a firm release date and allow the team to create a social media promotion package for the blog. The Marketing team will handle the entire social media promotion of the blog. 
    4. **PR Stage Timeline**
        During the PR stage, the blog goes through a review process by multiple parties to ensure that it follows the correct technical format, proper referencing, and appropriate linking. This is a standard practice to catch any missing or incorrect information and make necessary corrections.
        
         To merge the blog into the main website, at least two individuals must approve the PR. 
        
        It is recommended to allow for 1-2 weeks (7 to 14 days) for the blog to be merged from the time of submission into PR. Rushing the process may lead to errors or missing the intended publication date.
    5. **Testing how the blog displays**
        If you want to test to see how the blog looks before it goes live. This is normally the best practice to ensure that everything renders properly, then you will need to either configure your machine to build the site locally or ask someone to build the site and send images over to you. 
        
        If testing locally, the best guide would be the up-to-date date here. https://github.com/o3de/o3de.org, Once you have a working build, to get the blog to show on the list, it would be required to run the following command: 
        `Hugo Server -F`
        This ensures that the build of the website is built in the future and will be able to view the blog as if it was publication day. 
        
5. **Publication Day**
     After the blog is published, it's crucial to confirm that it's live. If it's not, you'll need to take the necessary steps to address the issue. It's recommended to check on the morning of the blog's release to avoid forgetting about it or potentially affecting the publication of future blogs. 
    1. **Blog Follow-up**
         It's crucial to ensure that the blog is successfully published and available to the intended audience on the planned day of release. 
        1. **Check the PR**
             If the blog hasn't gone live, check the associated PR. If the PR hasn't been merged, the blog won't go live until it's completed. However, if the PR has been merged, proceed with the next steps. 
        2. **Contact Docs**
            If the PR has been merged, but the blog isn't live on the intended day, the next step is to contact the Docs & Community SIG. As of the writing of this guide, they're best equipped to assist in getting the blog live. In most cases, the issue can be resolved quickly with just a few clicks. Once the issue is resolved, you can proceed with the next steps.
    2. **Social Media posting**
         After the blog is live, the next step is to share it on social media platforms such as LinkedIn, Twitter, Discord, and more. These platforms are the best places to reach the largest number of users and keep the community informed and engaged with the latest releases. 
        
This guide is a mirror of https://github.com/o3de/community/tree/main/markdown/o3de-website/ and should be updated together. 
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
