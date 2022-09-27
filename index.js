const { trimHandle, saveResult } = require('./utils')
const translate = require("google-translate-cn-api")
const { pinyin } = require("pinyin-pro")

const dataList = [
    "智慧灯杆系统",
    "用户名",
    "密码",
    "立即登录"
]

/**
 * 方法一
 */

function syncHandle(dataList = [], lang = 'es') {
    let strArr = [...dataList]
    let len = strArr.length
    let result = []
    let index = 0
    /**
     * 同步
     * @param {*} str 
     * @param {*} type 
     */
    async function childHandle(str, type = 'fr') {
        let res = await translate(str, { to: type })
        let key = trimHandle(pinyin(str, { toneType: 'none' }))
        result.push({
            [key]: res.text
        })
        index++
        if (index < len) {
            childHandle(strArr[index])
        } else {
            // 接受结果
            console.log(result);
        }
    }

    childHandle(strArr[0], lang)
}

/**
 * 方法二
 */
function asyncHandle(dataList = [], lang = 'es') {
    let strArr = [...dataList]
    let len = strArr.length
    let result = []
    let index = 0

    strArr.forEach(str => {
        translate(str, { to: lang }).then(res => {
            let key = trimHandle(pinyin(str, { toneType: 'none' }))
            result.push({
                [key]: res.text
            })
            index++
        })
    })
    let timer = setInterval(() => {
        if (index == len) { // 因为index 在上面最后一项执行后，还会执行++ 所有实际会多1
            saveResult(result, lang)
            clearInterval(timer)
        }
    }, 2000)

}

asyncHandle(dataList, 'fr')