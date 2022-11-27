
import { out as mainOut, log, debug } from '../../output.js'

const reservedKeys = [
    'describe',
    'test',
    'it',
    'before',
    'after',
    'beforeEach',
    'afterEach',
    'beforeAll',
    'afterAll'
]

export function injectProperties(basePackage, injectProperties, from, customOut = undefined) {

    const out = (customOut)
        ? (...texts) => customOut(...texts)
        : (...texts) => mainOut(...texts)

    for (const key in injectProperties) {
        if (reservedKeys.includes(key)) {
            out(`Error: key '${key}' is reserved. Please do not use this key. From '${from}'.`)
            //process.exit(1)
        }
    }
}