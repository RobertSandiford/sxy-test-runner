
import chalk from 'chalk-extensions'

import { out, log, debug } from './output.js'

import { showTimeProfiling  } from './config.js'
import { createTimeProfiler } from 'sxy-dev-tools'

//console.log('sxyDevTools', sxyDevTools)
//console.log('createTimeProfiler', createTimeProfiler)

const { timeProfile, timeProfileAsync } =  createTimeProfiler(showTimeProfiling)

//console.log('chalk', chalk)


export function describe(theThing, tests) {

    //const thisDescribeCounter = global.testState.describeCounter++ // ++: assign the value, THEN increment
    const thisDescribeCounter = global.__sxy_test_runner__.describeCounter
    global.__sxy_test_runner__.describeCounter++

    const describe = {
        counter: thisDescribeCounter,
        thing: theThing,
        tests
    }
    
    //global.testState.describes.push( describe )
    global.__sxy_test_runner__.describes.push( describe )
    
    debug(
        chalk.lightgrey`${thisDescribeCounter})`
            + chalk.lightgrey` Done with ` + chalk.brightblue`${theThing}\n`
    )

}


