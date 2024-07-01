/**
 * 单一元素选择
 * @param {*} selector 
 * @returns 
 */
function $(selector) {
    return document.querySelector(selector);
}

/**
 * 多元素选择
 * @param {*} selector 
 * @returns 
 */
function $$(selector) {
    return document.querySelectorAll(selector);
}

/**
 * 创建元素
 * @param {*} tagnName 
 * @returns 
 */
function $$$(tagnName) {
    return document.createElement(tagnName);
}