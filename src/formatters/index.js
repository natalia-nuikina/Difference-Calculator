import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const chooseFormater = (filePath1, filePath2, diff, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(filePath1, filePath2, diff);
    case 'json':
      return json(filePath1, filePath2, diff);
    default:
      return stylish(filePath1, filePath2, diff);
  }
};

export default chooseFormater;
