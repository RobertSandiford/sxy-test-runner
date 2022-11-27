export default {

    // base folder for tests matching and ignore patterns
    testsBase: 'dist/testing',

    // glob pattern or array of glob patterns of test files
    tests: [
        'match-no-tests'
    ],

    // glob pattern or array of patterns of test files to ignore
    testsIgnore: ['**/node_modules/**/*'],

    // function to run on startup
    setup: undefined,

    // function to run before each test file
    setupEach: undefined,

    // function to run after test run
    teardown: undefined,

    // function to run after each test file
    teardownEach: undefined,

    // watch mode configurations
    watch: {

        //// the base directory to watch files in
        watchFilesBase: 'dist/testing',

        //// glob filter or array of global filters of files to watch
        watchFiles: '**/*.js',

        //// glob filter or array of globl filters of files to ignore
        watchFilesIgnore: ['**/node_modules/**/*', 'sxyCache/**/*'],

        // run all tests when starting the watcher
        runAllOnStartup: true,
    
        // re run all previously failed tests on each test run, until they pass
        reRunFailingTests: true,

    },

}