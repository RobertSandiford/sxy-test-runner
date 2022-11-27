
import { describe } from '../../../dist/index.js'

describe('sequential test 1', async () => {
    
    global.sequential1 = 'started'
    console.log('seq 1 started')


    if (global.sequential2 === 'started') global.sequential2 = 'spoiled'


    await new Promise( resolve => {
        setTimeout(resolve, 1000)
    })


    if (global.sequential2 === 'started') global.sequential2 = 'spoiled'


    if (global.sequential1 === 'started') {
        global.sequential1Status = true
    } else {
        global.sequential1Status = false
    }
    delete global.sequential1
    console.log('seq 1 ended')

})