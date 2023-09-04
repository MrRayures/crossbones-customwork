module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets/images/**/*.{png,jpeg,jpg,svg}");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts/");
  eleventyConfig.addPassthroughCopy("./src/assets/css/styles.css");

  eleventyConfig.addWatchTarget("./src/assets/images/**/*.{png,jpeg,svg}");
  eleventyConfig.addWatchTarget("./src/assets/css/**/*");
  
  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: "src",
      output: "dist",
    },
  };
};

