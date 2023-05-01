import render from './render.js';
import {
    fetchLogin,
    fetchLogout,
    fetchMessages,
    fetchLoggedinUsers,
    fetchSendMessage,
} from './services.js';
import {
    login,
    logout,
    waitOnChatMessages,
    waitOnLoggedinUsers,
    setError,
    setChatMessages,
    setLoggedinUsers,
} from './state';
import {
    pollChats,
    pollLoggedinUsers,
} from './refresher';

export function addAbilityToLogin({ state, mainEl }) {
    mainEl.addEventListener('click', (e) => {
        e.preventDefault();
        if (!e.target.classList.contains('login')) {
            return;
        }
        const usernameInput = document.querySelector('.username');
        const username = usernameInput.value.trim();
        waitOnChatMessages();
        waitOnLoggedinUsers();
        render({ state, mainEl });
        fetchLogin(username)
            .then((currentUser) => {
                login(currentUser.username);
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
            .catch((err) => {
                setError(err?.error || 'ERROR');
                render({ state, mainEl });
            });
    });
}

export function addAbilityToLogout({ state, mainEl }) {
    mainEl.addEventListener('click', (e) => {
        e.preventDefault();
        if (!e.target.classList.contains('logout')) {
            return;
        }
        logout();
        render({ state, mainEl });
        fetchLogout()
            .catch((err) => {
                setError(err?.error || 'ERROR');
                render({ state, mainEl });
            });
    });
}


export function addAbilityToSendMessage({ state, mainEl }) {
    mainEl.addEventListener('click', (e) => {
        e.preventDefault();
        if (!e.target.classList.contains('send')) {
            return;
        }
        const messageInput = document.querySelector('.message-input');
        const message = messageInput.value.trim();
        fetchSendMessage(message)
            .then((messages) => {
                setChatMessages(messages);
                render({ state, mainEl });
            })
            .catch((err) => {
                setError(err?.error || 'ERROR');
                render({ state, mainEl });
            });

    });
}
