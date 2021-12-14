/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/teams.js":
/*!*************************!*\
  !*** ./src/js/teams.js ***!
  \*************************/
/***/ (() => {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction doRequest(_x, _x2, _x3, _x4) {\n  return _doRequest.apply(this, arguments);\n}\n\nfunction _doRequest() {\n  _doRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, params, verb, jsonResponse) {\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            return _context.abrupt(\"return\", new Promise(function (resolve, reject) {\n              var xhr = new XMLHttpRequest();\n              xhr.addEventListener('readystatechange', function () {\n                if (xhr.readyState === 4 && xhr.status === 200) {\n                  var response = xhr.responseText && xhr.responseText.length > 0 ? xhr.responseText : true;\n\n                  if (jsonResponse === undefined || jsonResponse) {\n                    response = JSON.parse(xhr.responseText);\n                  }\n\n                  return resolve(response);\n                }\n\n                if (xhr.readyState === 4) {\n                  var _response = xhr.responseText && xhr.responseText.length > 0 ? xhr.responseText : false;\n\n                  if (jsonResponse === undefined || jsonResponse) {\n                    _response = JSON.parse(xhr.responseText);\n                  }\n\n                  return reject(_response);\n                }\n              });\n              var finalUrl = url;\n\n              if (params) {\n                var stringParams = Object.keys(params).map(function (k) {\n                  return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);\n                }).join('&');\n\n                if (stringParams.length > 0) {\n                  finalUrl = url + '?' + stringParams;\n                }\n              }\n\n              xhr.open(verb, finalUrl);\n              xhr.setRequestHeader('x-rapidapi-key', 'ebfa151c4637db0f313a47b7489e3770');\n              xhr.setRequestHeader('x-rapidapi-host', 'v3.football.api-sports.io');\n              xhr.send();\n            }));\n\n          case 1:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _doRequest.apply(this, arguments);\n}\n\nvar itemHTML = \"\\n    <tr>\\n        <td style=\\\"align-text: center\\\">$$TEAM_NAME$$</td>\\n        <td><img src=\\\"$$TEAM_LOGO$$\\\" style=\\\"width: 125px; height: 125px\\\"></td>\\n    </tr>\\n\";\nvar table = document.getElementById('tableBody');\nvar team = null;\n\nfunction load() {\n  return _load.apply(this, arguments);\n}\n\nfunction _load() {\n  _load = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {\n    var dataToPass, response, error;\n    return regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            dataToPass = {\n              country: \"Spain\",\n              league: 140,\n              season: 2020\n            };\n            _context2.next = 3;\n            return doRequest('https://v3.football.api-sports.io/teams', dataToPass, 'GET');\n\n          case 3:\n            response = _context2.sent;\n            error = response.error;\n            console.log(response); // Si no errors\n\n            if (error !== []) {\n              response.response.forEach(function (team) {\n                var str = '';\n                str = itemHTML.replace('$$TEAM_NAME$$', team.team.name);\n                str = str.replace('$$TEAM_LOGO$$', team.team.logo);\n                table.insertAdjacentHTML('beforeEnd', str);\n              });\n            } else {\n              console.log(error.join(' '));\n            }\n\n            console.log(response);\n\n          case 8:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2);\n  }));\n  return _load.apply(this, arguments);\n}\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  load();\n});\n\n//# sourceURL=webpack://m06-s08-e/./src/js/teams.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/teams.js"]();
/******/ 	
/******/ })()
;