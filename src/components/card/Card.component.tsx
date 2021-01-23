import * as React from 'react';

import Dialog from '@material-ui/core/Dialog';
import EditableElement from '../editable-element/EditableElement.component';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import AttachmentOutlinedIcon from '@material-ui/icons/AttachmentOutlined';
import SubjectIcon from '@material-ui/icons/Subject';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import Title from '@material-ui/icons/Title';

import { updateCardField } from '../../utils/mutations';

import './styles.css';

type Card = {
  title: string;
  users?: Array<string>;
  comments: Array<any> | []; // Define this type later
  labels: Array<{ body: string; color: string }> | [];
  attachments: Array<{ fileName: string }> | [];
  description?: string;
  _id: string;
};

type Props = {
  card: Card;
  isModalOpen: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CardComponent = ({ card, isModalOpen, closeModal }: Props) => {
  const { title, comments, labels, attachments, description, _id } = card;
  const descriptionStyles: React.CSSProperties = {
    background: '#fff',
    height: 108,
    outline: '1px solid #2f80ed',
    borderRadius: '5px',
    cursor: 'text',
  };
  const cardTitleStyles: React.CSSProperties = {
    resize: 'none',
    margin: '21px 0',
    border: 'none',
    width: '60%',
    height: '28px',
    fontFamily: 'inherit',
    fontSize: '24px',
    padding: '5px 5px',
    overflow: 'hidden',
    fontWeight: 700,
    outline: '1px solid #2f80ed',
    cursor: 'text',
  };
  return (
    <Dialog
      open={isModalOpen}
      onClose={closeModal}
      className='card-modal'
      maxWidth={false}
    >
      <main className='card'>
        <section className='upper-container'>
          <div className='card-header'>
            <Title />
            <EditableElement
              updaterFunction={updateCardField}
              id={_id}
              field='title'
              inputStyles={cardTitleStyles}
            >
              <h2>{title}</h2>
            </EditableElement>
          </div>
        </section>
        <section className='lower-container'>
          <div className='card-details'>
            <div className='card-description-container'>
              <div className='card-header'>
                <SubjectIcon />
                <h3>Description</h3>
              </div>
              <EditableElement
                updaterFunction={updateCardField}
                inputStyles={descriptionStyles}
                id={_id}
                field='description'
              >
                <p className='card-description'>
                  {description || 'Add a more detailed description...'}
                </p>
              </EditableElement>
            </div>
            <div className='card-activity'>
              <div className='card-header'>
                <FormatListBulletedIcon />
                <h3>Activity</h3>
              </div>
              <textarea
                placeholder='Write a comment...'
                className='comment-input'
              />
            </div>
          </div>
          <aside className='card-functions'>
            <h3>Add to card</h3>
            <div>
              <button className='card-function-btn'>
                <PersonOutlineOutlinedIcon fontSize='small' />
                <p>Members</p>
              </button>
              <button className='card-function-btn'>
                <LabelOutlinedIcon fontSize='small' />
                <p>Labels</p>
              </button>
              <button className='card-function-btn'>
                <AttachmentOutlinedIcon fontSize='small' />
                <p>Attachment</p>
              </button>
            </div>
          </aside>
        </section>
      </main>
    </Dialog>
  );
};

export default CardComponent;
