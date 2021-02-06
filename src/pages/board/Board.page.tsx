import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useBoard } from 'utils/hooks';

import { reorderCards, reorderColumns } from 'api/mutations';
import { Board, Column } from 'types/dataTypes';

//Components
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import BoardHeader from 'components/board-header/BoardHeader.component';
import ColumnsList from 'components/columns-list/ColumnsList.component';
import AddButton from 'components/add-btn/AddButton.component';
import Toast from 'components/custom-toast/Toast.component';

import './Board.styles.css';

const BoardPage = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const { board, setBoard } = useBoard(boardId);

  const handleAddElement = (
    type: string,
    title: string,
    newId: string,
    columnId?: string
  ) => {
    const newBoard = { ...board } as Board;
    if (type === 'card') {
      const targetColumn = newBoard.columns.find(
        (column) => column._id === columnId
      );
      targetColumn?.cards.push({
        title,
        column: '',
        comments: [],
        labels: [],
        attachments: [],
        _id: newId, // The id is returned from the API
      });
    }
    if (type === 'column') {
      newBoard.columns.push({ title, cards: [], board: '', _id: newId });
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
      <BoardHeader
        title={board.title}
        users={board.users}
        boardId={board._id}
      />
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
              {provided.placeholder}
              <AddButton
                id={boardId}
                type='column'
                addFunction={handleAddElement}
              />
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
