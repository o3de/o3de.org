# Custom Code Generator Annotations<a name="az-code-gen-custom-annotations"></a>

****  
AZ Code Generator is in preview release and is subject to change\.

You can provide additional data to your template driver by attaching annotations and tags to your source code\.

**Topics**
+ [Reference Annotations](#az-code-gen-custom-annotations-reference)
+ [Helper Macros](#az-code-gen-custom-annotations-helper-macros)
+ [Example Annotations](#az-code-gen-custom-annotations-examples)

## Reference Annotations<a name="az-code-gen-custom-annotations-reference"></a>

When you create custom code generator annotations, it is a good idea to refer for examples to the existing annotations in the `dev/Code/Framework/AZCore/AZCore/Preprocessor/CodeGen.h` file\. The existing annotations use macros extensively as a workaround for the lack of proper annotations in C\+\+\.

Clang provides an `annotate` attribute that can be read at parse time\. You can use the helper macros provided to create new annotations, as in the following example\. 

```
__attribute__((annotate("<Some string here>")))
```

This attribute is wrapped with a macro that converts its contents into strings that can be parsed by the AZ Code Generator utility\.

## Helper Macros<a name="az-code-gen-custom-annotations-helper-macros"></a>

AZ Code Generator has two helper macros for annotations: `AZCG_CreateAnnotation` and `AZCG_CreateArgumentAnnotation`\.

### AZCG\_CreateAnnotation<a name="az-code-gen-custom-annotations-helper-macros-createannotation"></a>

`AZCG_CreateAnnotation` is the core macro that exposes the underlying Clang `annotate` attribute\. The macro definition follows\.

```
// AZCG_CreateAnnotation
#define AZCG_CreateAnnotation(annotation) __attribute__((annotate(annotation)))
```

Any argument passed to `AZCG_CreateAnnotation` must be a string\.

### AZCG\_CreateArgumentAnnotation<a name="az-code-gen-custom-annotations-helper-macros-createargumentannotation"></a>

The `AZCG_CreateArgumentAnnotation` macro is commonly used for annotation macros\. The macro definition follows\.

```
// AZCG_CreateArgumentAnnotation
#define AZCG_CreateArgumentAnnotation AZCG_CreateAnnotation(AZ_STRINGIZE(annotation_name) "(" AZ_STRINGIZE((__VA_ARGS__)) ")")
```

The `AZCG_CreateArgumentAnnotation` macro takes an `annotation_name` argument and a number of variable arguments\. The values passed to the variable arguments are collapsed into a single string for parsing by the AZ Code Generator\.

## Example Annotations<a name="az-code-gen-custom-annotations-examples"></a>

This section provides example annotations\. One example forwards arguments to the underlying macro, one places an annotation inside a class, and one injects code back into the originating file\.

### Simple Annotation<a name="az-code-gen-custom-annotations-examples-simple"></a>

The following example creates a new annotation called `AzExample` that forwards its arguments to the underlying macro\.

```
//Sample Annotation
#define AzExample(...) AZCG_CreateArgumentAnnotation(AzExample, __VA_ARGS__)
```

In this example, the private and public names of the annotation are the same\. However, the external and internal names do not have to match\.

You can attach the `AzExample` annotation to most items in C\+\+, as in the following example\.

```
// Sample Tag Usage
class ExampleClass
{
    AzExample(description("I am data!"))
    int m_myData;
}
```

The tags inside the annotation are placed in JSON format in the generated intermediate data object, as in the following example\. Some data has been removed for readability\.

```
// Sample Tag JSON
{
    "type": "class",
    "name": " ExampleClass",
    "annotations" : {},
    "fields": [
        {
            "name": "m_myData",
            "annotations" : {
                "description" : "I am data!"
                }
            }
        }
    ]
}
```

### Class Annotation Example<a name="az-code-gen-custom-annotations-examples-class"></a>

The following example directs the AZ Code Generator utility to attach a free\-floating annotation to a class\.

```
// Class Tag Macro
#define AzExampleClass(...) AZCG_CreateArgumentAnnotation(AzExampleClass, Class_Attribute, __VA_ARGS__) int AZ_JOIN(m_azCodeGenInternal, __COUNTER__);
```

`AzExampleClass` – Specifies the annotation name `AzExampleClass` \(instead of `AzExample`, as in the previous example\)\.

`Class_Attribute` – Causes the AZ Code Generator utility to attach the attribute to the class that contains the annotation\. The annotation belongs to the `annotations` property of the class object\. 

`__VA_ARGS__` – Specifies additional parameters that are converted into a single string and passed into the AZ Code Generator utility for parsing\.

`int AZ_JOIN(m_azCodeGenInternal, __COUNTER__)` – `AZ_JOIN` is a helper macro that takes two macro\-level entries and joins them together without converting them to strings\. Because Clang requires annotation attributes be attached to a function or variable, this example uses `AZ_JOIN` and a temporary integer member variable to do this\. The temporary integer member variable is then ignored\.

Adding the new tag to the previous example produces the following code:

```
//Class Tag Example 
class ExampleClass
{
    AzExampleClass(MyExampleClassTags::description("I am an example class!"));
    AzExample(MyExamplePropertyTags::description("I am data!"))
    int m_myData;
}
```

This produces the following intermediate JSON object\. Some data has been removed for ease of comprehension\.

```
// Class Tag JSON
"type": "class",
"name": "SampleClass",
"annotations" : {
    "MyExampleClassTags::description" : "I am an example class!"
},
"fields": [
    {
        "name": "m_myData",
        "annotations" : {
            "MyExamplePropertyTags::description" : "I am data!"
        }
    }
]
```

Notice that the above JSON does not look exactly like the JSON in the intermediate files provided as part of AZ framework\. This is because Lumberyard uses namespaces on its tags to also provide a hierarchy for the tags on its drivers and templates\. We recommend that you import the `clang_cpp.py` file and run the `format_cpp_annotations(json_object)` function on the intermediate JSON\. When you do, you can use all of the convenient patterns and functions in our drivers and scripts\.

The following example shows the same intermediate JSON object after processing by `format_cpp_annotations()`\.

```
// Output of format_cpp_annotations()
"type": "class",
    "name": "SampleClass",
    "annotations" : {
        "MyExampleClassTags": {
           "description" : "I am an example class!"
        }
    },
    "fields": [
        {
            "name": "m_myData",
            "annotations" : {
                "MyExamplePropertyTags": {
                    "description" : "I am data!"
                 }
            }
        }
    ]
```

### Generated Code Injection Example<a name="az-code-gen-custom-annotations-examples-generated-code-injection"></a>

The following example shows how to automatically inject generated code back into the original file\. The example extends the previously created `AzExampleClass` annotation by injecting code into the example class\.

```
// Code Injection Macro
#if defined(AZ_CODE_GENERATOR)
#   define AzExampleClass(ClassName, ...) AZCG_CreateArgumentAnnotation(AzExampleClass, Class_Attribute, identifier(ClassName), __VA_ARGS__) int AZ_JOIN(m_azCodeGenInternal, __COUNTER__);
#else
#   define AzExampleClass(ClassName, ...) AZ_JOIN(AZ_GENERATED_CODE_,ClassName)
#endif // AZ_CODE_GENERATOR
```

The updated annotation adds a new required parameter called `ClassName`, which is an identifier that is used to inject the code\. The identifier is passed in to Clang as `identifier(ClassName)`, and the data is provided to the intermediate JSON\. 

Up until this point, the annotation macro outside of `AZ_CODE_GENERATOR` has been blank\. The next step is to have it expand to the identifier of the code\-generated macro\. This causes the generated code to replace the macro annotation when the generated file is put in an `#include` statement\.

To implement this, the example sets the macro to become `AZ_JOIN(AZ_GENERATED_,ClassName)`\. As before, `AZ_JOIN` in this example renders this as `AZ_GENERATED_CODE_ExampleClass`\. The `ClassName` parameter provides a name at compile time for the generated macro\.

**Note**  
It is not required that `ClassName` be the actual name of the class where the tag is used\. Other tags that use this mechanism can simply require any unique identifier\.

When the previous example code is updated, the following code is produced:

```
// Generated Injection Code
class ExampleClass
{
      AzExampleClass(ExampleClass, description("I am an example class!"));
      AzExample(description("I am data!"))
      int m_myData;
}
```

This code produces the following intermediate JSON\. Note the new identifier annotation on the class\. Some data has been removed for readability\.

```
// Generated Code Injection JSON
"type": "class",
"name": "SampleClass",
"annotations" : {
       "AzExampleClass" :  {
              "identifier" : "ExampleClass",
              "description" : "I am an example class!"
       }
},
"fields": [
       {
              "name": "m_myData",
              "annotations" : {
                     "AzExample" : {
                             "description" : "I am data!"
                     }
              }
       }
]
```

This result doesn't compile until the following template code used with the annotation produces the intended macro\.

```
// Template Code
{% if class.annotations.identifier is defined %}
#define AZ_GENERATED_CODE_{{ asStringIdentifier(class.annotations.identifier) }}\
public: \
{# This method is injected for all classes with the AzExampleClass tag #}
bool IsExampleClass(void) { return true; }
{% endif %}
```

This code generates the following code for injection:

```
// Generated Code for Injection
#define AZ_GENERATED_CODE_ExampleClass \
     bool IsExampleClass(void) { return true; }
```

If the generated header is placed in an `#include` statement in the original code, any code in this macro will be injected into `ExampleClass`\.