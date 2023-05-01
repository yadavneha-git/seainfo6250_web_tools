import { useState } from 'react';
import Controls from "../common/Controls";
import Loading from "../common/Loading";
import { BUTTON_NAMES } from "../../utils/constants";
import "./Search.css"

function SearchPage({
  onSearchUser,
  searchedUsers,
  isSearchedUsersPending,
  onLogout,
  onNavigationButtonClick,
  onDeleteFollowee,
  onAddFollowee
}) {

  const [searchText, setSearchText] = useState('');
  const [searchCompleted, setSearchCompleted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    onSearchUser(searchText);
    setSearchCompleted(true);
  }

  function handleChange(event) {
    setSearchText(event.target.value);
  }

  const SHOW = {
    PENDING: 'pending',
    EMPTY: 'empty',
    SEARCHED_USERS: 'searchedUsers',
  };

  let show;
  if (isSearchedUsersPending) {
    show = SHOW.PENDING;
  } else if (searchCompleted && !searchedUsers.length) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.SEARCHED_USERS;
  }

  return (
    <div className="search">
      {show === SHOW.PENDING && <Loading className="feed__waiting">Loading Search Results...</Loading>}
      <Controls
        onLogout={onLogout}
        buttonOneName={BUTTON_NAMES.MY_PROFILE}
        buttonTwoName={BUTTON_NAMES.HOME_PAGE}
        onNavigationButtonClick={onNavigationButtonClick} />
      <form className='search_form' onSubmit={handleSubmit}>
        <label className="search_label">Search:</label>
        <input className='search_input' type="text" value={searchText} onChange={handleChange} placeholder='Search here' />
        <button className='search_btn' type="submit">Search</button>
      </form>
      {show === SHOW.EMPTY && (
        <p className='search_text'>No users found!</p>
      )}
      {searchedUsers.map((result, index) => (
        <div key={index} className="user-list">
          <div className='result_username'><i className="gg-user"></i>{result.username}</div>
          <div className='follow_btn'>
            {result.follow &&
              <button value={result.id}
                onClick={e => onDeleteFollowee(e.target.value)}>
                Un Follow</button>}
            {!result.follow &&
              <button value={result.username}
                onClick={e => onAddFollowee(e.target.value)}>
                Follow</button>}
          </div>

        </div>
      ))}

    </div>
  );
}

export default SearchPage;
