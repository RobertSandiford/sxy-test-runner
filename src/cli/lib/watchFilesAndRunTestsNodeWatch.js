
import {createTimeProfiler } from 'sxy-dev-tools'
import { showTimeProfiling } from '../../config.js'
import chalk from 'chalk-extensions'
import minimatch from 'minimatch'
import slash from 'slash'
//import watch from 'node-watch'
//import chokidar from 'chokidar'
//import nsfw from 'nsfw'
import fs from 'fs'
import { out, log, debug } from '../../output.js'

import { runTests } from './runTests.js'
import { buildDependencyTree } from './buildDependencyTree.js'
import { globArgCombine } from './globArgCombine.js'
import { load } from './load.js'

const { timeProfileAsync } = createTimeProfiler(showTimeProfiling)

import { addBasePath } from './addBasePath.js'
import { watchFilesNodeWatch } from './watchFilesNodeWatch.js'

export function watchFilesAndRunTestsNodeWatch(
    config, testFiles, dependencyTrees, failingTests, customOut = undefined
) {
    
    const projectDir = process.cwd()
    let watcher

    timeProfileAsync('init watching', () => {

        debug('failingTests', failingTests)

        const testsGlobs = addBasePath(config.testsBase, config.tests)
        const testsIgnoreGlobs = addBasePath(config.testsBase, config.testsIgnore)

        // indentify a test file
        const testFilter =
        sync(
            //file => minimatch(file, globArgCombine(config.tests))
            //    && ! minimatch(file, globArgCombine(config.testsIgnore))
            file => {
                debug(
                    'test filter',
                    file,
                    globArgCombine(testsGlobs),
                    globArgCombine(testsIgnoreGlobs),
                    minimatch(file, globArgCombine(testsGlobs)),
                    minimatch(file, globArgCombine(testsIgnoreGlobs)),
                    minimatch(file, globArgCombine(testsGlobs))
                        && ! minimatch(file, globArgCombine(testsIgnoreGlobs))
                )
                return minimatch(file, globArgCombine(testsGlobs))
                    && ! minimatch(file, globArgCombine(testsIgnoreGlobs))
            }
        )

        //log('tests glob', globArgCombine(testsGlobs))
        //log('testsIgnore glob', globArgCombine(testsIgnoreGlobs))
    

        let changedFiles = []
        let timeout = null
        
        if ( ! config.watch.watchFilesBase ) {
            out(`No config.watch.watchFilesBase provided, defaulting to '.'`)
            config.watch.watchFilesBase = '.'
        }

        watcher = watchFilesNodeWatch(config, watchEvent)
        
        function watchEvent (filename, event) {
            debug('handle watch event ', filename, event)

            filename = slash(filename)
        
                // remove dep tree for any tests that are deleted, avoiding trying to run it later
           

            
            if (event === 'remove') {
                debug('removing test', filename)
                if (filename in dependencyTrees) {
                    testFiles.remove(filename) // arrayRemove?
                    delete dependencyTrees[filename]
                }
            }

            // info on the event found
            out(chalk.grey`change: ${filename} (${event})`)

            // add the file to changed files
            changedFiles.push([filename, event])
        
            // wait 100ms after any change before processing, to avoid multiple execution?
            if (timeout) {
                clearTimeout(timeout)
            }

            timeout = setTimeout(() => {
                
                timeProfileAsync('handle changed files', () => {
                    debug('changedFiles', changedFiles)
                    try {
                        // build related test list
                        const tests = []
                        for (const [file, event] of changedFiles) {
                            debug('check', file)
                            debug('1 tests', tests)
                            if (event !== 'remove') { // only check to see if its a test if it exists (has not just been removed)
                                if (testFilter(file)) { // it is a test file itself, add to run list
                                    debug('its a test', file)
                                    tests.push(file)
                                    if ( ! (file in dependencyTrees) ) { // if its a new test
                                        debug('try to add a new test', file),
                                        addNewTest(file)
                                    }
                                }
                            }
                            debug('dtrees', dependencyTrees)
                            debug('2 tests', tests)
                            for (const f of Object.getOwnPropertyNames(dependencyTrees)) {
                                debug('dep tree', f, dependencyTrees[f])
                                if (dependencyTrees[f].some( sync(dep => {
                                    immed(debug('checking dep', dep, file))
                                    return dep === file
                                }) )) { // a test depends on this file
                                    debug('its a dependency', file)
                                    debug('its a dependency', file)
                                    tests.push(f)
                                }
                            }
                        }
        
                        changedFiles = []
        
                        debug('tests', tests)
                        debug('3 tests', tests)
        
                        if (tests.length) {
                            timeProfileAsync('run tests related to changes', () => {
                                debug('tests', tests)
        
                                if (config.reRunFailingTests) {
                                    for (const failingTest of failingTests) {
                                        if ( ! fs.existsSync(failingTest) ) {
                                         //debug('remove failing test', failingTest)
                                            failingTests.remove(failingTest) // arrayRemove?
                                        //(failingTests)
                                        }
                                    }
                                }
                            
                                debug('tests', tests)
                                debug('failingTests', failingTests)

                                debug('reRunFailingTests', config.watch.reRunFailingTests)

                                const toTest = (config.watch.reRunFailingTests)
                                    ? [...tests, ...failingTests].dedupeSlow().reverse() // dedupe return new? // reverse in place
                                    : [...tests].reverse() // reverse in place
        
                                const results = { total: 0, passed: 0 }

                                debug('run tests on change')
                                debug('toTest', toTest)

                                // clear load cache to allow accesing the new test
                                load.cache.clear()

                                const testResults = runTests(config, toTest, failingTests, customOut)

                            })
                        }
                    } catch (e) {
                        log('watch handler error', e)
                    } finally {
                        //
                    }
                })
            }, 33)
        }
        

    })

 
    out(chalk.brightblue`watching...`)


    //return new Promise( () => {} ) // infinite promise to let us watch

    function addNewTest(testFile) {
        debug('new test', testFile)
        const dependencyTree = buildDependencyTree(config, testFile)
        dependencyTrees[testFile] = dependencyTree
            .map ( file => slash(file).slice(projectDir.length + 1) )
            .filter(f => f !== testFile)
    }

}


