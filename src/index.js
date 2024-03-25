import _ from 'lodash';
import parseFile from './parsers.js';

const stylish = (value) => {
  const iter = (currentValue, depth, spacesCount, leftShift) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const tab = '  ';
    // глубина * количество отступов — смещение влево
    const indentSize = depth * spacesCount - leftShift;
    const currentIndent = tab.repeat(indentSize);
    const bracketIndent = tab.repeat(indentSize - 1);
    const lines = Object.entries(currentValue)
      .map(([key, val]) => {
        console.log([key, val])
        return `${currentIndent}${key}: ${iter(val, depth + 1, 2, 1)}`;
      });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1, 2, 1);
};

const gendiff = (filepath1, filepath2) => {
  const currentFile1 = parseFile(filepath1);
  const currentFile2 = parseFile(filepath2);

  const iter = (file1, file2) => {
    const keys = _.union(Object.keys(file1), Object.keys(file2));
    const sortedKeys = keys.sort((a, b) => a.localeCompare(b));
    const object = {};
    sortedKeys.map((item) => {
      const currentValue1 = file1[item];
      const currentValue2 = file2[item];
      const keyMinus = `- ${item}`;
      const keyPlus = `+ ${item}`;
      const keyNull = `  ${item}`;
      if (Object.hasOwn(file1, item) && !Object.hasOwn(file2, item)) {
        if (_.isObject(currentValue1)) {
          object[keyMinus] = currentValue1;
        } else {
          object[keyMinus] = currentValue1;
        }
      } else if (!Object.hasOwn(file1, item) && Object.hasOwn(file2, item)) {
        object[keyPlus] = currentValue2;
      } else if (Object.hasOwn(file1, item) && Object.hasOwn(file2, item)) {
        if (_.isObject(currentValue1) && _.isObject(currentValue2)) {
          const res = iter(currentValue1, currentValue2);
          object[keyNull] = res;
        } else if (currentValue1 === currentValue2) {
          object[keyNull] = currentValue1;
        } else if (currentValue1 !== currentValue2) {
          object[keyMinus] = currentValue1;
          object[keyPlus] = currentValue2;
        }
      }
      return item;
    });
    return object;
  };
  const diff = iter(currentFile1, currentFile2);
  const result = stylish(diff);
  // console.log(diff)
  return result;
};

export default gendiff;

// import _ from 'lodash';
// import parseFile from './parsers.js';

// const toString = (obj, depth) => {
//   const keys = Object.keys(obj);
//   const sortedKeys = keys.sort((a, b) => a.localeCompare(b));
//   const tab = '  ';
//   let result = '{\n';
//   const b = sortedKeys.map((item) => {
//     const currentValue = obj[item];
//     if (_.isObject(currentValue)) {
//       return `${tab.repeat(depth * 2 + 2)}${item}: ${toString(currentValue, depth + 1)}`;
//     }
//     return `${tab.repeat(depth * 2 + 2)}${item}: ${currentValue}`;
//   });
//   result += b.join('\n');
//   result += `\n${tab.repeat(depth * 2)}}`;
//   return result;
// };

// const gendiff = (filepath1, filepath2) => {
//   const file1 = parseFile(filepath1);
//   const file2 = parseFile(filepath2);

//   const iter = (item1, item2, depth) => {
//     const keys = _.union(Object.keys(item1), Object.keys(item2));
//     const sortedKeys = keys.sort((a, b) => a.localeCompare(b));
//     const tab = '  ';
//     let result = '{\n';
//     const b = sortedKeys.map((item) => {
//       const currentValue1 = item1[item];
//       const currentValue2 = item2[item];

//       if (_.isObject(currentValue1) && _.isObject(currentValue2)) {
//         const res = iter(currentValue1, currentValue2, depth + 1);
//         return `${tab.repeat(depth * 2)}${item}: ${res}`;
//       }

//       const partKeyMinus = `${tab.repeat(depth * 2 - 1)}- ${item}: `;
//       const partKeyPlus = `${tab.repeat(depth * 2 - 1)}+ ${item}: `;

//       if (Object.hasOwn(item1, item) && !Object.hasOwn(item2, item)) {
//         if (_.isObject(currentValue1)) {
//           return `${partKeyMinus}${toString(currentValue1, depth)}`;
//         }
//         return `${partKeyMinus}${currentValue1}`;
//       }
//       if (!Object.hasOwn(item1, item) && Object.hasOwn(item2, item)) {
//         if (_.isObject(currentValue2)) {
//           return `${partKeyPlus}${toString(currentValue2, depth)}`;
//         }
//         return `${partKeyPlus}${currentValue2}`;
//       }
//       if (currentValue1 === currentValue2) {
//         return `${tab.repeat(depth * 2 - 1)}${tab}${item}: ${currentValue1}`;
//       }
//       if (currentValue1 !== currentValue2) {
//         if (_.isObject(currentValue1)) {
//           return `${partKeyMinus}${toString(currentValue1, depth)}\n${partKeyPlus}${currentValue2}`;
//         }
//         return `${partKeyMinus}${currentValue1}\n${partKeyPlus}${currentValue2}`;
//       }
//       return item;
//     });

//     result += b.join('\n');
//     result += `\n${tab.repeat(depth * 2 - 2)}}`;
//     return result;
//   };
//   const c = iter(file1, file2, 1);
//   return c;
// };

// export default gendiff;
