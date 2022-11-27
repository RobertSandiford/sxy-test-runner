
import { createTimeProfiler } from 'sxy-dev-tools'
import chalk from 'chalk-extensions'

import { packageName, configFileName, configLocations, showTimeProfiling } from '../config.js'
import { out, log, debug } from '../output.js'

const { timeProfileAsync } = createTimeProfiler(showTimeProfiling)

export function once() {
    
    out(chalk.brightblue`[${packageName}]...`)

    const startTime = (new Date).getTime()


    const { loadConfig } = import('./lib/loadConfig.js') //// async function
    const userConfig = loadConfig()


    const { applyConfigDefaults } = import('./lib/applyConfigDefaults.js') //// sync function
    const config = applyConfigDefaults(userConfig)


    log(chalk.brightblue`finding tests...`)
    const { findTestFiles } = import('./lib/findTestFiles.js') //// async function
    const testFiles = findTestFiles(config)


    if (testFiles.length === 0) {
        out(chalk.orange(`[${packageName}] Found no tests.`
            + `\nTests patterns [${config.tests.join(', ')}].`
            + `\nCreate tests matching the patterns, `
            + `\nor set new patterns in ${configFileName}.* { tests: }`))

        const endTime = (new Date).getTime(); const time = endTime - startTime
        out(chalk.brightblue(`[${packageName}] time: ${time.toLocaleString()}ms`))

        process.exit(0)
    }


    const { runTests } = import('./lib/runTests.js')
    if (testFiles.length > 0) {
        log(chalk.brightblue`running tests...`)
        runTests(config, testFiles, [])  //// async function, run in thread
    }


    const time = (new Date).getTime() - startTime
    out(chalk.grey`\n${time.toLocaleString()}ms\n`)

}