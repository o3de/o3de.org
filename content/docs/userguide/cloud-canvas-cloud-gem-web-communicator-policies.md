# Web Communicator Cloud Gem Authentication and AWS Policies<a name="cloud-canvas-cloud-gem-web-communicator-policies"></a>

The default Web Communicator authentication system uses authenticated Amazon Cognito users with AWS Signature Version 4\. For more information, see [Authenticating Requests \(AWS Signature Version 4\)](https://docs.aws.amazon.com/general/latest/gr/sig-v4-authenticating-requests.html) in the *AWS General Reference*\.

**Note**  
Lumberyard advises against implementing unauthenticated access\. If you surrender control over which users can connect to your [AWS IoT](https://aws.amazon.com/iot-core) network, you can incur unexpected costs\.

Connection to AWS IoT requires two policies, which Web Communicator generates for you:
+ A `PlayerAccess` role that can connect to, subscribe to, and receive messages from any AWS resource that is added to Web Communicator\.
+ An AWS IoT policy that allows authenticated users to use their Amazon Cognito Identity as their client ID for connection purposes\. The policy grants the aggregate channel the permissions that have been requested from the other cloud gems\.

You do not have to make changes to these generated policies to use them\. The following sections provide reference samples of the generated policies if you want to modify them\.

## Amazon Cognito Policy Sample<a name="cloud-canvas-cloud-gem-web-communicator-policies-amazon-cognito-policy-sample"></a>

The following sample Amazon Cognito policy grants the `IotPlayerPermissions1` user permissions to connect, subscribe, and receive\.

```
{
    "Action": [
        "iot:Connect",
        "iot:Subscribe",
        "iot:Receive"
    ],
    "Resource": [
        "*"
    ],
    "Effect": "Allow",
    "Sid": "IotPlayerPermissions1"
}
```

## AWS IoT Policy Sample<a name="cloud-canvas-cloud-gem-web-communicator-policies-aws-iot-policy-sample"></a>

The following sample AWS IoT policy is attached to a client\. The final AWS IoT policy is an aggregation of channels from the cloud gems that the client uses\.

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "iot:Connect"
      ],
      "Resource": [
        "arn:aws:iot:us-east-1:123456789012:client/${cognito-identity.amazonaws.com:sub}"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "iot:Receive"
      ],
      "Resource": [
        "*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "iot:Subscribe"
      ],
      "Resource": [
        "arn:aws:iot:us-east-1:123456789012:topicfilter/Gems/CloudGemWebCommunicator/Broadcast",

        "arn:aws:iot:us-east-1:123456789012:topicfilter/Gems/CloudGemWebCommunicator/Private/${cognito-identity.amazonaws.com:sub}"
      ]
    }
  ]
}
```