

import { applyConfigDefaults } from './applyConfigDefaults.js'
import { buildDependencyTrees } from './buildDependencyTrees.js'

import { join } from 'path'

// buildDependencyTrees(config, files)
// config:
// files: relative to config.watch.watchFilesBase

mochaDescribe('buildDependencyTrees() function', function() {

    mochaIt('identifies the dependencies for multiple js files', function() {

        // get the default configs
        const config = applyConfigDefaults({})

        const sampleFiles = [
            'unitTesting/sampleFiles/c.js',
            'unitTesting/sampleFiles/d.js',
        ]

        const depTrees = buildDependencyTrees(config, sampleFiles)

        depTrees.should.have.keys(sampleFiles)

        depTrees[sampleFiles[0]].should.have.members([
            'unitTesting/sampleFiles/a.js',
            'unitTesting/sampleFiles/b.js'
        ])

        depTrees[sampleFiles[1]].should.have.members([
            'unitTesting/sampleFiles/a.js',
        ])

    })

})