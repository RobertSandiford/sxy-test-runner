
import { loadConfig as sxyLoadConfig, loadConfigExact as sxyLoadConfigExact, createTimeProfiler } from 'sxy-dev-tools'
import { packageName, cliName, configFileName, configLocations, showTimeProfiling } from '../../config.js'
import chalk from 'chalk-extensions'
import { out, log, debug } from '../../output.js'

const { timeProfileAsync } = createTimeProfiler(showTimeProfiling)


export function loadConfig(customLocation = undefined) {

    return timeProfileAsync('load config', () => {

        const configOrNull = (customLocation !== undefined)
            ? sxyLoadConfigExact(customLocation)
            : sxyLoadConfig(configFileName, configLocations)

        debug('configOrNull', typeof configOrNull, configOrNull)

        if ( ! configOrNull ) {
            out(chalk.orange(`[${packageName}] No config found.`
            + `\nPlease create a ${configFileName}.js/cjs/mjs file in your project root or /config folder.`
            + `\nOr run \`npx ${cliName} init\` to create one.`))
            process.exit(0)
        }

        //log('user config', configOrNull)

        return configOrNull

    })

}
