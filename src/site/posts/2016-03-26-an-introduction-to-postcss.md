---
title: Getting started with PostCSS
description: How to get started with PostCSS
date: 2016-03-26
tags: [CSS]
---



Before diving straight into PostCSS it is first necessary to look at CSS processing in general. Processors like Less, Sass and Stylus allow you to start re-using CSS properties and patterns, keeping stylesheets DRY and easier to maintain. Each preprocessor has a slightly different syntax but all support the original vanilla CSS syntax as well.

#### Benefits of Pre Processors

*   Fewer HTTP requests with the use of @import
*   Re-usable properties with variables
*   modular code blocks
*   Re-usable patterns with mixins
*   Scalable projects
*   Maintainable code

## So why stop now?

Despite the advantages listed above, numerous disadvantages have emerged from the mis-use of Pre processors. Each language comes with numerous features (Extends, Functions, Mixins, Variables, Nesting) some more harmful then others. In each case it is not possible to restrict usage of an offending feature, making codebases harder to maintain and keep clean.

#### Disadvantages of Pre Processors

*   Bloated stylesheets
*   Overly specific selectors created from excessive nesting
*   Confusing or overly complicated mixins and functions
*   Excessive config

## What is PostCSS?

PostCSS makes it possible to transform and extend the features of CSS using JavaScript plugins. Each plugin is installed individually allowing teams to create there own processors with the exact features they need and nothing more. This allows developers to take much greater control over the features used and as a result the output CSS.

#### Syntax sugar

PostCSS has plugins available to replicate all of the features developers have become accustomed to with pre processors. Variables, Mixins, Functions, Extends and even Nesting can be accomplished with existing plugins...

*   postcss-mixins - Enables mixins more powerful than Sass.
*   postcss-nested - Unwraps nested rules.
*   postcss-simple-extend - Lightweight extending of silent classes, like Sass' @extend.
*   postcss-simple-vars - Support for Sass-style variables.
*   postcss-nested-vars - Supports nested Sass-style variables.
*   postcss-precss - Plugin pack that allows you to use Sass-like CSS.

#### Maintainable CSS

PostCSS offers more then just the syntax changes associated with Sass, Less and Stylus. With PostCSS you can also extend the functionality of CSS and begin to tackle some of the languages shortcomings.

<blockquote>
“…the single hardest problem in CSS: Getting your rules to match the elements you want, without them accidentally
matching the elements you don’t.”
<i>Philip Walton, Engineer at Google</i>
</blockquote>

Quotes like the one above accurately sum up the struggles all developers have had with CSS inheritance, scope and specificity, with PostCSS these issues and more can be resolved. There are also plugins to help with readability, linting and implementing the latest CSS properties safely.

*   postcss-use - Enable PostCSS plugins directly in your stylesheet.
*   postcss-modules - Allows to use CSS Modules everywhere.
*   postcss-autoreset - Automatically adds reset styles.
*   postcss-cssnext - Plugin pack that allows you to use future CSS features today.
*   cq-prolyfill - Adds support for CSS container queries (aka element query) like `:container(width > 100px)`.


#### Customisable

Because PostCSS uses Javascript to transform CSS, it is much more accessible for front end developers to create their own plugins. Projects can therefore be customised to create the optimum workflow with no limitations or boundaries set by language choices.

Plugins can be created for any CSS task large or small, a collection of current plugins can be found
[here](http://postcss.parts/). More information will be provided on how to create a plugin later in this article

## Why use PostCSS?

PostCSS has many benefits when compared to other CSS processors, including speed, performance, adaptability and innovation. Perhaps its biggest advantage though is that it is not attempting to compete with these languages and can instead be used alongside them.

To begin using PostCSS you do not have to abandon your current front end set up and can continue to use the Functions, Mixins and Variables you already have, whatever language they are in. This allows the more forward thinking PostCSS plugins to be added to legacy projects, not just new builds.

#### Benefits

*   Use tomorrow’s CSS syntax, today.
*   Easy to contribute to in the form of custom plugins.
*   More control over the features used.
*   Faster compile times.


## Getting started

Another plus point for PostCSS is the ease with which it can be integrated into your current workflow. PostCSS has a JavaScript API and integrates seamlessly with task runners like Gulp, Grunt and webpack.

#### JS API

```
var postcss = require('postcss');
postcss([ require('autoprefixer'), require('cssnano') ])
    .process(css, { from: 'src/app.css', to: 'app.css' })
    .then(function (result) {
        fs.writeFileSync('app.css', result.css);
        if ( result.map ) fs.writeFileSync('app.css.map', result.map);
    });
```

#### Gulp

```
gulp.task('css', function () {
    var postcss    = require('gulp-postcss');
    var sourcemaps = require('gulp-sourcemaps');

    return gulp.src('src/**/*.css')
        .pipe( sourcemaps.init() )
        .pipe( postcss([ require('autoprefixer'), require('precss') ]) )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest('build/') );
});
```

PostCSS also has a command line interface available for those who don't wish to use a task runner. By installing postcss-cli CSS can be compiled with the following command...

```
postcss -c config.json -o result.css input.css
```


## Demo

To demonstrate how PostCSS works we will look at the simple PostCSS Clearfix plugin. The plugin adds fix and fix-legacy values to the clear property. With the plugin installed you can set the clear property to fix or fix-legacy depending on your level of browser support.

```
.foo {
  clear: fix; /* IE8+ */
}

.bar {
  clear: fix-legacy; /* IE6+ */
}
```
The CSS above would compile to...


```
.foo:after{
  content: '';
  display: block;
  clear: both;
}

.bar:before,
.bar:after {
  content: '';
  display: table;
}
.bar:after {
  clear: both;
}
.bar {
  zoom: 1;
}
```

The plugin iterates through each declaration in the input CSS file matching values of fix of fix-legacy. In the output CSS these declarations are removed and replaced with the relevant CSS.
