import * as React from 'react';
import { useAtom } from 'jotai';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { boardAtom } from '@jotai/atoms';
import { Board, Card } from '@custom-types/dataTypes';

type Props = {
  children: React.ReactElement<any>;
  updaterFunction: (text: string, id: string, field: string) => Promise<void>;
  inputStyles?: React.CSSProperties;
  id: string;
  field: string;
  parentId?: string;
};

const EditableElement = ({
  children,
  updaterFunction,
  inputStyles,
  id,
  field,
  parentId,
}: Props) => {
  if (!children)
    throw new Error('EditableElement component must have children');
  const [board, setBoard] = useAtom(boardAtom);
  const [isInputOpen, setIsInputOpen] = React.useState(false);
  const [text, setText] = React.useState(children.props.children); // The inner text of the element

  const handleClickAway = () => {
    setIsInputOpen(false);
    // If the text was changed
    if (text !== children.props.children) {
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

  return isInputOpen ? (
    <ClickAwayListener onClickAway={handleClickAway}>
      <textarea
        value={text}
        onChange={(e) => {
          e.preventDefault();
          setText(e.target.value);
        }}
        className={children.props.className}
        style={inputStyles}
        autoFocus={true}
        onKeyUp={({ key }) => {
          if (key === 'Enter') handleClickAway();
        }}
      />
    </ClickAwayListener>
  ) : (
    <>
      {React.cloneElement(children, {
        ...children.props,
        onClick: () => {
          setIsInputOpen(true);
        },
        children: text,
      })}
    </>
  );
};

export default EditableElement;
