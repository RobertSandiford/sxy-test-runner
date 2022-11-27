
/* this test file contains a describe that throws an error */


import { describe } from '../../dist/index.js'

describe('Throwing Describe', () => {

    throw new Error('There must be an error in the describe block file')

})

