"use strict";

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
	pattern: '*',
	rename: {
		'vinyl-source-stream' : 'source',
		'vinyl-buffer': 'buffer'
	}
});

var paths = {
	jssrc: './lib/*.js',
	test: './test/',
	testspecs: './test/spec/*.js',
	dist: './dist'
};

var pkg = require('./package.json');
var today = new Date().toString();

var banner = ['/**',
	' * <%= pkg.name %> - <%= pkg.description %>',
	' * @version v<%= pkg.version %>',
	' * @license <%= pkg.license %>',
	' * '+'"'+today+'"',
	' */',
	].join('\n');

gulp.task('server', function(){
	return gulp.src([paths.dist, paths.test])
		.pipe($.webserver({
			port: 8001
		}));
});

gulp.task('jshint', function(){
	return gulp.src([paths.jssrc])
	.pipe($.jshint('.jshintrc'))
	.pipe($.jshint.reporter('jshint-stylish'))
	.pipe($.jshint.reporter('fail'));
});

gulp.task('browserify', ['jshint'], function(){

	// Just for the sake of globbing
	var bundledStream = $.through2();

	bundledStream
		.pipe($.source('reverseplayer.js'))
		.pipe($.buffer())
		.on('error', $.util.log)
		.pipe(gulp.dest(paths.dist));

	$.globby(paths.jssrc, function(err, entries){
		if(err){
			bundledStream.emit('error', err);
			return;
		}

		var b = $.browserify({
			entries: entries
		});

		b.bundle().pipe(bundledStream);
	});


	return bundledStream;

});

gulp.task('jshint:test', function(){
	return gulp.src([paths.testspecs])
	.pipe($.jshint('.jshintrc'))
	.pipe($.jshint.reporter('jshint-stylish'))
	.pipe($.jshint.reporter('fail'));
});

gulp.task('browserify:test', ['jshint:test'], bundle);

function bundle() {
	// Just for the sake of globbing
	var bundledStream = $.through2();

	bundledStream
		.pipe($.source('test.js'))
		.pipe($.buffer())
		.on('error', $.util.log)
		.pipe(gulp.dest(paths.test));

	$.globby([paths.testspecs], function(err, entries){
		if(err){
			bundledStream.emit('error', err);
			return;
		}

		var b = $.browserify({
			entries: entries
		});

		b.bundle().pipe(bundledStream);
	});

	return bundledStream;	
}

gulp.task('releasejs', function(){
	return gulp.src([paths.dist+'/reverseplayer.js'])
		.pipe($.uglify())
		.pipe($.rename({extname: '.min.js'}))
		.pipe($.header(banner, {pkg : pkg}))
		.pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function(){
	gulp.watch(paths.jssrc, ['browserify']);
	gulp.watch(paths.testspecs, ['browserify:test']);
});

gulp.task('default', ['jshint', 'browserify:test', 'watch', 'server']);