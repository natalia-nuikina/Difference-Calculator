import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const chooseFormater = (filePath1, filePath2, diff, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    default:
      return stylish(diff);
  }
};

export default chooseFormater;
