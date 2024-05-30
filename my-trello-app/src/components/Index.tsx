import React from 'react';
import { Link } from 'react-router-dom';
import trelloLogo from '../assets/trello-logo .svg';
import { Box, Button, Typography, Grid, Container } from '@mui/material';

const Index = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#ebecf0', 
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <Container  sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        backgroundColor: '#ebecf0',
        minWidth: '100%',
      }}>
        <Box sx={{
          width: '120px',
        }}>
          <img src={trelloLogo} alt="Trello Logo" />
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{
              margin: '0 10px',
              padding: '10px 20px',
              borderRadius: '5px',
              fontSize: '16px',
              backgroundColor: '#0079bf',
              color: 'white',
              textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#1e88e5',

                },
                '&:active': {
                  boxShadow: 'none',
                  backgroundColor: '#1e88e5',

                },
                '&:focus':{
                  border: 'none',
                  outline: 'none',
                }
            }}>
              Login
            </Button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{
              padding: '10px 20px',
              borderRadius: '5px',
              fontSize: '16px',
              backgroundColor: '#0079bf',
              color: 'white',
              textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#1e88e5',

                },
                '&:active': {
                  boxShadow: 'none',
                  backgroundColor: '#1e88e5',

                },
                '&:focus':{
                  border: 'none',
                  outline: 'none',
                }
            }}>
              Sign Up
            </Button>
          </Link>
        </Box>
      </Container>

      <Container  sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        padding: '40px',
        backgroundColor: '#ebecf0',
        marginTop: '40px',
        minWidth: '100%',
      }}>
        <Grid container spacing={4} sx={{
            display:'flex',
            justifyContent:'space-between',
            width: '100%',
        }}>
          <Box  sx={{
            width:'800px',
            marginTop:'100px',
          }}>
            <Box sx={{
                width:'100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems:'start',
                paddingLeft:'120px',
            }}>
                <Typography variant="h4" sx={{
                fontSize: '36px',
                color: '#172b4d',
                marginBottom: '16px',
                fontWeight: 'bold',
                }}>
                Trello helps teams move work forward.
                </Typography>

                <Typography variant="body1" sx={{
                fontSize: '20px',
                color: '#5e6c84',
                marginBottom: '40px',
                fontWeight:'bold',
                }}>
                Collaborate, never teamworks. How to pass PDM A+? Use Trello!
                </Typography>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" sx={{
                    backgroundColor: '#5aac44',
                    color: 'white',
                    padding: '15px 30px',
                    borderRadius: '5px',
                    fontSize: '18px',
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
                    }}>
                    Sign up - it's free !
                    </Button>
                </Link>
            </Box>
          </Box>
        <Box sx={{
            width: '550px'
        }}>
            <Box sx={{
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            width: '450px',
            maxWidth: '100%',
            marginLeft:'20px',
             }}>
            <img src={"https://images.ctfassets.net/rz1oowkt5gyp/5QIzYxue6b7raOnVFtMyQs/113acb8633ee8f0c9cb305d3a228823c/hero.png?w=1200&fm=webp"} alt="Illustration" />
            </Box>
        </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default Index;