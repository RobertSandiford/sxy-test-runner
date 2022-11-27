
import { timeProfileAsync } from './timeProfier.js'
import { runTasks } from './runTasks.js'
import { addExports } from './addExports.js'
import { debug } from '../../output.js'
import { runIt } from './runIt.js'




export function runDescribeOld(config, describe) {

    return timeProfileAsync(`run describe ${describe.thing}`, () => {

        let itCounter = 1
        const its = []
    
        // create functions to pass back
    
        // afterDescribe
        let afterDescribeFunc
        function afterDescribe(func) {
            if (typeof func !== 'function') {
                throw new Error(`afterDescribe() error, argument passed to afterDescribe() must be a function,`
                    + ` received ${typeof func}`)
            }
            afterDescribeFunc = func
        }

        // beforeEachTest
        let beforeEachTestFunc
        function beforeEachTest(func) {
            if (typeof func !== 'function') {
                throw new Error(`afterDescribe() error, argument passed to afterDescribe() must be a function,`
                    + ` received ${typeof func}`)
            }
            beforeEachTestFunc = func
        }

        // afterEachTest
        let afterEachTestFunc
        function afterEachTest(func) {
            if (typeof func !== 'function') {
                throw new Error(`afterDescribe() error, argument passed to afterDescribe() must be a function,`
                    + ` received ${typeof func}`)
            }
            afterEachTestFunc = func
        }

        // it
        function it(should, test) {
    
            const thisItCounter = itCounter++
            its.push({
                counter: thisItCounter,
                should,
                test,
                //beforeEachTestExports
            })
    
        }

        const test = it


        const describeExports = {}
        configBeforeEachDescribe(config, describeExports)

        const describeParcel = { it, test, afterDescribe, beforeEachTest, afterEachTest }
        addExports(describeParcel, describeExports)

        describe.tests(describeParcel)

        //console.log('its', its)


        // const beforeEachDescribeExports = (config.beforeEachDescribe)
        //     ? runTasks(config, config.beforeEachDescribe)
        //     : {}

        //const thisDescribeCounter = describeCounter++ // assign THEN increment
        //let itCounter = 1
        const itResults = []

        for ( const it of its ) {
            itResults.push( runIt(config, it, beforeEachTestFunc, afterEachTestFunc) )
        }

        const itResultsSummary = {
            total: 0,
            passes: 0,
        }

        for ( const itResult of itResults ) {
            itResultsSummary.total += +(itResult.success !== null)
            itResultsSummary.passes += +itResult.success
        }

        debug('itResultsSummary', itResultsSummary)

        const describeResult = {
            counter: describe.counter,
            thing: describe.thing,
            success: (itResultsSummary.total > 0)
                ? itResultsSummary.passes === itResultsSummary.total
                : null,
            itResults,
            itResultsSummary
        }

        // run after 
        if (typeof afterDescribeFunc === 'function') afterDescribeFunc()
        configAfterEachDescribe(config, describeExports)

        return describeResult
        
    })

}

function configBeforeEachDescribe(config, exports) {
    if (config.beforeEachDescribe) {
        const theExports = runTasks(config.beforeEachDescribe, undefined)
        addExports(exports, theExports)
    }
}

function configAfterEachDescribe(config, exports) {
    if (config.afterEachDescribe) {
        runTasks(config.afterEachDescribe, exports)
    }
}
