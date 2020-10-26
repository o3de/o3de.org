# Intermediate JSON Data Format<a name="az-code-gen-intermediate-json-data-format"></a>

****  
AZ Code Generator is in preview release and is subject to change\.

 The following JSON shows the intermediate data format consumed by Jinja2 custom templates\. 

```
{
    "meta": {
        "path": "<Path/To/Code/Generator/Input/File.ext>"
    },
    "objects": [
        {
            "name": "<Name of class/struct>",
            "qualified_name": "<Fully qualified name of class or struct>",
            "fields": [
                {
                    "type": "<member variable type>",
                    "canonical_type": "<member variable canonical type>",
                    "name": "<member variable name>",
                    "qualified_name": "<fully qualified member variable name>",
                    "annotations": {
                        "<annotation name>": {
                            "<annotation variable name>": "<annotation variable value (can be empty string)>",
                            ...
                        },
                        ...
                    }
                },
                ...
            ],
            "traits": {
                "isAbstract": <true if abstract class, false if concrete>,
                "isPOD": <true of plain old data type; otherwise, false>,
                "isPolymorphic": <true if polymorphic type; otherwise, false>
            },
            "bases" : [
                {
                    "name" : "<Base Class Name>",
                    "qualified_name" : "<Fully qualified name of base class>"
                },
                ...
            ],
            "meta": {
                "path": "<Path/To/File/Containing/This/Object.ext>"
            },
            "type": <"class" or "struct">,
            "annotations": {
                "<annotation name>": {
                    "<annotation variable name>": "<annotation variable value (can be empty string)>",
                    ...
                },
                ...
            },            
            "methods": [
                {
                    "name" : "<method_name>",
                    "qualified_name": "<Fully qualified name of method>",
                    "is_virtual": <true if virtual method; otherwise, false>,
                    "annotations": {
                        "<annotation name>": {
                            "<annotation variable name>": "<annotation variable value (can be empty string)>",
                            ...
                        },
                    "access": "<Access level of method, one of: public, private, protected>",
                    "params" : [
                        {
                            "type" : "<parameter type>",
                            "canonical_type" : "<parameter canonical type>",
                            "name" : "<parameter name>"
                        },
                        ...
                    ],
                    "uses_override": <true if override keyword is present; otherwise, false>,
                    "return_type": "<return type of method>"
                },
                ...
            ]
        },
        ...
    ]
}
```