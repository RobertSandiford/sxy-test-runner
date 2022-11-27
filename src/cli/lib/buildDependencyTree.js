
import dependencyTree from 'dependency-tree'
import { out, log, debug } from '../../output.js'
import slash from 'slash'
import 'sxy-standard/light.js'


export function buildDependencyTree(config, filename) {
    filename = slash(filename) // convert to forward slashes

    // const filter = path => 
    //    minimatch(path, watchFiles)
    //    && ! minimatch(path, watchFilesIgnores)

    const dependencyTreeConfig = {
        filename,
        isListForm: true,
        //directory: './src',
        directory: config.watch.watchFilesBase,
        filter: sync(path => path.indexOf('node_modules') === -1)
    }
    //// this filter needs to be replaced

    const dt = dependencyTree(dependencyTreeConfig)

    // process the results into final format
    // (forward slashes and convert full path to rel path)
    const cwd = process.cwd()
    dt.process(
        sync( file => slash(file).slice(cwd.length+1) )
    )

    // remove the current file
    dt.forEach(
        sync(file => {
            if (file === filename) {
                dt.remove(file) // arrayRemove?
            }
        })
    )

    debug('found dep tree', dt)
    
    return dt
}