---
description: ' Follow these steps to extend LyTestTools. '
title: Extending LyTestTools
---

LyTestTools (LTT) offers a comprehensive set of automation tools that aid in the creation of tests but can't cover all possible test automation scenarios. LY test tools can be extended to cover scenarios that can be easily automatable like launching an executable with parameters by writing a wrapper.

## Operations ##

One example to extend LyTestTools is shown below. Please note that there might be other approaches and that by using LyTestTools to write automation for your custom scenarios you are, in fact, extending them.

### Adding support for a custom command line tool ###

Let's assume that you need to extend the tools to be able to retrieve system information such as GPU memory and CPU name. The WMIC command line tool in Windows allows you to query such information and the process_utils module in LY Test Tools provides methods to invoke processes and retrieve their output. Extending the tools to incorporate this tool can be done in four simple steps:

 1. Figure out a way to build the commands that will be used to invoke the WMIC tool.

    ```shell
    def _build_system_info_command(component):
        component_to_args = {
            'gpu': ['path win32_VideoController', 'AdapterRAM,Name'],
            'cpu': ['cpu', 'Caption,Name']
        }

        path_or_alias = component_to_args[component][0]
        properties = component_to_args[component][1]

        command = 'wmic {} get {} /format:csv'.format(path_or_alias, properties)
        return command
    ```

 2. Execute the tool and retrieve its output, the built-in process_utils.check_output() is very useful for scenarios like this.

    ```shell
    info = process_utils.check_output(command)
    ```

 3. Process the output and convert it into a usable format, in this example CSV format was chosen because it's easy to parse. Other CLI tools write their output in different formats.

    ```shell
    def _process_system_info_output(info):
        lines = info.splitlines()
        valid_lines = [l for l in lines if len(l) > 0]
        csv_reader = csv.DictReader(valid_lines)
        data_dict = [row for row in csv_reader]

        return data_dict
    ```

 4. Put the logic into a single function

    ```shell
    def get_system_info(component):
        command = _build_system_info_command(component)
        info = process_utils.check_output(command)
        data = _process_system_info_output(info)

        return data
    ```

And now you've extended the tools to retrieve system information such as GPU details.

```shell
gpu_info = get_system_info('gpu')
gpu_ram = gpu_info[0]['AdapterRAM']
gpu_name = gpu_info[0]['Name']
```

## Related  Documentation ##

CVARs: https://docs.aws.amazon.com/lumberyard/latest/userguide/system-cvar-tutorial.html

## Support ##

For additional questions and troubleshooting, please reach out in the sig-testing channel in the Open 3D Engine Foundation Discord.