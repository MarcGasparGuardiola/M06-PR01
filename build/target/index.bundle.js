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

/***/ "./src/js/User.js":
/*!************************!*\
  !*** ./src/js/User.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"User\": () => (/* binding */ User)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar User = function User(userName, fullName, email, password) {\n  _classCallCheck(this, User);\n\n  this.userName = userName;\n  this.fullName = fullName;\n  this.email = email;\n  this.password = password;\n};\n\n//# sourceURL=webpack://m06-s08-e/./src/js/User.js?");

/***/ }),

/***/ "./src/js/login/login.js":
/*!*******************************!*\
  !*** ./src/js/login/login.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../User */ \"./src/js/User.js\");\n\nvar forms = document.querySelector('.needs-validation');\nvar fullName = document.getElementById(\"fullName\");\nvar userName = document.getElementById(\"userName\");\nvar email = document.getElementById(\"validationEmail\");\nvar submit = document.getElementById('submit');\nvar password = document.getElementById('password');\nvar users = [];\nvar regex = {\n  userName: /^[A-Za-z ]+$/,\n  email: /^\\w+([\\.\\+\\-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,4})+$/,\n  password: /^[A-Za-z0-9]{5,}$/\n};\n\nfunction isUserName(userName) {\n  return regex.userName.test(userName);\n}\n\nfunction isEmail(email) {\n  return regex.email.test(email);\n}\n\nfunction isPassword(password) {\n  return regex.password.test(password);\n} //TODO validacio tot el formulari\n\n\nfunction allValid() {\n  for (var index = 0; index < forms.length; index++) {\n    if (forms[index].className.includes(\"is-valid\")) {\n      console.log(\"ok\");\n    }\n  }\n}\n\nfunction setGreen(input) {\n  input.className = \"form-control is-valid\";\n}\n\nfunction setRed(input) {\n  input.className = \"form-control is-invalid\";\n}\n\nforms.addEventListener(\"keyup\", function (e) {\n  switch (e.target) {\n    case userName:\n      isUserName(e.target.value) ? setGreen(e.target) : setRed(e.target);\n      break;\n\n    case email:\n      isEmail(e.target.value) ? setGreen(e.target) : setRed(e.target);\n      break;\n\n    case fullName:\n      isUserName(e.target.value) ? setGreen(e.target) : setRed(e.target);\n      break;\n\n    case password:\n      isPassword(e.target.value) ? setGreen(e.target) : setRed(e.target);\n\n    default:\n      break;\n  }\n\n  allValid();\n});\nsubmit.addEventListener('click', function (e) {\n  e.preventDefault();\n  postRequest();\n  getRequest();\n  var user = new _User__WEBPACK_IMPORTED_MODULE_0__.User(userName.value, fullName.value, email.value, password.value);\n  users.push(user);\n  console.log(users);\n  sessionStorage.setItem('usersArray', JSON.stringify(users));\n  window.location.href = '../../teams.html';\n});\n\nfunction postRequest() {\n  fetch(\"https://jsonplaceholder.typicode.com/users\", {\n    method: \"POST\",\n    body: JSON.stringify({\n      name: fullName.value,\n      username: userName.value,\n      email: email.value\n    }),\n    headers: {\n      \"Content-type\": \"application/json; charset=UTF-8\"\n    }\n  }).then(function (response) {\n    return response.json();\n  }).then(function (json) {\n    return console.log(json);\n  });\n}\n\nfunction getRequest() {\n  fetch(\"https://jsonplaceholder.typicode.com/users\").then(function (response) {\n    return response.json();\n  }).then(function (json) {\n    return console.log(json);\n  });\n}\n\n//# sourceURL=webpack://m06-s08-e/./src/js/login/login.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/login/login.js");
/******/ 	
/******/ })()
;