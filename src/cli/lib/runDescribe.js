
import { timeProfileAsync } from './timeProfier.js'
import { parseDescribe } from './parseDescribe.js'
import { runDescribeRun } from './runDescribeRun.js'


export function runDescribe(config, describe) {

    return timeProfileAsync(`run describe ${describe.thing}`, () => {

        const capturingConsoleLog = config.execution.describes === 'sequential'
        
        //// capture console.log output
        let previousConsoleLog
        const logs = []
        if (capturingConsoleLog) {
            previousConsoleLog = console.log // eslint-disable-line no-console
            console.log = (...texts) => logs.push(texts) // eslint-disable-line no-console
        }
        ////
               
        const parsedDescribe = parseDescribe(config, describe)

        const describeResult = runDescribeRun(config, describe, parsedDescribe)
        
        describeResult.logs = logs
        if (capturingConsoleLog) {
            console.log = previousConsoleLog // eslint-disable-line no-console
        }

        return describeResult
        
    })

}
