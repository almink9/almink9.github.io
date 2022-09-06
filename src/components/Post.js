import React, { useEffect, useState } from 'react';
import './Post.css';
// import firebase from 'firebase';
import firebase from 'firebase/compat/app';
import { Avatar } from '@mui/material';
import { db } from '../firebase';

function Post({ postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    }; 
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      username: user.displayName,
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment('');
  }

  const handleClick = () => {
    if (isClicked) {
      setLikes(likes - 1);
    }
    else setLikes(likes + 1);
    setIsClicked(!isClicked);
  }

  return (
    <div className='post'>
      <div className='post__header'>
        <Avatar 
          className='post__avatar'
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>
      <img className='post__image' src={imageUrl} alt='' />

      <div className='post__caption'>
        <h4> Likes: {likes} </h4>
        <button className={`post__likeButton ${isClicked && 'liked'}`} onClick={handleClick}>
          LIKE
        </button>
      </div>
      <h4 className='post__text'><strong>{username} </strong>{caption}</h4>

      <div className='post__comments'>
        {comments.map((comment, id) => (
          <p key={id}>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className='post__commentBox'>
          <input 
            className='post__input'
            type='text'
            placeholder='Add a comment...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className='post__button'
            disabled={!comment}
            type='submit'
            onClick={postComment}
          >
            Post
          </button>
        </form>
        

      )}

    </div>
  )
}

export default Post