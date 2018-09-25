---
title: Maze Re-factored
description: Re-factoring Maze - A PostCSS responsive grid system
date: 2015-02-07
tags: CSS, Sass, PostCSS
---

The original Maze framework was written in 2013 with the aim of removing column markup and creating a more semantic system. The grid was also developed with flexibility in mind aiming to create a basic starting point for any responsive layout. Maze was able to support any grid column size, with configurable margins and push values that could be updated from row to row. The direction in which elements stacked was also configurable. Documentation on how Maze worked can be found
<a href="/maze-responsive-grid-framework">here</a>.

Over the past year I have used Maze on numerous front end projects and have been pleased with the results. There has however been a couple of sticking points. Firstly in order for the grid mixin to work all designs/layouts must conform to the layout specified in the $grid-columns variable. Secondly the margin is applied only to the left of each element with the last child having no margin. This is fine for the desktop view but as the site responds the margins have to be reset for consistency.

<p><a href="http://cathydutton.github.io/postcss-maze/" target="_blank" title="Maze demo">View Maze demo</a></p>

<h2 class="heading"> Configurable layouts </h2>

Weather a 12, 16 or 24 column grid is used all aspects of the design need to fit. Unfortunately I have often come across designs for projects which although mostly conform to a set grid pattern have at least one element that does not.

For this reason I decided to refactor Maze to allow for a configurable $grid-columns variable that, like the margin and push values can be overridden where needed.

#### Default variables

The default variables set at the top of the grid partial create the base settings for Maze. These values are used whenever the grid mixin is called, but importantly they can all be overridden for any part of the layout.

```
/* Grid Defaults */

$total-grid-columns: 12!default;
$gutter: 2% !default;
$fold: left !default;
$push: 0 !default;
```

#### The grid mixin

The mixin calculates the width of any column span we assign, and then uses our default values for $gutter, $fold and $push&#8230;

```
@mixin grid($col-span, $fold:$fold, $push:$push, $grid-size:$total-grid-columns, $margin:$gutter) {

        float:#{$fold};
        width: (100% / ($grid-size / $col-span)) - $margin ;

        @if $push &lt; 1 {
            margin-left: ($margin/2);
            margin-right: ($margin/2);
        }

        @if $push &gt; 1 {
            margin-#{$fold}: (((100%  / $grid-size) * $push) ) + ( $margin / ( $grid-size / $push) );
        }
}
```

The $col-span variable is the value we will pass in when including the mixin, the rest or the arguments are being passed our default values from above and do not need to be added to the @include unless we are changing a value.

#### Default usage

Because most of our settings have already been set including Maze is very simple, all we have to do is add in the value for how many columns our element should span.

```
.span-three {
	@include grid(3);
}

.span-six {
	@include grid(6);
}

.span-three {
	@include grid(3);
}

```

The values above are set based on the $total-grid-columns variable which we have set to 12.

#### Setting a new layout

So what happens if we want one or our rows to have five elements of equal width? This type of layout does not conform to traditional grid layouts so we will need to override the $total-grid-columns variable for this row.

In the grid mixin we use and argument $grid-size which is set to $total-grid-columns, we can pass in a new value when we call the mixin to prevent the default use of a 12 column grid.

```
.equal-one-five {
      @include grid(1, $grid-size:5); /* Size One of Five   */
}

```

This concept can be used to create any ratio required&#8230;

```
.equal-two-five {
      @include grid(2, $grid-size:5); /* Size Two of Five */
}

.equal-three-five {
      @include grid(3, $grid-size:5); /* Size Three of Five */
}
```

Adding this option means that any column layout or ratio can now be achieved with the Maze mixin.

<h2 class="heading"> The Margin, removing last:child </h2>

The $gutter variable is used to add margin to both left and right side of each element, this removes the need to have a last:child element which differs from the rest of it&#8217;s containing row. This becomes beneficial when the design responds for keeping margins consistent.

As we now have a margin on both sides of each element, the site will no longer fill the containing div and so the max-width will be slightly narrower then the design. To resolve this the max-width needs to be larger then the desired width by the same value as the gutter percentage. As we can not add a percentage value to a px value we need to do some quick maths with th break point variables.

```
$gutter-unit:  $gutter / 1%;   /* Strips the percentage from the gutter value*/

$wrapper-gutter-percentage: ($break-wide / 100)  * $gutter-unit;   /* Work out 1% of the largest breakpoint */

$max-width: $break-wide + $wrapper-gutter-percentage; /* Add gutter value to $max-width so that each row is equal to $break-wide */

$min-width: $break-mobile - 20px; /* Set min width with scroll bar */
</pre>

This ensures that whatever value is assigned to $break-wide will be the max width of the website, regardless of the margins set on the inner elements.

#### Breakpoints

The variables for each breakpoint are also set at the beginning of the grid partial&#8230;

<pre class="wp-code-highlight prettyprint">/* Breakpoints */

$break-wide: 1180px;
$break-desktop: 990px;
$break-tablet: 767px;
$break-mobile: 320px;
```

These can be edited, added too or taken away and are used in the break mixin&#8230;

```
@mixin break($media, $col-span, $grid-size:$total-grid-columns) {

	@if $media == desktop {

		@media only screen and (max-width:$break-tablet) {
			width: (((100%  / $grid-size) * $col-span) - $gutter ) ;
			margin: $gutter / 2;
		}
	}

	@else if $media == tablet {

		@media only screen and (max-width:$break-tablet) {
			width: (((100%  / $grid-size) * $col-span) - $gutter ) ;
			margin: $gutter / 2;
		}
	}

	@else if $media == mobile {

		@media only screen and (max-width:$break-mobile) {
			width: (((100%  / $grid-size) * $col-span) - $gutter ) ;
			margin: $gutter / 2;
		}
	}

}
```

This mixin is called in the same way as the grid mixin to set the column spans as the site responds&#8230;

```
.span-three {
	@include grid(3);
        @include break(tablet, 12);
}

.span-six {
	@include grid(6);
        @include break(tablet, 6);
}

.span-three {
	@include grid(3);
        @include break(tablet, 6);
}

```

#### Gutter percentages

```
.margin-four {
       @include grid(4, $margin:5%) - Override margin value
}
```

#### Push values

```
.push-two {
       @include grid(2, $push:2); - - Add two column spans to the margin
}
```

#### Fold direction

```
right-fold {
        @include grid(3, $fold:"right"); - Columns will collapse from the left
}
```

<p><a href="http://cathydutton.github.io/postcss-maze/" target="_blank" title="Maze demo">View Maze demo</a></p>
