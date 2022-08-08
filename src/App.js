import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post';
import { db } from './firebase';


function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      // runs every time a new post is added
      setPosts(snapshot.docs.map(doc => doc.data()));
    })
  }, []);

  return (
    <div className="app">
      <div className='app__header'>
        <img 
          className='app__headerImage'
          src='https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png'
          alt=''
        />
      </div>
      <h1>Hello</h1>

      {
        posts.map((post, i) => (
          <Post key={i} username={post.username} imageUrl={post.imageUrl} caption={post.caption} />
        ))
      }
    </div>
  );
}

export default App;
