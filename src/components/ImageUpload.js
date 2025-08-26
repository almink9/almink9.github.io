import React, { useState } from 'react';
import './ImageUpload.css';
import { Button, InputBase, LinearProgress, Typography } from '@mui/material';
import { storage, db } from '../firebase';


function ImageUpload({username}) {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);


  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // error function...
        // console.log(error);
        alert(error.message);
      },
      () => {
        // TODO: complete function...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            // post image inside db
            db.collection('posts').add({
              caption: caption,
              imageUrl: url,
              username: username,
              likeCounter: 0,
              // timestamp: firebase.firestore.FieldValue.serverTimeStamp()
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className='upload__container'>
      {/* <progress className='upload__progress' value={progress} max='100' /> */}
      <div className='upload__progress'>
        <LinearProgress variant="determinate" value={progress} max='100' 
        sx={{
          height: '7px',
          width: '90%',
        }}/>
        <Typography variant='body2' color='textSecondary'>
        {`${Math.round(
          // props.value
          progress
        )}%`}
        </Typography>
      </div>
      {/* Caption Input */}
      <input className='upload__caption' type="text" placeholder='Enter a caption...' onChange={event => setCaption(event.target.value)} value={caption} />
      {/* File Picker */}
      <InputBase type="file" onChange={handleChange} className='filePicker' />
      {/* Post Button */}
      <Button variant='contained' color='primary' component='label' className='imageupload__button' onClick={handleUpload}
      sx={{
        width: '98%',
        marginLeft: "auto",
        marginRight: "auto",
      }}>
        UPLOAD
      </Button>
    </div>
  )
}

export default ImageUpload
