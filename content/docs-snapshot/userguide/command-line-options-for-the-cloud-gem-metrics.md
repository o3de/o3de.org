# Sending Test Metrics with the Command Line<a name="command-line-options-for-the-cloud-gem-metrics"></a>

In addition to using the Metrics Sample level, you can send test metrics to AWS with the command line\. Events that are generated with the command line always append to tables with the prefix `"dummy_"` \(for example, `"dummy_sessionStart"`\)\. This ensures that test events are tagged differently than real world events\. 

**To send test metrics with the command line**

1. Open a command line window and navigate to the `lumberyard_version\dev` directory\.

1. Enter the following command to send test metrics\. This command sends one test metric\.

   ```
   lmbr_aws metric send-test-metric
   ```

   The following output returns for the test metric\.

   ```
   Sending a sqs message with 283 bytes
   The job sent 1 metric(s) to the FIFO queue 'https://us-east-2.queue.amazonaws.com/123456789012/CloudGemSamples-project-CloudGemMetric_3DT1ONDKEITTGB9LWCZ2MIOZVS9K3IACD5EM.fifo'
   The job took 1.76900005341 seconds.
   StatusCode: 200
   Generating CSV test data with 1 events.
   [None]Using SQS queue URL 'https://us-east-2.queue.amazonaws.com/123456789012/CloudGemSamples-project-CloudGemMetric_3DT1ONDKEITTGB9LWCZ2MIOZVS9K3IACD5EM.fifo'
   ```

1. Enter the following command to send test metrics to simulate three players \(threads\) and send 500 events for each thread, with a five second delay between each event\.

   ```
   lmbr_aws metric send-test-metrics --threads 3 --iterations-per-thread 500 --sleep-duration-between-jobs 5
   ```

1. For additional options, enter the following command:

   ```
   lmbr_aws metric -h
   ```

   You can specify the following command options:  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/command-line-options-for-the-cloud-gem-metrics.html)