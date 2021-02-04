import * as React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { boardAtom } from 'jotai/atoms';

import { Board, Column } from 'types/dataTypes';

//Components
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import BoardUsers from 'components/board-users/BoardUsers.component';
import ColumnsList from 'components/columns-list/ColumnsList.component';
import AddButton from 'components/add-btn/AddButton.component';
import Toast from 'components/custom-toast/Toast.component';

import './Board.styles.css';
import { reorderCards, reorderColumns } from 'api/mutations';

const BoardPage = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [board, setBoard] = useAtom(boardAtom);
  React.useEffect(() => {
    const fetchBoard = async () => {
      const url = `${process.env.REACT_APP_SERVER_URL}/boards/${boardId}`;
      try {
        const res = await axios.get<Board>(url, { withCredentials: true });
        setBoard(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBoard();
  }, [boardId, setBoard]);

  const handleAddElement = (type: string, title: string, id?: string) => {
    const newBoard = { ...board } as Board;
    if (type === 'card') {
      const targetColumn = newBoard.columns.find((column) => column._id === id);
      targetColumn?.cards.push({
        title,
        column: '',
        comments: [],
        labels: [],
        attachments: [],
        _id:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
      });
    }
    if (type === 'column') {
      newBoard.columns.push({ title, cards: [], board: '', _id: '' });
    }
    return setBoard(newBoard);
  };

  const handleDragEnd = async ({
    source,
    destination,
    draggableId,
    type,
  }: DropResult) => {
    if (!destination) return;

    // Create new object not to mutate the state
    const newBoard = { ...board } as Board;

    if (type === 'column') {
      const [reorderedColumn] = newBoard.columns.splice(source.index, 1); //Cut
      newBoard.columns.splice(destination.index, 0, reorderedColumn); // Paste
      setBoard(newBoard); // Save

      return reorderColumns(
        newBoard._id,
        reorderedColumn._id,
        destination.index
      );
    }

    // Find the source and destination columns
    const sourceColumn = newBoard.columns.find(
      (column) => column._id === source.droppableId
    ) as Column;
    const destinationColumn = newBoard.columns.find(
      (column) => column._id === destination.droppableId
    ) as Column;

    // Remove the card from source
    const [reorderedCard] = sourceColumn.cards.splice(source.index, 1);
    // Add to the destination
    destinationColumn.cards.splice(destination.index, 0, reorderedCard);
    // Update state
    setBoard(newBoard);

    // Update DB
    return reorderCards(source.droppableId, draggableId, destination);
  };
  return board ? (
    <main className='board-page'>
      <BoardUsers title={board.title} users={board.users} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          droppableId='all-columns'
          direction='horizontal'
          type='column'
        >
          {(provided) => (
            <div
              className='columns'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <ColumnsList addCard={handleAddElement} columns={board.columns} />
              <AddButton
                id={boardId}
                type='column'
                addFunction={handleAddElement}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Toast />
    </main>
  ) : (
    <></>
  );
};

export default BoardPage;
