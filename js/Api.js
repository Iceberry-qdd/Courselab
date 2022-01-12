/**
 * Created by visual studio code
 * @author Iceberry
 * @date 2022-01-12
 * @version 1.0
 * @description apis for get course data
 */
const baseUrl = "http://localhost:5500"
let xhr = new XMLHttpRequest();

/**
 * 请求获取课程数据，以状态码200为成功，其它标志为失败
 * @param {function} fn1 请求成功时的回调函数
 * @param {function} fn2 请求失败时的回调函数
 */
export const getCourseData = (fn1, fn2) => {
    xhr.open("GET", baseUrl + '/json/example.json')
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            fn1.call(this, xhr.status,xhr.responseText)
        } else if(xhr.status!=200) {
            fn2.call(this, xhr.status, xhr.statusText)
        }
    }
    xhr.send()
}

export default {
    getCourseData
}