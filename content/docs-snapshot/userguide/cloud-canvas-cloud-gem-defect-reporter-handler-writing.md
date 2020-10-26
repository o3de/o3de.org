# Writing Data Gathering Handlers<a name="cloud-canvas-cloud-gem-defect-reporter-handler-writing"></a>

Client\-side data gathering can be performed by EBus request handlers\.

## Examples of Handlers<a name="cloud-canvas-cloud-gem-defect-reporter-handler-writing-examples"></a>

 The following are examples of the specialized tasks that defect reporting handlers can perform:
+ **Screenshot Attacher** – Takes a screenshot and adds it to the report\.
+ **Log File Attacher** – Flushes the current log file and adds it to the report\.
+ **Health Information Collector** – Captures the current player health statistics from the gameplay system, creates a string of results in JSON format, and adds it to the report\.
+ **DXDiag Collector** – Runs the DXDiag tool, stores the results in a file, and then adds the file as an attachment to the report\.
+ **Render State Capturer** – Captures details about the render state, gets `.png` files of all current video buffers\. Creates attachments and a JSON response for the report\.

## Defect Reporter and Handler Workflow<a name="cloud-canvas-cloud-gem-defect-reporter-handler-writing-defect-reporter-and-handler-workflow"></a>

At a high level, the defect reporter and the data gathering handlers follow this workflow:

1. The defect reporter sends a request to a data reporting handler for a specific report\.

1. Because the data reporting handler can require time to gather necessary data, it returns immediately, registering its intent to send data to the defect reporter later\. A handler ID and a report ID are used to keep track of the source of the data and the report for which it is intended,

1. When the data becomes available, the handler sends the appropriate identifiers along with the data that the handler gathered to the defect reporter\. The defect reporter then adds the data to the appropriate report\.

### Workflow in Detail<a name="cloud-canvas-cloud-gem-defect-reporter-handler-writing-defect-reporter-and-handler-workflow-detail"></a>

The following sequence describes the workflow in greater detail\.

1. The defect reporter creates a report accumulator that accepts data for the report\.

1. The defect reporter sends an `OnCollectDefectReporterData` message that includes the report ID to all data gathering handlers\.

1. Each data gathering handler takes the report ID, calls `GetHandlerID` on the defect reporter, and stores the report ID and handler ID for later use\.

   When `GetHandlerID` is called, the defect reporter reserves a location for the report in the report accumulator\. This tells the accumulator to wait for the requested data before it finalizes the report\.
**Important**  
`GetHandlerID` should not be called before `OnCollectDefectReporterData` is called\. `GetHandlerID` should be called inside `OnCollectDefectReporterData` before `OnCollectDefectReporterData` ends\.

1. The handler initiates data gathering\.

1. The handler returns from `OnCollectDefectReporterData`\.

1. When the handler has data ready, it calls `ReportData` on the defect reporter with the report ID, the handler ID, and the requested data\.

**Note**  
The handler must ensure that the report ID and handler ID match to the correct data\. To implement this, data gathering functions can send the IDs as user values or use some other custom mechanism\.
Because the data that was requested might never arrive at the accumulator, handlers should time out gracefully and send empty data if necessary\. The defect reporter can force creation of incomplete reports\.

## Key Points<a name="cloud-canvas-cloud-gem-defect-reporter-handler-writing-key-points"></a>

When writing a defect reporting handler, keep in mind the following points:
+ Each defect report sends a single metrics event\.
+ Each defect reporting handler provides its own metadata\. The metadata are stored as metrics attributes\.
+ Each defect reporting handler can send an array of key\-value pairs\.
+ Due to a limitation of the metrics system, the metrics attributes must be atomic data types like `string` or `int`\.

### Working with Complex Data Types<a name="cloud-canvas-cloud-gem-defect-reporter-handler-complex-data-types"></a>

To handle complex data types, convert the attribute data to a JSON structure and then serialize it as a string\. The following sample defect event illustrates this process\.

```
{
"event" : "defect",
 "attributes" : [
 "annotation" : "{\"message\":\"there's a bug here\",\"auto\":false}".
 "playerposition" : "{\"x\":100,\"y\":100,\"z\":100}",
 "screenshot" : "{\"attachments\" : [{\"bucketName\" : \"defectBucket\",\"objectKey\" : \"screenshot00001.png\",\"type\" : \"image/png\"},{\"bucketName\" : \"defectBucket\",\"objectKey\" : \"screenshot00002.png\",\"type\" : \"image/png\"}]}"
 ]
```

Note that the data are contained in strings that can be serialized to JSON format\.

```
{
 "message" : "there's a bug here",
 "auto" : false
},
{
 "x":100,
 "y":100,
 "z":100
},
{
 "attachments" : [{
 "bucketName" : "defectBucket",
 "objectKey" : "screenshot00001.png",
 "type" : "image/png"
 },
 {
 "bucketName" : "defectBucket",
 "objectKey" : "screenshot00002.png",
 "type" : "image/png"
 }]
}
```

### Disposing of Temporary Attachment Files<a name="cloud-canvas-cloud-gem-defect-reporter-handler-writing-disposing-of-temporary-attachment-files"></a>

Attachments can be temporary files\. The temporary files can be handled in one of the following ways:
+ When `OnDefectReportUploaded` is called on the handler that has the appropriate report ID, the handler deletes the file\.
+ Do nothing\. In some cases, it might be desirable for the user to decide when to delete the file\.

## UI Workflow<a name="cloud-canvas-cloud-gem-defect-reporter-handler-writing-ui-workflow"></a>

The following workflow shows the functions that are called to gather user input from a UI like the Defect Report Editor in the DefectReporterSample level of the CloudGemDefectReportSample project\.

1. The `CloudGemDefectReporterRequests::`[`TriggerUserReportEditing`](cloud-canvas-cloud-gem-defect-reporter-ebus-interfaces.md#cloud-canvas-cloud-gem-defect-reporter-ebus-triggeruserreportediting) function is called\.

1. The `TriggerUserReportEditing` function broadcasts a `CloudGemDefectReporterUINotificationBus::`[`OnOpenDefectReportEditorUI`](cloud-canvas-cloud-gem-defect-reporter-ebus-interfaces.md#cloud-canvas-cloud-gem-defect-reporter-ebus-onopendefectreporteditorui) event\.

1. The UI responds to the `OnOpenDefectReportEditorUI` event by opening a UI form to gather input\.

1. The UI calls `CloudGemDefectReporterRequestBus::`[`GetAvailableReportIDs`](cloud-canvas-cloud-gem-defect-reporter-ebus-interfaces.md#cloud-canvas-cloud-gem-defect-reporter-ebus-getavailablereportids) to request a list of report IDs\.

1. The UI gets data for a specific report by calling `CloudGemDefectReporterRequestBus::`[`GetReport`](cloud-canvas-cloud-gem-defect-reporter-ebus-interfaces.md#cloud-canvas-cloud-gem-defect-reporter-ebus-getreport) with the report ID\.

1. The UI shows the report information to the user\. The user can add an annotation and/or provide data for any custom data collection fields that you create\.

1. When the report contents change, the UI calls `CloudGemDefectReporterRequestBus::`[`UpdateReport`](cloud-canvas-cloud-gem-defect-reporter-ebus-interfaces.md#cloud-canvas-cloud-gem-defect-reporter-ebus-updatereport) with the modified contents\. If the user presses **Delete**, [`RemoveReport`](cloud-canvas-cloud-gem-defect-reporter-ebus-interfaces.md#cloud-canvas-cloud-gem-defect-reporter-ebus-removereport) is called\.

1. When the user is done editing reports, the user clicks **Submit**\.

1. The UI calls `CloudGemDefectReporterRequestBus::`[`PostReports`](cloud-canvas-cloud-gem-defect-reporter-ebus-interfaces.md#cloud-canvas-cloud-gem-defect-reporter-ebus-postreports) to gather, send, and flush the report queue\.

For source code, see `lumberyard_version\dev\Gems\CloudGemDefectReporter\vN\Code\Include\CloudGemDefectReporter\CloudGemDefectReporterBus.h`

For information about the DefectReporterSample level and the Defect Report Editor, see [Using the Defect Reporter Cloud Gem Sample Level](cloud-canvas-cloud-gem-defect-reporter-sample-level.md)\.

## Upload Limitations<a name="cloud-canvas-cloud-gem-defect-reporter-handler-writing-upload-limitations"></a>

The maximum body payload size of data that can be sent in an event is 256KB\. The maximum number of attachments is 10\. 

The largest object that can be uploaded to S3 in a single PUT is 5 gigabytes\. For more information, see [Amazon S3 Frequently Asked Questions](https://aws.amazon.com/s3/faqs/)\.

To prevent memory overuse, the default maximum number of presigned posts that can be requested for each call is 20\. 

The default maximum number of calls that can be made during the submission is 1\. 

You can modify these values in the `lumberyard_version\dev\Gems\CloudGemDefectReporter\vN\AWS\common-code\Constant\defect_reporter_constants.py` file\.