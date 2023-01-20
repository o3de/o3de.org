---
title: "CMake Essentials Series - Part 2"
date: 2022-10-19
slug: cmake-essentials-series-part-2
author: Tom Hulton-Harrop
blog_img: "/images/blog/announcement_thumbnail.jpg"
full_img: ""
---
How to quickly integrate third party libraries with your CMake projects.

## Motivation

Dependency management in C++ has always been difficult. Without any sort of package manager the manual steps involved in bringing in a library can be time consuming and error prone. Fortunately CMake has a fairly recent addition (3.11-3.14) that makes this incredibly simple.

## Example

The killer feature that makes dependency management a breeze is `FetchContent`. Let's pick up where we left off in the last part by adding some useful functionality to our 'Hello, World!' application. Suppose we'd like to make use of an iterator library but don't want to have to copy it into our source tree and manually configure it to build ourselves. This is how we'd achieve it with `FetchContent` (new code follows the `project` command from [Part 1](/blog/posts/cmake-essentials-series-part-1)).

```cmake
...
include(FetchContent) #1
FetchContent_Declare( #2  
  EasyIterator #3
  GIT_REPOSITORY https://github.com/TheLartians/EasyIterator.git #4  
  GIT_TAG aab0c0d8fd17708c64522408d9b304729dbc3a3f #5
)
FetchContent_MakeAvailable(EasyIterator) #6
...
target_link_libraries(${PROJECT_NAME} PRIVATE EasyIterator) #7
...
```

First we need to bring the CMake `FetchContent` module into our `CMakeLists.txt` file (`#1`).

We then declare the library we'd like to use with `FetchContent_Declare` (`#2`).

We give the dependency a name (`#3`) and point it to the git repo of the library we'd like to use (`#4`) (`GIT_REPOSITORY` is only one of many options such as `SOURCE_DIR` for a local path).

Finally it's good practice to pin the version of the library to a specific commit (or a tag if one exists) (`#5`) so subsequent upstream changes don't break us immediately.

`FetchContent_MakeAvailable` (`#6`) then does quite a lot of work behind the scenes but essentially just makes the targets available to be used by our application.

The last thing we need to do is just link against the dependency (`#7`). The great thing about this is that as long as the project we're depending on has been set up correctly, there's no need to touch include or library paths, everything is handled upstream and isn't our concern.  
  
With that we can write an improved 'Hello, \<planet\>' program that outputs the index at each iteration.

```c++
#include <easy_iterator.h>
...
std::vector<std::string> planets = {    
    "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto?"};
for (auto [index, planet] : easy_iterator::enumerate(planets)) {    
    std::cout << index << ": Hello," << ' ' << planet << '\n';
}

// outputs:
// 1: Hello, Mercury
// 2: Hello, Venus
// 3: Hello, Earth
// ...
//
```

## Deliberation

`FetchContent` is fantastic for small, simple libraries that are fast to build. The dependency is built directly along with our application. (The dependencies actually wind up in `build/_deps`.) For larger dependencies we might want to build them separately first at an earlier stage and then bring them in with the `find_package` command (more on this next time...). `FetchContent` also only works with projects that build using CMake, although the vast majority now do and even those that don't often have community maintained CMake versions. Check out [bgfx.cmake](https://github.com/bkaradzic/bgfx.cmake) as an example.

## Further Reading

The CMake [`FetchContent` docs](https://cmake.org/cmake/help/latest/module/FetchContent.html) aren't a bad place to start for more information.  
  
There's also another intro CMake video titled ['CMake for Dummies'](https://youtu.be/7W4Q-XLnMaA). (_The video quality isn't the best but it does a great job covering the basics of using CMake_.)
  
_Disclaimer: The views expressed here are those of the individual author and do not represent those of the Open 3D Foundation, Open 3D Engine or individual's respective company._

### Check out the other parts of the series:

* [CMake Essentials Series - Part 1](/blog/posts/cmake-essentials-series-part-1/)
* [CMake Essentials Series - Part 2](/blog/posts/cmake-essentials-series-part-2/)
* [CMake Essentials Series - Part 3](/blog/posts/cmake-essentials-series-part-3/)
* [CMake Essentials Series - Part 4](/blog/posts/cmake-essentials-series-part-4/)