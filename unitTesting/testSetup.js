
import 'sxy-standard'
import 'sxy-standard-object-copy'

import { describe, it, before, beforeEach, after, afterEach } from 'mocha'
global.mochaDescribe = describe
global.mochaIt = global.mochaTest = it
global.mochaBefore = before
global.mochaBeforeEach = beforeEach
global.mochaAfter = after
global.mochaAfterEach = afterEach

import { step } from 'mocha-steps'
global.mochaStep = step

import { expect, should, use as chaiUse } from 'chai'
global.chaiExpect = expect
global.chaiShould = should()

import chaiAsPromised from 'chai-as-promised'
chaiUse(chaiAsPromised)

import sinon from 'sinon'
global.sinon = sinon

import sinonChai from 'sinon-chai'
chaiUse(sinonChai)
