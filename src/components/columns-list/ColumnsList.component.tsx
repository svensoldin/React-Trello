import AddButton from 'components/add-btn/AddButton.component';
import BoardColumn from 'components/board-column/BoardColumn.component';
import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Column } from 'types/dataTypes';

import './ColumnsList.styles.css';

type Props = {
  columns: Column[];
  addCard: (
    type: string,
    title: string,
    newId: string,
    columnId?: string | undefined
  ) => void | Promise<void>;
};

const ColumnsList = ({ columns, addCard }: Props) => {
  return (
    <>
      {columns.map(({ title, _id, cards }: Column, i) => (
        <Draggable draggableId={_id} index={i} key={_id}>
          {(provided) => (
            <div
              className='column'
              {...provided.draggableProps}
              ref={provided.innerRef}
              {...provided.dragHandleProps}
            >
              <BoardColumn title={title} columnId={_id} cards={cards} />
              <AddButton id={_id} type='card' addFunction={addCard} />
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default ColumnsList;
