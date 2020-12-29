# Automatic and Manual Submit Modes<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-jira-automatic-and-manual-submit-modes"></a>

The following sections describe the automatic and manual submit modes in greater detail\.

## Automatic Mode<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-jira-automatic-mode"></a>

Automatic Jira ticket submit mode has the following workflow:

1. The game client sends defect reports to the [Game Metrics cloud gem](cloud-canvas-metrics-gem.md)\.

1. The Game Metrics cloud gem Lambda function adds the reports to Amazon Simple Queue Service \(Amazon SQS\)\.

1. The consumer Lambda function of the Game Metrics cloud gem reads from Amazon SQS every five minutes and uses [cross\-gem communication](cloud-canvas-cgf-service-api-cross-gem-communication.md) to send events to the Defect Reporter cloud gem\.

1. The service Lambda function of the Defect Reporter cloud gem checks whether automatic submit mode is enabled\.

1. If automatic submit mode is enabled, the service Lambda function of the Defect Reporter cloud gem uses your custom dedupping code to check for duplicate reports\.

1. If the report is not a duplicate, a Jira ticket is created\. If the report is a duplicate, the defect occurrence count is incremented\.

## Manual Mode<a name="cloud-canvas-cloud-gem-defect-reporter-cgp-jira-manual-mode"></a>

Manual Jira ticket submit mode has the following workflow:

1. In the Cloud Gem Portal, the user selects defect reports to file and creates Jiras in individual or group mode\.

1. The service Lambda function of the Defect Reporter cloud gem uses your custom dedupping code to check for duplicate reports\.

1. If the report is not a duplicate, a Jira ticket is created\. If the report is a duplicate, the occurrence count is incremented\.