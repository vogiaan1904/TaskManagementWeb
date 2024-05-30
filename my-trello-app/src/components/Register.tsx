import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Link,Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import api from '../utils/api.ts';
import trelloLogo from '../assets/trello-logo .svg';
import leftImage from '../assets/trello-left.svg';
import rightImage from '../assets/trello-right.svg';

function Register() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(''); // Clear any previous error messages

    try {
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match!');
        return;
      }

      const response = await api.post('/user/auth/register', {
        fullname,
        email,
        password,
        confirm: confirmPassword,
      });

      if (response.status === 201) {
        // Registration successful!
        alert('Registration successful! Please login.');
        navigate('/login'); // Redirect to login using useNavigate
      } else {
        // Handle registration errors from the backend (if any)
        setErrorMessage(response.data.message || 'Registration failed.'); 
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setErrorMessage('An error occurred during registration.');
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
          }} item xs={12} md={4}>
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
                Sign up for your account
              </Typography>
            </Box>
            {errorMessage && ( // Display error message if it exists
              <Typography color="error" variant="body2">
                {errorMessage}
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                label="Full Name"
                variant="standard"
                margin="normal"
                fullWidth
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
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
                label="Email"
                type="email"
                variant="standard"
                margin="normal"
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
              <TextField
                label="Confirm Password"
                type="password"
                variant="standard"
                margin="normal"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {/* ... (Your TextField components for fullname, email, password, confirmPassword) */}
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
                // color: 'white',
                // border: 'none',
                // border-radius: '4px',
                // cursor: 'pointer',
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
                Register
              </Button>
              <Link href="/login" variant="body2" style={{ marginTop: '10px' }}>
                Already have an account? Login
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

export default Register;