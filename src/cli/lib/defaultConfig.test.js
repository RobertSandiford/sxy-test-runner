

import { defaultConfig } from './defaultConfig.js'

// applyConfigDefaults( userConfig: {} )

mochaDescribe('the defaultConfig', function() {

    mochaIt('has sensible defaults', function() {

        defaultConfig.should.include.keys(['tests', 'testsIgnore', 'watch'])

    })

})