import { useState } from "react";
import Controls from "../common/Controls";
import Loading from "../common/Loading";
import { BUTTON_NAMES } from "../../utils/constants";
import './homePage.css';
/* "below CSS adapted from https://css.gg under the MIT License" */

function HomePage({
    onLogout,
    onNavigationButtonClick,
    onAddReply,
    isFeedPending,
    feed,
}) {

    const [replies, setReplies] = useState({});

    function handleSubmit(event) {
        event.preventDefault();
        const postId = event.target.dataset.id;
        const username = event.target.dataset.username;
        const reply = replies[postId];
        onAddReply(postId, username, reply);
        setReplies((prev) => {
            return { ...prev, [postId]: '' };
        });
    }

    function handleChange(event) {
        setReplies((prev) => {
            return { ...prev, [event.target.dataset.id]: event.target.value };
        });
    }

    const SHOW = {
        PENDING: 'pending',
        EMPTY: 'empty',
        FEED: 'feed',
    };

    let show;
    if (isFeedPending) {
        show = SHOW.PENDING;
    } else if (!feed.length) {
        show = SHOW.EMPTY;
    } else {
        show = SHOW.FEED;
    }

    return (
        <div className="content">
            {show === SHOW.PENDING && <Loading className="feed__waiting">Loading Feed...</Loading>}
            <Controls
                onLogout={onLogout}
                buttonOneName={BUTTON_NAMES.MY_PROFILE}
                buttonTwoName={BUTTON_NAMES.SEARCH_USER}
                onNavigationButtonClick={onNavigationButtonClick} />
            <div className="all_details">
                {show === SHOW.EMPTY && (
                    <p className="feed_text">No Feed yet, follow users to generate feed!</p>
                )}

                {
                    Object.values(feed)?.map((post, postIndex) => {
                        return (
                            <div key={post.id} className="single_post">
                                <div>
                                    <div className="post_detail" key={postIndex}>
                                        <div className="post_user"><i className="gg-hello"></i>@{post.username}</div>
                                        <div className="post">{post.post}</div>
                                        <div className="post_time">{post.postTime}</div>
                                    </div>
                                    {post.replies?.map((reply, replyIndex) => {
                                        return <div className="reply_detail" key={replyIndex}>
                                            <div className="reply_user"><i className="gg-hello"></i> @{reply.username}</div>
                                            <div className="reply">{reply.reply}</div>
                                            <div className="reply_time">{reply.replyTime}</div>
                                        </div>
                                    })}
                                    <form
                                        className="post_details"
                                        data-id={post.id}
                                        data-username={post.username}
                                        onSubmit={handleSubmit}>
                                        <input

                                            className="reply_area"
                                            data-id={post.id}
                                            type="textarea"
                                            placeholder="Reply"
                                            value={replies[post.id] || ''}
                                            onChange={handleChange}
                                        />
                                        <button className="reply_btn" type="submit">Reply</button>
                                    </form>
                                </div>
                            </div>)
                    })
                }
            </div>

        </div>
    );
}

export default HomePage;
