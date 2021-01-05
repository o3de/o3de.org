---
description: ' Use &ALYlong;''s AZ Code Generator to generate source code (such as
  boilerplate code) from specially tagged source code. '
slug: az-code-gen-intro
title: Automating boilerplate with AZ Code Generator
---
# Automating boilerplate with AZ Code Generator<a name="az-code-gen-intro"></a>


****  

|  | 
| --- |
| AZ Code Generator is in preview release and is subject to change\. | 

AZ Code Generator is a command line utility that generates source code \(or any data or text\) from specially tagged source code\. You can use it when the structure of the intended code is known in advance so that templates can be made for it\. For example, you could generate boilerplate code for serialization or reflection\. 

 AZ Code Generator parses a list of existing C\+\+ source files and/or header files and generates intermediate data in JSON format\. It passes the intermediate data to a series of templates\. 

The templates provide the format for the code that is generated\. Templates make increased coding efficiency possible because they enable automatic updates of boilerplate code\. When a template is updated, all related generated code is regenerated in the next build\. This removes the need to update the glue code manually or to use error\-prone find\-and\-replace operations\. 

![\[Image NOT FOUND\]](/images/userguide/az-code-gen-workflow.png)

**Topics**
+ [Workflow Summary](#az-code-gen-intro-workflow-summary)
+ [Waf](#az-code-gen-intro-waf)
+ [Clang](#az-code-gen-intro-clang)
+ [Intermediate JSON Data](#az-code-gen-intro-intermediate-json-data)
+ [AZ Code Generator and Python](#az-code-gen-intro-python)
+ [Template Drivers and Template Rendering](#az-code-gen-intro-template-drivers-rendering)
+ [Generated Files](#az-code-gen-intro-generated-files)
+ [AZ Code Generator Integration with Waf](az-code-gen-waf-integration.md)
+ [AZ Code Generator Parameters](az-code-gen-parameters.md)
+ [Code Generation Templates](az-code-gen-templates.md)
+ [Template Drivers](az-code-gen-template-drivers.md)
+ [Custom Code Generator Annotations](az-code-gen-custom-annotations.md)
+ [Waf Debugging with AZ Code Generator](az-code-gen-waf-debugging.md)
+ [Template Driver Debugging](az-cod-gen-template-driver-debugging.md)
+ [Debugging the AZ Code Generator Utility](az-code-gen-utility-debugging.md)
+ [Intermediate JSON Data Format](az-code-gen-intermediate-json-data-format.md)

## Workflow Summary<a name="az-code-gen-intro-workflow-summary"></a>

The following steps describe how AZ Code Generator works with Waf to generate code\.

1. The Waf build system invokes AZ Code Generator for the `.h` and `.cpp` source files that are specified in the `wscript` file\. 

1.  AZ Code Generator runs one or more passes with the specified files\. 

1. Each pass includes the following: 

   1. AZ Code Generator uses the Clang front\-end compiler to produce an abstract syntax tree \(AST\) for each provided source file\. The Clang parser attempts to compile the input\. For increased speed, Clang can be instructed to not follow `#include` statements and to suppress all errors\.

   1. The AST is translated into an intermediate JSON format\.

   1. The intermediate JSON object is passed into a template driver as a Python script and then into a Jinja2 template\. Each driver and template implements specific code generation tasks\.

   1. The template driver performs any preprocessing that you want on the intermediate JSON object\.

   1. The intermediate JSON is then passed to Jinja2 templates\.

   1. Each template driver can have an arbitrary number of templates, which can output to an arbitrary number of output files\. Multiple templates can have the same output file or different output files as the template driver creator wants\.

1. AZ Code Generator returns a list of generated files to the Waf build system\.

1. The Waf build system completes the build process, including the generated code in the build\. 

The following sections provide more detail about this process\.

## Waf<a name="az-code-gen-intro-waf"></a>

 The AZ Code Generator is fully integrated into the [Using the Waf Build System](waf-intro.md)\. You can use the Waf `az_code_gen` feature to invoke the AZ Code Generator\. We recommend that you use Waf rather than the command line to start the `AzCodeGenerator.exe` utility\. 

 For examples and more information about the Waf integration, see [AZ Code Generator Integration with Waf ](az-code-gen-waf-integration.md)\. 

## Clang<a name="az-code-gen-intro-clang"></a>

The default front end of the AZ Code Generator is a [Clang](http://clang.llvm.org/index.html) parser/compiler for C\+\+ source code\. AZ Code Generator uses Clang to parse source code \(which might include custom tags\) and generate the intermediate JSON data object\. AZ Code Generator fully controls Clang's parser and compilation phase so that it can selectively suppress or enable features such as diagnostics\. This gives AZ Code Generator the flexibility to ignore source code that might fail to compile and still attempt to generate a complete intermediate object\.

## Intermediate JSON Data<a name="az-code-gen-intro-intermediate-json-data"></a>

 The Clang front end compiler outputs an intermediate JSON data structure that the generator passes to templates for further processing\. An example intermediate JSON data object follows\. 

```
[
    {
        'name' : 'Component',
        'qualified_name' : 'AZ::Component',
        'fields' : [],
        'bases' : [],
        'meta' : {
            'path' : 'D:\\Repo\\Ly\\branches\\AzComponents\\Code\\Tools\\AzCodeGenerator\\CodeGenTest.h'
        },
        'type' : 'class',
        'annotations' : {},
        'methods' : []
    },
    {
        'name' : 'TestingClass',
        'qualified_name' : 'TheNamespace::TestingClass',
        'fields' : [
            {
                'type' : 'float',
                'name' : 'm_field2',
                'qualified_name' : 'TheNamespace::TestingClass::m_field2',
                'annotations' : {}
            }
        ],
        'bases' : [
            {
                'name' : 'Component',
                'qualified_name' : 'AZ::Component'
            }
        ],
        'meta' : {
            'path' : 'D:\\Repo\\Ly\\branches\\AzComponents\\Code\\Tools\\AzCodeGenerator\\CodeGenTest.h'
        },
        'type' : 'class',
        'annotations' : {},
        'methods' : [
            {
                'params' : ['type', 'int', 'name', 'version'],
                'name' : 'CreateArgumentAnnotation',
                'qualified_name' : 'TheNamespace::TestingClass::CreateArgumentAnnotation',
                'annotations' : {}
            }
        ]
    }
]
```

For complete syntax of the intermediate JSON data object, see [Intermediate JSON Data Format](az-code-gen-intermediate-json-data-format.md)\. 

## AZ Code Generator and Python<a name="az-code-gen-intro-python"></a>

AZ Code Generator depends on Python 3\.7 or later to run template drivers and render [Jinja](http://jinja.pocoo.org/) templates\. The Python C API is used to extend Python with methods in the `azcg_extension` module that permit template drivers to report dependencies, errors, and useful informational output\. In Windows, Python 3\.7 is included in the Lumberyard `dev/Tools/Python` directory\. On macOS, AZ Code Generator uses the version of Python that is included with the operating system\.

**Note**  
To debug Python C API calls when using AZ Code Generator, you must download [CPython](https://www.python.org/downloads/)\. Then make a build for your intended debug OS\.

## Template Drivers and Template Rendering<a name="az-code-gen-intro-template-drivers-rendering"></a>

You can use template drivers written in Python to alter the intermediate data structure before passing it to the template engine\. After preprocessing, the template driver might direct the Jinja2 template engine to render one or many templates, depending on the generated code that you want\. 

AZ Code Generator uses the [Jinja2](http://jinja.pocoo.org/) template engine, which is downloaded by the Python [easy\_install](http://peak.telecommunity.com/DevCenter/EasyInstall) script in the `\dev\Tools\Python\3.7.5\windows\Scripts` directory\. The engine is then copied into the Lumberyard `3rdParty\jinja2` directory\. Lumberyard also provides a `jinja_extensions` module, which contains helper methods that you can use inside templates\. These extensions are stored in the `dev/Code/Tools/AzCodeGenerator/Scripts/jinja_extensions/` directory\. For examples and more information about Jinja templates, see [Code Generation Templates](az-code-gen-templates.md)\. 

## Generated Files<a name="az-code-gen-intro-generated-files"></a>

The following sample output was generated from a serialization template\. The reference JSON object has been formatted for readability\.

```
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// THIS CODE IS AUTOGENERATED, DO NOT MODIFY
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
#include "stdafx.h"
#include <AZCore/Rtti/ReflectContext.h>
#include <AzCore/Rtti/Rtti.h>
#include <AzCore/Serialization/SerializeContext.h>
#include <AzCore/Math/Vector3.h>
#include "D:/Repo/Ly/branches/AzComponents/Code/Tools/AzCodeGenerator/CodeGenTest.h"
namespace Components
{
    void TestingClassReflect(AZ::ReflectContext* reflection)
    {
        AZ::SerializeContext* serializeContext = azrtti_cast<AZ::SerializeContext*>(reflection);
        if (serializeContext)
        {
            serializeContext->Class<TestingClass>()
                     ->SerializerForEmptyClass()                 ;
        }
    }
}
///////////////////////////////////////////////////////////////
/*
// Reference JSON object
[{  
   'name':'Component',
   'qualified_name':'AZ::Component',
   'fields':[  

   ],
   'bases':[  

   ],
   'meta':{  
      'path':'D:\\Repo\\Ly\\branches\\AzComponents\\Code\\Tools\\AzCodeGenerator\\CodeGenTest.h'
   },
   'type':'class',
   'annotations':{  

   },
   'methods':[  

   ]
},
{  
   'name':'TestingClass',
   'qualified_name':'TheNamespace::TestingClass',
   'fields':[  
      {  
         'type':'float',
         'name':'m_field2',
         'qualified_name':'TheNamespace::TestingClass::m_field2',
         'annotations':{  

         }
      }
   ],
   'bases':[  
      {  
         'name':'Component',
         'qualified_name':'AZ::Component'
      }
   ],
   'meta':{  
      'path':'D:\\Repo\\Ly\\branches\\AzComponents\\Code\\Tools\\AzCodeGenerator\\CodeGenTest.h'
   },
   'type':'class',
   'annotations':{  

   },
   'methods':[  
      {  
         'params':[  
            'type',
            'int',
            'name',
            'version'
         ],
         'name':'CreateArgumentAnnotation',
         'qualified_name':'TheNamespace::TestingClass::CreateArgumentAnnotation',
         'annotations':{  

         }
      }
   ]
}]
*/
```