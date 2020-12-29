description: ' Design considerations for authoring iOS and Android games using &ALYlong;. '
slug: ios-android-design-considerations
title: Design Considerations for Creating Mobile Games Using &ALY;
---
# Design Considerations for Creating Mobile Games Using Lumberyard<a name="ios-android-design-considerations"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

Lumberyard is a cross\-platform game engine, which allows you to develop your game with less concern about the release platform\(s\)\. However, some mobile development considerations are discussed below, including game logic, input, and application lifecycle\.

## Application Lifecycle<a name="mobile-design-considerations-application-lifecycle"></a>

Lumberyard provides a Process Life Management Gem \(in the Project Configurator\) that shows how you can respond to various application lifecycle events in order to pause your game, display a modal splash screen, and any other actions that need to occur if your application loses focus\. You can access system\-specific events in C\+\+ by connecting to the appropriate EBus; however, Lumberyard also generates platform\-agnostic events that you can use for all supported platforms\.


****  

| Lumberyard Application Lifecycle Events | [iOS](https://developer.apple.com/library/ios/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/TheAppLifeCycle/TheAppLifeCycle.html) | [Android](http://developer.android.com/reference/android/app/Activity.html#ActivityLifecycle) | 
| --- | --- | --- | 
| OnApplicationConstrained | [applicationWillResignActive](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622950-applicationwillresignactive) | [onPause\(\)](http://developer.android.com/reference/android/app/Activity.html#onPause()) | 
| OnApplicationUnconstrained | [applicationDidBecomeActive](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622956-applicationdidbecomeactive) | [onResume\(\)](http://developer.android.com/reference/android/app/Activity.html#onStart()) | 
| OnApplicationSuspended | [applicationDidEnterBackground](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622997-applicationdidenterbackground) | [onPause\(\)](http://developer.android.com/reference/android/app/Activity.html#onPause()) | 
| OnApplicationResumed | [applicationWillEnterForeground](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623076-applicationwillenterforeground) | [onResume\(\)](http://developer.android.com/reference/android/app/Activity.html#onStart()) | 
| OnMobileApplicationWillTerminate | [applicationWillTerminate](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623111-applicationwillterminate) | [onDestroy\(\)](http://developer.android.com/reference/android/app/Activity.html#onDestroy()) | 
| OnMobileApplicationLowMemoryWarning | [applicationDidReceiveMemoryWarning](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623063-applicationdidreceivememorywarni) | [onLowMemory\(\)](http://developer.android.com/reference/android/content/ComponentCallbacks.html#onLowMemory()) | 

**To receive process lifecycle events in your game**

1. Derive your class from `AzFramework::ApplicationLifecycleEvents::Bus::Handler` \(or `AzFramework::[Ios|Android|Windows]LifecycleEvents::Bus::Handler` for platform\-specific events\)\.

1. Override the functions corresponding to the events you wish to override: 

   ```
   void OnApplicationConstrained(Event /*lastEvent*/) override;
   void OnApplicationUnconstrained(Event /*lastEvent*/) override;
   
   void OnApplicationSuspended(Event /*lastEvent*/) override;
   void OnApplicationResumed(Event /*lastEvent*/) override
   ```

1. Connect to the event bus when you want to start listening for events \(be sure to also disconnect when you no longer wish to receive them\): 

   ```
   ApplicationLifecycleEvents::Bus::Handler::BusConnect();
   ???
   ApplicationLifecycleEvents::Bus::Handler::BusDisconnect();
   ```

For a complete example of how to subscribe and respond to application events, see the `Gems\ProcessLifeManagement\Code\Source\ProcessLifeManagementGem.h\.cpp` directory\.