
import { describe } from '../../dist/index.js'
import { expect, should } from 'chai'
should()

describe('Sample test 2', ({it}) => {

    it('2 should equal 2', () => {
        expect(2).to.equal(2)
    })

    it('22 should equal 22', () => {
        expect(22).to.equal(22)
    })
    
})