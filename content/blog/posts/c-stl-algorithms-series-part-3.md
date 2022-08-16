---
title: "C++ STL Algorithms Series - Part 3"
date: 2022-08-17
slug: c-stl-algorithms-series-part-3
author: Tom Hulton-Harrop
blog_img: "/images/blog/dev-series.JPG"
full_img: ""
---

The more familiar we become with algorithms the more places begin to emerge where they can be utilized. This time we’ll introduce `transform` and see how it can be used to solve a familiar problem.

## Example

`transform` takes a pair of iterators and applies a function to each element, storing the result to an output range (this is usually a new collection but it can also be performed in-place).

```c++
AZ::Matrix4x4 clipFromWorld = ....;
AZStd::vector<AZ::Vector4> worldPositions;
AZStd::vector<AZ::Vector4> clipPositions;

// loop version
for (const auto& worldPosition: worldPositions)
{
    clipPositions.push_back(clipFromWorld * worldPosition);
}

// algo version
AZStd::transform(
    AZStd::begin(worldPositions), AZStd::end(worldPositions),
    AZStd::back_inserter(clipPositions),
    [&clipFromWorld](const auto& worldPosition)
    {
        return clipFromWorld * worldPosition;
    });
```

Here we’re taking a `vector` of world positions and transforming them to clip space using the model-view-projection matrix. We could have reserved space for the elements in `clipPositions` or we can rely on `back_inserter` to call `push_back` for us (as in this example).

Suppose we want to do something a little more interesting such as perturbing the positions along the normal. To do this we’re going to need to lookup into a second range. Fortunately `transform` has another overload that takes two ranges so we can write this:

```c++
AZStd::transform( 
    AZStd::begin(worldPositions), AZStd::end(worldPositions), 
    AZStd::begin(worldNormals), AZStd::back_inserter(clipPositions), 
    [&clipFromWorld](const AZ::Vector4& worldPosition, const AZ::Vector3& normal) 
    {      
        return clipFromWorld * (worldPosition + AZ::Vector4(normal, 0.0f));  
    });
```

This is actually more difficult with the range-based `for` loop as we only have access to one range at a time. To work around this we would have to switch back to a classic `for` loop and deal with handling iteration ourselves or introduce another local variable to keep track of the index.

## Deliberation

The `algorithm` version is a little noisier than the `for` loop but gains function purity by restricting what can happen on each iteration (the `for` loop looks easy to read and maintain now, but they have an unfortunate habit of not staying like that for very long). The overload of `transform` accepting two ranges is super useful and they of course do not have to be the same type either. Ultimately it very much depends on the situation which you should prefer but for simple transformations of data (which might sound familiar to the data-orientated-design crowd) `transform` is a very useful tool in your arsenal.

## Further Reading

For a whirlwind tour of even more algorithms check out this talk by Jonathan Boccara:

> [105 STL Algorithms in Less Than an Hour](https://youtu.be/2olsGf6JIkU) by Jonathan Boccara

## To be continued...

To wrap up this series (for the time being at least) we’ll close with a look at where the use of algorithms can lead to problems and what we can do to avoid falling into this trap.

_Disclaimer: The views expressed here are those of the individual author and do not represent those of the Open 3D Foundation, Open 3D Engine or individual's respective company._

### Check out the other parts of the series:

* [C++ STL Algorithms Series - Part 1](/blog/posts/c-stl-algorithms-series-part-1/)
* [C++ STL Algorithms Series - Part 2](/blog/posts/c-stl-algorithms-series-part-2/)
* [C++ STL Algorithms Series - Part 3](/blog/posts/c-stl-algorithms-series-part-3/)
* [C++ STL Algorithms Series - Part 4](/blog/posts/c-stl-algorithms-series-part-4/)