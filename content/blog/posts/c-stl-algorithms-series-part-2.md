---
title: "C++ STL Algorithms Series - Part 2"
date: 2022-08-03
slug: c-stl-algorithms-series-part-2
author: Tom Hulton-Harrop
blog_img: "/images/blog/dev-series.JPG"
full_img: ""
---
## Topic

Continuing from the previous entry in this series, we’re going to keep exploring some of the use-cases of `<algorithm>/<numeric>` in our day to day work.

## Example

It’s all too easy to come up with trivial examples for algorithms that don’t reflect the type of problems we have to solve everyday. With that in mind, this example (though a little contrived) might be something we actually want to calculate in O3DE.

Suppose we have a collection of axis aligned bounding boxes (AABBs) and we’d like to find the union of all of them. We might need this to find the total extents of our scene or perhaps the area taken up by a players base. Here’s the normal imperative version to start:

```c++
AZStd::vector<AZ::Aabb> aabbs { /* a bunch of Aabbs */ };
AZ::Aabb aabbMinMax = AZ::Aabb::CreateNull();
for (const AZ::Aabb& aabb : aabbs)
{
    aabbMinMax.SetMin(aabbMinMax.GetMin().GetMin(aabb.GetMin()));
    aabbMinMax.SetMax(aabbMinMax.GetMax().GetMax(aabb.GetMax()));
}
```

This doesn’t look too bad - we can see we’re initializing a local variable to a null state, and then calculating the min and max of each field throughout the loop. We have a small problem that `aabbMinMax` can’t be made `const` even though it’s unlikely we’d ever want it to change after the loop (we can work around this with a lambda, perhaps the topic of another Knowledge Series, but there’s a better way).

My initial intuition was to try and use `minmax_element` or some combination of `min` and `max` from `<algorithm>`, but that proved to be non-starter. Those algorithms are implemented in terms of the `<` operator which doesn’t fit particularly well with `Vector3` and the overload still requires a binary comparison function. Back to the drawing board...

Thinking about the problem again, we’re essentially going from many to one, and there’s an algorithm that’s perfect for that - `accumulate`. `accumulate` turns out to be incredibly versatile. In this example we provide the range to operate on, the initial value and a _reduction_ function. The lambda/function for the reduction is the interesting part. The first parameter is the accumulator value (`acc` by convention), the second parameter is the current element in the range we’re operating on, and the return value is the next accumulator.

```c++
AZStd::vector<AZ::Aabb> aabbs { /* a bunch of Aabbs */ };
const auto aabbMinMax = AZStd::accumulate(
    aabbs.cbegin(), aabbs.cend(), AZ::Aabb::CreateNull(),
    [](AZ::Aabb acc, const AZ::Aabb& aabb)
    {
        return AZ::Aabb{
            acc.GetMin().GetMin(aabb.GetMin()),
            acc.GetMax().GetMax(aabb.GetMax())};
    });
```

## Deliberation

It’s debatable if the algorithm version is more succinct than the first, but it does have some advantages. First, the return value can now be `const`, as everything is calculated in a single statement. Eliminating mutable state is well understood to reduce the likelihood of bugs creeping into code. The lambda is a pure function and due to having no capture (highly recommended) we can quickly determine it has no side effects. The other advantage is the name, we can glance at the code and quickly get an intuition for what operation is taking place (even if we have to check the types and lambda to understand all the details).

Applications of `accumulate` and `transform` (look out for this in an upcoming article) crop up all over the place and making use of them can help simplify and improve our code. (Note: `accumulate` is very closely related to `reduce` - they are largely the same but do have some differences when it comes to ordering and execution policies. This isn’t important for understanding what they actually do).

## Further Reading

If you’re getting more interested in algorithms the next must-watch talk is:

> [Algorithm Intuition](https://youtu.be/48gV1SNm3WA) by Conor Hoekstra

The talk does a fantastic job of introducing a whole host of algorithms and how to think about them.

## To be continued...

Next time we’ll look at another algorithm staple - `transform`.

_Disclaimer: The views expressed here are those of the individual author and do not represent those of the Open 3D Foundation, Open 3D Engine or individual's respective company._

### Check out the other parts of the series:

* [C++ STL Algorithms Series - Part 1](/blog/posts/c-stl-algorithms-series-part-1/)
* [C++ STL Algorithms Series - Part 2](/blog/posts/c-stl-algorithms-series-part-2/)
* [C++ STL Algorithms Series - Part 3](/blog/posts/c-stl-algorithms-series-part-3/)
* [C++ STL Algorithms Series - Part 4](/blog/posts/c-stl-algorithms-series-part-4/)