/*Lógica de controle do jogo Mata Mosquito*/

// variáveis globais
var altura = window.innerHeight;
var largura = window.innerWidth;
var tempo = 10;
var alvo = 1;
var tempoPraMatarMosquito = 1500;

// cronometro de tempo da partida
var cronometro = setInterval( function() {
		tempo-=1;
		if(tempo<0) {
			//alert('Você venceu!!');
			clearInterval(cronometro);
			clearInterval(ativadorMosquito);
			window.location.href='vitoria.html';		
		}
		else{
			document.getElementById('cronometro').innerHTML=tempo;
		}
	},

	1000)

// identificar o tamanho espaço onde os mosquitos podem aparecer
function determineTamanhoDaTela() {
	// body...
	altura = window.innerHeight;
	largura = window.innerWidth;
	console.log(largura, altura);
}

function definirTamanhoMosquito() {
	// body...
	var tamanho = Math.floor(Math.random() * 3);
	switch(tamanho){
		case 0:
		   var classe = 'mosquito1';
		   break;
		case 1:
		   var classe = 'mosquito2';
		   break;
		case 2:
		   var classe = 'mosquito3';
		   break;
	}
    return classe;
}

function definirOlhar() {
	// body...
	var tamanho = Math.floor(Math.random() * 2);
	switch(tamanho){
		case 0:
		   var classe = 'olharEsquerda';
		   break;
		case 1:
		   var classe = 'olharDireita';
	}
    return classe;
}

function crieMosquito() {
	// body...

	//Eliminar o mosquito anterior
	if (document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove();
		//fim de jogo
		if(alvo>3){
			clearInterval(cronometro);
			clearInterval(ativadorMosquito);
			window.location.href='derrota.html';
		}
		else {
			document.getElementById('v'+alvo).src='imagens/coracao_vazio.png'
			alvo++;
		}
	}

	// definir a posição de nascimento so mosquito
	var coordenadaX = Math.floor(Math.random() * (largura-90));
    var coordenadaY	= Math.floor(Math.random() * (altura-90));
    console.log(coordenadaX,coordenadaY);

	// criando a img com o mosquito
	var mosquito = document.createElement('img');
	mosquito.src = 'imagens/mosquito.png';
	mosquito.className = definirTamanhoMosquito()+' '+definirOlhar();
	mosquito.style.left = coordenadaX+'px';
	mosquito.style.top = coordenadaY+'px';
	mosquito.style.position = 'absolute';
	mosquito.id = 'mosquito';
	mosquito.onclick = function() {
		this.remove();
	}
	document.body.appendChild(mosquito);
}



// corpo principal do script
console.log(largura, altura);

//Ativando o nível de dificuldade
var nivel=window.location.search;
nivel=nivel.replace('?','');
console.log(nivel);
if(nivel=='normal'){
   	tempoPraMatarMosquito = 1500;
}
else if(nivel=='dificil'){
	tempoPraMatarMosquito = 1000;
}
else{
	tempoPraMatarMosquito = 750;
}
