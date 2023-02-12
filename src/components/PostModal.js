import { Box, Button, Typography } from "@mui/material";
import { auth, db } from "../firebase";
import { Close } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

function PostModal({ onClose, post, id }) {
  const handleClose = () => {
    onClose();
  };
  console.log("clicked image id: ", id);
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        flexDirection: "column",
        border: "1px solid lightgray",
        margin: 2,
        backgroundColor: "lightgray",
        borderRadius: "10px",
        height: "96vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            backgroundColor: "lightgray",
          }}
        >
          <strong>{post.username}:</strong>
          {post.caption}
        </Typography>
        <Button variant="contain" onClick={handleClose}>
          <Close />
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box sx={{}}>
          <img
            // src="https://imgs.search.brave.com/vGLkOkmEQWBoQGAECMDK5ce11D8MweoLr7sKGUZ90z8/rs:fit:640:554:1/g:ce/aHR0cDovL2Zhcm0z/LnN0YXRpY2ZsaWNr/ci5jb20vMjA5OC8y/MjA0NzQ2MTc5X2Yx/Y2FjMmVmNWZfei5q/cGc"
            src={post.imageUrl}
            style={{ height: "100%", width: "1000px", float: "left" }}
            alt=""
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ margin: 1, textAlign: "center" }}>
            <strong>Comments:</strong>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default PostModal;
