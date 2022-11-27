/* eslint-disable no-console */

import { debugging } from './config.js'

function waitToOutput() {
}

export function out(...texts) {
    waitToOutput()
    console.log(...texts)
}

export function warn(...texts) {
    waitToOutput()
    console.log(...texts)
}

export function error(...texts) {
    waitToOutput()
    console.log(...texts)
}

export function log(...texts) {
    waitToOutput()
    console.log(...texts)
}

export const debug = (debugging)
    ? function debug(...texts) {
        waitToOutput()
        console.log(...texts)
    }
    : function() {}
