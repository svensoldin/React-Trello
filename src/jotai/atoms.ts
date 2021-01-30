import { atom } from 'jotai';
import { Board } from '../types/dataTypes';

type Toast = {
  isOpen: boolean;
  message: string;
  severity: 'success' | 'error' | 'info';
};

export const boardAtom = atom<Board | undefined>(undefined);
export const toastAtom = atom<Toast>({
  isOpen: false,
  message: '',
  severity: 'success',
});
