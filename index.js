/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const carsNorms = { // нормы машин
    length: 13600,
    width: 2450,
    height: 2700,
    pipeLength: 5950,
    area() {
        return this.width * this.height;
    },
};
const pipesNorms = {
    90: 1148,
    110: 786,
    125: 680,
    140: 498,
    160: 390,
    200: 248,
    225: 200,
    250: 160,
    315: 100,
    355: 77,
    400: 60,
    450: 48,
    500: 40,
    630: 24,
    710: 20,
    800: 16,
};
let innerDiamPN16; // внутренний диаметр
let maxDiamPN16; // внешний диаметр
let pipes; // виды труб
let quantityOfLastPipes = [];
let oldObjectPipesValues;
let lastPipe;
let startPipe;
let message = []; // Итоговый текст, выводимый на экран
let messageCount;
// eslint-disable-next-line require-jsdoc
function fillPipes() { // заполнение диаметров
    innerDiamPN16 = {
        90: 84.0,
        110: 104.0,
        125: 117.8,
        140: 132.4,
        160: 151.4,
        200: 189.2,
        225: 212.8,
        250: 236.4,
        315: 298.0,
        355: 336.0,
        400: 378.4,
        450: 426.0,
        500: 472.8,
        630: 595.8,
        710: 671.4,
        800: 757.8,
    };
    maxDiamPN16 = {
        90: 117,
        110: 140,
        125: 154,
        140: 174,
        160: 197,
        200: 243,
        225: 271,
        250: 301,//301
        315: 374,
        355: 419,
        400: 472,
        450: 527,
        500: 587,
        630: 734,
        710: 815,
        800: 925,
    };
}
// eslint-disable-next-line prefer-const
pipes = { // добавление видов труб и их количества
    90: 0,
	110: 0,
	125: 0,
	140: 0,
	160: 1417,
	200: 0,
	225: 0,
	250: 1243,
	315: 629,
	355: 0,
	400: 0,
	450: 0,
	500: 1106,
	630: 0,
	710: 0,
	800: 0,
};
fillPipes();
function replacer(el) {
    if (el.value.indexOf("0") == 0) {
        el.value = '';
    }
    el.value = el.value.replace(/[^0-9]/g, '');
    let el2 = el.closest("li");
    el2 = el2.querySelector(".pipeLength");
    el2.innerHTML = (el.value*5.95).toFixed(2)+" м";
}

const list = document.querySelector('#list'); // Список диаметров труб и выбора их количества для пользователя
for (const pipe in pipes) {
    list.innerHTML += `<li>
          <span class="pipe">Труба ПВХ-О ${pipe} мм класс 500 PN16</span>
          <input oninput="replacer(this)" v-model="message" placeholder="0" value='${pipes[pipe] == 0 ? "" : pipes[pipe]}' >труб
          <span class="pipeLength">${(pipes[pipe] * 5.95).toFixed(2)} м</span>
          </li>`;
} // вывод list 
const listValues = document.querySelectorAll('#list li input'); // значения в input

// eslint-disable-next-line max-len
for (let i = 0; i < listValues.length; i += 1) { // отправка формы при нажатии enter
    listValues[i].addEventListener('keyup', (event) => {
        event.preventDefault();
        //document.getElementById('result').innerHTML = input.value;
        if (event.isComposing || event.keyCode === 13) {
            document.getElementById('click').click();
        }
    });
}
const out = document.querySelector('#outField'); // поле вывода
const outGeneralInfo = document.querySelector('#info');

let outputAllPipes = [];

function memorize() { // требуется для запоминания введенных значений
    let listI = 0;
    for (const pipe in pipes) {
        pipes[pipe] = +listValues[listI].value;
        listI += 1;
    }
}
const pipeMatch = [];

function pipeMatching(listMatch) {
    for (const key in maxDiamPN16) {
        for (const key2 in innerDiamPN16) {
            if (maxDiamPN16[key] + 5 < innerDiamPN16[key2]) {
                listMatch.push(`${key} в ${key2}`);
            }
        }
    }
}
pipeMatching(pipeMatch);
function getPipesBalance(array) {
    array = [];
    for (const key in pipes) {
        if (pipes[key] > 0) {
            array.push(key);
        }
    }
    array = array.reverse();
    return array;
}

 
function pipeArrays(array) {
    
    messageCount += 1;
    oldObjectPipesValues = Object.values(pipes);
    array = getPipesBalance(array);
    message.push([]);
    for (const pipe in array) {
        if (pipes[array[pipe]] > 0) {
            lastPipe = array[pipe];
            break;
        }
    }
    pipes[lastPipe] -= 1;
    for (let i = -1; i <= array.length;) {
        if (pipes[array[i]] > 0 && lastPipe !== array[i]) {
            for (const key in array) {
                if (pipeMatch.some((elem) => elem === `${array[i]} в ${array[key]}`) && array[key] !== undefined) {
                    if (lastPipe === array[key]) {
                        message[messageCount].push(`${array[i]} в ${lastPipe}`);
                        lastPipe = array[i];
                        break;
                    }
                }
            }
            if (lastPipe === array[i]) {
                pipes[array[i]] -= 1;
            } else {
                i += 1;
            }
        } else {
            i += 1;
        }
    }
    if (Object.values(pipes).some((el) => el > 0)) {
        if (oldObjectPipesValues && oldObjectPipesValues.join() === Object.values(pipes).join()) {
            //
        } else if (Array.from(oldObjectPipesValues)
            .reduce((a, b) => (a + b))
            - (Array.from(Object.values(pipes)).reduce((a, b) => (a + b)) + 1) === 0) {
            pipes[array[0]] += 1;
        } else {
            oldObjectPipesValues = Object.values(pipes);

            pipeArrays(array);
        }
    }
}

function sameElements(arr) {
    const arrToRecord = [];
    for (const i in arr) {
        if (arrToRecord[arr[i]] !== undefined) {
            (arrToRecord[arr[i]] += 1);
        } else {
            (arrToRecord[arr[i]] = 1);
        }
    }
    return arrToRecord;
}
let outGenInfo = "";
let messageOutPipes2 = [];
let messageOutPipes;
let pipeBalance;
let arrayInCars;
let areaOfCars;
var percentage = 0;
let carQuantity = 0;
let messageOutCars = [
    [/* Список телескопируемых труб */],
    [/* Количество таких труб */],
    [/* Количество таких машин */],
    [/* Значения areaOfCars */],
];
function test() {
    messageOutCars[3] = areaOfCars;
    let j = 0;
    for (const key in messageOutCars[3][0]) {
        //if (messageOutCars[3][1][key] >= pipesNorms[messageOutCars[3][0][key]]) {
            if (messageOutPipes2[key]) {
                messageOutCars[0][j] = messageOutPipes2[key].split(':').splice(0, 1).join(); // долбавление матрешки каждой трубы
                messageOutCars[1].push(messageOutCars[3][1][key]);// добавление количества труб
                messageOutCars[2].push(
                    Math.floor(messageOutCars[3][1][key]
                        / pipesNorms[messageOutCars[3][0][key]]),
                );// количество машин
                messageOutCars[1][j] -= (messageOutCars[2][j]
                    * pipesNorms[messageOutCars[3][0][j]]);
                carQuantity += (messageOutCars[2][j]);
                j += 1;
            } else {
                for (const key2 in quantityOfLastPipes) {
                    messageOutCars[0][messageOutCars[0].length] = quantityOfLastPipes[key2].split(':').splice(0, 1).join().split()
                        .pop();
                }
                messageOutCars[1].push(messageOutCars[3][1][key]);
                messageOutCars[2].push(
                    Math.floor(messageOutCars[3][1][key]
                        / pipesNorms[messageOutCars[3][0][key]]),
                );
                messageOutCars[1][key] -= (messageOutCars[2][key]
                     * pipesNorms[messageOutCars[3][0][key]]
                );
                carQuantity += messageOutCars[2][key];
                j += 1;
            }
        //}
    }

    for(let i = 0; i < messageOutCars[3][0].length; i++){
        if (messageOutCars[3][0]!== undefined && messageOutCars[1][i] !== undefined){
            console.log(percentage + " " + messageOutCars[1][i] + " " + pipesNorms[messageOutCars[3][0][i]]);
            percentage += messageOutCars[1][i]/pipesNorms[messageOutCars[3][0][i]];
        } 
        
        
    }
    
}

function quantityOfCars(array, array2) {
    arrayInCars = [];
    areaOfCars = [[], []];

    for (const key in array) {
        areaOfCars[0][areaOfCars[0].length] = +array[key].split(':').splice(0, 1).join().split(' в ')
            .pop();
        areaOfCars[1][areaOfCars[1].length] = +array[key].split(':').splice(1, 1).join();
        
    }
    for (const key2 in array2) {
        areaOfCars[0][areaOfCars[0].length] = +(array2[key2]
            .split(':')
            .splice(0, 1)
            .join()
            .split()
            .pop());
        areaOfCars[1][areaOfCars[1].length] = +(array2[key2].split(':').splice(1, 1));
        
    }
    test(areaOfCars);
}
function speechTest(messageOutCarsForFN) {
    if (messageOutCarsForFN === 1) {
        return 'полная фура';
    } if (messageOutCarsForFN >= 2 && messageOutCarsForFN <= 4) {
        return 'полные фуры';
    }
    return 'полных фур';
}
function speechTest2(messageOutCarsForFN) {
    if (messageOutCarsForFN === 1) {
        return 'фура';
    } if (messageOutCarsForFN >= 2 && messageOutCarsForFN <= 4) {
        return 'фуры';
    }
    return 'фур';
}
var infoForOut = "";
function clickMessage() {
    outGenInfo = "";// Сброс при повторном вызове
    percentage = 0;
    infoForOut = "";
    carQuantity = 0;
    console.clear();
    messageOutCars = [[], [], [], []];
    messageOutPipes2 = [];
    messageOutPipes = '';
    messageCount = -1;
    message = [];
    quantityOfLastPipes = [];
    outputAllPipes = [];
    pipeBalance = [];
    out.innerHTML = '';
    memorize();
    for (const key in pipes) {
        if (pipes[key] > 0) {
            outputAllPipes.push((pipes[key]));
        }
    }
    pipeArrays(getPipesBalance(pipeBalance));

    for (const pipe in pipes) {
        if (pipes[pipe] > 0) {
            quantityOfLastPipes.push(` ${pipe}: ${pipes[pipe]}`);
        }
    }


    message.forEach((element) => {
        element.reverse().forEach((item, i) => {
            messageOutPipes += `<li>${item}</li> `;
        });
        messageOutPipes += '';
        messageOutPipes += 'p';
    });
    messageOutPipes = sameElements(messageOutPipes.split('p'));

    for (const key in messageOutPipes) {
        messageOutPipes2.push(
            `${key.replace(/<li>/g, '')
                .replace(/<\/li>/g, '')
                .replace(/\s/g, ' ')
                .replace(/в/g, '')
                .split(' ')
                .filter((n) => n)
                .filter((value, index, _this) => {
                    if (index !== this.length - 1) {
                        return (_this.indexOf(value) === index);
                    }
                    return 0;
                })
                .join(' в ')}: ${messageOutPipes[key]}`,
        );
    };
    
    messageOutPipes2 = messageOutPipes2.filter((el) => {
        if (el.split(':')[0] !== '') {
            return el;
        }
        return 0;
    });
    
    quantityOfCars(messageOutPipes2, quantityOfLastPipes);
    outGenInfo += `<ul>
    <li>Общее количество труб:  ${outputAllPipes.reduce((a, b) => (a + b))}</li>
    <li>Общее количество фур: ${carQuantity + Math.ceil(percentage)}</li>
    <li>Суммарная длина всех труб: ${(outputAllPipes.reduce((a, b) => (a + b)) * 5.95).toFixed(2)}м</li>
    <div class="messageOutPipes"><li>Все телескопируемые трубы: <p>${messageOutPipes2.join('<br>')}</p></li></div>
    `
    if(quantityOfLastPipes[0] !== undefined){
        outGenInfo+=`<li>Осталось не телескопированным: <br>
        ${quantityOfLastPipes} труб</li>
        </ul> `;
    }
    outGeneralInfo.innerHTML = outGenInfo;
    
    
    messageOutCars[0].forEach((item, i) => {
        if(messageOutCars[2][i] !== 0){
            infoForOut += `<ul>${item} 
            <li>${messageOutCars[2][i]} ${speechTest(messageOutCars[2][i])} 
            по ${pipesNorms[messageOutCars[3][0][i]]} труб</li> 
            </ul>`;
        }
        
    });
    if(percentage!==percentage){
        console.log("Ok");
    }
    if (Math.ceil(percentage) != 0){
        infoForOut+=`<ul>Оставшиеся трубы занимают ${Math.ceil(percentage)} ${speechTest2(Math.ceil(percentage))}`;
        for (let i = 0; i < messageOutCars[0].length; i++) {
            infoForOut+= ` <li>${messageOutCars[0][i]} - x${messageOutCars[1][i]}</li>`
        }
    }
    
    out.innerHTML += infoForOut + `</ul>`;
    console.log('Ok');
}
