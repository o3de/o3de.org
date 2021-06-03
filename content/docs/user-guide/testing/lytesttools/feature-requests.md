---
description: ' Follow these steps to request a new feature in LyTestTools. '
title: Feature Requests
---

LyTestTools (LTT) is a Python package distributed with Lumberyard that helps developers and testers write integration tests using Python.

**What belongs in LTT?**

Functions and tools that help make writing tests easier that are not managed well elsewhere. Good examples include editing config files in an automated fashion, and launching applications.

**What does not belong in LTT?**

Functions and tools that, while tests may want to use them, are already automated and/or scripted elsewhere. A good example of this is building the editor. While tests may want to test the build process, they should do this by invoking build tools directly.

**Where do I find LTT?**

LTT is found under Tools\LyTestTools. This includes both its public API as well as its internal files. 

**How is LTT organized?**

Tools\LyTestTools\example contains examples on how to extend LTT, write test helpers, and write tests.

Tools\LyTestTools\ly_test_tools contains the tools themselves, and should be referenced for what functions are available. However, Tools\LyTestTools\ly_test_tools\_internal contains protected functionality for LTT, and should not be accessed directly.

Tools\LyTestTools\tests contains the integration and unit tests that run against LTT. These tests can be run to verify that your current installation of LTT is set-up properly. They can also be referenced for examples as to how to use methods in LTT properly.

**How can I request new features / functionality?**

File an issue. Make sure to include the following:

* A short yet descriptive title
* A clear explanation of what functionality is desired
* Acceptance criteria for the work to be considered 'done'
* Relevant examples and files, especially before & after comparisons

**What if I want to make changes to LTT?**

First, we suggest that you start off by writing test helpers near your tests. Once you've made your changes, open a pull request (PR). Reach out in sig-testing channel in the Open 3D Engine Foundation Discord (or ask a specific sig-testing member) to review your PR.

After your test helpers are added, some of them may be appropriate to add to LTT itself. If you feel like your changes should be added to LTT, feel free to initiate that conversation in sig-testing. The team may also reach out to you regarding shared test helpers you've written, in order to integrate them into LTT.
