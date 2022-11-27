
import { promises as fs } from 'fs'

import { watchFilesNodeWatch } from './watchFilesNodeWatch.js'
import { applyConfigDefaults } from './applyConfigDefaults.js'

// watchFiles(config, callback)

mochaDescribe('watchFilesNodeWatch() function', function() {

    mochaIt('should call back when when a file change occurs', async function() {

        //this.timeout(100000)

        const config = applyConfigDefaults({})

        let eventComplete = false

        watchFilesNodeWatch( config, (filename, event) => {
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

        //this.timeout(100000)
        const tempFolder = 'temp/watchFilesNodeWatcher'

        const config = applyConfigDefaults({
            watch: {
                watchFilesBase: tempFolder,
                watchFiles: '**/*.js',
            }
        })

        let eventComplete = false

        watchFilesNodeWatch( config, (filename, event) => {
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

