import {
  ERROR_MESSAGES
} from "./constants";

const state = {
  chatMessages: [],
  loggedinUsers: [],
  username: '',
  errorMessage: '',
  isLoggedIn: false,
  isLoginPending: true,
  isChatMessagesPending: false,
  isLoggedinUsersPending: false
};

export function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
};

export function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.chatMessages = [];
  state.loggedinUsers = [],
    state.errorMessage = '';
};

export function setError(error) {
  if (!error) {
    state.error = '';
    return;
  }
  state.errorMessage = ERROR_MESSAGES[error] || ERROR_MESSAGES.default;
}

export function waitOnChatMessages() {
  state.chatMessages = [];
  state.isChatMessagesPending = true;
  state.errorMessage = '';
}

export function waitOnLoggedinUsers() {
  state.loggedinUsers = [];
  state.isLoggedinUsersPending = true;
  state.errorMessage = '';
}

export function setChatMessages(messages) {
  state.chatMessages = messages;
  state.isChatMessagesPending = false;
  state.errorMessage = '';
}

export function refreshChatMessages(messages) {
  state.chatMessages = messages;
}

export function setLoggedinUsers(loggedinUsers) {
  state.loggedinUsers = loggedinUsers;
  state.isLoggedinUsersPending = false;
  state.errorMessage = '';
}

export function refreshLoggedinUsers(loggedinUsers) {
  state.loggedinUsers = loggedinUsers;
}

export default state;
