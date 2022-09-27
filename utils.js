const fs = require('fs')

/**
 * 去除字符串中的空格
 * @param {*} str 
 * @returns 
 */
function trimHandle(str) {
    return str.replace(/\s/g, "")
}

function arrFormatJsonStr(arr) {
    if (!Array.isArray(arr)) { return }
    let start = `export default {`
    let end = `}`
    let result = ''
    arr.forEach(item => {
        let key = Object.keys(item)[0]
        result = result + ` 
        "${key}": "${item[key]}", `
    })
    return `${start}${result}${end}`;
}

function saveResult(arr, lang) {
    let str = arrFormatJsonStr(arr)
    fs.writeFileSync(`./output/${lang}.js`, str)
}



module.exports = {
    trimHandle,
    saveResult
}