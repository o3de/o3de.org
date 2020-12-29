# Working with Amazon Lumberyard systems APIs<a name="systems-intro"></a>

Amazon Lumberyard provides a number of APIs to access and invoke key parts of the Lumberyard engine from your game, including a new in\-game console and a new event management system\.

These C\+\+ APIs are called from your code, and provide important infrastructure functionality for your game, including messaging and communications, and an in\-game console with variable and functor support\.

You can find these APIs defined in the following headers:
+ Event\.h \(in %INSTALL\_ROOT%\\dev\\Code\\Framework\\AzCore\\AzCore\\EBus\\\) for [AZ::Event](az-event.md)
+ IConsole\.h \(in %INSTALL\_ROOT%\\dev\\Code\\Framework\\AzCore\\AzCore\\IConsole\\\) for [AZ::Console](az-console.md)
+ Interface\.h \(in %INSTALL\_ROOT%\\dev\\Code\\Framework\\AzCore\\AzCore\\Interface\\\) for [AZ::Interface](az-interface.md)

Some of these systems APIs replace functionality from older versions, or provide alternative methods, such as AZ::Console for the CryConsole and AZ::Event for EBus\.

For C\+\+ API reference documentation, see the [Amazon Lumberyard C\+\+ API Reference](https://docs.aws.amazon.com/lumberyard/latest/apireference/)\.

**Topics**
+ [AZ::Console](az-console.md)
+ [AZ::Event<\.\.\.>](az-event.md)
+ [AZ::Interface<T>](az-interface.md)