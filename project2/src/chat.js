import render from './render.js';
import {
  pollChats,
  pollLoggedinUsers,
} from './refresher';
import {
  fetchSession,
  fetchMessages,
  fetchLoggedinUsers,
} from './services.js';
import state, {
  login,
  logout,
  setChatMessages,
  setLoggedinUsers,
  setError,
} from './state';
import {
  SERVER,
  CLIENT
} from './constants';
import {
  addAbilityToLogin,
  addAbilityToLogout,
  addAbilityToSendMessage
} from './listeners';

const mainEl = document.querySelector('.main');
render({ state, mainEl });
addAbilityToLogin({ state, mainEl });
addAbilityToLogout({ state, mainEl });
addAbilityToSendMessage({ state, mainEl });
checkSession();

function checkSession() {
  fetchSession()
    .then((response) => {
      login(response.username);
      return fetchMessages();
    })
    .then((messages) => {
      setChatMessages(messages);
      return fetchLoggedinUsers();
    })
    .then((loggedinUsers) => {
      setLoggedinUsers(loggedinUsers);
      render({ state, mainEl });
      pollChats({ state, mainEl });
      pollLoggedinUsers({ state, mainEl });
    })
    .catch(err => {
      if (err?.error === SERVER.AUTH_MISSING) {
        return Promise.reject({ error: CLIENT.NO_SESSION })
      }
      return Promise.reject(err);
    })
    .catch(err => {
      if (err?.error == CLIENT.NO_SESSION) {
        logout();
        render({ state, mainEl });
        return;
      }
      setError(err?.error || 'ERROR');
      render({ state, mainEl });
    });
}
