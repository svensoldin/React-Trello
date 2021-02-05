import * as React from 'react';
import { useAtom } from 'jotai';
import { boardAtom } from 'jotai/atoms';

import { deleteColumn } from 'api/mutations';

// Types
import { Card } from 'types/dataTypes';

// Components
import { Droppable } from 'react-beautiful-dnd';
import CardThumbnail from 'components/card-thumbnail/CardThumbnail.component';
import EditableTitle from 'components/editable-title/EditableTitle.component';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

import './BoardColumn.styles.css';

type Props = {
  title: string;
  columnId: string;
  cards: Card[];
};

const BoardColumn = ({ title, columnId, cards }: Props) => {
  const [board, setBoard] = useAtom(boardAtom);
  const handleDelete = () => {
    if (!board) return;
    const newBoard = { ...board };
    const removeIndex = newBoard.columns.findIndex(
      (column) => column._id === columnId
    );
    newBoard.columns.splice(removeIndex, 1);
    setBoard(newBoard);

    deleteColumn(columnId);
  };

  return (
    <Droppable droppableId={columnId} type='cards'>
      {(provided) => (
        <section
          className='column'
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <header className='column-title-container'>
            <EditableTitle title={title} columnId={columnId} />
            <DeleteIcon
              className='menu-icon'
              fontSize='small'
              onClick={handleDelete}
            />
          </header>
          {cards.map((card: Card, i: number) => (
            <CardThumbnail card={card} index={i} key={card._id} />
          ))}
          {provided.placeholder}
        </section>
      )}
    </Droppable>
  );
};

export default BoardColumn;
