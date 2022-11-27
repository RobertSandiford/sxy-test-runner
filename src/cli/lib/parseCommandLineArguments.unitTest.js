

import { parseCommandLineArguments } from './parseCommandLineArguments.js'

// parseCommandLineArguments(allowedArguments)

mochaDescribe('getAllowedFlags() function', function() {

    mochaIt('extracts the flags from an allowedArguments object', function() {

        const allowedArguments = {
            'config': {
                flag: 'c',
                hasValue: true
            },
            'watch': {
                flag: 'w',
                hasValue: false
            },
        }

        global.commandLineArguments = [
            '--config',
            'foo bar'
        ]

        const parsedArgs = parseCommandLineArguments(allowedArguments)

        //console.log('parsed Args', parsedArgs)

        parsedArgs.should.have.key('config')
        parsedArgs.config.should.equal('foo bar')

    })

})