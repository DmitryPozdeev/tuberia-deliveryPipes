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
    pipeQuantityInLength: null,
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
carsNorms.pipeQuantityInLength = +(carsNorms.length / carsNorms.pipeLength)
    .toFixed(0);
let innerDiamPN16; // внутренний диаметр
let maxDiamPN16; // внешний диаметр
let pipes; // виды труб
let quantityOfLastPipes = [];
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
        250: 301,
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
    el.value = el.value.replace(/[^0-9]/g, '');
}

const list = document.querySelector('#list'); // Список диаметров труб и выбора их количества для пользователя
for (const pipe in pipes) {
    list.innerHTML += `<li>
          <span class="pipe">${pipe}</span>
          <input oninput="replacer(this)" v-model="message" placeholder="0" value='${pipes[pipe]}'>
          <span class="pipeLength">${pipes[pipe] * 5.95}м</span>
          </li>`;
} // вывод list
const listValues = document
    .querySelectorAll('#list li input'); // значения в input
// eslint-disable-next-line max-len
for (let i = 0; i < listValues.length; i += 1) { // отправка формы при нажатии enter
    listValues[i].addEventListener('keyup', (event) => {
        event.preventDefault();
        /* if (event.isComposing || event.keyCode !== 13){
            for (let pipe in pipes) {
                list.innerHTML += `<li>${pipe}
                <input value='${pipes[pipe]}'>
                ${pipes[pipe]*5.95}м</li>`;
            } //вывод list
         } */

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

let oldObjectPipesValues;
let lastPipe;
let startPipe;
let message = []; // Итоговый текст, выводимый на экран
let messageCount;
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
let messageOutPipes2 = [];
let messageOutPipes;
let pipeBalance;
let arrayInCars;
let areaOfCars;
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
        if (messageOutCars[3][1][key] >= pipesNorms[messageOutCars[3][0][key]]) {
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
        }
    }
    console.log(messageOutCars);
    console.log('Выход из теста');
}
function quantityOfCars(array, array2) {
    arrayInCars = [];
    areaOfCars = [[], [], []];

    for (const key in array) {
        areaOfCars[0][areaOfCars[0].length] = +array[key].split(':').splice(0, 1).join().split(' в ')
            .pop();
        areaOfCars[1][areaOfCars[1].length] = +array[key].split(':').splice(1, 1).join();
        areaOfCars[2].push(maxDiamPN16[areaOfCars[0][key]] ** 2);
    }
    for (const key2 in array2) {
        /* console.log(array2[key2].split(":").splice(0,1).join().split().pop());
         arrayInCars[0].push(array2[key2].split(":").splice(0,1).join().split().pop());
         messageOutCars[0][areaOfCars[0].length] = +array2[key2].split(":")
        .splice(0,1).join().split().pop(); */
        areaOfCars[0][areaOfCars[0].length] = +(array2[key2]
            .split(':')
            .splice(0, 1)
            .join()
            .split()
            .pop());
        areaOfCars[1][areaOfCars[1].length] = +(array2[key2].split(':').splice(1, 1));
        areaOfCars[2].push(
            maxDiamPN16[areaOfCars[0][areaOfCars[0].length - 1]] ** 2,
        ); // Площадь диаметра
    }
    test(areaOfCars);
}
function speechTest(messageOutCarsForFN) {
    if (messageOutCarsForFN === 1) {
        return 'полная фура';
    } if (messageOutCarsForFN === 2 || messageOutCarsForFN === 3) {
        return 'полные фуры';
    }
    return 'полных фур';
}
function clickMessage() {
    carQuantity = 0;
    console.clear();
    messageOutCars = [[], [], [], []];// Сброс при повторном вызове
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

    // .split(' ').filter(function (el) {return el != null;})
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
    }
    messageOutPipes2 = messageOutPipes2.filter((el) => {
        if (el.split(':')[0] !== '') {
            return el;
        }
        return 0;
    });

    quantityOfCars(messageOutPipes2, quantityOfLastPipes);
    outGeneralInfo.innerHTML = `<ul>
      <li>Общее количество труб:  ${outputAllPipes.reduce((a, b) => (a + b))}</li>
      <li>Общее количество фур: ${carQuantity}</li>
      <li>Суммарная длина всех труб: ${(outputAllPipes.reduce((a, b) => (a + b)) * 5.95).toFixed(2)}м</li>
      <div class="messageOutPipes"><p>Все телескопируемые трубы: </p>${messageOutPipes2.join('<br>')}</div>
      <li>Осталось не телескопированным: <br>
      ${quantityOfLastPipes} труб</li>
      </ul> 
      `;

    messageOutCars[0].forEach((item, i) => {
        out.innerHTML += `<ul>Матрешка ${item} 
        <li>${messageOutCars[2][i]} ${speechTest(messageOutCars[2][i])} 
        комплектация по ${pipesNorms[messageOutCars[3][0][i]]} труб</li> 
        </ul>`;
    });
    out.innerHTML += `<ul>Excess<li>${messageOutCars[0]}</li>
      <li>${messageOutCars[1]}</li>
      <li>${messageOutCars[2]}</li>
      </ul>
      `;
    console.log('Ok');
    // quantityOfCars(getPipesBalance(pipeBalance), pipes, carsNorms);
}
