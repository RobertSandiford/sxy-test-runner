
import { timeProfileAsync } from './timeProfier.js'
import { runTasks } from './runTasks.js'
import { addExports } from './addExports.js'
import { debug } from '../../output.js'
import { runIt } from './runIt.js'



export function parseDescribe(config, describe) {

    return timeProfileAsync(`parse its from describe ${describe.thing}`, () => {

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


        const beforeDescribeExports = {}
        configBeforeEachDescribe(config, beforeDescribeExports)

        const describeParcel = { it, test, afterDescribe, beforeEachTest, afterEachTest }
        addExports(describeParcel, beforeDescribeExports)

        describe.tests(describeParcel)

        return {
            its,
            beforeDescribeExports,
            afterDescribeFunc,
            beforeEachTestFunc,
            afterEachTestFunc,
        }
        
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
