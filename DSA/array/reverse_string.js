
/**
 * 
 * @param {String} str 
 */
function reverse(str) {

    // check input 
    if (typeof str != 'string') throw new Error('Please provide a string')

    if (str.length < 2) return str

    else {
        let l = str.length
        const backwards = []
        for (l; l > 0; l--) {
            backwards.push(str[l - 1])
        }
        return backwards.join('')
    }

}


console.log(reverse(''))