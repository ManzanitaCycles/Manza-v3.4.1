const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");

module.exports = 
function(eleventyConfig) {
    // Allow PNG to pass through to public folder
    eleventyConfig.addPassthroughCopy({"./src/favicon": "/" });
    // Minify CSS
    eleventyConfig.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
      });
    // Compress HTML
    eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
        if (outputPath.endsWith(".html")) {
          return htmlmin.minify(content, {
            collapseWhitespace: true,
            removeComments: true,  
            useShortDoctype: true,
            minifyCSS: true,
            minifyJS: true
          });
        }
    
        return content;
      });
    // Post image shortcode
    eleventyConfig.addShortcode("img", function(src, alt, myClass) {
        return `<img class="${myClass}" data-blink-uuid="${src}" alt="${alt}" width="2496" height="1664">`;
    });
    // Post icon shortcode
    eleventyConfig.addShortcode("icon", function(src, alt) {
        return `<img data-blink-uuid="${src}" alt="${alt}" width="100" height="100">`;
    });
    // Testimonial shortcode
    eleventyConfig.addShortcode("quote", function(src, alt, quote, name, myClass) {
        return `<figure class="stack quote ${myClass}">
            <img data-blink-uuid="${src}" alt="${alt}" width="800" height="800">
            <blockquote><q>${quote}</q></blockquote>
            <figcaption>${name}</figcaption>`
    });
    // Set default folders
    return {
        passthroughFileCopy: true,
        dir: {
            input: "src",
            output: "public"
        }
    };
}
