const stringify = (value) => {
  switch (typeof (value)) {
    case 'string':
      return `'${value}'`;
    case 'object':
      return (value === null) ? value : '[complex value]';
    default:
      return value;
  }
};

const plain = (difference) => {
  const iter = (diff, depth) => {
    const lines = diff
      .flatMap((item) => {
        switch (item.type) {
          case 'removed':
            return `Property '${depth}${item.name}' was ${item.type}`;
          case 'added':
            return `Property '${depth}${item.name}' was ${item.type} with value: ${stringify(item.value)}`;
          case 'updated':
            return `Property '${depth}${item.name}' was ${item.type}. From ${stringify(item.value.file1)} to ${stringify(item.value.file2)}`;
          case 'unchanged':
            return [];
          case 'updatedInside':
            return iter(item.children, `${depth}${item.name}.`);
          default:
            throw new Error(`Unknown order state: '${item.type}'!`);
        }
      });
    return lines.join('\n');
  };
  return iter(difference, '');
};

export default plain;
