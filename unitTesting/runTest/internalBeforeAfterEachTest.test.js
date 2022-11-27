
import { describe } from '../../dist/index.js'
import { expect, should } from 'chai'
should()

describe('Sample test 1', ({it, beforeEachTest, afterEachTest}) => {

    beforeEachTest(() => {
        global.internalBeforeEachTestRanNTimes++
    })

    afterEachTest(() => {
        global.internalAfterEachTestRanNTimes++
    })

    it('1 should equal 1', () => {
        expect(1).to.equal(1)
        global.internalBeforeAfterEachTest_test1Valid = ( // eslint-disable-line camelcase
            global.internalBeforeEachTestRanNTimes === 1
            && global.internalAfterEachTestRanNTimes === 0
        )
    })

    it('2 should equal 2', () => {
        expect(2).to.equal(2)
        global.internalBeforeAfterEachTest_test2Valid = ( // eslint-disable-line camelcase
            global.internalBeforeEachTestRanNTimes === 2
            && global.internalAfterEachTestRanNTimes === 1
        )
    })

    it('3 should equal 3', () => {
        expect(3).to.equal(3)
        global.internalBeforeAfterEachTest_test3Valid = ( // eslint-disable-line camelcase
            global.internalBeforeEachTestRanNTimes === 3
            && global.internalAfterEachTestRanNTimes === 2
        )
    })

})