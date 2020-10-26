# Preparing the Amazon GameLift Package<a name="linux-prepare-gamelift-package"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

 Lumberyard has support for bundling and distributing your dedicated Linux servers over [Amazon GameLift](https://docs.aws.amazon.com/gamelift/latest/developerguide)\. To integrate your Lumberyard game with GameLift, enable the [GameLift Gem](gems-system-gem-gamelift.md) and use the GameLift C\+\+ SDK API to configure your game server and client to manage server sessions and connections from a client application\. 

 In the rest of this topic, you learn how to set up for creating your GameLift package and make a basic deployment\. 

## Prerequisites<a name="linux-prepare-gamelift-package-prerequisites"></a>

Before packaging and pushing your GameLift server, make sure that you complete the following\.
+ Set up your AWS account to use the GameLift service\. Follow the [GameLift \- Setting Up](https://docs.aws.amazon.com/gamelift/latest/developerguide/setting-up-intro) instructions\.
+ Install the AWS CLI on your Linux server\. Follow the [AWS CLI install instructions for Linux](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux)\.
+ [Build and do a test deploy of your game server on a standalone Linux machine](linux-build-lumberyard-executable.md)\.
+ \(Optional\) [Test client/server connectivity](linux-test-windows-client-linux-server-connection.md)\.

## Prepare the GameLift package<a name="linux-prepare-gamelift-package-bundle"></a>

 The following instructions tell you how to package the **MultiplayerSample** project for a test deployment to GameLift\. When you're ready to deploy your game, edit the `MultiplayerSample_CreateGameLiftPackage.sh` script to use your project and its asset bundles\. 

1. On your Linux server, run the packaging script\.

   ```
   ./MultiplayerSample_CreateGameLiftPackage.sh
   ```

1. Push your GameLift package to AWS using the AWS CLI\.

   ```
   aws gamelift upload-build --operating-system AMAZON_LINUX \
       --build-root "./GameLiftPackageLinux" \
       --name "your package name" \
       --build-version "your build version" \
       --region us-west-2
   ```
**Note**  
 If you want your servers to be hosted in a different AWS Region, replace the `us-west-2` argument value with the appropriate [region identifier](https://docs.aws.amazon.com/https://docs.aws.amazon.com/general/latest/gr/rande.html#ec2_region)\. 

## Next steps<a name="linux-prepare-gamelift-package-next-steps"></a>

Now that you have your server package uploaded to AWS, take these next steps to get your game deployed over GameLift and do more advanced configuration\.
+ [Set up a deployment fleet](https://docs.aws.amazon.com/gamelift/latest/developerguide/fleets-intro)
+ [Configure region\-based queuing](https://docs.aws.amazon.com/gamelift/latest/developerguide/queues-intro)
+ [Examine metrics and data](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-console-intro)
+ [Secure your GameLift servers](https://docs.aws.amazon.com/gamelift/latest/developerguide/security)