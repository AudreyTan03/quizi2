import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin.userInfo);
  useEffect(() => {
    if (userLogin === null) {
      navigate('/');
    }
  }, [userLogin]);

  return (
    <Container maxWidth="sm" sx={{ marginTop: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: '#333', color: '#fff' }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item>
            <Avatar alt="User Avatar" src="/avatar.jpg" sx={{ width: 120, height: 120 }} />
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <Typography variant="h5" align="center" gutterBottom>
              {userLogin ? userLogin.username : "Guest"}
            </Typography>
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <Typography variant="body1">
              {userLogin ? userLogin.email : null}
            </Typography>
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <Button variant="contained" color="primary">
              Change Password
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfileScreen;
