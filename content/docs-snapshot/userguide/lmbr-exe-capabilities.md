# Capabilities Commands<a name="lmbr-exe-capabilities"></a>

Use the following commands to create and modify Lumberyard capabilities\.

**list**  
Lists all of the Lumberyard capabilities\.  

```
lmbr capabilities list
```

**create**  
Creates a new Lumberyard capability\. Include the ID, description, and tooltip\.  

```
lmbr capabilities create new_capability_name "This is the description." "This is the tooltip."
```
You can also specify the following arguments:  
+ `-help (bool)`: Displays help descriptions of available commands and options\.
+ `-tag (list)`: String tags associated with the capability\.
+ `-default (bool)`: True if capability is default; otherwise false\.
+ `-enable (bool)`: True if you want to enable the capability right away\.

**disable**  
Disables a Lumberyard capability\.  

```
lmbr capabilities disable lumberyard_capability
```

**enable**  
Enables a Lumberyard capability\.  

```
lmbr capabilities enable lumberyard_capability
```

**istagset**  
Queries if the tag is set in enabled capabilities\.  

```
lmbr capabilities istagset tag_of_capability_to_check
```