
import { loadConfig as sxyLoadConfig, createTimeProfiler } from 'sxy-dev-tools'
import { packageName, cliName, configFileName, configLocations, showTimeProfiling } from '../../config.js'
import chalk from 'chalk-extensions'
import { globby } from 'globby'
import { out, log, debug } from '../../output.js'

const { timeProfileAsync } = createTimeProfiler(showTimeProfiling)

import { addBasePath } from './addBasePath.js'

export function findTestFiles(config) {

    return timeProfileAsync('find test files', () => {
        
        const testsGlobs = addBasePath(config.testsBase, config.tests)
        const testsIgnoreGlobs = addBasePath(config.testsBase, config.testsIgnore)

        debug('testsGlobs', testsGlobs)
        debug('testsIgnoreGlobs', testsIgnoreGlobs)

        const globOptions = {
            //cwd: projectDir,
            ignore: testsIgnoreGlobs
        }

        const testFiles = globby(testsGlobs, testsIgnoreGlobs)

        debug('testFiles', testFiles)

        return testFiles

    })

}
