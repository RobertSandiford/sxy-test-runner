
import { load } from "./load.js"

mochaDescribe('load import (sxy loader)', function() {

    mochaIt('load is a function with a cache', function() {

        load.should.be.a('function')

        load.should.include.key('cache')

    })

})