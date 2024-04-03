import yaml from 'js-yaml';

const parseContent = (content, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(content);
    case 'yaml':
    case 'yml':
      return yaml.load(content);
    default:
      throw new Error(`Format: '${format}' not found!`);
  }
};

export default parseContent;
