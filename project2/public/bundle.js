/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CLIENT": () => (/* binding */ CLIENT),
/* harmony export */   "ERROR_MESSAGES": () => (/* binding */ ERROR_MESSAGES),
/* harmony export */   "SERVER": () => (/* binding */ SERVER)
/* harmony export */ });
var _ERROR_MESSAGES;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_MESSAGE: 'required-message'
};
var CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession',
  TIMEOUT_USERS: 5000,
  TIMEOUT_MESSAGES: 3000
};
var ERROR_MESSAGES = (_ERROR_MESSAGES = {}, _defineProperty(_ERROR_MESSAGES, CLIENT.NETWORK_ERROR, "Server unavailable, please try again"), _defineProperty(_ERROR_MESSAGES, SERVER.REQUIRED_USERNAME, "Invalid Username. Valid username is non-empty and only contains letters and numbers"), _defineProperty(_ERROR_MESSAGES, SERVER.AUTH_INSUFFICIENT, "Username cannot be dog"), _defineProperty(_ERROR_MESSAGES, SERVER.REQUIRED_MESSAGE, "Chat message cannot be empty"), _defineProperty(_ERROR_MESSAGES, "default", "Something went wrong, please try again"), _ERROR_MESSAGES);

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addAbilityToLogin": () => (/* binding */ addAbilityToLogin),
/* harmony export */   "addAbilityToLogout": () => (/* binding */ addAbilityToLogout),
/* harmony export */   "addAbilityToSendMessage": () => (/* binding */ addAbilityToSendMessage)
/* harmony export */ });
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render.js */ "./src/render.js");
/* harmony import */ var _services_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services.js */ "./src/services.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _refresher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./refresher */ "./src/refresher.js");




function addAbilityToLogin(_ref) {
  var state = _ref.state,
    mainEl = _ref.mainEl;
  mainEl.addEventListener('click', function (e) {
    e.preventDefault();
    if (!e.target.classList.contains('login')) {
      return;
    }
    var usernameInput = document.querySelector('.username');
    var username = usernameInput.value.trim();
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.waitOnChatMessages)();
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.waitOnLoggedinUsers)();
    (0,_render_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      state: state,
      mainEl: mainEl
    });
    (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchLogin)(username).then(function (currentUser) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.login)(currentUser.username);
      return (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchMessages)();
    }).then(function (messages) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setChatMessages)(messages);
      return (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchLoggedinUsers)();
    }).then(function (loggedinUsers) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setLoggedinUsers)(loggedinUsers);
      (0,_render_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        state: state,
        mainEl: mainEl
      });
      (0,_refresher__WEBPACK_IMPORTED_MODULE_3__.pollChats)({
        state: state,
        mainEl: mainEl
      });
      (0,_refresher__WEBPACK_IMPORTED_MODULE_3__.pollLoggedinUsers)({
        state: state,
        mainEl: mainEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        state: state,
        mainEl: mainEl
      });
    });
  });
}
function addAbilityToLogout(_ref2) {
  var state = _ref2.state,
    mainEl = _ref2.mainEl;
  mainEl.addEventListener('click', function (e) {
    e.preventDefault();
    if (!e.target.classList.contains('logout')) {
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.logout)();
    (0,_render_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      state: state,
      mainEl: mainEl
    });
    (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchLogout)()["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        state: state,
        mainEl: mainEl
      });
    });
  });
}
function addAbilityToSendMessage(_ref3) {
  var state = _ref3.state,
    mainEl = _ref3.mainEl;
  mainEl.addEventListener('click', function (e) {
    e.preventDefault();
    if (!e.target.classList.contains('send')) {
      return;
    }
    var messageInput = document.querySelector('.message-input');
    var message = messageInput.value.trim();
    (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchSendMessage)(message).then(function (messages) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setChatMessages)(messages);
      (0,_render_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        state: state,
        mainEl: mainEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        state: state,
        mainEl: mainEl
      });
    });
  });
}

/***/ }),

/***/ "./src/refresher.js":
/*!**************************!*\
  !*** ./src/refresher.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pollChats": () => (/* binding */ pollChats),
/* harmony export */   "pollLoggedinUsers": () => (/* binding */ pollLoggedinUsers)
/* harmony export */ });
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _services_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services.js */ "./src/services.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./state */ "./src/state.js");





function pollChats(_ref) {
  var state = _ref.state,
    mainEl = _ref.mainEl;
  refreshChats({
    state: state
  }).then(function () {
    setTimeout(pollChats, _constants__WEBPACK_IMPORTED_MODULE_1__.CLIENT.TIMEOUT_MESSAGES, {
      state: state,
      mainEl: mainEl
    });
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_1__.SERVER.AUTH_MISSING) {
      return Promise.reject({
        error: _constants__WEBPACK_IMPORTED_MODULE_1__.CLIENT.NO_SESSION
      });
    }
    return Promise.reject(err);
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_1__.CLIENT.NO_SESSION) {
      (0,_state__WEBPACK_IMPORTED_MODULE_3__.logout)();
      (0,_render_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        state: state,
        mainEl: mainEl
      });
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_3__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
    (0,_render_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      state: state,
      mainEl: mainEl
    });
  });
}
;
function pollLoggedinUsers(_ref2) {
  var state = _ref2.state,
    mainEl = _ref2.mainEl;
  refreshUsers({
    state: state
  }).then(function () {
    setTimeout(pollLoggedinUsers, _constants__WEBPACK_IMPORTED_MODULE_1__.CLIENT.TIMEOUT_USERS, {
      state: state,
      mainEl: mainEl
    });
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_1__.SERVER.AUTH_MISSING) {
      return Promise.reject({
        error: _constants__WEBPACK_IMPORTED_MODULE_1__.CLIENT.NO_SESSION
      });
    }
    return Promise.reject(err);
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_1__.CLIENT.NO_SESSION) {
      (0,_state__WEBPACK_IMPORTED_MODULE_3__.logout)();
      (0,_render_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        state: state,
        mainEl: mainEl
      });
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_3__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
    (0,_render_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      state: state,
      mainEl: mainEl
    });
  });
}
;
function refreshChats(_ref3) {
  var state = _ref3.state;
  return (0,_services_js__WEBPACK_IMPORTED_MODULE_2__.fetchMessages)().then(function (messages) {
    (0,_state__WEBPACK_IMPORTED_MODULE_3__.refreshChatMessages)(messages);
    (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.renderChatMessages)({
      state: state
    });
  })["catch"](function (err) {
    return Promise.reject(err);
  });
}
;
function refreshUsers(_ref4) {
  var state = _ref4.state;
  return (0,_services_js__WEBPACK_IMPORTED_MODULE_2__.fetchLoggedinUsers)().then(function (loggedinUsers) {
    (0,_state__WEBPACK_IMPORTED_MODULE_3__.refreshLoggedinUsers)(loggedinUsers);
    (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.renderLoggedinUsers)({
      state: state
    });
  })["catch"](function (err) {
    return Promise.reject(err);
  });
}
;

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "renderChatMessages": () => (/* binding */ renderChatMessages),
/* harmony export */   "renderLoggedinUsers": () => (/* binding */ renderLoggedinUsers)
/* harmony export */ });
function render(_ref) {
  var state = _ref.state,
    mainEl = _ref.mainEl;
  var html = "\n  <main class=\"\">\n  ".concat(generateStatusHtml(state), "\n    ").concat(generateLoginHtml(state), "\n    ").concat(generateContentHtml(state), "\n  </main>\n ");
  mainEl.innerHTML = html;
}
function generateStatusHtml(state) {
  return "\n  <div class=\"errorLoginPage\">".concat(state.errorMessage, "</div>\n  ");
}
function generateLoginHtml(state) {
  if (state.isLoginPending) {
    return "\n      <div class=\"login__waiting\">Loading user...</div>\n    ";
  }
  if (state.isLoggedIn) {
    return "";
  }
  return "\n  <h2>Login</h2>\n  \n  <form class=\"form\">\n    <div class = \"log\">\n      <label for=\"username-input\" class=\"username-input\" >Username:</label>\n      <input type=\"text\" id=\"username-input\" class=\"username\" data-name=\"username\">\n    </div>\n    <button type=\"submit\" class=\"login\" >Login</button>\n    \n  </form>\n  ";
}
function generateContentHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  if (state.isChatMessagesPending) {
    return "\n      <div class=\"content\">\n        ".concat(generateControlsHtml(state), "\n        <div class=\"chats__waiting\">Loading chat messages...</div>\n      </div>\n    ");
  }
  return "\n      <div class=\"content\">\n        ".concat(generateControlsHtml(state), "\n        <ul class=\"todos\">").concat(generateChatHtml(state), "</ul>\n        ").concat(generateAddTodoHtml(state), "\n      </div>\n  ");
}
function generateChatHtml(state) {
  var username = state.username ? "<span class=\"card__username\">".concat(state.username, "</span>") : '';
  return "\n  <h2>Welcome, ".concat(username, "!</h2>\n  <div class=\"chat-app\">\n    <div class=\"loggedin\">\n      <label for=\"logged_users\" class=\"loggedin_member\">LoggedIn Users </label>\n      <ul class=\"loggedin_Users\">\n      ").concat(generateLoggedinUsers(state), "\n      </ul>\n    </div>\n    <div class=\"chat_msg\">\n      <label for=\"chats\" class=\"chats\">Chats </label>\n      <div class =\"message_abc\" >").concat(generateChatMessages(state), "</div>\n    </div>\n  </div>\n");
}
function generateControlsHtml(state) {
  return "\n        <div class=\"controls\">\n          <button class=\"logout\">Logout</button>\n        </div>\n  ";
}
function generateAddTodoHtml(state) {
  return "\n        <form class=\"add__form\" action=\"#/add\">\n        <label for=\"message-input\" class=\"input_message\" >Message:</label>\n        <input type=\"text\" id=\"message-input\" class=\"message-input\" data-name=\"message-input\">  \n          <button type=\"submit\" class=\"send\" >Send</button>\n        </form>\n  ";
}
function generateChatMessages(state) {
  var reverseMessage = Object.values(state.chatMessages).reverse();
  var messages = Object.values(reverseMessage).map(function (message) {
    return "\n    <div>\n    <li>\n    <p>".concat(message.message, "</p>\n    <p>").concat(message.username, "</p>\n    </li>\n    </div>\n    ");
  }).join('');
  return messages;
}
function renderChatMessages(_ref2) {
  var state = _ref2.state;
  var message_abc = document.querySelector('.message_abc');
  var reverseMessage = Object.values(state.chatMessages).reverse();
  var messages = Object.values(reverseMessage).map(function (message) {
    return "\n    <div class =\"message\">\n    <li>\n    <p>".concat(message.message, "</p>\n    <p>").concat(message.username, "</p>\n    </li>\n    </div>\n    ");
  }).join('');
  message_abc.innerHTML = messages;
}
function generateLoggedinUsers(state) {
  var users = Object.values(state.loggedinUsers).map(function (username) {
    return "\n    <li class=\"log_user\"> ".concat(username, "\n    </li>\n    ");
  }).join('');
  return users;
}
function renderLoggedinUsers(_ref3) {
  var state = _ref3.state;
  var loggedinUsers = document.querySelector('.loggedin_Users');
  var users = Object.values(state.loggedinUsers).map(function (username) {
    return "\n    <li class=\"log_user\">".concat(username, "\n    </li>\n    ");
  }).join('');
  loggedinUsers.innerHTML = users;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchLoggedinUsers": () => (/* binding */ fetchLoggedinUsers),
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "fetchMessages": () => (/* binding */ fetchMessages),
/* harmony export */   "fetchSendMessage": () => (/* binding */ fetchSendMessage),
/* harmony export */   "fetchSession": () => (/* binding */ fetchSession)
/* harmony export */ });
function fetchSession() {
  return fetch("/app/v1/session", {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogin(username) {
  return fetch("/api/v1/session", {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogout() {
  return fetch("/api/v1/session", {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchMessages() {
  return fetch("/api/v1/messages", {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLoggedinUsers() {
  return fetch("/api/v1/loggedinUsers", {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchSendMessage(message) {
  return fetch('/api/v1/message', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      message: message
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "login": () => (/* binding */ login),
/* harmony export */   "logout": () => (/* binding */ logout),
/* harmony export */   "refreshChatMessages": () => (/* binding */ refreshChatMessages),
/* harmony export */   "refreshLoggedinUsers": () => (/* binding */ refreshLoggedinUsers),
/* harmony export */   "setChatMessages": () => (/* binding */ setChatMessages),
/* harmony export */   "setError": () => (/* binding */ setError),
/* harmony export */   "setLoggedinUsers": () => (/* binding */ setLoggedinUsers),
/* harmony export */   "waitOnChatMessages": () => (/* binding */ waitOnChatMessages),
/* harmony export */   "waitOnLoggedinUsers": () => (/* binding */ waitOnLoggedinUsers)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  chatMessages: [],
  loggedinUsers: [],
  username: '',
  errorMessage: '',
  isLoggedIn: false,
  isLoginPending: true,
  isChatMessagesPending: false,
  isLoggedinUsersPending: false
};
function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
}
;
function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.chatMessages = [];
  state.loggedinUsers = [], state.errorMessage = '';
}
;
function setError(error) {
  if (!error) {
    state.error = '';
    return;
  }
  state.errorMessage = _constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGES["default"];
}
function waitOnChatMessages() {
  state.chatMessages = [];
  state.isChatMessagesPending = true;
  state.errorMessage = '';
}
function waitOnLoggedinUsers() {
  state.loggedinUsers = [];
  state.isLoggedinUsersPending = true;
  state.errorMessage = '';
}
function setChatMessages(messages) {
  state.chatMessages = messages;
  state.isChatMessagesPending = false;
  state.errorMessage = '';
}
function refreshChatMessages(messages) {
  state.chatMessages = messages;
}
function setLoggedinUsers(loggedinUsers) {
  state.loggedinUsers = loggedinUsers;
  state.isLoggedinUsersPending = false;
  state.errorMessage = '';
}
function refreshLoggedinUsers(loggedinUsers) {
  state.loggedinUsers = loggedinUsers;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/chat.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render.js */ "./src/render.js");
/* harmony import */ var _refresher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./refresher */ "./src/refresher.js");
/* harmony import */ var _services_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services.js */ "./src/services.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");






var mainEl = document.querySelector('.main');
(0,_render_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
  state: _state__WEBPACK_IMPORTED_MODULE_3__["default"],
  mainEl: mainEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_5__.addAbilityToLogin)({
  state: _state__WEBPACK_IMPORTED_MODULE_3__["default"],
  mainEl: mainEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_5__.addAbilityToLogout)({
  state: _state__WEBPACK_IMPORTED_MODULE_3__["default"],
  mainEl: mainEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_5__.addAbilityToSendMessage)({
  state: _state__WEBPACK_IMPORTED_MODULE_3__["default"],
  mainEl: mainEl
});
checkSession();
function checkSession() {
  (0,_services_js__WEBPACK_IMPORTED_MODULE_2__.fetchSession)().then(function (response) {
    (0,_state__WEBPACK_IMPORTED_MODULE_3__.login)(response.username);
    return (0,_services_js__WEBPACK_IMPORTED_MODULE_2__.fetchMessages)();
  }).then(function (messages) {
    (0,_state__WEBPACK_IMPORTED_MODULE_3__.setChatMessages)(messages);
    return (0,_services_js__WEBPACK_IMPORTED_MODULE_2__.fetchLoggedinUsers)();
  }).then(function (loggedinUsers) {
    (0,_state__WEBPACK_IMPORTED_MODULE_3__.setLoggedinUsers)(loggedinUsers);
    (0,_render_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_3__["default"],
      mainEl: mainEl
    });
    (0,_refresher__WEBPACK_IMPORTED_MODULE_1__.pollChats)({
      state: _state__WEBPACK_IMPORTED_MODULE_3__["default"],
      mainEl: mainEl
    });
    (0,_refresher__WEBPACK_IMPORTED_MODULE_1__.pollLoggedinUsers)({
      state: _state__WEBPACK_IMPORTED_MODULE_3__["default"],
      mainEl: mainEl
    });
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_4__.SERVER.AUTH_MISSING) {
      return Promise.reject({
        error: _constants__WEBPACK_IMPORTED_MODULE_4__.CLIENT.NO_SESSION
      });
    }
    return Promise.reject(err);
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_4__.CLIENT.NO_SESSION) {
      (0,_state__WEBPACK_IMPORTED_MODULE_3__.logout)();
      (0,_render_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        state: _state__WEBPACK_IMPORTED_MODULE_3__["default"],
        mainEl: mainEl
      });
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_3__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
    (0,_render_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_3__["default"],
      mainEl: mainEl
    });
  });
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map