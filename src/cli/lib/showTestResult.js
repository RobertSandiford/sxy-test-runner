

import { createTimeProfiler } from 'sxy-dev-tools'
import { packageName, cliName, configFileName, configLocations, showTimeProfiling } from '../../config.js'
import chalk from 'chalk-extensions'
import { out as mainOut, log, debug } from '../../output.js'
import figures from 'figures'
//import { testsState } from '../../testsState.js'
import 'sxy-standard/light.js'
import { indexNumberToLetters } from '../../indexNumberToLetters.js'

const { timeProfileAsync } = createTimeProfiler(showTimeProfiling)


export function showTestResult(config, testResult, customOut = undefined) {


    debug('customOut', customOut)

    const out = (customOut)
        ? (...texts) => customOut(...texts)
        : (...texts) => mainOut(...texts)

    //console.log('testResult', testResult)

    timeProfileAsync('show test result', sync(() => {

        out()
        out(chalk.grey`File ${testResult.file}`)

        const indent = '    '

        if (testResult.logs.length > 0) {
            out()
            out(indent + chalk.grey`console.logs:`)
            testResult.logs.forEach(log => {
                log[0] = indent + log[0]
                out(...log)
            })
            out()
        }

        let first = true

        for ( const describeResult of testResult.describeResults ) {
        
            if ( ! first) out()
            first = false

            out(chalk.lightgrey`${describeResult.counter}) describing ` + chalk.brightblue(describeResult.thing))
            out()
            
            if (describeResult.logs.length > 0) {
                out(indent + chalk.grey`console.logs:`)
                describeResult.logs.forEach(log => {
                    log[0] = indent + log[0]
                    out(...log)
                })
                out()
            }

            for ( const itResult of describeResult.itResults ) {
            
                //console.log('itResult', itResult)
                
                const letters = indexNumberToLetters(itResult.counter)
                if (itResult.success) {
                    out(chalk.lightgrey`${indent}${letters})`
                        + chalk.mediumgreen`  ${figures.tick}  ${itResult.should}`)
                } else {
                    out(chalk.lightgrey`${indent}${letters})`
                        + chalk.mediumred`  ${figures.cross}  ${itResult.should}`)
                    out()
                    const spacer = `${indent}${' '.repeat(letters.length)}   `
                    if ('actual' in itResult.error && 'expected' in itResult.error) {
                        out(chalk.mediumred(
                            `${spacer}${itResult.error.name}: ${itResult.error.message}`
                            //+ `\n${spacer}expected: ${itResult.error.expected}`
                            //+ `\n${spacer}received: ${itResult.error.actual}`
                        ))
                    } else {
                        out(chalk.mediumred(
                            `${spacer}${itResult.error.name}: ${itResult.error.message}`
                        ))
                    }
                    // stack trace
                    if (config.showErrorTrace) {
                        out()
                        out(chalk.grey(itResult.error.stack))
                    }
                }

                out()
                if (itResult.logs.length > 0) {
                    out(indent + indent + chalk.grey`console.logs:`)
                    itResult.logs.forEach(log => {
                        log[0] = indent + indent + log[0]
                        out(...log)
                    })
                    out()
                }
             

            }

        }
    }))

}