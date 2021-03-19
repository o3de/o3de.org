---
title: Partial SRGs
description: "Learn about partial SRGs"
---

{{< preview-new >}}

## Scopes of partial SRG
<!-- [WRITER NOTE: Reword] -->
When dealing with partial SRGs, it is not possible to refer to intersticial symbols in the later blocks of the partial SRG. Example:
```cpp
struct Before
{
};
 
partial ShaderResourceGroup View : ViewSlot
{
    Before data;  // ok
}
 
struct Interstice
{
};
 
partial ShaderResourceGroup View
{
    Interstice extended;  // not ok
}
```

The reason is that partial does not work like namespace in C++. It works like a possibility to extend the definition of an SRG. Which should be thought of as a class scope.
Only symbols that were accessible at the first seen declaration of the SRG are accessible. SRG scopes are atomic.

