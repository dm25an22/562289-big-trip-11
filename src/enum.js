import {LABEL_IN, LABEL_TO} from "./consts";

export const LabelOfType = {
  'taxi': LABEL_TO,
  'bus': LABEL_TO,
  'train': LABEL_TO,
  'ship': LABEL_TO,
  'transport': LABEL_TO,
  'drive': LABEL_TO,
  'flight': LABEL_TO,
  'sightseeing': LABEL_IN,
  'restaurant': LABEL_IN,
  'check-in': LABEL_IN
};

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const DefaultData = {
  SAVE: `Save`,
  DELETE: `Delete`,
  CANCEL: `Cancel`
};

export const NavItem = {
  TABLE: `table`,
  STATS: `stats`
};

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`
};

export const BottonTextOnLoad = {
  DELETING: `Deleting…`,
  SAVING: `Saving…`
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  BEFORE: `before`,
  AFTER: `after`
};

export const TypeIconList = {
  'taxi': `🚕`,
  'bus': `🚌`,
  'train': `🚂`,
  'flight': `✈️`,
  'check-in': `🏤`,
  'sightseeing': `🏛️`,
  'restaurant': `🍴`,
  'ship': `🛳️`,
  'transport': `🚊`,
  'drive': `🚗`
};

export const Title = {
  MONEY: `MONEY`,
  TRANSPORT: `TRANSPORT`,
  TIME_SPENT: `TIME SPENT`
};

export const Symbol = {
  EURO: `€`,
  COUNT: `x`,
  HOUR: `H`
};

