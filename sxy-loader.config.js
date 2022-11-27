
export default {
    //returnStyle: 'esm-dynamic', // 'esm-dynamic' | 'esm-static'
    mode: process.env.NODE_ENV, // 'development' | 'production' environment
    //transformCaching: 'content', // content | hash | false  // default content 
    //transformCacheStorage: 'file', // 'file' | 'memory'
    //transformCacheStorageLocation: '__cache', // null | path/to/location/from/project/dir
    quiet: true, // disable info output
    debug: false, // debugging output // doesn't work yet
}
