const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = function (eleventyConfig) {

  //eleventyConfig.addPassthroughCopy('./src/admin');

  eleventyConfig.addPassthroughCopy("./src/medias/*.{png,jpeg,jpg,svg,webp}");
  eleventyConfig.addPassthroughCopy("./src/assets/images/**/*.{png,jpeg,jpg,svg,webp}");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts/");
  eleventyConfig.addPassthroughCopy("./src/assets/css/styles.css");

  eleventyConfig.addWatchTarget("./src/assets/images/**/*.{png,jpeg,svg}");
  eleventyConfig.addWatchTarget("./src/assets/css/**/*");


  eleventyConfig.addShortcode("image", async function(src, className, alt, sizes) {

		let metadata = await Image(src, {
      urlPath: "/medias/",
      outputDir: "./src/medias/",
			widths: ["auto"],
			formats: ["webp", "jpeg"],
      filenameFormat: function (id, src, width, format, options) {
        // id: hash of the original image
        // src: original image path
        // width: current width in px
        // format: current file format
        // options: set of options passed to the Image call
        const extension = path.extname(src);
        const name = path.basename(src, extension);

        return `${name}-${id}-${width}w.${format}`;
      }
		});

		let imageAttributes = {
      class: className,
			alt,
			sizes,
			loading: "lazy",
			decoding: "async",
		};

		// You bet we throw an error on a missing alt (alt="" works okay)
		return Image.generateHTML(metadata, imageAttributes);
    
	});

	/*eleventyConfig.addShortcode("image", async function(src, className, alt, sizes, widths) {
		let metadata = await Image(src, {
      outputDir: '/src/assets/images',
      urlPath: '/src/assets/images',
			widths: widths,
			formats: ["webp", "jpeg"]
		});

		let imageAttributes = {
      class: className,
			alt,
			sizes,
			loading: "lazy",
			decoding: "async",
		};

		// You bet we throw an error on a missing alt (alt="" works okay)
		return Image.generateHTML(metadata, imageAttributes);
	});*/


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



