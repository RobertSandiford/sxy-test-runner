module.exports = {
    "extends": [
        "sandi",
    ],
    "env": {
        //"mocha": true
    },
    "globals": {
        //"describe": "readonly",
        //"test": "readonly",
        //"it": "readonly",

        "promise": "readonly",
        "immed": "readonly",
        "sync": "readonly",

        "commandLineArguments": "readonly",

        "mochaDescribe": "readonly",
        "mochaIt": "readonly",
        "mochaTest": "readonly",
        "mochaBefore": "readonly",
        "mochaBeforeEach": "readonly",
        "mochaAfter": "readonly",
        "mochaAfterEach": "readonly",
        "mochaStep": "readonly",
        "chaiExpect": "readonly",
        "chaiShould": "readonly",
        "sinon": "readonly",
    },
    "rules": {
        "require-await": "off"
    }
}
