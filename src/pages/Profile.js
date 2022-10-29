import React, { useState, useEffect } from 'react';
import './Profile.css';
import { auth, db } from '../firebase';
import { Modal, Box, Button, Input, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

function Profile() {

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
					<div className='profile__username'> Almin Krbezlija </div>
				</div>
				<div className='profile__stats'>
					<div className='post__stats'>
						<h3>Posts</h3>
						<h4>0</h4>
					</div>
					<div className='follower__stats'>
						<h3>Followers</h3>
						<h4>0</h4>
					</div>
					<div className='following__stats'>
						<h3>Following</h3>
						<h4>0</h4>
					</div>
				</div>
			</div>
			<Button variant='outlined'>Edit profile</Button>
			<div className='profile__posts'>
				<img 
					className='posts__images'
					src='https://imgs.search.brave.com/S1NKBo5rFaPP80pOWoLVrmmkWv5_ka2CT0LRvu1VSIk/rs:fit:1200:900:1/g:ce/aHR0cHM6Ly9jZG4u/N2JvYXRzLmNvbS9h/Y2FkZW15L3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE3LzA0L2dv/b2dsZS1pbWFnZXMu/anBn' 
					alt=''
				/>
			</div>
		</div>
	);
}

export default Profile;
