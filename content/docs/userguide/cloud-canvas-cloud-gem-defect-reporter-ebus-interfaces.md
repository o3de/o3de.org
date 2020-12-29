# Defect Reporter EBus Interfaces<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-interfaces"></a>

The Defect Reporter cloud gem includes the following EBus interfaces\.

**Topics**
+ [CloudGemDefectReporterRequestBus](#cloud-canvas-cloud-gem-defect-reporter-ebus-cloudgemdefectreporterrequestbus)
+ [CloudGemDefectReporterNotificationBus](#cloud-canvas-cloud-gem-defect-reporter-ebus-cloudgemdefectreporternotificationbus)
+ [CloudGemDefectReporterUINotificationBus](#cloud-canvas-cloud-gem-defect-reporter-ebus-cloudgemdefectreporteruinotificationbus)

For the source code, see the `lumberyard_version\dev\Gems\CloudGemDefectReporter\vN\Code\Include\CloudGemDefectReporter\CloudGemDefectReporterBus.h` file\.

## CloudGemDefectReporterRequestBus<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-cloudgemdefectreporterrequestbus"></a>

Contains request EBus methods for the defect reporter gem\.

### AddAnnotation<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-addannotation"></a>

Adds an annotation to a defect report\.

Available for scripting: Yes

**Syntax**

```
void AddAnnotation(int reportID, AZStd::string annotation)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| reportID | int | ID of the report to which the annotation is added\. | 
| annotation | AZStd::string | Comments that the user submitted for the report\. | 

### AddCustomField<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-addcustomfield"></a>

Adds a custom data collection field to a report in the form of a key\-value pair\.

Available for scripting: Yes

**Syntax**

```
void AddCustomField(int reportID, AZStd::string key, AZStd::string value)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| reportID | int | ID of the report\. | 
| key | AZStd::string | Key for the custom field\. | 
| value | AZStd::string | Value for the custom field\. | 

### FlushReports<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-flushreports"></a>

Removes all reports from the report queue\.

Available for scripting: Yes

**Syntax**

```
void FlushReports()
```

### GetAvailableReportIDs<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-getavailablereportids"></a>

Gets a list of the IDs of the currently available reports\. The available reports are the set of reports whose information gathering has been completed\. Before the main thread is called, call `QueueBroadcast` to ensure that you have the state in which all reports have been resolved\.

Available for scripting: Yes

**Syntax**

```
AZStd::vector<int> GetAvailableReportIDs() 
```

### GetClientConfiguration<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-getclientconfiguration"></a>

Gets the custom user\-created report fields from the Cloud Gem Portal\.

Available for scripting: Yes

**Syntax**

```
void GetClientConfiguration()
```

### GetHandlerID<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-gethandlerid"></a>

Returns a unique handler ID for a handler and registers the intention of the handler to report data at some point\.

**Note**  
`GetHandlerID` must be called before `ReportData.` Because ordering issues can occur if `GetHandlerID` is queued, `GetHandlerID` should be called in the main thread\.

Available for scripting: Yes

**Syntax**

```
int GetHandlerID(int reportID)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| reportID | int | ID of the report to which this data belongs\. The report ID is passed in from CollectDefectReporterData\. | 

### GetInputRecord<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-getinputrecord"></a>

Gets the input record of a specific event\.

Available for scripting: Yes

**Syntax**

```
AZStd::string GetInputRecord(AZStd::string processedEventName)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| processedEventName | AZStd::string | Specifies the name of the processed event that corresponds to the record to retrieve\. | 

### GetReport<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-getreport"></a>

Returns the report that has the specified report ID\.

Available for scripting: Yes

**Syntax**

```
DefectReport GetReport(int reportID)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| reportID | int | ID of the report to return\. | 

### IsSubmittingReport<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-issubmittingreport"></a>

Disables keyboard input for actions \(like game navigation for the keys A, W, S, and D\) when a user enters an annotation\.

Available for scripting: Yes

**Syntax**

```
void IsSubmittingReport(bool status)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| status | bool | Specify true to disable keyboard input; otherwise, false\. | 

### PostReports<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-postreports"></a>

Uploads the reports and attachments in the specified list\. This method is typically called by the UI to post the reports that the user edited\.

Available for scripting: Yes

**Syntax**

```
void PostReports(AZStd::vector<int> reportIDs) 
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| reportIDs | AZStd::vector<int> | List of the IDs of the reports to post\. | 

### RemoveReport<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-removereport"></a>

Removes the specified report\. This method is typically called by the UI to remove a queued report\.

Available for scripting: Yes

**Syntax**

```
void RemoveReport(int reportID)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| reportID | int | ID of the report to remove\. | 

### ReportData<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-reportdata"></a>

Called by a handler when it has gathered the requested data and is ready to add the data to the report\.

**Note**  
You must call `QueueBroadcast` to queue `ReportData.` Because reports come from different threads, ordering issues can arise if `ReportData` is not queued\.

Available for scripting: Yes

**Syntax**

```
void ReportData(int reportID, int handlerID, vector<MetricDesc> metricsData, vector<AttachmentDesc> attachmentPaths)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| reportID | int | Report ID for this data\. | 
| handlerID | int | ID of the handler returned by GetHandlerID\. | 
| metrics | vector<MetricDesc> |  A `MetricDesc` object that contains the metrics attributes for the report\.  For details, see [`MetricDesc`](#metric-desc)\.  | 
| attachments | vector<AttachmentDesc> |  An `AttachmentDesc` object that contains descriptions \(names, local paths and mime types\) of the attachments to be sent with the report\.  For details, see [`AttachmentDesc`](#attachment-desc)\.  | <a name="metric-desc"></a>


**MetricDesc**  

| Parameter | Type | Description | 
| --- | --- | --- | 
| m\_key | string | Unique key for the data returned\. | 
| m\_data | string | JSON string that contains the metrics data that you specify\. | <a name="attachment-desc"></a>


**AttachmentDesc**  

| Parameter | Type | Description | 
| --- | --- | --- | 
| m\_name | string | Friendly name of the attachment\. | 
| m\_type | string | MIME type of the attachment\. For an official list of MIME types, see [Media Types](http://www.iana.org/assignments/media-types/media-types.xhtml)\. | 
| m\_path | string | Local path of the attachment\. | 

### TriggerDefectReport<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-triggerdefectreport"></a>

Triggers data gathering from handlers for a defect report\. This is the code entry point for the defect reporter\.

Available for scripting: Yes

**Syntax**

```
void TriggerDefectReport(bool immediate)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| immediate | bool | True if the report dialog shows immediately; false if the report data is queued for later annotation\. | 

### TriggerUserReportEditing<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-triggeruserreportediting"></a>

Requests that the defect reporter UI be displayed so that the user can edit and annotate the current report queue\.

Available for scripting: Yes

**Syntax**

```
void TriggerUserReportEditing()
```

### UpdateReport<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-updatereport"></a>

Sends an updated version of a defect report to the report queue\. `UpdateReport` is typically called by the UI but can be called by other code if required \(for example, for automation purposes\)\.

Available for scripting: Yes

**Syntax**

```
void UpdateReport(DefectReport report)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| report | DefectReport |  Report to send to the report queue\. A `DefectReport` object is a data structure that contains all the information required to create a defect report\. `DefectReport` objects are typically generated and maintained by the defect reporter\. However, `DefectReport` objects are also passed to the UI for display and editing before they are sent back to the defect reporter\.  | 

## CloudGemDefectReporterNotificationBus<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-cloudgemdefectreporternotificationbus"></a>

Connect to the `CloudGemDefectReporterNotificationBus` to handle defect reporting\.

### OnCollectDefectReporterData<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-oncollectdefectreporterdata"></a>

Called when the handler is requested to start collecting defect data and report it to the defect reporter\. For more information, see [Defect Reporter and Handler Workflow](cloud-canvas-cloud-gem-defect-reporter-handler-writing.md#cloud-canvas-cloud-gem-defect-reporter-handler-writing-defect-reporter-and-handler-workflow)\.

Available for scripting: Yes

**Syntax**

```
void OnCollectDefectReporterData(int reportID)
```

### OnDefectReportUploaded<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-ondefectreportuploaded"></a>

Called when the report has been uploaded so that the handler \(`CloudGemDefectReporterNotificationBehaviorHandler`\) can clean up report artifacts\.

Available for scripting: Yes

**Syntax**

```
void OnDefectReportUploaded(int reportID)
```

## CloudGemDefectReporterUINotificationBus<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-cloudgemdefectreporteruinotificationbus"></a>

UI handler EBus for processing UI requests from the defect reporter\. This EBus abstracts the defect reporter from the UI so that you can supply your own implementation\.

### OnClientConfigurationAvailable<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-onclientconfigurationavailable"></a>

Called when the custom client configuration is available\.

Available for scripting: Yes

**Syntax**

```
virtual void OnClientConfigurationAvailable(const ServiceAPI::ClientConfiguration& clientConfiguration) {} 
```

### OnOpenDefectReportEditorUI<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-onopendefectreporteditorui"></a>

Requests that a custom user interface open for report editing and annotation\.

Available for scripting: Yes

**Syntax**

```
void OnOpenDefectReportEditorUI(vector<DefectReport> reports) 
```

### OnDefectReportPostStatus<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-ondefectreportpoststatus"></a>

Called when a new defect report is posted\.

Available for scripting: Yes

**Syntax**

```
void OnDefectReportPostStatus(int currentReport, int totalReports)
```

### OnDefectReportPostError<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-ondefectreportposterror"></a>

Called when an error occurs during the POST operation\.

Available for scripting: Yes

**Syntax**

```
void OnDefectReportPostError(string error)
```

### OnNewReportTriggered<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-onnewreporttriggered"></a>

Called when the user initiates a report\.

Available for scripting: Yes

**Syntax**

```
virtual void OnNewReportTriggered() {}
```

### OnNewReportReady<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-onnewreportready"></a>

Called when all the information in a report has been gathered\.

Available for scripting: Yes

**Syntax**

```
virtual void OnNewReportReady() {}
```

### OnReachSoftCap<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-onreachsoftcap"></a>

Called when one of the following configured limits is reached:
+ The maximum number of presigned posts that can be requested per call \(default: 20\)\.
+ The maximum number of presigned post calls that can be requested \(default: 1\)\.

These limitations help prevent the excessive use of memory\. To change the limits, you can edit the following two files:
+ `lumberyard_version\dev\Gems\CloudGemDefectReporter\vN\AWS\common-code\Constant\defect_reporter_constants.py`
+ `lumberyard_version\dev\Gems\CloudGemDefectReporter\vN\Code\Include\CloudGemDefectReporter\DefectReporterDataStructures.h`

Available for scripting: Yes

**Syntax**

```
virtual void OnReachSoftCap() { }
```

### OnReportsUpdated<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-onreportsupdated"></a>

Called when the number of reports changes\. This can happen when a report is created, deleted, or submitted\. The UI updates to show the number of reports that are available or in process\.

Available for scripting: Yes

**Syntax**

```
virtual void OnReportsUpdated(int totalAvailableReports, int totalPending) {}
```

### OnSubmittingReport<a name="cloud-canvas-cloud-gem-defect-reporter-ebus-onsubmittingreport"></a>

Called when the keyboard input is enabled or disabled\.

Available for scripting: Yes

**Syntax**

```
virtual void OnSubmittingReport(const bool& status) {}
```