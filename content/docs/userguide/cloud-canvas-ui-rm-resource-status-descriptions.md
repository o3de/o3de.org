# Understanding Resource Status Descriptions<a name="cloud-canvas-ui-rm-resource-status-descriptions"></a>

The status of AWS resources is displayed in the **Cloud Canvas Resource Manager** in places such as the progress log\. The following list provides descriptions of common resource status codes\. To see the reason for the current status, you can pause your mouse on the status text in the resource manager\.

**Create in progress** – The resource is in the process of being created in AWS\. 

**Create complete** – The resource has been successfully created in AWS\.

**Create failed** – The resource could not be created in AWS\.

**Update in progress** – The resource is in the process of being updated in AWS\.

**Update complete** – The resource was successfully updated in AWS\.

**Update failed** – The resource could not be updated in AWS\.

**Delete in progress** – The resource is in the process of being deleted in AWS\.

**Delete complete** – The resource has been deleted in AWS\.

**Rollback in progress** – An operation has failed and AWS CloudFormation is attempting to restore the resource to its previous state\.

**Rollback failed** – A rollback has failed\. The AWS resources in a CloudFormation stack that have this status are in an inconsistent state\. You may have to delete and recreate the stack\.