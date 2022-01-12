/**
 * Created by visual studio code
 * @author Iceberry
 * @date 2022-01-10
 * @version 1.0
 * @description Script for index page
 */
// import { mockData } from '../js/Mock.js';
import api from './Api.js';
import {
    injectCourseListOfAllLang,
    injectCoursesCss
} from './Template.js';

window.onload = function () {
    printLogo()
    adjustIndexSize()

    api.getCourseData(function onSuccess(status,data) {
        const courseList = JSON.parse(data)
        injectCourseContent(courseList)
        injectCoursesStyle(injectCoursesCss(Object.keys(courseList)))
    }, function onError(status, msg) {
        //TODO 错误处理
        console.log(`[onError]status:${status},msg:${msg}`)
    })
}

window.onresize = function () {
    adjustIndexSize()
}

/**
 * 调整index大小为窗口大小
 */
function adjustIndexSize() {
    const index = document.getElementsByClassName('Index')[0]
    const header = document.getElementsByClassName("Header")[0]
    let winHeight = window.innerHeight
    let headerHeight = window.getComputedStyle(header).height.replace('px', '')
    index.style.height = (winHeight - headerHeight) + 'px'
}

/**
 * 向网页注入课程卡片页内容
 * @param {string} data 要注入的html内容 
 */
function injectCourseContent(data) {
    let allCourseList = injectCourseListOfAllLang(data)
    let courseDiv = document.getElementById('course')
    courseDiv.innerHTML = allCourseList
}

/**
 * 向网页注入课程卡片页css样式表
 * @param {string} styles 要注入的css内容
 */
function injectCoursesStyle(styles) {
    var styleElement = document.getElementById('styles_js')
    if (!styleElement) {
        styleElement = document.createElement('style')
        styleElement.type = 'text/css';
        styleElement.id = 'styles_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);

    }
    styleElement.appendChild(document.createTextNode(styles))
}

/**
 * 打印logo
 */
function printLogo() {
    const logo = "   ______          __     __      __  \n  / ____/___  ____/ /__  / /___ _/ /_ \n / /   / __ \\/ __  / _ \\/ / __ `/ __ \\\n/ /___/ /_/ / /_/ /  __/ / /_/ / /_/ /\n\\____/\\____/\\__,_/\\___/_/\\__,_/_.___/"
    console.log(logo)
}