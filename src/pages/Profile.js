import React, { useState, useEffect } from "react";
import "./Profile.css";
import { db } from "../firebase";
import { Button, Avatar, Modal } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Post from "../components/Post";

function Profile() {
  const [posts, setPosts] = useState([]);
  const [likeCounter, setLikeCounter] = useState(0);
  const [comments, setComments] = useState(0);
  const [viewPost, setViewPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const params = useParams();
  const username = params.username;

  useEffect(() => {
    let userPosts;
    db.collection("posts").onSnapshot(async (snapshot) => {
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
      console.log("userPosts: ", userPosts);
      let temp = 0;
      userPosts.forEach((p) => {
        temp += p.post.likeCounter;
      });
      setLikeCounter(temp);

      // Comments counter
      let tempComments = 0;
      await Promise.all(
        userPosts.map(async (p) => {
          const commentsSnapshot = await db
            .collection("posts")
            .doc(p.id)
            .collection("comments")
            .get();
          tempComments += commentsSnapshot.size;
        })
      );
      setComments(tempComments);
      console.log("Total comments: ", tempComments);
    });
  }, [username]);

  const handleClick = (post, id) => {
    setSelectedPost(post);
    setSelectedPostId(id);
    setViewPost(true);
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

      <Modal open={viewPost} onClose={() => setViewPost(false)}>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1300,
            overflowY: "auto",
          }}
        >
          {selectedPost && (
            <Post
              postId={selectedPostId}
              user={{ displayName: username }}
              username={selectedPost.username}
              caption={selectedPost.caption}
              likeCounter={selectedPost.likeCounter}
              imageUrl={selectedPost.imageUrl}
            />
          )}
        </div>
      </Modal>
    </div>
  );
}

export default Profile;
