var paths = {};

// Patterns files
paths.htmlPattern       = './*.html';
paths.mdPattern         = './**/*.+(md|MD|markdown|MARKDOWN)';
paths.stylusPattern     = './_assets/stylus/**/*.styl';
paths.imgPattern        = './_assets/img/**/*.{JPG,jpg,png,gif,svg}';
paths.scriptsPattern    = './_assets/js/**/*.js';

// Assets Files
paths.stylusAppFile     = './_assets/stylus/app.styl';
paths.cssAppFile        = './_assets/app.css';
paths.jsAppFile         = './_assets/app.js';
paths.jsMoVendorsFiles  = './_assets/js/vendors/*.js';
paths.jsModulesFiles    = './_assets/js/modules/*.js';

// Assets Directories
paths.assetsDir         = './_assets/';
paths.stylusDir         = './_assets/stylus/';
paths.jsDir             = './_assets/js/';
paths.imgDir            = './_assets/img/';
paths.jsVendorsDir      = './_assets/js/vendors/';
paths.jsModulesDir      = './_assets/js/modules/';

// Jekyll Directories
paths.jekyllCssDir      = './assets/css/';
paths.jekyllImgDir      = './assets/img/';
paths.jekyllJsDir       = './assets/js/';
paths.jekyllIncludesDir = './_includes/';
paths.jekylllayoutsDir  = './_layouts/';
paths.jekyllPostsDir    = './_posts/';

// Jekyll _site Directory
paths.siteDir           = './_site/';
paths.siteAssetsDir     = './_site/assets/';
paths.siteCssDir        = './_site/assets/css/';
paths.siteImgDir        = './_site/assets/img/';
paths.siteJsDir         = './_site/assets/js/';

// Jekyll Files
paths.jekyllCongif      = './_config.yml'
paths.jekyllPages       = './*.html';
paths.jekyllIncludes    = './_includes/*.html';
paths.jekyllLayouts     = './_layouts/*.html';
paths.jekyllPosts       = './_posts/*.+(md|MD|markdown|MARKDOWN)';

module.exports = paths;