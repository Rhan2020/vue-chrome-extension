/* eslint-disable */

import inspect from './lang-inspector'
import Papa from 'papaparse'

/**
 * 解析google表格链接
 */
function parseGoogleDocUrl(url) {
  var urlParts = url.split('/')
  var hashPart = urlParts.pop()
  var docUrl = urlParts.join('/')
  var id = urlParts.pop()
  var hash = hashPart.split('#').pop()
  var downurl = docUrl + '/export?format=csv&id=' + id + '&' + hash
  return downurl
}

function Ajax(url, method, data) {
  let promise = new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                  resolve(xhr.response);
              } else {
                  reject(new Error("error"));
              }
          }
      }
      if (method.toUpperCase() === "GET") {
          let paramsList = [];
          for (let key in data) {
              paramsList.push(key + "=" + data[key]);
          }
          let params = paramsList.join("&");
          url = url + params;
          xhr.open("get", url, false);
          xhr.send();
      }
      else if (method.toUpperCase() === "POST") {
          xhr.open("post", url, false);
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
          xhr.send(data);
      }
  })
  return promise;
}

export function check(url) {
  return Ajax(parseGoogleDocUrl(url), 'GET').then(res => {
    if (!res) {
      return res
    }
    const parseObj = Papa.parse(res)
    console.log(res, parseObj, 111);
    let arr = parseObj && parseObj.data || []
    let deleteCount = 0
    for (let i = arr[0].length - 1; i >= 0; i--) {
      let empty = true
      for (let j = 0; j < arr.length; j++) {
        if (arr[j][i].trim()) {
          empty = false
          break
        }
      }
      if (empty) {
        deleteCount++
      } else {
        break
      }
    }
    if (deleteCount) {
      arr = arr.map(it => it.slice(0, -deleteCount))
    }
    console.log(arr)
    const toArr = []
    const h = arr.length || 0
    const w = arr[0] && arr[0].length || 0

    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        if (!toArr[j]) {
          toArr[j] = []
        }
        toArr[j][i] = arr[i][j]
      }
    }
    const report = inspect(toArr)
    return {
      status: 0,
      result: report
    };
  })
}