
import { promises as fs, existsSync } from 'fs'
import figures from 'figures'
import objectCopy from 'sxy-lib-object-copy'

import { watchFilesAndRunTestsChokidar } from './watchFilesAndRunTestsChokidar.js'
import { applyConfigDefaults } from './applyConfigDefaults.js'

// watchFiles(config, testFiles, dependencyTrees, failingTests)



mochaDescribe('watchFilesAndRunTestsChokidar() function', function() {
    
    const tempFolder = 'temp/watchFilesAndRunTestsChokidar'

    const baseConfig = applyConfigDefaults({
        testsBase: tempFolder,
        tests: '**/*.test.js',
        watch: {
            watchFilesBase: tempFolder,
            watchFiles: '**/*.js',
        }
    })

    
    mochaIt('should run a test when a test file is changed', async function() {

        //this.timeout(100000)

        const config = objectCopy(baseConfig)
        // ignore the file from the last test, causing load errors
        config.testsIgnore = '**/c.test.js'


        // create a custom out function to capture the output
        let outBuffer = ''
        const customOut = sync((...texts) => {
            outBuffer += texts.join(' ') + '\n' // join and save to the buffer
        })

        const testFileName = 'temp/watchFilesAndRunTestsChokidar/a.test.js'
        const thing = 'Sample test 1'
        const should = '1 should equal 1'

        watchFilesAndRunTestsChokidar(config, [], {}, [], customOut)

        outBuffer.should.equal('')

        fs.writeFile(
            testFileName,
            `import { describe } from '../../dist/index.js'
import { expect, should } from 'chai'
should()

describe('${thing}', ({it}) => {

    it('${should}', () => {
        expect(1).to.equal(1)
    })

})`
        )

        await new Promise( (resolve, reject) => setTimeout(resolve, 1000) )

        outBuffer.should.include(
            testFileName
        )
        outBuffer.should.include(
            thing
        )
        outBuffer.should.include(
            should
        )
        outBuffer.should.include(
            figures.tick
        )
        
    })


    mochaIt('should run a test when a new test file is changed', async function() {
        //this.timeout(100000)

        const config = objectCopy(baseConfig)
        // ignore the file from the last test, causing load errors
        config.testsIgnore = '**/c.test.js'

        // create a custom out function to capture the output
        let outBuffer = ''
        const customOut = sync((...texts) => {
            outBuffer += texts.join(' ') + '\n' // join and save to the buffer
        })

        const testFileName = `${tempFolder}/b.test.js`
        const thing = 'Sample test 2'
        const should = '2 should equal 2'

        if (existsSync(testFileName)) {
            fs.unlink(testFileName)
        }
        
        existsSync(testFileName).should.equal(false)

        watchFilesAndRunTestsChokidar(config, [], {}, [], customOut)

        outBuffer.should.equal('')

        fs.writeFile(
            testFileName,
            `import { describe } from '../../dist/index.js'
import { expect, should } from 'chai'
should()

describe('${thing}', ({it}) => {

    it('${should}', () => {
        expect(2).to.equal(2)
    })

})`
        )

        await new Promise( (resolve, reject) => setTimeout(resolve, 1000) )

        outBuffer.should.include(
            testFileName
        )
        outBuffer.should.include(
            thing
        )
        outBuffer.should.include(
            should
        )
        outBuffer.should.include(
            figures.tick
        )
        
    })
    

    mochaIt('removes a test from tests and dependencyTrees when it is deleted', async function() {
        //this.timeout(100000)

        const config = objectCopy(baseConfig)

        // create a custom out function to capture the output
        let outBuffer = ''
        const customOut = sync((...texts) => {
            outBuffer += texts.join(' ') + '\n' // join and save to the buffer
        })

        const testFileName = `${tempFolder}/c.test.js`
        const thing = 'Sample test 3'
        const should = '3 should equal 3'

        if ( ! existsSync(testFileName)) {
            fs.writeFile(
                testFileName,
                `import { describe } from '../../dist/index.js'
import { expect, should } from 'chai'
should()

describe('${thing}', ({it}) => {

    it('${should}', () => {
        expect(3).to.equal(3)
    })

})`
            )
        }
        
        existsSync(testFileName).should.be.true

        const originalTests = [testFileName]
        const originalDependencyTrees = {
            [testFileName]: [
                'dep-1.js',
                'dep-2.js',
            ]
        }

        const tests = objectCopy(originalTests)
        const dependencyTrees = objectCopy(originalDependencyTrees)

        tests.should.include.members([testFileName])
        dependencyTrees.should.include.keys([testFileName])

        watchFilesAndRunTestsChokidar(config, tests, dependencyTrees, [], customOut)
        
        fs.unlink(testFileName)

        await new Promise( (resolve, reject) => setTimeout(resolve, 1000) )

        tests.should.not.include.members([testFileName])
        dependencyTrees.should.not.include.keys([testFileName])
        
    })

})

