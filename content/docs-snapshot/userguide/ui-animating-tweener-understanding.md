# Understanding Tweeners<a name="ui-animating-tweener-understanding"></a>

A *tweener* generates the transition between two images, giving the appearance of a smooth evolution between two frames\. At its simplest, a tweener creates a linear transition\. For example, a circle that starts at the top of the screen and ends at the bottom of the screen travels at a steady, unchanging pace between the two points\. This is similar to an object moving on a conveyer belt\. To simulate gravity, you can use a quadratic tweener, which accelerates slowly at first and then steeply increases towards the end\. This simulates dropping an object that does not bounce\.

Bounce and elastic tweeners offer flexibility when you want to simulate bounce or elasticity\. The following animation shows a bouncing tweener\. The ball starts offscreen and ends at the bottom of the screen\. Between the start and end frames, the ball appears to bounce\.

![\[Ball with bouncing tweener from off-screen to the bottom of the UI screen\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/ui-animating-tweener.gif)

Properties other than location can also use tweeners\. The following animation shows a linear tweener for opacity, and a bouncing tweener for scale\.

![\[Linear tweener for opacity (transparent to opaque) and bouncing tweener for scale (small to large)\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/ui-animating-tweener-1.gif)

Tweeners are highly customizable\. You can specify parameters to change properties such as duration, delay before starting, number of times to play, whether to go from the specified value to the current value or vice versa, and so on\. 

For available parameters and how to use them, see [Tweener Supported Components](ui-animating-tweener-components.md)\. You can also [create a timeline](ui-animating-tweener-timeline.md) to chain animations together with different tween types\. 