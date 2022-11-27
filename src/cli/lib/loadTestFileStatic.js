
/*

I can't remember what this was for.

Would need updating to the new file load system if used

import { createTimeProfiler } from 'sxy-dev-tools'
import { packageName, cliName, configFileName, configLocations, showTimeProfiling } from '../../config.js'
import { join } from 'path'
const { timeProfileAsync } = createTimeProfiler(showTimeProfiling)

// could be used within runTests
// think its not used now

export function loadTestFileStatic(config, testFile) {

    return timeProfileAsync(`load test ${testFile} statically (standard import)`, () => {

        //console.log('loadTestFileStatic', config, testFile)
        
        const projectDir = process.cwd()

        global.testState = {
            describes: [],
            describeCounter: 1
        }

        import( 'file://' + join(projectDir, testFile) )

        const test = {
            file: testFile,
            describes: global.testState.describes
        }

        return test

    } )

}
*/