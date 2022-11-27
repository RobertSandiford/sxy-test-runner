
import { applyConfigDefaults } from './applyConfigDefaults.js'
import { loadTestFile } from './loadTestFile.js'
import { parseDescribe } from './parseDescribe.js'

const defaultConfig = applyConfigDefaults({})

// const beforeAfterTestFile = 'unitTesting/runTest/beforeAfter.test.js'
// const beforeAfterTest = loadTestFile(defaultConfig, beforeAfterTestFile)

mochaDescribe('runDescribe() function', function() {

    mochaIt('should run an it block that was loaded from a test file', function() {

        const sampleTestFile = 'unitTesting/runTest/1.test.js'
        const sampleTest = loadTestFile(defaultConfig, sampleTestFile)
        const sampleDescribe = sampleTest.describes[0]

        const parsedDescribe = parseDescribe(defaultConfig, sampleDescribe)

        parsedDescribe.should.include.keys([
            'its',
            'beforeDescribeExports',
            'afterDescribeFunc',
            'beforeEachTestFunc',
            'afterEachTestFunc',
        ])

        //console.log('parsedDescribe', parsedDescribe)

        parsedDescribe.its[0]['should'].should.equal('1 should equal 1')

    })

})