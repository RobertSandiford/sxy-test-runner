
import { out as mainOut, log, debug } from '../../output.js'

export function validateConfig(config, customOut = undefined) {

    const out = (customOut)
        ? (...texts) => customOut(...texts)
        : (...texts) => mainOut(...texts)
    
        
    if (config.execution === undefined) {
        const message = `Config error, config.execution is not defined`
        doError(message)
    }

    if (config.execution.files !== 'parallel' && config.execution.files !== 'sequential') {
        const message = `Config error, config.execution.files should be 'parallel' or 'sequential'`
        doError(message)
    }

    if (config.execution.describes !== 'parallel' && config.execution.describes !== 'sequential') {
        const message = `Config error, config.execution.describes should be 'parallel' or 'sequential'`
        doError(message)
    }

    if (config.execution.tests !== 'parallel' && config.execution.tests !== 'sequential') {
        const message = `Config error, config.execution.tests should be 'parallel' or 'sequential'`
        doError(message)
    }



    function doError(message) {
        out(message)
        throw new Error(message)
    }

}

