import * as React from 'react';

import { Droppable } from 'react-beautiful-dnd';
import CardThumbnail from '../../components/card-thumbnail/CardThumbnail.component';
import EditableTitle from '../../components/editable-title/EditableTitle.component';
import { ReactComponent as MenuIcon } from '../../assets/menu.svg';

import './BoardColumn.styles.css';
import { cardRecordAtom } from '../../jotai/atoms';
import { useAtom } from 'jotai';

type Card = {
  title: string;
  comments: Array<Comment> | [];
  labels: Array<{ body: string; color: string }> | [];
  attachments: Array<{ fileName: string }> | [];
  _id: string;
  column: string;
};

type Comment = {
  body: string;
  user: string;
};

type Props = {
  title: string;
  columnId: string;
};

const BoardColumn = ({ title, columnId }: Props) => {
  const [cardRecord]: any = useAtom(cardRecordAtom);
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
            <MenuIcon className='menu-icon' />
          </header>
          {cardRecord[columnId].map((card: Card, i: number) => (
            <CardThumbnail card={card} index={i} key={card._id} />
          ))}
          {provided.placeholder}
        </section>
      )}
    </Droppable>
  );
};

export default BoardColumn;
