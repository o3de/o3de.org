---
description: ' Learn best practices for containers in Open 3D Engine. '
title: Use AzCore Standard Containers
---

**Recommended**: Instead of writing your own containers, use the full range of AzCore standard containers in O3DE\. Because these containers provide AZ memory allocators by default, they work with AZ memory manager out of the box\. These containers include the following:

```
array
bitset
deque
fix_unordered_set
fixed_forward_list
fixed_unordered_map
fixed_vector
fixed_list
forward_list
list
map
multimap
multiset
queue
ring_buffer
set
stack
unordered_map
unordered_multimap
unordered_multiset
vector
```

For multithreaded environments, O3DE has concurrent versions of `vector`, `map`, `set`, and `fixed`\. For the source code, see `lumberyard_version\dev\Code\Framework\AzCore\AzCore\std\containers`\.

**Recommended**: Create containers by value\. Because none of the `AZStd` containers allocate memory when they are empty, creating containers with `new` on the heap is usually not necessary\.

**Recommended**: Store container contents by value\. If the container is the owner of dynamically allocated contents, store the contents in `AZStd` smart pointers\.