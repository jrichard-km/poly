'use strict';
// Chargement des modules
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
    rename: {
        'gulp-live-server': 'serve',
        'gulp-livereload': 'livereload',
    }
})
var sass = require('gulp-sass');

// Définition de la tâche permettant de compiler les SCSS en CSS
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(plugins.livereload());
});


// Définition de la tâche permettant de compiler les SCSS en CSS automatiquement à la sauvegarde d'un fichier source
// Et démarrage de LiveReload
gulp.task('sass:watch', function () {
  plugins.livereload.listen(8080);
  gulp.watch('./sass/**/*.scss', ['sass']);
});

// Création d'un serveur HTTP
gulp.task('serve', function () {
    var server = plugins.serve.static('/', 8888);
    server.start();
    gulp.watch(['css/*'], function (file) {
        server.notify.apply(server, [file]);
    });
});

// Définition de la tâche permettant de créer le serveur et compiler les SCSS en CSS à la sauvegarde
gulp.task('server', ['serve', 'sass:watch']);