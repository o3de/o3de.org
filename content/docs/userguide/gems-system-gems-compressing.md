# Compressing Your Gem<a name="gems-system-gems-compressing"></a>

You can compress your gem to make it distributable to other Lumberyard game developers\. To do this, you zip the contents of the gem directory using your preferred zip tool, and change the `.zip` filename extension to `.crate`\. The compressed `.crate` file must be under 4GB in size\. By renaming the \.`zip` to \.`crate`, game developers who use your gem can unpack and install it by drag and dropping it into Lumberyard\.

**To compress your gem into a crate file**

1. Using a file browser, open your gem's directory\. For example, `lumberyard_version\dev\Gems\my_gem`\.

1. Select the contents of this directory and use your preferred zip tool to zip them\.
**Note**  
Don't include your gem's top level directory as part of the zip file\. Select the files and directories inside the *my\_gem* directory to zip\.  
![\[Compressing your directory to create a gem.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems-system-gems-creating.png)

1. After the \.`zip` file is created, remove the \.`zip` extension and rename it to \.`crate`\.

   Your gem crate is ready for distribution\.