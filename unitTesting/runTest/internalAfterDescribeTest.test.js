
import { describe } from '../../dist/index.js'
import { expect, should } from 'chai'
should()

describe('Sample test 1', ({it, afterDescribe}) => {

    afterDescribe(() => {
        global.internalAfterDescribeRanNTimes++
    })

    it('1 should equal 1', () => {
        expect(1).to.equal(1)
        // console.log('1', global.internalAfterDescribeRanNTimes)
        // global.internalAfterDescribe_test1Valid = ( // eslint-disable-line camelcase
        //     global.internalAfterDescribeRanNTimes === 0
        // )
    })

})

describe('Sample test 2', ({it, afterDescribe}) => {

    afterDescribe(() => {
        global.internalAfterDescribeRanNTimes++
    })

    it('1 should equal 1', () => {
        expect(1).to.equal(1)
        // console.log('2', global.internalAfterDescribeRanNTimes)
        // global.internalAfterDescribe_test2Valid = ( // eslint-disable-line camelcase
        //     global.internalAfterDescribeRanNTimes === 1
        // )
    })

})