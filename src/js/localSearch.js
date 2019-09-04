

import cards from '../../public/data/cards_mode';

import pack_1 from '../../public/data/pack_1';
import pack_2 from '../../public/data/pack_2';
import pack_3 from '../../public/data/pack_3';

const localSearch = function (searchField) {
  let {name, id, pack, attribute, type, race, level, text} = searchField;
  let result = [];

  let cardList = getPackCardList(pack[0], pack[1]);
  cards.forEach((card)=>{
    let flag = true;

    if(name && card.name.indexOf(name) === -1){
      flag = false;
    }
    if(id && card.id.indexOf(id) === -1){
      flag = false;
    }
    if(text && (
        card.id.indexOf(text) === -1 ||
        card.name.indexOf(text) === -1 ||
        card.desc.indexOf(text) === -1 ||
        card.cardType.indexOf(text) === -1 ||
        card.cardDType.indexOf(text) === -1 ||
        card.enName.indexOf(text) === -1 ||
        card.japName.indexOf(text) === -1 ||
        card.race.indexOf(text) === -1 ||
        card.attribute.indexOf(text) === -1
      )){
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
      if(cardList.includes(card.id)){
        result.push(card);
      }
    }
  });
  console.log(result.length)
  return result;
};

const getPackCardList = function (pack, vol) {
  let array = [];
  console.log(pack, vol);

  let packs = { pack_1, pack_2, pack_3 };
  if(pack === "all"){
    cards.forEach((card)=>{
      array.push(card.id);
    })
  }else if(pack === "before_3"){
    for(let _pack in packs){
      for(let i in packs[_pack]) {
        if (!vol || vol === i) {
          array.push(...packs[_pack][i])
        }
      }
    }
  }else{
    for(let i in packs[pack]){
      if(vol === "" || vol === i){
        array.push(...packs[pack][i])
      }
    }
  }
  return Array.from(new Set(array));
};

export {localSearch}