---
title: 7 reasons to start using PostCSS today
description: 7 reasons to jump into PostCSS today
date: 2016-02-23
tags: [CSS]
---

PostCSS makes it possible to transform or extend syntaxes and features of CSS. Nothing groundbreaking there then, but unlike existing pre-processors PostCSS aims to improve the usability of CSS by solving long standing issues with CSS at scale such as global scope and inheritance.

PostCSS is not an all or nothing tool, plugins can be added to what is an otherwise clean slate allowing developers to take much greater control over the features used and the resulting CSS.

Below are just a few of the reasons to start using PostCSS today...

### 1) Simple set up

Adding PostCSS to your workflow is probably a lot easier then you think, particularly if you are already using a task runner and/or pre-processor. PostCSS is written in JavaScript and integrates seamlessly with task runners like Gulp and Grunt.

```
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('css', function () {
	var processors = [
  autoprefixer,
];
  return gulp.src('./src/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dest'));
});
```

There is also a CLI version of PostCSS for those who don't wish to use a task runner. By installing postcss-cli CSS can be compiled with the following command...

```
postcss -c config.json -o result.css input.css
```

Compile tools like Prepros also offer support for some of PostCSS's most popular plugins. Interfaces like this however would not be suitable for custom plugins.

Further reading on installation can be found on the PostCSS [Github page](https://github.com/postcss/postcss)

### 2) Integration with current pre-processors

You probably already have a workflow set up that you're happy with, whether your using Sass, Less or any other CSS tool, to stop and migrate to a new processor would be time consuming.

The good news is you don’t have to abandon you're current set up, or all the functions and Mixins you have already written. PostCSS can be added to your build process alongside a pre-prosesor not just instead of one.

This allows for a much simpler transition without the need to make wholesale changes to a codebase. Existing functionality can be migrated to PostCSS over time, if at all.

### 3) Take only what you need

As most developers have now found out some of the functions available in pre-processors can have a negative impact on CSS performance.

Unlike existing pre processors such as Sass, Less and Stylus with PostCSS you have full control over which features are enabled. This unique approach gives developers full control over the codebase and limits the potential for creating bloated or badly written CSS.

This is hugely beneficial when it comes to maintaining large projects and safeguarding the output CSS code.

### 4) Accessibility helpers

We are all guilty of missing the occasional focus selector here and there, or of putting of repetitive CSS tasks in favor of the more creative ones. Fortunately there are PostCSS plugins that can take care of repetitive tasks and accessibility checks like this for us.

[postcss-focus](https://github.com/postcss/postcss-focus) checks the CSS for instances of :hover and automatically adds the :focus selector alongside.

[postcss-colorblind](https://github.com/btholt/postcss-colorblind) will check all instances of colour in your stylesheet and then highlight potential issues for users with any of the following conditions...

*   protanomaly
*   protanopia
*   deuteranomaly
*   deuteranopia
*   tritanomaly
*   tritanopia
*   achromatomaly
*   achromatopsia

### 5) The Future, today

PostCSS is a forward thinking tool. Plugins like [cssnext](http://cssnext.io/) allow developers to use the latest CSS syntax and features straight away without compatibility issues. Fallbacks for older browsers are added automatically by the plugin.

Aside from the syntax plugins, browser prefixes and polyfills PostCSS also provides opportunities to improve the way we use CSS and attempt to fix some fundamental flaws in the CSS language. A few popular plugins are listed below...

*   [postcss-modules](https://github.com/css-modules/postcss-modules-scope) - Isolates selectors in components, creating local scope in CSS.

*   [cq-prolyfill](https://github.com/ausi/cq-prolyfill) - Adds component queries to allow elements to be styled based on their dimensions instead of the viewport dimensions.

*   [postcss-autoreset](https://www.npmjs.com/package/postcss-autoreset) - Uses local resets instead of global one.

With plugins like these concepts like element queries and localised CSS become a reality. This opens up the  possibility to create stand alone web components in line with design components. Each component can be added without the need for complex naming conventions to prevent unwanted inheritance.

### 6) Get creative

If you have a specific need or requirement that is not currently being catered for you can always build your own PostCSS plugin. Built in JavaScript PostCSS is an accessible tool for Front End Developers easy to contribute to in the form of custom plugins.

Each project can be custolmised to create the optimum workflow with no limitations or boundaries set by language choices. There is plenty of helpful documentation to get you started with this...

*   [PostCSS API](https://github.com/postcss/postcss/blob/master/docs/api.md)
*   [PostCSS plugin boilerplate](https://github.com/postcss/postcss-plugin-boilerplate)

### 7) Performance

Because PostCSS is built in Javascript it runs much faster then Sass and less, especially if you're yet to upgrade to libsass. As well as improvements in compile times PostCSS also has plugins to help you write more performant CSS.

[CSS MQPacker](https://github.com/hail2u/node-css-mqpacker) combines CSS media queries to reduce code and optimise the CSS.

[postcss-zindex](https://github.com/ben-eb/postcss-zindex) reduces z-index values throughout a stylesheet without effecting the layouts intended order.

[cssnano](https://github.com/ben-eb/cssnano) is more like an umbrella plugin and includes a selection of optimisation tools including...

*   Comment removal
*   Stripping whitespace
*   Minify selectors
*   Remove duplicate rules

### Summing up

In summery PostCSS is more performant, less risky and easier to develop, customise and extend. Above all to start using PostCSS today you do not need to abandon your current code base or pre-processor. Starting small and adding just one or two plugins to an existing site will still have measurable benefits. PostCSS will work alongside any mixins, functions and variables already in place and open up new possibilities.

### Further reading

*   [PostCSS](https://github.com/postcss/postcss)
*   [It's Time for Everyone to Learn About PostCSS](http://davidtheclark.com/its-time-for-everyone-to-learn-about-postcss/)
*   [How to Build Your Own CSS Preprocessor With PostCSS](http://www.sitepoint.com/build-css-preprocessor-postcss/)
*   [Breaking up with Sass](https://benfrain.com/breaking-up-with-sass-postcss/)
*   [PostCSS CLI](https://www.npmjs.com/package/postcss-cli)
