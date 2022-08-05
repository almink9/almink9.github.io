import React from 'react';
import './App.css';
import Post from './components/Post';

function App() {
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
      <Post username='AlminK' caption='This is a caption' imageUrl='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png' />
      <Post username='MirzaK' caption='Comment 2' imageUrl='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png' />
      <Post username='TarikS' caption='Comment 3' imageUrl='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png' />
    </div>
  );
}

export default App;
