
export function makeCustomOut() {
    let outBuffer = ''
    const customOut = (...texts) => {
        //console.log('custom out received:', ...texts)
        outBuffer += texts.join(' ') + '\n' // join and save to the buffer
    }
    function getOutBuffer() {
        return outBuffer
    }
    customOut.getOutBuffer = function getOutBuffer() {
        return outBuffer
    }
    function setOutBuffer(value) {
        outBuffer = value
    }
    customOut.setOutBuffer = function setOutBuffer(value) {
        outBuffer = value
    }
    //return { customOut, getOutBuffer, setOutBuffer }
    return customOut
}