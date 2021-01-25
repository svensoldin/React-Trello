import { atom } from 'jotai';
import { Board, Column, Card } from '../types/dataTypes';

export const boardAtom = atom<Board | undefined>(undefined);
export const columnsAtom = atom<Column[] | undefined>(
  (get) => get(boardAtom)?.columns
);
export const cardRecordAtom = atom<{ [index: string]: Card[] } | {}>((get) =>
  get(columnsAtom)?.reduce((acc, column) => {
    acc[column._id] = column.cards;
    return acc;
  }, {} as { [index: string]: Card[] })
);
