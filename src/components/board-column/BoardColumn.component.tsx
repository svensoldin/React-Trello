import * as React from 'react';

// Types
import { Card } from '../../types/dataTypes';

// Components
import { Droppable } from 'react-beautiful-dnd';
import CardThumbnail from '../../components/card-thumbnail/CardThumbnail.component';
import EditableTitle from '../../components/editable-title/EditableTitle.component';
import MoreIcon from '@material-ui/icons/MoreHoriz';

import './BoardColumn.styles.css';

type Props = {
  title: string;
  columnId: string;
  cards: Card[];
};

const BoardColumn = ({ title, columnId, cards }: Props) => {
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
            <MoreIcon className='menu-icon' />
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
