const htmlmin = require("html-minifier");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const sanitizeHTML = require('sanitize-html');
const { DateTime } = require('luxon');


module.exports = function(config) {
  

  // Add a date formatter filter to Nunjucks
  config.addFilter("dateDisplay", require("./filters/dates.js") );
  config.addFilter("dateDisplayProject", require("./filters/datesProject.js") );
  config.addFilter("timestamp", require("./filters/timestamp.js") );
  config.addFilter("squash", require("./filters/squash.js") );
 
  // Plugins
  config.addPlugin(pluginRss);

  // Blog post collection
  config.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("**/posts/**.njk").reverse();
  });

  // Latest posts include
   config.addCollection("latestPosts", function(collection) {
    return collection.getFilteredByGlob("**/posts/**.njk").slice(-3).reverse();
  });

  // PostCSS plugin collection
  // config.addCollection("postcss", function(collection) {
  //   return collection.getFilteredByGlob("**/postcss/**.njk").reverse();
  // });

  // Components collection
  config.addCollection("components", function(collection) {
    return collection.getFilteredByGlob("**/components/**.njk").reverse();
  });


  // Components talks
  config.addCollection("talks", function(collection) {
    return collection.getFilteredByGlob("**/talks/**.njk").reverse();
  });

  // Filter using `Array.filter`
  config.addCollection("projects", function(collection) {
    return collection.getFilteredByGlob("**/projects/**.njk").reverse().filter(function(item) {
      // Side-step tags and do your own filtering
      return "projectTags" in item.data;
    });
  });


  // Webmentions

  config.addFilter(
    'readableDate',
    (dateObj, format = 'dd LLL yyyy') => {
      return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(format)
    }
  )

  config.addFilter('dateFromTimestamp', timestamp => {
    return DateTime.fromISO(timestamp, { zone: 'utc' }).toJSDate()
  })

  config.addFilter(
    'readableDate',
    (dateObj, format = 'dd LLL yyyy') => {
      return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(format)
    }
  )

   // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
   config.addFilter('htmlDateString', dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat('yyyy-LL-dd')
  })

  // Get the first `n` elements of a collection.
  config.addFilter('head', (array, n) => {
    if (n < 0) {
      return array.slice(n)
    }

    return array.slice(0, n)
  })

  // Webmentions Filter
  config.addFilter('webmentionsForUrl', (webmentions, url) => {
    const allowedTypes = ['mention-of', 'in-reply-to', 'like-of', 'repost-of']
    const clean = content =>
      sanitizeHTML(content, {
        allowedTags: ['b', 'i', 'em', 'strong', 'a'],
        allowedAttributes: {
          a: ['href']
        }
      })
  
    return webmentions
      .filter(entry => entry['wm-target'] === url)
      .filter(entry => allowedTypes.includes(entry['wm-property']))
      .filter(entry => !!entry.content)
      .map(entry => {
        const { html, text } = entry.content
        entry.content.value = html ? clean(html) : clean(text)
        return entry
      })

      
      
  })

  config.addFilter('webmentionsByType', (mentions, mentionType) => {
    return mentions.filter(entry => !!entry[mentionType])
  })

  config.addFilter('size', (mentions) => {
    return !mentions ? 0 : mentions.length
  })
  


  // Minify HTML output
  config.addTransform('htmlmin', function(content, outputPath) {
    if (outputPath.indexOf('.html') > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }
    return content
  })


  return {
    dir: {
      input: "src/site",
      output: "dist",
      includes: "_includes",
      // layouts: "_layouts",
      data: "_data"
    },
    templateFormats : ["njk", "md"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk"
  };
  
  

};








