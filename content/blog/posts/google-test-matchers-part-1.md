---
title: "Google Test Matchers - Part 1"
date: 2023-01-11
slug: google-test-matchers-part-1
author: Tom Hulton-Harrop
blog_img: "/images/blog/dev-series.JPG"
full_img: ""
---
# Google Test Matchers - Part 1

## Topic

An introduction to Google Test matchers with a focus on how they can improve the quality of our tests.

## Motivation

We want tests to be fast to write, fast to run, easy to understand and informative when they fail. With Google Test matchers we can achieve all these and more. Google Test matchers are an incredibly useful tool to simplify our unit and integration tests. They are extremely expressive, leading to more succinct tests which are easier to write and maintain.

> Aside: Matchers originated in Java and came out of a framework called `Hamcrest` (an anagram of ‘_matchers_’) to support match rules to be defined declaratively. More information about them is available [here](http://hamcrest.org/). See also [Wikipedia - Hamcrest](https://en.wikipedia.org/wiki/Hamcrest).

## Example

### Verify a collection of elements

Suppose we need to test a function that returns a filtered list of entities based on some condition. We know what the expected outcome should be but aren’t sure how best to validate the results.

```c++
AZStd::vector<AZ::EntityId> expectedEntities = {...};
AZStd::vector<AZ::EntityId> mainEntities = {...};
AZStd::vector<AZ::EntityId> filteredEntities = FilterEntities(mainEntities);

// test filteredEntities == expectedEntities
```

The first option is to resort to `AZStd::vector`’s equality operator and write this...

```c++
EXPECT_TRUE(expectedEntities == filteredEntities);
```

There are two problems with this. The first is if the test fails, the only output you get is `Actual: false` `Expected: true`, which isn’t very helpful. Next is we’re relying on the existing `==` operator which might not always exist for the collection we’re testing. The `==` operator also requires strict ordering which we often don’t care about.

We could resort to a loop and rely on manually searching the container (say with `find_if`) but then we’d also need to check the size to ensure there weren’t any additional elements that shouldn’t be there. This is error-prone and verbose. Fortunately there’s simple solution.

```c++
using ::testing::UnorderedElementsAre;
EXPECT_THAT(filtered, UnorderedElementsAre(entityId1, entityId2, entityId3));
```

This test will ensure that the exact items appear in `filtered` (in any order), no more, no less. If there is a failure we get some useful output, not just `false`.

```c++
// example with a list of numbers, expected 1 and 2, actual 1, 3, 2
Value of: filtered
Expected: has 2 elements and there exists some permutation of elements such that:
 - element #0 is equal to 1, and
 - element #1 is equal to 2
Actual: { 1, 3, 2 }, which has 3 elements
```

There are many more matchers for containers such as `IsSupersetOf` and `IsSubsetOf`, it’s also possible to pass the expected container directly with `UnorderedElementsAreArray`.

## Demo

To quickly experiment with matchers it’s possible to use them directly in Compiler Explorer. Check out this [link](https://godbolt.org/z/d1cfWGs7s) to play around with the available matchers.

```c++
#include <gtest/gtest.h>
#include <gmock/gmock.h>

TEST(AnExample, Test) {
    // ....
}

int main(int argc, char** argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
```

## Deliberation

We should all be thinking about ways to improve the tests we write to ensure they cover the most critical features of the engine and guard against regressions. By investing in understanding matchers we can improve the quality of our tests and build a wealth of experience (and utilities) to help each other as we test.

## Further Reading

This post has really only scratched the surface of what’s possible with matchers. The canonical reference for Google Test matchers can be found [here](https://github.com/google/googletest/blob/master/docs/reference/matchers.md). There’s a full list of all supported matchers and more information about how to create your own.

## To be continued...

In the next installment we’ll look at matchers for math types and how to improve the output of failing tests.

_Disclaimer: The views expressed here are those of the individual author and do not represent those of the Open 3D Foundation, Open 3D Engine or individual's respective company._