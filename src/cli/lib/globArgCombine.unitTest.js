
import { globArgCombine } from "./globArgCombine.js"

mochaDescribe('globArgCombine() function', function() {

    mochaIt('leaves strings alone', function() {

        const testString = '*.test.js'

        const result = globArgCombine(testString)

        result.should.equal(testString)

    })

    mochaIt('extracts the item from a single item array', function() {

        const testStringsArray = ['*.test.js']

        const result = globArgCombine(testStringsArray)

        result.should.equal(testStringsArray[0])

    })

    mochaIt('combined an array into a multi option glob e.g. {a,b}', function() {

        const testStringsArray = ['*.test.js', '*.spec.js']

        const result = globArgCombine(testStringsArray)

        result.should.equal(`{${testStringsArray[0]},${testStringsArray[1]}}`)

    })

})