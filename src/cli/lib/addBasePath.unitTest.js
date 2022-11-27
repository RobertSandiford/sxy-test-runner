

import { addBasePath } from './addBasePath.js'

import { join } from 'path'

// addBaseToGlobs(base, globs)
// base: string
// globs: string or array of strings

mochaDescribe('addBaseToGlobs() function', function() {

    mochaIt('adds a base to a glob string', function() {

        const result = addBasePath('src', '**/*.js')
        
        result.should.equal('src/**/*.js')

    })

    mochaIt('adds a base to an array of glob strings', function() {

        const result = addBasePath('src', [
            '**/*.test.js',
            '**/*.mocha.js'
        ])
        
        result.should.have.members([
            'src/**/*.test.js',
            'src/**/*.mocha.js'
        ])

    })

    mochaIt('it handles an empty string base', function() {

        const result = addBasePath('', [
            '**/*.test.js',
            '**/*.mocha.js'
        ])
        
        result.should.have.members([
            '**/*.test.js',
            '**/*.mocha.js'
        ])

    })

    mochaIt('it handles a . base', function() {

        const result = addBasePath('.', [
            '**/*.test.js',
            '**/*.mocha.js'
        ])
        
        result.should.have.members([
            '**/*.test.js',
            '**/*.mocha.js'
        ])

    })

    mochaIt('it handles an undefined base', function() {

        const result = addBasePath(undefined, [
            '**/*.test.js',
            '**/*.mocha.js'
        ])
        
        result.should.have.members([
            '**/*.test.js',
            '**/*.mocha.js'
        ])

    })

    mochaIt('it handles adding a base to a file path', function() {

        const result = addBasePath('base', 'test/file.js')
        
        result.should.equal('base/test/file.js')

    })

})
