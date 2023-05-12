---
linktitle: Formatting Tools
title: Formatting Tools Available in O3DE Documentation
description: A list of the supported tools that can assist with the formatting of O3DE documentation.
weight: 350
---

The **Open 3D Engine (O3DE)** website includes support for the following tools that can assist with the specialized formatting needs of some O3DE documentation.

## Mathematical formulas in TeX and MathML {#math-formulas}

You can embed mathematical formulas using TeX and MathML input formats. Refer to the [MathJax documentation](https://docs.mathjax.org/en/latest/index.html) for more information on how to use the MathJax version 3.0 display engine.

**Example Usage**

```markdown
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
```

**Example Output**

$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$

## Diagrams using Mermaid {#diagrams}

You can create a variety of diagrams and other visualizations from within Markdown code blocks that will render using the Mermaid diagram tool. Refer to the [Mermaid documentation](https://mermaid-js.github.io/mermaid/) to learn about the various supported diagram types and their usage syntax.

### Example: Flowchart

````
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
````

**Output**

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

### Example: UML Class Diagram

````
```mermaid
classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
        +String beakColor
        +swim()
        +quack()
    }
    class Fish{
        -int sizeInFeet
        -canEat()
    }
    class Zebra{
        +bool is_wild
        +run()
    }
```
````

**Output**

```mermaid
classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
        +String beakColor
        +swim()
        +quack()
    }
    class Fish{
        -int sizeInFeet
        -canEat()
    }
    class Zebra{
        +bool is_wild
        +run()
    }
```
