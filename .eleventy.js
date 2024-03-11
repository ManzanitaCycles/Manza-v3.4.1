const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");

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
        return `<figure class="card ${myClass}">
            <img data-blink-uuid="${src}" alt="${alt}" width="800" height="800">
            <figcaption>
                <svg width="1em" height="1em" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(3.32313,0,0,3.32313,-42.2424,-22.1541)">
                        <path fill="var(--lightish)" d="M18.466,21.412L18.466,15.958L15.567,15.958C15.567,15.402 15.608,14.837 15.69,14.263C15.772,13.69 15.928,13.174 16.157,12.716C16.386,12.257 16.681,11.889 17.041,11.61C17.401,11.332 17.86,11.193 18.417,11.193L18.417,8.736C17.5,8.736 16.697,8.933 16.009,9.326C15.322,9.719 14.757,10.243 14.314,10.898C13.872,11.553 13.545,12.315 13.332,13.182C13.119,14.05 13.013,14.976 13.013,15.958L13.013,21.412L18.466,21.412ZM27.457,21.412L27.457,15.958L24.558,15.958C24.558,15.402 24.599,14.837 24.681,14.263C24.763,13.69 24.918,13.174 25.148,12.716C25.377,12.257 25.672,11.889 26.032,11.61C26.392,11.332 26.851,11.193 27.408,11.193L27.408,8.736C26.491,8.736 25.688,8.933 25,9.326C24.312,9.719 23.747,10.243 23.305,10.898C22.863,11.553 22.536,12.315 22.323,13.182C22.11,14.05 22.003,14.976 22.003,15.958L22.003,21.412L27.457,21.412Z"/>
                    </g>
                </svg>
                <p><em>${quote}</em></p>
                <p><strong><small>${name}</small></strong></p>
            </figcaption>`
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
