
import { applyConfigDefaults } from './applyConfigDefaults.js'
import { validateConfig } from './validateConfig.js'
// loadTestFile(config, testFile) ???

import { makeCustomOut } from '../../../unitTesting/makeCustomOut.js'

mochaDescribe('validateConfig() function', function() {

    mochaIt('complains if execution values are not valid', function() {

        const customOut = makeCustomOut()

        const config = applyConfigDefaults({
            execution: {
                files: 'typo'
            }
        })

        try {
            validateConfig(config, customOut)
        } catch (e) { } // eslint-disable-line

        customOut.getOutBuffer().should.include('Config error')
        customOut.getOutBuffer().should.include('execution.files')

    })

})

