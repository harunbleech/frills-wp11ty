'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var print = require('gulp-print').default;

var _pathApp = './src/assets/scripts-gulp/app/js/';
var _pathPublic = './src/assets/scripts-gulp/';
var _pathTemp = './src/assets/scripts-gulp/_temp/';
var _pathDist = './src/assets/scripts/';

// MAIN
function _mainJS() {
  return gulp.src([
    _pathPublic +'Components/ScrollItem__SliderTeam.js',
    _pathPublic +'Components/ScrollItem__Intro.js',
    _pathPublic +'Components/ScrollItem__IntroVideo.js',
    _pathPublic +'Components/ScrollItem__Image3D.js',
    _pathPublic +'Components/ScrollItem__BlockquoteEstrobo.js',
    _pathPublic +'Components/ScrollItem__BlockquoteImages.js',
    _pathPublic +'Components/ScrollItem__SliderVideo.js',
    _pathPublic +'Components/ScrollItem__Services.js',
    _pathPublic +'Components/ScrollItem__Footer.js',
    _pathPublic +'Components/ScrollbarTimer.js',
    _pathPublic +'Layout/Wrap.js',
    _pathPublic +'Layout/Preloader.js',
    _pathPublic +'Layout/Cookies.js',
    _pathPublic +'Layout/Loading.js',
    _pathPublic +'Layout/Sidemenu.js',
    _pathPublic +'Windows/Message.js',
    _pathPublic +'Shaders/vertex/VertexBasic.js',
    _pathPublic +'Shaders/vertex/VertexBullet.js',
    _pathPublic +'Shaders/fragment/FragmentRepeatColumns.js',
    _pathPublic +'Shaders/fragment/FragmentScale.js',
    _pathPublic +'Canvas/Geometry.js',
    _pathPublic +'Canvas/Material.js',
    _pathPublic +'Canvas/Image3D.js',
    _pathPublic +'Canvas/ThreeStage.js',
    _pathPublic +'Pages/Default.js',
    _pathPublic +'main.js',
  ])
    .pipe(babel({
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-proposal-class-properties']
    }))
    .pipe(concat('main.min.js', {newLine: ';'}))
    .pipe(uglify(
      {compress: {drop_console: false}}
    ))
    //.pipe(gzip({ append: false }))
    .pipe(gulp.dest(_pathTemp));
}

// LIBS
function _libsPreload() {
  return gulp.src([
    _pathApp +'cuchillo/Core/Core.js',
    _pathApp +'cuchillo/Core/Basics.js',
    _pathApp +'cuchillo/Core/Colors.js',
    _pathApp +'cuchillo/Core/Ease.js',
    _pathApp +'cuchillo/Core/Paths.js',
    _pathApp +'cuchillo/Core/Metrics.js',
    _pathApp +'cuchillo/Core/Analytics.js',
    _pathApp +'cuchillo/Core/Engine.js',
    _pathApp +'cuchillo/Core/Engine.js',
    _pathApp +'cuchillo/Core/Interaction.js',
    _pathApp +'cuchillo/Element/Get.js',
    _pathApp +'cuchillo/Element/Index.js',
    _pathApp +'cuchillo/Element/Select.js',
    _pathApp +'cuchillo/Element/Remove.js',
    _pathApp +'cuchillo/Utils/Functions.js',
    _pathApp +'cuchillo/Utils/Utils3D.js',
    _pathApp +'cuchillo/Utils/Cookie.js',
    _pathApp +'cuchillo/Utils/Maths.js',
    _pathApp +'cuchillo/Utils/CSS.js',
    _pathApp +'cuchillo/Utils/Accessibility.js',
    _pathApp +'cuchillo/Utils/CuchilloWorker.js',
    _pathApp +'cuchillo/Utils/Keyboard.js',
    _pathApp +'cuchillo/Utils/Statics.js',
    _pathApp +'cuchillo/Forms/FormValidator.js',
    _pathApp +'cuchillo/Forms/FormSender.js',
    _pathApp +'cuchillo/Event/EventDispatcher.js',
    _pathApp +'cuchillo/Scroll/Scroll.js',
    _pathApp +'cuchillo/Scroll/Scrollbar.js',
    _pathApp +'cuchillo/Scroll/MrScroll.js',
    _pathApp +'cuchillo/Scroll/VScroll.js',
    _pathApp +'cuchillo/Scroll/VScroll_Item.js',
    _pathApp +'cuchillo/Scroll/WheelControls.js',
    _pathApp +'cuchillo/Components/Slider.js',
    _pathApp +'cuchillo/Components/Carrusel.js',
    _pathApp +'cuchillo/Components/Acordions.js',
    _pathApp +'cuchillo/Components/Girarotutto.js',
    _pathApp +'cuchillo/Components/SliderScroll.js',
    _pathApp +'cuchillo/Layout/Wrap.js',
    _pathApp +'cuchillo/Layout/Sidemenu.js',
    _pathApp +'cuchillo/Layout/Preloader.js',
    _pathApp +'cuchillo/Layout/Cookies.js',
    _pathApp +'cuchillo/Windows/ControllerWindow.js',
    _pathApp +'cuchillo/Windows/Window.js',
    _pathApp +'cuchillo/Layout/Interface.js',
    _pathApp +'cuchillo/Layout/Cursor/Cursor.js',
    _pathApp +'cuchillo/Layout/Cursor/CursorTypes.js',
    _pathApp +'cuchillo/Layout/Cursor/Cursor__Item.js',
    _pathApp +'cuchillo/Layout/Cursor/Cursor__Dot.js',
    _pathApp +'cuchillo/Layout/Cursor/Cursor__DotComplex.js',
    _pathApp +'cuchillo/Layout/Cursor/Cursor__Icon.js',
    _pathApp +'cuchillo/Layout/Cursor/Cursor__Drag.js',
    _pathApp +'cuchillo/Layout/Cursor/Cursor__Text.js',
    _pathApp +'cuchillo/Layout/Cursor/Cursor__Loading.js',
    _pathApp +'cuchillo/Layout/Loading.js',
    _pathApp +'cuchillo/Loaders/LoaderController.js',
    _pathApp +'cuchillo/Loaders/CustomLoader.js',
    _pathApp +'cuchillo/Loaders/MediaLoader.js',
    _pathApp +'cuchillo/Loaders/LazyLoader.js',
    _pathApp +'cuchillo/Loaders/PagesLoader.js',
    _pathApp +'cuchillo/Loaders/FontLoader.js',
    _pathApp +'cuchillo/Display/MediaObject.js',
    _pathApp +'cuchillo/Display/ImageObject.js',
    _pathApp +'cuchillo/Display/BGObject.js',
    _pathApp +'cuchillo/Display/VideoObject.js',
    _pathApp +'cuchillo/Display/Display.js',
    _pathApp +'cuchillo/Pages/ControllerPage.js',
    _pathApp +'cuchillo/Pages/Page.js',
  ])
    .pipe(babel({
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-proposal-class-properties']
    }))
    .pipe(concat('libs-preload.js', {newLine: ';'}))
    .pipe(gulp.dest(_pathTemp));
}
function _libs() {
  return gulp
    .src([
        _pathApp +'threeJS/three.js',
        _pathApp +'threeJS/js/loaders/OBJLoader.js',
        _pathApp +'threeJS/js/loaders/RGBELoader.js',
        _pathApp +'threeJS/js/loaders/HDRCubeTextureLoader.js',
        _pathApp +'threeJS/js/postprocessing/EffectComposer.js',
        _pathApp +'threeJS/js/postprocessing/RenderPass.js',
        _pathApp +'threeJS/js/controls/DeviceOrientationControls.js',
        _pathApp +'threeJS/js/postprocessing/MaskPass.js',
        _pathApp +'threeJS/js/postprocessing/ShaderPass.js',
        _pathApp +'threeJS/js/shaders/CopyShader.js',
        _pathApp +'threeJS/js/controls/OrbitControls.js',
        _pathApp +'gsap/gsap.min.js',
        _pathApp +'gsap/SplitText.min.js',
        _pathApp +'gsap/DrawSVGPlugin.min.js',
        _pathApp +'gsap/EasePack.min.js',
        _pathApp +'gsap/ScrollToPlugin.min.js',
        _pathApp +'gsap/CustomEase.min.js',
        _pathApp +'utils/VirtualScroll.js',
        _pathApp +'utils/stats.min.js'
  ])
    .pipe(concat('libs.js', {newLine: ';'}))
    .pipe(uglify(
      {compress: {drop_console: false}}
    ))
    .pipe(gulp.dest(_pathTemp));
}

function _productionJS() {
  return gulp.src([
     _pathTemp +'libs.js',
     _pathTemp +'main.min.js'
  ])
    .pipe(concat('main.js', {newLine: ';'}))
    .pipe(uglify())
    .pipe(gulp.dest(_pathDist));
}

function _minifyPreload() {
  return gulp.src([
    _pathPublic +'preload.js'
  ])
  .pipe(babel({
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties']
  }))
    .pipe(concat('preload.min.js', {newLine: ';'}))
    .pipe(uglify())
    .pipe(gulp.dest(_pathTemp));
}

function _productionPreload() {
  return gulp.src([
      _pathTemp +'libs-preload.js',
      _pathTemp +'preload.min.js'
  ])
    .pipe(concat('preload.js', {newLine: ';'}))
    .pipe(uglify())
    .pipe(gulp.dest(_pathDist));
}

exports.libs = _libs;
exports.libs_preload = _libsPreload;
exports.main = _mainJS;
exports.production_js = _productionJS;

exports.production = gulp.series(
  _minifyPreload,
  _mainJS,
  gulp.parallel(
    _productionJS,
    _productionPreload
  )
);



