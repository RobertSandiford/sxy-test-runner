#!/usr/bin/env node

// need to change this to a safe version
import 'sxy-standard'
import 'sxy-standard-object-copy'


const args = process.argv.slice(2)

if ( args.length > 0 ) {
    const command = args[0]
    switch (command) {
        case 'init':
            await doCommand(command, args.slice(1))
            break
        case 'once':
            await doCommand(command, args.slice(1))
            break
        case 'watch':
            await doCommand(command, args.slice(1))
            break
        default:
            await doCommand('watch', args)
    }
} else {
    await doCommand('watch', args)
}


function doCommand(command, args) {
    global.commandLineArguments = args
    import(`./${command}.js`)[command]()
    process.exit(0)
}

