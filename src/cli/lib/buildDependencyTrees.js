
import { loadConfig as sxyLoadConfig, createTimeProfiler } from 'sxy-dev-tools'
import { packageName, cliName, configFileName, configLocations, showTimeProfiling } from '../../config.js'
import chalk from 'chalk-extensions'
import slash from 'slash'
import { out, log, debug } from '../../output.js'

import { buildDependencyTree } from './buildDependencyTree.js'

const { timeProfileAsync } = createTimeProfiler(showTimeProfiling)


export function buildDependencyTrees(config, testFiles) {

    return timeProfileAsync('build dependency trees', () => {

        const projectDir = process.cwd()
        const dependencyTrees = {}

        for (const testFile of testFiles) {
            //newTest(testFile.replace('./', ''))

            const dependencyTree = buildDependencyTree(config, testFile)
            
            dependencyTrees[testFile] = dependencyTree
            //    .map ( sync( file => immed(immed(slash(file)).slice(projectDir.length + 1) )) )
            //    .filter( sync(f => immed(f !== testFile)) )

                
            debug('final dep tree', dependencyTrees[testFile])
        }

        return dependencyTrees

    })

}




// function newTest(testFile) {
//     debug('new test', testFile)
//     const dependencyTree = buildDependencyTree(testFile)
//     //out('AA dependencyTree', testFile, dependencyTree)
//     dependencyTrees[testFile]
//         = dependencyTree
//             .map ( file => slash(file).slice(projectDir.length + 1) )
//             .filter(f => f !== testFile)
// }

