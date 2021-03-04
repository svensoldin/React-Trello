import * as React from 'react';
import { useAtom } from 'jotai';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { boardAtom } from '@jotai/atoms';
import { Board, Card } from '@custom-types/dataTypes';

type Props = {
  HTMLElement: string;
  innerText: string;
  updaterFunction: (text: string, id: string, field: string) => Promise<void>;
  id: string;
  field: 'description' | 'title';
  parentId?: string;
  innerClass?: string;
};

const EditableElement = ({
  HTMLElement,
  innerText,
  updaterFunction,
  id,
  field,
  parentId,
  innerClass,
}: Props) => {
  const [board, setBoard] = useAtom(boardAtom);
  const [isInputOpen, setIsInputOpen] = React.useState(false);
  const [text, setText] = React.useState(innerText); // The inner text of the element

  const handleClickAway = () => {
    setIsInputOpen(false);
    // If the text was changed
    if (text !== innerText) {
      if (field === 'title' && parentId) {
        const newBoard = { ...board } as Board;
        const card = newBoard.columns
          .find((column) => column._id === parentId)
          ?.cards.find((card) => card._id === id) as Card;
        card.title = text;
        setBoard(newBoard);
      }
      // API call
      updaterFunction(text, id, field);
    }
  };

  if (isInputOpen) {
    if (field === 'description') {
      return (
        <ClickAwayListener onClickAway={handleClickAway}>
          <textarea
            value={text}
            onChange={(e) => {
              e.preventDefault();
              setText(e.target.value);
            }}
            className={innerClass}
            autoFocus={true}
            onKeyUp={({ key }) => {
              if (key === 'Enter') handleClickAway();
            }}
          />
        </ClickAwayListener>
      );
    }

    if (field === 'title') {
      return (
        <ClickAwayListener onClickAway={handleClickAway}>
          <input
            value={text}
            onChange={(e) => {
              e.preventDefault();
              setText(e.target.value);
            }}
            className={innerClass}
            autoFocus={true}
            onKeyUp={({ key }) => {
              if (key === 'Enter') handleClickAway();
            }}
          />
        </ClickAwayListener>
      );
    }
  }

  return (
    <>
      {React.createElement(HTMLElement, {
        onClick: () => {
          setIsInputOpen(true);
        },
        children: text,
        className: innerClass,
      })}
    </>
  );
};

export default EditableElement;
