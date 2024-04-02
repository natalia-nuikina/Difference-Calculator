import yaml from 'js-yaml';

const parseContent = (content, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(content);
    case 'yaml':
    case 'yml':
      return yaml.load(content);
    default:
      return JSON.parse(content);
  }
};

export default parseContent;
