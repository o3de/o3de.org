# Lip Synchronization with EMotion FX<a name="cloud-canvas-cloud-gem-text-to-speech-emotionfx"></a>

Starting in version 1\.12, Lumberyard uses [Animation Editor](char-intro.md) to implement lip synchronization\.

In the example in the following image, a **Talker** entity has been created that uses Lumberyard's text\-to\-speech feature\. The entity is configured with the **Animation Editor** **AnimGraph**, **Actor**, and **Character Physics** components\. In the example, physics for the talker are specified as `Is Active = false` so that the talking head can remain motionless in space\.

![\[Talker entity with Animation Editor components\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-text-to-speech-emotionfx-1.png)

Lumberyard uses a simple [animation graph](char-animation-editor-concepts-and-terms.md#understanding-animation-graphs) that blends simple motion and idle animation with the output of a state machine\. The animation graph transitions from state to state and animation pose to animation pose to match the current viseme that is read from the speech marks file\.

![\[Animation graph\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-text-to-speech-emotionfx-2.png)

The transitions in the state machine are driven by a `visemeIndex` control parameter that is sent to the graph by the `SpeechComponent` through the `EMotionFX::Integration::AnimGraphComponentRequestBus`\. The following image shows a state machine that contains `1` state for each viseme\. The highlighted example shows that viseme **SS** is played when `visemeIndex == 3`\.

![\[Viseme example\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-text-to-speech-emotionfx-3.png)

The `SpeechComponent` is configured to match the index values of the state machine\.

![\[Speech component visemes\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-text-to-speech-emotionfx-4.png)