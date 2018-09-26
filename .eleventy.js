module.exports = function(config) {

  // Add a date formatter filter to Nunjucks
  config.addFilter("dateDisplay", require("./filters/dates.js") );
  config.addFilter("timestamp", require("./filters/timestamp.js") );
  config.addFilter("squash", require("./filters/squash.js") );

  // Blog post collection
  config.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("**/posts/**.md").reverse();
  });

  // Latest posts include
   config.addCollection("latestPosts", function(collection) {
    return collection.getFilteredByGlob("**/posts/**.md").slice(-3).reverse();
  });

  // PostCSS plugin collection
  config.addCollection("PostCSS", function(collection) {
    return collection.getFilteredByGlob("**/PostCSS/**.md");
  });

  // Portfolio collection
  config.addCollection("portfolio", function(collection) {
    return collection.getFilteredByGlob("**/portfolio/**.md");
  });

  return {
    dir: {
      input: "src/site",
      output: "dist",
      includes: "_includes",
      data: "_data"
    },
    templateFormats : ["njk", "md"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk"
  };


    // // Add post collection
    // config.addCollection('posts', collection => {
    //   return collection.getFilteredByGlob('**/posts/*.md').reverse()
    // })

    // // Add latest post collection
    // config.addCollection('latestPosts', collection => {
    //   return collection
    //     .getFilteredByGlob('**/posts/*.md')
    //     .slice(-5)
    //     .reverse()
    // })

 



};








