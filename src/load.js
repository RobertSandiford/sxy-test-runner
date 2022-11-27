
import { createLoad } from 'sxy-loader'

const load = createLoad(import.meta.url)

load('../dist/testing/importTimeTarget.js')
