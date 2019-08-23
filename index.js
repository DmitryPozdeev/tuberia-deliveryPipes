const carsNorms = { // нормы машин
	length: 13.6,
	width: 2.45,
	height: 2.7,
};
var innerDiamPN16;//внутренний диаметр
var maxDiamPN16;//внешний диаметр
var pipes; //виды труб
var listI;
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

pipes = { // добавление видов труб
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
var couples = [];// труба в трубе, пары
var message;//Итоговый текст, выводимый на экран
const list = document.querySelector("#list"); // Список диаметров труб и выбора их количества
for(let pipe in pipes){ list.innerHTML += "<li>" + pipe + "<input value='" + pipes[pipe] +"'>" + "</li>"; } //вывод list 
var listValues = document.querySelectorAll("#list li input");// значения
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

function clickMessage() { //форма- кнопка
	var exceptions = []; // все исключения. нужны для исключения использованных диаметров труб в результате
	listI = 0;
	for(let pipe in pipes){ //Ввод всех значений с поля input в pipes
		pipes[pipe] = listValues[listI].value;
		listI++;
	}
	for (let pipe in pipes){ //Удаление неиспользуемых диаметров
		if (pipes[pipe] == 0) {
			delete maxDiamPN16[pipe];
			delete innerDiamPN16[pipe];
		}
	}
	message = "Результат: <ul>";	
	var lastCouplesK, lastCouplesK2; //требуется для непрерывной цепочки
	var arrayKey = 0;
	couples = [];
	for(; true; arrayKey++) {
		exceptions = [...new Set(exceptions)];
		if (arrayKey>2 && couples[arrayKey].join() == couples[arrayKey-1].join()) {
			//for(index in exceptions){message+= "<li>" + exceptions[index] + "</li>";}
			break;
		}
		
		
		//if (couples[arrayKey-2] == couples[arrayKey-1] && couples.length>2){break}
		//console.log(couples[arrayKey-1]);
		//console.log(couples[arrayKey-2]);
		
		
		couples.push([]);

		for (var key in pipes){ if(pipes[key] != 0 ){ couples[arrayKey].push(key); } }
		if(couples.length!=1 && couples[arrayKey]!= couples[arrayKey-1]){
			
			couples[arrayKey] = couples[arrayKey].filter(
				function(e) {return this.indexOf(e) < 0;},exceptions);
				message+= "</ul><ul>";
		} 
		
		
		var i = 0;
		var k = 0;
		
		for (var key in maxDiamPN16) {
			if ( !couples[arrayKey][i] ){ break; }

			if (arrayKey>1 && couples[arrayKey].join() == couples[arrayKey-1].join()) {
				//for(index in exceptions){message+= "<li>" + exceptions[index] + "</li>";}
				break;
			}
			
			if (couples[arrayKey]== couples[arrayKey-1]) {
				break;
			}
			for(var key2 in innerDiamPN16){
				if (!couples[arrayKey][k]){break;}
				if (maxDiamPN16[key] + 5 < innerDiamPN16[key2]){
					if (couples[arrayKey][i]!=lastCouplesK && i >=1){
						
						break;
					}
					
					if (couples[arrayKey][k] != lastCouplesK && couples[arrayKey][k] != lastCouplesK2 ){
						message+= "<li>";
						exceptions.push(couples[arrayKey][k]);
						exceptions.push(couples[arrayKey][i]);
						message += couples[arrayKey][i] + " в " + couples[arrayKey][k] + "<br>";
						lastCouplesK = couples[arrayKey][k];
						lastCouplesK2 = couples[arrayKey][k-1];
						message+= "</li>";
						
						
						break;
					}
				}
				k++;
			}
			i++;
			k = 0;
			
			
		out.innerHTML = message ;
		
		}
		
	};
	fillPipes();
	
}