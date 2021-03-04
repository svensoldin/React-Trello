import * as React from 'react';

import { useAuthState } from '@context/index';
import { Card } from '@custom-types/dataTypes';

import Dialog from '@material-ui/core/Dialog';
import EditableElement from '@components/editable-element/EditableElement.component';
import UserAvatar from '@components/user-avatar/UserAvatar.component';

// Icons
import PersonIcon from '@material-ui/icons/PersonOutlineOutlined';
import LabelIcon from '@material-ui/icons/LabelOutlined';
import AttachmentIcon from '@material-ui/icons/AttachmentOutlined';
import SubjectIcon from '@material-ui/icons/Subject';
import ListIcon from '@material-ui/icons/FormatListBulleted';
import TitleIcon from '@material-ui/icons/Title';

import { updateCardField } from '@api/mutations';

import './styles.css';

type Props = {
  card: Card;
  isModalOpen: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CardComponent = ({ card, isModalOpen, closeModal }: Props) => {
  // Refactor: should fetch card info from server on mount
  const {
    userDetails: { id: userId, name },
  } = useAuthState();
  const { title, description, _id, column } = card;

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
            <TitleIcon />
            <EditableElement
              HTMLElement='h2'
              innerText={title}
              updaterFunction={updateCardField}
              id={_id}
              field='title'
              parentId={column}
              innerClass='card-title-input'
            />
          </div>
        </section>
        <section className='lower-container'>
          <div className='card-details'>
            <div className='card-description-container'>
              <div className='card-header'>
                <SubjectIcon />
                <h3 className='card-header-title'>Description</h3>
              </div>
              <EditableElement
                HTMLElement='p'
                innerText={description || 'Add a more detailed description'}
                updaterFunction={updateCardField}
                id={_id}
                field='description'
                innerClass='card-description'
              />
            </div>
            <div className='card-activity'>
              <div className='card-header'>
                <ListIcon />
                <h3 className='card-header-title'>Activity</h3>
              </div>
              <div className='card-header'>
                <UserAvatar
                  name={name}
                  userId={userId}
                  style={{ width: '35px', height: '35px', marginLeft: '-5px' }}
                />
                <textarea
                  placeholder='Write a comment...'
                  className='comment-input'
                />
              </div>
            </div>
          </div>
          <aside className='card-functions'>
            <h3>Add to card</h3>
            <div className='card-btn-container'>
              <button className='card-function-btn'>
                <PersonIcon fontSize='small' />
                <p>Members</p>
              </button>
              <button className='card-function-btn'>
                <LabelIcon fontSize='small' />
                <p>Labels</p>
              </button>
              <button className='card-function-btn'>
                <AttachmentIcon fontSize='small' />
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
