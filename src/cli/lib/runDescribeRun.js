
import { timeProfileAsync } from './timeProfier.js'
import { runTasks } from './runTasks.js'
import { addExports } from './addExports.js'
import { debug } from '../../output.js'
import { runIt } from './runIt.js'




export function runDescribeRun(config, describe, parsedIts) {

    return timeProfileAsync(`run describe, run its ${describe.thing}`, () => {


        // const beforeEachDescribeExports = {}
        // configBeforeEachDescribe(config, beforeEachDescribeExports)

        const {
            its,
            beforeDescribeExports,
            afterDescribeFunc,
            beforeEachTestFunc,
            afterEachTestFunc
        } = parsedIts

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
        configAfterEachDescribe(config, beforeDescribeExports)

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
