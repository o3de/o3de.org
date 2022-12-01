---
title: "SIG Simulation Highlight"
date: 2022-10-26
slug: sig-simulation-highlight
author: Nicole Huesman
blog_img: "/images/blog/announcement_thumbnail.jpg"
full_img: "/images/blog/sig-simulation/highlight.png"
---

This summer marked the Open 3D Engine’s first year, and with it, the celebration of the Engine’s immense growth in members, code contributions, and much more. With this incredible momentum came a recent election of a new chair and co-chair for Special Interest Group (SIG) Simulation, a vital part of the project, from [Huawei](https://www.huawei.com/). As a Premier member of the [Open 3D Foundation](https://o3d.foundation/) (O3DF) and a major contributor to the Engine, Huawei understands the importance of [SIG Simulation](https://github.com/o3de/sig-simulation) to the Open 3D Engine (O3DE). We sat down with new Chair and Co-Chair of SIG Simulation, Lars Gleim and Bo Gao, to discuss their insights into this SIG’s essential work and their hopes for O3DE’s future.

#### Please tell us a little bit about yourself.

**Lars**: My name is Lars Gleim. I’m a senior research engineer at Huawei’s Munich Research Center in the cloud robotics lab, where we are currently building software for simulation and cloud-native operation of robots. I previously completed my Ph.D. studies in Computer Science at RWTH Aachen University, where I was building systems and architecture for data management, basically inter-organizational, cloud-edge scenarios. I’m also the O3DE SIG Simulation Chair.

**Bo**: My name is Bo Gao, and I’m currently a principal research engineer in Huawei’s 2012 Lab, responsible for the development of a physics engine. I have more than 10 years of experience in algorithm development and specialize in using mathematical methods to solve problems. I received my Master of Science degree in Applied Mathematics at Lanzhou University in 2011. In addition, I’m Co-Chair of O3DE SIG Simulation.

#### What is your experience with open source, and what do you find appealing about it? 

**Lars**: My experience with open source software began as a longtime user of applications such as GIMP, as an alternative to Photoshop, or Notepad++. I eventually started engaging with open-source projects through filing issues and starting conversations with the developers, which I found much more engaging than working with commercial software where usually you don’t have any way to interact with the developers unless you have a commercial support subscription. 

I then started developing my own software and submitted the first merge request for the launch of an open-source project, which was really encouraging because it was immediately picked up and received positive feedback from the developers. I was able to fix bugs for thousands of users around the globe.

During my Ph.D., all the contributions I made were released into open source because it’s essential for open peer review in the scientific process. It’s important to enable reuse for open collaboration across organizations for the rapid development and adoption of new technologies. Without open source, we would not have seen the same level of technology-driven disruption in all industries that has contributed tremendously to making life easier, safer, and more enjoyable in the last 10 to 30 years.

**Bo**: I’m also a beneficiary of open-source projects. In fact, open-source projects play a very important role in my work! I started my first project, my first job, just based on open source, and I learned a lot about engineering best practices from open source code bases and documentation. Then, I continued with more open-source projects, which taught me a lot about computer vision and computer graphics. Over time, I’ve transformed from a beneficiary into a contributor, and that’s what I want to do for others. I want to see more and more people benefit from open-source projects and more and more people participating in supporting open-source projects. 

***"Without open source, we would not have seen the same level of technology-driven disruption in all industries that has contributed tremendously to making life easier, safer, and more enjoyable in the last 10 to 30 years."
~ Lars Gleim***

#### Can you describe your experience with 3D technologies or in 3D development? 

**Lars**: Sure! I first interacted with 3D technologies as a user when I was gaming as a high school student. Then, as a university student, I took a class on rendering and illumination models, and I worked with some other students to develop our own ray tracer. That was a kind of intense start, but I learned a lot about the details of the illumination models and material models. 

At university, we also developed our own game engines using C++, OpenGL and bullet physics. It’s where I really learned that game development is about much more than just the engine. It’s a lot about the artists. It’s a lot about the storytelling. It’s the importance of workflows, of tooling of assets that play into this ecosystem. 

Later, I worked with Microsoft’s Kinect 3D vision sensor and the Point Cloud Library, which is another open-source library that works with Point Cloud data, again using the bullet physics engine to build a solution for tracking and interacting with deformable objects. This enabled, for example, picking up a sponge or a pillow and based on how you compress or turn it, the system would recognize these interactions. 

Finally, here at Huawei, I’m working on robotic simulation, which of course, also has quite a few intersections with 3D technologies and 3D development.

**Bo**: I have lots of experience with related projects. Previously, I worked on a 3D vision-based SLAM (simultaneous localization and mapping) system. SLAM is the computational problem of constructing or updating a map of an unknown environment while simultaneously keeping track of an agent's location within it. I think it’s a very cool project! We actually developed our Huawei AR Engine based on that.

#### Let’s talk about O3DE SIG Simulation. Can you describe what SIG Simulation is, its scope, and primary focus?

**Lars**: So, SIG Simulation is the Special Interest Group for Simulation and is, like its name says, a group within O3DE that focuses on all aspects related to simulation. That includes physics, animations, and any other thing related to simulation. Robotics, for example. We address the issues that relate to these topics in the engine as well as plan and develop the roadmap of capabilities.

#### What is the simulation's importance to O3DE? 

**Lars**: Physics and animation are essential aspects of any game or industrial application. Without it – without dynamics – the rendering would be pretty boring. Simulation is an essential part of any 3D application. 

**Bo**: When we’re talking about simple 3D, people just consider the rendering, but they need to remember rendering is just taking the parts from 3D to 2D. It’s just a static process visualizing some static information. But our world is a world of movement. Motion makes the world more exciting. (Physics) Simulation is what fills that gap.

#### Bo, what do you hope to accomplish as the O3DE SIG Simulation Co-Chair? What is your role in helping the SIG—and, in turn—O3DE succeed?

**Bo**: I do everything I can to support O3DE success! So, first, I think we should consider outreach like this to help more and more people know us, join us, and help in SIG Simulation support to work on the simulation. We want to be leaders of developments in physics simulation. 

***"It’s a great place. You just start to want to contribute. And another great place is, yes, our community. Reach out in Discord or just start some discussion on GitHub. You’ll find that we have a very welcoming community." 
~ Gao Bo***

#### Lars, same question here for you. As O3DE SIG Simulation Chair, what do you see as your role?

**Lars**: I think Bo already captured it very well. It’s all about growing the community, establishing transparency, and making sure that the user experience improves over time. One key element is to come up with a clear roadmap moving forward. As an open-source project, there are different opinions on where the overall solution should go, and the SIG plays a really important role in moderating these diverse views and approaches. As SIG Simulation Chair, my role is to help the community, to act as moderator, and to steer a bit to help the community succeed overall. 

#### What do you think SIG Simulation’s top priority should be in 2022?

**Lars**: In my opinion, 2022 is all about improving the developer experience of the engine. Currently, there are still a few rough edges, so assets need to be set up in a certain way for the import to work flawlessly. These aspects can be challenging, especially for first-time users. In addition, there are still a fair number of bugs being reported every week, which need to be dealt with. 

On our roadmap, we’re planning to work on a better user experience. We currently have ongoing work on improving the navigation system and the animation system, as well as for the physics material system, and then in the longer term, members have talked about (and to some degree worked on) the integration of a destruction system or, potentially, a fluid system into the engine. 

**Bo**: I support Lars’ opinion. Currently, I think it’s all about improving the development experience.

#### What are you most looking forward to doing with SIG Simulation, O3DE, and at your own company?

**Bo**: First is adoption by more and more game studios and then also O3DE becoming more competitive to the large commercial 3D engines. It will take time, but I’m convinced it will happen. O3DE development is being driven by extremely talented people, and the 3D engine is the OS of the Metaverse, more and more companies are going to invest into open source over time. With that, I welcome you to check out the O3DE Community and become a part of it yourself!

**Lars**: I agree. O3DE, as I said before, is a new open-source project. So, there are still quite a few rough edges, but I’m really looking forward to more and more studios picking it up, users picking it up, and it becoming more competitive and used in real-world projects.

#### If someone is looking to engage with SIG Simulation, where would you suggest they start, and what other suggestions do you have for them?

**Lars**: The best place to start is probably our Discord channel because there’s usually always somebody online there and a lot of the discussions take place there. In addition, there’s SIG Simulation’s GitHub repository under the O3DE group. We invite anybody to join our weekly meetings where we go through the issues of the main O3DE repository, reply to them, and make sure that everything is addressed. You can also easily engage with others by creating issues in the main O3DE repository. 
