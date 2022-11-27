
import { createTimeProfiler } from 'sxy-dev-tools'
import chalk from 'chalk-extensions'

import { packageName, showTimeProfiling } from '../config.js'
import { out, log, debug } from '../output.js'

const { timeProfileAsync } = createTimeProfiler(showTimeProfiling)

export async function watch() {
    
    out(chalk.brightblue`[${packageName}]...`)

    const { parseCommandLineArguments } = import('./lib/parseCommandLineArguments.js') //// async function
    const allowedClArguments = {
        'config': {
            flag: 'c',
            hasValue: true
        }
    }
    const clArguments = parseCommandLineArguments(allowedClArguments)
    debug('clArguments', clArguments)


    const { loadConfig } = import('./lib/loadConfig.js') //// async function
    const userConfig = ('config' in clArguments)
        ? loadConfig(clArguments.config)
        : loadConfig()


    const { applyConfigDefaults } = import('./lib/applyConfigDefaults.js') //// sync function
    const config = applyConfigDefaults(userConfig)


    const { validateConfig } = import('./lib/validateConfig.js') //// sync function
    validateConfig(config)


    const { doUserSetup } = import('./lib/doUserSetup.js')
    doUserSetup(config)


    out(chalk.brightblue`finding tests...`)
    const { findTestFiles } = import('./lib/findTestFiles.js') //// async function
    const testFiles = findTestFiles(config)
    debug(testFiles)

    // global store of the dependencies of tests
    let dependencyTrees = {}
    // store failing tests so we can re-run them.
    const failingTests = []

    if (testFiles.length > 0) {
        const { buildDependencyTrees } = import('./lib/buildDependencyTrees.js')
        out(chalk.brightblue`finding initial dependency trees...`)
        dependencyTrees = buildDependencyTrees(config, testFiles) //// sync function

        if (config.watch.runAllOnStartup) {
            const { runTests } = import('./lib/runTests.js')
            out(chalk.brightblue`running initial tests...`)
            promise(
                promise(
                    runTests(config, testFiles, failingTests)
                ).then(() => { out(chalk.brightblue`watching...`) })
            )
            //// async function, run in separate thread
        }

    } else {
        out(chalk.brightblue`no tests founds`)
        out(chalk.brightblue`watching...`)
    }





    const { watchFilesAndRunTests } = import('./lib/watchFilesAndRunTests.js')
    watchFilesAndRunTests(config, testFiles, dependencyTrees, failingTests) //// async function run in thread


    await new Promise( () => {} )


    // won't run because promise will never finish
    const { doUserTeardown } = import('./lib/doUserTeardown.js')
    doUserTeardown(config)

    /////// SET UP?

    // if ( typeof config.setup === 'function' ) {
    //     await timeProfile('run setup function', config.setup(/* can we pass anything here? */))
    // }


}


// runInitialTests

//--find tests
//if found tests, 
//  find dependencyTrees
//  also, run tests
//else
//  warn

// dn't run initial tests
// do we need to find initial test? yes
// find tests
// if found tests
//     make dep trees
// else
//   warn

