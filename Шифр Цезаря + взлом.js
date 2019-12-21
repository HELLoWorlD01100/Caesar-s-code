let abc_ru = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ы', 'ъ', 'э', 'ю', 'я'];
let chars = [' ', '.', ',', '!', '?', ':', '-', '\r', '\n'];
let shift = 10;
let result = [];

function encryption(str, shift) {
    let result = [];
    for (let i = 0; i < str.length; i++) {
        if (chars.indexOf(str[i]) == -1) {
            let index = indexOfLetter(str[i], abc_ru);
            result.push(abc_ru[(index + shift) % abc_ru.length])
        } else {
            result.push(str[i]);
        }
    }
    return result.join('');
}

function decryption(str, shift) {
    let result = [];
    for (let i = 0; i < str.length; i++) {
        if (chars.indexOf(str[i]) == -1) {
            let index = indexOfLetter(str[i], abc_ru)
            if (index - shift < 0) {
                result.push(abc_ru[abc_ru.length + (index - shift)])
            } else {
                result.push(abc_ru[index - shift])
            }
        } else {
            result.push(str[i])
        }
    }
    return result.join('');
}

function indexOfLetter(letter, abc) {
    let index = -1;
    for (let i = 0; i < abc.length; i++) {
        if (letter == abc[i]) {
            index = i;
        }
    }
    return index;
}

function checkChars(letter, chars) {
    let result = -1;
    for (let i = 0; i < chars.length; i++) {
        if (chars[i] == letter)
            result = i;
    }
    return result;
}

function hackerman(string, text) {
    let goodFrequency = [];
    let textLength = 0;
    // GET TEXT FREQUENCY!
    for (let i = 0; i < abc_ru.length; i++) {
        goodFrequency[abc_ru[i]] = 0;
    }
    for (let i = 0; i < text.length; i++) {
        if (chars.indexOf(text[i]) == -1) {
            goodFrequency[text[i]]++;
            textLength++;
        }
    }
    for (let i in goodFrequency) {
        goodFrequency[i] /= textLength;
    }
    let stringFrequency = [];
    let stringLength = 0;
    // GET STRING FREQUENCY!
    for (let i = 0; i < abc_ru.length; i++) {
        stringFrequency[abc_ru[i]] = 0;
    }
    for (let i = 0; i < string.length; i++) {
        if (chars.indexOf(string[i]) == -1) {
            stringFrequency[string[i]]++
            stringLength++;
        }
    }
    for (let i in stringFrequency) {
        stringFrequency[i] /= stringLength;
    }
    // GET QUADSUM!
    let finalShift = 0;
    let sum = 0;
    let minSum = Number.MAX_VALUE;
    for (let shift = 0; shift < 33; shift++) {
        sum = 0;
        for (let j = 0; j < abc_ru.length; j++) {
            sum += Math.pow(goodFrequency[abc_ru[j]] - stringFrequency[abc_ru[(j + shift) % abc_ru.length]], 2)
        }
        if (sum < minSum) {
            finalShift = shift;
            minSum = sum;
        }
    }
    return decryption(string, finalShift);
}
let str = 'Встретимся завтра утром и вечером'.toLowerCase();
let str1 = 'лыъьоътцыи сйлъьй эъьшц т лобоьшц';
console.log('Кодирование: ' + encryption(str, shift))
console.log('Декодирование: ' + decryption(str1, shift));
console.log('Взлом: ' + hackerman(str1, `Зовут его Николаем Петровичем Кирсановым. У него в пятнадцати верстах от постоялого дворика хорошее имение в двести душ, или, как он выражается с тех пор, как размежевался с крестьянами и завел «ферму», — в две тысячи десятин земли. Отец его, боевой генерал 1812 года, полуграмотный, грубый, но не злой русский человек, всю жизнь свою тянул лямку, командовал сперва бригадой, потом дивизией и постоянно жил в`))
