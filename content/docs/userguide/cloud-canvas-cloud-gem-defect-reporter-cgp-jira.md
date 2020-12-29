# Using Defect Reporter to Create Jira Tickets<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-jira"></a>

You can use the Jira integration feature of the Defect Reporter cloud gem to create Jira tickets from defect reports\. The integration feature uses AWS Lambda functions to receive the events and file tickets to your Jira server instance\. To implement custom ticket filtering, you can modify the Lambda function in `dedupping.main`\.

## Prerequisites<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-jira-prerequisites"></a>

This tutorial assumes the following:
+ You used the Cloud Canvas Resource Manager or the [lmbr\_aws command line tool](cloud-canvas-command-line.md) to create the following:
  + A project stack for your project\.
  + A deployment for your project that has the **CloudGemDefectReporter** and **CloudGemMetric** cloud gems enabled\.

For information on how to create a project stack and a deployment stack, see [Tutorial: Getting Started with Cloud Canvas](cloud-canvas-tutorial.md)\.

## Enabling Jira Integration<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-jira-enabling-jira-integration"></a>

Jira integration is not enabled by default\. Use the Cloud Canvas [`lmbr_aws` command line tool](cloud-canvas-command-line.md) to create a deployment that has Jira enabled or to add Jira integration to an existing deployment\.

**To create a new deployment that has Jira integration**
+ Enter the following command:

  ```
  lmbr_aws deployment create -d deployment_name --tags jira-integration
  ```

**To add Jira integration to an existing deployment**

1. Enter the following command:

   ```
   lmbr_aws deployment tags -d deployment_name --add jira-integration
   ```

1. Use one of the following methods to update the stack:
   + In Cloud Canvas Resource Manager, click **Upload resources**\.  
![\[Click Upload resources in Cloud Canvas Resource Manager\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-1.png)
   + In a command line prompt, enter the following:

     ```
     lmbr_aws deployment update
     ```

## Setting Jira Credentials<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-jira-setting-jira-credentials"></a>

To use the Jira integration feature, you must set your Jira credentials in the Cloud Gem Portal\.

**To configure Jira credentials in the Cloud Gem Portal**

1. Open the Cloud Gem Portal\.

1. In the navigation pane, click **Jira Credentials**\.  
![\[Click Jira Credentials in the navigation pane of the Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-2.png)

1. Enter a user name, password, and server address of your Jira instance \(for example, *https://jira\.example\.com*\)\.

1. Click **Save**\. 

   Jira credentials are stored as the environment variables of a Lambda function called `JiraCredentialsLambda` and encrypted by the AWS Key Management Service\. When the Lambda function is invoked, these variables are decrypted and made available to the service Lambda function\.

1. In the Cloud Gem Portal navigation pane, click **Defect Reporter**\.  
![\[Click Defect Reporter in the navigation pane of the Cloud Gem Portal\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-3.png)

   The **Jira Integration** tab now appears in the Cloud Gem Portal\.  
![\[Jira Integration tab added to the Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-4.png)

## Configuring Jira Integration Settings<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-jira-configuring-jira-integration-settings"></a>

After you enable Jira integration, you can configure its settings in the Cloud Gem Portal\.

**To configure Jira integration settings**

1. In the Cloud Gem Portal, click the **Jira Integration** tab\.

   In the **Jira Integration Settings** section, you can configure the Jira ticket submit mode, specify the Jira project for which tickets are created, and the default issue type\.  
![\[The Jira Integration Settings section of the Jira Integration tab in the Cloud Gem Portal\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-5.png)

1. For **Submit Mode**, choose **Automatic** or **Manual**\.
   + **Automatic** – Jira tickets are generated automatically when a defect report is submitted\.
   + **Manual** – Submit tickets manually in the Cloud Gem Portal\. You can submit tickets individually or by group\.

   For more information, see [Automatic and Manual Submit Modes](cloud-canvas-cloud-gem-defect-reporter-cgp-jira-automatic-and-manual-submit-modes.md)\.

1. For **Project Key**, choose a Jira project from the drop\-down menu\. The projects that are listed are defined on your Jira server instance\.  
![\[Choose a Jira project\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-6.png)

1. For **Issue Type**, choose a Jira issue type from the drop\-down menu \(for example, **Feedback** or **Bug**\)\. The available issue types depend on the project key that you specified\. The issue type that you choose will be the default issue type for your Jira tickets\.  
![\[Choose a default Jira issue type\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-7.png)

## Configuring Jira Field Mappings<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-jira-configuring-jira-field-mappings"></a>

You can use the **Field Mappings** section of the **Jira Integration** tab to configure the default mapping of game event attributes to Jira ticket fields\. Required fields have an asterisk \(**\***\)\. Automatic mode fails when a required field does not have a specified mapping or default value\. 

![\[The Field Mappings section of the Jira Integration tab\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-8.png)

For example, you might map the **annotation** game event attribute to the Jira **Description** field and the **platform\_identifier** attribute to the Jira **Found in Platform** field\.

For Jira fields that do not map easily from game event attributes, enter custom default values or leave them blank to be entered by hand later\. You do not have to provide default values for all fields\. The field mapping settings apply to both manual and automatic modes\.

**To configure default Jira field mappings**

1. For the fields for which you want to provide default values, enter your own text or type an initial letter, and then choose a game event attribute from the drop\-down menu\. The drop\-down menu filters the available event attributes as you type\.
**Warning**  
If you do not specify a mapping or default value for a required field, automatic mode will fail\.  
![\[Choosing a default game event attribute to map to a Jira field.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-9.png)

1. For fields that have a plus \(**\+**\) icon, click the icon to add an instance of the field\. Click the minus icon \(**–**\) to remove an instance of the field\.  
![\[Click the plus icon to add multiple instances to a field\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-10.png)

1. When you are finished, click **Save Settings**\.  
![\[Click Save Settings for Jira integration and field mappings\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-11.png)

## Creating Jira Tickets Manually<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-jira-submitting-jira-tickets-manually"></a>

You can create Jira tickets based on the defect reports that you have received\.

**To submit one or more Jira tickets from the Cloud Gem Portal**

1. In the Cloud Gem Portal, on the **Overview** tab, select the reports for which you want to create a Jira ticket\.  
![\[Select one or more defect reports on the Overview tab of the Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-12.png)

1. Choose **Bulk Actions**, and then click **Create Jira Issue\(s\)**\.  
![\[Click Create Jira Issue(s)\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-13.png)

1. If you selected more than one defect report, choose a **Report Grouping** option\.
   + To create Jira tickets that use the same field mapping, choose **Group**\.
   + To create Jira tickets that allow a separate field mapping for each report, choose **Individual**\.  
![\[Choose group or individual Jira ticket creation\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-14.png)

1. In the **Create Jira Ticket\(s\)** dialog box, enter the information for the Jira ticket\.  
![\[Entering values for Jira fields\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-15.png)

1. To fill in the fields in the dialog box, enter your own text or an initial letter and then choose a game event attribute from the drop\-down menu\. The drop\-down menu filters the event attributes as you type\.  
![\[Choosing a game event attribute to map to a Jira field\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-16.png)

1. If you want to change the fields that are available for mapping in the **Create Jira Ticket\(s\)** dialog box, click **Change the default mappings here** to open the **Jira Integration** tab\.   
![\[Click the link to open the Jira Integration tab\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-17.png)
**Note**  
If you change the default mappings at this point, the changes that you entered in the **Create Jira Ticket\(s\)** dialog box are not saved\.

1. Click **Create**\. The tickets appear on your Jira server, and you can easily link to them from the Cloud Gem Portal\. For more information, see **Viewing Jira Tickets**\.

### Creating Individual Tickets Manually<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-jira-creating-individual-tickets"></a>

You can create individual Jira tickets from a report's **Report Detail** page\.

**To create a Jira ticket for an individual report**

1. In the Cloud Gem Portal, on the **Overview** tab, click the entry for the defect report\.

1. On the **Report Detail** page, click **Create Jira Issue**\.  
![\[Click Create Jira Issue\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-17a.png)

1. In the **Create Jira Ticket** dialog box, enter the information for the ticket\.  
![\[Click Create Jira Issue\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-17b.png)

1. Click **Submit**\.

## Viewing Jira Tickets<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-jira-viewing-jira-tickets"></a>

After Jira tickets have been submitted, you can easily navigate to them from the Cloud Gem Portal\.

**To view a Jira ticket for a report**

1. In the Cloud Gem Portal, on the **Overview** tab, click the entry for the defect report\.

1. On the **Report Detail** page, do one of the following: 
   + Click **View Jira Issue**\.  
![\[Click View Jira Issue\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-17c.png)
   + In the **Report Information** section, click the **Jira Issue** number\.  
![\[Click the number next to Jira Issue\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-17d.png)
**Note**  
To open the Jira link, you might have to disable your web browser's pop\-up blocker for the pages from your Jira server address\.

## Example<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-jira-example"></a>

Consider the following example:
+ A game has an event attribute called **issue**\.
+ Jira has a field called **Description**\.
+ On the Jira integration tab, you mapped the Jira **Description** field to the **issue** game event attribute\.
+ The game sends a defect event with the attribute **issue**\.
+ The attribute **issue** in the defect event has the value: "This is my defect event attribute called issue"

With this information, the **Description** field of the Jira ticket is automatically populated with the value of the game attribute, as illustrated by the following image\.

![\[Example game attribute value mapped to a field in a Jira ticket\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-defect-reporter-cgp-jira-18.png)