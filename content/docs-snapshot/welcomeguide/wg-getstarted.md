# Get started with Amazon Lumberyard<a name="wg-getstarted"></a>

Often times, the best way to learn is *to do*\. Amazon Lumberyard was designed and created to help you make games, not read docs, so let’s make your first game\!

We’ve designed a very simple game that can be built in a few hours with Amazon Lumberyard\. As you work through the tutorials in order, you’ll learn about the different features and workflows in Lumberyard, and build comfort with the Lumberyard Editor interface\.

At the end, you’ll have a simple packaged version of a game you can share\. It won’t win any awards, but you’ll understand the myriad features of Lumberyard, from slices and components to physics to scripting to input and audio support\.

**Note**  
If you don’t want to read at all, check out [the video playlist for this tutorial series](https://www.youtube.com/playlist?list=PLjd5NhkT3LshLaEZY6R6HFBr6xSaI2tHF)\. We’re not judging\. Words are inefficient\!

## Prerequisites<a name="getstarted-prereqs"></a>

Have you installed and configured Amazon Lumberyard yet? Nope?

To get started "getting started", you will need the following on your local computer:
+ Amazon Lumberyard 1\.26 or greater
+ Visual Studio 2017 \(version 15\.9\.27\+\) or 2019 \(version 16\.7\.3\+\), including the Community Edition
+ The **WelcomeGuideTutorials** game project\.
+ A basic understanding of the concepts used in developing 3D games

**Important**  
We’ve provided a Lumberyard project containing the assets required to complete this tutorial series\. You can download the project here: [WelcomeGuideTutorials\-v1\.0\.zip](https://d3bqhfbip4ze4a.cloudfront.net/tutorials/WelcomeGuideTutorials-v1.0.zip) 

Need some help setting up Lumberyard for the first time? [Start here\!](wg-install.md) 

Or, you can watch a video on setup made specifically for this tutorial series:

[![AWS Videos](http://img.youtube.com/vi/https://www.youtube.com/embed/EnmbFSJ0ZWo?rel=0/0.jpg)](http://www.youtube.com/watch?v=https://www.youtube.com/embed/EnmbFSJ0ZWo?rel=0)

Are you good? If so, let’s go over the basic bits we provide you to get started\.

## Assets<a name="getstarted-bits"></a>

We’ve provided a small project game containing assets for this tutorial series\. Assets include meshes, textures, scripts, and complete levels for the end of each chapter\.

The asset package [WelcomeGuideTutorials\-v1\.0\.zip](https://d3bqhfbip4ze4a.cloudfront.net/tutorials/WelcomeGuideTutorials-v1.0.zip) contains the following directories \(among others\):
+ \\WelcomeGuideTutorials \(root\)
  + \\Actors — Contains the `.fbx` and `.mtl` files for the "chicken" asset\. The `.fbx` files contain meshes and a skeleton\. The `.mtl` files are material files containing surface properties that define the look of the chicken\.
  + \\InputBindings — Contains the input configuration files for the tutorial game\.
  + \\Levels — Contains the data for each chapter’s level configuration\.
  + \\ScriptCanvas — Contains the scripts you’ll work with for each chapter\.
  + \\Slices — Contains the assembled slices \(prefabs\) for the chicken and other assets used in the tutorials\.
  + \\Textures — Contains the texture images used in the tutorials\.

Open the ZIP file and place the contents in under the \\dev directory in your Amazon Lumberyard installation path\. \(For example, C:\\Program Files\\Amazon Lumberyard\\dev\.\) We provided levels for each "chapter" of the larger tutorial series, so you can just pick a chapter you’re interested in, load the *final* level for the preceding chapter, and start there\. Or, you can start from chapter 1 and build each level on your own\. Your time; your call\!

## About the tutorial game<a name="about-the-tutorial-game"></a>

![\[coop logo\]](http://docs.aws.amazon.com/lumberyard/latest/welcomeguide/images/coop_logo.png)

In this series of tutorials, you’ll develop a game we called "Flyin' the Coop"\. \(You can name it whatever you like\! Tech writers only *think* they’re clever\.\) This is a simple game where you control a nameless, lonely chicken as they attempt to escape the coop that imprisons them\. Across each chapter, you’ll develop a little experience with the different features of Lumberyard as they related to specific game development tasks, in an order that builds upon prior learning\. Each chapter is relatively short and is designed to help you get over that first hurdle when working with a new tool: getting comfortable with the different features, tools, terms, and workflows\.

## Chapters<a name="chapters"></a>


**Get started with Amazon Lumberyard tutorial chapters**  

| Chapter | Description | 
| --- | --- | 
|   [Tutorial One: Create a level](tutor-ch01-create-a-level.md)   |  Start here if you’re brand new to Lumberyard\. Here, you’ll learn how to go from launching Lumberyard to creating a basic level\.  | 
|   [Tutorial Two: Create an entity with White Box](tutor-ch02-create-an-entity.md)   |  Learn how to create an entity, work with components, and sketch meshes with **White Box**\.  | 
|   [Tutorial Three: Build a player character](tutor-ch03-build-a-player-character.md)   |  Learn how to import assets from `.fbx` files, and build a player character *slice*\.  | 
|   [Tutorial Four: Create PhysX colliders](tutor-ch04-create-physx-colliders.md)   |  Learn how to add PhysX colliders to **White Box** entities\. You’ll also learn to use the **PhysX Player Controller** to add a simple collider to a player entity, and use the **Input** and **Script Canvas** components to support player input\.  | 
|   [Tutorial Five: Handling player input through Script Canvas](tutor-ch05-player-input.md)   |  Learn how to create your own input events, and build a **Script Canvas** network to respond to input\.  | 
|   [Tutorial Six: Add a camera](tutor-ch06-add-a-camera.md)   |  Learn how to create a simple 3rd person follow camera for the player character\.  | 
|   [Tutorial Seven: Create terrain](tutor-ch07-create-terrain.md)   |  Learn how to create more detailed terrain in your level\.  | 
|   [Tutorial Eight: Create environment props with White Box and slices](tutor-ch08-create-props-with-slices.md)   |  Learn how to create props for you level with White Box meshes and *dynamic slices*\.  | 
|   [Tutorial Nine: Package and build a release](tutor-ch09-build-and-release.md)   |  Learn how to export your level and create a stand\-alone package of your game\.  | 