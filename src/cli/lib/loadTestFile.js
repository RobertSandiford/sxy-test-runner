
import { createTimeProfiler } from 'sxy-dev-tools'
import { showTimeProfiling } from '../../config.js'
import { out, log, debug, error } from '../../output.js'
import { join } from 'path'
import chalk from 'chalk-extensions'
const { timeProfileAsync } = createTimeProfiler(showTimeProfiling)

import { load } from './load.js'

let loading = null



export async function loadTestFile(config, testFile) {

    if (loading !== null) {
        debug(chalk.yellow`loadTestFile - another file is loading - waiting for it to finish`)
        await loading
        debug(chalk.yellow`previous file complete - will now load the file`)
    }

    const loadPromise = promise(
        timeProfileAsync(`load test ${testFile}`, () => {

            const projectDir = process.cwd()

            // eslint-disable-next-line camelcase
            global.__sxy_test_runner__ = {
                describes: [],
                describeCounter: 1
            }

            const testFileFullUrl = 'file://' + join(projectDir, testFile)
            
            //console.log('testFileFullUrl', testFileFullUrl)

            const test = {
                file: testFile,
            }

            const capturingConsoleLog = config.execution.files === 'sequential'
        
            //// capture console.log output
            let previousConsoleLog
            const logs = []
            if (capturingConsoleLog) {
                previousConsoleLog = console.log // eslint-disable-line no-console
                console.log = (...texts) => logs.push(texts) // eslint-disable-line no-console
            }
            ////

            try {
                load(testFileFullUrl, {
                    // scopeObject: { // experimental idea
                    //     name: 'scope',
                    //     contents: {},
                    //     exposeObject: 'scope'
                    // }
                })

                test.describes = global.__sxy_test_runner__.describes
                test.error = false
            } catch (e) {
                //error(chalk.red`Error loading file ${testFileFullUrl}`)
                test.error = `Error loading file\n${e}`
            } finally {
                
                test.logs = logs
                //// restore previous console.log function
                if (capturingConsoleLog) {
                    if (capturingConsoleLog) {
                        console.log = previousConsoleLog // eslint-disable-line no-console
                    }
                }
                ////

            }


          

            // console.log()
            // console.log('test', test)
            // console.log('describes', test.describes)
            // console.log('its', test.describes[0].its)
            // console.log()

            return test

        } )
    )

    loading = loadPromise

    return await loadPromise

}
