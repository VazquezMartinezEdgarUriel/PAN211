// Ejecicio 1 A)

//Muestra en consola el contenido de saludo

let nombre = "Armando"; // let se usa en nombre por que es un parametro que puede cambiar
const edad = 25; // const en este caso queda ya que es un parametro que no cambiara 

nombre = "Ana Maria";

const saludo = "Hola, " + nombre + ". Tienes " + edad + "años.";

console.log(saludo);

// Ejecicio 2 B)

//muestra en consola el problema con 3 numeros diferentes

const cuadrado = numero => numero * numero;

console.log(cuadrado(20));
console.log(cuadrado(21));
console.log(cuadrado(22));

// Ejercicio 3 C)
//Crea una arrow function llamada saludoPersonalizado que recibe dos parmetros: nombre y edad, 
// y retorne una cadena como la siguiente palabra predeterminada en cada parametro

const saludoPersonalizado = (nombre, edad ) => `Hola mi nombre es ${nombre} y mi edad es ${edad}`;
console.log(saludoPersonalizado("Uriel", 19));



