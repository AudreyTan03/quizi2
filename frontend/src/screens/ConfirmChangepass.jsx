import React, { useState } from 'react';
import axios from 'axios';
import { Avatar, Typography, Box, TextField, Button, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate, useParams } from 'react-router-dom';

function ConfirmChangepass() {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/reset-password/${uid}/${token}/`,
        { password, password2 },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Confirm Reset Password Response:', response.data);
      navigate('/'); // Redirect to home page after password reset confirmation
    } catch (error) {
      console.error('Error confirming reset password:', error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Confirm Change Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="New Password"
            type="password"
            autoComplete="new-password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderColor: "white !important",
                backgroundColor: "#424242 !important",
              },
              "& label.Mui-focused": {
                color: "white !important",
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white !important",
              },
              "& input": {
                color: "white !important",
                borderColor: "white !important",
              },
              "& .MuiInputLabel-root": {
                color: "white !important",
                borderColor: "white !important",
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white !important",
              },
              "& .MuiOutlinedInput-root:active": {
                color: "white !important",
                borderColor: "white !important",
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Confirm Password"
            type="password"
            id="password2"
            autoComplete="new-password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderColor: "white !important",
                backgroundColor: "#424242 !important",
              },
              "& label.Mui-focused": {
                color: "white !important",
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white !important",
              },
              "& input": {
                color: "white !important",
                borderColor: "white !important",
              },
              "& .MuiInputLabel-root": {
                color: "white !important",
                borderColor: "white !important",
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white !important",
              },
              "& .MuiOutlinedInput-root:active": {
                color: "white !important",
                borderColor: "white !important",
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2, color: "inherit", borderColor: "white !important" }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ConfirmChangepass;



