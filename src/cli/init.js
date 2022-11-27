
import { join } from 'path'
import chalk from 'chalk-extensions'
import { packageName, cliName, configFileName, configLocations } from '../config.js'
import { out, log, debug } from '../output.js'
import fs from 'fs'

export function init() {

    const projectDir = process.cwd()

    for (const configLocation of configLocations) {
        let loc
        loc = join(projectDir, configLocation, configFileName + '.js')
        if ( fs.existsSync( loc ) ) {
            configAlreadyExists(loc)
        }
        loc = join(projectDir, configLocation, configFileName + '.cjs')
        if ( fs.existsSync( loc ) ) {
            configAlreadyExists(loc)
        }
        loc = join(projectDir, configLocation, configFileName + '.mjs')
        if ( fs.existsSync( loc ) ) {
            configAlreadyExists(loc)
        }
    }

    function configAlreadyExists(loc) {
        out(chalk.orange`[${packageName}] A matching config already exists at ${loc}`
            + `\nPlease remove this config before generating a new one with \`${cliName} init\``)
    }

    const projectPackageJsonLocation = join(projectDir, 'package.json')
    if ( ! fs.existsSync( projectPackageJsonLocation ) ) {
        out(chalk.orange`[${packageName}] No package.json exists in this location`
            + `\nPlease initialise the package with \`yarn init\` on \`npm init\``
            + ` before running this command, and run this command from the project root folder`)

    }

    //const packageJsonRaw = await fs.promises.readFile( projectPackageJsonLocation )
    const packageJsonRaw = fs.readFileSync( projectPackageJsonLocation )
    const packageJson = JSON.parse(packageJsonRaw)


    let targetConfigName
    if ( packageJson.type === 'module' ) {
        // ES6 module
        targetConfigName = join(projectDir, configLocations[0], configFileName + '.js')
    } else {
        // common 
        targetConfigName = join(projectDir, configLocations[0], configFileName + '.mjs')
    }

    const defaultConfig =
`export default {

    // base folder for tests match and ignore patterns
    testsBase: '.',

    // glob pattern or array of glob patterns of test files
    tests: [
        '**/*.test.{js,mjs,jsx}',
        '**/*.spec.{js,mjs,jsx}',
        '**/tests?/*.{js,mjs,jsx}',
        '**/__tests?__/*.{js,mjs,jsx}'
    ],

    // glob pattern or array of patterns of test files to ignore
    testsIgnore: ['**/node_modules/**/*'],

    // whether to show the full error trace when an error occurs in a test file
    showErrorTrace: false,

    // tasks to run on startup
    // accepts a function, file location (relative to project base), or array of functions and or files
    setup: undefined,

    // tasks to run before each test file is run
    beforeEachFile: undefined,

    // tasks to run after each test file is run
    afterEachFile:  undefined,

    // tasks to run before each describe block is processed
    // if the function returns an object with named properties, or the file exports named exports,
    // these will be passed to the callback function in argument 0, and can be access by destructruing e.g.
    // describe('thing', ({exportA, exportB}) => { it('should', ...) })
    beforeEachDescribe: undefined,

    // tasks to run after each describe block
    afterEachDescribe: undefined,

    // tasks to run before each it/test block
    // function returns and file exports will be passed to the it/test block as with describe above, e.g.
    // it('should', ({exportA, exportB}) => { assert('something') }) 
    beforeEachTest: undefined,

    // tasks to run after each it/test block
    afterEachTest: undefined,

    // how to execute the different parts of test files
    execution: {

        // run test files in 'parallel' or 'sequential'ly
        files: 'sequential',

        // run describe blocks within a test file in 'parallel' or 'sequential'ly
        describes: 'sequential',

        // run it/test blocks within a describe blocks in 'parallel' or 'sequential'ly
        tests: 'sequential'

    },

    // watch mode configurations
    watch: {

        //// the base directory to watch files in
        watchFilesBase: '.',

        //// glob filter or array of glob filters of files to watch
        watchFiles: '**/*.js',

        //// glob filter or array of globl filters of files to ignore
        watchFilesIgnore: '**/node_modules/**/*',

        // run all tests when starting the watcher
        runAllOnStartup: true,
    
        // re run all previously failed tests on each test run, until they pass
        reRunFailingTests: true,

    },

}`
// `export default {

//     // base folder for tests match and ignore patterns
//     testsBase: '.',

//     // glob pattern or array of glob patterns of test files
//     tests: [
//         '**/*.test.{js,mjs,jsx}',
//         '**/*.spec.{js,mjs,jsx}',
//         '**/tests?/*.{js,mjs,jsx}',
//         '**/__tests?__/*.{js,mjs,jsx}'
//     ],

//     // glob pattern or array of patterns of test files to ignore
//     testsIgnore: ['**/node_modules/**/*'],

//     // function to run on startup
//     setup: undefined,

//     // function to run before each test file
//     setupEach: undefined,

//     // function to run after test run
//     teardown: undefined,

//     // function to run after each test file
//     teardownEach: undefined,

//     // watch mode configurations
//     watch: {

//         //// the base directory to watch files in
//         watchFilesBase: '.',

//         //// glob filter or array of glob filters of files to watch
//         watchFiles: '**/*.js',

//         //// glob filter or array of globl filters of files to ignore
//         watchFilesIgnore: '**/node_modules/**/*',

//         // run all tests when starting the watcher
//         runAllOnStartup: true,
    
//         // re run all previously failed tests on each test run, until they pass
//         reRunFailingTests: true,

//     },

// }`

    fs.writeFileSync(targetConfigName, defaultConfig)

    out(chalk.mediumgreen`[${packageName}] Created config at ` + chalk.blue(targetConfigName))

}
