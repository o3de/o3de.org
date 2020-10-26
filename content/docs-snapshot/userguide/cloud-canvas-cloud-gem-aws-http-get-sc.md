# Performing HTTP GET with Script Canvas<a name="cloud-canvas-cloud-gem-aws-http-get-sc"></a>

You can use the **AWSBehaviorHTTP Get** node in Script Canvas to perform an HTTP GET operation on a URL that you specify\.

**Topics**
+ [Step 1: Add Nodes to Perform an HTTP GET Operation](#cloud-canvas-cloud-gem-aws-http-get-sc-add-nodes)
+ [Step 2: Add Nodes to Display the Response](#cloud-canvas-cloud-gem-aws-http-get-sc-display-response)
+ [Step 3: Add Nodes to Display the Success or Failure of the Operation](#cloud-canvas-cloud-gem-aws-http-get-sc-display-success-or-failure)
+ [Step 4: Perform a Test GET](#cloud-canvas-cloud-gem-aws-http-get-sc-test)

## Step 1: Add Nodes to Perform an HTTP GET Operation<a name="cloud-canvas-cloud-gem-aws-http-get-sc-add-nodes"></a>

The following procedure shows you how to create a Script Canvas graph that performs an HTTP GET operation\.

**To create a graph that performs an HTTP GET operation**

1. In Lumberyard Editor, choose **Tools**, **Script Canvas**\.

1. In the **Node Palette**, expand **Utilities** and drag the **On Graph Start** node to the canvas\.

1. On the right, in **Variable Manager**, click **Create Variable**\.

1. In the **Variable Type** search box, enter **AWSBehaviorHTTP**, or scroll down to **AWSBehaviorHTTP**\.

1. Click **AWSBehaviorHTTP**\. In **Node Inspector**, **AWSBehaviorHTTP Variable** appears\. The default name of the variable is **Variable 1**\.

1. In **Node Inspector**, expand **AWSBehaviorHTTP** to show the **URL** box\. 

1. For **URL**, which is the input field for the variable, enter a URL for the GET operation \(for example, `http://example.com/`\)\.

1. From the **Variable Manager**, press **Shift** and drag **Variable 1 AWSBehaviorHTTP** to the canvas to create the **Get Variable 1** node\. \(You can also drag **AWSBehaviorHTTP** to the canvas and then select **Get Variable** from the drop\-down menu\.\)

1. Connect the **Out** pin of the **On Graph Start** node to the **In** pin of the **Get Variable 1** node\.

1. In the **Node Palette**, expand **AWS**, **AWSBehaviorHTTP**\.

1. Drag the **Get** node to the right of the **Get Variable 1** node on the canvas\.

1. Connect the **Out** pin of the **Get Variable 1** node to the **In** pin of the **Get** node\.

1. Connect the **AWSBehaviorHTTP** pin of the **Get Variable 1** node to the **AWSBehaviorHTTP:0** pin of the **Get** node\.

## Step 2: Add Nodes to Display the Response<a name="cloud-canvas-cloud-gem-aws-http-get-sc-display-response"></a>

To show the response to the HTTP request, you add an **AWSBehaviorHTTPNotificationsBus GetResponse** node, a **ToJSON** node, and **Print** nodes to the graph\. The nodes show you the result in the Lumberyard console window\.

**To show the response to the HTTP request in the console window**

1. In the **Node Palette**, expand **AWS, AWSBehaviorHTTPNotificationsBus**\.

1. Drag **GetResponse** to the canvas\. Place the node under the three nodes that are already connected\.

1. In the **Node Palette**, expand **Utilities**, **String Map** and then drag **ToJSON** to the right of the **GetResponse** node\.

1. Connect the **Out** pin of the **GetResponse** node to the **In** pin of the **ToJSON** node\.

1. Connect the **StringMap** pin of the **GetResponse** node to the **StringMap: 0** pin of the **ToJSON** node\.

1. In the **Node Palette**, expand **Utilities**, **Debug** and then drag four **Print** nodes to the right of the **ToJSON** node on the canvas and align them vertically\. **Print** nodes display messages in the Lumberyard Editor console\. After you connect them, each **Print** node will display a different part of the GET response in the console\.

1. Connect the **Out** pin of the **ToJSON** node to the **In** pin on the first **Print** node\. 

1. Connect the **Result: String** pin of the **ToJSON** node to the **Value** pin on the first **Print** node\. 

1. Connect the **Out** pin of the **GetResponse** node to the **In** pin of the three remaining **Print** nodes\. 

1. Connect the **Number** pin of the **GetResponse** node to the **Value** pin of the second **Print** node\. 

1. Connect the first **String** pin of the **GetResponse** node to the **Value** pin of the third **Print** node\. 

1. Connect the second **String** pin of the **GetResponse** node to the **Value** pin of the fourth **Print** node\. 

## Step 3: Add Nodes to Display the Success or Failure of the Operation<a name="cloud-canvas-cloud-gem-aws-http-get-sc-display-success-or-failure"></a>

Next, you add nodes to display the success or failure of the GET operation\.

**To display the success or failure of the GET operation in the console window**

1. In the **Node Palette**, expand **AWS, AWSBehaviorHTTPNotificationsBus**\.

1. Drag **OnError** to the canvas\. Place the node under the other nodes that are already connected\.

1. Drag **OnSuccess** to the canvas and place it under the **OnError** node\.

1. From **Node Palette**, **Utilities**, **Debug**, drag a **Print** node to the right of the **OnError** and **OnSuccess** nodes\.

1. Connect the **Out** pins of the **OnError** and **OnSuccess** nodes to the **In** pin of the new **Print** node\.

1. Connect the **String** pins of the **OnError** and **OnSuccess** nodes to the **Value** pin of the new **Print** node\. Your canvas should look similar to the following image:  
![\[A Script Canvas graph that performs an HTTP GET operation\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-aws-http-get-sc-1.png)

1. Save the canvas with a name like `MyHttpGetTest.scriptcanvas`\. The default file location is the `lumberyard_version\dev\project_name\scriptcanvas` directory\.

1. Exit the Script Canvas editor\.

## Step 4: Perform a Test GET<a name="cloud-canvas-cloud-gem-aws-http-get-sc-test"></a>

Now you are ready to attach the script canvas to an entity and then test it\.

**To test HTTP GET**

1. In Lumberyard Editor, right\-click the viewport and choose **Create entity**\.

1. In **Entity Inspector**, click **Add Component**\.

1. Under **Scripting**, click **Script Canvas** to add a **[Script Canvas](component-script-canvas.md)** component to the entity\.

1. Under **Script Canvas**, click the browse button \(**\.\.\.**\)\.

1. In the **Pick Script Canvas** dialog box, choose the canvas that you created – for example, **myhttpgettest \(Script Canvas\)**, and then click **OK**\.

1. If the Lumberyard console window is not already open, press **`** or choose **Tools**, **Console** to open the console window\. If the console window is already open and you want to clear it, press **Ctrl\+Shift\+C**\.

1. Press **Ctrl\+G** to start the level\. The console reports the success of the operation and displays the response, as in the following example\. The JSON output in the example has been formatted for readability\.

   ```
   general.enter_game_mode
   Returned:
   (Found resource management based identity pool %s.) - us-east-1:guid
   (Found resource management based identity pool %s for authenticated access.) - us-east-1:guid
   (CloudCanvas) - Anonymous Credentials pulled successfully for identity pool us-east-1:guid.
   Disable Accelerators
   (Script Canvas) - Success!
   (Script Canvas) - 200.000000
   (Script Canvas) - text/html
   (Script Canvas) - <!doctype html>
   <html>
   <head>
       <title>Example Domain</title>
   
       <meta charset="utf-8" />
       <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1" />
       <style type="text/css">
       body {
           background-color: #f0f0f2;
           margin: 0;
           padding: 0;
           font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
           
       }
       div {
           width: 600px;
   (Script Canvas) - 
   {
     "date": "Mon, 23 Apr 2018 20:42:03 GMT",
     "etag": "\"1541025663+gzip+ident\"",
     "expires": "Mon, 30 Apr 2018 20:42:03 GMT",
     "last-modified": "Fri, 09 Aug 2013 23:54:35 GMT",
     "vary": "Accept-Encoding",
     "x-cache": "HIT",
     "cache-control": "max-age=604800",
     "content-type": "text/html",
     "content-length": "1270",
     "via": "network_information",
     "connection": "keep-alive",
     "server": "server_information"
   }
   ```