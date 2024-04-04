import stylish from './stylish.js';
import plain from './plain.js';

const chooseFormater = (diff, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(diff);
    case 'json':
      return JSON.stringify(diff);
    case 'stylish':
      return stylish(diff);
    default:
      throw new Error(`Format: '${formatName}' not found!`);
  }
};

export default chooseFormater;
