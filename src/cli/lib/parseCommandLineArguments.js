
// watch:
// once:
// // --config configLocation

import { createTimeProfiler } from 'sxy-dev-tools'
import { packageName, cliName, configFileName, configLocations, showTimeProfiling } from '../../config.js'
import { join } from 'path'
import { out, log, debug } from '../../output.js'
const { timeProfileAsync } = createTimeProfiler(showTimeProfiling)

import { getAllowedFlags } from './getAllowedFlags.js'

export function parseCommandLineArguments(allowedArguments) {
    
    const allowedFlags = getAllowedFlags(allowedArguments)

    const returnArgs = {}

    for (let position = 0; position < commandLineArguments.length; position++) {
        const arg = commandLineArguments[position]
        if (arg.slice(0,2) === '--') {
            const longFlag = arg.slice(2)
            if (longFlag in allowedArguments) {
                if (allowedArguments[longFlag].hasValue) {
                    const value = commandLineArguments[++position] // increment position
                    returnArgs[longFlag] = value
                } else {
                    returnArgs[longFlag] = true
                }
            } else {
                log(`[${packageName}] Unknown option ${longFlag}`)
            }
        } else if (arg.slice(0,1) === '-') {
            const shortFlag = arg.slice(1)
            if (shortFlag in allowedFlags) {
                const longFlag = allowedFlags[shortFlag]

                if (longFlag in returnArgs) {
                    log(`[${packageName}] Option ${longFlag} already set, being overwritten by ${shortFlag}`)
                }

                if (allowedArguments[longFlag].hasValue) {
                    const value = commandLineArguments[++position] // increment position
                    returnArgs[longFlag] = value
                } else {
                    returnArgs[longFlag] = true
                }
            } else {
                log(`[${packageName}] Unknown flag ${shortFlag}`)
            }
        }
    }

    return returnArgs
}

