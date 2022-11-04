import React, { useState, useEffect } from 'react';
import './Profile.css';
import { auth, db } from '../firebase';
import { Modal, Box, Button, Input, Avatar } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import Post from '../components/Post';

// function Profile({postId, user, username, imageUrl}) {
function Profile() {
	const [posts, setPosts] = useState([]);
	const [openPost, setOpenPost] = useState(false);
	// const [username, setUsername] = useState('');
	// const [email, setEmail] = useState('');
	// const [password, usePassword] = useState('');
	// const [user, setUser] = useState(null);

	const params = useParams();
	console.log("username profile: ", params.username);

	const username = params.username;

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      // runs every time a new post is added
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })
			
		).filter((o) => {
			return (o.post.username === username)
			
		}));
    })
  }, []);


	const handleClick = (event) => {
	}

	return (
		<div className='app'>
			<div className='app__header'>
				<Link to='/'>
					<img 
						className='app__headerImage'
						src='https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png'
						alt=''
					/>
				</Link>
					<div className='user__info'>
						<Avatar
							className='user__avatar'
							src='/static/images/avatar/1.jpg'
						/>
					</div>
			</div>
			<div className='profile__information'>
				<div className='profile__container'>
					<div>
						<Avatar 
							className='profile__avatar'
							alt='Almin Krbezlija'
							src='static/images/avatar/1.jpg'
						/>
					</div>
					<div className='profile__username'> {username} </div>
				</div>
				<div className='profile__stats'>
					<div className='post__stats'>
						<h3>Posts</h3>
						<h4>{posts.length}</h4>
					</div>
					<div className='follower__stats'>
						<h3>Likes</h3>
						<h4>0</h4>
					</div>
					<div className='following__stats'>
						<h3>Comments</h3>
						<h4>0</h4>
					</div>
				</div>
			</div>
			<Button variant='outlined'>Edit profile</Button>

				<div className='profile__posts'>
				{
					posts.map(({post, id}) => (
						// <Post key={id} postId={id} user={username} username={post.username} imageUrl={post.imageUrl} caption={post.caption} likeCounter={post.likeCounter} />
						<Button
							onClick={handleClick}
						>
							<img
								key={id}
								className='posts__images'
								src={post.imageUrl}
								alt=''
							/>
						</Button>

						// <Box key={id} />
					))
				}
			</div>
		</div>
	);
}

export default Profile;
