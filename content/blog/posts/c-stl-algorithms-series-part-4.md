---
title: "C++ STL Algorithms Series - Part 4"
date: 2022-08-31
slug: c-stl-algorithms-series-part-4
author: Tom Hulton-Harrop
blog_img: "/images/blog/dev-series.JPG"
full_img: ""
---
## Topic

This week we’ll be looking at where algorithms can lead us into trouble and how we can avoid falling into these traps. (_This article is a little longer than usual, normal programming will resume next week_).

## Motivation

This came from a real-world example where rigid adherence to trying to use an algorithm at all costs lead to an unexpected outcome. By taking a step back and thinking through the problem again, an alternative approach presented itself, but served as a stark reminder to check ones thinking and never assume.

## Example

Imagine we have some entity data split into two separate arrays. This is some code we’ve identified as ripe for optimization so we’ve split up our struct to keep the hot and cold fields separate. In this example we have an entity position and whether or not it’s currently visible.

```c++
AZStd::vector<AZ::Vector3> positions = ...;
AZStd::vector<bool> visibility = ...;
```

Before we process the entities we’d like to filter them so we’re only drawing the visible ones. The `for` loop version might look something like this:

```c++
AZStd::vector<AZ::Vector3> positions_to_draw_loop;
for (size_t i = 0; i < element_count; ++i)
{
    if (visibility[i])
    {
        positions_to_draw_loop.push_back(positions[i]);
    }
}
```

We can’t use a range-based `for` loop here as we need a view into another range. `std::transform` is no good as we want to filter elements. What we really want is a technique popularized in functional programming languages called `zip_with`. This takes two ranges and combines them together (so we could have a temporary value of our position and visible state). Frustratingly `zip_with` doesn’t exist in C++, but there’s something very close.

We can use `std::inner_product` to perform a transform-reduce operation on our two collections (we actually do need `inner_product` for this and not C++17’s `transform_reduce,` as it has strict requirements about the operands the `reduce` step needs for parallel execution reasons). What we do is first `transform` our two ranges (`positions` and `visibility`) into a `std::pair` containing both values (the `zip` operation) and then perform a `reduction` by pushing back the position if it’s visible (the `accumulator` value is a `std::vector` of positions). The algorithm is presented below (somewhat confusingly the transform step is the second lambda and the reduction step is the first).

```c++
const auto positions_to_draw_algo =
    AZStd::inner_product(
        AZStd::begin(positions), AZStd::end(positions),
        AZStd::begin(visibility), AZStd::vector<AZ::Vector3>{},
        [](AZStd::vector<Vector3> acc, const AZStd::pair<Vector3, bool>& combined)
        {
            if (combined.second)
            {
                acc.push_back(combined.first);
            }

            return acc;
        },
        [](const Vector3& position, bool visible)
        {
            return std::make_pair(position, visible);
        });
```

This appeared to neatly solve the problem but quickly showed up as a hotspot. Recreating the example in a simple benchmark and comparing with the `for` loop version gave some surprising results.

The algorithm version was **380x** slower than the regular `for` loop version. The initial horror was alleviated somewhat after switching to C++20 where `inner_product` has been updated to `move` the accumulator value in each iteration of the loop instead of copying it (but remember this is only in C++20, so it’s going to be very slow unless we add our own version to `AZStd` in the meantime). With that performance bug fixed the algorithm version still came in roughly **3x** slower  than the `for` loop.

At this point it would have been fine to just revert to the `for` loop and call it a day, but is there still an algorithm that’s a better fit? Unfortunately the algorithm headers didn’t seem to have a solution (please let me know if there is!). After a while, taking inspiration from the standard library itself (the cppreference example implementations are incredibly helpful here), this solution presented itself:

```c++
template<class InputIt1, class InputIt2, class OutputIt, class UnaryPredicate>
OutputIt copy_if_mask(
    InputIt1 first, InputIt1 last, InputIt2 firstMask,                      
    OutputIt d_first, UnaryPredicate pred)
{
    ...
}
```

`copy_if_mask` is pretty much a carbon copy of `copy_if`, but now a separate mask can be passed into use as the unary predicate for each element. The calling code now looks like this:

```c++
auto position_to_draw_algo_new = std::vector<Vec3>{};
copy_if_mask(    
    positions.begin(), positions.end(), visibility.begin(),    
    AZStd::back_inserter(position_to_draw_algo_new),    
    [](const auto& visible) 
    { 
        return visible; 
    });
```

This arguably looks the most succinct out of all three, and the even better news is it’s as fast as the `for` loop version (in testing them there was at most a **1.1x** difference). The takeaway here is that it’s perfectly fine and sometimes necessary to write your own algorithms if the standard is missing something useful. Don’t be afraid to try this (just remember to write some unit tests to go along with it).

## Deliberation

As with everything in C++, there’s a hundred and one ways to shoot yourself in the foot. The best defense we have against this is to slow down and test our thinking. There’s no silver bullet and algorithms alone won’t make your code better or your programs faster. They’re just another tool that we as software engineers should be aware of and know when to reach for.

## Further Reading

I hope this series has been useful and given a taste of what is available in the `numeric` and `algorithm` headers. We’ve really only just scratched the surface and the plethora of new algorithms and techniques coming in the `std::ranges` library will give us even more to learn.

I’ll leave you with two of the most useful pages to refer to when discovering algorithms:

* [numeric](https://en.cppreference.com/w/cpp/header/numeric)
* [algorithm](https://en.cppreference.com/w/cpp/header/algorithm)

And this YouTube series by Conor Hoekstra (@codereport) gives a great overview of the algorithms in C++ you’ll want to know:

> [Code Report - Algorithms](https://www.youtube.com/playlist?list=PLVFrD1dmDdve4h3Shk0uePpXp8JUMM1w5) by Conor Hoekstra

_Disclaimer: The views expressed here are those of the individual author and do not represent those of the Open 3D Foundation, Open 3D Engine or individual's respective company._

### Check out the other parts of the series:

* [C++ STL Algorithms Series - Part 1](/blog/posts/c-stl-algorithms-series-part-1/)
* [C++ STL Algorithms Series - Part 2](/blog/posts/c-stl-algorithms-series-part-2/)
* [C++ STL Algorithms Series - Part 3](/blog/posts/c-stl-algorithms-series-part-3/)
* [C++ STL Algorithms Series - Part 4](/blog/posts/c-stl-algorithms-series-part-4/)