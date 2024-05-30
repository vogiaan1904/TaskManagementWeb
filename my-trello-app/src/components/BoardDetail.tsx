  import React, { useState, useEffect } from 'react';
  import { useParams, useNavigate } from 'react-router-dom';
  import {
    Grid,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    Fab,
    Tooltip,
    Box,
    Container,
    Avatar,
    IconButton,
  } from '@mui/material';
  import NoteAddIcon from "@mui/icons-material/NoteAdd";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import AddCardIcon from "@mui/icons-material/AddCard";
  import DeleteIcon from '@mui/icons-material/Delete';
  import EditIcon from '@mui/icons-material/Edit';

  import api from '../utils/api.ts';
  import AddColumnDialog from './AddColumnDialog.tsx';
  import AddCardDialog from './AddCardDialog.tsx';
  import EditCardDialog from './EditCardDialog.tsx';
  import DeleteCardDialog from './DeleteCardDialog.tsx';
  import { Card } from './type';
  import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    useDraggable,
  } from '@dnd-kit/core';
  import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
  } from '@dnd-kit/sortable';
  
  import { CSS } from '@dnd-kit/utilities';


  interface Board {
    id: number;
    title: string;
  }

  interface Column {
    id: number;
    title: string;
    boardID: number;
  }

  interface SortableItemProps {
    id: string;
    children: React.ReactNode;
  }


  function BoardDetail({ user, onLogout, }: { user: any; onLogout: () => void }) {
    console.log("BoardDetail rendered");
    const { boardId } = useParams<{ boardId: string }>();

    const [board, setBoard] = useState<Board | null>(null);
    const [columns, setColumns] = useState<Column[]>([]);
    const [cards, setCards] = useState<Card[]>([]);

    const [openAddColumnDialog, setOpenAddColumnDialog] = useState(false);
    const [openAddCardDialog, setOpenAddCardDialog] = useState(false);
    const [openEditCardDialog, setOpenEditCardDialog] = useState(false);
    const [openDeleteCardDialog, setOpenDeleteCardDialog] = useState(false);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [selectedColumn, setSelectedColumn] = useState<number | null>(null);
    const [newCardTitle, setNewCardTitle] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //   if (boardId) {
    //     fetchBoard();
    //     console.log("fetch board ran");
    //   }
    // }, [boardId]);

    useEffect(() => {
      const fetchAndSetData = async () => {
        if (boardId) {
          setIsLoading(true);
          try {
            // const response = await api.get<{ board: Board; columnData: Column[]; cardData: Card[] }>(`/board/${boardId}`);
            const response = await api.get(`/board/${boardId}`);
            console.log("Type of response.data:", typeof response);
            const boardData = response.data.data.board;
            const columnData = response.data.data.columnData;
            const cardData = response.data.data.cardData; 
      
            console.log("API response:", response.data);
            console.log("Board:", boardData);
            console.log("Columns:", columnData);
            console.log("Cards:", response.data.cardData);
            setBoard(boardData);
            setColumns(columnData);
            setCards(cardData);

          } catch (error) {
            console.error('Error fetching board:', error);
          } finally {
            setIsLoading(false);
          }
        }
      };
      fetchAndSetData();
    }, [boardId]);


    


    // const fetchBoard = async () => {
    //   try {
    //     setIsLoading(true);
    //     const response = await api.get<{ board: Board; columnData: Column[]; cardData: Card[] }>(`/board/${boardId}`);
    //     console.log("API Response (Full):", response);
    //     setBoard(response.data.board);
    //     setColumns(response.data.columnData);
    //     setCards(response.data.cardData);
    //   } catch (error) {
    //     console.error('Error fetching board:', error);
    //   } finally{
    //     setIsLoading(false);
    //   }
    // };


    
    const handleAddColumn = () => {
      setOpenAddColumnDialog(true);
    };

    const handleCloseAddColumnDialog = () => {
      setOpenAddColumnDialog(false);
    };

    const createColumn = async (title: string) => {
      try {
        const response = await api.post('/column', {
          title,
          boardID: parseInt(boardId ?? '0'), 
        });
        return response.data.data; // Return the newly created column
      } catch (error) {
        console.error('Error creating column:', error);
        return null; 
      }
    };

    const handleCreateColumn = async (title: string) => { 
      try {
        const newColumn = await createColumn(title); 
        
        if (newColumn) {
          setColumns((prevColumns) => [...prevColumns, newColumn]);
        }
        handleCloseAddColumnDialog();
      } catch (error) {
        console.error('Error creating column:', error);
      }
    };

    const handleAddCard = (columnId: number) => {
      setSelectedColumn(columnId);
      setOpenAddCardDialog(true);
    };

    const handleCloseAddCardDialog = () => {
      setOpenAddCardDialog(false);
    };

    const handleCreateCard = async (title: string, columnId: number) => { 
      try {
        const response = await api.post('/card', {
          title,
          columnID: columnId,
          boardID: parseInt(boardId ?? '0'),
        });
        setCards([...cards, response.data.data]);
        handleCloseAddCardDialog();
      } catch (error) {
        console.error('Error creating card:', error);
      }
    };

    const handleEditCard = (card: Card) => { 
      setSelectedCard(card);
      setNewCardTitle(card.title);
      setOpenEditCardDialog(true);
    };

    const handleCloseEditCardDialog = () => {
      setOpenEditCardDialog(false);
    };

    const handleUpdateCard = async (newTitle: string, cardId: number) => { 
      try {
        const response = await api.patch(`/card/${cardId}`, {
          title: newTitle,
        });
        const updatedCards = cards.map((c) =>
          c.id === cardId ? response.data.data : c
        );
        setCards(updatedCards);
        handleCloseEditCardDialog();
      } catch (error) {
        console.error('Error updating card:', error);
      }
    };

    const handleDeleteCard = (cardId: number) => { 
      setSelectedCard(cards.find((card) => card.id === cardId) || null); 
      setOpenDeleteCardDialog(true);
    };

    const handleCloseDeleteCardDialog = () => {
      setOpenDeleteCardDialog(false);
    };

    const handleConfirmDeleteCard = async (cardId: number) => { 
      try {
        await api.delete(`/card/${cardId}`);
        const filteredCards = cards.filter((c) => c.id !== cardId);
        setCards(filteredCards);
        handleCloseDeleteCardDialog();
      } catch (error) {
        console.error('Error deleting card:', error);
      }
    };

    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor)
    );
  
    function SortableItem(props: SortableItemProps) {
      const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id }); 
    
      const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
      };
      return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
          {props.children}
        </div>
      );
    }

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
    
      if (!over) return; // No drop target
    
      if (active.id !== over.id) {
        const activeCardId = active.id as string;
        const overColumnId = over.id as string; 
    
        setCards((cards) => {
          const updatedCards = [...cards];
          const activeCardIndex = updatedCards.findIndex(card => card.id.toString() === activeCardId);
    
          if (activeCardIndex === -1) {
            console.error("Active card not found!");
            return cards; 
          }
    
          // Update the columnID of the active card
          updatedCards[activeCardIndex].columnID = parseInt(overColumnId, 10); 
    
          return updatedCards;
        });
      }
    };



    return (
      <Box
      sx={{
        width: "100%",
        margin:0
      }}
      >
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
          marginTop: "60px",
          maxHeight: '800px',
          padding:'40px',
        }}>
          {isLoading ? (
          <Typography>Loading board details...</Typography>
          ) : (
            <>
              <Box sx={{
                justifyContent: 'center',
                alignItems: 'center',
                width:'100%',
                height:'100%',
                p: 1,
              }} >
                <Grid item xs={12} md={10}>
                  {/* Display board title */}
                  {board ? (
                    <Typography variant="h4" gutterBottom>
                      {board.title}
                    </Typography>
                  ) : (
                    <Typography>Loading Board Title...</Typography>
                  )}

                  {/* "Add Column" button */}

                  {columns.length > 0 && cards.length > 0 ? (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                      <Box //columns list 
                        sx={{
                          display: "flex",
                          width: "100%",
                          bgcolor: "white",
                          gap: 1,
                          height:'100%',
                        }}
                      >
                        {columns.map((column) => (
                          
                          <Grid item xs={12} md={3} key={column.id} sx={{
                            height:'100%',
                          }}>
                              <Box id={column.id.toString()} sx={{
                                minWidth: "300px",
                                maxWidth: "300px",
                                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                                borderRadius: 1,
                                padding: 1,
                                height:'100%',
                                
                              }}
                              >
                                <Box
                                  sx={{
                                    justifyContent: "space-between",
                                    display: "flex",
                                    paddingLeft: "5px",
                                    cursor:'pointer', 
                                    marginTop:'10px',  
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontWeight: "bold",
                                      marginBottom: 1,
                                    }}
                                  >
                                    {column?.title}
                                  </Typography>
                                  <ExpandMoreIcon sx={{ cursor: "pointer" }}></ExpandMoreIcon>
                                </Box>
                                <SortableContext items={cards.filter(card => card.columnID === column.id).map(card => card.id.toString())} strategy={verticalListSortingStrategy}  >
                                  <List sx={{
                                    gap:'10px',
                                    overflowY: 'scroll',
                                    maxHeight:'450px',
                                  }}>
                                    {cards
                                      .filter((card) => card.columnID === column.id)
                                      .map((card) => (
                                        // Use the SortableItem component to make the card draggable
                                        <SortableItem key={card.id} id={card.id.toString()}>
                                          <ListItem 
                                            style={{
                                              backgroundColor: '#f4f5f7',
                                              marginBottom: '5px',
                                              borderRadius: '5px',
                                              cursor: 'move',
                                              height:'60px',
                                              boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
                                            }}
                                          >
                                          
                                            <ListItemText primary={card.title} />
                                            <IconButton color="primary" onClick={() => handleEditCard(card)}>
                                              <EditIcon/>
                                            </IconButton>
                                            <IconButton aria-label="delete" color="primary" onClick={() => handleDeleteCard(card.id)}>
                                              <DeleteIcon />
                                            </IconButton>
                                            
                                          </ListItem>
                                        </SortableItem>
                                      ))}
                                  </List>
                                  <Button 
                                    startIcon={<AddCardIcon />}
                                    sx={{
                                      p: 1,
                                      marginLeft: "5px",
                                      bgcolor: '#0d47a1',
                                      color: 'white',
                                      fontSize: '16px',
                                      textTransform: 'none',
                                      '&:hover': {
                                      backgroundColor: '#0288d1',
                  
                                      },
                                      '&:active': {
                                      boxShadow: 'none',
                                      backgroundColor: '#0288d1',
                  
                                      },
                                      '&:focus':{
                                      border: 'none',
                                      outline: 'none',
                                      }
                                    }}
                                    onClick={() => handleAddCard(column.id)}
                                    color="inherit"
                                    >
                                    Add Card
                                  </Button>
                                </SortableContext>
                              </Box>
                            
                          </Grid>
                        ))}
                        <Box
                          sx={{
                            maxWidth: "300px",
                            minWidth: "300px",
                            borderRadius: 3,
                          }}
                        >
                          <Button 
                          startIcon={<NoteAddIcon />}
                          sx={{
                            justifyContent: 'center',
                            width: "100%",
                            bgcolor: '#5aac44',
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
                            }}
                          variant="contained" color="primary" onClick={handleAddColumn}>
                            Add Column
                          </Button>
                        </Box>
                        <AddColumnDialog
                          open={openAddColumnDialog}
                          onClose={handleCloseAddColumnDialog}
                          onCreate={handleCreateColumn}
                        />
                      </Box>
                    </DndContext>
                  ) : (
                    <Typography>No columns or cards yet. Add some!</Typography>
                  )}


                  {selectedColumn !== null && ( // Only render AddCardDialog if selectedColumn is set
                  <AddCardDialog
                    open={openAddCardDialog}
                    onClose={handleCloseAddCardDialog}
                    onCreate={handleCreateCard}
                    columnId={selectedColumn} // Use selectedColumn here
                  />
                  )}
                  {selectedCard && ( // Only render EditCardDialog if selectedCard is not null
                    <EditCardDialog
                      open={openEditCardDialog}
                      onClose={handleCloseEditCardDialog}
                      onUpdate={handleUpdateCard}
                      card={selectedCard}
                      newCardTitle={newCardTitle}
                      setNewCardTitle={setNewCardTitle}
                    />
                  )}
                  {openDeleteCardDialog && selectedCard && ( // Only render DeleteCardDialog if conditions are met
                    <DeleteCardDialog
                      open={openDeleteCardDialog}
                      onClose={handleCloseDeleteCardDialog}
                      onConfirm={handleConfirmDeleteCard}
                      cardId={selectedCard.id}
                    />
                  )} 

                </Grid>
              </Box>
            </>
          )}
        </Box>
      </Box>
    );
  }

  export default BoardDetail;