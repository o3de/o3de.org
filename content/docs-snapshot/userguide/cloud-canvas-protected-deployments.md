# Using Protected Deployments<a name="cloud-canvas-protected-deployments"></a>

You can use Cloud Canvas to mark specific deployments as protected\. Protected status makes it more difficult for users like programmers, testers, or game developers to inadvertently connect a development game client to live resources\. 

When a user starts a protected game, a message box notifies the user that he or she is attempting to use a protected deployment\. The user is given the option to not connect before any potentially harmful data is transmitted\. 

The protection feature purposely uses a message box that "breaks" automation\. If the scripts that run tests are configured to use a protected deployment, the Lumberyard client will not continue without human intervention\. 

## When Protected Deployments Are Detected<a name="cloud-canvas-protected-deployments-detection"></a>

When a game is run from Lumberyard Editor, protection is always detected\. When a game is run from a Windows launcher, protection is detected only when the launcher is running in debug mode\. 

## Marking a Deployment as Protected<a name="cloud-canvas-protected-deployments-marking"></a>

Currently, you must set the protection from the `lmbr_aws` command line tool by using the `protect-deployment` command\. 

The `protect-deployment` command uses the following parameters\.

`--set <deployment_name>` – Specifies that the deployment is protected\. 

`--clear <deployment_name>` – Specifies the deployment is not protected\. 

`--show` \- Displays a list of currently protected deployments\. 

To display the protected status of deployments, you can also use either the `list-deployments` or `list-mappings` command\. 

## Viewing Protected Status in Cloud Canvas Resource Manager<a name="cloud-canvas-protected-deployments-rm-viewing"></a>

In Cloud Canvas Resource Manager, you can view, but not change, the status of protected deployments\. The ability to change the protected status of deployments from Lumberyard Editor is planned for a future release\. 

**Note**  
Setting a deployment to protected does not prevent you from deploying or deleting resources by using Cloud Canvas Resource Manager or the `lmbr_aws` command line tool; it only enables the warning functionality\. For this reason, be careful not to make unnecessary changes to critical deployments\. A more comprehensive model for protecting deployments is planned for a future version of Lumberyard\.