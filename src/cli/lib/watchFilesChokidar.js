
import {createTimeProfiler } from 'sxy-dev-tools'
import { showTimeProfiling } from '../../config.js'
import chalk from 'chalk-extensions'
import minimatch from 'minimatch'
import slash from 'slash'
//import watch from 'node-watch'
import chokidar from 'chokidar'
//import nsfw from 'nsfw'
import fs, { watch } from 'fs'
import { out, log, debug } from '../../output.js'

import { globArgCombine } from './globArgCombine.js'
import { addBasePath } from './addBasePath.js'

const { timeProfileAsync } = createTimeProfiler(showTimeProfiling)


export function watchFilesChokidar(config, onEvent) {

    return timeProfileAsync('start watching', () => {

        //const testGlobs = addBaseToGlobs(config.testsBase, config.tests)
        //const ignoreGlobs = addBaseToGlobs(config.testsBase, config.testsIgnore)

        // indentify a test file
        const testFilter =
        sync(
            file =>
                minimatch(file, globArgCombine(config.tests))
                &&
                (
                    ( ! config.testsIgnore )
                    || ! minimatch(file, globArgCombine(config.testsIgnore))
                )
        )
    
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

        const ignoreGlob = (config.watch.watchFilesIgnore)
            ? addBasePath(config.watch.watchFilesBase, config.watch.watchFilesIgnore)
            : null

        //log(`watch: ${config.watch.watchFilesBase}`)
       // log(`ignore: ${ignoreGlob}`)
        const watcher = chokidar.watch(
            config.watch.watchFilesBase,
            {
                ignored: ignoreGlob,
                ignoreInitial: true
            }
        )

        watcher.on('all', (event, filename) => {
            //log('[watch event]', path, event)
            filename = slash(filename)
            debug('[watch event]', filename, event)
            onEvent(
                filename,
                (event === 'unlink') ? 'remove' : event
            )
        })

        return new Promise( (resolve, reject) => {

            watcher.on('ready', () => {
                //log('chokidar watcher ready')
                debug('chokidar watcher ready')
                resolve(watcher)
            })

        })
        
        // watch(config.watch.watchFilesBase, { recursive: true, filter: watchFilter }, function(event, filename) {
        //     filename = slash(filename)
        //     debug('watch event')
        //     onEvent(filename, event)
        // })

    })

    //return new Promise( () => {} ) // infinite promise to let us watch

}


