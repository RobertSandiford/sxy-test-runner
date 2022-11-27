

import { applyConfigDefaults } from './applyConfigDefaults.js'
import { buildDependencyTree } from './buildDependencyTree.js'

import { join } from 'path'

// buildDependencyTree(config, file)
// config:
// file: relative to config.watch.watchFilesBase

mochaDescribe('buildDependencyTree() function', function() {

    mochaIt('identifies the dependencies for a js file passed to it', function() {

        // get the default configs
        const config = applyConfigDefaults({})

        const sampleFile = join('unitTesting/sampleFiles/c.js')
        const depTree = buildDependencyTree(config, sampleFile)

        depTree.should.have.members([
            'unitTesting/sampleFiles/a.js',
            'unitTesting/sampleFiles/b.js'
        ])

    })

})