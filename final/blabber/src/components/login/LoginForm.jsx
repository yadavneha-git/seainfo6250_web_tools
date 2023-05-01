import { useState } from 'react';
import './Login.css';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(username);
  }

  return (
    <div className="login">
      <div className='login_detail'>
        <img className="pic_login_side" src={require("../images/Login1.jpg")} alt="Logo" />
        <form className='login_form' onSubmit={handleSubmit}>
          <label className='welcome'>Welcome Back! See what's happening in the world right now. </label>
          <span className='username'>Username:</span>
          <input
            className='login_input'
            value={username}
            onInput={(e) => setUsername(e.target.value)}
          />
          <button
            className='login_btn'
            type="button"
            onClick={() => onLogin(username)}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );

}

export default LoginForm;
