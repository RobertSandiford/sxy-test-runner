
import { timeProfilingOut } from './timeProfiling.js'

//const globalTimeProfiling = {}

//globalTimeProfiling.start = (new Date).getTime()

console.log('-----')

global.timeProfilingStart = (new Date).getTime()

await import('./importTimeTarget.js')

global.timeProfilingStart = (new Date).getTime()

await import('./importTimeTarget2.js')
