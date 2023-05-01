import render from './render.js';
import {
    renderChatMessages,
    renderLoggedinUsers,
} from './render';
import {
    SERVER, CLIENT
} from './constants';
import {
    fetchMessages,
    fetchLoggedinUsers,
} from './services.js';
import {
    setError,
    logout,
    refreshChatMessages,
    refreshLoggedinUsers,
} from './state';

export function pollChats({ state, mainEl }) {
    refreshChats({ state })
        .then(() => {
            setTimeout(pollChats, CLIENT.TIMEOUT_MESSAGES, { state, mainEl });
        })
        .catch((err) => {
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
};

export function pollLoggedinUsers({ state, mainEl }) {
    refreshUsers({ state })
        .then(() => {
            setTimeout(pollLoggedinUsers, CLIENT.TIMEOUT_USERS, { state, mainEl });
        })
        .catch((err) => {
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
};

function refreshChats({ state }) {
    return fetchMessages()
        .then((messages) => {
            refreshChatMessages(messages);
            renderChatMessages({ state });
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

function refreshUsers({ state }) {
    return fetchLoggedinUsers()
        .then((loggedinUsers) => {
            refreshLoggedinUsers(loggedinUsers);
            renderLoggedinUsers({ state });
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};
