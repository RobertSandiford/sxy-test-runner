

import { runTasks } from './runTasks.js'
import { defaultConfig } from './defaultConfig.js'

// runTasks(config, tasks)
// config:
// tasks: function, file location, or array of those

mochaDescribe('runTasks() function', function() {

    mochaIt('runs tasks (functions and/or files) passed to it', function() {

        let functionHasRun = false
        global.taskFileHasRun = false

        const tasks = [
            function() {
                functionHasRun = true
            },
            'unitTesting/runTasks/task.js',
        ]

        runTasks(tasks)

        functionHasRun.should.equal(true)
        global.taskFileHasRun.should.equal(true)
      
    })

    mochaIt('passes back the properties returned from tasks', function() {

        const tasks = [
            function() {
                return { a: 1 }
            },
            function() {
                return { b: 2 }
            },
            'unitTesting/runTasks/export.js',
        ]
        
        const exports = runTasks(tasks)

        exports.should.have.keys([
            'a',
            'b',
            'c'
        ])
      
    })

})