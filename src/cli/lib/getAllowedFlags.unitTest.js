

import { getAllowedFlags } from './getAllowedFlags.js'

// findTestFiles(config)

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

        const allowedFlags = getAllowedFlags(allowedArguments)

        allowedFlags.should.have.keys([
            'c',
            'w'
        ])

        allowedFlags.c.should.equal('config')
        allowedFlags.w.should.equal('watch')

    })

})