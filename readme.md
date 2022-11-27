# sxy-test-runner

Mocha-like test runner for **es modules** (only), with **watch mode**, and **re-running only tests related to changes** (by dependency analysis), full **async code support**

```js
import { describe } from 'sxy-test-runner'
import { should as setupShould } from 'chai'
const should = setupShould()

function add(a, b) {
    return a + b
}

describe('The add() function', ({it}) => {
    it('should add 1 and 2, making 3', () => {
        const result = add(1, 2)
        result.should.equal(3)
    }
})
```

## Usage

### 1. Install

```
npm i -D sxy-test-runner
```

*or*

```
yarn add -D sxy-test-runner
```

*or*

```
pnpm add -D sxy-test-runner
```

---

### 2. Create a config (required)

```
sxy-test-runner init
```
*sxy-test is an alias for sxy-test-runner and can be used instead*

This will create a config in your project folder. It can be moved to a folder named "config" if you prefer, or specify a location using --config

### 3. Modify the config, specifying the base path for tests and code to watch, and glob patterns for tests and code to watch

```js
{
    // base folder for tests matching and ignore patterns
    testsBase: 'dist',

    // glob pattern or array of glob patterns of test files
    tests: [
        '**/*.test.{js,jsx}'
    ],

    // watch mode configurations
    watch: {

        //// the base directory to watch files in
        watchFilesBase: 'dist',

        //// glob filter or array of global filters of files to watch
        watchFiles: '**/*.js',

    },
}
```

The other config options and fairly well explained in the config. More info on them later.

### 4. Run

```
npx sxy-test-runner
```
*sxy-test is an alias for sxy-test-runner and can be used instead*

("npx" can be omitted in package.json scripts)

sxy-test-runner runs watch mode, re-running only relevant tests, by default.

To run tests only once and not watch (e.g. for ci/cd), use
```
npx sxy-test-runner once
```

To specific an alternate config, use -c or --config
```
npx sxy-test-runner --config sxy-test-runner.alternate.config.js
```

# How it works

sxy-test-runner runs all tests inside one node process, to improve performance (this framework far exceeds mocha in parallel mode, which is needed to test ESM files, due to this).

Because of this, be careful with globals, which will be shared.

## Execution modes

**execution** settings let you choose whether to run test files, describe blocks, and individual tests sequentially or in parallel.

If working with globals you may want to use sequential only, to avoid conflicts on those globals.

Sequential mode also allows console log output to be displayed correctly with each test. Running in parallel mode does not allow log output to be matched up to each test, due to the use of a global override on console.log (other console output methods such as console.trace() are not covered currently)

If your code is isolated, and asyncronous, you can use parallel exeecution modes to radically speed up your tests, as the expense of the points mentioned above.

## Dependencies

Module dependencies are identified using dependency-tree. Dynamic imports will not be detected and will not trigger test re-runs.

No option to re-run all tests on changes is currently available - I may add this on request, or submit a PR if you want this.

## Failing test re-running

Default behaviour is to re-run any failing test any time a change is made, even if that change isn't relevant to the failing test. This is to ensure you can see where attention is needed. Turn this off in the config if it is not convenient for you: config.watch.reRunFailingTests

## Reloading modules

A key challenge in creating an ESM test runner is re-loading modules due to the engine not letting us clear the import cache of ESM modules. This framework relies on sxy-loader, which uses a babel transform to transform modules into a reloadable format with a controllable cache. A cache of transformed code is kept to keep the process speedy.

Performance is a little less than a native module import, but not so much as to be notable inconvenience. Re-running only test related to changes keep performance strong even in very large projects.

# Advanced usage

## 1. Run tasks at startup - setup

Edit config.setup. This config value can take a function, a file to import relative to the project folder, or an array or one or both of those.

## 2. Run tasks before each test file / describe / test globally

Edit config.beforeEachFile / config.beforeEachDescribe / config.beforeEachTest with a function, file or array of either.

If a file exports named values, or a function returns an object with properties, these keys will be added to a storage object (beware of conflicting names). This object is then passed to the afterEachFile / afterEachDescribe / afterEachTest tasks for cleanup.

```js
    // tasks to run before each test file is run
    beforeEachFile: () => {
        const thing = prepSomething()
        return { thing }
    },

    // tasks to run after each test file is run
    afterEachFile: ({thing}) => {
        destroyingSomething(thing)
    },
```

## 3. Run code before each describe block, or at the end of a test file - per test file

Not yet implemented.

## 4. Run code before each test, after each test, or after the describe block - per describe block

```js
import { describe } from 'sxy-test-runner'
import { should as setupShould } from 'chai'
const should = setupShould()

describe('something', ({it, beforeEachTest, afterEachTest, afterDescribe}) => {

    // setup can take place here without any special measures
    // but you can only safely set globals for your test here if your
    // execution mode for files and describes is 'sequential' (default)
    const something = createSomething()

    // run this just before each test
    beforeEachTest(() => {
        prepSomething(something)
    })

    // run this just after each test
    afterEachTest(() => {
        clearupSomething(something)
    })

    it('should do something', () => {
        something.should.do.something
    })
    it('should do another thing', () => {
        something.should.do.another.thing
    })

    // teardown should go in afterDescribe.
    // tests are not run syncronously within the describe block (even sync tests)
    // so cleanup code here would run too early
    afterDescribe(() => {
        destroySomething(something)
    })

})

```

# Known issues

sxy-loader effectively uses eval to run modules, to get around the ESM limited of being unable to reload modules. This has a harmful effect on error reporting when code hits errors. I have some plans to work on error reporting, or work to get changes made to the ESM spec, but at current time error reporting isn't great.