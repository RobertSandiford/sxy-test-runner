
import { applyConfigDefaults } from './applyConfigDefaults.js'
import { loadTestFile } from './loadTestFile.js'
import { runDescribeRun } from './runDescribeRun.js'
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
        //console.log('sample describe', sampleDescribe)
        const describeResult = runDescribeRun(defaultConfig, sampleDescribe, parsedDescribe)
        
        //console.log('describe result', describeResult)


        //console.log(testResult.describeResults[0].itResults)
        //console.log(testResult.describeResults[0].itResultsSummary)

        describeResult.should.include.keys([
            'counter',
            'thing',
            'success',
            'itResults',
            'itResultsSummary',
        ])

        describeResult.success.should.equal(true)

        describeResult.itResultsSummary.total.should.equal(1)
        describeResult.itResultsSummary.passes.should.equal(1)

    })
    

    // mochaIt('should return sensible results from a test file without any describes', function() {

    //     //const config = applyConfigDefaults({})

    //     const sampleTestFile = 'unitTesting/sampletests/blank.test.js'
    //     const sampleTest = loadTestFile(defaultConfig, sampleTestFile)

    //     const testResult = runTest(defaultConfig, sampleTest)

    //     //console.log(testResult)
    //     //console.log(testResult.describeResults[0].itResults)
    //     //console.log(testResult.describeResults[0].itResultsSummary)

    //     testResult.should.include.keys([
    //         'file',
    //         'success',
    //         'describeResults',
    //         'describeResultsSummary'
    //     ])

    //     chaiExpect(testResult.success).to.be.null

    //     //testResult.describeResultsSummary.total.should.equal(1)
    //     //testResult.describeResultsSummary.passes.should.equal(1)
    //     //testResult.describeResultsSummary.itsTotal.should.equal(1)
    //     //testResult.describeResultsSummary.itsPasses.should.equal(1)

    // })

    
    // mochaIt('should return sensible results from a test file with describes without any its/tests', function() {

    //     //const config = applyConfigDefaults({})

    //     const sampleTestFile = 'unitTesting/sampletests/describesWithoutTests.test.js'
    //     const sampleTest = loadTestFile(defaultConfig, sampleTestFile)

    //     const testResult = runTest(defaultConfig, sampleTest)

    //     //console.log(testResult)
    //     //console.log(testResult.describeResults[0].itResults)
    //     //console.log(testResult.describeResults[0].itResultsSummary)

    //     testResult.should.include.keys([
    //         'file',
    //         'success',
    //         'describeResults',
    //         'describeResultsSummary'
    //     ])

    //     chaiExpect(testResult.success).to.be.null

    //     testResult.describeResultsSummary.total.should.equal(0)
    //     testResult.describeResultsSummary.passes.should.equal(0)
    //     testResult.describeResultsSummary.invalid.should.equal(2)
    //     testResult.describeResultsSummary.itsTotal.should.equal(0)
    //     testResult.describeResultsSummary.itsPasses.should.equal(0)

    // })
    


    // mochaIt("should run beforeEachFile tasks (before - can't test)", function() {

    //     let functionHasRun = false
    //     global.beforeEachFileFileHasRun = false

    //     const ourConfig = {
    //         beforeEachFile: [
    //             function() {
    //                 functionHasRun = true
    //             },
    //             'unitTesting/runTest/beforeEachFile.js'
    //         ]
    //     }

    //     const config = applyConfigDefaults(ourConfig)
        
    //     runTest(config, beforeAfterTest)

    //     functionHasRun.should.equal(true)
    //     global.beforeEachFileFileHasRun.should.equal(true)

    // })
    
    // mochaIt("should run afterEachFile tasks (after - can't test)", function() {

    //     let functionHasRun = false
    //     global.afterEachFileFileHasRun = false

    //     const ourConfig = {
    //         afterEachFile: [
    //             function() {
    //                 functionHasRun = true
    //             },
    //             'unitTesting/runTest/afterEachFile.js'
    //         ]
    //     }

    //     const config = applyConfigDefaults(ourConfig)

    //     runTest(config, beforeAfterTest)

    //     functionHasRun.should.equal(true)
    //     global.afterEachFileFileHasRun.should.equal(true)

    // })

    // mochaIt("should run beforeEachDescribe tasks (before - can't test) each describe block", function() {

    //     let functionHasRunTimes = 0
    //     global.beforeEachDescribeFileHasRun = false

    //     const ourConfig = {
    //         beforeEachDescribe: [
    //             function() {
    //                 functionHasRunTimes++
    //             },
    //             'unitTesting/runTest/beforeEachDescribe.js'
    //         ]
    //     }

    //     const config = applyConfigDefaults(ourConfig)
        
    //     runTest(config, beforeAfterTest)

    //     functionHasRunTimes.should.equal(2)
    //     global.beforeEachDescribeFileHasRun.should.equal(true)

    // })

    // mochaIt("should run afterEachDescribe tasks (after - can't test) each describe block", function() {

    //     let functionHasRunTimes = 0
    //     global.afterEachDescribeFileHasRun = false

    //     const ourConfig = {
    //         afterEachDescribe: [
    //             function() {
    //                 functionHasRunTimes++
    //             },
    //             'unitTesting/runTest/afterEachDescribe.js'
    //         ]
    //     }

    //     const config = applyConfigDefaults(ourConfig)
        
    //     runTest(config, beforeAfterTest)

    //     functionHasRunTimes.should.equal(2)
    //     global.afterEachDescribeFileHasRun.should.equal(true)

    // })

    // mochaIt("should run beforeEachTest tasks (before - can't test) each test/it block", function() {

    //     let functionHasRunTimes = 0
    //     global.beforeEachTestbeforeEachFileFileHasRun = false

    //     const ourConfig = {
    //         beforeEachTest: [
    //             function() {
    //                 functionHasRunTimes++
    //             },
    //             'unitTesting/runTest/beforeEachTest.js'
    //         ]
    //     }

    //     const config = applyConfigDefaults(ourConfig)
        
    //     runTest(config, beforeAfterTest)

    //     functionHasRunTimes.should.equal(3)
    //     global.beforeEachTestFileHasRun.should.equal(true)

    // })

    // mochaIt("should run afterEachTest tasks (after - can't test) each test/it block", function() {

    //     let functionHasRunTimes = 0
    //     global.afterEachTestFileFileHasRun = false

    //     const ourConfig = {
    //         afterEachTest: [
    //             function() {
    //                 functionHasRunTimes++
    //             },
    //             'unitTesting/runTest/afterEachTest.js'
    //         ]
    //     }

    //     const config = applyConfigDefaults(ourConfig)
        
    //     runTest(config, beforeAfterTest)

    //     functionHasRunTimes.should.equal(3)
    //     global.afterEachTestFileHasRun.should.equal(true)

    // })
    

    // // exports provision to test file

    // // current beforeEachFile exports aren't provided
    // // perhaps extend sxy-loader to allow this

    // mochaIt("should pass exported/returned data from beforeEachDescribe tasks", function() {

    //     const testFile = 'unitTesting/runTest/beforeEachDescribe.test.js'
    //     const test = loadTestFile(defaultConfig, testFile)

    //     const ourConfig = {
    //         beforeEachDescribe: [
    //             function() {
    //                 return { functionThing : 'foo' }
    //             },
    //             'unitTesting/runTest/beforeEachDescribeExport.js'
    //         ]
    //     }

    //     const config = applyConfigDefaults(ourConfig)
        
    //     runTest(config, test)

    //     global.functionThing.should.equal('foo')
    //     global.fileThing.should.equal('bar')

    // })

    // mochaIt("should pass exported/returned data from beforeEachTest tasks", function() {

    //     const testFile = 'unitTesting/runTest/beforeEachTest.test.js'
    //     const test = loadTestFile(defaultConfig, testFile)

    //     const ourConfig = {
    //         beforeEachTest: [
    //             function() {
    //                 return { functionThing : 'foo' }
    //             },
    //             'unitTesting/runTest/beforeEachTestExport.js'
    //         ]
    //     }

    //     const config = applyConfigDefaults(ourConfig)
        
    //     runTest(config, test)

    //     global.functionThing.should.equal('foo')
    //     global.fileThing.should.equal('bar')

    // })



    // // exports pass through

    // mochaIt("beforeEachFile exports are passed through to afterEachFile", function() {

    //     // don't try to reload test, fails due to module caching
    //     //const testFile = 'unitTesting/runTest/beforeAfter.test.js'
    //     //const test = loadTestFile(defaultConfig, testFile)

    //     let exports

    //     const ourConfig = {
    //         beforeEachFile: [
    //             function() {
    //                 return { functionThing : 'foo' }
    //             },
    //             'unitTesting/runTest/beforeEachExport.js'
    //         ],
    //         afterEachFile: [
    //             function(theExports) {
    //                 theExports.should.have.keys(['functionThing', 'fileThing'])
    //                 exports = theExports
    //             },
    //         ]
    //     }

    //     const config = applyConfigDefaults(ourConfig)
        
    //     runTest(config, beforeAfterTest)

    //     exports.functionThing.should.equal('foo')
    //     exports.fileThing.should.equal('bar')
        
    // })

    // mochaIt("beforeEachDescribe exports are passed through to afterEachDescribe", function() {

    //     // don't try to reload test, fails due to module caching
    //     //const testFile = 'unitTesting/runTest/beforeAfter.test.js'
    //     //const test = loadTestFile(defaultConfig, testFile)

    //     let exports

    //     const ourConfig = {
    //         beforeEachDescribe: [
    //             function() {
    //                 return { functionThing : 'foo' }
    //             },
    //             'unitTesting/runTest/beforeEachExport.js'
    //         ],
    //         afterEachDescribe: [
    //             function(theExports) {
    //                 exports = theExports
    //             },
    //         ]
    //     }

    //     const config = applyConfigDefaults(ourConfig)
        
    //     runTest(config, beforeAfterTest)

    //     //console.log('exports', exports)

    //     exports.functionThing.should.equal('foo')
    //     exports.fileThing.should.equal('bar')

        
    // })

    // mochaIt("beforeEachTest exports are passed through to afterEachTest", function() {

    //     // don't try to reload test, fails due to module caching
    //     //const testFile = 'unitTesting/runTest/beforeAfter.test.js'
    //     //const test = loadTestFile(defaultConfig, testFile)

    //     let exports

    //     const ourConfig = {
    //         beforeEachTest: [
    //             function() {
    //                 return { functionThing : 'foo' }
    //             },
    //             'unitTesting/runTest/beforeEachExport.js'
    //         ],
    //         afterEachTest: [
    //             function(theExports) {
    //                 exports = theExports
    //             },
    //         ]
    //     }

    //     const config = applyConfigDefaults(ourConfig)
        
    //     runTest(config, beforeAfterTest)

    //     //console.log('exports', exports)

    //     exports.functionThing.should.equal('foo')
    //     exports.fileThing.should.equal('bar')
       
    // })

    // mochaIt("we can run code beforeEachTest and afterEachTest from within the test file", function() {

    //     // don't try to reload test, fails due to module caching
    //     const testFile = 'unitTesting/runTest/internalBeforeAfterEachTest.test.js'
    //     const test = loadTestFile(defaultConfig, testFile)

    //     const config = applyConfigDefaults({})
        
    //     global.internalBeforeEachTestRanNTimes = 0
    //     global.internalAfterEachTestRanNTimes = 0
    //     runTest(config, test)

    //     global.internalBeforeAfterEachTest_test1Valid.should.equal(true)
    //     global.internalBeforeAfterEachTest_test2Valid.should.equal(true)
    //     global.internalBeforeAfterEachTest_test3Valid.should.equal(true)
    //     global.internalBeforeEachTestRanNTimes.should.equal(3)
    //     global.internalAfterEachTestRanNTimes.should.equal(3)
       
    // })

    // mochaIt("we can run code afterDescribe from within descibe in the test file", function() {

    //     // don't try to reload test, fails due to module caching
    //     const testFile = 'unitTesting/runTest/internalAfterDescribeTest.test.js'
    //     const test = loadTestFile(defaultConfig, testFile)

    //     const config = applyConfigDefaults({})
        
    //     global.internalAfterDescribeRanNTimes = 0
    //     runTest(config, test)

    //     //global.internalAfterDescribe_test1Valid.should.equal(true)
    //     //global.internalAfterDescribe_test2Valid.should.equal(true)
    //     global.internalAfterDescribeRanNTimes.should.equal(2)
       
    // })
    

})