import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const chooseFormater = (filePath1, filePath2, diff, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(filePath1, filePath2, diff);
    case 'json':
      return json(filePath1, filePath2, diff);
    case 'stylish':
      return stylish(filePath1, filePath2, diff);
    case '':
      return stylish(filePath1, filePath2, diff);
    default:
      throw new Error(`Unknown order state: '${formatName}'!`);
  }
};

export default chooseFormater;
