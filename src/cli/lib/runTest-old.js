
/*
import { createTimeProfiler } from 'sxy-dev-tools'
import chalk from 'chalk-extensions'
import { out, log, debug } from '../../output.js'
import { showTimeProfiling } from '../../config.js'

import { runTasks } from './runTasks.js'

const { timeProfileAsync } = createTimeProfiler(showTimeProfiling)

export function runTest(config, test, customOut = undefined) {

    return timeProfileAsync(`run test ${test.file}`, () => {

        // run before test
        if (config.beforeEachFile) runTasks(config, config.beforeEachFile)

        // const beforeEachFileExports = (config.beforeEachFile)
        //     ? runTasks(config, config.beforeEachFile)
        //     : {}

        let describeCounter = 1
        const describeRunPromises = []

        for (const describe of test.describes) {

            describeRunPromises.push(
                promise( runDescribe(config, describe) )
            )

        }

        const describeResults = Promise.all(describeRunPromises)

        const describeResultsSummary = {
            total: 0,
            passes: 0,
            itsTotal: 0,
            itsPasses: 0,
        }


        for ( const describeResult of describeResults ) {
            describeResultsSummary.total += +(describeResult.success !== null)
            describeResultsSummary.passes += +describeResult.success
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
        }
        
        // run after test
        if (config.afterEachFile) runTasks(config, config.afterEachFile)

        return testResults


        function runDescribe(config, describe) {

            return timeProfileAsync(`run describe ${describe.thing}`, () => {
        
                // run before describe
                if (config.beforeEachDescribe) runTasks(config, config.beforeEachDescribe)

                // const beforeEachDescribeExports = (config.beforeEachDescribe)
                //     ? runTasks(config, config.beforeEachDescribe)
                //     : {}

                const thisDescribeCounter = describeCounter++ // assign THEN increment
                let itCounter = 1
                const itResults = []

                for ( const it of describe.its ) {
                    itResults.push( runIt(config, it) )
                }

                const itResultsSummary = {
                    total: 0,
                    passes: 0,
                }

                for ( const itResult of itResults ) {
                    itResultsSummary.total += +(itResult.success !== null)
                    itResultsSummary.passes += +itResult.success
                }

                const describeResult = {
                    counter: thisDescribeCounter,
                    thing: describe.thing,
                    success: (itResultsSummary.total > 0)
                        ? itResultsSummary.passes === itResultsSummary.total
                        : null,
                    itResults,
                    itResultsSummary
                }

                // run after describe
                if (config.afterEachDescribe) runTasks(config, config.afterEachDescribe)

                return describeResult

                
                function runIt(config, it, exports) {

                    return timeProfileAsync(`run it ${it.should}`, () => {

                        // run before test/it
                        if (config.beforeEachTest) runTasks(config, config.beforeEachTest)

                        const thisItCounter = itCounter++ // assign THEN increment
            
                        //// run the it
                        let success = null
                        let error
                        const startTime = (new Date).getTime()
                        try {
                            it.test()
                            success = true
                        } catch (e) {
                            success = false
                            error = e
                        }

                        const time = (new Date).getTime() - startTime

                        const itResult = {
                            counter: thisItCounter,
                            should: it.should,
                            success,
                            time,
                            error
                        }

                        // run after test/it
                        if (config.afterEachTest) runTasks(config, config.afterEachTest)

                        return itResult
                        //testResults.push(testResult)
                        //testsState.testResults.push(testResult)

                    })
            
                }
        
            })
        
        }

    })
    
}
*/