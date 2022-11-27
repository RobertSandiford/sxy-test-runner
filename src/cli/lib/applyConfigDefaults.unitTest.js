

import { defaultConfig } from './defaultConfig.js'
import { applyConfigDefaults } from './applyConfigDefaults.js'

// applyConfigDefaults( userConfig: {} )

mochaDescribe('applyConfigDefaults() function', function() {

    mochaIt('has sensible defaults when passed an empty user config', function() {

        const finalConfig = applyConfigDefaults({})

        finalConfig.should.include.keys(['tests', 'testsIgnore', 'watch'])

    })

    mochaIt('retains a passed config setting', function() {

        const finalConfig = applyConfigDefaults({
            tests: 'foo'
        })

        //console.log(finalConfig)

        finalConfig.tests.should.equal('foo')

    })

    mochaIt('fills in defaults in a watch object with missing params', function() {

        const finalConfig = applyConfigDefaults({
            watch: {
                watchFilesBase: 'src'
            }
        })

        //console.log(finalConfig)

        finalConfig.watch.watchFiles.should.equal(defaultConfig.watch.watchFiles)

    })

})