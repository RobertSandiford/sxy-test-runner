/*
import figures from 'figures'

import { once } from './once.js'

mochaDescribe('once command', function() {

    mochaIt('should run tests and output results', async function() {
        this.timeout(12000)

        const originalConsoleLog = console.log
        let consoleLogBuffer = ''
        console.log = sync(function testLog(...texts) {
            consoleLogBuffer += texts.join(' ') + '\n'
        })

        global.commandLineArguments = []
        
        promise( once() )
        await new Promise( (resolve, reject) => { setTimeout(resolve, 8000) } )

        console.log = originalConsoleLog
        
        console.log(consoleLogBuffer)
        
        const testFileName = `trialTests/example.test.js`
        const thing = 'The example'
        const should = '1 should equal 1'

        consoleLogBuffer.should.include( testFileName )
        consoleLogBuffer.should.include( thing )
        consoleLogBuffer.should.include( should )
        consoleLogBuffer.should.include( figures.tick )

    })

})

*/