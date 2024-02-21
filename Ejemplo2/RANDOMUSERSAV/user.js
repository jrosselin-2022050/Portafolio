// asincrono:
/*Espera a que se ejecute por completo una 
instruccion, sin obstruir el hilo de procesos */

/* Formas de manejar la sincronia:
    1.Callbacks -> (Desuso!)
    2.Promesas
    3.Async / Await -> (Mejor opcion)
*/

// callbacks 

function getUsersWhithCallback(callback) {
    fetch('https://randomuser.me/api/') // Consulta a un EndPoint
        .then(response => response.json()) // teraducir o entender el JSON
        .then(data => {
            const { results } = data; // Desestructurar un objeto
            callback(null, results)//1. Parametro es el error /2. Respuesta

        })
        .catch(error => {
            console.error(error)
            callback(error, null)
        })

}
/*
getUsersWhithCallback((error, results) => {
    if (error) console.error(error)
    const name = document.getElementById('name')
    const surname = document.getElementById('surname')
    const phone = document.getElementById('phone')
    for (const user of results) {
        name.innerText = user.name.first
        surname.innerText = user.name.last
        phone.innerText = user.phone
    }
}*/


//Promises
const getUsersWhithPromise = () => {
    return new Promise((resolve, reject) => {
        fetch('https://randomuser.me/api/') // Consulta a un EndPoint
            .then(response => response.json())
            .then(data => {
                const { results } = data;
                resolve(results)
            })
            .catch(error => reject(error))
    })
}
/*getUsersWhithPromise()
   .then(results => {
       const name = document.getElementById('name')
       const surname = document.getElementById('surname')
       const phone = document.getElementById('phone')
       for (const user of results) {
           name.innerText = user.name.firts
           surname.innerText = user.name.last
           phone.innerText = user.phone
       }
   })
   .catch(error => console.error(error))*/


//Async / await
const getUsersWhithAsync = async () => {
    try {
        const response = await fetch('https://randomuser.me/api?results=10') // Automaticamente lo guarda en la constante
        const { results } = await response.json() // desestructuro y lo parseo
        const name = document.getElementById('name')
        const surname = document.getElementById('surname')
        const phone = document.getElementById('phone')
  
        for (const user of results ) {
            name.innerText = user.name.first
            surname.innerText = user.name.last
            phone.innerText = user.phone
        }
   
    } catch (error) {
        console.error(error)
    }
}
getUsersWhithAsync()







/* funcion asincrona declarativa
async function nombre() {

}*/