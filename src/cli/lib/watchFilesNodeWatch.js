
import {createTimeProfiler } from 'sxy-dev-tools'
import { showTimeProfiling } from '../../config.js'
import chalk from 'chalk-extensions'
import minimatch from 'minimatch'
import slash from 'slash'
import watch from 'node-watch'
//import chokidar from 'chokidar'
//import nsfw from 'nsfw'
import fs from 'fs'
import { out, log, debug } from '../../output.js'

import { globArgCombine } from './globArgCombine.js'

const { timeProfileAsync } = createTimeProfiler(showTimeProfiling)


export function watchFilesNodeWatch(config, onEvent) {

    timeProfileAsync('start watching', async () => {

        //const testGlobs = addBaseToGlobs(config.testsBase, config.tests)
        //const ignoreGlobs = addBaseToGlobs(config.testsBase, config.testsIgnore)

        // indentify a test file

    
        // identify a file we should be watching and responding to
        const watchFilter =
        sync(
            (file) =>
                (
                    ( ! config.watch.watchFiles )
                    || minimatch(file, globArgCombine(config.watch.watchFiles))
                )
                &&
                (
                    ( ! config.watch.watchFilesIgnore )
                    || ! minimatch(file, globArgCombine(config.watch.watchFilesIgnore))
                )
        )
        
        if ( ! config.watch.watchFilesBase ) {
            out(`No config.watch.watchFilesBase provided, defaulting to '.'`)
            config.watch.watchFilesBase = '.'
        }

        const watcher = watch(
            config.watch.watchFilesBase,
            {
                recursive: true,
                filter: watchFilter
            },
            function(event, filename) {
                filename = slash(filename)
                debug('watch event')
                onEvent(filename, event)
            }
        )

        // wait until the watcher is ready
        await new Promise( (resolve, reject) => {
            watcher.on('ready', resolve)
        })

        return watcher

    })

    //return new Promise( () => {} ) // infinite promise to let us watch

}


