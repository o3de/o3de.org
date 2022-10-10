---
title: "2022 O3DE User Survey Report" 
date: 2022-10-12
slug: 2022-o3de-user-survey-report
author: Yuyi Hsu
blog_img: "/images/blog/announcement_thumbnail.jpg"
---
#### On a Mission to Continuously Improving the User Experience in O3DE

The O3DE user interface and user experience Special Interest Group (SIG UI-UX) conducted a survey in June 2022 with the goal to continuously improve the Open 3D Engine (O3DE) experience for developers, artists, content creators and other users. Results from over 200 participants provided a snapshot that will be used to guide the evolution of features, capabilities and enhancements to improve user experience in future releases of O3DE. 

The survey collected user feedback on the O3DE user experience based on nine common game development workflows: Onboarding, Game Design, Actor Development, World Building, Look Development, Multiplayer, Team Collaboration, Engine Extension, and Packaging & Deployment. Within each workflow, users were asked to rate:

- Workflow satisfaction: how satisfied they are with the workflow.
- Workflow confidence: how confident they feel that they achieved their stated objectives after completing the workflow.
- Workflow efficiency: how efficient they feel about their time spent on the workflow.
- Feature satisfaction: how satisfied they are with using the features within the workflow.

#### What Did We Find?

Results from the [final survey report](https://github.com/o3de/sig-ui-ux/blob/6c82e950ad7e162de25a45df1adcf4528a907506/user-research/2022%20Q2%20O3DE%20User%20Experience%20Survey.md) suggest areas of improvement across all nine workflows surveyed. The two highest performing workflows are Onboarding and Look Development, which suggests the data-driven plan to focus on improvements for these two workflows has been received positively, enabling users to finish these workflows within a reasonable amount of time. Meanwhile, six workflows, including Actor Development, World Building, Multiplayer, Team Collaboration, Engine Extension, Packaging and Deployment, received lower ratings, which suggests these workflows require the greatest improvement.

{{< image-width src="/images/blog/user-survey-2022/survey-2022.png" width="100%" alt="Mean Ratings Across 3 User Experience Metreics" >}}

We also asked users to rate their experience with the features within the workflow. The data indicates that the Help System across O3DE, the integration with version control tools, the tooling for the World Building workflow (e.g. Terrain and Dynamic Vegetation), the Physics System, and the asset management experience (including Asset Browser) received lower satisfaction ratings, ranging from 2.5 to 2.8. The UX performance of these features could be the reason that drove lower ratings in their designated workflows.

#### Using Qualitative Data to Deepen Understanding

While this _quantitative_ survey data can point to areas of overall improvement in O3DE’s user experience, we need _qualitative_ data to inform a deeper understanding of the results to guide the future evolution of the engine’s user experience. During the summer months, qualitative interviews were conducted with 20 community members, focused on the five common workflows that users employ when building their content with O3DE: Onboarding Experience, Actor Development, Look Development, Multiplayer, and Engine Extension.

Through these interviews, 138 issues were identified that either block or impact users from accomplishing their tasks. Using this quantitative data to pinpoint and prioritize areas for improvement and more deeply understand these areas, SIG UI-UX worked with all of the other SIGs to improve these five workflows. You can find the issues tracked in [2022 Walk The Engine Issues Dashboard](https://github.com/o3de/o3de/projects/15) in GitHub.

In late October 2022, a development branch with the critical issues we identified and fixed will be released. Then, towards the end of the year, we will use this branch to conduct another round of O3DE UI/UX research to verify if the improvements meet user expectations.

#### What Other Suggestions Do We Have?

We will continue to address the issues identified in this research to improve the user experience, simplify the onboarding experience, lower the learning curve, deliver greater efficiency to users, and otherwise increase confidence in using O3DE. Simultaneously, we also suggest that the related SIGs delve into the following areas and improve their user experience holistically.

1. World Building is a critical workflow in the game development cycle, yet the satisfaction and confidence ratings for this workflow in O3DE are low (2.95 and 2.18, respectively). The satisfaction ratings for the tooling (e.g. Terrain and Dynamic Vegetation) are also low (below 2.8). 
2. Packaging and Deployment enable users to test their games with others on the designated platforms to gather early feedback; however, the tools we have today to support this workflow are not meeting user expectations. Users are looking for a one-click button that allows them to easily test or review their project on the designated platforms.
3. Physics plays a critical role in game development to help the game achieve realistic behavior and special effects, yet the physics feature in O3DE has dispersed entry points and UIs that make it difficult for users to learn the processes and effectively set up the various physics effects in the game (e.g. colliders, ragdoll, physics joints, cloth, etc.).
4. Asset Browser is one of the most used features in O3DE, but today, users are unable to easily manage and search for their assets. 
5. Help System was rated low (below 3) across all nine workflows; of these, the onboarding experience scored highest at 3.2 of 5. The issues with the Help System can be categorized into three areas: confusing site information architecture, lack of use-case-oriented content (e.g. tutorials), and inaccuracy of the information provided.

#### What's Next?

If you are interested in improving the user experience in O3DE with us, there are two ways to contribute. First, we invite you to join our upcoming study to provide your feedback on using O3DE. Second, we encourage you to join us on this journey by checking out the [Walk the Engine Issue Dashboard](https://github.com/o3de/o3de/projects/15), identifying 2-3 issues that are most relevant to you, and working on the solutions for them.

If you would like to dive into the details of the O3DE Survey Results Report, check out the [detailed report here](https://github.com/o3de/sig-ui-ux/blob/main/user-research/2022%20Q2%20O3DE%20User%20Experience%20Survey.md). And reach out to [SIG UI-UX](https://github.com/o3de/sig-ui-ux) if you have any questions or feedback about the survey findings—we’d love to hear from you!
