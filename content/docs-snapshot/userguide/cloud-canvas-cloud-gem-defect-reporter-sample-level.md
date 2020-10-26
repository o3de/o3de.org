# Using the Defect Reporter Cloud Gem Sample Level<a name="cloud-canvas-cloud-gem-defect-reporter-sample-level"></a>

You can use the DefectReporterSample level that is included with Lumberyard to generate sample defect reports\. The sample includes a number of preset data collection fields\. For information on creating custom fields for the sample level, see [Creating Custom Data Collection Fields](cloud-canvas-cloud-gem-defect-reporter-cgp.md#cloud-canvas-cloud-gem-defect-reporter-cgp-custom-data-collection-fields-creating)\.

## Prerequisites<a name="cloud-canvas-cloud-gem-defect-reporter-sample-level-prerequisites"></a>

This tutorial assumes the following:
+ You have used the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) to set **CloudGemDefectReportSample** as your default project\.
+ You used the Cloud Canvas Resource Manager or the [lmbr\_aws command line tool](cloud-canvas-command-line.md) to create the following:
  + A project stack for your project\.
  + A deployment for your project that has the **CloudGemDefectReporter** and **CloudGemMetric** cloud gems enabled\.

If you don't meet the prerequisites, see [Choosing a Game Project to Open](configurator-projects.md#project-configurator-launch-projects) to set **CloudGemDefectReportSample** as your default project\. For information on how to create a project stack and a deployment stack, see [Tutorial: Getting Started with Cloud Canvas](cloud-canvas-tutorial.md)\.

## Workflow Steps<a name="cloud-canvas-cloud-gem-defect-reporter-sample-level-test-workflow-steps"></a>

You can use the DefectReporterSample level to do the following:

1. Generate report data\.

1. View and annotate the reports\.

1. Submit the reports\.

After you submit the reports, you can view them in the [Using the Defect Reporter Cloud Gem Portal](cloud-canvas-cloud-gem-defect-reporter-cgp.md)\.

**To use the Defect Reporter cloud gem sample level**

1. In Lumberyard Editor, choose **File**, **Open**\.

1. In the **Open a Level** dialog box, expand **Levels**\.

1. Choose **DefectReporterSample**, and then click **Open**\.

1. Press **Ctrl\+G** to start the level\. The sample level looks similar to the following image\.  
![\[DefectReporterSample level\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-sample-level-1.png)

1. To generate a defect report, press **F1**\. A status box in the lower left of the screen informs you that data collection is in progress\.  
![\[Report collection in progress in the DefectReporterSample level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-sample-level-2.png)

   Data collection takes a few moments\. When it is completed, the status box informs you that the report is available to view and annotate\.  
![\[Defect report available in the DefectReporterSample level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-sample-level-3.png)

1. Press **F1** to generate a few more reports\.

1. To view and annotate the reports, click the status box or press **F5**\. This opens the Defect Report Editor\.  
![\[Defect Report Editor in the DefectReporterSample level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-sample-level-4.png)

   The Defect Report Editor has the following fields:

   1. **Metrics Data** – Shows the data that was collected automatically\. Use the scroll bar to see more data\.

   1. **Attachments** – Lists the attachments that were captured as part of the data gathering process\.

   1. **Custom Field** – Provides an area to gather custom data\. You can create custom fields in the Cloud Gem Portal\. For more information, see [Creating Custom Data Collection Fields](cloud-canvas-cloud-gem-defect-reporter-cgp.md#cloud-canvas-cloud-gem-defect-reporter-cgp-custom-data-collection-fields-creating)\.

   1. **Error Message** – A text box in which you can enter information regarding the error\. The box can be empty or contain a relevant error message\. You can add your own comments to the box\. The box holds a maximum of 180 characters\.  
![\[Box for contextual information about the error in the DefectReporterSample level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-sample-level-5.png)

   1.  **Screenshot** – Shows a screenshot of the level at the time that the error occurred\. 

1. To switch reports, click the navigation arrows at the bottom of the editor\.  
![\[Navigation arrows in the DefectReporterSample level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-sample-level-6.png)

1. To manage the reports, use the buttons under the screenshot\.  
![\[Deleting a report in the DefectReporterSample level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-sample-level-7.png)

   1. **Delete** – Deletes the report\.

   1. **Cancel** – Closes the report editor\. If you reopen the editor, you can continue editing any reports that you have not yet submitted\.

   1. **Submit** – Submits the report that is currently displayed in the editor\.

   1. **Submit All** – Submits all reports in the editor\.

1. For this tutorial, click **Submit All** to submit the reports that you generated\.

   The editor informs you of the success or failure of the operation\.   
![\[Report sent successfully\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-sample-level-9.png)

1.  Click **Close** to close the Defect Report Editor\. When you have more than one issue but submit just one, the Defect Reporter remains open\.

1. Press **ESC** to stop the sample level\.

The reports are available in the Cloud Gem Portal in about 10 minutes\. To accelerate the process, do one of the following:
+ 

**To use the Game Metrics Cloud Gem Portal**

  1. From the Cloud Gem Portal, click **Game Metrics**\.

  1. Click the **Settings** tab\.

  1. In the **Extra Actions** section, click the three options **Consume**, **Unleash Amoeba**, and **Crawl**, in that order\.

  1. Wait until the area under the **Crawl** button shows the following message:

     The AWS GLUE data crawler is READY\. 
+ 

**To use the `lmbr_aws` command and the Game Metrics Cloud Gem Portal**

  1. In the `lumberyard_version\dev` directory, enter the following command:

     ```
     lmbr_aws metric consume
     ```

  1. From the Cloud Gem Portal, click **Game Metrics**\.

  1. Click the **Settings** tab\.

  1. In the **Extra Actions** section, click the two options **Unleash Amoeba** and **Crawl**, in that order\.

  1. Wait until the area under the **Crawl** button shows the following message:

      The AWS GLUE data crawler is READY\. 

To view and manage the reports, see the [Using the Defect Reporter Cloud Gem Portal](cloud-canvas-cloud-gem-defect-reporter-cgp.md)\.