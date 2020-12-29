# In\-Game Survey Cloud Gem Portal<a name="cloud-canvas-cloud-gem-in-game-survey"></a>

You can use the In\-Game Survey Cloud Gem Portal to create surveys for your game and test them in the **InGameSurveySample**\. Your players can see active surveys and submit answers to them\. You can view survey results and manage your surveys in the Cloud Gem Portal\. 

**Topics**
+ [Prerequisites](#cloud-canvas-cloud-gem-in-game-survey-prerequisites)
+ [Creating a Survey](#cloud-canvas-cloud-gem-in-game-survey-creating)
+ [Publishing a Survey](#cloud-canvas-cloud-gem-in-game-survey-publishing)
+ [Testing a Survey with the Sample Level](#cloud-canvas-cloud-gem-in-game-survey-testing)
+ [Viewing and Downloading Survey Results](#cloud-canvas-cloud-gem-in-game-survey-viewing)
+ [Editing an Active Survey](#cloud-canvas-cloud-gem-in-game-survey-editing-active)
+ [Modifying an Active Survey Schedule](#cloud-canvas-cloud-gem-in-game-survey-schedule-modifying)
+ [Cloning a Survey](#cloud-canvas-cloud-gem-in-game-survey-cloning)
+ [Ending a Survey](#cloud-canvas-cloud-gem-in-game-survey-ending)
+ [Reopening a Survey](#cloud-canvas-cloud-gem-in-game-survey-reopening)
+ [In\-Game Survey Cloud Gem Service API Reference](cloud-canvas-cloud-gem-in-game-survey-service-api.md)

## Prerequisites<a name="cloud-canvas-cloud-gem-in-game-survey-prerequisites"></a>

This tutorial assumes that you have already performed the following steps to set up the Cloud Gem Portal \(CGP\) and the In\-Game Survey Cloud Gem:
+ You are using a Lumberyard Editor project that has the **Cloud Gem In\-Game Survey** enabled\.
+ You have created a project stack and a deployment stack in Cloud Canvas Resource Manager\.
+ You have opened the Cloud Gem Portal\. In Lumberyard Editor, choose **AWS**, **Open Cloud Gem Portal**\.

If you don't meet the prerequisites, follow the steps in [Enabling Gems](gems-system-using-project-configurator.md) to add **Cloud Gem In\-Game Survey** in the Project Configurator\.

## Creating a Survey<a name="cloud-canvas-cloud-gem-in-game-survey-creating"></a>

When you create a survey in the Cloud Gem Portal, you add the questions that you want\. For each question, you choose a question type and provide the text of the question\. In the Cloud Gem Portal, you can see a preview of your survey and change the order of the questions\.

**To create a survey**

1. In the **Cloud Gem Portal**, on the **Cloud Gems** page, choose **In Game Survey**\.  
![\[Choose In Game Survey\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-1.png)

1. On the **Overview** tab of the Cloud Gem Portal, choose **Create New Survey\.**  
![\[Choose Create New Survey\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-2.png)

1. In the **Create New Survey** dialog box, enter a name for the survey\. Because the cloud gem automatically generates a unique ID for each survey, the name doesn't have to be unique\.

1. On the **Questions** tab, choose **Add New Question** to add a question to the survey\.  
![\[Choose Add New Question\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-4.png)

1. In the **Add New Question** dialog box, choose a question type: multiple choice with check boxes, multiple choice with radio buttons, slider, or text\.  
![\[Choose question type\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-5.png)

1. Provide the information for the question type that you selected\. The information requested depends on the question type\.
   + For **Title**, enter the text of the question\.
   + For the multiple\-choice questions, click **Add Option** to add a choice to the list of choices\.
   + For a **Slider** question, provide minimum and maximum values and labels for the values that indicate their meaning\.
   + For a text question, enter a number for **Character Limit** to specify the maximum number of characters that can be typed into the text box for the question\.

   After you add your questions, the **Questions** tab shows a preview of your survey\.  
![\[A survey preview\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-6.png)

1. To change the order of a question in the survey, drag the question to its new position\. You can also use the icons on the right of each entry to delete or disable a question\.

At this point you can use these options freely\. Because they can affect existing results, use them with caution after you publish your survey\.

## Publishing a Survey<a name="cloud-canvas-cloud-gem-in-game-survey-publishing"></a>

When you publish a survey, you schedule a start and end time and date\. You can also choose to have the survey start immediately and/or have no specified end\.

**To publish a survey**

1. To publish the survey, click **Publish Survey** at the bottom of the survey preview\.  
![\[Click Publish Survey\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-7.png)

1. For **Scheduling**, specify a start and end time and date for the survey, or specify **No Start** and **No End** to make the survey ongoing\. **No Start** and **No End** are selected by default\.  
![\[Schedule the survey\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-8.png)

1. Click **Publish Survey**\. On the **Questions** tab, the survey status is now **Active**\.  
![\[Active survey\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-9.png)

1. Choose **Back to Survey List Page**\. The **Overview** tab shows the active survey, its scheduling, and the number of responses received\.  
![\[Active survey information on the Overview tab\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-10.png)

## Testing a Survey with the Sample Level<a name="cloud-canvas-cloud-gem-in-game-survey-testing"></a>

To test your survey you can use the in\-game survey sample that is included with Lumberyard\.

**To test the survey**

1. In Lumberyard Editor, run the **InGameSurveySample** level and provide some sample answers in the test interface\. Use the **Next** and **Back** buttons provided to move between answers\.  
![\[Multiple-choice question with check boxes\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-11.png)  
![\[Multiple-choice question with radio buttons\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-12.png)  
![\[Question with a range of values\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-13.png)  
![\[Text question\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-14.png)

1. When you are finished, choose **Submit**\.  
![\[Submit survey answers\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-15.png)

   When you choose **Submit**, you return to Lumberyard Editor viewport\.

1. Press **Esc** to end the game\. To provide more sample survey data, run the level a few more times to answer the survey questions and submit additional answers\.

## Viewing and Downloading Survey Results<a name="cloud-canvas-cloud-gem-in-game-survey-viewing"></a>

In the Cloud Gem Portal, you can see aggregate and individual response data for your survey\. For text questions, you can see the verbatim text of individual responses\.

**To view survey results**

1. Return to the Cloud Gem Portal\. On the **Overview** tab, click the refresh icon to update the results\.  
![\[Refresh the portal to update the number of responses\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-16.png)

   The value for **Responses** changes to show the number of surveys that were completed\.

1. On the **Overview** tab, click the name of your survey, and then choose the **Results** tab\.  
![\[Choose the Results tab\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-17.png)

1. Scroll down to view the results\. Each nontext question has a table of aggregated results and a corresponding bar chart\.

1. To see a pie chart view of the results, choose the pie chart ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-18.png) icon\. To see the bar chart again, choose the bar chart ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-19.png) icon\.  
![\[Choose chart type\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-20.png)

1. To view the answers for a text question, click **View Answers**\.  
![\[For text questions, choose View Answers\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-21.png)  
![\[Verbatim answers to a text question\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-22.png)

1. To see a list of individual response entries, click the **Individual Responses** tab\.  
![\[Choose Individual Responses\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-23.png)

1. You can choose **Export to CSV** on the **Individual Responses** tab to export all submissions to a `.csv` file\. This option is useful if you want to import the results into third\-party tools for analysis\.

1. In the list of submissions, choose an entry to see a set of answers from an individual respondent\.  
![\[Choose an individual survey submission\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-24.png)  
![\[A set of answers from an individual submission\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-25.png)

## Editing an Active Survey<a name="cloud-canvas-cloud-gem-in-game-survey-editing-active"></a>

You can edit an active survey, but you should do so with caution\. For example, if you change the order of options for a multiple\-choice question, the answers already collected in the results tab will be incorrect\.

**To edit an active survey**

1. On the **Overview** tab, click the survey name\. Then on the **Questions** tab, click the edit ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-30.png) icon for the survey\.  
![\[Choose Edit\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-26.png)

1. At the warning prompt, choose **Edit Active Survey** to continue\.

1. To edit the survey, choose the **Move** ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-28.png), **Delete**![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-29.png), **Edit**![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-30.png), or **Disable Question** options from the menu for the questions that you want to change\.  
![\[Choose survey editing option\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-31.png)

   When you disable or delete a question, you are warned about the following:
   + If you disable a question, it no longer appears in the survey and responses to it are not collected\. Existing responses are preserved\.
   + If you delete a question from an active survey, you can no longer view any responses gathered for the question\.

## Modifying an Active Survey Schedule<a name="cloud-canvas-cloud-gem-in-game-survey-schedule-modifying"></a>

Follow the steps here to modify the schedule for an active survey\. For a nonactive \(draft\) survey, you specify a schedule when you publish the survey\.

**To edit a the schedule for an active survey**

1. On the **Overview** tab, choose the active survey whose schedule you want to change\.

1. On the **Questions** tab, choose **Edit Scheduling** from the menu for the survey\.  
![\[Choose Edit Scheduling\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-32.png)

1. In the **Edit Activation Period** dialog box, edit the schedule, and then choose **Modify**\.  
![\[Edit the schedule\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-33.png)

   The new schedule appears on the **Overview** tab in the entry for the survey \.

## Cloning a Survey<a name="cloud-canvas-cloud-gem-in-game-survey-cloning"></a>

You can clone a survey from another survey regardless of the original survey's status \(**Active**, **Scheduled**, **Draft**, or **Closed**\)\. After you clone a survey, you can edit it just as you would any other survey\.

**To clone a survey**

1. On the **Overview** or **Questions** tab, choose **Clone** from the menu for the survey that you want to clone\.  
![\[Choose Clone\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-34.png)

1. In the **Clone Survey** dialog box, enter a name for the cloned survey\. The cloned survey appears on the **Overview** tab\. Its status is **Draft**\.  
![\[Cloned survey\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-35.png)

1. Click the cloned survey to edit it\. Follow the same process as you would to edit and publish a new survey\.

1. After you have more than one survey, you can filter them on the **Overview** tab by status: **Active**, **Draft**, and/or **Scheduled**\.  
![\[Filter surveys by status\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-36.png)

## Ending a Survey<a name="cloud-canvas-cloud-gem-in-game-survey-ending"></a>

When you end a survey, the survey and its results are available in your survey history\.

**To end a survey**

1. On the **Overview** or **Questions** tab of the Cloud Gem Portal, choose **End** from the menu options for the survey\. Then choose **End Survey** in the confirmation dialog box\. The survey disappears from the **Overview** tab\.

1. Click the **History** tab\. The survey is present with the status of **Closed**\.  
![\[Closed survey on the History tab\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-37.png)

   On the **History** tab, you can perform the normal operations of deleting, editing, or cloning closed surveys from the menu options for each survey\.

## Reopening a Survey<a name="cloud-canvas-cloud-gem-in-game-survey-reopening"></a>

 You can choose a closed survey on the **History** tab and reopen the survey from the menu for the survey\.

**To reopen a survey**

1. On the **History** tab, select the survey that you want to reopen\.

1. On the **Questions** tab, choose **Reopen** from the menu options for the survey\.  
![\[Choose Reopen\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-in-game-survey-38.png)

1. In the **Edit Activation Period** dialog box, configure the schedule for the survey that you are reopening\. Then choose **Modify**\.

1. To confirm that the survey is now active, click the **Overview** tab\. The status for the survey is **Active**\.