# SRG Data Views
Data views include *constant buffer view*, *shader resource view* (textures and buffers), and *unordered access view* (textures and buffers). Every SRG binds to a user-supplied data view. The following lists points regarding how data views are processed:
- AZSLc does not manage the data's layout, creation, or destruction.
- ConstantBuffer views follow very strict layout rules which differ per API. 
- AZSLc does not enforce specific packing rules because it doesn't manage external CBVs. 
- It is reccommended that the user explicitly pads all data to 16 bytes. (This is not required for SRG constants. Since the user can't access the entire CBV where the constants are packed, the SRG is free to pack them in any way best fit for each platform.)

