
import { createTimeProfiler } from 'sxy-dev-tools'
import { showTimeProfiling } from '../../config.js'
import chalk from 'chalk-extensions'
import { out as mainOut, log, debug } from '../../output.js'
import { join } from 'path'
import figures from 'figures'
//import { testsState } from '../../testsState.js'
import 'sxy-standard'
import objects from 'sxy-lib/objects.js'

import { loadTestFile } from './loadTestFile.js'
import { runTest } from './runTest.js'
import { showTestLoadingError } from './showTestLoadingError.js'
import { showTestResult } from './showTestResult.js'
import { load } from './load.js'

const { timeProfileAsync } = createTimeProfiler(showTimeProfiling)


export async function runTests(config, testFiles, failingTests, customOut = undefined) {

    debug('runTests failingTests', failingTests)
    
    const tests = {}
    const testRunPromises = {}
    const erroringTests = {}
    const testRunOutPromises = {} // exp

    timeProfileAsync('run tests', async () => {

        //const projectDir = process.cwd()
    
        ////out(``) // spacer before tests output

        if (testFiles.length > 0) {

            // clear load cache to allow accesing the new tets
            load.cache.clear()
    
            for (const testFile of testFiles) {

                const test = loadTestFile(config, testFile)
             
                if ( test.error ) {

                    erroringTests[testFile] = test
                    showTestLoadingError(config, test)

                } else {

                    debug('test', test)

                    const testRunPromise = promise( runTest(config, test, customOut) )
                    testRunPromises[testFile] = testRunPromise

                    testRunOutPromises[testFile] =
                    promise( testRunPromise.then( testResult => {
                        if (testResult.success === true || testResult.success === null) {
                            if ( failingTests.includes(testResult.file) ) {
                                failingTests.remove(testResult.file) // arrayRemove?
                            }
                        } else {
                            if ( ! failingTests.includes(testResult.file) ) {
                                failingTests.push(testResult.file)
                            }
                        }
                        showTestResult(config, testResult, customOut)
                    }) )

                    // wait for the test to complete before proceeding if we are in 'sequential' mode
                    if (config.execution.files === 'sequential') await testRunOutPromises[testFile]

                }
                
            }

        }
    
    })


    let runTestResults = {}

    timeProfileAsync('wait for tests to finish', () => {

        runTestResults = Promise.allObj(testRunPromises)

        // wait for the output to complete
        Promise.allObj(testRunOutPromises)

    })


    timeProfileAsync('show initial test run results', () => {

        const out = (customOut)
            ? (...texts) => customOut(...texts)
            : (...texts) => mainOut(...texts)

        const testsResultsSummary = {
            total: 0,
            passes: 0,
            invalid: 0,
            describesTotal: 0,
            describesPasses: 0,
            describesInvalid: 0,
            itsTotal: 0,
            itsPasses: 0
            // itsInvalid: 0 // we don't check whether tests run any asserts (we don't control the assertion lib)
        }

        //console.log('runTestResults', runTestResults)

        for ( const testFile in runTestResults ) {
            const runTestResult = runTestResults[testFile]

            //console.log('runTestResult', runTestResult)

            testsResultsSummary.total += +(runTestResult.success !== null)
            testsResultsSummary.passes += +runTestResult.success
            testsResultsSummary.invalid += +(runTestResult.success === null)
            testsResultsSummary.describesTotal += +runTestResult.describeResultsSummary.total
            testsResultsSummary.describesPasses += +runTestResult.describeResultsSummary.passes
            testsResultsSummary.describesInvalid += +runTestResult.describeResultsSummary.invalid
            testsResultsSummary.itsTotal += +runTestResult.describeResultsSummary.itsTotal
            testsResultsSummary.itsPasses += +runTestResult.describeResultsSummary.itsPasses
            //testsResultsSummary.itsInvalid += +runTestResult.describeResultsSummary.itsInvalid // see comment above, not doing invalid tests
        }

        testsResultsSummary.total += objects.count(erroringTests)
        //for ( const testFile in erroringTests ) {
        //    testsResultsSummary.total++
        //}

        //console.log('testsResultsSummary', testsResultsSummary)

        out(`\n`)

        if (testsResultsSummary.itsPasses === testsResultsSummary.itsTotal) {
            out(chalk.mediumgreen(`${figures.tick}`))
        } else {
            out(chalk.mediumred(`${figures.cross}`))
        }

        // number of tests successful
        const testsText = `Tests: ${testsResultsSummary.itsPasses}/${testsResultsSummary.itsTotal}`
        if (testsResultsSummary.itsPasses === testsResultsSummary.itsTotal) {
            out(chalk.mediumgreen(`${testsText}`/* ${figures.tick}`*/))
        } else {
            out(chalk.mediumred(`${testsText}`/* ${figures.cross}`*/))
        }

        // number of items successful
        const describesText = `Items: ${testsResultsSummary.describesPasses}/${testsResultsSummary.describesTotal}`
        const invalidDescribesText = (testsResultsSummary.describesInvalid >= 1)
            ? (testsResultsSummary.describesInvalid === 1)
                ? chalk.grey(`(+1 describe without tests)`)
                : chalk.grey(`(+${testsResultsSummary.describesInvalid} describes without tests)`)
            : ''
        if (testsResultsSummary.describesPasses === testsResultsSummary.describesTotal) {
            out(chalk.mediumgreen(`${describesText}`) + ' ' + invalidDescribesText)
        } else {
            out(chalk.mediumred(`${describesText}`) + ' ' + invalidDescribesText)
        }
        
        // number of test files successful
        const testFilesText = `Test Files: ${testsResultsSummary.passes}/${testsResultsSummary.total}`
        const invalidTestFilesText = (testsResultsSummary.invalid >= 1)
            ? (testsResultsSummary.invalid === 1)
                ? chalk.grey(`(+1 file without tests)`)
                : chalk.grey(`(+${testsResultsSummary.invalid} files without tests)`)
            : ''
        if (testsResultsSummary.passes === testsResultsSummary.total) {
            out(chalk.mediumgreen(`${testFilesText}`) + ' ' + invalidTestFilesText)
        } else {
            out(chalk.mediumred(`${testFilesText}`) + ' ' + invalidTestFilesText)
        }
        
        out(chalk.orange`To do: account for tests with loading errors`)
        // out(``)
        

    })

}



