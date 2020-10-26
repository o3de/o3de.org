# Invoking an AWS Lambda Function from Script Canvas<a name="cloud-canvas-cloud-gem-aws-lambda-sc"></a>

You can use the **InvokeAWSLambda** node to invoke an AWS Lambda function\. 

**Note**  
This tutorial uses an example Lambda function that is included with Lumberyard\. For information on using your own Lambda function, see [Making a Custom Lambda Function Available to Script Canvas](cloud-canvas-cloud-gem-aws-lambda-sc-adding.md)\.

**Topics**
+ [Prerequisites](#cloud-canvas-cloud-gem-aws-lambda-sc-prerequisites)
+ [Step 1: Add Nodes to Invoke an AWS Lambda Function](#cloud-canvas-cloud-gem-aws-lambda-sc-step-1-add-nodes)
+ [Step 2: Add Nodes to Display the Result](#cloud-canvas-cloud-gem-aws-lambda-sc-step-2-display-the-result)
+ [Making a Custom Lambda Function Available to Script Canvas](cloud-canvas-cloud-gem-aws-lambda-sc-adding.md)

## Prerequisites<a name="cloud-canvas-cloud-gem-aws-lambda-sc-prerequisites"></a>

To complete the procedures in this tutorial, perform the following steps\.

1. In the Project Configurator, choose the **CloudGemSamples** project\.

1. Use Cloud Canvas Resource Manager or the `lmbr_aws` command to upload the resources for the project\. This creates a project stack and a deployment in AWS\.

After you perform these steps, your `lumberyard_version\dev\CloudGemSamples\Config\deployment_name.player.awsLogicalMappings.json` file should have an entry for `CloudGemAWSScriptBehaviors.AWSBehaviorLambdaExample` like the following example:

```
"CloudGemAWSScriptBehaviors.AWSBehaviorLambdaExample": {
    "PhysicalResourceId": "CloudGemSamples-cgsamples-AWSBehaviorLambdaExample-T4FO5C8V5RQB", 
    "ResourceType": "AWS::Lambda::Function"
},
```

## Step 1: Add Nodes to Invoke an AWS Lambda Function<a name="cloud-canvas-cloud-gem-aws-lambda-sc-step-1-add-nodes"></a>

The following procedure shows you how to create a Script Canvas graph that invokes an AWS Lambda function\.

**To create a graph that invokes an AWS Lambda function**

1. In Lumberyard Editor, choose **Tools**, **Script Canvas**\.

1. In the **Node Palette**, expand **Utilities** and drag the **On Graph Start** node to the graph\.

1. On the right, in **Variable Manager**, click **Create Variable**\.

1. In the **Variable Type** search box, enter **AWSLambda**, or scroll down to **AWSLambda**\.

1. Click **AWSLambda**\. In **Node Inspector**, **AWSLambda Variable** appears\. The default name of the variable is **Variable 1**\.

1. In **Node Inspector**, expand **AWSLambda** to show the **functionName** and **requestBody** boxes\.

1. For **functionName**, select a Lambda function which is currently mapped by the Cloud Canvas Resource Manager\. This tutorial uses the function **CloudGemAWSScriptBehaviors\.AWSBehaviorLambdaExample**\. You can find the example Lambda function in the `lumberyard_version\dev\Gems\CloudGemAWSScriptBehaviors\AWS\lambda-code\AWSBehaviorLambdaExample\main.py` file\. The function simply returns a "Hello World" string\.

1. For `AWSBehaviorLambdaExample`, leave **requestBody** blank\. The **requestBody** field specifies a JSON string that can contain data to pass to the Lambda function\.

1. From the **Variable Manager**, press **Shift** and drag **Variable 1 AWSLambda** to the graph to create the **Get Variable 1** node\. \(You can also drag **AWSLambda** to the graph and then select **Get Variable** from the drop\-down menu\.\)

1. Connect the **Out** pin of the **On Graph Start** node to the **In** pin of the **Get Variable 1** node\.

1. In the **Node Palette**, expand **AWS**, **AWSLambda**\.

1. Drag the **InvokeAWSLambda** node to the right of the **Get Variable 1** node on the graph\.

1. Connect the **Out** pin of the **Get Variable 1** node to the **In** pin of the **InvokeAWSLambda** node\.

1. Connect the **AWSLambda** pin of the **Get Variable 1** node to the **AWSLambda:0** pin of the **InvokeAWSLambda** node\.

## Step 2: Add Nodes to Display the Result<a name="cloud-canvas-cloud-gem-aws-lambda-sc-step-2-display-the-result"></a>

Next, to see the success or failure of the operation, you add **AWSLambdaHandler** nodes and a **Print** node to the graph\. The nodes monitor for `AWSLambdaHandler` events and show you the result in the Lumberyard console window\.

**To display the output of the Lambda function in the console window**

1. In the **Node Palette**, expand **AWS, AWSLambdaHandler**\.

1. Drag **OnError** to the graph\. Place the node under the three nodes that are already connected\.

1. Drag **OnSuccess** to the graph and place it under the **OnError** node\.

1. In the **Node Palette**, expand **Utilities**, **Debug** and drag **Print** to the right of the two **AWSLambdaHandler** nodes on the graph\. The **Print** node displays messages in the Lumberyard Editor console\.

1. Connect the **Out** pins of the **AWSLambdaHandler** **OnError** and **OnSuccess** nodes to the **In** pin of the **Print** node\.

1. Connect the **String** pins of the **AWSLambdaHandler** **OnError** and **OnSuccess** nodes to the **Value** pin on the **Print** node\.   
**Example**  

   Your graph should look similar to the following image\.  
![\[Example Script Canvas graph that invokes a Lambda function\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-aws-lambda-sc-1.png)

1. Save the file with a name like `MyLambdaFunctionTest.scriptcanvas`\. The default file location is the `lumberyard_version\dev\project_name\scriptcanvas` directory\.

1. Close the **Script Canvas** editor\.

### Step 3: Test the Lambda Function<a name="cloud-canvas-cloud-gem-aws-lambda-sc-step-3-test"></a>

Now you are ready to attach the Script Canvas graph to an entity and test the script\.

**To test the Lambda function**

1. In Lumberyard Editor, right\-click the viewport and choose **Create entity**\.

1. In the **Entity Inspector**, click **Add Component**\.

1. Under **Scripting**, click **Script Canvas** to add a **[Script Canvas](component-script-canvas.md)** component to the entity\.

1. Under **Script Canvas**, click the browse button \(**\.\.\.**\)\.

1. In the **Pick Script Canvas** dialog box, choose the file that you created – for example, **mylambdafunctiontest \(Script Canvas\)**, and then click **OK**\.

1. To open the Lumberyard console window, press **`** or choose **Tools**, **Console**\. If the console window is already open and you want to clear it, press **Ctrl\+Shift\+C**\.

1. Press **Ctrl\+G** to start the level\. The console shows the "Hello World" result, as in the following example\.

   ```
   general.enter_game_mode
   Returned:
   (Found resource management based identity pool %s.) - us-east-1:guid
   (Found resource management based identity pool %s for authenticated access.) - us-east-1:guid
   (CloudCanvas) - Anonymous Credentials pulled successfully for identity pool us-east-1:guid.
   Disable Accelerators
   (Script Canvas) - "Hello World"
   ```