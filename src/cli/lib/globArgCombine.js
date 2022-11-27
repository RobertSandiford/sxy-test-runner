
export const globArgCombine = sync(
    (patterns) => (Array.isArray(patterns))
        ? (patterns.length > 1)
            ? '{' + patterns.join(',') + '}'
            : patterns[0]
        : patterns
)