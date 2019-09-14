var carsNorms = { // нормы машин
	length: 13.6,
	width: 2.45,
	height: 2.7,
	onePipeLength: 5.95
};
var innerDiamPN16; //внутренний диаметр
var maxDiamPN16; //внешний диаметр
var pipes; //виды труб


function fillPipes() { //заполнение диаметров
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
		800: 757.8
	}
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
		800: 925
	}
}
pipes = { // добавление видов труб и их количества
	90: 1,
	110: 1,
	125: 1,
	140: 1,
	160: 1,
	200: 1,
	225: 1,
	250: 1,
	315: 1,
	355: 1,
	400: 1,
	450: 1,
	500: 1,
	630: 1,
	710: 1,
	800: 1,
};
fillPipes();
var message; //Итоговый текст, выводимый на экран
const list = document.querySelector("#list"); // Список диаметров труб и выбора их количества для пользователя
for (let pipe in pipes) {
	list.innerHTML += "<li>" + pipe + "<input value='" + pipes[pipe] + "'>" + "</li>";
} //вывод list 
var listValues = document.querySelectorAll("#list li input"); // значения в input
for (let i = 0; i < listValues.length; i++) { //отправка формы при нажатии enter
	listValues[i].addEventListener("keyup", function(event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			document.getElementById("click").click();
		}
	});
}
const out = document.querySelector("#outField"); //поле вывода
const outGeneralInfo = document.querySelector("#info");

var outputAllPipes=[];

function memorize() { // требуется для запоминания введенных значений
	var listI = 0;
	for (let pipe in pipes) {
		pipes[pipe] = +listValues[listI].value;
		listI++;
	}
}
var pipeMatch = [];

function pipeMatching(list) {
	for (var key in maxDiamPN16) {
		for (var key2 in innerDiamPN16) {
			if (maxDiamPN16[key] + 5 < innerDiamPN16[key2]) {
				list.push(`${key} in ${key2}`);
			}
		}
	}
}
pipeMatching(pipeMatch);
// function pipeClickMatching(list, pipeM){
// 	for (let el = 0; el < list.length; el++) {
// 		for (let i = 0; i < pipeM.length; i++) {
// 			if (`${list[el]} in ${list[i+1]}` == pipeM[i]){
// 				console.log(`${list[el]} in ${list[el+1]}` );
// 			}
// 		}
// 	} 
// }
function getPipesBalance(array) {
	array = [];
	for (let key in pipes) {
		if (pipes[key] > 0) {
			array.push(key);
		}
	}
	return array = array.reverse();
}
var oldObjectPipesValues;
var lastPipe;
var startPipe;
var message = [];
var messageCount = -1;
function pipeArrays(array) {
	messageCount+=1;
	oldObjectPipesValues = Object.values(pipes);
	array = getPipesBalance(array);
	message.push([]);
	for (pipe in array) {
		if (pipes[array[pipe]] > 0) {
			lastPipe = array[pipe];
			//console.log(pipes[array[pipe]]);
			break;
		}
	}
	pipes[lastPipe] -= 1;
	for (let i = -1; i <= array.length;) {
		if (pipes[array[i]] > 0 && lastPipe != array[i]) {
			//console.log(lastPipe);
			for (var key in array) {
				if (pipeMatch.some(elem => elem == array[i] + " in " + array[key]) && array[key] != undefined) {
					if (lastPipe == array[key]) {
						message[messageCount].push(array[i] + " in " + lastPipe);
						console.log(array[i] + " in " + lastPipe);
						lastPipe = array[i];
						break;
					}
				}
			}
			if (lastPipe == array[i]) {
				pipes[array[i]] -= 1;
			} else {
				i++;
			}
		} else {
			i += 1;
		}
	}
	if (Object.values(pipes).some(el => el > 0)) {
		if (oldObjectPipesValues && oldObjectPipesValues.join() == Object.values(pipes).join()) {} else {
			if (Array.from(oldObjectPipesValues).reduce(function(a, b) {
					return (a + b)
				}) - (Array.from(Object.values(pipes)).reduce(function(a, b) {
					return (a + b)
				}) + 1) == 0) {
				//console.log(Array.from(oldObjectPipesValues).reduce(function(a,b){return(a+b)})+ '+' + (Array.from(Object.values(pipes)).reduce(function(a,b){return(a+b)})+1));
				pipes[array[0]]++;
			} else {
				//console.log(getPipesBalance(array));
				//console.log(Array.from(oldObjectPipesValues).reduce(function(a,b){return(a+b)})+ ' ' + (Array.from(Object.values(pipes)).reduce(function(a,b){return(a+b)})+1));
				oldObjectPipesValues = Object.values(pipes);
				
				pipeArrays(array);
				console.log(" ");
			}
			//console.log(oldObjectPipesValues.join()+" "+Object.values(pipes).join());
		}
	}
}
function showhide(n)
{
  if (document.getElementById('otd'+n).style.display=='inline')
    document.getElementById('otd'+n).style.display='none';
  else
    document.getElementById('otd'+n).style.display='inline';
  return false;
}
function quantityOfCars(array, obj, normsObj){

}
var messageOutPipes;
function clickMessage() { 
	messageOutPipes = "";
	outputAllPipes = [];
	console.clear();
	
	var pipeBalance = [];
	memorize();
	for (let key in pipes) {
		if (pipes[key] > 0) {
			outputAllPipes.push((pipes[key]));
		}
	}
	//var finalPipeBalance = getPipesBalance(pipeBalance);
	pipeArrays(getPipesBalance(pipeBalance));
	for (let key in pipeBalance) {
		if (pipes[key] > 0) {}
	}
	//
	message.forEach(element => {
		// messageOutPipes += '<button class="open-btn" @click="open = !open">Открыть</button><ul :class="{ hide: open}">';
		messageOutPipes += '<ul>';
		element.reverse().forEach(function(item, i) {
			messageOutPipes += '<li>'+item+'</li> ';
		});
		messageOutPipes += '';
		 messageOutPipes += '</ul>';
	});
	outGeneralInfo.innerHTML = `<ul>
	<li>Общее количество труб:  ${outputAllPipes.reduce(function(a,b){return(a+b)})}</li>
	<li>Суммарная длина всех труб: ${(outputAllPipes.reduce(function(a,b){return(a+b)})*5.95).toFixed(2)}м</li>
	</ul> 
	`;
	out.innerHTML = `${messageOutPipes}`;
	// new Vue({
	// 	el: '#outField',
	// 	data(){
	// 		return {
	// 			open: true
	// 		}
	// 	}
	// });
		
	
	//messageCount = 0;
	//console.log(Object.values(pipes));
}