import React, { useEffect, useState } from 'react';
import './Post.css';
import firebase from 'firebase/compat/app';
import { Avatar, Button } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { db } from '../firebase';

function Post({ postId, user, username, caption, likeCounter, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState(likeCounter);
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
    db.collection("posts").doc(postId).update({
      likeCounter: likes
    });
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
        <h4> Likes: {likeCounter} </h4>
        {isClicked ? (
          <Button variant='outlined' color='primary' disabled={!user} className={`post__likeButton ${isClicked && 'liked'}`} onClick={handleClick}
          sx={{
            height: '25px',
          }}>
            <ThumbUpOffAltIcon />
          </Button>
        ):(
          <Button variant='contained' color='primary' disabled={!user} className={`post__likeButton ${isClicked && 'liked'}`} onClick={handleClick}
          sx={{
            height: '25px',
          }}>
            <ThumbUpOffAltIcon />
          </Button>
        )}
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
          <Button
            color='primary'
            className='post__button'
            disabled={!comment}
            type='submit'
            onClick={postComment}
          >
            Post
          </Button>
        </form>
      )}

    </div>
  )
}

export default Post
