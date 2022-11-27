
import { applyConfigDefaults } from './applyConfigDefaults.js'
import { doUserSetup } from './doUserSetup.js'

// applyConfigDefaults( userConfig: {} )

mochaDescribe('the doUserSetup() function', function() {

    mochaIt('executes a user setup function', function() {

        let setupFunctionHasRun = false

        const config = applyConfigDefaults({
            setup: function() {
                setupFunctionHasRun = true
            }
        })

        doUserSetup(config)

        setupFunctionHasRun.should.equal(true)

    }),

    mochaIt('runs a user specified file', function() {

        global.setupFileHasRun = false

        const config = applyConfigDefaults({
            setup: 'unitTesting/setupFiles/setup.js',
        })

        doUserSetup(config)

        global.setupFileHasRun.should.equal(true)

    }),

    mochaIt('runs an array of functions and or files', function() {

        let setupFunction1HasRun = false
        let setupFunction2HasRun = false
        global.setupFile1HasRun = false
        global.setupFile2HasRun = false

        const config = applyConfigDefaults({
            setup: [
                function setup1() {
                    setupFunction1HasRun = true
                },
                function setup2() {
                    setupFunction2HasRun = true
                },
                'unitTesting/setupFiles/setup-1.js',
                'unitTesting/setupFiles/setup-2.js',
            ]
        })

        doUserSetup(config)

        setupFunction1HasRun.should.equal(true)
        setupFunction2HasRun.should.equal(true)
        global.setupFile1HasRun.should.equal(true)
        global.setupFile2HasRun.should.equal(true)

    })

})