---
linktitle: Multiplayer Compression
title: Multiplayer Compression Gem
description: Open 3D Engine (O3DE) offers a sample Gem containing an implementation of compression.
---

The **Multiplayer Compression Gem** provides an LZ4-based implementation of [`AzNetworking::ICompressor`](/docs/api/frameworks/aznetworking/class_az_networking_1_1_i_compressor.html) and [`AzNetworking::ICompressorFactory`](/docs/api/frameworks/aznetworking/class_az_networking_1_1_i_compressor_factory.html). The Gem registers the provided compressor factory with the O3DE Networking System Component. To use the Gem and its related compressor, add it to your project and set the cvars `net_UdpCompressor` and `net_TcpCompressor` to `MultiplayerCompressor`.

{{< caution >}}
This Gem is intended as an example of how to implement a compressor. We strongly recommend that you write a compressor (or compressors) that meets the needs of your traffic.
{{< /caution >}}
