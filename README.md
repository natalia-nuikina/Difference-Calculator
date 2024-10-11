# Difference Calculator
[![Actions Status](https://github.com/natalia-nuikina/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/natalia-nuikina/frontend-project-46/actions)
[![Actions Status](https://github.com/natalia-nuikina/frontend-project-46/actions/workflows/testAndLinter.yml/badge.svg)](https://github.com/natalia-nuikina/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/c81eb14305b98f519de9/maintainability)](https://codeclimate.com/github/natalia-nuikina/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c81eb14305b98f519de9/test_coverage)](https://codeclimate.com/github/natalia-nuikina/frontend-project-46/test_coverage)

### Описание:
Вычислитель отличий – приложение, определяющая разницу между двумя структурами данных.
##### Возможности утилиты:
- Поддержка разных входных форматов: yaml, json
- Генерация отчета в виде plain text, stylish и json

##### Пример использования:
```bash
# формат plain
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# формат stylish
gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```

### Демонстрация:
[![Demonstration](https://asciinema.org/a/uBgzTwojOu3lQCKTKcHD2o6HD.svg)](https://asciinema.org/a/uBgzTwojOu3lQCKTKcHD2o6HD)

### Установка:

```bash
make install
genDiff -h
```
