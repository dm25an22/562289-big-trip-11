const MONTHS = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

const FilterType = {
  Everything: `everything`,
  Future: `future`,
  Past: `past`
};

const LABEL_IN = `in`;
const LABEL_TO = `to`;

const LabelOfType = {
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

const HIDDEN_CLASS = `visually-hidden`;

export {MONTHS, LABEL_TO, LABEL_IN, FilterType, HIDDEN_CLASS, LabelOfType};
