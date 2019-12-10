let str = 'Встретимся завтра утром'.toLowerCase();
let abc_ru = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ы', 'ъ', 'э', 'ю', 'я'];
let chars = [ ' ', '.', ',', '!', '?', ':', '-','\r','\n' ];
let shift = 10;
let result = [];
for (let i = 0; i < str.length; i++){
  let checking = checkChars(str[i], chars);
  if (checking != -1){
    result.push(chars[checking]);
  } else {
    let index = indexOfLetter(str[i], abc_ru);
    if (index + shift > abc_ru.length){
      result.push(abc_ru[index + shift - abc_ru.length]);
    } else {
      result.push(abc_ru[index + shift]);
    }
  }
}
console.log(result.join(''));

function indexOfLetter (letter , abc){
  let index = -1;
  for (let i = 0; i < abc.length; i++){
    if (letter == abc[i]){
      index = i;
      }
  }
  return index;
}

function checkChars (letter, chars) {
  let result = -1; 
  for (let i = 0; i < chars.length; i++){
    if (chars[i] == letter)
      result = i;
  }
  return result;
}
