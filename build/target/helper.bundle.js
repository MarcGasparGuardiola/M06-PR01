/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/helpers/helper.js":
/*!**********************************!*\
  !*** ./src/js/helpers/helper.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getList\": () => (/* binding */ getList),\n/* harmony export */   \"removePlayerFromListById\": () => (/* binding */ removePlayerFromListById),\n/* harmony export */   \"saveList\": () => (/* binding */ saveList),\n/* harmony export */   \"showAlert\": () => (/* binding */ showAlert),\n/* harmony export */   \"removePlayerFromLocalStorageList\": () => (/* binding */ removePlayerFromLocalStorageList),\n/* harmony export */   \"doRequest\": () => (/* binding */ doRequest),\n/* harmony export */   \"checkPlayerIsInList\": () => (/* binding */ checkPlayerIsInList),\n/* harmony export */   \"removePlayerFromMyTeam\": () => (/* binding */ removePlayerFromMyTeam)\n/* harmony export */ });\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction getList(list) {\n  try {\n    var data = JSON.parse(localStorage.getItem(list));\n\n    if (!data) {\n      return {\n        status: false\n      };\n    }\n\n    return {\n      status: true,\n      list: data\n    };\n  } catch (e) {\n    console.log(e);\n    return {\n      status: false,\n      error: e\n    };\n  }\n}\nfunction removePlayerFromListById(list, id) {\n  return list.filter(function (player) {\n    return player.player.id !== Number(id);\n  });\n}\nfunction saveList(list, data) {\n  try {\n    localStorage.setItem(list, JSON.stringify(data));\n  } catch (e) {\n    window.alert(e.message);\n  }\n}\nfunction showAlert(text, toastAlert, toastList) {\n  toastAlert.innerText = text;\n  toastList[0].show();\n}\nfunction removePlayerFromLocalStorageList(list, data, id) {\n  var returnedData = removePlayerFromListById(data, id);\n  saveList(list, returnedData);\n  return returnedData;\n}\nfunction doRequest(_x, _x2, _x3, _x4) {\n  return _doRequest.apply(this, arguments);\n}\n\nfunction _doRequest() {\n  _doRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, params, verb, jsonResponse) {\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            return _context.abrupt(\"return\", new Promise(function (resolve, reject) {\n              var xhr = new XMLHttpRequest();\n              xhr.addEventListener('readystatechange', function () {\n                if (xhr.readyState === 4 && xhr.status === 200) {\n                  var response = xhr.responseText && xhr.responseText.length > 0 ? xhr.responseText : true;\n\n                  if (jsonResponse === undefined || jsonResponse) {\n                    response = JSON.parse(xhr.responseText);\n                  }\n\n                  return resolve(response);\n                }\n\n                if (xhr.readyState === 4) {\n                  var _response = xhr.responseText && xhr.responseText.length > 0 ? xhr.responseText : false;\n\n                  if (jsonResponse === undefined || jsonResponse) {\n                    _response = JSON.parse(xhr.responseText);\n                  }\n\n                  return reject(_response);\n                }\n              });\n              var finalUrl = url;\n\n              if (params) {\n                var stringParams = Object.keys(params).map(function (k) {\n                  return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);\n                }).join('&');\n\n                if (stringParams.length > 0) {\n                  finalUrl = url + '?' + stringParams;\n                }\n              }\n\n              xhr.open(verb, finalUrl);\n              xhr.setRequestHeader('x-rapidapi-key', 'ebfa151c4637db0f313a47b7489e3770');\n              xhr.setRequestHeader('x-rapidapi-host', 'v3.football.api-sports.io');\n              xhr.send();\n            }));\n\n          case 1:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _doRequest.apply(this, arguments);\n}\n\nfunction checkPlayerIsInList(list, id) {\n  return list.some(function (val) {\n    return val.player.id === Number(id);\n  });\n}\nfunction removePlayerFromMyTeam(id) {\n  var myTeam = getList('myTeam');\n  removePlayerFromLocalStorageList('myTeam', myTeam.list, id);\n}\n\n//# sourceURL=webpack://m06-s08-e/./src/js/helpers/helper.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/helpers/helper.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;