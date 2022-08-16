import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post';
import { auth, db } from './firebase';
import { Modal, Box, Button, Input } from '@mui/material';
import ImageUpload from './components/ImageUpload';

// function getModalStyle() {
//   const top = 50;
//   const left = 50;

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: 'absolute',
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

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

function App() {
  // const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in...
        console.log(authUser);
        setUser(authUser);
      } else {
        // user hsa logged out...
        setUser(null);
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

  return (
    <div className="app">
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ): (
        <h3>You need to log in to upload</h3>
      )} 
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
        />
      </div>

      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>  
      ): (
        <div className='app__loginContainer'>
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpenSignUp(true)}>Sign Up</Button>
        </div>
      )}

      
      {/* <h1>Hello</h1> */}


      {
        posts.map(({post, id}) => (
          <Post key={id} username={post.username} imageUrl={post.imageUrl} caption={post.caption} />
        ))
      }
    </div>
  );
}

export default App;
