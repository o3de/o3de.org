# Command Reorganization<a name="cloud-canvas-command-line-revision"></a>

As of Lumberyard 1\.9, the commands made available by the `lmbr_aws` command line tool have been reorganized\. The previous commands are still functional but are subject to removal in a future release\.

The following table shows how the previous commands map to the new commands\. In a few cases single commands have been split into two or more commands for clarity and ease of use\. These are commented accordingly\. For information about the commands, see [Using the Cloud Canvas Command Line](cloud-canvas-command-line.md)\.


****  

| Previous Command | New Command | 
| --- | --- | 
| add‑login‑provider | login‑provider add | 
| add‑profile | profile add | 
| add‑resource‑group | resource‑group add | 
| clear‑parameter | parameter clear | 
| create‑deployment | deployment create | 
| create‑project‑stack | project create | 
| default‑deployment | deployment default | 
| default‑profile | profile default | 
| delete‑deployment | deployment delete | 
| delete‑project‑stack | project delete | 
| get‑function‑log | function get‑log | 
| import‑resource | resource‑importer import‑resource | 
| list‑deployments | deployment list | 
| list‑importable‑resources | resource‑importer list‑importable‑resources | 
| list‑mappings | mappings list | 
| list‑parameters | parameter list | 
| list‑profiles | profile list | 
| list‑resource‑groups | resource‑group list | 
| list‑resources |  `project list‑resources` `deployment list‑resources` `resource‑group list‑resources` The `list‑resources` command supported `‑‑deployment` and `‑‑resource‑group` arguments\. The `project list‑resources` command is the same as `list‑resources` without the `‑‑deployment` and `‑‑resource‑group` arguments\. The `deployment list‑resources` command is the same as `list‑resources` with only the `‑‑deployment` argument\. The `resource‑group list‑resources` command is the same as `list‑resources` with both the `‑‑deployment` and `‑‑resource‑group` arguments\.  | 
| protect‑deployment | deployment protect | 
| release‑deployment | deployment release | 
| remove‑login‑provider | login‑provider remove | 
| remove‑profile | profile remove | 
| remove‑resource‑group | resource‑group remove | 
| rename‑profile | profile rename | 
| set‑parameter | parameter set | 
| update‑deployment‑access‑stack | deployment update‑access | 
| update‑login‑provider | login‑provider update | 
| update‑mappings | mappings update | 
| update‑profile | profile update | 
| update‑project‑code | project update‑code | 
| update‑project‑stack | project upload You can use `project update` instead of `project upload`\.  | 
| upload‑lambda‑code | function upload‑code | 
| upload‑resources |  `deployment upload` `resource‑group upload ` The `upload‑resources` command supported a `‑‑resource‑group` argument\. The `deployment upload` command is the same as `upload‑resources` without the `‑‑resource‑group` argument\. The `resource‑group upload` command is the same as `upload‑resources` with the `‑‑resource‑group` argument\. You can use `deployment update` and `resource‑group update` instead of `deployment upload` and `resource‑group upload`\.  | 

## Argument Aliases<a name="cloud-canvas-command-line-revision-option-aliases"></a>

As a convenience, aliases have been added for the following common arguments\.


****  

| Argument | Alias Equivalent | 
| --- | --- | 
| ‑‑assume‑role | ‑R | 
| ‑‑confirm‑aws‑usage | ‑C | 
| ‑‑deployment | ‑d | 
| ‑‑function | ‑f | 
| ‑‑log‑stream‑name | ‑l | 
| ‑‑parameter | ‑p  | 
| ‑‑profile | ‑P | 
| ‑‑resource‑group | ‑r | 
| ‑‑value | ‑v | 