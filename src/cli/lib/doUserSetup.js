
import { join } from 'path'
import { out, log, debug } from '../../output.js'

export function doUserSetup(config) {
    if (config.setup) {
        const setupTasks = ( Array.isArray(config.setup) ) ? config.setup : [config.setup]
        for (const setupTask of setupTasks) {
            //console.log( typeof setupTask, setupTask)
            switch (typeof setupTask) {
                case 'function': {
                    setupTask()
                    break
                }
                case 'string': {
                    import( `file://${join(process.cwd(), setupTask)}`)
                    break
                }
                default: {
                    out(`Error: setup entry has an invalid type, expected 'function' or 'string' of an file to import.`)
                    out(`Received ${typeof setupTask}.`)
                }
            }
        }
    }
}
