import { useState } from "react";
import Loading from "../common/Loading";
import Controls from "../common/Controls";
import { BUTTON_NAMES } from "../../utils/constants";
import './profile.css';

function ProfilePage({
  onLogout,
  onNavigationButtonClick,
  onAddPost,
  username,
  onDeleteFolloweeFromProfilePage,
  isProfileFeedPending,
  profileFeed,
  followees,
  onDeletePost,
}) {

  const [post, setPost] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onAddPost(post);
    setPost('');
  }

  function handleChange(event) {
    setPost(event.target.value);
  }

  const SHOW = {
    PENDING: 'pending',
    EMPTY: 'empty',
    PROFILE_FEED: 'profilFeed',
  };

  let show;
  if (isProfileFeedPending) {
    show = SHOW.PENDING;
  } else if (!profileFeed.length) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.PROFILE_FEED;
  }

  return (
    <div className="content_search">
      {show === SHOW.PENDING && <Loading className="Post__waiting">Loading Profile Feed...</Loading>}
      <Controls
        onLogout={onLogout}
        buttonOneName={BUTTON_NAMES.SEARCH_USER}
        buttonTwoName={BUTTON_NAMES.HOME_PAGE}
        onNavigationButtonClick={onNavigationButtonClick} />
      <div>
        <form className="form_profile" onSubmit={handleSubmit}>
          <input className="profile_input" type="text" value={post} onChange={handleChange} placeholder="What's new and exciting?" />
          <button className="profile_btn" type="submit">Post</button>
        </form>
        {show === SHOW.EMPTY && (
          <p className="feed_text">No Posts available!</p>
        )}

        {
          Object.values(profileFeed)?.map((feed, feedIndex) => {
            return <div className='single_detail' key={feed.id}>
              <div className="profile_detail" key={feedIndex}>
                <div className="feed_username">@{username}
                  <button
                    value={feed.id}
                    onClick={e => onDeletePost(e.target.value)}
                    className="delete_btn">Delete Post</button>
                </div>
                <div className="feed_post">
                  {feed.post}
                </div>
                <div className="feed_posttime"> {feed.postTime}</div>
              </div>
              {feed.replies?.map((reply, replyIndex) => {
                return <div className='profile_details' key={replyIndex}>
                  <div className="profile_username"><i className="gg-user"></i>@{reply.username} </div>
                  <div className="profile_reply">{reply.reply} </div>
                  <div className="profile_replytime">{reply.replyTime}</div>
                </div>
              })}
            </div>
          })
        }
      </div>

      <p className="head_unfollow">Users you are Following</p>
      <div className="followees_users">
        <div>
          {Object.keys(followees).length === 0 && (
            <p className="feed_text">You are not following any user</p>)}
          {
            Object.keys(followees)?.map((followeeId, index) => {
              return <div key={index}>
                <span className="user_label">{followees[followeeId]}</span>
                <button value={followeeId}
                  onClick={e => onDeleteFolloweeFromProfilePage(e.target.value)}
                  className='unfollow_btn'>Unfollow</button>
              </div>
            })
          }
        </div>
      </div>
    </div>
  )
};

export default ProfilePage;
