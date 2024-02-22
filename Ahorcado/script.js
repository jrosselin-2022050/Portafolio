const PalabraContenedor = document.getElementById('PalabraContenedor');
const Comenzar = document.getElementById('Comenzar');
const LetrasUsadasElemento = document.getElementById('letrasUsadas');


let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = 0;
ctx.canvas.height = 0;

const PartesCuerpo = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
];

let SelecionarPalabra;
let letrasUsadas;
let errores;
let aciertos;

const agregarLetra = letra => {
    const letraElemento = document.createElement('span');
    letraElemento.innerHTML = letra.toUpperCase();
    LetrasUsadasElemento.appendChild(letraElemento);
}

const agregarParte = parteCuerpo => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...parteCuerpo);
};

const equivocacion = () => {
    agregarParte(PartesCuerpo[errores]);
    errores++;
    if(errores === PartesCuerpo.length){
        juegoTerminado();
        alert("Perdiste");
        alert("tus erorres: "+errores+ "\n"+
            "y tus aciertos fueron: "+ aciertos
        );
        alert("la Palabra era: "+SelecionarPalabra);
    }

}

const juegoTerminado = () => {
    document.removeEventListener('keydown', letraEvento);
    Comenzar.style.display = 'block';
}

const letraAcertada = letra => {
    const { children  } =  PalabraContenedor;
    for(let i = 0; i < children .length; i++) {
        if(children [i].innerHTML === letra) {
            children [i].classList.toggle('hidden');
            aciertos++;
        }
    }
    if(aciertos === SelecionarPalabra.length){
        juegoTerminado();
        alert("Ganaste");
        alert("tus erorres:"+errores+"\n"+
        "y tus aciertos fueron:"+ aciertos);
        alert("Esta fueron las letras en las que te equivocaste: "+ PartesCuerpo);
    }
}

const letraInput = letra => {
    if(SelecionarPalabra.includes(letra)) {
        letraAcertada(letra);
    } else {
        equivocacion();
    }
    agregarLetra(letra);
    letrasUsadas.push(letra);
};

const letraEvento = event => {
    let nuevaLetra = event.key.toUpperCase();
    if(nuevaLetra.match(/^[a-zñ]$/i) && !letrasUsadas.includes(nuevaLetra)) {
        letraInput(nuevaLetra);
    };
};

const dibujarPalabra = () => {
    SelecionarPalabra.forEach(letra => {
        const letraElemento = document.createElement('span');
        letraElemento.innerHTML = letra.toUpperCase();
        letraElemento.classList.add('letra');
        letraElemento.classList.add('hidden');
        PalabraContenedor.appendChild(letraElemento);
    });
};

const palabraRandom = () => {
    let palabra = palabras[Math.floor((Math.random() * palabras.length))].toUpperCase();
    SelecionarPalabra = palabra.split('');
};

const dibujarMono = () => {
    ctx.canvas.width  = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#d95d39';
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
};

const ComenzarJuego = () => {
    letrasUsadas = [];
    errores = 0;
    aciertos = 0;
    PalabraContenedor.innerHTML = '';
    LetrasUsadasElemento.innerHTML = '';
    Comenzar.style.display = 'none';
    dibujarMono();
    palabraRandom();
    dibujarPalabra();
    document.addEventListener('keydown', letraEvento);
};

Comenzar.addEventListener('click', ComenzarJuego);