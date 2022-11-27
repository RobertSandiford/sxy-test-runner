
import { expect } from 'chai'

import { defaultConfig } from './defaultConfig.js'
import { addExports } from './addExports.js'

// applyConfigDefaults( userConfig: {} )

import { makeCustomOut } from '../../../unitTesting/makeCustomOut.js'


mochaDescribe('addExports() function', function() {

    mochaIt('should add passed properties to a base object', function() {

        const exports = {}

        const newProperties = { a: 1, b: 2 }

        addExports(exports, newProperties)

        exports.should.have.keys(['a', 'b'])

    })

    mochaIt('should complain about duplicates', function() {

        //const { customOut, getOutBuffer, setOutBuffer } = makeCustomOut()

        const exports = { a: 1, b: 2 }

        const newProperties = { a: 3, b: 4 }

        const errorText = 'already been exported'

        promise(
            addExports(exports, newProperties, 'placeholder', 'placeholder')
        ).should.be.rejectedWith(errorText)

    })

})