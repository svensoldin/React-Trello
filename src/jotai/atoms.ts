import { atom } from 'jotai';
import { Board } from '../types/dataTypes';

export const boardAtom = atom<Board | undefined>(undefined);
