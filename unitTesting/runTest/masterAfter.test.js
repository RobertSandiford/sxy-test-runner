
import { describe, after } from '../../dist/index.js'
import { expect, should } from 'chai'
should()

describe('Sample test 1', ({it}) => {

    it('1 should equal 1', () => {
        expect(1).to.equal(1)
    })

})

after(() => {})