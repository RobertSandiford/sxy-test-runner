
import { describe } from '../../../dist/index.js'

describe('sequential test 2', async () => {

    global.sequential2 = 'started'
    console.log('seq 2 started')


    if (global.sequential1 === 'started') global.sequential1 = 'spoiled'


    await new Promise( resolve => {
        setTimeout(resolve, 1000)
    })


    if (global.sequential1 === 'started') global.sequential1 = 'spoiled'


    if (global.sequential2 === 'started') {
        global.sequential2Status = true
    } else {
        global.sequential2Status = false
    }
    delete global.sequential2
    console.log('seq 2 ended')

})