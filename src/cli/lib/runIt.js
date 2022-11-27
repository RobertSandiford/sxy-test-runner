

import { timeProfileAsync } from './timeProfier.js'
import { runTasks } from './runTasks.js'
import { addExports } from './addExports.js'

export function runIt(config, it, beforeEachTestFunc, afterEachTestFunc) {

    return timeProfileAsync(`run it ${it.should}`, () => {

        const capturingConsoleLog = config.execution.tests === 'sequential'
        
        //// capture console.log output
        let previousConsoleLog
        const logs = []
        if (capturingConsoleLog) {
            previousConsoleLog = console.log // eslint-disable-line no-console
            console.log = (...texts) => logs.push(texts) // eslint-disable-line no-console
        }
        ////


        // run before test/it
        const testExports = {}
        configBeforeEachTest(config, testExports)
        if (typeof beforeEachTestFunc === 'function') {
            const funcExports = beforeEachTestFunc()
            addExports(testExports, funcExports)
        }

        const testParcel = {}
        addExports(testParcel, testExports)


        //const thisItCounter = itCounter++ // assign THEN increment

        //// run the it
        let success = null
        let error
        const startTime = (new Date).getTime()
        try {
            it.test(testParcel)
            success = true
        } catch (e) {
            success = false
            error = e
        }

        const time = (new Date).getTime() - startTime

        const itResult = {
            //counter: thisItCounter,
            counter: it.counter,
            should: it.should,
            success,
            time,
            error,
            logs
        }

        // run after test/it
        if (typeof afterEachTestFunc === 'function') afterEachTestFunc()
        configAfterEachTest(config, testExports)


        //// restore previous console.log
        if (capturingConsoleLog) {
            console.log = previousConsoleLog // eslint-disable-line no-console
        }
        ////


        return itResult
        //testResults.push(testResult)
        //testsState.testResults.push(testResult)

    })

}

function configBeforeEachTest(config, exports) {
    if (config.beforeEachTest) {
        const theExports = runTasks(config.beforeEachTest, undefined)
        addExports(exports, theExports)
    }
}

function configAfterEachTest(config, exports) {
    if (config.afterEachTest) {
        runTasks(config.afterEachTest, exports)
    }
}