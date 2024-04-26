import {encoded, translations} from './data.js'


function result(encoded, translations) {
    let uniqueIds = {}

    encoded.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
            if (!["groupId","service","formatSize","ca"].includes(key) && key.toLowerCase().endsWith('id')) {
                if (value === "0") {
                    obj[key] = ""
                } else {
                    obj[key] = translations[value] || value
                }

                // если значения для ключа существует, то оставляем, иначе создаём экземпляр Set 
                uniqueIds[key] = uniqueIds[key] || new Set()
                uniqueIds[key].add(obj[key])
            }

        })
    })
    
    const uniqueIdsArray = {};
    Object.keys(uniqueIds).forEach(key => {
        // переводим из Set в массив для хранения уникальных id  
        uniqueIdsArray[key] = Array.from(uniqueIds[key]);
    });

    return [encoded, uniqueIdsArray]
}

// расшифровка полей с суффиксом id 
console.log(result(encoded, translations)[0]) 

// список уникальных id
console.log(result(encoded, translations)[1]) 

