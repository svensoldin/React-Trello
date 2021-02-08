import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';

// Types
import { Card } from '@custom-types/dataTypes';

import CardComponent from '@components/card/Card.component';

import './CardThumbnail.styles.css';

type Props = {
  card: Card;
  index: number;
};

const CardThumbnail = ({ card, index }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided) => (
        <>
          <article
            className='card-thumbnail'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setIsOpen(true)}
          >
            <p className='card-thumbnail-content'>{card.title}</p>
          </article>
          <CardComponent
            card={card}
            isModalOpen={isOpen}
            closeModal={() => setIsOpen(false)}
          />
        </>
      )}
    </Draggable>
  );
};

export default CardThumbnail;
