
import { describe } from '../../dist/index.js'
import { expect, should } from 'chai'
should()

describe('Describe 1', ({it, functionThing, fileThing}) => {

    global.functionThing = functionThing
    global.fileThing = fileThing
    
    it('1 should equal 1', () => {
        expect(1).to.equal(1)
    })

})

