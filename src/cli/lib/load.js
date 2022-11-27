
import sxyLoaderConfig from '../../../sxy-loader.config.js'
import { createLoad } from 'sxy-loader'

export const load = createLoad(import.meta.url, sxyLoaderConfig)
