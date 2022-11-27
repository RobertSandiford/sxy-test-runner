
import { createTimeProfiler } from 'sxy-dev-tools'
import { showTimeProfiling } from '../../config.js'

const { timeProfile, timeProfileAsync } = createTimeProfiler(showTimeProfiling)

export { timeProfile, timeProfileAsync }
