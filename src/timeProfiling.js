
import chalk from 'chalk-extensions'
import { packageName, cliName, showTimeProfiling } from './config.js'
import { out } from './output.js'

export const timeProfilingOut = (showTimeProfiling)
    ? function timeProfilingOut(name, start, finish) {
        out(chalk.yellow(`[${packageName}] {${name}} time ${finish-start}ms`))
    }
    : function() {}

export const timeProfilingOutSpecial = (showTimeProfiling)
    ? function timeProfilingOutSpecial(name, start, finish) {
        out(chalk.orange(`[${packageName}] {${name}} time ${finish-start}ms`))
    }
    : function() {}