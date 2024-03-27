import stylish from "./stylish";
import plain from "./plain";
import gendiff from "..";

const chooseFormater = (formatName) = (formatName === 'plain') ?  plain() : stylish();