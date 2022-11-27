
import { describe } from '../dist/index.js'
import { expect, should } from 'chai'
should()

describe('Example 2', ({it}) => {

    it('3 should equal 4', () => {
        expect(3).to.equal(4)
    })

    it should error because this is a syntax error

})