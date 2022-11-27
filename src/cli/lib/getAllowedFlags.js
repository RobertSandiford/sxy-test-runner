

export function getAllowedFlags(allowedArguments) {
    const allowedFlags = {}
    for (const option in allowedArguments) {
        if ('flag' in allowedArguments[option]) {
            allowedFlags[ allowedArguments[option].flag ] = option
        }
    }
    return allowedFlags
}


