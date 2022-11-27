
import { out as mainOut, log, debug, out } from '../../output.js'

export function addExports(exports, newProperties, event, from, customOut = undefined) {
    for (const key in newProperties) {
        if (key in exports) {
            const message = `Error loading '${event}' task exports, key '${key}' has already been exported`
            out(message)
            throw new Error(message)
        } else {
            exports[key] = newProperties[key]
        }
    }
}