# Using the Defect Reporter Cloud Gem Portal<a name="cloud-canvas-cloud-gem-defect-reporter-cgp"></a>

Use the Defect Reporter Cloud Gem Portal to view and manage defect report submissions\. You can use the Defect Reporter Cloud Gem Portal to do the following:
+ View, filter, and manage reports\.
+ Perform ANSI SQL queries on report fields\.
+ Add comments and bookmark reports\.
+ Mark reports as read or unread\.
+ View report submissions by time range\.
+ Reuse queries and create shareable URLs for them\.
+ Configure the display of report details\.
+ Create custom data collection fields\.

You can use the [DefectReporterSample](cloud-canvas-cloud-gem-defect-reporter-sample-level.md) level to generate sample reports and then view and manage them in the Cloud Gem Portal\.

## Prerequisites<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-prerequisites"></a>

This tutorial assumes the following:
+ You are using version 1\.15 or later of Lumberyard\.
+ You have used the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) to set **CloudGemDefectReportSample** as your default project\.
+ You used the Cloud Canvas Resource Manager or the [lmbr\_aws command line tool](cloud-canvas-command-line.md) to create the following:
  + A project stack for your project\.
  + A deployment for your project that has the **CloudGemDefectReporter** and **CloudGemMetric** cloud gems enabled\.
+ You have opened the Cloud Gem Portal\. 

If you don't meet the prerequisites, see [Choosing a Game Project to Open](configurator-projects.md#project-configurator-launch-projects) to set **CloudGemDefectReportSample** as your default project\. For information on how to create a project stack and a deployment stack, see [Tutorial: Getting Started with Cloud Canvas](cloud-canvas-tutorial.md)\.

## Opening the Defect Reporter Cloud Gem Portal<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-opening"></a>

**To open the Defect Reporter Cloud Gem Portal**

1. In Lumberyard Editor, choose **AWS**, **Cloud Gem Portal**\.

1. In the Cloud Gem Portal, on the **Cloud Gems** page, click **Defect Reporter**\.

![\[Choose the Defect Reporter cloud gem in the Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-1.png)

## Viewing, Filtering, and Managing Reports<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-viewing-filtering-and-managing-reports"></a>

The **Overview** tab displays the list of defects that occurred\.

![\[Overview tab\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-2.png)

**To view, filter, and manage reports**

1. To see partially hidden column names, expand the column or pause your pointer on the column header\.  
![\[Full column header in tooltip\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-3.png)

1. To sort reports by a specific column, click the column name\.

1. To filter the columns that are displayed, click the **Columns** drop\-down menu and select the columns that you want\.  
![\[Filtering columns with the Columns selector\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-4.png)

1. To view only reports that have been read or not yet read, click the **Status** drop\-down menu\.  
![\[Filtering reports by read status\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-5.png)
**Note**  
To mark a report as read or unread, use the [Report Detail](#cloud-canvas-cloud-gem-defect-reporter-cgp-viewing-report-details) page for the report\.

1. To limit the number of results that are displayed, click the number drop\-down menu next to the **Search** box\.  
![\[Limiting the number of displayed results for reports.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-6.png)

1. To filter the results for specific data, enter the parameters of a standard ANSI SQL [WHERE](https://en.wikipedia.org/wiki/Where_(SQL)) clause into the **Search Defects** box, and then click **Search**\.  
![\[Using SQL to query defect reports in the Defect Reporter Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-7.png)

1. To remove the filter, clear the **Search Defects** box, and then click **Search** again\.

1. To bookmark a report, click the bookmark icon next to the report\.  
![\[Bookmarking a report in the Defect Reporter Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-8.png)

   The reports that you bookmark appear on the **Bookmarks** tab\.

## Viewing Report Details<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-viewing-report-details"></a>

On the **Overview** tab, click a report to see detailed information on the **Report Detail** page\.

![\[Report details page in the Defect Reporter Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-9.png)
+ **Text Uploads** – Contains links to automatically uploaded `.txt` files like game logs and DxDiag files\. The filenames are automatically generated UUIDs\.
+ **Image Uploads** – Contains links to automatically uploaded image files like screenshots\. The filenames are automatically generated UUIDs\.

**To view report details**

1. To download a text or image file, click the file name\.
**Note**  
A download link can be provided for game\-specific attachments like audio snippets\. However, if you want to make such attachments available for presentation in the Cloud Gem Portal, custom code is required\.

1. To customize the fields that appear under the **Report Information**, **Player Information**, and **System Information** sections, see the **Data Mappings** tab\.

### Adding Comments, Bookmarks, and Changing Read Status<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-comments-bookmarks-read-status"></a>

On the upper right of the **Report Detail** page, you can use the **Add Comment**, **Add to Bookmarks**, and **Mark as Read** options for your report\.

![\[Report detail page options\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-10.png)

After you bookmark a report or mark the report as read, the **Remove from Bookmarks** and/or **Mark as Unread** options are available for the report\.

![\[Report detail page toggle options\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-11.png)
+ To view the reports that you bookmark, use the **Bookmarks** tab\.
+ To filter for reports that are read or unread, you can use the **Status** drop\-down menu on the **Overview** or the **Bookmarks** tab\. 
+ To return to the **Overview** tab, click **Back to Defect List**\.

### Working with Comments<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-working-with-comments"></a>

On the **Report Details** page, you can add, edit, and delete comments about a report\.

#### Adding a Comment to a Report<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-adding-a-comment"></a>

You can add comments to a report for tracking purposes\. 

**Note**  
Comments added to a report are separate from the **Player text** \(annotations\) that the player submits\.

**To add a comment to a report**

1. Click **Add Comment**\.  
![\[Click Add Comment to add a comment to a report\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-12.png)

1. In the **Add Comment** dialog box, enter your changes, and then click **Add**\.  
![\[Adding a comment in the Comment box\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-13.png)

   The new comment appears on the details page for the report\.  
![\[Comment added to a report detail page.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-14.png)

#### Editing Comments<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-editing-comments"></a>

You can edit existing comments for a report\.

**To edit a comment**

1. On the report's detail page, click the gear icon next to the comment\.  
![\[Editing a comment on the report's detail page.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-15.png)

1. In the **Edit Comment** dialog box, enter your changes, and then click **Add**\.  
![\[Editing a comment in the Comment box\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-16.png)

#### Deleting Comments<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-deleting-comments"></a>

**To delete a comment**
+ Click the trash icon next to the comment\.  
![\[Deleting a comment\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-17.png)

### Viewing Unfiltered Report Data<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-viewing-raw-report-data"></a>

To view all the information in a defect report \(including information like log and DxDiag content\), click the **Raw Data** tab\.

![\[Viewing unfiltered data on the Raw Data tab\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-18.png)

## Discovering Defect Submission Trends by Time Range<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-defect-submission-time-ranges"></a>

On the **Dashboard** tab, you can see bar graphs of trends that show the number of submitted defects for a specific time range\.

**To see trends in report submissions for a preset time range**
+ Click the **Select Time Period** drop\-down menu and select a time range\.  
![\[Selecting a preset time range in the Defect Reporter Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-19.png)

  A bar graph for the selected time range appears\.  
![\[Bar graph of submission trends for a preset time range\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-20.png)

## Viewing and Managing Bookmarked Reports<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-bookmarked-reports"></a>

On the **Bookmarks** tab, you can view and manage the reports that you bookmarked\.

**Note**  
You can bookmark a report on the **Overview** tab or the **Report Detail** page for the report\.

![\[Viewing bookmarked reports on the Bookmarks tab\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-21.png)

**To view and manage bookmarked reports**

1. To see the **Report Detail** page for the report, click the report entry\.

1. To sort a report table by column, click the column name\.

1. To filter the bookmarked reports, you can use the **Columns** and **Status** options just as you can on the **Overview** tab\.

1. To remove the bookmark from a report \(and the report from the **Bookmarks** tab\), click the bookmark icon next to the report\.

## Reusing Searches<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-reusing-searches"></a>

On the **Recent Searches** tab, you can see the 10 most recent searches\.

![\[Viewing recent searches on the Recent Searches tab\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-22.png)

**To reuse searches**

1. To run the search again, click the query\.  
![\[Rerunning a search\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-23.png)

1. To copy a shareable URL of the query, click the share icon\.  
![\[Creating a shareable query URL\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-24.png)

   You can send the URL to other users with credentials to your Cloud Gem Portal to run the same query in a browser\.

## Configuring the Report Detail Page<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-configuring-the-report-detail-page"></a>

On the **Data Mappings** tab, you can manage the fields that appear on your **Report Detail** page\. The configurations are saved locally and do not appear in other browsers or affect other users\.

![\[Data mappings on the Report Configuration tab.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-25.png)

The **Data Mappings** page has the following columns:
+ **Key **– The key that identifies the raw data to display in the field \(for example, `report_status`\)\.
+ **Display Name**– The name of the field as it appears on the **Report Detail** page\.
+ **Display Category **– The section on the **Report Detail** page in which the field appears \(**Report Information**, **Player Information**, or **System Information**\)\.

You can add, remove, name, and categorize the fields that appear on the **Report Detail** page\.

**To add a display field to the **Report Detail** page**

1. From the **Raw Data** page, note the field name that you want to appear on every report's detail page\.

1. Click the **Data Mappings** tab\.

1. Click **Add Mapping**\.  
![\[Click Add Mapping to add a field to the Report Detail page\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-26.png)

   This adds an empty field to the top of the data mappings list\.  
![\[Data mapping field added\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-27.png)

1. For **Key**, enter the field name that you chose from the **Raw Data** tab \(for example, `event_sequence_number`\)\.

1. For **Display Name**, enter the name for the field as you want it to appear on the **Report Detail** tab \(for example, **Event Sequence**\)\.

1. For **Display Category**, select one of the **Category** options \(for example, **Report Information**\)\. 
   + **Report Information**
   + **Player Information**
   + **System Information**  
![\[Choosing the display category for a field on the Report Detail page\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-28.png)

   The next time you display the detail page for a report, the new field is displayed under the category that you chose\.   
**Example**  

   The following example has added the `event_sequence_number` field to the **Report Information** section using the display name **Event Sequence**\.  
![\[Field added to the Report Detail page\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-29.png)

**To remove a field from report configuration**
+ Click the trash icon for the field mapping\.

**To change the display name for a field**
+ Enter the new name in the **Display Name** box\.

**To change the display category for an existing field**
+ Click the **Display Category** drop\-down menu\.

## Creating Custom Data Collection Fields<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-custom-data-collection-fields-creating"></a>

On the **Client Configuration** tab, you can define a custom defect report field for client users\.

**To add a custom client\-side data collection field**

1. On the **Client Configuration** tab, click **Add New Field**\.  
![\[Click Add New Field to add a custom data collection field\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-30.png)

1. In the **Add New Field** dialog box, for **Field Type**, select one of the options:
   + **Multiple Choice \(Checkboxes\)** – Create a list of check boxes that are independently selectable\.
   + **Single Choice \(Radio Buttons\)** – Create a list of round option buttons of which only one can be selected\. 
   + **Text** – Create a box into which users can enter text\.
   + **Object** – Create a parent container for nested check boxes, radio buttons, and/or text boxes\. You can use this option to gather detailed information about a single theme or feature\.  
![\[Choosing a data collection field type\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-31.png)

1. For **Multiple Choice**, choose or modify a default **Title**, or enter your own\.
**Note**  
Titles are required and must be unique across non\-nested data fields\.  
![\[Choose, enter, or modify a title\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-31a.png)

1.  For **Multiple Choice Options**, enter the text for an option, and then click **Add Option**\.  
![\[Creating a multiple choice data collection field\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-32.png)  
![\[Adding multiple choice options for a custom field\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-33.png)

1. For each additional option:
   + Enter the corresponding text\.
   + To delete an option, click the red **X** icon\.
   + To cancel the addition of the custom field and all of its options, click **Close**\. Your changes will not be saved\.

1. Click **Add Field**\. The new field appears in the custom field list\.  
![\[Custom data collection field added\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-34.png)

1. Click **Save Configuration**\.   
![\[Saving client configuration\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-34a.png)
**Warning**  
Changes not saved to configuration will be lost when your browser session times out\.

1. For the **Single Choice \(Radio Buttons\)** field type, follow the same procedure as for multiple choice\. However, users can choose only one of the options that you provide\.  
![\[Single choice field added\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-35.png)

1. For the **Text** custom field type, enter a value for **Title**\. For **Character Limit**, specify the number of characters that users can enter into the text box\.  
![\[Creating a collection field for text data\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-36.png)

1. Click **Add Field**\. The text field appears in the list of custom fields\.  
![\[Text data field added to client configuration\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-37.png)

1. For the **Object** custom field type, enter a **Title**\.   
![\[Adding an object data field\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-37a.png)

1. Click **Add Field**\. The field appears in the list of custom fields as an empty container\.  
![\[Object field added\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-37b.png)

1. Click the **Add new property** \(**\+**\) icon to add a nested custom data field to the object container\.  
![\[Click the plus icon to add data fields to the object\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-37c.png)

   The **Add New Field** dialog box appears\. As before, you can add multiple choice check boxes, single choice radio buttons, and text boxes\. Further nesting is not possible, so the **Object** field type is not available\.  
![\[Choosing a nested data field for an object field\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-37d.png)

1. For each additional custom data field that you want to add to the container, click **Add new property** \(**\+**\)\. When you are finished, the object container appears in the list of custom fields as its own set of data collection points\.  
![\[A completed nested custom data field\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-37e.png)

1. Click **Save Configuration** to persist your changes\.

### Creating Default Values for Custom Data Collection Fields<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-custom-data-collection-fields-default-values"></a>

When you create custom data fields in the Cloud Gem Portal, you can specify values that you want to provide by default\.

**To create default values for custom data collection fields**

1. On the **Client Configuration** tab, enter or select the options that you want to be the default, and then click **Save Configuration**\.  
![\[Setting default values for custom data collection fields\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-custom-data-fields-default-values-setting.png)

1. When you run the DefectReporterSample level, the default values that you chose appear in the custom fields section of the report editor\.  
![\[Default values in the defect report editor\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-custom-data-fields-default-values-sample1.png)![\[Default values in the defect report editor\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-custom-data-fields-default-values-sample2.png)![\[Default values in the defect report editor\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-custom-data-fields-default-values-sample3.png)

### Editing and Deleting Custom Data Collection Fields<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-custom-data-collection-fields-editing-deleting"></a>

**To edit or delete a custom data field**

1. To edit a field, click the gear icon for the field, make your changes in the **Edit Field** dialog box, and then click **Save Changes**\.  
![\[Editing a custom data collection field\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-38.png)

1. To delete a field, click the trash icon for the field and then click **Delete Field** in the confirmation dialog box\.  
![\[Deleting a custom data collection field\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-39.png)

### Viewing and Testing Custom Data Collection Fields<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-custom-data-collection-fields-viewing-testing"></a>

After you have created one or more custom data fields, you can view and test them in the [DefectReporterSample](cloud-canvas-cloud-gem-defect-reporter-sample-level.md) level\.

**To view custom data fields**

1. Open Lumberyard Editor and run the DefectReporterSample level\.

1. Press **F1** a few times to generate some reports and then press **F5** to open the Defect Report Editor\. The custom data collection fields appear in the lower left corner of the in\-game editor\.  
![\[Custom multiple choice field in the DefectReporterSample level\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-40.png)

1. To move from one custom field to the next, use the arrows on the upper right of the custom field\.  
![\[Using arrows to navigate custom fields in the DefectReporterSample level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-41.png)  
![\[Custom single choice data field in the DefectReporterSample level\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-42.png)  
![\[Custom text data field in the DefectReporterSample level\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-43.png)

1. For longer fields like nested custom fields, use the scrollbar to move through the feedback items\.  
![\[Using the scrollbar to navigate a nested custom field in the DefectReporterSample level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-44.png)

1. To submit the report for further testing, click **Submit**\. The report should be available in the Cloud Gem Portal in about 10 minutes\. For more information about the sample level, see [Using the Defect Reporter Cloud Gem Sample Level](cloud-canvas-cloud-gem-defect-reporter-sample-level.md)\.  
![\[Submitting a report from the DefectReporterSample level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-45.png)