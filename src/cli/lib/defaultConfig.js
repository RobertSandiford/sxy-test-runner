
export const defaultConfig = {
    testsBase: '.',
    tests: [
        '**/*.test.{js,mjs,jsx}',
        '**/*.spec.{js,mjs,jsx}',
        '**/tests?/*.{js,mjs,jsx}',
        '**/__tests?__/*.{js,mjs,jsx}'
    ],
    testsIgnore: ['node_modules'],
    showErrorTrace: false,
    //setup
    //setupEach
    //teardown
    //teardownEach
    execution: {
        files: 'parallel',
        describes: 'sequential',
        tests: 'sequential'
    },
    watch: {
        watchFilesBase: '.',
        watchFiles: '**/*',
        watchFilesIgnore: '**/node_modules/**/*',
        runAllOnStart: true,
        reRunFailingTests: true,
    },
}