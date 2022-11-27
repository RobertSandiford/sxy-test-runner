
import { applyConfigDefaults } from './applyConfigDefaults.js'
import { runTests } from './runTests.js'

// runTests(config, testFiles, failingTests)

mochaDescribe('runTests() function', function() {

    mochaIt('should run provided test files and produce an output of results', function() {

        // create a custom out function to capture the output
        let outBuffer = ''
        const customOut = sync((...texts) => {
            outBuffer += texts.join(' ') + '\n' // join and save to the buffer
        })

        const config = applyConfigDefaults({})

        const testFiles = [
            'unitTesting/sampleTests/1.test.js'
        ]

        const results = runTests(config, testFiles, [], customOut)

        //console.log(results)

        //console.log(outBuffer)

        outBuffer.should.include('1 should equal 1')
        outBuffer.should.include('Tests: 1/1')
        outBuffer.should.include('Items: 1/1')
        outBuffer.should.include('Test Files: 1/1')

    })

    mochaIt('should sensibly handle tallies when test files with no describes are included', function() {

        // create a custom out function to capture the output
        let outBuffer = ''
        const customOut = sync((...texts) => {
            outBuffer += texts.join(' ') + '\n' // join and save to the buffer
        })

        const config = applyConfigDefaults({})

        const testFiles = [
            'unitTesting/sampleTests/1.test.js',
            'unitTesting/sampleTests/blank.test.js',
            'unitTesting/sampleTests/describesWithoutTests.test.js'
        ]

        const results = runTests(config, testFiles, [], customOut)

        //console.log('results', results)

        //console.log('outBuffer', outBuffer)

        outBuffer.should.include('1 should equal 1')
        outBuffer.should.include('Tests: 1/1')
        outBuffer.should.include('Items: 1/1')
        outBuffer.should.include('(+2 describes without tests)')
        outBuffer.should.include('Test Files: 1/1')
        outBuffer.should.include('(+2 files without tests)')

    })

    mochaIt('runs test files sequentially in test mode', function() {

        // create a custom out function to capture the output
        // let outBuffer = ''
        // const customOut = sync((...texts) => {
        //     outBuffer += texts.join(' ') + '\n' // join and save to the buffer
        // })

        const config = applyConfigDefaults({ execution: { files: 'sequential' } })

        const testFiles = [
            'unitTesting/runTests/sequential/1.test.js',
            'unitTesting/runTests/sequential/2.test.js',
        ]

        const results = runTests(config, testFiles, [])

        global.sequential1Status.should.be.true
        global.sequential2Status.should.be.true

    })

})
