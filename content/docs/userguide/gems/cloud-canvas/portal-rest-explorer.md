---
description: ' Use the REST Explorer tab in the &cgp; to test &ABPlong; endpoints
  for cloud gems in &ALYlong;. '
slug: cloud-canvas-cloud-gem-portal-rest-explorer
title: Using the &cgp; REST Explorer
---
# Using the Cloud Gem Portal REST Explorer<a name="cloud-canvas-cloud-gem-portal-rest-explorer"></a>


****  

|  | 
| --- |
|  The Cloud Gem Portal \(CGP\) is deprecated and will be removed in a future version of Lumberyard\.  | 

Cloud gems that have a service URL defined in their context have a testing and troubleshooting **REST Explorer** tab on their Cloud Gem Portal page\. The **REST Explorer** tab exports the service API from the Amazon API Gateway host as a [swagger](https://swagger.io/specification/#swagger-object-14) JSON file\.

On the **REST Explorer** tab, you can do the following tasks:
+ Query a cloud gem's service APIs and make test calls to API endpoints\.
+ Discover the paths for a cloud gem, the HTTP verbs for the paths, and the parameters for each path and verb combination\.
+ Identify required and optional parameters for each path and verb combination\.
+ View swagger and swagger path API definitions in JSON format\.
+ Link directly to the API Gateway console for further testing and troubleshooting\.

## Prerequisites<a name="cloud-canvas-cloud-gem-portal-rest-explorer-prerequisites"></a>

This tutorial assumes the following:
+ Your Lumberyard project has the Message of the Day cloud gem enabled \(in the [Project Configurator](/docs/userguide/configurator/intro.md), choose **Cloud Gem Message of the Day**\)\.
+ You used the [Cloud Canvas Resource Manager](/docs/userguide/gems/cloud-canvas/ui-rm-overview.md) or the [lmbr\_aws command line tool](/docs/userguide/gems/cloud-canvas/command-line.md) to create the following:
  + A [project stack](/docs/userguide/gems/cloud-canvas/ui-rm-project-stack.md) for your project\.
  + A [deployment](/docs/userguide/gems/cloud-canvas/ui-rm-deployments.md) for your project that includes the **CloudGemMessageOfTheDay** resource group\.

## Opening the REST Explorer<a name="cloud-canvas-cloud-gem-portal-rest-explorer-using-the-rest-explorer"></a>

This tutorial uses the Message of the Day cloud gem, but you can apply the same techniques to any cloud gem that has a **REST Explorer** tab\.

**To open the REST Explorer**

1. In the **Cloud Gem Portal**, on the **Cloud Gems** page, choose **Message of the Day**\.

1. Click the **REST Explorer** tab\.  
![\[Click the REST Explorer tab in the Cloud Gem Portal.\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-rest-explorer-1.png)

   The initial **REST Explorer** fields are as follows:
   + **Host** – Name of the API Gateway host\.
   + **Title** – Name of the cloud gem's service API in API Gateway\.
   + **Version** – Service API version\.
   + **Schemes** – Supported service API schemes\.
   + **Path** – Lists the service API endpoints that are available for the cloud gem\.
   + **Show Swagger** – Shows the API definitions in JSON format\.
   + **Send** – Sends a request to an API Gateway endpoint after a path, verb, and required parameters have been specified\.

### Selecting a Path and a Verb<a name="cloud-canvas-cloud-gem-portal-rest-explorer-selecting-a-path-and-a-verb"></a>

A path is an endpoint for an API Gateway host\. Each cloud gem has paths that you can use to retrieve, create, or update information for the features that the cloud gem provides\. Each path has one or more HTTP verbs that specify the operation to be taken on the endpoint\. Typically, these verbs are `GET` to retrieve, `POST` to create, `PUT` to update, and `DELETE` to remove data\. Not all paths support all verbs\.

In the **REST Explorer** tab, you start by choosing a path and then a verb\. In the following procedure, you post a test message of the day\.

**To select a path and verb**

1. For **Path**, click **Select**, and then select **/admin/messages**\.  
![\[Select a path in the REST Explorer tab in the Cloud Gem Portal.\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-rest-explorer-2.png)

1. After you select the value for **Path**, the **Verb** field appears\. Click **Select** to see the request methods that are available for the path\. To post a message, select **post**\.  
![\[Select a verb in the REST Explorer tab in the Cloud Gem Portal.\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-rest-explorer-3.png)

   A description of the action that will be taken for your specified path and verb combination appears under the verb\.  
![\[Description of the action to be taken\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-rest-explorer-4.png)

1. To see the swagger definition for the path and verb, click **Show Path Swagger**\. The swagger code defines the action that will be taken \(in this example, the posting of a message to a message table\)\.  
![\[View the Path swagger JSON in the REST Explorer tab in the Cloud Gem Portal.\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-rest-explorer-5.png)

1. Click **Hide Path Swagger** to close the swagger definition\.

### Understanding Parameters<a name="cloud-canvas-cloud-gem-portal-rest-explorer-understanding-parameters"></a>

After you select a path and a verb, enter values for any parameters that are required\. The parameters that appear are specific to the path and verb combination that you chose\.

#### Parameter Data Types<a name="cloud-canvas-cloud-gem-portal-rest-explorer-parameter-data-types"></a>

**Example**  
The **/admin/messages** path and the **post** verb combination requires the following parameters\. For each parameter, a box shows the data type of the value to be entered\.  

![\[Body parameters for a POST verb and an /admin/messages path.\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-rest-explorer-6.png)

#### Parameter Categories<a name="cloud-canvas-cloud-gem-portal-rest-explorer-parameter-categories"></a>

Parameters can be in one of three categories:
+ **Path** – A value that replaces a placeholder in a specified path\. This value specifies the target of an operation – for example, the value for `{msg_id}` in the path `/admin/messages/{msg_id}`\.
+ **Query** – Fields for a query \(for example, fields that define a search for a GET command\)\.
+ **Body** – Typically contains fields for information to be created with a POST command or updated with a PUT command\.

The **Parameters** section groups parameters into their corresponding categories\. For example, the path and verb combination `/admin/messages/{msg_id}`/`put` has both **Path** and **Body** parameters:

![\[Parameter categories in the REST Explorer tab in the Cloud Gem Portal.\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-rest-explorer-7.png)

#### Viewing Parameter Descriptions<a name="cloud-canvas-cloud-gem-portal-rest-explorer-viewing-parameter-descriptions"></a>

You can view parameter descriptions and identify which parameters are required and which are optional\.

**To view parameter descriptions**
+ For the **Parameters** section, pause your pointer on the question mark icon for the parameter\.  
![\[View summary information in the tooltips for each parameter\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-rest-explorer-8.png)

#### Required and Optional Parameters<a name="cloud-canvas-cloud-gem-portal-rest-explorer-required-and-optional-parameters"></a>

You can also identify whether parameters are required or optional, as shown by their boxes\.
+ Optional parameters have boxes with dotted lines:  
![\[An optional parameter in the REST Explorer tab\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-rest-explorer-9.png)
+ Required parameters have boxes with solid lines:  
![\[A required parameter in the REST Explorer tab.\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-rest-explorer-10.png)

**Example**  
In the following example for the **/admin/messages/\{msg\_id\}** path and the **put** verb, only the **msg\_id** and **message** parameters are required\.  

![\[Required parameters have boxes with solid lines\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-rest-explorer-11.png)

### Sending a POST Request<a name="cloud-canvas-cloud-gem-portal-rest-explorer-sending-a-post-request"></a>

After you enter any required parameter information for the path and verb combination that you specified, you can send the request and see in the response in the **REST Explorer** tab\. The parameters that you enter are validated against their data type and whether or not they are required\.

**To send a test request**

1. For the **Body** **message** parameter, enter some text, and then click **Send**\.  
![\[Send example text in a parameter for a test request in the REST Explorer tab.\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-rest-explorer-12.png)

1. If you specified the required parameters, you can view the request and response under the **Send** button\.  
![\[Text of a POST request and response\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-rest-explorer-14.png)

   If you send a request without specifying the required parameters, the **REST Explorer** returns an error\.  
![\[Missing parameter error for a request in the REST Explorer tab.\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-rest-explorer-13.png)

### Sending a GET Request<a name="cloud-canvas-cloud-gem-portal-rest-explorer-sending-a-get-request"></a>

You can send a GET request to retrieve information from a specific location\. The following procedure continues the message of the day example and retrieves the message that was just posted\.

**To send a GET request**

1. On the **REST Explorer** tab for the Message of the Day cloud gem, ensure that the path **/admin/messages** is selected\.

1. For **Verb**, select **get**\.  
![\[Choose the get verb in the REST Explorer tab.\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-rest-explorer-15.png)

   The **Query** parameters for the GET request appear\.  
![\[Query parameters\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-rest-explorer-16.png)

1. Enter the values in the following table\.  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/cloud-canvas-cloud-gem-portal-rest-explorer.html)

1. Click **Send**\. The request and response appear in a scrollable box\. 
**Note**  
The query string in the GET request has the parameters that you specified\.  
![\[Text of a GET request and response\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-rest-explorer-17.png)

### Linking to the API Gateway Console<a name="cloud-canvas-cloud-gem-portal-rest-explorer-linking-to-the-api-gateway-console"></a>

For further investigation and troubleshooting, you can navigate directly from the **REST Explorer** tab to the endpoint in the API Gateway console\.

**To navigate to the API Gateway console endpoint**

1. On the **REST Explorer** tab, click the pop\-out icon for **Host**\. The console opens in a new browser window\.  
![\[Click the pop-out icon for Host to navigate to the API Gateway console.\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-rest-explorer-18.png)

1. Sign in to the AWS Management Console if you are not already signed in\. The API Gateway console displays the endpoint that you chose\.

   For more information API Gateway, see the [API Gateway Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/)\.  
![\[Endpoint in the API Gateway console\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-rest-explorer-19.png)