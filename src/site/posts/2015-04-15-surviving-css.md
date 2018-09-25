---
title: Surviving CSS
description: A look at how to work effectively with CSS
date: 2015-04-15
tags: CSS
---

[Article originally posted on medium.](https://medium.com/@cathy_dutton/surviving-css-be306ef3de6d#.k8czem45b)

<h4 class="heading">A few simple techniques to keep your CSS in check...</h4>

The ultimate goal of any CSS is to style the intended element with selectors that do not introduce side effects to the rest of the code base. Seemingly a simple request, but on large projects that lack structure or guidelines this task can lead to some pretty ugly usage of CSS.

<blockquote> <i>“…the single hardest problem in CSS: Getting your rules to match the elements you want, without them accidentally matching the elements you don’t.”</i>

Philip Walton, Engineer at Google </blockquote>

We have all at some point been forced to write the kind of CSS that would drive any good developer crazy.

Specific CSS like this…

```
#mediaGalleryHolder #mediaGallery .mediaGalleryImage {               
   border: 1px solid #e3e3e3;
   width: 100%;
}
```

Contradictory CSS like this…

```
.fl {
   float: none;
}
```

or unnecessary correctional CSS like this..

```
.sidebar {
   border: 0;
   background: transparent;
}
```

<i>Specific selectors</i>

Using long, specific selectors is sometimes viewed as way of safe guarding a code base. If the target selector is preceded by one or two parent selectors the risk of accidentally effecting existing code is reduced. Adding extra selectors however reduces the efficiency of the CSS and will cause problems with older browsers that have selector limits. They could also hinder future development, forcing equally specific selectors or !important to be used to override styles.

<i>Correctional CSS</i>

If you have to remove unwanted styles from an element the chances are there is a previously added selector which is too generic and therefor effecting additional elements unintentionally.

<i>Contradicting selectors and properties</i>

Although not necessarily adding to CSS bloat, having CSS properties which contradict the selectors they are applied to is not good practice. Contradicting styles can make a code base confusing or difficult to work with.

<i>Bade code creates bad code</i>

In most cases selectors like the above examples are not written out of choice, but because they are needed to overwrite poorly written existing CSS or markup. Because of this it is hugely important to plan each project thoroughly, defining coding patterns, naming conventions and style guides before the build begins.

This article will look at a few tips to help keep your CSS in check and to avoid ever having to write such contradictory, correctional or overly specific selectors.

<h2 class="heading">Keep your markup opinion free</h2>

All style changes should be able to be carried out using only CSS. To achieve this the site markup needs to remain free of opinions or assumptions about the sites appearance.

Keeping style related classes out of the markup will also help to keep the CSS readable and remove the need to use specific selectors to override styling. This is turn provides better performance and increases usability.

<i>HTML</i>

```
<button class="button-primary">Checkout</button>
<button class="button-secondary">More Information</button>
<button class="button-primary">Log In</button>
```

<i>CSS</i>

```
.button-primary {
   @extend %button-primary;
}
.button-secondary {
   @extend %button-secondary;
}
```

In this example there are two button styles each with a different background colour. If, at a later date it is decided that the Log In Button should be the primary colour instead of the secondary colour, a new selector would need to be added that has more specificity than the button-primary selector.

```
.account-drop-down .button-primary {
   @extend %button-secondary;
}
```

By using content classes for the markup and style selectors in the CSS, updates like this can be carried out in a more logical manor.

<i>HTML</i>

```
<button class="button-checkout">Checkout</button>
<button class="button-information">More Information</button> <button class="button-log-in">Log In</button>
```

<i>CSS</i>

```
.button-checkout {
   @extend %button-primary;
}
.button-information {
   @extend %button-secondary;
}
.button-log-in {
   @extend %button-secondary;
}
```

<h2 class="heading">Be wary of helper (Utility) classes</h2>

A utility class applies a single rule or a universal pattern to a web element. Utility classes are intended to be as reusable as possible, and should therefore be used throughout a sites markup. Below are a few examples of Utility Classes…

```
.float-left,
.align-center
.font-large
.list-unstyled
.clearfix
```

These classes can be useful when used with projects that have fresh independent markup. They provide a way for a site to quickly take on a structure without the need to write any new CSS. On larger projects however the markup often stays in tact and/or is used across multiple site views. In these cases utility classes become more of a hinderance then a help.

For example a website that uses a common code base may be tied to certain markup. If utility classes have been used within this markup they can create issues as the site evolves. Layout or design changes may force us to override these utility classes in theme specific CSS, resulting in code like the examples below…

```
.text-left {
   text-align: center;
}
.float-left {
   float: none;
}
```

<h3 class="heading">3 Avoid grid related markup</h3>

Grid based markup should be avoided at all costs, a common pitfall of responsive development once implemented the markup can be very difficult to work with or to remove.

Class names like .column-span-4 refer to the desktop version of a site, this often leads to some questionable CSS appearing within media queries…

```
.column-span-4 {
   width: 23%;
   float: left;
   margin-right: 2%;
}
@media (max-width: 767px) {
   .column-span-4 {
      width: 98%;
   }
}
```

CSS like this does not just fail to make sense, it also groups numerous sections of content together and forces them to respond in the same manor. This can lead to the use of very specific selectors in order to allow different sections of content to respond differently.

```
.column-span-4 {
   width: 23%;
   float: left;
   margin-right: 2%;
}  
@media (max-width: 767px) {
.news-feed .column-span-4 {
      width: 48%;
   }

   .latest-testimonials .column-span-4 {
      width: 100%;
   }
}
```

These extra selectors prevent code from being re-used and reduce efficiency. Some frameworks including Bootstrap attempt to resolve this issue by adding more classes to each element to determine it’s size at each breakpoint.

```
<div class="col-sm-4 col-md-4 col-lg-4">
```

The above approach will improve the site’s CSS but leaves the HTML looking messy, particularly if you go on to add more classes for JavaScript use.

A much cleaner method is to separate the markup from the styling. Any grid widths can then be applied using a mixin keeping each element unique allowing for individual styling and individual targeting via media queries.

```
.news-feed,
.latest-testimonials {
   @include grid(span-4);
}
@media (max-width: 767px) {

   .news-feed {  
      @include grid(span-6);
   }
   .latest-testimonials {
      @include grid(span-12);
   }

}
```

The key benefit of this is keeping specificity low and the number of selectors down. More information on this approach to grid layouts can be found [here] (https://cathydutton.co.uk/maze-re-factored).

<h3 class="heading">Use structural classes</h3>

Keeping your layout and theme selectors separate is good practice for many reasons. In CSS terms keeping structure separate ensures the layout and theme do not become intertwined, allowing structural changes to be applied in a much quicker and simpler manor.

Keeping structural classes free of presentational properties such as borders, background, colours and padding also helps ensure that those classes can be re-used throughout a project.

<i>Example</i>

```
.sidebar {
   width: 23%;
   float: left;
   margin-right: 2%;
   background: #f3f3f3;
   border: #e3e3e3;
   padding: 10px;
}
```

By applying these presentational styles to the sidebar we restrict the design of future pages. Any additions to the project that wish to include a sidebar without a border or background would have to override the existing CSS.

```
.account-section .sidebar {
   background: transparent;
   border: 0; padding: 0;
}
```

Creating page specific CSS like this is not maintainable, particularly on large projects. Any presentational properties should be applied to the elements inside the sidebar, creating modular blocks that can be included on any page.


<h3 class="heading">Have, and stick to a naming convention</h3>

As mentioned earlier a key reason behind the use of long and specific selectors is the fear of introducing unwanted style changes.

When a team of developers are working on one project it can be difficult to have complete confidence that your selectors haven’t been used elsewhere. Having a naming convention can help remove this fear and enable elements to be targeted directly instead of through nesting.

<i>Bad Example</i>

```
#mediaGalleryHolder #mediaGallery .mediaGalleryImageHolder img {           
   border: 1px solid #e3e3e3;
   width: 100%;
}
```

<i>Good Example</i>

```
.media-gallery__image {
   width: 100%;
   border: 1px solid #e3e3e3;
}
```

Working in this way will help keep the CSS output modular and lightweight. By targeting elements individually the styling will also be applied correctly regardless of page positioning, body classes or parent selectors.

<i>Nested navigation example</i>

```
.main-nav {
   background: #0060C1;
   li {
      float: left
      a {
         padding: 10px;
         display: block;
         }
   }
}
```

<i>Individually targeted navigation</i>

```
.main-nav {
   background: #0060C1;
}
.main-nav__list-item {
   float: left
}
.main-nav__link {
   padding: 10px;
   display: block;
}
```


<h4 class="heading">Avoid DOM specific styling</h4>

Any styling relating to an elements positioning is risky, particularly in responsive websites. A very basic example of this would be the use of a ‘last-column’ class. Classes like this are often used to solve margin issues in grid layouts.

<i>HTML</i>

```
<div class="content-wrapper">
   <div class="content-block"></div>
   <div class="content-block"></div>
   <div class="content-block"></div>
   <div class="content-block last-column"></div>
</div>
```

<i>CSS</i>

```
.content-block {
   @include grid(span-3);
}
.last-column {
   margin-right: 0;
}
@media (max-width: 767px) {
   .content-block {
      @include grid(span-6);
   }
}
```

This technique will create problems at the breakpoint as the content blocks stack into two rows of two. At this point the 4th block will behave differently to the 2nd block despite both being the last column in their respective rows.

CSS3 selectors like X > Y, X ~ Y, X:nth-of-type(n) also rely on markup positioning and introduce unnecessary risk.
