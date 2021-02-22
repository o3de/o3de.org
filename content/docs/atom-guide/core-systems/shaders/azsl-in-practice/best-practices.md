# Best Practices
## When to use implicit vs. explicit constant buffers
SRG Constants are managed by the SRG and compile to a single implicit ConstantBuffer per SRG. They are preferred in all general cases. 
- The SRG manages the memory layout per platform and is free to optimize if needed.
- The SRG provides a good caching mechanisms and it only maps constants which have been updated, flushing all updates into at most a single map (per frame).
- The user will likely set the constants at different points during the execution. The SRG takes care to flush them in the best way possible.
  
SRG Constant Buffers should be used sparingly and after careful consideration. They should only be used for optimization purposes. Keep in mind the following points when using SRG Constant Buffers: 
- The SRG does not manage the layout of the buffer; the user has to manage all layouts for all different platforms. Some platforms might have different packing rules. It's recommended to use explicit padding and attributes that are 16-bytes aligned.
- The user can optimize the code and manage the constant buffer if the following occur: 
  - A constant data fails outside of the frequency updates (per scene, per view, per material) and there is no obvious candidate for it.
  - A constant data is shared between many SRGs of the same frequency and it makes sense to extract it to a shared buffer.
  