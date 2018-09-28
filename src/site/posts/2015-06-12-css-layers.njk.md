---
title: CSS Layers
description: CSS layers of responsibility
date: 2015-06-12
tags: [CSS]
---

[Article originally posted on Medium.](https://medium.com/@cathy_dutton/css-layers-afff4ae66649#.8iozwx4us )

A follow up to Surviving CSS, using Naming Conventions and CSS Methodologies to separate CSS into meaningful layers, aiding scalability, performance and organisation.

Many of the CSS issues discussed in my previous post can be easily avoided with the use of an appropriate CSS strategy. In this article I will look at the benefits to be gained from using a Methodology and/or a Naming Convention.

There are numerous Front End Methodologies and Naming Conventions available for use, each with there own advantages and disadvantages. In almost all cases the CSS is split into more manageable ‘chunks’ of code. The manner in which the CSS is split is what defines each methodology.

<h2 class="heading">Naming Conventions</h2>

The importance of a solid naming convention should not be overlooked. As well as organisational benefits there are numerous performance benefits to naming your selectors consistently and responsibly.

The proper implementation of any convention will also play a key part in reducing the fear factor associated with CSS on large scale projects.

<i>BEM</i>

One of the most popular Naming Conventions around is BEM (Block, Element, Modifier). By prefixing each element with it’s parent block modules become much easier to target safely. BEM can also help remove the reliance on nesting or attaching styles to page and body classes.

```
.block {}
.block__element {}
.block--modifier {}
```

The example above shows the class structure of a BEM project, underscores are used to separate elements, with hyphens for modifiers. Below is a real world example…

```
.product-details {}
.product-details__price {}
.product-details__price--sale {}
```

One pitfall of BEM is the temptation to add utility style classes into the modifier section. Modifier selectors such as, large, small, green or bold introduce opinions into the markup which could be subject to change at a later date.

```
.product-details {}
.product-details__title {}
.product-details__title--small {}
```

As with most utility classes the intentions are clear at the beginning of a project, but often lead to contradicting CSS if a design changes.

<i>SUIT</i>

Suit takes it’s roots from BEM, but uses camel case for component names and hyphens to separate components from their modifiers and descendants.

```
.u-utility {}
.ComponentName {}
.ComponentName--modifierName {}
.ComponentName-descendantName {}
.ComponentName.is-someState {}
```

This makes selectors a little more readable by removing potentially confusing hyphenated element names.

```
.ProductDetails {}
.ProductDetails-price {}
.ProductDetails-title--sale {}
```

<i>Prefixing</i>

If you don’t want to use such a strict or complicated naming convention prefixing each selector can work just as well.

```
.s-product-details {}
.t-product-details {}
.js-product-details {}
```

This method makes it easy to identify a structural class from a presentational class but is simpler to write and to understand. In the above example the structural properties would be applies to the s-product-details selector. The theming properties would be applied to the t-product-details selector.

Elements can be be defined in a similar way or by using base and modifier classes…

```
<button class="button">Button</button>
<button class="button button-checkout">Checkout Button</button>
<button class="button button-search">Search Button</button>
```

<i>On a side note prefixing Sass partials is also a huge help when locating files in a larger project as it removes the need to store partials in folders. This method is used in ITCSS.</i>

It doesn’t matter which if any you choose, the important thing is that you document your choices and stick to them for the entirety of the project.

<h3 class="heading">Methodologies</h3>

With the addition of a naming convention the CSS is now much safer and more performant. The need to Nest selectors should also be reduced resulting in smaller CSS files and less specificity issues.

Despite these improvements you can still end up with duplicate CSS like the example below.

```
.product-details__title {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    text-transform: uppercase;
    color: #333;
}

.latest-news__title {
   font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
   text-transform: uppercase;
   color: #FF0000;
}
```

This is where Front End Methodologies come in, splitting your CSS into layers will help prevent both duplicate styles and large grouped selectors. Common or base styles are defined separately, with the more specific or modifier styles added on top of the inherited styling.

<h3 class="heading">OOCSS</h3>

Object Orientated CSS has two main principles the first is separating structure from skin, the second is the separation of containers and content. Both of these principles are designed to increase performance by creating modules of re-usable CSS.

<i>Separating Structure from Skin</i>

```
<div class="box-padded product-image"></div>
<div class="box-padded product-description"></div>
```

```
.product-image {
	   width: 400px;
   	overflow: hidden;
}

.product-description {
   	width: 500px;
   	min-height: 200px;
   	overflow: auto;
}

.box-padded {
   	background: #FFF;
   padding: 10px;
}
```

<i>Separating Containers from Content</i>

```
<div class="wrapper recently-viewed"></div>
<div class="wrapper suggested-products"></div>
```

```
.wrapper {
	   width: 400px;
   margin: 0 auto;   	
   overflow: hidden;
}

.recently-viewed {
	   border: solid 1px #ccc;
	   background: #FFF;
   color: £666;
}

.suggested-products {
	   border: solid 1px #ccc;
	   background: #FFF;
   color: £666;
}
```

This Object Orientated way of working creates a series of utility classes which can be used to access sets of CSS properties. This way of working can improve site performance and maintenance as well as keeping CSS files DRY.

If however the markup is consistent across multiple themes an Object Orientated approach can result in the addition of correctional CSS used to override or remove unwanted inherited styles.

```
product-delivry.padded-box {
	   padding:0
}
```

As a result of this a white label approach with purely Semantic markup may be a wiser choice for projects with multiple skins and one code base.

<h3 class="heading">SMACSS </h3>

Scalable and Modular Architecture for CSS, like OOCSS is based around the reduction of repetitive styling. SMACSS however uses a set of 5 layers to separate the CSS and to bring a more structured approach to projects.

```
Base - HTML elements & defaults
Layout -Page structure
Module - Re-usable code bloks
State - Active/Inactive etc
Theme - Typography and colour schemes etc
```

This added organisation and structure improve the efficiency of the output CSS. The methodology can alos be adapted where needed by adding or removing layers.

<h3 class="heading">ITCSS</h3>

Inverted Triangle CSS is a fairly new methodology not to dissimilar to SMACSS, which creates a series of layers to manage dependancies and aid scalability. The base layer covers generic and broad selectors. The top layer covers localised module specific selectors. The full set of layers are as follows…

<ul>
<li><b>Settings</b> — Global variables & config</li>
<li><b>Tools</b> — Default mixins & functions</li>
<li><b>Generic</b> — Normalize, resets, box-sizing</li>
<li><b>Base</b> — HTML elements</li>
<li><b>Objects</b> — Design patterns</li>
<li><b>Components</b> — Modules & blocks of code</li>
<li><b>Trumps</b> — Helpers & overrides</li>
</ul>

The specificity increases with each layer, allowing for only the additional requirements to be added.

Taking the same example as above, the CSS would be split into the base and component layers.

```
p {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 14px;
}

.product-details__title {
    color: #333;
}

.latest-news__title {
    color: #FF0000;
}
```
<h3 class="heading">Think before you use </h3>

Just because you decide to implement one of the above strategies you are not tied to it in it’s entirety. If a certain layer doesn't work for your project then don’t use it. You can also adapt or add things to fit the needs of your project and team. No naming conventions or methodologies will work 100% for all projects all of the time.

You can also create your own Methodology or Naming Convention, allowing for a tailored solution that perfectly fits the requirements of your project. One disadvantage to bespoke solutions however is the lack of community support and documentation.
