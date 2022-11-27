

import { createTimeProfiler } from 'sxy-dev-tools'
import { packageName, cliName, configFileName, configLocations, showTimeProfiling } from '../../config.js'
import chalk from 'chalk-extensions'
import { out as mainOut, log, debug } from '../../output.js'
import figures from 'figures'
//import { testsState } from '../../testsState.js'
import 'sxy-standard/light.js'
import { indexNumberToLetters } from '../../indexNumberToLetters.js'

const { timeProfileAsync } = createTimeProfiler(showTimeProfiling)


export function showTestLoadingError(config, test, customOut = undefined) {

    debug('customOut', customOut)

    const out = (customOut)
        ? (...texts) => customOut(...texts)
        : (...texts) => mainOut(...texts)

    //console.log('testResult', testResult)

    timeProfileAsync('show test loading error', sync(() => {

        const indent = '    '

        out()
        out(chalk.grey`File ${test.file}`)
        out(chalk.mediumred`Loading error:\n${test.error}`)

        if (test.logs && test.logs.length > 0) {
            out()
            out(indent + chalk.grey`console.logs:`)
            test.logs.forEach(log => {
                log[0] = indent + log[0]
                out(...log)
            })
        }

        out()

    }))

}
