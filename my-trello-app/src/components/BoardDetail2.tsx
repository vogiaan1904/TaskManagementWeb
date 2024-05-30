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
} from '@mui/material';
import api from '../utils/api.ts';
import AddColumnDialog from './AddColumnDialog.tsx';
import AddCardDialog from './AddCardDialog.tsx';
import EditCardDialog from './EditCardDialog.tsx';
import DeleteCardDialog from './DeleteCardDialog.tsx';
import { Card } from './type';
import { DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided  } from 'react-beautiful-dnd';


interface Board {
  id: number;
  title: string;
}

interface Column {
  id: number;
  title: string;
  boardID: number;
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

  const handleOnDragEnd = (result: any) => { 
    if (!result.destination) return;

    const items = Array.from(cards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCards(items);
  };

  return (
    <Box>
      {isLoading ? (
      <Typography>Loading board details...</Typography>
      ) : (
        <>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: '100vh' }}
          >
            <Grid item xs={12} md={10}>
              <Typography variant="h4" gutterBottom>
                {board ? board.title : 'Loading...'}
              </Typography>
              <Button type="submit" variant="contained" color="primary" onClick={handleAddColumn}>
                Add Column
              </Button>
              <AddColumnDialog
                open={openAddColumnDialog}
                onClose={handleCloseAddColumnDialog}
                onCreate={handleCreateColumn}
              />
              {columns && columns.length > 0 && cards && cards.length > 0 ? (
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  {isLoading ? (
                    <Typography>Loading columns...</Typography>
                  ) : (
                    columns.length > 0 && cards.length > 0 ? ( 
                      <Grid container spacing={2}>
                        {columns.map((column) => (
                          <Grid item xs={12} md={3} key={column.id}>
                            <Typography variant="h6" gutterBottom>
                              {column.title}
                            </Typography>
                            <Droppable droppableId={column.id.toString()}>
                              {(provided: DroppableProvided) => (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  style={{
                                    backgroundColor: 'lightgray',
                                    padding: '10px',
                                    minHeight: '300px',
                                    borderRadius: '5px',
                                  }}
                                >
                                  <List>
                                  {isLoading ? ( 
                                    <Typography>Loading cards...</Typography>
                                  ) : (
                                    cards.length > 0 && // Check cards.length here
                                      cards
                                      .filter((card) => card.columnID === column.id)
                                      .map((card, index) => (
                                        <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
                                          {(provided: DraggableProvided) => ( 
                                            <ListItem
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              ref={provided.innerRef}
                                              button
                                              onClick={() => handleEditCard(card)}
                                              style={{
                                                backgroundColor: 'white',
                                                marginBottom: '5px',
                                                borderRadius: '5px',
                                                cursor: 'move',
                                              }}
                                            >
                                              <ListItemText primary={card.title} />
                                              <Tooltip title="Delete">
                                                <Fab
                                                  size="small"
                                                  style={{ marginLeft: 'auto' }}
                                                  onClick={() => handleDeleteCard(card.id)}
                                                >
                                                  {/* Add a delete icon here */}
                                                </Fab>
                                              </Tooltip>
                                            </ListItem>
                                          )}
                                        </Draggable>
                                      ))
                                    )}
                                    {provided.placeholder}
                                  </List>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: '10px' }}
                                    onClick={() => handleAddCard(column.id)}
                                  >
                                    Add Card
                                  </Button>
                                </div>
                              )}
                            </Droppable>

                          </Grid>
                        ))}
                      </Grid>
                    ) : ( 
                      <Typography>No columns yet. Add a column!</Typography> 
                    )  
                  )}
                </DragDropContext>
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
              <Button type="submit" variant="contained" color="secondary" onClick={onLogout}>
                Logout
              </Button>
            </Grid>
          </Grid>
        </> 
      )}  
    </Box>
  );
}

export default BoardDetail;