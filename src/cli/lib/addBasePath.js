
import { createTimeProfiler } from 'sxy-dev-tools'
import { showTimeProfiling } from '../../config.js'
import { out, log, debug } from '../../output.js'

const { timeProfileAsync } = createTimeProfiler(showTimeProfiling)

export function addBasePath(base, items) {

    return timeProfileAsync('add base to globs', () => {

        if (
            base !== undefined
            && base !== '.'
            && base !== ''
        ) {
            items = (Array.isArray(items))
                ? items.map( sync(item => `${base}/${item}`) )
                : `${base}/${items}`
        }

        return items

    })

}