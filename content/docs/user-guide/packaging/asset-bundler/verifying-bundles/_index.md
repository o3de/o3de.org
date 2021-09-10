---
description: ' Verify that the assets in your O3DE project are properly bundled and
  referenced. '
linktitle: Verifying Bundles
title: Verifying that Bundles Contain Required Assets
weight: 300
---

When your team generates a release build that has bundled game assets, you want to verify that the bundles contain everything required to ship your game. Use the tools of the O3DE asset bundling system throughout the game development process to verify that your asset bundles contain the required assets.

As a best practice, verify that your bundles contain their required assets during all game development phases:

* When you start
* While you develop
* In development builds
* In release builds

## When You Start

As you start building your game, ensure that you create the references to assets that your product requires at runtime. 

## While You Develop Your Game

Errors can occur when assets are bundled later in the development process. To avoid errors, consider bundling earlier. However, even before you've defined your seed list or built bundles, you can take steps to avoid unwanted surprises later.

### After You Have a Seed List

After you've built a seed list, but before you bundle your assets, you can use the Asset Validation Gem to verify that asset loads map back to seeds. For more information, see [Using the Asset Validation Gem to Verify Seeds](/docs/user-guide/gems/reference/assets/asset-validation).

## In Development Builds

After you've generated bundles for your game, test your game in bundle mode with a development build of the editor or launcher. With bundle mode active, use the `sys_report_files_not_found_in_paks` console variable to find any asset files that are missing from your game `.pak` files. For more information, see [Using Bundle Mode to Test Bundles](/docs/user-guide/packaging/asset-bundler/verifying-bundles/bundle-mode/).

## In Release Builds

As with development builds, you can use bundle mode and the `sys_report_files_not_found_in_paks` console variable to find missing asset files in release builds. For more information, see [Using Bundle Mode to Test Bundles](/docs/user-guide/packaging/asset-bundler/verifying-bundles/bundle-mode/).
