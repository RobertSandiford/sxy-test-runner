
import { join } from 'path'
import { out, log, debug } from '../../output.js'

export function doUserTeardown(config) {
    if (config.teardown) {
        const teardownTasks = ( Array.isArray(config.teardown) ) ? config.teardown : [config.teardown]
        for (const teardownTask of teardownTasks) {
            //console.log( typeof teardownTask, teardownTask)
            switch (typeof teardownTask) {
                case 'function': {
                    teardownTask()
                    break
                }
                case 'string': {
                    import( `file://${join(process.cwd(), teardownTask)}`)
                    break
                }
                default: {
                    out(`Error: teardown entry has an invalid type, expected 'function' or 'string' of an file to import.`)
                    out(`Received ${typeof teardownTask}.`)
                }
            }
        }
    }
}
