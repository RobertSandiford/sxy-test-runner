
export const indexNumberToLetters = sync(
    function indexNumberToLetters(number, uppercase = false){
        const charCodeStart = (uppercase) ? 65 : 97
        var text = '', letterIndex
  
        while (number > 0) {
            letterIndex = (number - 1) % 26
            text = String.fromCharCode(charCodeStart + letterIndex) + text
            number = (number - letterIndex)/26 | 0
        }
        return text || undefined
    }
)
