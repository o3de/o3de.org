---
title: "For the Love of the Game: In Search of Best-of-Breed 3D Creation Tools"
date: 2022-09-21
slug: for-the-love-of-the-game
author: Nicole Huesman
blog_img: "/images/blog/announcement_thumbnail.jpg"
---
## For the Love of the Game: In Search of Best-of-Breed 3D Creation Tools

Born out of a desire to make their own games, indie game developers Jacob Dodenhoff and Phoenix Cook forged [Chaotic Creations Interactive](https://www.chaoticcreationsinteractive.com/) (CCI), a **small game development studio** in the mid-west of the United States. Their studio reflects who they are and what they value: the players, and the commitments they make to them. Since the birth of CCI, they’ve been exploring game engines and they discovered the [Open 3D Engine](/) in July 2021 when it was announced. In this blog, they share their experiences and offer insight to newcomers who may be interested in taking the Open 3D Engine for a spin. 

{{< image-width src="/images/blog/cci/cci-blog-image.png" width="100%" alt="CCI-indie-developers" >}}

**_“First and foremost, our studio is focusing on crafting experiences that we enjoy as developers. In our commitment to creating games we enjoy, we believe our players will enjoy them too. Secondly, we're keeping our players in mind with everything we do.”_**

**Can you share your experience in open source, and with 3D and game development?**

**Phoenix:**  I’ve used [Blender](https://www.blender.org/) as my main 3D program for years, so I love having open-source stuff for 3D and game development. Open-source programs are unparalleled in terms of freedom they give you and stuff you can do with them, as opposed to something closed source or proprietary. I developed in [Linux](https://en.wikipedia.org/wiki/Linux), so I was super happy to finally have a game engine that works directly in Linux in the editor because nothing else does—that’s really nice.

**Jacob:**  Admittedly, I have less experience in open source than Phoenix, and I hope to learn more through my involvement with O3DE. My first hands-on experience with open source really started at the beginning of last year when we began seriously talking with another friend of ours about using the Open 3D Engine.

About a decade ago, I had some experiences that opened my eyes to how damaging and potentially dangerous it could be for people to use proprietary software. It was at that time that I became very interested in open source because of its ability to be audited by anybody and contributed to by anybody with the know-how and willingness to do so. So, for me, O3DE was a nice change of pace when I heard about it.

**How did you discover the Open 3D Engine? What was your path into the O3DE community?**

**Phoenix:**  A couple years back, I tested out Amazon Lumberyard. I’d been keeping an eye on Lumberyard for a while when I heard that it was being open-sourced and evolving into Open 3D Engine (O3DE). That was pretty much how I found out about O3DE early on, pre-release.

**Can you describe your early experiences with the Open 3D Engine?**

**Phoenix:** In terms of onboarding, O3DE is very similar in some aspects, such as UI and function-wise, to both [Unreal Engine](https://www.unrealengine.com/en-US/) and [Unity](https://unity.com/). Any prior experience with either of those engines transfers over really well to O3DE. For example, I found it really easy to pick up O3DE having a background in Unreal Engine.

And then, you said you found it more intuitive to pick it up from scratch than you did Unreal Engine, that things just felt more natural to you, right?

**Jacob:**  Yeah. We’d been using the Unreal Engine for prototyping, and we sat down a few months ago to look at licensing and all of the different aspects of it. We ended up creating a chart of many of the major engines, including O3DE and another open-source engine called [Flax](https://flaxengine.com/), and scoring them across a few different categories. It turns out, O3DE came out on top for us by almost 10 points above any of the other engines.

Onboarding in O3DE, on a scale of 1-5, was a five because we found that the [documentation](/docs/) was great, better than anything else we’d experienced. When using other engines, I couldn’t find the answers I was looking for in the documentation, so I’d try to find the answers in a YouTube video or a forum that explained what we were looking for. In O3DE, everything is explained in the documentation. We can also hop into [Discord](http://discord.com/invite/o3de) and talk with the people who are developing the engine and can give us the answers we’re looking for on the spot, maybe that day or the next day. So, the onboarding for O3DE, and the community, have been amazing.

We plan to finish our prototype in Unreal Engine and then transfer it to O3DE.

**It’s great to hear that the onboarding experience has been so positive for you. Are there any improvements you’d suggest?**

**Jacob:**  I think my biggest suggestion is more sample projects. I’ve seen a couple, such as the new [multiplayer sample project](https://github.com/o3de/o3de-multiplayersample), but having basic templates available would help a lot, not just for people to build off of, but also for people to look at and reverse-engineer and figure out intuitively how to do some of those things.

**Phoenix:**  A couple of 5- to 10-part series about the universal mechanics of common game genres—say, a 10-part series about making a sample project and then having the actual sample project be available—would be nice. It would be incredible to have a template, along with a 10-part series about how this template was put together and how to do each of the things that exists in the template. So, more series on a wider array of genres, and then making the project available as starter content.

**How are you currently using the Engine?**

**Jacob:**  So, I'm not a coder, so there's stuff that I'd love to have that I don't have the knowledge to make myself. There are also things that we've been looking for that we've seen people create in the external gems channel. For example, someone just recently published their progress on a gem dedicated towards vehicles and another person posted work on player character controllers.

So far, the extent of what I've done personally is more about just learning the engine. I’ve been learning how to take a base shape and change its shape, learning how to spawn vegetation and terrain, learning how to use the visual scripting canvas. Nothing too crazy, just the basic stuff, really, just learning the ins and outs of the engine as a whole.

**Phoenix:**  I started working in the Engine in one of the pre-release builds a while ago, and I’ve kept checking in on the progress of the Engine. One of the biggest things I’ve worked on is familiarizing myself with the visual script canvas.

**How would you describe your experiences with using O3DE so far?**

**Phoenix:**  I really adore the [script canvas](https://www.youtube.com/watch?v=fTNcUV4zAgE) in O3DE. As we explained earlier, we're still prototyping in Unreal Engine right now and a large part of that relates to how rapid the blueprints are, but I prefer script canvas over blueprints because, as an example, I like how the mathematical calculations happen in script canvas.

In blueprints, your mathematics happen outside of the chain of execution. So, you have your nodes that do logic, and your math nodes are outside of that and aren’t connected. They get called whenever whatever they're plugged into gets called, and you can't really control when the math happens.

In script canvas, the mathematics nodes are part of the chain of execution, so you just plug them in where you want them to happen, and you have direct control over that. That's been really nice.

Based on what I’ve worked with in the Engine at this point, primarily assets in the editor and the script canvas stuff, I have really enjoyed working with O3DE so far.

**Jacob:**  It has been nice to see such a healthy community of partners and contributors who support O3DE. This community of contributors is a big thing. I always find that the open-source software methodology results in a lot more output and speed in development. For example, legacy features are deprecated much quicker. I know a large part of O3DE development has focused on trimming the fat from a bunch of legacy features and replacing them with new systems that deploy modern approaches. This is something you don't see in other 3D engines where a lot of legacy systems are kept around, just in case somebody needs them and because of sunk cost fallacy. As a result, the software gets really heavy and bloated.

**Jacob, you’ve just touched on the modularity of O3DE. What has the O3DE’s modularity meant to both of you?**

**Jacob:**  Because I don't have the skills required to create something and plug it into the engine myself, I’ve appreciated the ability to go into gems in the project manager screen and just enable or disable whatever I'm looking for. The ability to search keywords for gems that may or may not exist, or scroll through to find what I’m looking for, and then enable it off the bat, has made it so easy to use. It’s lightweight: you don't have to have a ton of features enabled that you don't want, and you’re able to turn off things that you don’t need. As things get created, and officially supported gems are added, the ability to just add and remove what you're looking for makes O3DE a pleasure to use. It hasn’t been this simple in other engines I’ve used.

**Phoenix:** There’s a benefit with a lot of open source software that you don't really see in any of the other engines of being able to take something made by someone else, even if it's not official, and integrate it into the software at a native level. And you just don't see that in proprietary software.

It's really nice to know that if you need a feature, there may be somebody who's already made it, even if it's not part of the engine already. And if no one's made it and it's not part of the engine, you can make it and it will work as well as anything that was officially done. You can get native support for anything and that's really fantastic.

**To enable some capabilities in the Engine requires the user to change a few lines of code in the code file. How do you feel about the process of installing and/or adding gems, and how could it be improved?**

**Jacob:**  While neither of us have direct, hands-on experience with adding gems and capabilities specifically in O3DE that aren’t built into the Engine, we've done similar things in other engines and programs, so going into a file and changing a few lines of code isn’t a problem. We’ve also read the documentation for how to enable capabilities in O3DE that aren’t already built in, such as [PopcornFX](https://www.popcornfx.com/plugin-o3de/) and [networking](/docs/user-guide/networking/), and it seems pretty straightforward and simple to do. It’s also pretty typical for programs and software that are relatively new and still being developed, so for us, that's not a problem. Integrating these capabilities into the Engine would obviously save time, but it's not a huge deal.

**We’ve heard about some great upsides that O3DE offers. Is there anything you found that could be enhanced?**

**Phoenix:**  I was working on some player stuff based on the [PhysX](/docs/user-guide/interactivity/physics/) player controller in O3DE, and

I ran into some issues. The PhysX player controller is more cinematic than I would want—it’s not really directly physics-based, despite the name—and I wanted to do something more in that space, but couldn't really find the resources to do that.

**Jacob:**  The capability of automatically building a project when you’re finished creating it would be a nice feature. Other than that, there aren’t many more improvements I can think of because it's all pretty intuitive and easy on the eyes.

**Are you currently contributing to O3DE, or would you like to?**

**Jacob:**  Yeah, we've done a little bit, but nothing crazy. We’ve helped where we can, but balancing work and life makes this a bit difficult. I got involved briefly in the Outreach committee. I also did a little contributing to the SIG Docs, just pointing out things on the website or typos or you know little things here and there.

**For newcomers who are getting started with O3DE, are there any suggestions or recommendations you might have for them?**

**Jacob:**  My first recommendation would be to pull up the [documentation](/docs/) and get started because, like we said, the onboarding is smooth and easy to understand. If you have questions, it's easy to go into [Discord](http://discord.com/invite/o3de) and ask.

**Phoenix:** If you're looking at O3DE, my guess is that you're already familiar in some regards with other engines, and a lot of that carries over. In my experience, going between Unity and Unreal Engine is not smooth, but going from either Unity or Unreal Engine to O3DE is very, very smooth because there are a lot of shared philosophies between them.

And then, my second recommendation would be to check out the [O3DE YouTube channel](https://www.youtube.com/channel/UCTC8GDw1XidOTUBEFRbN-sA). It has some stuff that's really good, which is something that I normally don't see. There's a quick sample project that familiarizes you with quite a lot of the engine—a 10-part series that is really, really nice—and I've seen a couple of other things that have been pretty useful, too. So, the O3DE YouTube channel is a great resource in helping you get familiar with the basics and onboarding yourself.

**As you look ahead, what are you most looking forward to?**

**Jacob:**  Well, for starters, I’m very excited myself about the external gems that some people are making because they're things that we've thought about or have said we could use. People are doing exactly the types of things that we've been discussing, so I’m very excited about the external gems.

And, once we're done with our prototyping in Unreal Engine, moving over to O3DE is one of the things we’re most excited about because we want to use it fully going forward in the creation of our game. So, being able to move over and start the work. Mapping out our levels and designing them further. Creating our characters. The creation of our game is really what we're looking forward to the most, I think.

**Phoenix:**  I’m looking forward to picking up a lot of the skills and actually working in the Engine. I’ve had some years’ experience with C++, but I’ve never actually ended up using my C++ knowledge in a game design context, mostly because every engine I’ve used that supports C++ makes it so hard to work with. So I'm really excited to get into O3DE and see how much I can actually do with C++.

I’m also excited about contributing stuff back to the Engine. Ideally, I would love to have more developers working on the features that we need, and then making those features available to other developers. That is really exciting to me.
