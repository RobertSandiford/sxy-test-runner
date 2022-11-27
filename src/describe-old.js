
import chalk from 'chalk-extensions'

import { out, log, debug } from './output.js'

import { showTimeProfiling  } from './config.js'
import { createTimeProfiler } from 'sxy-dev-tools'

//console.log('sxyDevTools', sxyDevTools)
//console.log('createTimeProfiler', createTimeProfiler)

const { timeProfile, timeProfileAsync } =  createTimeProfiler(showTimeProfiling)

//console.log('chalk', chalk)

import { runTasks } from './cli/lib/runTasks.js'

export function describe(theThing, tests) {

    const config = global.__sxy_test_runner__.config

    // if config.beforeEachDescribe
    // const beforeEachDescribeExports = runTasks(config, config.beforeEachDescribe)


    const thisDescribeCounter = global.testState.describeCounter++ // ++: assign the value, THEN increment

    let itCounter = 1
    const its = []

    // create functions to pass back

    // it
    function it(should, test) {

        // if config.beforeEachTest
        // const beforeEachTestExports = runTasks(config, config.beforeEachTest)

        const thisItCounter = itCounter++
        its.push({
            counter: thisItCounter,
            should,
            test,
            //beforeEachTestExports
        })

        // if config.afterEachTest
        // runTasks(config, config.afterEachTest)

    }

    // before
    let beforeFunc
    function before(func) {
        beforeFunc = func
    }

    // after
    let afterFunc
    function after(func) {
        afterFunc = func
    }

    const provides = { it, before, after }

    // addExports(provides, beforeEachDescribeExports)

    // run the callback, to set the its
    tests({it, before, after})
    //tests(provides)


    const describe = {
        counter: thisDescribeCounter,
        thing: theThing,
        its,
        //beforeEachDescribeExports
    }
    
    global.testState.describes.push( describe )


    // if config.afterEachDescribe
    // runTasks(config, config.afterEachDescribe)

    debug(
        chalk.lightgrey`${thisDescribeCounter})`
        + chalk.lightgrey` Done with ` + chalk.brightblue`${theThing}\n`
    )

  
}



/*


export async function describe(theThing, tests, testFilename) {

    const timeProfiling = {}
    timeProfiling.beforeDescribe = (new Date).getTime()

    //log('tests state 1', testsState)

    const thisDescribeCounter = testsState.describeCounter++ // ++: assign the value, THEN increment

    //log('tests state 1.5', testsState)

    let testCounter = 1
    let testResults = []
    
    const its = []
    async function it(should, test) {
        its.push([should, test])
    }


    // async function it(should, test) {
        
    //     const timeProfiling = {}
    //     timeProfiling.beforeIt = (new Date).getTime()
 
    
    //     const thisTestCounter = testCounter++ // ++: assign the value, THEN increment
    //     let success = null
    //     let error
    //     try {
    //         await test()
    //         if (success === null) success = true
    //     } catch (e) {
    //         success = false
    //         //console.log(e)
    //         error = e
    //     }

    //     const testResult = {
    //         counter: thisTestCounter,
    //         should,
    //         success,
    //         error
    //     }

    //     testResults.push(testResult)
    //     testsState.testResults.push(testResult)


    //     timeProfiling.afterIt = (new Date).getTime()
    //     timeProfilingOut(`it ${should}`, timeProfiling.beforeIt, timeProfiling.afterIt)
        
    // }

    let beforeFunc
    async function before(func) {
        beforeFunc = func
    }

    let afterFunc
    async function after(func) {
        afterFunc = func
    }

    tests({it, before, after})

    //log('tests state2', testsState)

    testsState.theseDescribes.push({theThing, its, counter: thisDescribeCounter})

    await run('do the tests', async () => {
        for (const it of its) {
            await testIt(...it)
        }
    })
    
    async function testIt(should, test) {

        await timeProfileAsync(`it ${should}`, async () => {

            const timeStart = (new Date).getTime()

            const thisTestCounter = testCounter++ // ++: assign the value, THEN increment
            let success = null
            let error
            try {
                await test()
                if (success === null) success = true
            } catch (e) {
                success = false
                error = e
            }

            const timeEnd = (new Date).getTime()
            const time = timeEnd - timeStart

            const testResult = {
                counter: thisTestCounter,
                should,
                success,
                time,
                error
            }

            testResults.push(testResult)
            testsState.testResults.push(testResult)

            // out(`${time.localeString()}ms`)
        })

    }

    //console.log('testResults A', testResults)
    testResults = testResults.sort( (a, b) => a.counter - b.counter )
    //console.log('testResults B', testResults)

    out(
        chalk.lightgrey`${thisDescribeCounter})`
        + chalk.lightgrey` Describing` + chalk.brightblue` ${theThing}\n`
    )

    let describeSuccess = null
    const describeErrors = []

    for (const testResult of testResults) {
        const indexLetters = indexNumberToLetters(testResult.counter)
        if (testResult.success) {
            if (describeSuccess === null) describeSuccess = true
            out(
                chalk.lightgrey`    ${indexLetters})`
                + chalk.mediumgreen(`  ${figures.tick}  ${testResult.should}`)
            )
        } else {
            describeSuccess = false
            describeErrors.push(testResult.error)
            out(
                chalk.lightgrey`    ${indexLetters})`
                + chalk.mediumred`  ${figures.cross}  ${testResult.should}\n`
                + chalk.mediumred`        ${testResult.error}`
            )
            // out(
            //     chalk.lightgrey`    ${indexLetters})`
            //     + chalk.brightred`  ${figures.cross}  ${testResult.should}\n`
            //     + chalk.brightred`    ${testResult.errors}`
            // )
        }
    }

    const describeResult = {
        counter: thisDescribeCounter,
        theThing,
        success: describeSuccess,
        errors: describeErrors
    }

    testsState.describeResults.push(describeResult)

    out(``)
    
    timeProfiling.afterDescribe = (new Date).getTime()
    timeProfilingOut(`describe ${theThing}`, timeProfiling.beforeDescribe, timeProfiling.afterDescribe)

    
    global.endTest[testFilename] = (new Date).getTime()
    timeProfilingOutSpecial(`full test ${testFilename}`, global.startTest[testFilename], global.endTest[testFilename])
    
}

// export async function it(should, test) {
//     out(chalk`theThing`)
//     await test()
// }

//export const test = it


function run(name, func) {
    return func()
}

*/