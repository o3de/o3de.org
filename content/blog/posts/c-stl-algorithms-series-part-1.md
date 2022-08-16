---
title: "C++ STL Algorithms Series - Part 1"
date: 2022-07-20
slug: c-stl-algorithms-series-part-1
author: Tom Hulton-Harrop
blog_img: "/images/blog/dev-series.JPG"
full_img: ""
---
An introduction to why you might want to start using the `<algorithm>` and `<numeric>` header more in your code.

## Motivation

There is a growing movement in the C++ community to favor algorithms (usually found in `<algorithm>` and `<numeric>`) over hand-written loops. There are a multitude of reasons for this (correctness, performance, readability) and it’s a pattern that comes up again and again in other languages too.  
  
The general premise is to move to a more declarative model (describe what should happen) as opposed to an imperative one (describe _how_ it should happen).  
  
An important detail is many of the functions in the `<algorithm>` header come with a ‘default-op’ (often unfortunately coupled with the name) which makes certain functions easy to overlook when in fact they’re much more flexible and versatile than one would think.

## Example

Say you’d like to quickly count all gadgets with a priority greater than five. Your initial intuition may be to reach for the trusty for loop (made better with the range-based version), but if you see below there’s an alternative that is much more explicit about what it’s doing.

```c++
AZStd::vector<Gadget> gadgets;

// loop version
int gadget_count_loop; // must be mutable, booo... :(
for (const Gadget& gadget : gadgets)
{
    if (gadget.priority > 5)
    {
        gadget_count_loop++;
    }
}

// algorithm version
const auto gadget_count_algo = // now const and immutable, yay! :)    
    AZStd::count_if(AZStd::begin(gadgets), AZStd::end(gadgets),
    [](const auto gadget)
    {
        return gadget.priority > 5;
    });
```

## Deliberation

There is definitely some debate around the verbosity of the calling code. Having to pass `begin` and `end` iterators can be cumbersome (and at times error-prone) and the unfamiliarity can be an initial barrier to entry.  
  
That being said the benefits largely outweigh the costs and with C++20 and the addition of ranges, the same algorithms can be used in a much cleaner way, so having existing familiarity with them will be very beneficial.

## Further Reading

If you watch one talk about C++ in your lifetime it should probably be this one:

> [C++ Seasoning](https://youtu.be/W2tWOdzgXHA) by Sean Parent

In upcoming posts we’ll have more recommendations that go into much greater detail but this is where it all started.

## To be continued...

Next time we’ll explore a few more concrete examples to show where algorithms can really come into their own and include additional references for more information.

_Disclaimer: The views expressed here are those of the individual author and do not represent those of the Open 3D Foundation, Open 3D Engine or individual's respective company._

### Check out the other parts of the series:

* [C++ STL Algorithms Series - Part 1](/blog/posts/c-stl-algorithms-series-part-1/)
* [C++ STL Algorithms Series - Part 2](/blog/posts/c-stl-algorithms-series-part-2/)
* [C++ STL Algorithms Series - Part 3](/blog/posts/c-stl-algorithms-series-part-3/)
* [C++ STL Algorithms Series - Part 4](/blog/posts/c-stl-algorithms-series-part-4/)