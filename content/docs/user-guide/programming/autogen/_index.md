---
description: Use the Open 3D Engine (O3DE) Automated Generator to generate resources from Jinja2 templates. 
linktitle: AzAutoGen Source Generator
title: Automate Source Generation from Templates with AzAutoGen
weight: 200
---

When confronted with the problem of many similar code objects or source inputs, the best solution for simple cases is often automated generation from templates and values. **Open 3D Engine (O3DE)** has its own lightweight generator system, *AzAutoGen*, to solve this problem. AzAutoGen uses the [Jinja](https://jinja.palletsprojects.com/) template engine and Python in combination with either XML or JSON input files to produce generated sets of output. Your own O3DE Gems and projects can take advantage of AzAutoGen during [build](/docs/user-guide/build/generated-source/) to generate source inputs.

In this topic you'll be introduced to the conceptual idea behind AzAutoGen, and become familiar with both of the JSON and XML input formats. To learn more about Jinja templates, read the [Jinja template designer](https://jinja.palletsprojects.com/templates/) documentation.

## How AzAutoGen works

AzAutoGen works off of two input sets, a collection of value and template files, and a series of mappings from values to templates. AzAutoGen outputs to a specified file, or a set of files which contain special substitutions. When AzAutoGen is invoked, it runs through the following steps:

1. Prune all input files without one of the extensions `.xml`, `.json`, or `.jinja`. Templates can be co-located with other code as a result, although this isn't recommended.
1. Categorize the input files as source files (`.xml`, `.json`) and template files (`.jinja`).
1. For each `input_map,template,output` tuple that makes up a rule, match the corresponding files into their appropriate sets. `template` must be a single file; Each input is run through this template to generate a corresponding file named according to the pattern in `output`. Each mapping argument allows for the following substitutions:

   * Within `input_map`, the following matching operators are supported.
     * `*` - Sequence of any length.
     * `?` - Single-character sequence.
     * `[<sequence>]` - Matches any characters in `<sequence>`.
     * `[!<sequence>]` - Matches any characters _not_ in `<sequence>`.
   * Within `output`, the following tokens can be used to create unique file names for multiple inputs.
      * `$path`  - The path to the final output destination.
      * `$fileprefix` - The name of the current file up to the first `.` token. This is equivalent to running the UNIX shell command `basename ${file%%.*}`.
      * `$file` - The full name of the input file. This is equivalent to running the UNIX shell command `basename $file`.

   1. For each input file:
      1. The input is processed through a single Jinja template. Inside of the template, Jinja has access to a native Python object representing the contents of the input file.
      2. The output is written to its corresponding file.

<!-- TODO: Add a simple flowchart. -->

## Input mapping and variables

As part of the Jinja template engine, values exposed to the templating system are accessible as Python objects. JSON input files are loaded directly as Python dictionaries, although XML files are represented by [xml.etree.ElementTree](https://docs.python.org/3/library/xml.etree.elementtree.html) objects.

AzAutoGen populates the following [Jinja variables](https://jinja.palletsprojects.com/templates/#variables) during output generation:

| Name | Value |
|-|-|
| `dataFiles` | An array of dictionaries containing the objects read from input files. |
| `dataFileNames` | An array of the input file names. Neither `dataFiles` or `dataFileNames` are guaranteed to be ordered, but `dataFileNames[n]` is always the source for the object available in `dataFiles[n]`. |
| `templateName` | Name of the template file currently being processed. |
| `outputFile` | The name of the output file. |
| `filename` | The name of the file currently being generated. |

## Example

Because of the way that Python XML element objects and dictionaries can't provide a strict one-to-one mapping, using different types of input format requires using different templates. O3DE frequently uses XML formats for source generation, for example when [creating Script Canvas nodes](/docs/user-guide/scripting/script-canvas/programmer-guide/custom-nodes/).

The following example shows how to use the AzAutoGen system to generate a large set of similar `.h`  files. The example itself is a stripped-down version of the AzNetworking Framework packet generation templates. Elements like include files and C++ comments are intentionally omitted. Because of the nature of the different structures between XML and JSON data, a full template example is provided for XML inputs, and annotated where there is a difference when processing JSON.

<!-- TODO: Would certainly be possible to write a Jinja macro based around Python typeinfo to present a single template. -->

### XML input

<!-- TODO: There do not appear to be any good mechanisms for embedding gist content into a Hugo site, let alone embedding directly from GitHub in some fashion. To avoid copy/paste duplication like this when source code provides a comprehensive example, we should figure out how to embed. -->

```xml
<PacketGroup Name="CorePackets" PacketStart="0">
    <Packet Name="InitiateConnectionPacket" Desc="This packet is used to initiate a new connection">
        <member Type="AzNetworking::UdpPacketEncodingBuffer" Name="handshakeBuffer" />
    </Packet>
    
    <Packet Name="ConnectionHandshakePacket" Desc="This packet is used to negotiate the handshake of a new connection">
        <member Type="AzNetworking::UdpPacketEncodingBuffer" Name="handshakeBuffer" />
    </Packet>

    <Packet Name="TerminateConnectionPacket" Desc="This packet is used to gracefully terminate an existing connection">
        <member Type="AzNetworking::DisconnectReason" Name="disconnectReason" Init="AzNetworking::DisconnectReason::None" />
    </Packet>

    <Packet Name="HeartbeatPacket" Desc="This packet is used to keep an established connection alive">
        <member Type="bool" Name="requestResponse" Init="false" />
    </Packet>

    <Packet Name="FragmentedPacket" Desc="This packet is used to segment a packet that exceeds a connections MTU">
        <member Type="AzNetworking::SequenceId" Name="unfragmentedSequence" Init="AzNetworking::InvalidSequenceId" />
        <member Type="AzNetworking::SequenceId" Name="fragmentSequence" Init="AzNetworking::InvalidSequenceId" />
        <member Type="uint8_t" Name="chunkIndex" Init="0" />
        <member Type="uint8_t" Name="chunkCount" Init="0" />
        <member Type="AzNetworking::ChunkBuffer" Name="chunkBuffer" />
    </Packet>
</PacketGroup>
```

### Template (XML Input)

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

### JSON input

```json
{
    "Name": "CorePackets",
    "PacketStart": "0",
    "Packets": [{
        "Name": "InitiateConnectionPacket",
        "Desc": "This packet is used to initiate a new connection",
        "members": [{
          "Type": "AzNetworking::UdpPacketEncodingBuffer",
          "Name": "handshakeBuffer"
        }]
      },{
        "Name": "ConnectionHandshakePacket",
        "Desc": "This packet is used to negotiate the handshake of a new connection",
        "members": [{
          "Type": "AzNetworking::UdpPacketEncodingBuffer",
          "Name": "handshakeBuffer"
        }]
      },{
        "Name": "TerminateConnectionPacket",
        "Desc": "This packet is used to gracefully terminate an existing connection",
        "members": [{
          "Type": "AzNetworking::DisconnectReason",
          "Name": "disconnectReason",
          "Init": "AzNetworking::DisconnectReason::None"
        }]
      },{
        "Name": "HeartbeatPacket",
        "Desc": "This packet is used to keep an established connection alive",
        "members": [{
          "Type": "bool",
          "Name": "requestResponse",
          "Init": "false"
        }]
      },{
        "Name": "FragmentedPacket",
        "Desc": "This packet is used to segment a packet that exceeds a connections MTU",
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

### Template changes for JSON

The primary change for JSON is that you can't take advantage of iterators directly over an XML element's children. Instead, you should iterate over an array. To support the JSON data format, the above template for XML inputs would need to be changed in the following ways, on each of the annotated lines. Note that some of these changes need to be applied in multiple places where iteration takes place.

```jinja
{% for packet in data.get('Packets') %} {# (1) #}
{% for member in packet %} {# (2) #}
```

Taking advantage of Python's fexlible typing and using common methods such as `.get()` which are both available on the `xml.etree.ElementTree.Element` class and `dict`, Jinja templates which more easily support both data formats can be written.

## See also

| Title | Description |
|-|-|
| [Build generated source files](/docs/user-guide/build/generated-source/) | How to use the `ly_add_autogen` function in CMake to generate and build source code from templates. |
| [Network autopackets](/docs/user-guide/networking/autopackets/) | How to create new packet types for `AzNetworking` using AzAutoGen   . |
| [Custom Script Canvas nodes](/docs/user-guide/scripting/script-canvas/programmer-guide/custom-nodes/) | Create custom nodes in Script Canvas using XML definitions and turn them into code with AzAutoGen. |
