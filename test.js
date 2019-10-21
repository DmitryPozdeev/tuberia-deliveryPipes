const list = document.querySelector('#list'); // Список диаметров труб и выбора их количества для пользователя
const button = document.querySelector("#click")
let pnVersion;
let outGenInfo;
const outGeneralInfo = document.querySelector('#info'); // общая информация
const out = document.querySelector('#outField'); // поле вывода матрешек, фур
let innerDiam; // внутренний диаметр, изменяется в зависимости от выбранного
var PipeTelescopeProto = {
    constructor: ( block, quantity ) => {
        this.block = block;
        this.quantity = quantity;
    },
    output: ()=>{
        console.log(this.block); 
    }
}

let pipes = { // количество труб
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

const carsNorms = { // нормы машин
    length: 13600,
    width: 2450,
    height: 2700,
    pipeLength: 5950,
    area() {
        return this.width * this.height;
    },
};
const pipeNorms = {
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
const maxDiam = {
    // 90: 90.3,
    // 110: 110.4,
    // 125: 125.4,
    // 140: 140.5,
    // 160: 160.5,
    // 200: 200.6,
    // 225: 225.7,
    // 250: 250.8,
    // 315: 316,
    // 355: 356.1,
    // 400: 401.2,
    // 450: 451.4,
    // 500: 501.5,
    // 630: 631.9,
    // 710: 712,
    // 800: 802
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
}; // внешний диаметр
function fillPipes() { // заполнение диаметров
    if(pnVersion == "PN12,5"){
        innerDiam = {
            90: 0,
            110: 104.4,
            125: 118.8,
            140: 133.0,
            160: 152.0,
            200: 190.0,
            225: 213.6,
            250: 237.4,
            315: 299.2,
            355: 337.4,
            400: 379.8,
            450: 427.6,
            500: 474.6,
            630: 597.8,
            710: 674.8,
            800: 760.4,
        };
    } else if (pnVersion == "PN16"){
        innerDiam = {
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
        
    } else if (pnVersion == "PN20"){
        innerDiam = {
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
        
    } else if (pnVersion == "PN25"){
        innerDiam = {
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
        
    }
    
}

for (const pipe in pipes) {
    list.innerHTML += `<li>
          <span class="pipe">Труба ПВХ-О ${pipe} мм класс 500 PN16</span>
          <input oninput="replacer(this)" v-model="message" placeholder="0" value='${pipes[pipe] == 0 ? "" : pipes[pipe]}' >труб
          <span class="pipeLength">${(pipes[pipe] * 5.95).toFixed(2)} м</span>
          </li>`;
} // вывод всех труб в списке
const listValues = document.querySelectorAll('#list li input'); // значения в input
function memorize() { // запоминания введенных значений
    let listI = 0;
    for (const pipe in pipes) {
        pipes[pipe] = +listValues[listI].value;
        listI += 1;
    }
    return pipes;
}
{ // ожидающие функции 
    function replacer(el) {
        if (el.value.indexOf("0") == 0) {
            el.value = '';
        }
        el.value = el.value.replace(/[^0-9]/g, '');
        let el2 = el.closest("li");
        el2 = el2.querySelector(".pipeLength");
        el2.innerHTML = (el.value*5.95).toFixed(2)+" м";
    }
    for (let i = 0; i < listValues.length; i += 1) { // отправка формы при нажатии enter
        listValues[i].addEventListener('keyup', (event) => {
            event.preventDefault();
            //document.getElementById('result').innerHTML = input.value;
            if (event.isComposing || event.keyCode === 13) {
                document.getElementById('click').click();
            }
        });
    }
    function pnVersionSwitch(s){
        pnVersion = s.value;
        fillPipes();
    }
}
pnVersion = "PN12,5";
fillPipes();


//SORT FUNCTION START 
// сортирует все трубы по возрастанию количества и добавляет внутренний и внешний диаметры каждой
function sortByQ(obj){
    let arr = [];
    for (var el in obj) {
        arr.push([el, obj[el]]);
    }
    arr.sort((a, b) =>  a[1] - b[1]);
    for (let i = 0; i<arr.length; i+=1) {
        if(arr[i][1] == 0){
            arr.splice(i,1);
            i-=1;
        }
    }
    for (let i in arr){
        arr[i].push(innerDiam[arr[i][0]]);
        arr[i].push(maxDiam[arr[i][0]]);
    }
    return arr;
}
function sortByPipeNum(obj){
    let arr = [];
    for (var el in obj) {
        arr.push([el, obj[el]]);
    }
    for (let i = 0; i<arr.length; i+=1) {
        if(arr[i][1] == 0){
            arr.splice(i,1);
            i-=1;
        }
    }
    for (let i in arr){
        arr[i].push(innerDiam[arr[i][0]]);
        arr[i].push(maxDiam[arr[i][0]]);
    }
    return arr;
}
//END

function allPossibleCases(arr) {
    //console.log(arr);
    if (arr.length == 1) {
        return arr[0][0];
    } else {
        var result = [[],[]];
        for(let i = 0; i < arr.length; i++){
            if(arr[i+1]){
                if(arr[i][3]<arr[i+1][2]){
                    result[0].push(arr[i][0]);
                } else {
                    result[1].push(arr[i][0]);
                }
            } else {
                if(arr[i-1][3]<arr[i][2]){
                    result[0].push(arr[i][0]);
                } else {
                    result[1].push(arr[i][0]);
                }
            }

        }

        
        //console.log(result);
        return result;
    }

}
// Функция нахождения одинаковых значений труб
function findSamePipes(status, arr){
    if(status === 0 ) {
        let same = [].concat(...arr).filter( (elem, pos, arr) => {
            return (pos !== arr.indexOf(elem) || pos !== arr.lastIndexOf(elem));
        } );
        if ( same.length !== 0 ) {
            status = same.length - 1; 
            //-1 т.к переменная используется для количества разбиений на одинаковые блоки
        };
        //console.log(same);
    }
    return status;
}

//Функция нахождения телескопирования
function findTelescoping(arr){
    let result;
    let status = 0;
    findSamePipes(status, arr);
    let newArr = sortByPipeNum(memorize()); //все трубы идут по очередности
    let possibleCases = allPossibleCases(newArr);
    console.log(possibleCases);
    let partsQ = arr.length - status;
    //console.log(partsQ);
    if(arr[1]){
        let preResult = [];
        let preResMap = arr;
        for(let i = 0; i < partsQ; i+=1){
            let amountOfIteration = arr[0][1]; //принимает минимальное количество труб
            let blockArr = [];
            console.log(preResMap);
            preResMap.map(
                (el) => {
                    blockArr.push([]);
                    blockArr[i].push(el[0], amountOfIteration);
                    el[1]-=amountOfIteration;
                    return el;

                }
            );
            preResMap.forEach(el => {
                if(el[1] === 0){
                    preResMap.splice(0, 1);
                }
            });
            console.log(preResMap);
            preResult.push([]);
            preResult[i].push(blockArr);
        }
        result = preResult;
    } else {
        result = [possibleCases, amountOfPipesFind()];
    }
    
   console.log(result);
    return result;
    //console.log(arr.sort((a, b) =>  a[0] - b[0]));
}
//Функция нахождения общего количества труб
function amountOfPipesFind(){
    let amountOfPipes = 0;
    for (const key in pipes) {
        if (pipes[key] > 0) {
            amountOfPipes += pipes[key];
        }
    }
    return amountOfPipes;
}


//Кнопка "Рассчитать"
button.addEventListener("click", ()=>{
    let telescope = findTelescoping( sortByQ(memorize()) );
    let amountOfPipes = amountOfPipesFind();
    outGenInfo = `<ul>
    <li>Общее количество труб:  ${amountOfPipes}</li>
    <li>Общее количество фур: {carQuantity + Math.ceil(percentage)}</li>
    <li>Суммарная длина всех труб: ${(amountOfPipes * 5.95).toFixed(2)}м</li>
    <div class="messageOutPipes"><li>Все телескопируемые трубы: <p>{messageOutPipes2.join('<br>')}</p></li></div>
    `;
    if(telescope && telescope.length === 2){
        outGenInfo+=`<li>Осталось не телескопированным: <br>
        ${telescope[0]}: ${telescope[1]} труб</li>
        </ul> `;
    }
    outGeneralInfo.innerHTML = outGenInfo;
});

