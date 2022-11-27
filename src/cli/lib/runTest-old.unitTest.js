
/*
import { applyConfigDefaults } from './applyConfigDefaults.js'
import { loadTestFile } from './loadTestFile.js'
import { runTest } from './runTest.js'

// loadTestFile(config, testFile) ???

const defaultConfig = applyConfigDefaults({})

const beforeAfterTestFile = 'unitTesting/runTest/beforeAfter.test.js'
const beforeAfterTest = loadTestFile(defaultConfig, beforeAfterTestFile)

mochaDescribe('runTest() function', function() {

    mochaIt('should run a test that was previously loaded from a test file', function() {

        //const config = applyConfigDefaults({})

        const sampleTestFile = 'unitTesting/runTest/1.test.js'
        const sampleTest = loadTestFile(defaultConfig, sampleTestFile)

        const testResult = runTest(defaultConfig, sampleTest)

        //console.log(testResult)
        //console.log(testResult.describeResults[0].itResults)
        //console.log(testResult.describeResults[0].itResultsSummary)

        testResult.should.include.keys([
            'file',
            'success',
            'describeResults',
            'describeResultsSummary'
        ])

        testResult.success.should.equal(true)

        testResult.describeResultsSummary.total.should.equal(1)
        testResult.describeResultsSummary.passes.should.equal(1)
        testResult.describeResultsSummary.itsTotal.should.equal(1)
        testResult.describeResultsSummary.itsPasses.should.equal(1)

    })

    mochaIt("should run beforeEachFile tasks (before - can't test)", function() {

        let functionHasRun = false
        global.beforeEachFileFileHasRun = false

        const ourConfig = {
            beforeEachFile: [
                function() {
                    functionHasRun = true
                },
                'unitTesting/runTest/beforeEachFile.js'
            ]
        }

        const config = applyConfigDefaults(ourConfig)
        
        runTest(config, beforeAfterTest)

        functionHasRun.should.equal(true)
        global.beforeEachFileFileHasRun.should.equal(true)

    })
    
    mochaIt("should run afterEachFile tasks (after - can't test)", function() {

        let functionHasRun = false
        global.afterEachFileFileHasRun = false

        const ourConfig = {
            afterEachFile: [
                function() {
                    functionHasRun = true
                },
                'unitTesting/runTest/afterEachFile.js'
            ]
        }

        const config = applyConfigDefaults(ourConfig)

        runTest(config, beforeAfterTest)

        functionHasRun.should.equal(true)
        global.afterEachFileFileHasRun.should.equal(true)

    })

    mochaIt("should run beforeEachDescribe tasks (before - can't test) each describe block", function() {

        let functionHasRunTimes = 0
        global.beforeEachDescribeFileHasRun = false

        const ourConfig = {
            beforeEachDescribe: [
                function() {
                    functionHasRunTimes++
                },
                'unitTesting/runTest/beforeEachDescribe.js'
            ]
        }

        const config = applyConfigDefaults(ourConfig)
        
        runTest(config, beforeAfterTest)

        functionHasRunTimes.should.equal(2)
        global.beforeEachDescribeFileHasRun.should.equal(true)

    })

    mochaIt("should run afterEachDescribe tasks (after - can't test) each describe block", function() {

        let functionHasRunTimes = 0
        global.afterEachDescribeFileHasRun = false

        const ourConfig = {
            afterEachDescribe: [
                function() {
                    functionHasRunTimes++
                },
                'unitTesting/runTest/afterEachDescribe.js'
            ]
        }

        const config = applyConfigDefaults(ourConfig)
        
        runTest(config, beforeAfterTest)

        functionHasRunTimes.should.equal(2)
        global.afterEachDescribeFileHasRun.should.equal(true)

    })

    mochaIt("should run beforeEachTest tasks (before - can't test) each test/it block", function() {

        let functionHasRunTimes = 0
        global.beforeEachTestbeforeEachFileFileHasRun = false

        const ourConfig = {
            beforeEachTest: [
                function() {
                    functionHasRunTimes++
                },
                'unitTesting/runTest/beforeEachTest.js'
            ]
        }

        const config = applyConfigDefaults(ourConfig)
        
        runTest(config, beforeAfterTest)

        functionHasRunTimes.should.equal(3)
        global.beforeEachTestFileHasRun.should.equal(true)

    })

    mochaIt("should run afterEachTest tasks (after - can't test) each test/it block", function() {

        let functionHasRunTimes = 0
        global.afterEachTestFileFileHasRun = false

        const ourConfig = {
            afterEachTest: [
                function() {
                    functionHasRunTimes++
                },
                'unitTesting/runTest/afterEachTest.js'
            ]
        }

        const config = applyConfigDefaults(ourConfig)
        
        runTest(config, beforeAfterTest)

        functionHasRunTimes.should.equal(3)
        global.afterEachTestFileHasRun.should.equal(true)

    })
    
})
*/