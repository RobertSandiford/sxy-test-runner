
import { defaultConfig } from './defaultConfig.js'
import { showTestLoadingError } from './showTestLoadingError.js'
import { expect } from 'chai'

// showTestLoadingError(config, test) ???

mochaDescribe('showTestLoadingError() function', function() {

    mochaIt('should show the loading error of a test after loading failure', function() {

        const config = defaultConfig

        const test = {
            file: 'foo.js',
            error: 'There was an error'
        }

        // create a custom out function to capture the output
        let outBuffer = ''
        const customOut = sync((...texts) => {
            //console.log('custom out received:', ...texts)
            outBuffer += texts.join(' ') + '\n' // join and save to the buffer
            //console.log('outBuffer:', outBuffer)
        })

        showTestLoadingError(config, test, customOut)

        console.log(outBuffer)

        outBuffer.should.include(test.error)

    })

})

