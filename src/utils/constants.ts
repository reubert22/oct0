import {GlobalEvents} from '../controllers/globalController';

export const ACTION_TYPES = {
  SHOW_EDITOR: 'SHOW_EDITOR' as GlobalEvents['type'],
  SAVE: 'SAVE' as GlobalEvents['type'],
  CANCEL: 'CANCEL' as GlobalEvents['type'],
  EDIT: 'EDIT' as GlobalEvents['type'],
  TOGGLE: 'TOGGLE' as GlobalEvents['type'],
  DELETE: 'DELETE' as GlobalEvents['type'],
};

export const COLORS = {
  black: '#000',
  white: '#FFF',
  gray: '#808080',
  lightGray: '#cecece',
  lightBlue: '#1dadc0',
  shadowBlack: '#171717',
  redDanger: '#FF4C4C',
};
