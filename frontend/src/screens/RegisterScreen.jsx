import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";

import FormContainer from "../components/FormContainer";

import {
  Typography,
  Avatar,
  Box,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Message from "../components/Message";


function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userLoginUserInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  let navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo || userLoginUserInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      dispatch(register(username, email, password));
      if (password !== confirmPassword) {
        setMessage("Passwords do not match");
      }
      if (error) {
        setMessage(error.detail);
        console.log("may error", error.detail);
      }
      if (password === confirmPassword && !error) {
        navigate("/verify-otp");
      }
    } catch (error) {
      setMessage(error.detail);
    }
  };

//   const submitHandler = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await dispatch(register(username, email, password));
//     console.log('Register Response:', response);

//     // Check if there is an error message in the response
//     if (response && response.message && response.message !== 'User created successfully') {
//       console.error('Registration failed:', response.message);
//       // Handle unsuccessful registration, e.g., display an error message
//     } else {
//       // Registration was successful
//       console.log('Registration successful');
//       const { user_id, otp_id } = response;
//       navigate(`/verify-otp?user_id=${user_id}&otp_id=${otp_id}`);
//     }
//   } catch (error) {
//     console.error('Error during registration:', error.message);
//     // Handle other errors, e.g., display a generic error message
//   }
// };
  return (
    <FormContainer>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Avatar sx={{ m: 1, bgcolor: "inherit" }}>
            <PersonAddAltIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          {error && (
            <Message severity="error" variant="filled">
              {message}
            </Message>
          )}
          <Box
            data-aos={"fade-up"}
            component="form"
            onSubmit={submitHandler}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderColor: "white !important",
                  backgroundColor: "#424242 !important",
                },
                "& label.Mui-focused": {
                  color: "white !important", // Change label color when focused
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white !important", // Change border color when focused
                },
                "& input": {
                  color: "white !important", // Change input text color
                },
                "& .MuiInputLabel-root": {
                  color: "white !important", // Change label color
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "white !important", // Change border color on hover
                  },
                "& .MuiOutlinedInput-root:active": {
                  color: "white !important",
                  borderColor: "white !important",
                },
                "& .input": {
                  color: "white !important",
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderColor: "white !important",
                  backgroundColor: "#424242 !important",
                },
                "& label.Mui-focused": {
                  color: "white !important", // Change label color when focused
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white !important", // Change border color when focused
                },
                "& input": {
                  color: "white !important", // Change input text color
                },
                "& .MuiInputLabel-root": {
                  color: "white !important", // Change label color
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "white !important", // Change border color on hover
                  },
                "& .MuiOutlinedInput-root:active": {
                  color: "white !important",
                  borderColor: "white !important",
                },
                "& .input": {
                  color: "white !important",
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              autoFocus
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderColor: "white !important",
                  backgroundColor: "#424242 !important",
                },
                "& label.Mui-focused": {
                  color: "white !important", // Change label color when focused
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white !important", // Change border color when focused
                },
                "& input": {
                  color: "white !important", // Change input text color
                },
                "& .MuiInputLabel-root": {
                  color: "white !important", // Change label color
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "white !important", // Change border color on hover
                  },
                "& .MuiOutlinedInput-root:active": {
                  color: "white !important",
                  borderColor: "white !important",
                },
                "& .input": {
                  color: "white !important",
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              autoComplete="confirmPassword"
              autoFocus
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderColor: "white !important",
                  backgroundColor: "#424242 !important",
                },
                "& label.Mui-focused": {
                  color: "white !important", // Change label color when focused
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white !important", // Change border color when focused
                },
                "& input": {
                  color: "white !important", // Change input text color
                },
                "& .MuiInputLabel-root": {
                  color: "white !important", // Change label color
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "white !important", // Change border color on hover
                  },
                "& .MuiOutlinedInput-root:active": {
                  color: "white !important",
                  borderColor: "white !important",
                },
                "& .input": {
                  color: "white !important",
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{
                mt: 3,
                mb: 2,
                color: "inherit",
                borderColor: "white !important",
              }}
            >
              Sign Up
            </Button>

            <Grid container>
              <Grid item>
                <Typography
                  component={Link}
                  to={"/login"}
                  sx={{ color: "white" }}
                >
                  {"Already have an account? Sign in."}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </FormContainer>
  );
}

export default RegisterScreen;
