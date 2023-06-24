---
linktitle: Your First Remote Repository
title: Your First Remote Repository
description: Welcome to the Create Remote Repository! Building upon the foundation of O3DE, we have created a new remote repo template, a comprehensive solution for managing and distributing projects effortlessly. You can seamlessly create, package, and share your projects remotely with Github or other version control platforms, promoting collaboration and accelerating project development.

---
## REMOTE PROJECT SET UP
---
Navigate to scripts folder from the root of your o3de engine.<br>

```
cd scripts
```
To show a list o3de engine commands
```
cd scripts -help
```
<strong>Note:</strong> All engine commands have their abbreviations. Use the -help menu to check for details

<br>

## Start With A Github Repository Or Other Version Control Systems
---
<ul>
<li>Create a new repository for your remote project and clone this repo to your local 
machine
<br>
<li>This version control repository link (repo-uri) is where you upload your project<br>
here is an example of a Github repo url:

```
"https://github.com/<YourGitAccount>/<RemoteProjectName>.git"
```
</ul>
<br>

## Create Remote Repository Configuration
---
Provide the local path on your machine of your remote project (repo-path) this is where you cloned you online version control repo<br>
<strong> Note: --repo-path and --repo-uri are required to create remote repo</strong>

```
o3de.bat create-repo --repo-path "C:\o3de_Projects\<RemoteProjectName>" --repo-uri "https://github.com/<YourGitAccount>/<RemoteProjectName>.git"
```
<ul>
Three folders (Gems/Projects/Templates) will automatically be created in your project folder after you use --create-repo CLI command. Make sure to place all asscocated objects in their correct folder type to avoid later confusion.<br> 
<ul><li>For example: Gems should go inside Gems folder, projects should be placed into Projects folder, and project templates should go inside Templates folder.</ul><br>
<strong>Remember to push your local changes to your version control remote repository</strong>
</ul>


<br>

## Create Your Own Gem For Your Project (Optional)
---
You can enjoy the freedom of creating your own gem and upload it with your remote repo.<br>
Please look at next section CREATE RELEASE ARCHIVE if you want to make your gem avaliable to the world! <br>

Follow the below command to call the --create-gem and pass in the path to where you want your gem to be stored (If you don't specify a name for your gem, O3DE will use the folder name you passed in, which is the last parameter of your provided path)
<ul><ul><li>For example: "C:\o3de_Projects\RemoteProjectName\Gems\MyGem" Your gem name will be "MyGem" and its located in the Gems folder that was created during create-repo step</ul><br>
<strong>Note: Always put your gems in the Gems folder to avoid later confusion, Please follow the below template and pass your own gem in the path inside the Gems folder.</strong>

```
o3de.bat create-gem --gem-path "C:\o3de_Projects\<RemoteProjectName>\Gems\MyGem" --gem-name "SuperGem"
```
<ul>
This step registers your gem to the O3DE engine, you will be able to find your gem under the gem tab in your project managaer. Be sure to use the --edit-repo-properties --add-gem in order to add your gem to your project in order to work with your gem.<br>
<ul> 
For example: Add your gem to your project when working locally:
<ul>

```
o3de.bat edit-repo-properties --repo-path "C:\o3de_Projects\<RemoteProjectName>\repo.json" --add-gem "C:\o3de_Projects\<RemoteProjectName>\Gems\MyGem"
```

</ul>
</ul>
<br>
However, pushing your changes to your version control repository would not allow other user to use your gem, move on to the next step if you want to create a downloadable release archive for your gem to be shared with the world.
</ul>
</ul>

<br>
<br>

## CREATE RELEASE ARCHIVE
---
The primary purpose of a release archive is to provide a well-defined and stable version of the software that can be easily shared, installed, and distributed.<br> 

In O3DE we provide the option for users to create a release archive with .zip format<br>

Due to user safty, we use SHA-256 to hash our files before creating the release archive. Thus, you won't be able to modify your repo.json file once your archive is created. Every time you make a change to your gem, including the repo.json file, the SHA-256 hash will change.<br>

<ul><strong>Note: You must know where your zip will be created online (download path) before you actually create the release.</strong></ul>
<br>

<ul>

## Add A Gem To Your Remote Repository And Create A Release Archive
Here is a Github example of how to create a release archive. --release-archive-path command can only be used after you call the --add-gem command. See below example:

<ul>
<li>To create a release archive download path, make sure you follow this pattern for any github repositories:<br>
<ul>
 https://github.com/YourGitAccount/RemoteProjectName/releases/download/YouReleaseTag

 <br>

 <ul>

1. Here is an example of where you should upload your release to github (you can find this on your version control url):

![tag](Media/add_release.png)

2. Here is where you would be setting your release tag (make sure this tag is the same as the last parameter you passed for the download path arg)

![tag](Media/release_tag.png)

 </ul>
</ul>

<strong>WARNING: Make sure you provide the same release tag when you upload the release to github</strong>

```
o3de.bat edit-repo-properties --repo-path "C:\o3de_Projects\<RemoteProjectName>\repo.json" --add-gem "C:\o3de_Projects\<RemoteProjectName>\Gems\MyGem" --release-archive-path "C:\o3de_Projects\<RemoteProjectName>\Gems" --download-prefix "https://github.com/<YourGitAccount>/<RemoteProjectName>/releases/download/<YouReleaseTag>"
```

WARNING: Make sure you know where your release will be available after uploading it to GitHub. Once uploaded, you won't be able to change the download_source_uri in your repo.json file. If you input the wrong download path, you will need to rezip the file and upload the release again.
</ul>
After you upload your gem to the version control website, other users will be able to download it in their O3DE engine. It will be available in the Project Manager. Users can navigate to Remote Sources and use your remote project URL to download associated gems based on the download path you provided in this step.