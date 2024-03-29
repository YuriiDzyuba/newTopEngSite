const {src, dest, series, watch, parallel} = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()
const cssGroup = require('gulp-group-css-media-queries')
const uglifyEs = require('gulp-uglify-es').default
const rename = require("gulp-rename")
const babel = require('gulp-babel');
const imageMin = require('gulp-imagemin');
const webp = require('gulp-webp');
const webpHTML = require('gulp-webp-html');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fs = require('fs');


let projectFolder = "dist",
    sourceFolder = "src";

let path = {
    build: {
        html: projectFolder + "/",
        css: projectFolder + "/css/",
        js: projectFolder + "/js/",
        img: projectFolder + "/imd/",
        fonts: projectFolder + "/fonts/"
    },
    src: {
        html: sourceFolder + "/html/**/*.html",
        css: sourceFolder + "/scss/style.scss",
        js: sourceFolder + "/js/",
        img: sourceFolder + "/imd/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: sourceFolder + "/fonts/*.ttf",
    },
    watch: {
        html: sourceFolder + "/**/*.html",
        css: sourceFolder + "/scss/**/*.scss",
        js: sourceFolder + "/js/**/*.js",
        img: sourceFolder + "/imd/**/*.{jpg,png,svg,gif,ico,webp}"
    },
    clean: "./" + projectFolder + "/"
}



function html() {
    return src('src/html/**/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        // .pipe(webpHTML())
        .pipe(dest('dist'))
}

function scss() {
    return src([
        'src/scss/style.scss'
    ])
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions']
        }))
        // .pipe(concat('style.scss'))
        .pipe(cssGroup())
        .pipe(csso({
            comments:false
        }))
        .pipe(
            rename({
                extname: '.min.css'
            })
        )
        .pipe(dest('dist/styles'))
}


function js() {
    return src([
        'src/js/parallax.min.js',
        'src/js/jquery.min.js',
        'src/js/myParalaxBg.js',
        'src/js/bootstrap.min.js',
        'src/js/owl.carousel.min.js',
        'src/js/popper.min.js',
        'src/js/formValidator.js',
        'src/js/formValidatorIndexCards.js',
        'src/js/modalFormValidator.js',
        'src/js/emailFormValidator.js',
        'src/js/wow.min.js',
        'src/js/lessonParallax.js'
    ])
        // .pipe(babel({
        //     presets: ['@babel/env']
        // }))
        .pipe(uglifyEs())
        .pipe(dest('dist/js'))
}


function img() {
    // src('src/img/*.{jpg,png,gif,webp}')
    //     .pipe(
    //         webp({
    //             quality: 70
    //         })
    //     )
    //     .pipe(dest('dist/img'))
    return (src('src/img/*.{jpg,png,svg,gif,ico}'))
        .pipe(
            imageMin({
                interlaced: true,
                progressive: true,
                optimizationLevel: 5,
                svgoPlugins: [
                    {
                        removeViewBox: false
                    }
                ]
            })
        )
        .pipe(dest('dist/img'))
}

function fonts() {
    return src('src/fonts/*.{eot,otf,svg,ttf,woff}')
        .pipe(dest('dist/fonts'))
}



function clear() {
    return del('dist')
}

function serve() {
    sync.init({
        server: {
            baseDir: 'dist'
        },
        port: 3000,
        notify: false,
        reloadDelay: 3000
    })


    watch('src/**/*.html', series(html)).on('change', sync.reload)
    watch('src/**/*.scss', series(scss)).on('change', sync.reload)
    watch('src/**/*.js', series(js)).on('change', sync.reload)

}


exports.build = series(clear, parallel(scss, fonts, js, img, html))
exports.serve = series(clear, scss, fonts, js, img, html, serve)
exports.build2 = series(clear, parallel(scss, fonts, js, html))

exports.clear = clear
exports.img = img
exports.html = html
exports.fonts = fonts
exports.js = js
exports.scss = scss
exports.start = serve