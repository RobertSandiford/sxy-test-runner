

import { applyConfigDefaults } from './applyConfigDefaults.js'
import { findTestFiles } from './findTestFiles.js'

// findTestFiles(config)

mochaDescribe('findTestFiles() function', function() {

    mochaIt('finds the tests files', function() {

        // get the default configs
        const config = applyConfigDefaults({ tests: 'unitTesting/**/*.test.js' })

        const testFiles = findTestFiles(config)

        testFiles.should.include.members([
            'unitTesting/sampleTests/1.test.js',
            'unitTesting/sampleTests/2.test.js',
        ])

    })

    mochaIt('respects tests base config entry', function() {

        // get the default configs
        const config = applyConfigDefaults({
            testsBase: 'src',
            tests: 'unitTesting/**/*.test.js'
        })

        const testFiles = findTestFiles(config)

        testFiles.length.should.equal(0)

    })

})