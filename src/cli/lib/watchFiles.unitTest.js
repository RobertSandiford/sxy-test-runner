
import { promises as fs } from 'fs'

import { watchFiles } from './watchFiles.js'
import { applyConfigDefaults } from './applyConfigDefaults.js'

// watchFiles(config, callback)

mochaDescribe('watchFiles() function', function() {

    mochaIt('should call back when when a file change occurs', async function() {
        this.timeout(10000)

        const config = applyConfigDefaults({})

        let eventComplete = false

        watchFiles( config, (filename, event) => {
            eventComplete = true
        } )

        fs.writeFile('temp/watchFiles-file.js', 'abc')

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
        this.timeout(10000)
        
        const tempFolder = 'temp/watchFiles'

        const config = applyConfigDefaults({
            watch: {
                watchFilesBase: tempFolder,
                watchFiles: '**/*.js',
            }
        })

        let eventComplete = false

        watchFiles( config, (filename, event) => {
            eventComplete = true
        } )

        fs.writeFile(`${tempFolder}/a-file.js`, 'abc')

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

})

