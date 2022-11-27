

import { expect } from 'chai'
import { describe } from './describe.js'

//import { createLoad } from 'sxy-loader'
//const load = createLoad(import.meta.url)

mochaDescribe('new describe() function', function() {

    mochaIt('should run tests and output results', async function() {
        this.timeout(6000)

        // eslint-disable-next-line camelcase
        global.__sxy_test_runner__ = {
            describes: [],
            describeCounter: 1
        }

        describe('a thing', ({it}) => {
            it('should be great', () => {
                expect('it').to.be.great
            })
            it('should be awesome', () => {
                expect('it').to.be.awesome
            })
        })

        global.__sxy_test_runner__.describes.length.should.equal(1)
        global.__sxy_test_runner__.describes[0].thing.should.equal('a thing')
        global.__sxy_test_runner__.describes[0].tests.should.be.a('function')

    })

})

