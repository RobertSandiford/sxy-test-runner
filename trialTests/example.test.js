
import { describe } from '../dist/index.js'
import { expect, should } from 'chai'

//console.log('chai', chai)
//console.log('expect', expect)
//console.log('should', should)

should()

console.log('example.test.js log')

describe('The example', ({it}) => {

    console.log('The example describe log')

    it('1 should equal 1', () => {
        expect(1).to.equal(1)
    })

    it('2 should equal 2', () => {
        expect(2).to.equal(2)
    })

})

describe('The example 2nd thing', ({it}) => {

    it('1 should equal 1', () => {
        expect(1).to.equal(1)
    })

    it('2 should equal 2', () => {
        expect(2).to.equal(2)
    })

})

export {}

