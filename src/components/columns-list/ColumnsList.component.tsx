import AddButton from 'components/add-btn/AddButton.component';
import BoardColumn from 'components/board-column/BoardColumn.component';
import * as React from 'react';
import { Column } from 'types/dataTypes';

import './ColumnsList.styles.css';

type Props = {
  columns: Column[];
  addCard: (
    type: string,
    title: string,
    id?: string | undefined
  ) => void | Promise<void>;
};

const ColumnsList = ({ columns, addCard }: Props) => {
  return (
    <>
      {columns.map(({ title, _id, cards }: Column) => (
        <div className='column' key={_id}>
          <BoardColumn title={title} columnId={_id} cards={cards} />
          <AddButton id={_id} type='card' addFunction={addCard} />
        </div>
      ))}
    </>
  );
};

export default ColumnsList;
