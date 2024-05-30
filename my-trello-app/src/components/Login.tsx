import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Link,Box } from '@mui/material';
import trelloLogo from '../assets/trello-logo .svg';
import leftImage from '../assets/trello-left.svg';
import rightImage from '../assets/trello-right.svg';
import api from '../utils/api.ts'; // Import your API helper

// Define the type for the onLogin function
type OnLogin = (email: string, password: string) => Promise<void>;

function Login({ onLogin }: { onLogin: OnLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(''); // Clear previous error messages
  
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return; // Stop execution if validation fails
    }
  
    try {
      // Send login request to your backend API
      const response = await api.post('/user/auth/login', { email, password });
      if (response.status === 200) {
        // Successful login
        // ... (Handle the success case: save token, update state, redirect, etc.)
        localStorage.setItem('accessToken', response.data.data.accessToken);
        onLogin(email, password); // Assuming onLogin updates state and/or redirects
      }

      else{
        // Handle login errors from the backend
        setErrorMessage(response.data.message || 'Login failed.'); 
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setErrorMessage('Wrong email or password.'); 
    }
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems="center"
      justifyContent='end'
      style={{ minHeight: '100vh',maxHeight: '100vh', width: '100%' }}
      bgcolor={' #f4f5f7'}
    > 
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '150px',
        
      }}>
        <img style={{width: '150px', marginBottom: '50px' }} src={trelloLogo} alt="Trello Logo" className="logo" />
      </Box>
      <Box sx={{
        width: '100%',
        height: '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Box sx={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'end',
          width: '500px',
        }}>
          <img style={{  width: '500px'}} src={leftImage} alt="Left illustration" className="login-image left" />
        </Box>
        <Box sx={{
          height:'100%',
        }}>
          <Grid sx={{
            bgcolor: '#fafafa',
            p: 1,
            borderRadius: 2,
            height: 'fit-content',
            width: '400px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            padding: 3,
          }} 
          item xs={12} md={4}
          >
            <Box sx={{
              marginBottom: '10px',
              width: '100%',
              display: 'flex',
              alignItems:"center",
              justifyContent:"center",
            }}>
              <Typography sx={{
                align:"center",
                fontWeight : 'bold',
              }} variant="h6" gutterBottom>
                Log in to Trello
              </Typography>
            </Box>
            {errorMessage && ( // Display error message if it exists
              <Typography color="error" variant="body2">
                {errorMessage}
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                variant="standard"
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& .MuiInput-root": {
                    color: "#000",
                    fontFamily: "Arial",
                    // Bottom border
                    "&:before": {
                      borderColor: "#2e2e2e",
                      borderWidth: "1px",
                    },
                  },
                  // Label
                  "& .MuiInputLabel-standard": {
                    color: "#2e2e2e",
                  },
                }}
              />
      
              <TextField
                label="Password"
                type="password"
                variant="standard"
                margin="normal"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  "& .MuiInput-root": {
                    color: "#000",
                    fontFamily: "Arial",
                    // Bottom border
                    "&:before": {
                      borderColor: "#2e2e2e",
                      borderWidth: "1px",
                    },
                  },
                  // Label
                  "& .MuiInputLabel-standard": {
                    color: "#2e2e2e",
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{ marginTop: '20px', marginBottom: '10px'}}
                sx={{
                bgcolor:"#5aac44",
                borderColor: 'none',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#4caf50',

                },
                '&:active': {
                  boxShadow: 'none',
                  backgroundColor: '#4caf50',

                },
                '&:focus':{
                  border: 'none',
                  outline: 'none',
                }
                }}
              >
                Submit
              </Button>
              <Link href="/register" variant="body2" style={{ marginTop: '10px' }}>
                Don't have an account? Register
              </Link>
            </form>
          </Grid>
        </Box>
        <Box sx={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'end',
          width: '500px',
          alignItems:'flex-end',
        }}>
          <img style={{  right: 0, bottom:0, width: '500px' }}  src={rightImage} alt="Right illustration" className="login-image right" />
        </Box>
      </Box>
    </Box>
  );
}

export default Login;