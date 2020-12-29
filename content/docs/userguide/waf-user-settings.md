# Adding User Settings to Waf<a name="waf-user-settings"></a>

You can add a new user setting to the `default_settings.json` file in the `Waf` folder located at the root\. Use the standards established in this file and customize as needed\. After you have added a user setting, you need to add a minimum of three utility functions for the GUI and console to validate your new setting\. 

To define utility functions, add the following to `default_settings.py`:
+ **Getter** – Retrieves the value of your new setting and performs necessary transformations
+ **Validator** \(optional\) – Validates new values
+ **Hinter** \(optional\) – Tells GUI the available options

See the sections below for more information about these functions\.

You can also add these functions to any new \.py file as long as you add the module during build and configure\. Be sure to load the file using the following command:

```
(opt.load('<YOUR PYTHON NAME>', tooldir='<DIRECTORY WHERE ITS STORED>')
```

## Getter Function<a name="waf-user-settings-getter"></a>

Waf calls the getter function to retrieve the value of your new setting and perform any necessary transformations\.

Follow these guidelines:
+ Implement the `@register_attribute_callback` function for your type\.
+ Use the same name for your function as your property name that's defined in the `default_settings` file\. For example, if your property name is called **my\_setting**, the function must be called **my\_setting\(\)**\.
+ Choose attribute names that are unlikely to conflict\.

In the example below of a getter/setter function, the current value is the input and the return value is the value with any validation and transformations applied\. We expect a list of comma\-separated values\. The first half of the function returns the value quickly and the second half is where Waf runs in interactive or GUI mode\.

```
@register_attribute_callback
def enabled_game_projects(ctx, section_name, option_name, value):
    """ Configure all Game Projects enabled by user"""
    if ctx.options.execsolution or not ctx.is_option_true('ask_for_user_input'):
        return value
 
    if LOADED_OPTIONS.get('enabled_game_projects', 'False') == 'False':
        return ''
 
    info_str = ['Specify which game projects to include when compiling and generating project files.']
    info_str.append('Comma separated list of Game names, from the project.json root (SamplesProject, MultiplayerProject) for example')
    # GUI
    if not ctx.is_option_true('console_mode'):
        return ctx.gui_get_attribute(section_name, option_name, value, '\n'.join(info_str))
    # Console
    info_str.append("\nQuick option(s) (separate by comma):")
    project_list = ctx.game_projects()
    project_list.sort()
    for idx , project in enumerate(project_list):
        output = '   %s: %s: ' % (idx, project)
        while len(output) < 25:
            output += ' '
        output += ctx.get_launcher_product_name(project)
        info_str.append(output)
    info_str.append("(Press ENTER to keep the current default value shown in [])")
    Logs.info('\n'.join(info_str))
    while True:
        projects = _get_string_value(ctx, 'Comma separated project list', value)
        projects_input_list = projects.replace(' ', '').split(',')
        # Replace quick options
        options_valid = True
        for proj_idx, proj_name in enumerate(projects_input_list):
            if proj_name.isdigit():
                option_idx = int(proj_name)
                try:
                    projects_input_list[proj_idx] = project_list[option_idx]
                except:
                    Logs.warn('[WARNING] - Invalid option: "%s"' % option_idx)
                    options_valid = False
        if not options_valid:
            continue
        projects_enabled = ','.join(projects_input_list)
        (res, warning, error) = ATTRIBUTE_VERIFICATION_CALLBACKS['verify_enabled_game_projects'](ctx, option_name, projects_enabled)
        if error:
            Logs.warn(error)
            continue
        return projects_enabled
```

In the example below, the function is simpler because it’s a simple string entry and there are no enumerations like bool and no validation\.

```
@register_attribute_callback   
def out_folder_linux64(ctx, section_name, option_name, value):
    """ Configure output folder for linux x64 """
    if not _is_user_input_allowed(ctx, option_name, value):
        Logs.info('\nUser Input disabled.\nUsing default value "%s" for option: "%s"' % (value, option_name))
        return value
         
    # GUI / console mode
    if not ctx.is_option_true('console_mode'):
        return ctx.gui_get_attribute(section_name, option_name, value)
         
    return _get_string_value(ctx, 'Linux x64 Output Folder', value)
```

## Validator Function<a name="waf-user-settings-validator"></a>

Waf only requires the getter function; however, to validate input or provide the GUI with more than raw strings, you'll need to implement other functions like the validator\.

Follow these guidelines:
+ Implement the `@register_verify_attribute_callback` function and name it **verify\_\(*your\_option\_name*\)**\.
+ Pass into the function the value parameter, which is the current raw value\.
+ Return a tuple of Bool, String, ErrorString\. The first bool specifies whether or not validation is okay\.

In the example below of a validator function, we make sure not to trigger the duplicate check \(for example with a list like "SamplesProject,SamplesProject,SamplesProject"\) or provide a list that won't be accepted \(for example with a list like "ASDJASUIDIASJDA"\)\.

```
@register_verify_attribute_callback
def verify_enabled_game_projects(ctx, option_name, value):
    """ Configure all Game Projects which should be included in Visual Studio """
    if not value:
        return True, "", "" # its okay to have no game project
    if (len(value) == 0):
        return True, "", ""
    if (value[0] == '' and len(value) == 1):
        return True, "", ""
    project_list = ctx.game_projects()
    project_list.sort()
    project_input_list = value.strip().replace(' ', '').split(',')
    # Get number of occurrences per item in list
    num_of_occurrences = Counter(project_input_list)
    for input in project_input_list:
        # Ensure spec is valid
        if not input in project_list:
            error = ' [ERROR] Unkown game project: "%s".' % input
            return (False, "", error)
        # Ensure each spec only exists once in list
        elif not num_of_occurrences[input] == 1:
            error = ' [ERROR] Multiple occurrences of "%s" in final game project value: "%s"' % (input, value)
            return (False, "", error)
    return True, "",
```

## Hinter Function<a name="waf-user-settings-hinter"></a>

Waf uses the optional hinter function to provide the GUI with a list of available options\. For example, you might want to use the hinter function if you have a string list that can have multiple or single values that must be specific \(enums\)\.

Follow these guidelines:
+ Implement the `@register_hint_attribute_callback` function and name it **hint\_\(*your\_option\_name*\)**\.
+ Ignore the value parameter passed, which is the current value\.
+ Return a tuple of display value list, actual value list, help text list, multi or single\. All three input lists should be the same length\. The values in these lists are what’s displayed in the GUI, the values to set if selected, and the text to display as extra information for an option, respectively\.

The example below is for a hinter function\.

```
@register_hint_attribute_callback
def hint_enabled_game_projects(ctx, section_name, option_name, value):
    """ Hint list of specs for projection generation """
    project_list = ctx.game_projects()
    project_list.sort()
    desc_list = []
    for gameproj in project_list:
        desc_list.append(ctx.get_launcher_product_name(gameproj))
    return (project_list, project_list, desc_list, "multi")
```

You can also see how Waf uses hinting by engaging Waf in GUI mode and entering the following command: `lmbr_waf.bat show_option_dialog` 

This displays an options dialog box that you can review to determine hinting\.