
import { defaultConfig } from './defaultConfig.js'
import { showTestResult } from './showTestResult.js'
import { applyConfigDefaults } from './applyConfigDefaults.js'
import { loadTestFile } from './loadTestFile.js'
import { runTest } from './runTest.js'


// loadTestFile(config, testFile) ???

mochaDescribe('showTestResult() function', function() {

    mochaIt('should show the result of a single test that has been run', function() {

        const config = defaultConfig

        const sampleTestResult = {
            file: 'unitTesting/sampleTests/1.test.js',
            success: true,
            logs: [],
            describeResults: [
                {
                    counter: 1,
                    thing: 'Sample test 1',
                    success: true,
                    logs: [],
                    itResults: [
                        {
                            counter: 1,
                            should: '1 should equal 1',
                            success: true,
                            logs: [],
                            time: 1,
                            error: undefined
                        }
                    ],
                    itResultsSummary: {
                        total: 1,
                        passes: 1
                    }
                }
            ],
            describeResultsSummary: {
                total: 1,
                passes: 1,
                itsTotal: 1,
                itsPasses: 1
            }
        }

        // create a custom out function to capture the output
        let outBuffer = ''
        const customOut = sync((...texts) => {
            //console.log('custom out received:', ...texts)
            outBuffer += texts.join(' ') + '\n' // join and save to the buffer
            //console.log('outBuffer:', outBuffer)
        })

        showTestResult(config, sampleTestResult, customOut)
        
        //console.log(outBuffer)

        outBuffer.should.include(
            sampleTestResult.file
        )

        //console.log('---', sampleTestResult.describeResults[0].thing)
        outBuffer.should.include(
            sampleTestResult.describeResults[0].thing
        )

        outBuffer.should.include(
            sampleTestResult.describeResults[0].itResults[0].should
        )

    })

    mochaIt('should show the result of a test with an error', function() {

        const config = defaultConfig

        let error
        try {
            chaiExpect(1).to.equal(2)
        } catch (e) {
            error = e
        }

        const sampleTestResult = {
            file: 'unitTesting/sampleTests/1.test.js',
            success: true,
            logs: [],
            describeResults: [
                {
                    counter: 1,
                    thing: 'Sample test 1',
                    success: true,
                    logs: [],
                    itResults: [
                        {
                            counter: 1,
                            should: '1 should equal 2',
                            success: false,
                            logs: [],
                            error
                        }
                    ],
                    itResultsSummary: {
                        total: 1,
                        passes: 1
                    }
                }
            ],
            describeResultsSummary: {
                total: 1,
                passes: 1,
                itsTotal: 1,
                itsPasses: 1
            }
        }

        // create a custom out function to capture the output
        let outBuffer = ''
        const customOut = sync((...texts) => {
            //console.log('custom out received:', ...texts)
            outBuffer += texts.join(' ') + '\n' // join and save to the buffer
            //console.log('outBuffer:', outBuffer)
        })

        showTestResult(config, sampleTestResult, customOut)
        
        //console.log(outBuffer)

        outBuffer.should.include('AssertionError')
        outBuffer.should.include('expected 1 to equal 2')

    })

    mochaIt('shows test results including captured log output', function() {

        const config = defaultConfig

        const sampleTestResult = {
            file: 'unitTesting/sampleTests/1.test.js',
            success: true,
            logs: [],
            describeResults: [
                {
                    counter: 1,
                    thing: 'Sample test 1',
                    success: true,
                    logs: [
                        ['foo']
                    ],
                    itResults: [
                        {
                            counter: 1,
                            should: '1 should equal 1',
                            success: true,
                            time: 1,
                            error: undefined,
                            logs: [
                                ['bar']
                            ]
                        }
                    ],
                    itResultsSummary: {
                        total: 1,
                        passes: 1
                    }
                }
            ],
            describeResultsSummary: {
                total: 1,
                passes: 1,
                itsTotal: 1,
                itsPasses: 1
            }
        }

        // create a custom out function to capture the output
        let outBuffer = ''
        const customOut = sync((...texts) => {
            //console.log('custom out received:', ...texts)
            outBuffer += texts.join(' ') + '\n' // join and save to the buffer
            //console.log('outBuffer:', outBuffer)
        })

        showTestResult(config, sampleTestResult, customOut)
        
        //console.log(outBuffer)

        outBuffer.should.include(
            sampleTestResult.file
        )

        //console.log('---', sampleTestResult.describeResults[0].thing)
        outBuffer.should.include(
            sampleTestResult.describeResults[0].thing
        )

        outBuffer.should.include(
            'foo'
        )

        outBuffer.should.include(
            sampleTestResult.describeResults[0].itResults[0].should
        )

        outBuffer.should.include(
            'bar'
        )

    })


    mochaIt('shows test results including captured log output with a complex file', function() {

        const config = applyConfigDefaults({
            execution: {
                files: 'sequential',
                describes: 'sequential',
                tests: 'sequential'
            }
        })

        const sampleTestFile = 'unitTesting/sampleTests/logging.test.js'
        const sampleTest = loadTestFile(config, sampleTestFile)
        const testResult = runTest(config, sampleTest)

        // create a custom out function to capture the output
        let outBuffer = ''
        const customOut = sync((...texts) => {
            //console.log('custom out received:', ...texts)
            outBuffer += texts.join(' ') + '\n' // join and save to the buffer
            //console.log('outBuffer:', outBuffer)
        })

        showTestResult(config, testResult, customOut)
        
        console.log(outBuffer)

        outBuffer.should.include(
            testResult.file
        )

        //console.log('---', sampleTestResult.describeResults[0].thing)
        outBuffer.should.include(
            testResult.describeResults[0].thing
        )

        outBuffer.should.include(
            testResult.describeResults[0].itResults[0].should
        )

        outBuffer.should.include( '1st test log' )
        outBuffer.should.include( '3rd test log' )
        outBuffer.should.include( '4th test log' )
        outBuffer.should.include( '6th test log' )
        
    })

})


