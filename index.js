const carsNorms = { // нормы машин
	length: 13.6,
	width: 2.45,
	height: 2.7,
};
var innerDiamPN16;//внутренний диаметр
var maxDiamPN16;//внешний диаметр
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

var message;//Итоговый текст, выводимый на экран
const list = document.querySelector("#list"); // Список диаметров труб и выбора их количества для пользователя
for(let pipe in pipes){ list.innerHTML += "<li>" + pipe + "<input value='" + pipes[pipe] +"'>" + "</li>"; } //вывод list 
var listValues = document.querySelectorAll("#list li input");// значения в input
for (let i = 0; i < listValues.length; i++) { //отправка формы при нажатии enter
	listValues[i].addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		document.getElementById("click").click();
	}
});
  
}
const out = document.querySelector("#outField");//поле вывода


function Car(ninety, hun10, hun25, hun40, hun60, twoHun, // еще в разработке
			twoHun25, twoHun50, threeHun15, threeHun55, fourHun, fourHun50,
			fiveHun, sixHun30, sevenHun10, eightHun) { 
	this.ninety = ninety;
	this.hun10 = hun10;
	this.hun25 = hun25;
	this.hun40 = hun40;
	this.hun60 = hun60;
	this.twoHun = twoHun;
	this.twoHun25 = twoHun25;
	this.twoHun50 = twoHun50;
	this.threeHun15 = threeHun15;
	this.threeHun55 = threeHun55; 
	this.fourHun = fourHun;
	this.fourHun50 = fourHun50;
	this.fiveHun = fiveHun;
	this.sixHun30 = sixHun30;
	this.sevenHun10 = sevenHun10;
	this.eightHun = eightHun;
}
function memorize(){ // требуется для запоминания введенных значений
	var listI = 0; 
	for(let pipe in pipes){ 
		pipes[pipe] = +listValues[listI].value;
		listI++;
	}
}

function pipeMatching(){
	var pipeMatch = [];
		for(var key in maxDiamPN16){
			for(var key2 in innerDiamPN16){
				if(maxDiamPN16[key] + 5 < innerDiamPN16[key2]){
					pipeMatch.push(`${key} in ${key2}`);
				}
			}
		}
		console.log(pipeMatch);
}
pipeMatching();

function getPipesBalance(array){
	for (let key in pipes){
		if (pipes[key]>0 ) {
			array.push(key);
			pipes[key]--;
		}
		
	}
	return array;
}
function clickMessage() { //форма- кнопка
	var pipeBalance = [];
	
	memorize();
	//var exceptions = [];
	getPipesBalance(pipeBalance);
	
	console.log(pipeBalance);
	console.log(pipes);

	for (let key in pipeBalance){
		if (pipes[key]>0){

		}
	}
}