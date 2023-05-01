function render({ state, mainEl }) {
  const html = `
  <main class="">
  ${generateStatusHtml(state)}
    ${generateLoginHtml(state)}
    ${generateContentHtml(state)}
  </main>
 `;
  mainEl.innerHTML = html;
}

function generateStatusHtml(state) {
  return `
  <div class="errorLoginPage">${state.errorMessage}</div>
  `;
}

function generateLoginHtml(state) {
  if (state.isLoginPending) {
    return `
      <div class="login__waiting">Loading user...</div>
    `
  }
  if (state.isLoggedIn) {
    return ``;
  }
  return `
  <h2>Login</h2>
  
  <form class="form">
    <div class = "log">
      <label for="username-input" class="username-input" >Username:</label>
      <input type="text" id="username-input" class="username" data-name="username">
    </div>
    <button type="submit" class="login" >Login</button>
    
  </form>
  `;
}

function generateContentHtml(state) {
  if (!state.isLoggedIn) {
    return ``;
  }
  if (state.isChatMessagesPending) {
    return `
      <div class="content">
        ${generateControlsHtml(state)}
        <div class="chats__waiting">Loading chat messages...</div>
      </div>
    `;
  }
  return `
      <div class="content">
        ${generateControlsHtml(state)}
        <ul class="todos">${generateChatHtml(state)}</ul>
        ${generateAddTodoHtml(state)}
      </div>
  `;
}

function generateChatHtml(state) {
  const username = state.username ? `<span class="card__username">${state.username}</span>` : '';
  return `
  <h2>Welcome, ${username}!</h2>
  <div class="chat-app">
    <div class="loggedin">
      <label for="logged_users" class="loggedin_member">LoggedIn Users </label>
      <ul class="loggedin_Users">
      ${generateLoggedinUsers(state)}
      </ul>
    </div>
    <div class="chat_msg">
      <label for="chats" class="chats">Chats </label>
      <div class ="message_abc" >${generateChatMessages(state)}</div>
    </div>
  </div>
`;
}

function generateControlsHtml(state) {
  return `
        <div class="controls">
          <button class="logout">Logout</button>
        </div>
  `;
}

function generateAddTodoHtml(state) {
  return `
        <form class="add__form" action="#/add">
        <label for="message-input" class="input_message" >Message:</label>
        <input type="text" id="message-input" class="message-input" data-name="message-input">  
          <button type="submit" class="send" >Send</button>
        </form>
  `;
}

function generateChatMessages(state) {
  const reverseMessage = Object.values(state.chatMessages).reverse();
  const messages = Object.values(reverseMessage).map(message => {
    return `
    <div>
    <li>
    <p>${message.message}</p>
    <p>${message.username}</p>
    </li>
    </div>
    `;
  }).join('')
  return messages;
}

export function renderChatMessages({ state }) {
  const message_abc = document.querySelector('.message_abc');
  const reverseMessage = Object.values(state.chatMessages).reverse();
  const messages = Object.values(reverseMessage).map(message => {
    return `
    <div class ="message">
    <li>
    <p>${message.message}</p>
    <p>${message.username}</p>
    </li>
    </div>
    `;
  }).join('')
  message_abc.innerHTML = messages;
}

function generateLoggedinUsers(state) {
  const users = Object.values(state.loggedinUsers).map(username => {
    return `
    <li class="log_user"> ${username}
    </li>
    `;
  }).join('')
  return users;
}

export function renderLoggedinUsers({ state }) {
  const loggedinUsers = document.querySelector('.loggedin_Users');
  const users = Object.values(state.loggedinUsers).map(username => {
    return `
    <li class="log_user">${username}
    </li>
    `;
  }).join('')
  loggedinUsers.innerHTML = users;
}


export default render;
