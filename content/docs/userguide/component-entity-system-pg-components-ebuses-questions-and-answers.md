# Components and EBuses: Questions and Answers<a name="component-entity-system-pg-components-ebuses-questions-and-answers"></a>

The following are some questions and answers for using components and EBuses in Amazon Lumberyard\.

**Q\. Is it possible to mix Lumberyard's legacy object entity system with its newer component entity system? If so, what is the best practice?**  
A\. If you enable legacy systems, the two systems can work side by side\. However, no formal mechanisms exist to have them work together in the way most games would expect\.

**Q\. Are there combinations of components that should be avoided?**  
A\. In principle, no\. However, every component has a small resource cost associated with it\. When possible, avoid creating long chains of components if the desired objective be accomplished through simpler means\.

**Q\. When should I make an editor component?**  
A\. When editor–only functionality is required, or when the data in the editor must be different than the data in the runtime\. For more information, see [Editor Components](component-entity-system-pg-editor-components.md)\.

**Q\. What is the best practice for a component to communicate with another component on the same entity? What if the component is on a different entity?**  
A\. Using EBuses for both events and event monitoring\. For more information, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

**Q\. What is the best way to find component entities at runtime?**  
A\. The method depends on the use case\. Here are some possible approaches:  
+ Follow a convention in which you use the [Tag](component-tag.md) component to apply tags to specific types of entities\. Then use the tags to find the entities that you want\. Note that searching through all the entities in a large world can be resource intensive\.
+ Create a custom component that listens on a new EBus for an event\. At an appropriate time, emit that event so that all entities can react to it appropriately\.
+ If a hard connection is possible, use a component that contains an entity reference\. Then look up the entity directly by ID at runtime\.

**Q\. What is the best way to group component entities?**  
A\. Because the [Entity Outliner](component-entity-outliner.md) in Lumberyard Editor shows entities in parent–child hierarchy, group entities under a parent whenever possible\. This provides contextual organization\.

**Q\. What are best practices for organizing and working with a large number of component entities in Lumberyard Editor?**  
A\. Where appropriate, use [slices](component-slices.md) for repeated content\. To make it easy to collapse or hide large groups of entities in the Entity Outliner, create a hierarchy of entities\.

**Q\. How should I decide whether to place code in a component constructor, in an `OnInit`, or in an `OnActivate` method?**  
A\. Use the following criteria:  
+ Constructor: Use for base initialization\. A constructor is called only once, when the class is created\.
+ `OnInit`: Called only once, after all components have been created\. Like a constructor, an `OnInit` method should contain only initialization code that is only required once\. However, `OnInit` methods might be more appropriate in some cases for late binding or late initialization\.
+ `OnActivate`: Use this function for any task that needs to be set up or initialized every time the entity is activated\. Entity activation occur multiple times depending on editor or game logic and the actions taken\. Commonly, this includes tasks like connecting to EBuses so that the entity can be notified when events occur\. Corresponding disconnects occur in `DeActivate`\.

**Q\. What are best practices for adding or removing components at runtime?**  
A\. Adding or removing components at runtime requires that the entity to which the component belongs be deactivated and then reactivated\. This process is not resource intensive, but you must ensure that state is properly maintained by saving it before deactivation and restoring it after activation\.

**Q\. What are best practices for creating entities and adding components at runtime using C\+\+?**  
A\. Only some Lumberyard components support runtime creation\. Custom components must be specifically built to support runtime creation\. For a discussion of the differences between editor and runtime components, see [Editor Components](component-entity-system-pg-editor-components.md)\.