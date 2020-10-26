# Template Drivers<a name="az-code-gen-template-drivers"></a>

****  
AZ Code Generator is in preview release and is subject to change\.

Template drivers are Python scripts that process the intermediate JSON data and route it into the Jinja2 output templates\. The scripts preprocess the data from the Clang front end, execute the template rendering, and control where the generated output is written to disk\.

These scripts are usually called by one or more code generation passes in WAF `wscript` files\. Each Python script can reference multiple templates\. This offers great flexibility in implementation, especially when multiple templates rely on the same preprocessed data\. 

**Topics**
+ [Specifying Drivers in Waf](#az-code-gen-template-drivers-specifying-in-waf)
+ [Creating a Template Driver in Python](#az-code-gen-template-drivers-python)
+ [Minimal Template Driver](#az-code-gen-template-drivers-minimal-template-driver)
+ [Rendering Templates](#az-code-gen-template-drivers-rendering-templates)
+ [Configuring Automatic Build Injection](#az-code-gen-template-drivers-configuring-automatic-build-injection)
+ [Preprocessing Intermediate Data](#az-code-gen-template-drivers-pre-processing-intermediate-data)

## Specifying Drivers in Waf<a name="az-code-gen-template-drivers-specifying-in-waf"></a>

Drivers are specified by file name in each code generation pass\. The file path is relative to the root of the `wscript` target\. All drivers are invoked on each input file\.

The following shows the structure of a sample Waf entry\.

```
'az_code_gen' = [
    {
        'files': [ <files to gen> ],
        'scripts': [ <list of script file paths relative to current wscript folder> ]
    }
]
```

For more details on how to specify passes, see [AZ Code Generator Integration with Waf ](az-code-gen-waf-integration.md)\.

## Creating a Template Driver in Python<a name="az-code-gen-template-drivers-python"></a>

To create a template driver in Python, you must import the `TemplateDriver` base class and override its methods\. The code for the class can be found in the `dev/Code/Tools/AzCodeGenerator/Scripts/az_code_gen/base.py` file\.

This class is automatically injected into Python by AZ Code Generator and only needs to be imported as `az_code_gen.base`, as in the following example\.

```
from az_code_gen.base import *
```

### Methods to Override in the TemplateDriver Class<a name="az-code-gen-template-drivers-templatedriver-class-methods"></a>

To implement your template driver, override the following methods in the `TemplateDriver` class\.

#### add\_dependency<a name="az-code-gen-template-drivers-templatedriver-class-methods-add-dependency"></a>

Call the `add_dependency` method to manually add a dependency to the `az_code_gen` task in Waf\. The file path given should be absolute so that the render template can specify additional dependencies that Waf does not automatically include\. These dependencies might be external data files used to render the templates, or files that were used to generate the input data\.

**Syntax**

```
add_dependency(self, dependency_file)
```

#### apply\_transformations<a name="az-code-gen-template-drivers-templatedriver-class-methods-apply-transformations"></a>

Override the `apply_transformations` method to manipulate the raw JSON object, which is passed in as the `obj` parameter\. Manipulations are performed in place on the object\. The object is then forwarded through the pipeline and is eventually passed to `jinja_args` of `render_templates`\. Any object returned by this method is provided to the Jinja environment as `extra_data`\.

**Syntax**

```
apply_transformations(self, obj)
```

For an example of this method, see [Preprocessing Intermediate Data](#az-code-gen-template-drivers-pre-processing-intermediate-data)\.

#### get\_expected\_tags<a name="az-code-gen-template-drivers-templatedriver-class-methods-get-expected-tags"></a>

Override the `get_expected_tags` method to return a list of tags that must be found in any input file\. If the required tags are not present, this driver is skipped\.

**Important**  
This method is deprecated as of Lumberyard v1\.6\. After Lumberyard v1\.6, all scripts will be processed regardless of expected tags, and `get_expected_tags` will not be invoked\.

**Syntax**

```
get_expected_tags(self)
```

### render\_template\_to\_file<a name="az-code-gen-template-drivers-templatedriver-class-methods-render-template-to-file"></a>

Renders a template to disk\. This method also adds the value of `output_file` as a dependency of the `az_code_gen` task in Waf\.

**Syntax**

```
render_template_to_file(self, template_file, template_kwargs, output_file, should_add_to_build=False)
```

#### Parameters<a name="az-code-gen-template-drivers-templatedriver-class-methods-render-template-to-file-parameters"></a>


****  

| Parameter | Description | 
| --- | --- | 
| template\_file | Specifies the path to a template relative to the directory that contains the template driver \.py file\. | 
| template\_kwargs | Specifies a dictionary of key–value pairs to be passed to Jinja\. Generally this should be treated as a passthrough variable for the jinja\_args given to render\_templates, but you can add additional key–value pairs\. | 
| output\_file | Specifies the target file for the rendered Jinja output\. The path is relative to the target output folder\. | 
| should\_add\_to\_build | A Boolean value that specifies whether Waf should add this file to the C\+\+ build and linker\. The default is false\. | 

### render\_templates<a name="az-code-gen-template-drivers-templatedriver-class-methods-render-templates"></a>

Override `render_templates` to invoke template rendering by calling `render_template_to_file`\. 

**Syntax**

```
render_templates(self, input_file, **jinja_args)
```

#### Parameters<a name="az-code-gen-template-drivers-templatedriver-class-methods-render-templates-parameters"></a>


****  

| Parameter | Description | 
| --- | --- | 
| input\_file | The path relative to the input path that is used to invoke Clang\.  | 
| jinja\_args | The raw data from the intermediate JSON object after the template driver performs preprocessing on the object\. | 

## Minimal Template Driver<a name="az-code-gen-template-drivers-minimal-template-driver"></a>

The minimum code required for a template driver is to derive from the `TemplateDriver` base class and implement a factory function to construct the template driver\.

```
from az_code_gen.base import *

class MyTemplateDriver(TemplateDriver):
    pass

# Factory function - called from launcher
def create_drivers(env):
    return [MyTemplateDriver(env)]
```

The `az_code_gen` module is automatically provided by AZ Code Generator\. It contains the `TemplateDriver` and other useful methods from the `base.py` file\.

The `create_drivers` function simply forwards the Jinja environment that is used to render templates\. However, you can alter the function to perform other work when the driver is instantiated\.

**Note**  
The above bare\-bones implementation works but does not generate any output\.

## Rendering Templates<a name="az-code-gen-template-drivers-rendering-templates"></a>

To generate some output, you must implement the `render_templates` method, as in the following example\.

```
from az_code_gen.base import *

class MyTemplateDriver(TemplateDriver):
    def render_templates(self, input_file, **jinja_args):
        self.render_template_to_file("MyTemplate.tpl", jinja_args, 'GeneratedCode.cpp')

# Factory function - called from launcher
def create_drivers(env):
    return [MyTemplateDriver(env)]
```

The `render_templates` method takes the relative `input_file` path and any arguments that were passed in from the `AZCodeGenerator.exe` utility\. The `input_file` path usually contains inputs such as the intermediate `json_object` created by Clang\.

Template drivers can extend this information by implementing the `apply_transformations` method\. For more information, see [Preprocessing Intermediate Data](#az-code-gen-template-drivers-pre-processing-intermediate-data)\.

The `render_template_to_file` method takes a template file and argument key–value pairs to pass into the template engine directly and an output path to write the template engine render output to disk\.

## Configuring Automatic Build Injection<a name="az-code-gen-template-drivers-configuring-automatic-build-injection"></a>

At this point, the example generates a minimal `.cpp` file\. The example above does not compile or link the `.cpp` file\. This is appropriate if you intend to include the generated code manually using an `#include` in another file\.

To inject the generated file automatically, add the `should_add_to_build` parameter to the `render_template_to_file` method and pass the parameter the value of `true`\. The `should_add_to_build` parameter informs Waf that the generated file needs to be built and linked into the current target\.

**Note**

Using the `should_add_to_build` parameter is not recommended for header files or other generated files that are not C\+\+ code that must be compiled and linked\.

The following example shows some build injected output\.

```
from az_code_gen.base import *

class MyTemplateDriver(TemplateDriver):
    def render_templates(self, input_file, **jinja_args):
        self.render_template_to_file("MyTemplate.tpl", jinja_args, 'GeneratedCode.cpp', should_add_to_build=True)

# Factory function - called from launcher
def create_drivers(env):
    return [MyTemplateDriver(env)]
```

## Preprocessing Intermediate Data<a name="az-code-gen-template-drivers-pre-processing-intermediate-data"></a>

Some cases require preprocessing of the intermediate data for easier consumption by the template engine\. To do this, implement the `apply_transformations` method in your template driver\. You can use this method to access the intermediate JSON data object directly before it gets passed to `render_templates`\. An example follows\.

```
from az_code_gen.base import *

class MyTemplateDriver(TemplateDriver):
    def render_templates(self, input_file, **jinja_args):
        self.render_template_to_file("MyTemplate.tpl", jinja_args, 'GeneratedCode.cpp')
 
    def apply_transformations(self, obj):
        obj['my_custom_data'] = 42

# Factory function - called from launcher
def create_drivers(env):
    return [MyTemplateDriver(env)]
```

For information on the contents of the `obj` variable, see [Intermediate JSON Data Format](az-code-gen-intermediate-json-data-format.md)\.