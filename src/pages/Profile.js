import React, { useState, useEffect } from "react";
import "./Profile.css";
import { db } from "../firebase";
import { Button, Avatar, Modal } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import PostModal from "../components/PostModal";

function Profile() {
  const [posts, setPosts] = useState([]);
  const [likeCounter, setLikeCounter] = useState(0);
  const [comments] = useState(0);
  const [viewPost, setViewPost] = useState(false);

  const params = useParams();
  console.log("username profile: ", params.username);
  const username = params.username;

  useEffect(() => {
    let userPosts;
    db.collection("posts").onSnapshot((snapshot) => {
      // runs every time a new post is added
      userPosts = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
        .filter((o) => {
          return o.post.username === username;
        });
      setPosts(userPosts);
      let temp = 0;
      userPosts.forEach((p) => {
        temp += p.post.likeCounter;
      });
      setLikeCounter(temp);
    });
  }, [username]);

  const handleClick = (post, id) => {
    setViewPost(true);
    return (
      <Modal open={viewPost} onClose={() => setViewPost(false)}>
        <PostModal onClose={() => setViewPost(false)} post={post} id={id} />
      </Modal>
    );
  };

  return (
    <div className="app">
      <div className="app__header">
        <Link to="/">
          <img
            className="app__headerImage"
            src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
            alt=""
          />
        </Link>
        <div className="user__info">
          <Avatar className="user__avatar" src="/static/images/avatar/1.jpg" />
        </div>
      </div>
      <div className="profile__information">
        <div className="profile__container">
          <div>
            <Avatar
              className="profile__avatar"
              alt={username}
              src="static/images/avatar/1.jpg"
            />
          </div>
          <div className="profile__username"> {username} </div>
        </div>
        <div className="profile__stats">
          <div className="post__stats">
            <h3>Posts</h3>
            <h4>{posts.length}</h4>
          </div>
          <div className="follower__stats">
            <h3>Likes</h3>
            <h4>{likeCounter}</h4>
          </div>
          <div className="following__stats">
            <h3>Comments</h3>
            <h4>{comments}</h4>
          </div>
        </div>
      </div>
      <Button variant="outlined">
        <Link to="/profile/:username/editprofile">Edit profile</Link>
      </Button>

      <div className="profile__posts">
        {posts.map(({ post, id }) => (
          // <Post key={id} postId={id} user={username} username={post.username} imageUrl={post.imageUrl} caption={post.caption} likeCounter={post.likeCounter} />
          <Button key={id}>
            <img
              className="posts__images"
              src={post.imageUrl}
              onClick={() => {
                handleClick(post, id);
              }}
              alt=""
            />
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Profile;
