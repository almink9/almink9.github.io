import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Post from '../components/Post';
import { auth, db } from '../firebase';
import { Modal, Box, Button, Input, Avatar } from '@mui/material';
import ImageUpload from '../components/ImageUpload';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Home() {
	  // const classes = useStyles();
	const [posts, setPosts] = useState([]);
  // const [open, setOpen] = React.useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  // const handleOpen = () => setOpen(true);
	// const handleClose = () => setOpen(false);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
	const [profileLink, setProfileLink] = useState('');
	  
	
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in...
        setUser(authUser);
				// setUsername(authUser.displayName);
				setProfileLink(`/profile/${authUser.displayName}`);
        console.log(authUser.displayName);
      } else {
        // user has logged out...
        setUser(null);
				;
      }
    })

    return () => {
      // perform some cleanup actions
      unsubscribe();
    }
  }, [user, username]);

	
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      // runs every time a new post is added
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .then(function() {
      // after sign up
      window.location.reload();
    })
    .catch((error) => alert(error.message));

    setOpenSignUp(false);
  }

  const signIn = (event) => {
    event.preventDefault();
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))
    setOpenSignIn(false);
  }

  const moveToTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    
  }

  return (
		<div className="app">
			{/* <ImageUpload username={user.displayName} /> */}
			<Modal 
			open={openSignIn}
			onClose={() => setOpenSignIn(false)}
			>
			<Box sx={style}>
				<form className="app__signin">
					<center>
						<img 
							className='app__headerImage'
							src='https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png'
							alt=''
						/>
					</center>
					<Input 
						placeholder="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input 
						placeholder="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button type="submit" onClick={signIn}>Sign In</Button>
				</form>
			</Box>
			</Modal>


			<Modal
				
				open={openSignUp}
				onClose={() => setOpenSignUp(false)}
			>
				<Box sx={style}>
					<form className="app__signup">
						<center>
							<img 
								className='app__headerImage'
								src='https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png'
								alt=''
							/>
						</center>
						<Input 
							placeholder="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<Input 
							placeholder="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input 
							placeholder="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button type="submit" onClick={signUp}>Sign Up</Button>
					</form>
				</Box>
			</Modal>

			<div className='app__header'>
				<img 
					className='app__headerImage'
					src='https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png'
					alt=''
					onClick={moveToTop}
				/>
				{user ? (
					<div className='user__info'>
						<Link to={profileLink}>
							<Avatar
								className='user__avatar'
								alt={user.displayName}
								src='/static/images/avatar/1.jpg'
							/>
						</Link>
						<Button variant='contained' className='app__logout' onClick={() => auth.signOut()}>Logout</Button>  
					</div>
				): (
					<div className='app__loginContainer'>
						<Button variant='outlined' onClick={() => setOpenSignIn(true)}>Sign In</Button>
						<Button variant='outlined' onClick={() => setOpenSignUp(true)}>Sign Up</Button>
					</div>
				)}
			</div>

			
			<div className='app__posts'>
				{user ? (
					<ImageUpload username={user.displayName} />
				): (
					<h3 className='requirement__login'>You need to log in to upload</h3>
				)} 
				{
					posts.map(({post, id}) => (
						<Post key={id} postId={id} user={user} username={post.username} imageUrl={post.imageUrl} caption={post.caption} likeCounter={post.likeCounter} />
					))
				}
			</div>

		</div>
  );
}

export default Home;
