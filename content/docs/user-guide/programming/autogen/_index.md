---
linktitle: AzAutoGen Source Generator
title: Automate Source Generation from Templates with AzAutoGen
description: O3DE features can use AzAutoGen to automatically generate code and assets, given a Jinja2 template and data files. Learn how AzAutoGen works, how to integrate AzAutoGen into your feature's process, and how to create templates and data files.
weight: 200
---

To create many similar boilerplate classes or assets, the most efficient solution is often automated generation from templates and data inputs. For source file generation, **Open 3D Engine (O3DE)** uses **AzAutoGen**, its own lightweight generator system.

AzAutoGen is a Python tool that uses the [Jinja2](https://jinja.palletsprojects.com/) template engine. Given a Jinja template and a set of XML or JSON data, AzAutoGen generates a set of output files. Your own O3DE Gems and projects can use AzAutoGen during build to generate output source files, such as code or assets. For information about invoking AzAutoGen during a build, refer to [Build Generated Source Files with AzAutoGen](/docs/user-guide/build/generated-source/).

This topic explains how AzAutoGen works and familiarizes you with both the JSON and XML input formats. 

## How AzAutoGen works

AzAutoGen works off of two input sets. You can author these files and define these rules depending on the functionality you need for your project. 
  
- A collection of data input files and template files, which AzAutoGen uses to automatically generate the output code or assets.
- A list of [*autogen rules*](/docs/user-guide/build/generated-source#autogen-rules), which map data input files to template files, and define their resulting output filename.
 

Then, you can invoke AzAutoGen by integrating it into a CMake build process. For more information about how to set up this integration, refer to [Build Generated Source Files](/docs/user-guide/build/generated-source/).

After AzAutoGen invokes, it runs through the following steps. (You can refer to the source code at [`cmake/AzAutoGen.py`](https://github.com/o3de/o3de/blob/5c733c3a34931e48435ef6ee72b7feddeac0e03b/cmake/AzAutoGen.py).)

  1. Prune all input files that don't have an `.xml`, `.json`, or `.jinja` extension. Because this occurs, you can place templates at the same location as other code, although this isn't recommended.

  1. Categorize `.xml` and `.json` input files as source, or data, files, and `.jinja` as template files.

  1. For each set of input, template, and output filenames that makes up an autogen rule, match the corresponding files into their appropriate sets. A template file must be a single file. Each input file runs through this template to generate a corresponding file that's named according to the pattern in the output filename.

  1. For each XML or JSON data file:

        1. The data is processed through a single Jinja template. Inside of the template, Jinja has access to a native Python object that represents the contents of the input file.

        1. The output is written to its corresponding file.


## Authoring Jinja templates and data inputs

How you use AzAutoGen in your Gem or project is driven by the functionality that you author in the Jinja template and the data inputs that you supply. 

Before you use the Jinja template, it helps to understand some Jinja concepts. 
A *Jinja template* is a simple text file that takes in data, replaces parts of the template with the provided data, and outputs the final file. 
A template contains *variables* and *expressions*, which the data replaces, as well as *tags*, which are logical instructions on how the output file should appear. *Data* are values that are input into the template. For AzAutoGen, you can author data in XML (`.xml`) or JSON (`.json`) files. 

Jinja2's templating system can also work with a set of data files to generate a set of output files, making AzAutoGen an efficient solution if you need to generate many files.

For more information about authoring Jinja templates and data input, refer to the [Template Designer Documentation](https://jinja.palletsprojects.com/templates/) on the Jinja website.

### Input mapping and variables

As part of the Jinja2 template engine, AzAutoGen can access the data that's exposed to the templating system as Python objects. JSON input files are loaded directly as Python dictionaries, and XML files are represented by Python's [xml.etree.ElementTree](https://docs.python.org/3/library/xml.etree.elementtree.html) objects.

When authoring a Jinja template, you can use the following variables. AzAutoGen defines these variables and its attributes, sets their values, and then sends it through Jinja's templating system to generate the output files.

| Name | Value |
|-|-|
| `dataFiles` | An array of dictionaries containing the objects that are read from input files. |
| `dataFileNames` | An array of the input file names. Neither `dataFiles` nor `dataFileNames` are guaranteed to be ordered, but `dataFileNames[n]` is always the source for the object available in `dataFiles[n]`. |
| `templateName` | The name of the template file that AzAutoGen is currently processing. |
| `outputFile` | The name of the output file. |
| `filename` | The name of the file that AzAutoGen is currently generating. |


### Example

Because Python XML element objects and dictionaries can't provide a strict one-to-one mapping, using different input formats requires using different templates. O3DE frequently uses XML formats for source generation; for example, when [creating Script Canvas nodes](/docs/user-guide/scripting/script-canvas/programmer-guide/custom-nodes/).

The following example shows how to use AzAutoGen to generate a large set of similar `.h`  files. This example is a simplified version of `AzNetworking` framework's packet generation templates. Be aware that there are structural differences between XML and JSON data. These differences are demonstrated in the example template for XML inputs, which contain annotations where there's a difference when processing JSON.


#### XML data

```xml
<PacketGroup Name="CorePackets" PacketStart="0">
    <Packet Name="InitiateConnectionPacket" Desc="This packet is used to initiate a new connection.">
        <member Type="AzNetworking::UdpPacketEncodingBuffer" Name="handshakeBuffer" />
    </Packet>
    
    <Packet Name="ConnectionHandshakePacket" Desc="This packet is used to negotiate the handshake of a new connection.">
        <member Type="AzNetworking::UdpPacketEncodingBuffer" Name="handshakeBuffer" />
    </Packet>

    <Packet Name="TerminateConnectionPacket" Desc="This packet is used to gracefully terminate an existing connection.">
        <member Type="AzNetworking::DisconnectReason" Name="disconnectReason" Init="AzNetworking::DisconnectReason::None" />
    </Packet>

    <Packet Name="HeartbeatPacket" Desc="This packet is used to keep an established connection alive.">
        <member Type="bool" Name="requestResponse" Init="false" />
    </Packet>

    <Packet Name="FragmentedPacket" Desc="This packet is used to segment a packet that exceeds a connections MTU.">
        <member Type="AzNetworking::SequenceId" Name="unfragmentedSequence" Init="AzNetworking::InvalidSequenceId" />
        <member Type="AzNetworking::SequenceId" Name="fragmentSequence" Init="AzNetworking::InvalidSequenceId" />
        <member Type="uint8_t" Name="chunkIndex" Init="0" />
        <member Type="uint8_t" Name="chunkCount" Init="0" />
        <member Type="AzNetworking::ChunkBuffer" Name="chunkBuffer" />
    </Packet>
</PacketGroup>
```

#### Template for XML data

```jinja
{% macro CamelCase(text) %}{{ text[0] | upper }}{{ text[1:] }}{% endmacro %}
{%  for data in dataFiles %} {# namespace generation #}
namespace {{ data.get('Name') }}
{
    enum class PacketType
    {
        START = aznumeric_cast<int32_t>({{ data.get('PacketStart') }})
{% for packet in data %} {# (1) #}
    ,   {{ packet.get('Name') }}
{% endfor %}
    ,   MAX
    };

{% for packet in data %} {# class generation #} {# (1) #}
{% set name = packet.get('Name') %}
{% set type = "PacketType::" + packet.get('Name') %}
    
    class {{ name }} final
        : public AzNetworking::IPacket
    {
    public:
        static constexpr AzNetworking::PacketType Type = aznumeric_cast<AzNetworking::PacketType>({{ type }});

        {{ name }}() = default;
{% if len(packet) | len > 0 %}
        explicit {{ name }}
        (
{% for member in packet %} {# (2) #}
        {% if loop.first %}    {% else %},   {% endif %}{{ member.get('Type') }} {{ member.get('Name') }}
{% endfor %}
        );
{% endif %}
        ~{{ name }}() override = default;

        bool operator ==(const {{ name }}& rhs) const;
        bool operator !=(const {{ name }}& rhs) const;

{% for member in packet %} {# (2) #}
        {% set name = CamelCase(member.get('Name')) %}
        {% set type = member.get('Type') %}
        void Set{{ name }}(const {{ type }}& value);
        const {{ type }}& Get{{ name }}() const;
        {{ type }}& Modify{{ name }}();

{% endfor %}
        AzNetworking::PacketType GetPacketType() const override;
        AZStd::unique_ptr<AzNetworking::IPacket> Clone() const override;
        bool Serialize(AzNetworking::ISerializer& serializer) override;
{% if len(packet) | len > 0 %}

    private:

{% for member in packet %} {# (2) #}
        {{ member.get('Type') }} m_{{ member.get('Name') }}{% if member.get('Init') %} = {{ member.get('Init') }}{% endif %};
{% endfor %}
{% endif %}
    };
{% endfor %} {# class generation #}
}
{% endfor %} {# namespace generation #}
```

#### JSON data

```json
{
    "Name": "CorePackets",
    "PacketStart": "0",
    "Packets": [{
        "Name": "InitiateConnectionPacket",
        "Desc": "This packet is used to initiate a new connection.",
        "members": [{
          "Type": "AzNetworking::UdpPacketEncodingBuffer",
          "Name": "handshakeBuffer"
        }]
      },{
        "Name": "ConnectionHandshakePacket",
        "Desc": "This packet is used to negotiate the handshake of a new connection.",
        "members": [{
          "Type": "AzNetworking::UdpPacketEncodingBuffer",
          "Name": "handshakeBuffer"
        }]
      },{
        "Name": "TerminateConnectionPacket",
        "Desc": "This packet is used to gracefully terminate an existing connection.",
        "members": [{
          "Type": "AzNetworking::DisconnectReason",
          "Name": "disconnectReason",
          "Init": "AzNetworking::DisconnectReason::None"
        }]
      },{
        "Name": "HeartbeatPacket",
        "Desc": "This packet is used to keep an established connection alive.",
        "members": [{
          "Type": "bool",
          "Name": "requestResponse",
          "Init": "false"
        }]
      },{
        "Name": "FragmentedPacket",
        "Desc": "This packet is used to segment a packet that exceeds a connections MTU.",
        "members": [{
            "Type": "AzNetworking::SequenceId",
            "Name": "unfragmentedSequence",
            "Init": "AzNetworking::InvalidSequenceId"
          },{
            "Type": "AzNetworking::SequenceId",
            "Name": "fragmentSequence",
            "Init": "AzNetworking::InvalidSequenceId"
          },{
            "Type": "uint8_t",
            "Name": "chunkIndex",
            "Init": "0"
          },{
            "Type": "uint8_t",
            "Name": "chunkCount",
            "Init": "0"
          },{
            "Type": "AzNetworking::ChunkBuffer",
            "Name": "chunkBuffer"
        }]
      }
    ]
}
```

#### Template changes for JSON

For a JSON template, you can't use iterators directly over an XML element's children. Instead, you should iterate over an array. To support JSON, you would need to change the preceding XML input template in the following ways, on each of the annotated lines. Note that you must apply some of these changes in multiple places where iteration takes place.

```jinja
{% for packet in data.get('Packets') %} {# (1) #}
{% for member in packet %} {# (2) #}
```

You can write Jinja templates that more easily support both data formats by using Python's flexible typing and common methods such as `.get()`, which are both available on the `xml.etree.ElementTree.Element` class and `dict`.


## Related topics

| Topic | Description |
|-|-|
| [Build Generated Source Files with AzAutoGen](/docs/user-guide/build/generated-source/) | How to use the `ly_add_autogen` function in CMake to generate and build source code from templates. |
| [Networking Auto-packets](/docs/user-guide/networking/aznetworking/autopackets/) | How to create new packet types for the `AzNetworking` framework using AzAutoGen. |
| [Creating Custom Nodes in Script Canvas](/docs/user-guide/scripting/script-canvas/programmer-guide/custom-nodes/) | How to create custom nodes in Script Canvas using XML definitions and turn the nodes into code with AzAutoGen. |
