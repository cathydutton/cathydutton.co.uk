---
title: Optimise your CSS by taking better care of your HTML
description: Semantic HTML for cleaner CSS
date: 2015-01-09
---

This post looks at the role HTML can play in producing more optimised CSS. When discussing issues with CSS bloat, specificity and selector limits, focus is often drawn to the misuse of Sass. It’s true that refactoring your Sass can go a long way however paying attention to your website markup can be just as effective.

Going back to basics and creating meaningful class names could dramatically improve your website performance. Naming classes effectively can aid modular CSS coding and will therefore reduce CSS bloat and help control the number of selectors used (Necessary for large sites due to the IE selector limit).

<h2 class="heading"> Make better use of classes </h2>

The best way to reduce selectors is to target tags individually rather then using the DOM structure as a guide. Take the following navigation example&#8230;

```
<nav class="navigation-main">;
  <ul>  
    <li class="navigation-main-list"><a href="" class="navigation-main-link">Home</a></li>
    <li class="navigation-main-list"><a href="" class="navigation-main-link">About</a></li>
    <li class="navigation-main-list"><a href="" class="navigation-main-link">Blog</a></li>
    <li class="navigation-main-list"><a href="" class="navigation-main-link">Contact</a></li>
  </ul>
</nav>
```

**Bad example&#8230;**

```
nav {
	width: 100%;
}


nav ul li {
        list-style-type: none;
	float: left;
}

nav ul li a {
	display: block;
   	width: 120px;
   	padding:10px;
   	text-align: center;
   	background: green;
   	color: white;
   	text-decoration: none;
}

nav ul li a:hover {
	background: grey;
	text-decoration: underline;
}

```

**Good example&#8230;**

```
.navigation-main {
	width: 100%;
}

.navigation-main-list {
	float: left;
  list-style:none;
}

.navigation-main-link {
	display: block;
   	width: 120px;
   	padding:10px;
   	text-align: center;
   	background: green;
   	color: white;
   	text-decoration: none;
}

.navigation-main-link:hover {
	background: grey;
	text-decoration: underline;
}

```

In the second example the styles are not effected by the HTML structure making the code a little more future proof. We have also avoided using generic element selectors like nav, ul or li reducing the risk of effecting other areas of the website unintentionally. Most importantly though the second example uses significantly less selectors and will load faster as a result.

<h2 class="heading"> Keep your classes semantic </h2>

Markup should also be free of specific style or grid related class names such as .eight-columns or .grid-6, classes like these have become commonplace in responsive grids and frameworks but become meaningless at smaller breakpoints&#8230;.

```
@media (max-width: 480px) {
  .eight-columns {
     width: 100%;
  }
}
```

A major issue with this markup is that it restricts how a layout adapts to different screen sizes. Any element with the class .eight-columns will be forced to take on the same styles as the site responds. For example in the layout below there are two rows each with three blocks. As the class names will all be .four-columns there is no way to differ the behaviour of each row at tablet or mobile size.

In the demo both rows will adapt from thirds to full width at mobile size&#8230;

<div class="container">
  <div class="four-columns">
    Logo
  </div>

  <div class="four-columns">
    Search Bar
  </div>

  <div class="four-columns">
    Social Icons
  </div>
</div>

<div class="container">
  <div class="four-columns">
    Box 1
  </div>

  <div class="four-columns">
    Box 2
  </div>

  <div class="four-columns">
    Box 3
  </div>
</div>

<h3 class="heading"> Why is this bad for CSS? </h3>

Lets say we wanted to change how the two rows above respond at the mobile breakpoint we would need to target them separately using parent selectors&#8230;

```
@media (max-width: 480px) {
  .header .eight-columns {
     width: 100%;
  }
}
```

This introduces extra selectors and also creates DOM reliant styling making it difficult to re-use across the site.

A better solution would be to use class names relevant to the content for example .news-feed, .social-links or .main-cta and include the grid CSS from a mixin. Doing so has many benefits including&#8230;

<ul class="list">
  <li>
    - Layout changes can be made in the CSS only.
  </li>
  <li>
    - Every row can respond individually.
  </li>
  <li>
    - Media queries are more logical.
  </li>
  <li>
    - Less selectors are used.
  </li>
  <li>
    - Code is easier to re-use.
  </li>
</ul>

```
.logo,
.search,
.social  {
  @include grid(span-3);
}

@media (max-width: 480px) {
  .logo,
  .search,
  .social {
    @include grid(span-12);
  }
}
```

The example below uses the CSS above to allow the two rows to respond differently at the mobile breakpoint.

<div class="container">
  <div class="demo-logo">
    Logo
  </div>

  <div class="demo-search">
    Search Bar
  </div>

  <div class="demo-social">
    Social Icons
  </div></p>
</div>

<div class="container">
  <div class="demo-one">
    Box 1
  </div>

  <div class="demo-two">
    Box 2
  </div>

  <div class="demo-three">
    Box 3
  </div></p>
</div>

<h3 class="heading"> Don&#8217;t be to unique </h3>

Being too content unique with your class names can however be equally damaging. In order to successfully minimise your CSS a modular approach is needed, creating re-usable blocks of code will keep file size and selectors down as well as being easier to maintain.

Naming every element uniquely will create repetitive CSS&#8230;

```
.primary-button {
 display:block;
 color:$white;
 background: $orange;
 font-size:14px;
 text-align:center;
 padding: 10px;
 width:150px;     
}

.secondary-button {
 display:block;
 color:$white;
 background: $blue;
 font-size:14px;
 text-align:center;
 padding: 10px;
 width:120px;  
}
```

One solution to this is would be to use @extend to copy styles, however if overused @extend can create long, messy selectors creating more issues then it solves&#8230;

```
%btn {
 display:block;
 color:$white;
 font-size:14px;
 text-align:center;
 padding: 10px;
}

.primary-button {
 @extend %btn;
 background: $orange;
 width:150px;     
}

.secondary-button {
 @extend %btn;
 background: $blue;
 width:120px;  
}
```

The CSS output here will be&#8230;

```
.primary-button,
.secondary-button  {
 display:block;
 color:$white;
 font-size:14px;
 text-align:center;
 padding: 10px;
}

.primary-button {
 background: $orange;
 width:150px;     
}

.secondary-button {
 background: $blue;
 width:120px;  
}
```

<h3 class="heading"> A better way </h3>

Using a Base Class and a Modifier Class in your markup is a much cleaner way to re-use styles, reduce selectors and keep file size down&#8230;

<pre class="wp-code-highlight prettyprint">&lt;a class="button primary-button"&gt;&lt;/a&gt;
&lt;a class="button secondary-button"&gt;&lt;/a&gt;
</pre>

```
.button {
 display:block;
 color:$white;
 font-size:14px;
 text-align:center;
 padding: 10px;
}

.primary-button {
 background: $orange;
 width:150px;     
}

.secondary-button {
 background: $blue;
 width:120px;  
}
```

In this example styles from the base class are re-used without creating long selectors. Styles can also be easily adapted using the modifier class without the need to use !important or to add specificity with a parent selector.
