
import { join } from 'path'
import { out, log, debug } from '../../output.js'

import { addExports } from './addExports.js'

export function runTasks(tasks, parcel = undefined) {

    if (tasks) {
        if ( ! Array.isArray(tasks) ) tasks = [tasks]

        const exports = {}

        for (const task of tasks) {
            debug('task', typeof task, task)
            switch (typeof task) {
                case 'function': {
                    const result = (parcel !== undefined) // redundent currently
                        ? task(parcel)
                        : task()
                    addExports(exports, result)
                    break
                }
                case 'string': {
                    const result = import( `file://${join(process.cwd(), task)}`)
                    //console.log
                    addExports(exports, result)
                    break
                }
                default: {
                    out(`Error: task entry has an invalid type, expected 'function' or 'string' of an file to import.`)
                    out(`Received '${typeof task}'.`)
                }
            }
        }

        return exports
    } else {
        debug('no tasks')
        return null
    }

}
