# Permissions Metadata for Resource Definitions<a name="permissions-metadata-for-resource-definitions"></a>

To determine what permissions should go into a policy, the `Custom::AccessControl` resource looks for Cloud Canvas permissions metadata on resource definitions in resource group stacks\. In the following example, the metadata on the `Messages` resource gives the `SayHello` AWS Lambda function permission to put items into a Amazon DynamoDB table\. The metadata on the `SayHello` resource gives players permission to invoke the `SayHello` Lambda function\.

```
...
  
"Messages": {
    "Type": "AWS::DynamoDB::Table",
    "Properties": {
        "AttributeDefinitions": [
            {
                "AttributeName": "PlayerId",
                "AttributeType": "S"
            }
        ],
        "KeySchema": [
            {
                "AttributeName": "PlayerId",
                "KeyType": "HASH"
            }
        ],
        "ProvisionedThroughput": {
            "ReadCapacityUnits": { "Ref": "ReadCapacityUnits" },
            "WriteCapacityUnits": { "Ref": "WriteCapacityUnits" }
        }
    },
    "Metadata": {
        "CloudCanvas": {
            "Permissions": [
                {
                    "AbstractRole": "SayHello",
                    "Action": "dynamodb:PutItem"
                }
            ]
        }
    }
},
 
 
"SayHello": {
    "Type": "AWS::Lambda::Function",
    "Properties": {
        "Description": "Example of a function called by the game to write data into a DynamoDB table.",
        "Handler": "main.say_hello",
        "Role": { "Fn::GetAtt": [ "SayHelloConfiguration", "Role" ] },
        "Runtime": { "Fn::GetAtt": [ "SayHelloConfiguration", "Runtime" ] },
        "Code": {
            "S3Bucket": { "Fn::GetAtt": [ "SayHelloConfiguration", "ConfigurationBucket" ] },
            "S3Key": { "Fn::GetAtt": [ "SayHelloConfiguration", "ConfigurationKey" ] }
        }
    },
    "Metadata": {
        "CloudCanvas": {
            "Permissions": [
                {
                    "AbstractRole": "Player",
                    "Action": "lambda:InvokeFunction"
                }                       
            ]
        }
    }
},
  
...
```

You can use the `lmbr_aws` command line tool to manage permissions metadata on the resource definitions in a resource group's `resource-template.json` file\. For more information, see [Permission Metadata Management](cloud-canvas-rm-security-lmbr-aws.md#cloud-canvas-rm-security-lmbr-aws-permission-metadata-management)\.

## Properties<a name="cloud-canvas-resource-definitions-permissions-metadata-properties"></a>

Each Cloud Canvas `Permission` metadata object can have the following properties\.
+   
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/permissions-metadata-for-resource-definitions.html)

## See Also<a name="cloud-canvas-resource-definitions-permissions-metadata-see-also"></a>

For an overview of security in Cloud Canvas Resource Manager, see [Understanding the Resource Manager Security System](cloud-canvas-rm-security.md)\.