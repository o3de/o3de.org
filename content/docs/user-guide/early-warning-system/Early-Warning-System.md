---
description: ' Write C++ unit tests for Open 3D Engine with the AzTest framework. '
title: Early Warning System
---

The Early Warning System is a tool for simple style checks and "sanity level" static analysis, which do not deeply inspect code functionality. It runs before the pipeline starts a build, attempting to quickly reject invalid changes before spending machine resources to build and test, and before spending human effort on reviewing changes.

*   [Validation is failing on my commit!](#Validation-is-failing-on-my-commit!)
    *   [What file is failing? What rule is failing?](#What-file-is-failing?-What-rule-is-failing?)
    *   [How do I submit a fix?](#How-do-I-submit-a-fix?)
*   [Local validation](#Local-validation)
    *   [Git Commits](#Git-Commits)
    *   [Targeting any random file or folder tree](#Targeting-any-file-or-folder-tree)
*   [Pipeline validation](#Pipeline-validation)
*   [Create a new validator](#Create-a-new-validator)

Validation is failing on my commit!
-----------------------------------

The most likely reason you visited this page was to help work past a validation failure.  To find the relevant fix, first look at the logs!

## What file is failing? What rule is failing?

Every validation failure will log a message of the following type.  Search for "FAILED" and find lines of the form:

```
<path_to>\some_file.cpp::ValidatorRuleName FAILED - <failure details>
```

## How do I submit a fix?

Modify your code to be compliant and resubmit to the [Automated Review](TODO) pipeline.  You can also run the validator locally, if you don't want to wait or want to debug a validator.

If the validator script contains a bug, it is recommended that a [GitHub Issues ticket](https://github.com/aws-lumberyard/o3de/issues/new/choose) is open.

Local validation
----------------

Files can be checked locally by running Python3 against the scripts located at \\o3de\\scripts\\commit\_validation\\

## Git Commits

```
python\python.cmd scripts\commit_validation\git_validate_branch.py --source SOURCE --target TARGET

python\python.sh scripts\commit_validation\git_validate_branch.py --source SOURCE --target TARGET
```

## Targeting any file or folder tree

```
python\python.cmd scripts\commit_validation\validate_file_or_folder.py --path (any-folder-or-file)

python\python.sh scripts\commit_validation\validate_file_or_folder.py --path (any-folder-or-file)
```

*Note*: The validator simulates that every file in the folder (or the one file you specify) is part of your proposed change and changes every line in the file. This causes all the validators to scan as appropriate. The validator does not accept wildcards. Specify a file name or a folder name and it will operate recursively.

Pipeline validation
-------------------

Connecting this tool into a Continuous Integration system is identical to local use!  Simply fail the pipeline when it exits with a non-zero code.

The Automated Review submission pipeline uses Jenkins to manage this tool.

Create a new validator
----------------------

The validators exist as Python code in o3de\\scripts\\commit\_validation\\

Adding a validator is as simple as creating a new class in submodule 'validators' which:

1.  Inherits from CommitValidator and implements run(self, commit)
2.  Implements get\_validator() and returns the new class