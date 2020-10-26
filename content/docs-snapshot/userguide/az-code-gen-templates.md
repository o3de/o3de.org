# Code Generation Templates<a name="az-code-gen-templates"></a>

****  
AZ Code Generator is in preview release and is subject to change\.

AZ Code Generator uses the [Jinja2](http://jinja.pocoo.org/) template engine for Python to render its output\. The Jinja template engine outputs plain text with embedded variable and logic statements\.

Jinja templates are designed to be highly readable and mimic the overall structure of the desired output\. They are processed top to bottom\. Any text outside of the control block in the template is sent directly to the output\.

The following are some example templates\. For more information about creating Jinja templates, refer to the [Jinja Template Designer Documentation](http://jinja.pocoo.org/docs/dev/templates/)\.

**Topics**
+ [Simple Example](#az-code-gen-templates-simple-example)
+ [Complex Example](#az-code-gen-templates-complex-example)
+ [Template Data](#az-code-gen-templates-template-data)

## Simple Example<a name="az-code-gen-templates-simple-example"></a>

A Jinja template can use text variables to replace text at predetermined locations in the output, as in the following example:

```
// Here's a {{ variable_name }} !!
int {{ variable_name }} = {{ variable_value }};
```

In this example, the Jinja template is given the following input\.

```
{
    'variable_name' = 'foo',
    'variable_value' = 42
}
```

The following output results\.

```
// Here's a foo !!
int foo = 42;
```

## Complex Example<a name="az-code-gen-templates-complex-example"></a>

Jinja allows for fairly complicated logic, branching and looping control structures\. The following example template generates a class that has the public and private variables specified by the input:

```
// This class is auto-generated!
class {{ class.name }}
{
public:
    virtual ~{{ class.name }}() = default;
 
{% if class.members is defined %}
    {% for member_var in class.members if member_var.visibility is 'public' -%}
    {{ member_var.type }} m_{{ member_var.name }}{{ if member_var.value is defined }} = {{ member_var.value }}{{ endif }};
    {%- endfor %}
{% endif %}
private:
{% if class.members is defined %}
    {% for member_var in class.members if member_var.visibility is 'private' -%}
    {{ member_var.type }} m_{{ member_var.name }}{{ if member_var.value is defined }} = {{ member_var.value }}{{ endif }};
    {%- endfor %}
{% endif %}
};
```

In this example, the Jinja template is given the following input\.

```
{
    'class' : {
        'name' : 'MyClass',
        'members' : [
            {
                'name' : 'foo',
                'type' : 'int',
                'visibility' : 'public'
            },
            {
                'name' : 'bar',
                'type' : 'long',
                'visibility' : 'public',
            },
            {
                'name' : 'secretSauce',
                'type' : 'float',
                'visibility' : 'private',
                'value' : '98.6f'
            }
        ]
    }
}
```

The template produces the following output\.

```
// This class is auto-generated!
class MyClass
{
public:
    virtual ~MyClass() = default;
 
    int m_foo;
    long m_bar;
private:
    float m_secretSauce = 98.6f;
};
```

## Template Data<a name="az-code-gen-templates-template-data"></a>

The data that is available to the template is fully controlled by the Python [template driver](az-code-gen-template-drivers.md)\.

The following table lists the variables that are automatically added to the Jinja environment\.


****  

| Variable | Description | 
| --- | --- | 
| extra\_data | Python object that contains data returned by the [apply\_transformations](az-code-gen-template-drivers.md#az-code-gen-template-drivers-templatedriver-class-methods-apply-transformations) method of the template driver\. | 
| extra\_str | String that contains the contents of extra\_data in JSON format\. | 
| json\_object | Python object that contains the decoded intermediate JSON after it has been processed by the template driver\. | 
| json\_str | String that contains the encoded intermediate JSON after it has been processed by the template driver\. | 

For information about the intermediate output, see  [Intermediate JSON Data Format](az-code-gen-intermediate-json-data-format.md)\.

**Note**  
Because Jinja contains a limited feature set, attempting to do complex data transformations in Jinja templates produces overly complicated and generally unreadable templates\. For this reason, we recommend that you perform any major data manipulation in the template driver before it is passed into the Jinja template engine\. For more information, see [Template Drivers](az-code-gen-template-drivers.md)\.