
import { describe } from '../dist/index.js'
import { expect, should } from 'chai'
should()

describe('Example 2', ({it}) => {

    it('3 should equal 3', () => {
        expect(3).to.equal(3)
    })

    it('4 should equal 4', () => {
        console.log('log from 4 should equal 4')
        expect(4).to.equal(4)
    })

    it('5 should equal 5', () => {
        expect(5).to.equal(5)
    })

    it('6 should equal 6', () => {
        expect(5).to.equal(5)
    })

})

