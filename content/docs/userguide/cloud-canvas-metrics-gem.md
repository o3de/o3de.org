# Game Metrics Cloud Gem<a name="cloud-canvas-metrics-gem"></a>

You can use the Game Metrics cloud gem to collect event data on player behaviors, which you can then analyze or trigger event actions\. This gem uses a service API with the Cloud Gem Framework for event submission, Amazon S3 for data storage, Amazon Athena as the query engine, Amazon QuickSight as the data visualizer, and the Cloud Gem Portal for administration and as a telemetry dashboard\.

You can enable this gem to do the following:
+ View realtime data about users playing the game\.
+ Run queries and generate reports on player behavior over time\.
+ Visualize player activity in the game world\.
+ Record player events, even if players are offline\.

**Note**  
The Game Metrics cloud gem is only supported in regions where FIFO is supported\. For more information, see [Amazon SQS FIFO \(First\-In\-First\-Out\) Queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues.html.html) in the *Amazon Simple Queue Service Developer Guide*\.

**Example Overview**  
The following illustrates how AWS services process game events so that you can view them in the Cloud Gem Portal\.  

![\[Create gameplay events with the Metrics Sample level to send them to the Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-gem-metrics-work-flow-with-aws-services-example.png)

When events are generated from your game, the following occurs:

1. Events submitted by REST requests are first processed by the Amazon API Gateway Lambda handler called the `FIFO_producer` \(producer\)\. This producer breaks the request into smaller chunks in order to upload a maximum of 256KB per chunk, which is the maximum payload size an SQS message can support\. Because the size of a single event, including attributes, can't exceed 256KB, the producer returns an error if an event exceeds this limit\.

1.  A Lambda process called the `FIFO_consumer` \(consumer\) processes the SQS messages\. 

1. The consumer is triggered every five minutes and self\-replicates when one of the following conditions are met:
   + SQS queue growth exceeds 5%, which is checked every 15 seconds\. 
   + SQS queue count exceeds 3000 messages\.

   The consumer processes as many SQS messages as possible within its five minute lifespan, aggregates the events of the same type into a single parquet file, and then saves the file to a specific S3 key\. 

1. Another Lambda function called the `amoeba_generator` is triggered every 20 minutes and aggregates all files in a single key path into a single file\. This process maximizes IO \(input/output\) performance when loading the files by the database\. AWS Glue crawlers crawl the data bucket and identify a common schema; this schema defines the tables for Athena to use\.

1. The S3 files are made available to Athena for querying through AWS Glue\. AWS Glue updates Athena’s database schema every hour\. The S3 event data is partitioned \(or indexed\) by the hour\. This means the lowest level of granularity when using Athena partitions is by the hour\.
**Note**  
Sending queries based on partitions can greatly reduce costs and improve query performance\. For more information, see [Partitioning Data](https://docs.aws.amazon.com/athena/latest/ug/partitions.html) in the *Amazon Athena User Guide*\.

The Game Metrics cloud gem includes the following default Athena partitions:


****  

| Partitions | Description | 
| --- | --- | 
|  `p_event_name`  | Name of the event\. | 
|  `p_server_timestamp_strftime `  | Server time stamp \(UTC\) of the event in the format %Y%m%d%H0000\. | 
| p\_server\_timestamp\_year |  Year of the server time stamp \(UTC\)\.  | 
| p\_server\_timestamp\_month |  Month of the server time stamp \(UTC\)\.  | 
|  `p_server_timestamp_day`  |  Day of the server time stamp \(UTC\)\.  | 
| p\_server\_timestamp\_hour  |  Hour of the server time stamp \(UTC\)\.  | 
| p\_event\_source | Data source of the event\. The default value is "cloudgemmetric" or "cloudgemdefectreporter"\. | 
|  `p_client_build_identifier`  |  Build identifier associated with the event\.  | 
|  `p_data_sensitivity`  |  Encryption level of the data\.  | 
|  `p_event_schema_hash`  |  Hash of the event schema\.  | 

## Prerequisites<a name="cloud-canvas-cloud-gem-metrics-prerequisites"></a>

This tutorial assumes the following:
+ You are using a Lumberyard project that has the **Cloud Gem Game Metrics** enabled\.
+ You have created a project stack and a deployment stack in the Cloud Canvas Resource Manager\.
+ You have opened the Cloud Gem Portal\.

If you don't meet the prerequisites, see [Enabling Gems](gems-system-using-project-configurator.md) and [Tutorial: Getting Started with Cloud Canvas](cloud-canvas-tutorial.md)\.

**Topics**
+ [Prerequisites](#cloud-canvas-cloud-gem-metrics-prerequisites)
+ [Sending Test Metrics with the Metrics Sample Level](send-test-events-for-the-cloud-canvas-game-metrics-gem.md)
+ [Sending Test Metrics with the Command Line](command-line-options-for-the-cloud-gem-metrics.md)
+ [Using the Game Metrics Cloud Gem Portal](using-the-cloud-gem-metrics-portal.md)
+ [Using Heatmap Analytics](cloud-canvas-cloud-gem-game-metrics-heatmap-analytics-intro.md)