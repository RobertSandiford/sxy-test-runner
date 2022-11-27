
import { injectProperties } from "./injectProperties.js"
import chalk from 'chalk-extensions'

mochaDescribe('injectProperties() function', function() {

    mochaIt('complains if a reserved property is given', function() {
        
        let outBuffer = ''
        const customOut = sync((...texts) => {
            //console.log(chalk.red`outBuffer1`, outBuffer)
            console.log(...texts)
            outBuffer += texts.join(' ') + '\n' // join and save to the buffer
            //console.log(chalk.red`outBuffer2`, outBuffer)
        })

        const errorString = 'is reserved'

        const basePacket = {}

        let properties
        
        outBuffer = ''
        properties = {
            describe: true
        }
        injectProperties(basePacket, properties, '', customOut)
        outBuffer.should.include(errorString)

        outBuffer = ''
        properties = {
            it: true
        }
        injectProperties(basePacket, properties, '', customOut)
        outBuffer.should.include(errorString)

        outBuffer = ''
        properties = {
            test: true
        }
        injectProperties(basePacket, properties, '', customOut)
        outBuffer.should.include(errorString)

        outBuffer = ''
        properties = {
            before: true
        }
        injectProperties(basePacket, properties, '', customOut)
        outBuffer.should.include(errorString)

        outBuffer = ''
        properties = {
            after: true
        }
        injectProperties(basePacket, properties, '', customOut)
        outBuffer.should.include(errorString)

        outBuffer = ''
        properties = {
            beforeEach: true
        }
        injectProperties(basePacket, properties, '', customOut)
        outBuffer.should.include(errorString)

        outBuffer = ''
        properties = {
            afterEach: true
        }
        injectProperties(basePacket, properties, '', customOut)
        outBuffer.should.include(errorString)

    })
    
    // mochaIt('complains if a passed property conflics with a base property', function() {
        
    //     let outBuffer = ''
    //     const customOut = sync((...texts) => {
    //         console.log(...texts)
    //         outBuffer += texts.join(' ') + '\n' // join and save to the buffer
    //     })

    //     const errorString = 'is reserved'

    //     const basePacket = {}

    //     let properties
        
    //     outBuffer = ''
    //     properties = {
    //         describe: true
    //     }
    //     injectProperties(basePacket, properties, '', customOut)
    //     outBuffer.should.include(errorString)

    // })

})