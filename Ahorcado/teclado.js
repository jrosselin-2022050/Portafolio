function getRandomNumer(min,max){
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random()* (max-min+1))+min;

}

function getRandomKey(){
    return keys[getRandomNumer(0, keys.length-1)]
}

function tergetRandomKey(){
    const key = document.getElementById(getRandomKey);
    key.classList.add("selected");
    let start = Date.now()
}

function getTimestamp(){
    return Math.floor(Date.now()/ 1000)
}