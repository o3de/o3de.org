---
description: ' Follow this guide for the first steps to start using LyTestTools. '
title: Getting Started with LyTestTools
---

This guide outlines the first steps to start using LyTestTools. By the end of this guide, you will be ready to write and run tests.

## Prerequisites

This guide requires that you've completed the following:

 * [Open 3D Engine - Getting Started](/docs/user-guide)
 * [Configure and Build](/docs/user-guide/build/configure-and-build)

## Start Testing

Once you have the prerequisites finished, you should have everything for testing configured and ready. You can verify this by running the following command. 

```shell
~/python/python -m pytest <path_to_test_file> --build-directory <path_to_build_output>

When your tools are ready, configured, and working, proceed to the next guide appropriate for you:

 * [LyTestTools - My First Test](/docs/user-guide/testing/lytesttools/my-first-test) to learn how to create your first tests with LyTestTools
 * Ctest - Running tests

Visit [PyTest framework](https://docs.pytest.org/en/latest/) for further information about the framework and how it helps in writing tests.
