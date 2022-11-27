
/* this test file contains a describe that throws an error */


import { describe } from '../dist/index.js' // eslint-disable-line import/no-unresolved
import { expect, should } from 'chai'
should()

describe('Throwing Describe', ({it}) => {

    throw new Error('There must be an error in the describe block file')

})

