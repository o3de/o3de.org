# Process Life Management Gem<a name="gems-system-gem-process-life-mgmt"></a>

The Process Life Management gem demonstrates how you can respond to various application lifecycle events dispatched by the Lumberyard engine, in order to pause your game, display a modal splash screen, or anything else you may need to do when your application loses/regains focus\.

![\[Use the Process Life Mangement gem to respond to different application lifecyle events.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gems-system-gem-processlifemgmt.jpg)

You can access all system\-specific events from C\+\+ \(even without enabling the Process Life Management gem\) by connecting to the appropriate EBus\. Lumberyard also generates platform\-agnostic events so that you can handle these events for all supported platforms\.


**Lumberyard Application Lifecycle Events**  

| Lumberyard Application Lifecycle Events | [iOS](https://developer.apple.com/library/ios/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/TheAppLifeCycle/TheAppLifeCycle.html) | [Android](http://developer.android.com/reference/android/app/Activity.html#ActivityLifecycle) | 
| --- | --- | --- | 
| OnApplicationConstrained | [applicationWillResignActive](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622950-applicationwillresignactive) | [onPause\(\)](http://developer.android.com/reference/android/app/Activity.html#onPause()) | 
| OnApplicationUnconstrained | [applicationDidBecomeActive](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622956-applicationdidbecomeactive) | [onResume\(\)](http://developer.android.com/reference/android/app/Activity.html#onStart()) | 
| OnApplicationSuspended | [applicationDidEnterBackground](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622997-applicationdidenterbackground) | [onPause\(\)](http://developer.android.com/reference/android/app/Activity.html#onPause()) | 
| OnApplicationResumed | [applicationWillEnterForeground](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623076-applicationwillenterforeground) | [onResume\(\)](http://developer.android.com/reference/android/app/Activity.html#onStart()) | 
| OnMobileApplicationWillTerminate | [applicationWillTerminate](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623111-applicationwillterminate) | [onDestroy\(\)](http://developer.android.com/reference/android/app/Activity.html#onDestroy()) | 
| OnMobileApplicationLowMemoryWarning | [applicationDidReceiveMemoryWarning](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623063-applicationdidreceivememorywarni) | [onLowMemory\(\)](http://developer.android.com/reference/android/content/ComponentCallbacks.html#onLowMemory()) | 

As demonstrated in `ProcessLifeManagementGem.h\ProcessLifeManagementGem.cpp`, use the following basic steps to receive process lifecycle events in your game\.

**To receive process lifecycle events in your game**

1. Derive your class from `AzFramework::ApplicationLifecycleEvents::Bus::Handler` \(or `AzFramework::[Ios|Android|Windows]LifecycleEvents::Bus::Handler` for platform specific events\)\.

1. Override the functions corresponding to the events that you want to override: 

   ```
   void OnApplicationConstrained(Event /lastEvent/) override;
   void OnApplicationUnconstrained(Event /lastEvent/) override;
               
   void OnApplicationSuspended(Event /lastEvent/) override;
   void OnApplicationResumed(Event /lastEvent/) override
   ```

1. Connect to the event bus when you want to start listening for events\. In addition, be sure to disconnect when you no longer want to receive them\. Use the following syntax:

   ```
   ApplicationLifecycleEvents::Bus::Handler::BusConnect();
   …
   ApplicationLifecycleEvents::Bus::Handler::BusDisconnect();
   ```