
import { describe } from '../../dist/index.js'
import { expect, should } from 'chai'
should()


describe('Sample test - logging', ({it}) => {

    console.log('describe log')

    it('1 should equal 1', () => {
        console.log('1st test log')
        expect(1).to.equal(1)
    })

    it('2 should equal 2', () => {
        expect(1).to.equal(1)
    })

    it('3 should equal 3', () => {
        console.log('3rd test log')
        expect(3).to.equal(3)
    })

    it('4 should equal 5', () => {
        console.log('4th test log')
        expect(4).to.equal(5)
    })

    it('5 should equal 6', () => {
        expect(5).to.equal(6)
    })

    it('6 should equal 7', () => {
        console.log('6th test log')
        expect(6).to.equal(7)
    })

})


describe('Sample test - logging part 2', ({it}) => {

    console.log('describe log')

    it('1 should equal 1', () => {
        console.log('1st test log')
        expect(1).to.equal(1)
    })

    it('2 should equal 2', () => {
        expect(1).to.equal(1)
    })

    it('3 should equal 3', () => {
        console.log('3rd test log')
        expect(3).to.equal(3)
    })

    it('4 should equal 5', () => {
        console.log('4th test log')
        expect(4).to.equal(5)
    })

    it('5 should equal 6', () => {
        expect(5).to.equal(6)
    })

    it('6 should equal 7', () => {
        console.log('6th test log')
        expect(6).to.equal(7)
    })

})
