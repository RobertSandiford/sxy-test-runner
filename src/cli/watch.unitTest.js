
import figures from 'figures'

//import { applyConfigDefaults } from './lib/applyConfigDefaults.js'
import { watch } from './watch.js'

mochaDescribe('watch command', function() {

    mochaIt('should run tests and output results and display correct tallies', async function() {
        this.timeout(10000)

        const originalConsoleLog = console.log
        let consoleLogBuffer = ''
        console.log = sync(function testLog(...texts) {
            consoleLogBuffer += texts.join(' ') + '\n'
        })

        global.commandLineArguments = [
            '--config',
            'unitTesting/watch/sxy-test-runner.config.js'
        ]
        
        promise( watch() )
        await new Promise( (resolve, reject) => { setTimeout(resolve, 8000) } )

        console.log = originalConsoleLog

        //console.log(consoleLogBuffer)

        const testFileName = `unitTesting/watch/1.test.js`
        const thing = 'Sample test 1'
        const should = '1 should equal 1'

        consoleLogBuffer.should.include( testFileName )
        consoleLogBuffer.should.include( thing )
        consoleLogBuffer.should.include( should )
        consoleLogBuffer.should.include( figures.tick )

        consoleLogBuffer.should.include( 'Tests: 3/3' )
        consoleLogBuffer.should.include( 'Items: 2/2' )
        consoleLogBuffer.should.include( 'Test Files: 2/2' )

    })
    

    mochaIt('should run tests and display correct tallies', async function() {
        this.timeout(10000)

        const originalConsoleLog = console.log
        let consoleLogBuffer = ''
        console.log = sync(function testLog(...texts) {
            consoleLogBuffer += texts.join(' ') + '\n'
        })

        global.commandLineArguments = [
            '--config',
            'unitTesting/watch/sxy-test-runner.config.js'
        ]
        
        promise( watch() )
        await new Promise( (resolve, reject) => { setTimeout(resolve, 8000) } )

        console.log = originalConsoleLog
        
        //console.log(consoleLogBuffer)

        const testFileName = `unitTesting/watch/1.test.js`
        const thing = 'Sample test 1'
        const should = '1 should equal 1'

        consoleLogBuffer.should.include( testFileName )
        consoleLogBuffer.should.include( thing )
        consoleLogBuffer.should.include( should )
        consoleLogBuffer.should.include( figures.tick )

    })

    
    mochaIt('should warn us when there are no tests', async function() {
        this.timeout(6000)

        const originalConsoleLog = console.log
        let consoleLogBuffer = ''
        console.log = sync(function testLog(...texts) {
            consoleLogBuffer += texts.join(' ') + '\n'
        })

        global.commandLineArguments = [
            '--config',
            'sxy-test-runner.no-tests.config.js'
        ]

        promise( watch() )
        await new Promise( (resolve, reject) => { setTimeout(resolve, 4000) } )

        console.log = originalConsoleLog

        //console.log('saved console.log output:')
        //console.log(consoleLogBuffer)

        consoleLogBuffer.should.include( 'no tests found' )
        consoleLogBuffer.should.not.include( 'describing' )

    })

    mochaIt('should not run tests when asked not to run initial tests', async function() {
        this.timeout(6000)
    
        const originalConsoleLog = console.log
        let consoleLogBuffer = ''
        console.log = sync(function testLog(...texts) {
            consoleLogBuffer += texts.join(' ') + '\n'
        })
    
        global.commandLineArguments = [
            '--config',
            'sxy-test-runner.no-initial-tests.config.js'
        ]
    
        promise( watch() )
        await new Promise( (resolve, reject) => { setTimeout(resolve, 4000) } )
    
        console.log = originalConsoleLog
    
        //console.log('saved console.log output:')
        //console.log(consoleLogBuffer)
    
        //consoleLogBuffer.should.not.include( 'no tests found' ) // not sure - removing for now
        consoleLogBuffer.should.not.include( 'running initial tests' )
        consoleLogBuffer.should.not.include( 'describing' )
        consoleLogBuffer.should.include( 'watching' )
    
    })

    mochaIt('setup function and setup file from the config should have run', async function() {
        this.timeout(6000)
    
        global.configBasedSetupFunctionRan = false
        global.watchSetupFileHasRun = false

        const originalConsoleLog = console.log
        let consoleLogBuffer = ''
        console.log = sync(function testLog(...texts) {
            consoleLogBuffer += texts.join(' ') + '\n'
        })
    
        global.commandLineArguments = [
            '--config',
            'sxy-test-runner.setup-tasks.config.js'
        ]
    
        promise( watch() )
        await new Promise( (resolve, reject) => {
            setTimeout(resolve, 2000)
        } )
    
        console.log = originalConsoleLog
    
        global.configBasedSetupFunctionRan.should.equal(true)
        global.watchSetupFileHasRun.should.equal(true)
    
    })

})

