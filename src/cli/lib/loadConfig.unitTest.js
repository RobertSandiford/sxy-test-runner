
import { loadConfig } from "./loadConfig.js"

// loadConfig(location)
// location is option
mochaDescribe('loadConfig() function', function() {

    mochaIt('loads a user config', function() {

        const userConfig = loadConfig()

        userConfig.should.not.be.null

    })

    mochaIt('loads a user config from a location passed to it', function() {

        const configLocation = 'unitTesting/sampleConfig/sxy-test-runner.config.js'
        const userConfig = loadConfig(configLocation)

        userConfig.should.not.be.null
        userConfig.tests.should.equal('alt-config-location')

    })

})