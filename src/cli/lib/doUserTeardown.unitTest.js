
import { applyConfigDefaults } from './applyConfigDefaults.js'
import { doUserTeardown } from './doUserTeardown.js'

// applyConfigDefaults( userConfig: {} )

mochaDescribe('the doUserTeardown() function', function() {

    mochaIt('executes a user teardown function', function() {

        let teardownFunctionHasRun = false

        const config = applyConfigDefaults({
            teardown: function() {
                teardownFunctionHasRun = true
            }
        })

        doUserTeardown(config)

        teardownFunctionHasRun.should.equal(true)

    }),

    mochaIt('runs a user specified file', function() {

        global.teardownFileHasRun = false

        const config = applyConfigDefaults({
            teardown: 'unitTesting/teardownFiles/teardown.js',
        })

        doUserTeardown(config)

        global.teardownFileHasRun.should.equal(true)

    }),

    mochaIt('runs an array of functions and or files', function() {

        let teardownFunction1HasRun = false
        let teardownFunction2HasRun = false
        global.teardownFile1HasRun = false
        global.teardownFile2HasRun = false

        const config = applyConfigDefaults({
            teardown: [
                function teardown1() {
                    teardownFunction1HasRun = true
                },
                function teardown2() {
                    teardownFunction2HasRun = true
                },
                'unitTesting/teardownFiles/teardown-1.js',
                'unitTesting/teardownFiles/teardown-2.js',
            ]
        })

        doUserTeardown(config)

        teardownFunction1HasRun.should.equal(true)
        teardownFunction2HasRun.should.equal(true)
        global.teardownFile1HasRun.should.equal(true)
        global.teardownFile2HasRun.should.equal(true)

    })

})