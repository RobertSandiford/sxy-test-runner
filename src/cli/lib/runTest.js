

import { createTimeProfiler } from 'sxy-dev-tools'
//import chalk from 'chalk-extensions'
import { out, log, debug } from '../../output.js'
import { showTimeProfiling } from '../../config.js'

import { runTasks } from './runTasks.js'
import { addExports } from './addExports.js'
import { runDescribe } from './runDescribe.js'


const { timeProfileAsync } = createTimeProfiler(showTimeProfiling)


export function runTest(config, test) {

    return timeProfileAsync(`run test ${test.file}`, async () => {

        debug('test', test)

        // run before test file
        const fileExports = {}
        configBeforeEachFile(config, fileExports)

        // const beforeEachFileExports = (config.beforeEachFile)
        //     ? runTasks(config, config.beforeEachFile)
        //     : {}

        //const describeCounter = 1

        const runDescribePromises = []

        for (const describe of test.describes) {

            runDescribePromises.push(
                promise( runDescribe(config, describe) )
            )

            if (config.execution.describes === 'sequential') await runDescribePromises.at(-1)

        }

        //console.log('runDescribePromises', runDescribePromises)

        const describeResults = Promise.all(runDescribePromises)

        //console.log('describeResults', describeResults)

        const describeResultsSummary = {
            total: 0,
            passes: 0,
            invalid: 0,
            itsTotal: 0,
            itsPasses: 0,
        }


        for ( const describeResult of describeResults ) {
            describeResultsSummary.total += +(describeResult.success !== null)
            describeResultsSummary.passes += +describeResult.success
            describeResultsSummary.invalid += +(describeResult.success === null)
            describeResultsSummary.itsTotal += describeResult.itResultsSummary.total
            describeResultsSummary.itsPasses += describeResult.itResultsSummary.passes
        }

        const testResults = {
            file: test.file,
            success: (describeResultsSummary.total > 0)
                ? describeResultsSummary.total === describeResultsSummary.passes
                : null,
            describeResults,
            describeResultsSummary,
            logs: test.logs
        }
        
        // run after test
        configAfterEachFile(config, fileExports)

        return testResults

    })
    
}


function configBeforeEachFile(config, exports) {
    if (config.beforeEachFile) {
        const theExports = runTasks(config.beforeEachFile, undefined)
        addExports(exports, theExports)
    }
}

function configAfterEachFile(config, exports) {
    if (config.afterEachFile) {
        runTasks(config.afterEachFile, exports)
    }
}
