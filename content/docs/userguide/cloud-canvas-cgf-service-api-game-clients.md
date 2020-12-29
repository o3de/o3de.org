# Game Clients<a name="cloud-canvas-cgf-service-api-game-clients"></a>

The Cloud Gem Framework can generate game clients for your service API\.

The game client can call some API operations on behalf of the player\. Other operations are callable only by other roles for use in the [Cloud Gem Portal](cloud-canvas-cloud-gem-portal.md) or other tools\. By default, the client uses the AWS credentials by assuming the `Player` role through an Amazon Cognito identity pool\. This process, described in detail in [Player Identity](cloud-canvas-rm-security-player-identity.md), is illustrated in the following diagram\.

![\[Client assumes the Player role\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cgf-service-api-4.png)

## Generating a Game Client<a name="cloud-canvas-cgf-service-api-game-clients-generating"></a>

Generating a game client is straightforward\.

**To generate a game client**  
Enter the following command:

```
lmbr_aws cloud-gem-framework generate-service-api-code --resource-group <group>
```

The `generate-service-api-code` command reads the `swagger.json` file that contains definitions for the resource group's service API\. The command creates a C\+\+ header file that implements a Lumberyard component\. The header file is named `<group>ClientComponent.h`\.

The directory location of the header file depends on whether *<group>* refers to a cloud gem or a project\-defined resource group\.


**Generated Component Header File Locations**  

| Parameter Type | Header File Location | 
| --- | --- | 
| cloud gem | Gems\\<gem>\\Code\\AWS\\ServiceApi | 
| resource group | Code\\<game>\\AWS\\<group>\\ServiceAPI | 

### Component Header File Accessibility<a name="cloud-canvas-cgf-service-api-game-clients-component-header-file-accessibility"></a>

For a gem, the default location of the generated header file does not make it accessible outside of that gem\. Typically, a cloud gem's service API is private to the gem, and the gem exposes its functionality through its own custom component\. If you want to provide direct access to the cloud gem's API from other gems or game code, you can move the generated header file into the gem's `Code\Include` directory\.

**Notes**
+ To use the generated client, add the generated file to your gem or project's WAF file list, and then [build the gem or project](game-build-intro.md)\.
+ You can use the generated client component to invoke the API from C\+\+ or Lua\. For more information, see [ Calling a Game API](cloud-canvas-cgf-service-api-calling-apis.md)\.
+ For sample code, see [Generated Game Client Code Example](cloud-canvas-cgf-service-api-generated-game-client-code-example.md)\.