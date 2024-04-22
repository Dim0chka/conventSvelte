import {encoded, translations} from './data.js'


function result(encoded, translations) {
    const exep = [
        "groupId",
        "service",
        "formatSize",
        "ca"
    ]
    
    encoded.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
            if (!exep.includes(key)) {
                translate(value) ? obj[key] = translate(value) : delete obj[key]
            } 
        })
    })
    
    
    function translate(el) {
        if (el === "0") {
            return ""
        } else {
            return translations[el] || false
        }
    }

    return encoded
}


console.log(result(encoded, translations))

