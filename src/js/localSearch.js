

import cards from '../data/cards';

import pack_1 from '../data/pack_1';
import pack_2 from '../data/pack_2';
import pack_3 from '../data/pack_3';

const localSearch = function (searchField) {
  let packs = { pack_1, pack_2, pack_3 };
  let {name, id, pack, attribute, type, race, level} = searchField;
  let result = [];

  cards.forEach((card)=>{
    let flag = true;

    if(name && card.name.indexOf(name) === -1){
      flag = false;
    }
    if(id && card.id.indexOf(id) === -1){
      flag = false;
    }
    if(attribute && card.attribute !== attribute){
      flag = false;
    }
    if(type && card.type !== type){
      flag = false;
    }
    if(race && card.race !== race){
      flag = false;
    }
    if(level && card.level !== Number(level)){
      flag = false;
    }
    if(flag){
      if(pack && pack.length === 2){
        if(pack && packs[pack[0]][pack[1]].includes(card.id)){
          result.push(card);
        }
      }else{
        result.push(card);
      }
    }
  });

  return result;
};

const valueTransfer = function (name, value) {
  let transformed = value;
  switch (name){
    case "category": transformed = transferCategory(value); break;
    case "type": transformed = transferCategory(value); break;
    case "attribute": transformed = transferAttribute(value); break;
    case "race": transformed = transferRace(value); break;
    case "level": transformed = transferLevel(value); break;
    case "atk": transformed = transferNum(value); break;
    case "def": transformed = transferNum(value);break;
  }
  return transformed;
};

const transferCategory = function (value) {
  let transformed = value;
  // switch (value){
  //
  // }
  return transformed;
};
const transferAttribute = function (value) {
  let transformed = value;
  switch (value){
    case 0: transformed = "魔陷"; break;
    case 1: transformed = "地"; break;
    case Math.pow(2,1): transformed = "水"; break;
    case Math.pow(2,2): transformed = "炎"; break;
    case Math.pow(2,3): transformed = "风"; break;
    case Math.pow(2,4): transformed = "光"; break;
    case Math.pow(2,5): transformed = "暗"; break;
    case Math.pow(2,6): transformed = "神"; break;
  }
  return transformed;
};
const transferRace = function (value) {
  let transformed = value;
  switch (value){
    case 0: transformed = "-"; break;
    case 1: transformed = "战士"; break;
    case Math.pow(2,1): transformed = "魔法师"; break;
    case Math.pow(2,2): transformed = "天使"; break;
    case Math.pow(2,3): transformed = "恶魔"; break;
    case Math.pow(2,4): transformed = "不死"; break;
    case Math.pow(2,5): transformed = "机械"; break;
    case Math.pow(2,6): transformed = "水"; break;
    case Math.pow(2,7): transformed = "炎"; break;
    case Math.pow(2,8): transformed = "岩石"; break;
    case Math.pow(2,9): transformed = "鸟兽"; break;
    case Math.pow(2,10): transformed = "植物"; break;
    case Math.pow(2,11): transformed = "昆虫"; break;
    case Math.pow(2,12): transformed = "雷"; break;
    case Math.pow(2,13): transformed = "龙"; break;
    case Math.pow(2,14): transformed = "兽"; break;
    case Math.pow(2,15): transformed = "兽战士"; break;
    case Math.pow(2,16): transformed = "恐龙"; break;
    case Math.pow(2,17): transformed = "鱼"; break;
    case Math.pow(2,18): transformed = "海龙"; break;
    case Math.pow(2,19): transformed = "爬虫"; break;
    case Math.pow(2,20): transformed = "念动力"; break;
    case Math.pow(2,21): transformed = "幻神兽"; break;
    case Math.pow(2,22): transformed = "创造神"; break;
    case Math.pow(2,23): transformed = "幻龙"; break;
    case Math.pow(2,24): transformed = "电子界"; break;
  }
  return transformed;
};
const transferLevel = function (value) {
  let transformed = value;
  switch (value){
    case 0: transformed = "-";  break;
    case value>12: transformed = "-";  break;
  }
  return transformed;
};
const transferNum = function (value) {
  let transformed = value;
  switch (value){
    case "-2": transformed = "？"; break;
  }
  return transformed;
};

export {localSearch, valueTransfer}