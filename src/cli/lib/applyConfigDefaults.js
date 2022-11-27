
import { mergeStructuredConfig, createTimeProfiler } from 'sxy-dev-tools'
import objectCopy from 'sxy-lib-object-copy'

import { packageName, cliName, configFileName, configLocations, showTimeProfiling } from '../../config.js'
//import chalk from 'chalk-extensions'
//import { out, log, debug } from '../../output.js'

import { defaultConfig } from './defaultConfig.js'

const { timeProfileAsync } = createTimeProfiler(showTimeProfiling)


export function applyConfigDefaults(userConfig) {
   
    return timeProfileAsync('apply config defaults', () => {

        const configStructure = {
            execution: {},
            watch: {}
        }

        //const config = mergeConfig(configStructure, defaultConfig, userConfig)
        const config = mergeStructuredConfig(configStructure, defaultConfig, userConfig)

        // I don't think we need to do these - the glob combine func can handle it
        //if ( ! Array.isArray(config.tests) ) config.tests = [config.tests]
        //if ( ! Array.isArray(config.testsIgnore) ) config.tests = [config.testsIgnore]
        // watchFiles
        // watchFilesIgnore

        //log('final config', config)

        return config
        
    })

}

// is this an old func now replaced?
function mergeConfig(structure, baseConfig, ...extraConfigs) {
    const finalConfig = objectCopy(baseConfig)
    for (const extraConfig of extraConfigs) {
        for (const key in extraConfig) {
            if (key in structure) {
                finalConfig[key] = mergeConfig(
                    structure[key],
                    finalConfig[key],
                    extraConfig[key]
                )
            } else {
                finalConfig[key] = extraConfig[key]
            }
        }
    }
    return finalConfig
}
