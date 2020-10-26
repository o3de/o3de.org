# Sending Test Metrics with the Metrics Sample Level<a name="send-test-events-for-the-cloud-canvas-game-metrics-gem"></a>

After you complete the [Prerequisites](cloud-canvas-metrics-gem.md#cloud-canvas-cloud-gem-metrics-prerequisites), you can send test metrics with the Metrics Sample level\. You can then view these metrics in the Cloud Gem Portal\.

**To send test metrics with the Metrics Sample level**

1. Set the **CloudGemsSamples** as your default project\. For more information, see [Switching Game Projects](configurator-projects.md#project-configurator-different-project)\.

1. In Lumberyard Editor, choose **File**, **Open**, select **MetricsSample**, and then click **Open**\.

1. Press **Ctrl\+G** to enter game mode\.  
![\[Create gameplay events with the Metrics Sample level to send them to the Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-game-metrics-gem-metrics-sample-level.png)

1. To move forward, strafe left, move backward, and strafe right, press the **W**, **A**, **S**, and **D** keys, respectively\. 

1. Click **Send Position** to send the translation coordinates of the controllable entity directly to AWS\.

1. Click **Send Position \(Buffered\)** to send the translation coordinates of the controllable entity to your local machine\.

1. Click **Flush Metrics** to send the buffered game events from your local machine to the Cloud Gem Portal\.

1. For **Encryption**, select **Enabled** to send generated game events with encryption\.

1. For **Compression**, select **Enabled** to compress game events\.
**Note**  
If you select this option, the time to process events in AWS can increase\. This can incur additional costs for your AWS account\.

1. Press **Esc** to exit game mode\.

1. In Lumberyard Editor, choose **AWS**, **Open Cloud Gem Portal**\.

1. In the **Cloud Gem Portal**, on the **Cloud Gems** page, choose **Gem Metrics**\.

1. In the **Cloud Gem Metrics Portal**, you can view metrics for your game\. See [Using the Game Metrics Cloud Gem Portal](using-the-cloud-gem-metrics-portal.md)\.

## Examples for Sending Test Metrics<a name="code-examples-to-send-test-metrics"></a>

On the **UICanvas** entity, the **Lua Script** component references the `metricsmainmenu.lua` file\.

**Example Lua Script**  
The following is a snippet of the `metricsmainmenu.lua` file\. The Lua script specifies the events to collect from the game\. You can find the Lua script in the `lumberyard_version\dev\CloudGemSamples\Scripts` directory\.  

```
function MetricsMainMenu:SendPosition(disableBuffer)

	translationXAttr = CloudGemMetric_MetricsAttribute()
    translationXAttr:SetName("translationx")
	translationXAttr:SetDoubleValue(playerTranslation.x)

	translationYAttr = CloudGemMetric_MetricsAttribute()
    translationYAttr:SetName("translationy")
	translationYAttr:SetDoubleValue(playerTranslation.y)

	translationZAttr = CloudGemMetric_MetricsAttribute()
    translationZAttr:SetName("translationz")
	translationZAttr:SetDoubleValue(playerTranslation.z)

	attribute_list = CloudGemMetric_AttributesSubmissionList()
	attribute_list.attributes:push_back(translationXAttr)
	attribute_list.attributes:push_back(translationYAttr)
	attribute_list.attributes:push_back(translationZAttr)

	parameter_sensitive = CloudGemMetric_MetricsEventParameter()
	parameter_sensitive:SetName(parameter_sensitive:GetSensitivityTypeName())
	parameter_sensitive:SetVal(self.encrypt)
	
	parameter_compression = CloudGemMetric_MetricsEventParameter()
	parameter_compression:SetName(parameter_compression:GetCompressionModeName())
	parameter_compression:SetVal(self.compress)
	
	params = CloudGemMetric_EventParameterList() 
	params.parameters:push_back(parameter_sensitive)
	params.parameters:push_back(parameter_compression)

	if disableBuffer then
		-- Send metrics with no file buffer
		Debug.Log("Sending Metrics with no buffer")
		UiTextBus.Event.SetText(displayText, "Sending metrics with no file buffer")
		-- self.UpdateMessage("Sending Metrics with no buffer")
		CloudGemMetricRequestBus.Broadcast.SendMetrics("translation", attribute_list.attributes, params.parameters)
	else
		-- Send metrics with a file buffer
		Debug.Log("Sending Metrics to buffer")
		UiTextBus.Event.SetText(displayText, "Sending metrics to buffer")
		CloudGemMetricRequestBus.Broadcast.SubmitMetrics("translation", attribute_list.attributes, params.parameters)
	end
end
```

**Example C\+\+**  
The following is a snippet of the `MetricManager.cpp` file\. The C\+\+ file specifies the events to collect from the game\. You can find the C\+\+ file in the `lumberyard_version\dev\v1\Code\Source` directory\.  

```
    void MetricManager::SendStartEvents()
    {
        SubmitMetrics("clientinitcomplete", AZStd::vector<MetricsAttribute>());
        SubmitMetrics("sessionstart", AZStd::vector<MetricsAttribute>());
    }
```

## Event Attributes<a name="attributes-sent-with-the-game-event-to-aws"></a>

When an event is registered from the game client, the following default attributes are appended to the event\.


**Client Side Event Attributes**  

| Attributes | Description | 
| --- | --- | 
|  `source`  |  Identifier of the service provider\. The default value is `cloudgemmetric`\.  | 
|  `bldid`  |  Build identifier\. You can find this value from Lumberyard or as a parameter on the `registerEvent` function\.  | 
|  `loc `  |  Locale in ISO 639\-1\.  | 
| msgid  |  GUID that identifies the message batch of events\.  | 
|  `pltf`   |  Platform identifier\.  | 
|  `seqno`   |  Sequence number of the event\.  | 
| tmutc |  Time stamp of the event in ISO 8601\.  | 
|  `tzh`   |  Time zone hour of the offset of the player\.  | 
|  `tzm`  |  Time zone minute of the offset of the player\.  | 
|  `tzs`   |  Time zone sign of the offset of the player\.  | 
|  `uid`   | Player ID\. | 
|  `session_id`  |  Session identifier\.  | 


**Server Side Event Attributes**  

| Attributes | Description | 
| --- | --- | 
|  `uuid `  |  Unique metric identifer created by AWS when the event is received\.  | 
| srv\_tmutc | The time stamp in UTC when the event was received\. | 

**Example**  
The following is an event with the attributes\.  

```
{
    "event": "shot_fired",
    "weapon_type": "laser",
    "x": 123,
    "y": 123,
    "z": 123,
    "seqno": 1,
    "tzs": "-",
    "tzh": 8,
    "tzm": 0,
    "loc": "ISO 639-1",
    "uid": "cognito-id",
    "msgid": "GUID",
    "bldid": "1.0.1.2354",
    "pltf": "PC|IOS|ANDROID",
    "tmutc": "ISO 639-1",
    "session_id": "GUID",
    "source": "cloudgemmetric"
}
```