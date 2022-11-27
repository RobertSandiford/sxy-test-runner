

import { reservedExportKeys } from './reservedExportKeys.js'

// applyConfigDefaults( userConfig: {} )

mochaDescribe('the reservedExportKeys', function() {

    mochaIt('has sensible defaults', function() {

        reservedExportKeys.should.include.members(['describe', 'test', 'it', 'before'])

    })

})