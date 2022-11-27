
import { loadTestFile } from "./loadTestFile.js"
import { defaultConfig } from './defaultConfig.js'

// loadTestFile(config, testFile) ???

mochaDescribe('loadTestFile() function', function() {
/*
    mochaIt('should load a test file, retreiving describes', function() {

        const config = defaultConfig

        const sampleTestFile = 'unitTesting/sampleTests/1.test.js'

        const test = loadTestFile(config, sampleTestFile)

        test.describes.length.should.equal(1)
        test.describes.at(-1).counter.should.equal(1)
        test.describes[0].tests.should.be.a('function')
        //test.describes.at(-1).its.at(-1).counter.should.equal(1)

    })

    mochaIt('should correctly load a second test file', function() {

        const config = defaultConfig

        const sampleTestFile = 'unitTesting/sampleTests/2.test.js'

        const test = loadTestFile(config, sampleTestFile)

        test.describes.length.should.equal(1)
        test.describes.at(-1).counter.should.equal(1)
        test.describes[0].tests.should.be.a('function')
        //test.describes.at(-1).its.at(-1).counter.should.equal(2)

    })
*/
    mochaIt('should correctly load a file with describes without any its/tests', function() {

        const config = defaultConfig

        const sampleTestFile = 'unitTesting/sampleTests/describesWithoutTests.test.js'

        const test = loadTestFile(config, sampleTestFile)

        //console.log('ut test', test)

        test.describes.length.should.equal(2)
        test.describes.at(-1).counter.should.equal(2)
        test.describes[0].tests.should.be.a('function')
        //test.describes.at(-1).its.at(-1).counter.should.equal(2)

    })

})