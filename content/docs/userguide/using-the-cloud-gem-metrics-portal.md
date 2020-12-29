# Using the Game Metrics Cloud Gem Portal<a name="using-the-cloud-gem-metrics-portal"></a>

After you send test events with the Metrics Sample level or the command line, you can view the collected data in the Cloud Gem Portal\.

**To access the Game Metrics Cloud Gem Portal**

1. In Lumberyard Editor, choose **AWS**, **Open Cloud Gem Portal**\.

1. In the **Cloud Gem Portal**, on the **Cloud Gems** page, choose **Game Metrics**\.  
![\[Choose Game Metrics in the Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-game-metrics-gem.png)

1. Choose the game metric data that you want to view\. Metrics are automatically updated every five minutes\. You can view the following:

## Overview<a name="game-metrics-overview"></a>

The **Overview** page shows information about your game events\.

You can view the following metrics:

**Incoming Game Events**  
Number of game events that Amazon API Gateway receives from all the connected players\.   

![\[Choose Game Events\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-game-metrics-gem-2.png)

**Event Bandwidth Consumed**  
Events represented as bytes that Amazon API Gateway receives from the connected players\.  

![\[Choose Event Bandwidth Consumed\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-game-metrics-gem-3.png)

**Event Duplication Error Rate**  
 Level of event duplication that occurs in the database\. This chart shows the Amazon Athena query to examine the data for any duplicates\. Typically, all events should be unique; there shouldn't be event duplicates\.  
When you enable the gem for the first time, you may see some duplication in the first hour; however, the amoeba single file generator will remove the duplicates as it combines data files\.

![\[Choose Event Duplication Rate\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-game-metrics-gem-4.png)

**Time To Save Events to S3**  
Time required for Lambda to aggregate the events in the FIFO consumer and then send the game events to the Amazon S3 bucket\. As more players join your game, this chart will show a gradual increase in time\.  

![\[Choose Time to Save Events To S3\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-game-metrics-gem-5.png)

## SQS<a name="game-metrics-sqs"></a>

The **SQS** page shows the current health of your SQS resources\.

You can view the following metrics:

**Processed SQS Messages**  
Number of SQS messages that are currently in the FIFO queue\.  

![\[Choose Processed SQS Messages\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-game-metrics-gem-6.png)

**Time To Delete SQS Messages**  
Time required for a FIFO consumer to delete all of the SQS messages after the consumer processes the messages from the FIFO queue\. Typically, this takes a few seconds\.  

![\[Choose Time to Delete SQS Messages\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-game-metrics-gem-7.png)

## Lambda<a name="game-metrics-lambda"></a>

The **Lambda** page shows the current health of your Lambda resources\.

You can view the following metrics:

**Producer Lambda Invocations**  
Number of invokes of the Lambda FIFO producer that actively handle incoming game requests\.  

![\[Choose Producer Lambda Invocations\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-game-metrics-gem-8.png)

**Producer Lambda Errors**  
Rate of errors that currently occur while the Lambda FIFO producer processes incoming game requests\.  

![\[Choose Producer Lambda Errors\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-game-metrics-gem-9.png)

**Consumer Lambda Invocations**  
Number of FIFO consumers that process messages in the SQS queue\. By default, there are three consumers invoked for each SQS FIFO queue, which is triggered every five minutes\.  

![\[Choose Consumer Lambda Invocations\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-game-metrics-gem-10.png)

**Consumer Lambda Duration**  
Average time for the FIFO consumer Lambda to process the SQS queue\.  

![\[Choose Consumer Lambda Duration\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-game-metrics-gem-11.png)

**Consumer Lambda Errors**  
Error rate of the FIFO consumers\. Typically, this rate should be zero unless a persistent problem exists in the pipeline\.  

![\[Choose Consumer Lambda Duration\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-game-metrics-gem-12.png)

**Amoeba Lambda Invocations**  
Number of invokes of the amoeba single file generator that occur\.  

![\[Choose Amoeba Lambda Invocations\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-game-metrics-gem-13.png)

**Amoeba Errors**  
Current error rate of the amoeba single file generators\.  

![\[Choose Amoeba Errors\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-game-metrics-gem-14.png)

## DynamoDB<a name="game-metrics-dynamodb"></a>

The **DynamoDB** page shows the current health of your DynamoDB resources\.

You can view the following metrics:

**Reads Consumed/Provisioned**  
Current DynamoDB read load for the metric pipeline\.  

![\[Choose Reads Consumed/Provisioned\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-game-metrics-gem-15.png)

**Writes Consumed/Provisioned**  
Current DynamoDB write load for the metric pipeline\.  

![\[Choose Writes Consumed/Provisioned\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-game-metrics-gem-16.png)

## Partitions<a name="game-metrics-partitions"></a>

On the **Partitions** page, you can customize the Amazon S3 directories in which your data files are saved\. A partition is a segment of a data set\. You can define what the partitions should be outside of the predefined partitions\.

Based on the partition definition, an S3 key is returned\. The ordering of the partitions matters\.

![\[Choose Partitions\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-game-metrics-gem-17.png)

See the following pre\-defined partitions:


****  

| Attribute | Type | Parts | Description | 
| --- | --- | --- | --- | 
|  **event**  | str | None |  Defines the event identifier for the metric submitted\.  | 
|  **srv\_tmutc**  | datetime\.datetime\.utcfromtimestamp |  \.year, \.month, \.day, \.hour  |  Defines the serve time stamp \(UTC\)\. The tmutc attribute value will be added to a datetime\.datetime\.utcfromtimestamp and the parts evaluated against the type\. 

**Example**  
Input:  
tmutc: "2017\-10\-03T12:43:12\.111Z"  
Output:  
S3 Key: 2017/10/03/12  | 
| source | str | None |  Defines the source of the data\. Typically, this is defined as `cloudgemmetric`\. However this can be other sources such as another cloud gem\.  | 
|  **bldid**  | str | None |  Defines the build identifier for the metric submitted\.  | 
|  **sensitivity**  | map | None |  Defines the encryption type for the metric\. This metric is taken from the parameter map that you specify\. Metrics without sensitivity do not have encryption\. Sensitive metrics use Amazon S3 native AES256 encryption\.  | 
|  **schema\_hash**  | map | None |  Defines the schema to organize different schema types within one given metric type\.  | 

**Example Input**  
Partition definitions  

```
[
    {key:"source",type:"str",parts:[]},
    {key:"srv_tmutc",type:"datetime",parts:['.year','.month','.day','.hour']},
    {key:"event",type:"str",parts:[]},
]
```
Request parameters  

```
?sensitivity=Sensitive&compression=NoCompression
```
Request payload  

```
source         bldid   event        move loc msgid                                 pltf      seqno      tmutc        tzh tzm tzs uid 
cloudgemmetric 1.0.11  sessionStart D2   en  d7649fa5a9ff11e79a3b6480998557f4      win64      1         1.52451e+09   3   0  -   d7649fa1a9ff11e7914c6480998557f4
```

**Example Output**  

```
S3 key → p_event_name=sessionStart/p_server_timestamp_strftime=20180423190000/p_server_timestamp_year=2018/p_server_timestamp_month=4
/p_server_timestamp_day=23/p_server_timestamp_hour=19/p_event_source=cloudgemmetric/p_client_build_identifier=1.0.11/p_data_sensitivity=Sensitive
/p_event_schema_hash=976284525602131874
```

You can create custom partitions so that Amazon Athena queries your data against the partitions that you specify\.

**To create custom partitions**

1. Under **Custom Advanced User Area**, for **Attribute Name**, specify a custom attribute, such as **ip\_address**\.

1. For **Type**, specify the attribute value\. You can specify an integer, string, float, datetime\.datetime\.utcfromtimestamp, or map\.

1. For **Parts**, specify the type of function to call on the type\. For example, if **Type** is datetime\.datetime\.utcfromtimestamp, you can call \.year, \.month, \.day, or \.hour\.

1. Click **Add Option** to create more partitions\.

1. When finished, click **Update Custom Partitions**\.

## Filtering<a name="game-metrics-filtering"></a>

On the **Filtering** page, you can create filters to specify which data you no longer want to collect\. Game clients use these settings to filter the events or attributes\. You can then order the filters to specify the priority\.

![\[Choose Filtering\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-game-metrics-gem-18.png)

### Creating Filters for Events<a name="creating-filters-for-game-events"></a>

Event filtering supports two different types:


****  

| Type | Description | 
| --- | --- | 
| All |  If an attribute is defined, then all *attribute\_name* on *event\_name* are filtered\. If an attribute isn't defined, then all *event\_name* are filtered\.  | 
| Attribute |  If selected, an attribute array is required\. All *event\_name* with *attribute\_name* are filtered\.  | 

**Example 1**  

```
[{ 'event': 'sessionStart', 'attributes': [], 'type': 'all' }]
```
If **Event Name** is `sessionStart` and **Type** is **All**, then all `sessionStart` events are filtered\.

**Example 2**  

```
[{ 'event': 'sessionStart', 'attributes': ['move'], 'type': 'attribute' }]
```
If **Event name** is `sessionStart`, **Type** is **Attribute**, and **Attributes** is `move`, only attributes called `move` on the `sessionStart` event are filtered\. 

**Example 3**  

```
[{ 'event': 'sessionStart', 'attributes': ['move'], 'type': 'all' }]
```
If **Event name** is `sessionStart`, **Type** is **All**, and **Attributes** is `move`, all events with the attributes called `move` are filtered\. 

**To create a filter**

1. On the **Filtering** page, click **Add Filter**\.

1. For **Event Name**, enter a value such as **sessionstart**\.

1. For **Platform**, specify **All** or **Win64**\. For example, if you select **Win64**, the filter ignores the specified event that generates from game clients on the Win64 platform\.

1. For **Type**, specify **All** or **Attribute**\.

   1. If you specify **Attribute**, specify an attribute name\.

   1. Click **Add Attribute** or **Remove Attribute** as needed\.

### Prioritize Filters for Game Events<a name="prioritize-filters-for-game-events"></a>

After you create your filters, you can prioritize specific events to be processed when there is limited space available on the game client device\.

The game client processes all events \(excluding filtered events\) to a local file, which is monitored by a thread and flushed based on a time period or consumed space amount\. When only 40% of the allocated file space remains, only prioritized events will be processed\.

**To prioritize your filters**

1. Under **Priority**, select and drag the filter names to specify the preferred order\. You can prioritize by event name only\.

1. When finished, click **Update Filters**\.

## Settings<a name="game-metrics-settings"></a>

On the **Settings** page, you can specify the parameters for the metric pipeline\.

![\[Choose Settings\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-game-metrics-gem-19.png)

You can specify the following parameters for game clients\.


**Game Client Parameters**  

| Name | Description | Type | Valid Values | 
| --- | --- | --- | --- | 
| Flush To Local File |  Size, in bytes, of the memory buffer before sending the metrics in the memory buffer to a local file\.  | Integer |  `128` to `1048576` Default value: `204800`  | 
|  **Flush To Local File**  |  Period of time, in seconds, before sending the metrics in the memory buffer to a local file\.  | Integer | 5 to 600Default value: `60` | 
| Max Local File Size |  Maximum local file size, in MB, before all metrics are dropped\.  | Integer | 2 to 20Default value: `5` | 
| Flush To AWS |  Period of time, in seconds, before flushing the local file to AWS\.  | Integer | 150 to 1800Default value: `300` | 
| Max Payload Size |  Maximum size, in MB, of the payload that can be sent to AWS\.   | Integer | 2 to 9Default value: `5` | 
|  **Prioritization Threshold**  |  Percentage threshold of the maximum file size in MB in which events are prioritized\. Events with lower priority are dropped as local disk space runs out\.  | Integer | 20 to 100Default value: `60` | 

You can specify the following for AWS\.


**AWS Backend Parameters**  

| Name | Description | Type | Valid Values: | 
| --- | --- | --- | --- | 
| Growth Rate Trigger Percent |  SQS message growth rate threshold for when a new consumer is created\.  | Float |  `0` to `100` Default value: `0.05`  | 
| CSV Parquet Compression Ratio |  Estimated compression ratio from CSV to parquet format\. This ratio is used for estimation purposes\.  | Integer | 1 to 50Default value: `13` | 
| Backoff Max Seconds |  SQS queue message size threshold before a new consumer spawns automatically to help process the higher volume\.  | Integer |  `1` to `15` Default value: `5`  | 
| Target Amoeba aggregation file size |  Target aggregation file size in MB\. The amoeba file generator attempts to generate S3 parquet files at this size\. The ideal file size is 128 MB\.  | Integer |  `1` to `256` Default value: `128`  | 
| Number Of Initial Consumers |  Number of initial SQS consumers to trigger during each scheduled execution date\. The consumer Lambda self\-replicates when one of the following conditions are met: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/using-the-cloud-gem-metrics-portal.html)  | Integer | 1 to 10Default value: `3` | 
| Backoff Base Seconds |  Initial backoff period, in seconds, for failed AWS requests\.  | Integer | 1 to 15Default value: `5` | 
| Max In\-flight Messages |  Maximum allowable in\-flight messages \(number of messages being processed\) for any given SQS queue\. If a queue reaches this threshold, messages are not processed until the in\-flight number drops below the threshold\.  | Integer | 1000 to 15000Default value: `12000` | 
| Frequency To Check SQS State |  Frequency in which to check the SQS state\. This requires querying the SQS service\.  The **Frequency To Check Spawning Threshold** parameter should be a multiple of this parameter\.  | Integer | 1 to 45Default value: `5` | 
| Threshold Before Spawning New Consumer Lambda |  SQS queue size threshold before a new consumer is spawned automatically\.  | Integer |  `1000` to `15000` Default value: `3000`  | 
| Frequency To Check Spawning Threshold |  Frequency in which to check the threshold for spawning a new consumer Lambda function\.  | Integer |  `1` to `30` Default value: `5`  | 
| Backoff Max Trys |  Maximum number of attempts for failed AWS requests\.  | Integer | 1 to 15Default value: `5` | 
| Max Message Retry |  Maximum number of attempts before a message logs as an error\. Messages that are processed multiple times are considered errors\.  | Integer | 1 to 15Default value: `10` | 
| CSV Separator |  Separator that encodes the client CSV and decodes the SQS message payload\.  | String | ; | 
| FIFO Limit Before New Queue |  Threshold for when a new SQS queue is generated\. The threshold is based on in\-flight messages\. SQS FIFO queues are limited to 20,000 in\-flight messages\.  | Integer |  `1000` to `15000` Default value: `3000`  | 
| Memory Trigger |  Memory threshold, in percentage, for when to save to S3\.  | Integer |  `1` to `90` Default value: `75`  | 
| Amoeba Memory Trigger |  Memory threshold, in percentage, when the amoeba single file generator should save to S3\.  | Integer |  `1` to `70` Default value: `60`  | 
| Max Lambda Execution Time |  Maximum Lambda function execution time\. This is used as an internal timer to determine the processing windows for each step of the process: parsing SQS messages, saving to S3, and deleting messages\.  | Integer |  `1` to `275` Default value: `275`  | 
| Aggregation Period |  Target aggregation window size\. This is the default aggregation window size\. This feature can be overridden based on contextual information that the telemetry data provides\.  | Integer |  `1` to `275` Default value: `220`  | 
| Save Longitude/Latitude |  Saves longitude and latitude coordinates\.   **Longitude/Latitude** may be considered personally identifiable information in some countries\. This setting will be supported in a future release\. By default, this parameter is disabled\.   | Boolean | True – FalseDefault value: `False` | 

On the **Settings** page, you can do the following\.

![\[Choose Extra Settings under the Settings page.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-game-metrics-gem-20.png)

**To enable extra actions**

1. Under **Consume SQS Messages**, click **Consume**\. This command invokes the SQS message consumer, which aggregates and writes the metrics in each SQS message to S3\.

1. Under **Amoeba Generator**, click **Unleash Amoeba**\. This command invokes the Amoeba generator, which crawls the S3 bucket to combine small files into larger ones\. This helps Amazon Athena consume the data\. Combined files have the `_combined` suffix\.

1. Under **AWS Glue**, click **Crawl**\. This command invokes the GLUE Lambda crawler, which queries the database tables, attempts to recover corrupt partitions, and starts the AWS Glue crawler\.