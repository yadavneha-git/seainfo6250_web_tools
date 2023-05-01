import './Controls.css';
import { BUTTON_NAMES } from '../../utils/constants';
/* "below CSS adapted from https://css.gg under the MIT License" */

function Controls({
  onLogout,
  buttonOneName,
  buttonTwoName,
  onNavigationButtonClick,
}) {

  let buttonOneLabel;
  let buttOneClass;
  if (buttonOneName === BUTTON_NAMES.MY_PROFILE) {
    buttonOneLabel = 'My Profile';
    buttOneClass = 'gg-profile';
  } else if (buttonOneName === BUTTON_NAMES.SEARCH_USER) {
    buttonOneLabel = 'Search User'
    buttOneClass = 'gg-search';
  }

  let buttonTwoLabel;
  let buttonTwoClass;
  if (buttonTwoName === BUTTON_NAMES.SEARCH_USER) {
    buttonTwoLabel = 'Search User';
    buttonTwoClass = 'gg-search';
  } else if (buttonTwoName === BUTTON_NAMES.HOME_PAGE) {
    buttonTwoLabel = 'Home Page'
    buttonTwoClass = 'gg-home-alt';
  }

  return (
    <div className="controls">
      <button className='control_btn'
        value={buttonOneName}
        onClick={e => onNavigationButtonClick(e.target.value)}>
        <i className={buttOneClass}></i>
        {buttonOneLabel}
      </button>
      <button className='control_btn_page'
        value={buttonTwoName}
        onClick={e => onNavigationButtonClick(e.target.value)}><i className={buttonTwoClass}></i>
        {buttonTwoLabel}
      </button>

      <button className='control_btn_logout' onClick={onLogout}><i className="gg-log-out"></i>Logout</button>
    </div>
  );
}

export default Controls;
