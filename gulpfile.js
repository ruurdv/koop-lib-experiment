/* eslint-env es6, node */
'use strict';

const gulp = require('gulp');


gulp.task( 'fractal:start', function(){
  const fractal = require( './fractal.js' );
  const logger = fractal.cli.console;
  const server = fractal.web.server({ sync: true });

  server.on( 'error', err => logger.error( err.message ) );
  return server.start().then( () => {
    logger.success( `Fractal server is now running at ${server.urls.sync.local}` );
  });
});

gulp.task( 'fractal:build', function(){
  const fractal = require( './fractal.js' );
  const logger = fractal.cli.console;
  const builder = fractal.web.builder();

  builder.on( 'progress', ( completed, total ) => logger.update( `Exported ${completed} of ${total} items`, 'info' ) );
  builder.on( 'error', err => logger.error( err.message ) );
  return builder.build().then( () => {
    logger.success( 'Fractal build completed!' );
  });
});

gulp.task( 'fractal-build', gulp.series( 'fractal:build') );
gulp.task( 'dev', gulp.series( 'fractal:start' ) );
