---
title: "CMake Essentials Series - Part 1"
date: 2022-10-05
slug: cmake-essentials-series-part-1
author: Tom Hulton-Harrop
blog_img: "/images/blog/announcement_thumbnail.jpg"
full_img: ""
---
This series aims to give an overview of some of the most useful functionality in CMake and how to apply it in O3DE.

## Motivation

CMake is the most widely used build system in the C++ community and understanding how best to use it unlocks a whole host of possibilities when it comes to C++ development in O3DE. Project setup becomes a breeze and integration with open source projects is made much simpler.

## Example

To begin this series we’ll show the minimum amount of code required to get a `‘Hello, World!’` application up and running. First create a new folder and in it create an empty `main.cpp` and `CMakeLists.txt` file.

```bash
mkdir cmake-essentials-part1 && cd cmake-essentials-part1
touch main.cpp && touch CMakeLists.txt
```

The `CMakeLists.txt` file looks like this:

```bash
cmake_minimum_required(VERSION 3.15) # 1
project(cmake-essentials-part1 LANGUAGES CXX) # 2
add_executable(${PROJECT_NAME}) # 3
target_sources(${PROJECT_NAME} PRIVATE main.cpp) # 4
target_compile_features(${PROJECT_NAME} PRIVATE cxx_std_17) # 5
```

First we set the CMake version (`#1`). This line always has to come first in a top-level CMakeLists.txt file (`3.15` is a safe bet but feel free to pick a newer version).

Next is the `project` command (`#2`), this should immediately follow `cmake_minimum_required` (`LANGUAGES` is optional but good practice).

We then create the target to build (`#3`), in this case an executable (`${PROJECT_NAME}` maps to `cmake-essentials-part1`, the name set in the `project` command).

Following that we set the sources to be built (`#4`). As with all<sup>1</sup> `target_` commands we must specify the scope of the items - here we use `PRIVATE` as these files are not going to be relied on by some downstream dependency.

Finally we set the C++ version (`#5`), which again is not strictly required but good practice (note we’re not touching compiler flags here, CMake will handle this for us).

<sup>1</sup> Technically not _all_ target commands require scope, but it’s best practice to always provide this even if legacy commands work without it.

`main.cpp` should look familiar:

```c++
#include <iostream>
int main(int argc, char argv[]) {
    std::cout << "Hello, World!\n";
    return 0;
}
```

With that setup, the last thing to do is to run CMake.

```bash
> cmake -S . -B build # 1
> cmake --build build # 2
```

The first line (`#1`) will run the CMake configure step to generate host build files. On Windows this will likely default to Visual Studio and can be specified with `-G`.

The following line (`#2`) will invoke whatever build system the configure step generated and leave your application in the `build` folder. With Visual Studio this will be `build/Debug/cmake-essentials-part1.exe`.

## Deliberation

This might seem like mildly more work than opening Visual Studio and creating a project from there, but the massive advantage to this approach is you’ve now created a completely portable C++ program you can build from source on any operating system that supports CMake (most do!). You can easily share this with someone else to quickly build a demo application and even better, with only a few more commands it’s possible to start integrating third-party libraries. (No more searching through include paths and linker settings in Visual Studio configuration windows.)

## Further Reading

One of the most widely recommended talks on CMake is an excellent presentation by Daniel Pfeifer titled 'Effective CMake':

> [C++ Now 2017: Daniel Pfeifer “Effective CMake"](https://youtu.be/bsXLMQ6WgIk) by Daniel Pfeifer

It covers a lot of ground and gives a thorough introduction to the current CMake landscape and best practices.

## To be continued...

In the next entry in this series we’ll look at bringing in some third-party dependencies to our project.

_Disclaimer: The views expressed here are those of the individual author and do not represent those of the Open 3D Foundation, Open 3D Engine or individual's respective company._

### Check out the other parts of the series:

* [CMake Essentials Series - Part 1](/blog/posts/cmake-essentials-series-part-1/)
* [CMake Essentials Series - Part 2](/blog/posts/cmake-essentials-series-part-2/)
* [CMake Essentials Series - Part 3](/blog/posts/cmake-essentials-series-part-3/)
* [CMake Essentials Series - Part 4](/blog/posts/cmake-essentials-series-part-4/)