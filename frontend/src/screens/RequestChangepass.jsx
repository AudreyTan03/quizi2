import React, { useState } from 'react';
import axios from 'axios';
import { Avatar, Typography, Box, TextField, Button, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function RequestChangePass() {
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false); // State to track email validity

  const handleRequestPass = async (e) => {
    e.preventDefault();

    // Check if the email is valid and associated with an active account
    if (!validEmail) {
      console.log('Email is not valid or associated with an active account');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/send-reset-password-email/',
        { email },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Request Password Response:', response.data);
    } catch (error) {
      console.error('Error making request password API call:', error.message);
    }
  };

  // Function to validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Function to check if email is associated with an active account (dummy implementation)
  const checkEmailValidity = async () => {
    try {
      // Make a request to your API to check email validity
      // For demonstration purposes, assume the email is valid
      setValidEmail(true);
    } catch (error) {
      console.error('Error checking email validity:', error.message);
      setValidEmail(false);
    }
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    if (validateEmail(value)) {
      checkEmailValidity();
    } else {
      setValidEmail(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={handleRequestPass} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleEmailChange}
            value={email}
            sx={{ color: 'black' }} // Text color changed to black
          />
          {!validEmail && email && <Typography color="error" sx={{ color: 'white' }}>Email is not valid or associated with an active account</Typography>} {/* Text color changed to white */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!validEmail}
          >
            Send Reset Password Email
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default RequestChangePass;
