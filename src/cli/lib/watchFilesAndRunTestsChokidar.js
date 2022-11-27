
import { createTimeProfiler } from 'sxy-dev-tools'
import { showTimeProfiling } from '../../config.js'
import chalk from 'chalk-extensions'
import minimatch from 'minimatch'
import slash from 'slash'
import watch from 'node-watch'
//import chokidar from 'chokidar'
//import nsfw from 'nsfw'
import fs from 'fs'
import { out, log, debug } from '../../output.js'

import { runTests } from './runTests.js'
import { buildDependencyTree } from './buildDependencyTree.js'
import { globArgCombine } from './globArgCombine.js'
import { load } from './load.js'

const { timeProfileAsync } = createTimeProfiler(showTimeProfiling)

import { watchFilesChokidar } from './watchFilesChokidar.js'

export function watchFilesAndRunTestsChokidar(config, testFiles, dependencyTrees, failingTests, customOut = undefined) {
    
    const projectDir = process.cwd()

    timeProfileAsync('start watching', () => {

        let changedFiles = []
        let timeout = null

        const testFilter = sync(
            file =>
                minimatch(file, globArgCombine(config.tests))
                &&
                (
                    ( ! config.testsIgnore )
                    || ! minimatch(file, globArgCombine(config.testsIgnore))
                )
        )

        // start watching
        watchFilesChokidar(config, watchEvent)

        function watchEvent(filename, event) {
            debug('chokidar watch event', filename, event)
            //filename = slash(filename)
        
            // remove dep tree for any tests that are deleted, avoiding trying to run it later
            if (event === 'remove' && filename in dependencyTrees) {
                testFiles.remove(filename)// arrayRemove?
                delete dependencyTrees[filename]
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
                    debug('changed files', changedFiles)
                    //out('changed files', changedFiles)
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

                                // clear load cache to allow accesing the new tets
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
        } // end of watch event

        function addNewTest(testFile) {
            debug('new test', testFile)
            const dependencyTree = buildDependencyTree(config, testFile)
            dependencyTrees[testFile] = dependencyTree
                .map ( file => slash(file).slice(projectDir.length + 1) )
                .filter(f => f !== testFile)
        }

    })
        
    out(chalk.brightblue`watching...`)


}


