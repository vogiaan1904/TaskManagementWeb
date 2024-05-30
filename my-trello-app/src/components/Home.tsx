import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, List, ListItem, ListItemText, Box, Container,
  Avatar,
  ListItemButton, } from '@mui/material';
import api from '../utils/api.ts'; // Import your API helper
import AddBoardDialog from './AddBoardDialog.js';
import { User } from './type';
import { Board } from './type'; // Import the Board interface
import { useNavigate } from 'react-router-dom';



function Home({ user, onLogout, triggerFetchBoard }: { user: User; onLogout: () => void; triggerFetchBoard: () => void }) { 
  console.log("Home component rendered"); // Track re-renders

  const [boards, setBoards] = useState<Board[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await api.get('/board/myBoard');
      setBoards(response.data.data);
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  const handleAddBoard = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateBoard = async (title: string) => {
    try {
      const response = await api.post('/board', { title });
      setBoards([...boards, response.data.data]);

      handleCloseDialog();

    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  return (
    <Box sx={{
      width:'100%',
      maxHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection:'column',
    }}>
      <Container //navbar
      sx={{
        height: '60px',
        minWidth: "100%",
        bgcolor: '#0d47a1',
        backdropFilter: "blur(24px)",
        position: "fixed",
        top: "0",
        left: "0",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.5rem",
      }}
      > 
        <Avatar //logo
        sx={{
          width: '100px',
          height: '20px',
          cursor: 'pointer',
          borderRadius: 0,
          color:'black',
        }}
        onClick={() => {
          navigate(`/`); 
        }}
        src="https://a.trellocdn.com/prgb/dist/images/header-logo-spirit-loading.87e1af770a49ce8e84e3.gif"
        /> 

        <Button type="submit" variant="contained" color="secondary" onClick={onLogout} sx={{
            fontSize:'16px',
            color:'#0d47a1',
            fontWeight:'bold',
            bgcolor: '#f4f5f7',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#f4f5f7',

            },
            '&:active': {
              boxShadow: 'none',
              backgroundColor: '#f4f5f7',

            },
            '&:focus':{
              border: 'none',
              outline: 'none',
            }
        }}>
          Log out
        </Button>


      </Container>
      <Box sx={{
        width:'100%',
        marginTop:'30px',
        height: 'calc(100vh - 60px)',
      }}>
        <Box sx={{
          marginTop:'70px',
          height:'fit-content',
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
        }}>
          <Box sx={{
            marginBottom:'30px',
          }}>
            <Typography variant="h4" gutterBottom>
              Welcome, {user.fullname} !
            </Typography>
            <AddBoardDialog
              open={openDialog}
              onClose={handleCloseDialog}
              onCreate={handleCreateBoard}
            />
          </Box>

          <Box sx={{ //boards box
            display:'flex',
            flexDirection:'column',
            minWidth: "400px",
            maxWidth: "400px",
            borderRadius: 2,
            padding: 1,
            height:'100%',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
          }}>
            <Box sx={{
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
            }}>
              <Typography sx={{
                fontWeight: 'bold',
              }} variant="h6" gutterBottom>
                Your boards
              </Typography>
            </Box>
            <Box sx={{
              padding:1
            }}>
              
              <List sx={{
                overflowY: 'scroll',
                maxHeight:'400px',
              }}>
                {boards.map((board) => (
            
                    <ListItem  sx={{
                      height:'40px',  
                      width:'100%',
                      borderRadius:'4px',
                      '&:hover': {
                        backgroundColor: '#f4f5f7',
      
                      },
                    }}button key={board.id}>
                      <ListItemButton  onClick={() => {
                      navigate(`/board/${board.id}`); 
                      triggerFetchBoard();
                    }}>
                        <ListItemText primary={board.title} />
                      </ListItemButton>
                    </ListItem>
                ))}
              </List>
            </Box>

            <Button type="submit" variant="contained" color="primary" onClick={handleAddBoard} component="button" sx={{
              width:'100%',
              fontSize:'16px',
              color:'white',
              fontWeight:'bold',
              bgcolor: '#5aac44',
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
              Add Board
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;