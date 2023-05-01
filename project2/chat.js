const messages = [];

function addMessage({ username, message }) {
    messages.push({ username: username, message: message });
}

const chat = {
    messages,
    addMessage,
};

module.exports = chat;
