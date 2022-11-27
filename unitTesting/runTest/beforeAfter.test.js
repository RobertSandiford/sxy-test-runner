
import { describe } from '../../dist/index.js'
import { expect, should } from 'chai'
should()

describe('Describe 1', ({it}) => {

    it('1 should equal 1', () => {
        expect(1).to.equal(1)
    })

    it('2 should equal 2', () => {
        expect(2).to.equal(2)
    })

})

describe('Describe 2', ({it}) => {

    it('13 should equal 3', () => {
        expect(3).to.equal(3)
    })

})