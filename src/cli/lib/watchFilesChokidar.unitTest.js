
import { promises as fs } from 'fs'

import { watchFilesChokidar } from './watchFilesChokidar.js'
import { applyConfigDefaults } from './applyConfigDefaults.js'

// watchFiles(config, testFiles, dependencyTrees, failingTests) ???

mochaDescribe('watchFilesChokidar() function', function() {

    mochaIt('should call back when when a file change occurs', async function() {
        this.timeout(12000)

        const config = applyConfigDefaults({})

        let eventComplete = false

        watchFilesChokidar( config, (filename, event) => {
            eventComplete = true
        } )

        fs.writeFile('watchTests/watchFilesChokidar-file.js', 'abc')

        await new Promise( (resolve, reject) => {
            const interval = setInterval(
                () => {
                    if (eventComplete) {
                        clearInterval(interval)
                        resolve()
                    }
                },
                50,
            )
        })

        eventComplete.should.equal(true)
        
    })


    mochaIt('should call back when when a file change occurs in specified folder', async function() {
        this.timeout(12000)

        const config = applyConfigDefaults({
            watch: {
                watchFilesBase: 'watchTests/watchFilesChokidar',
                watchFiles: '**/*.js',
            }
        })

        let eventComplete = false

        watchFilesChokidar( config, (filename, event) => {
            eventComplete = true
        } )

        fs.writeFile('watchTests/watchFilesChokidar/a-file.js', 'abc')

        await new Promise( (resolve, reject) => {
            const interval = setInterval(
                () => {
                    if (eventComplete) {
                        clearInterval(interval)
                        resolve()
                    }
                },
                50,
            )
        })

        eventComplete.should.equal(true)
        
    })

    mochaIt('ignores a file based on ignore glob', async function() {
        this.timeout(12000)

        const config = applyConfigDefaults({
            watch: {
                watchFilesBase: 'watchTests/watchFilesChokidar',
                watchFiles: '**/*.js',
                watchFilesIgnore: 'ignore-file.js'
            }
        })

        let eventComplete = false

        watchFilesChokidar( config, (filename, event) => {
            eventComplete = true
        } )

        fs.writeFile('watchTests/watchFilesChokidar/ignore-file.js', 'abc')

        await new Promise( (resolve, reject) => {
            setTimeout(resolve, 1000)
        })

        eventComplete.should.not.equal(true)
        
    })

    mochaIt('ignores a file based on ignore globs array', async function() {

        //this.timeout(100000)

        const config = applyConfigDefaults({
            watch: {
                watchFilesBase: 'watchTests/watchFilesChokidar',
                watchFiles: '**/*.js',
                watchFilesIgnore: ['first-ignore-file.js', 'ignore-file.js']
            }
        })

        let eventComplete = false

        watchFilesChokidar( config, (filename, event) => {
            eventComplete = true
        } )

        fs.writeFile('watchTests/watchFilesChokidar/ignore-file.js', 'abc')

        await new Promise( (resolve, reject) => {
            setTimeout(resolve, 1000)
        })

        eventComplete.should.not.equal(true)
        
    })

})

