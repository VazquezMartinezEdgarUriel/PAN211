// a)
const persona = {
    nombre: "Ivan Isay",
    edad: 37,
    direccion: {
    ciudad: "Qro",
    país: "MX"
    }
};

const { nombre, edad, direccion: { ciudad } } = persona;
//se declara el mensaje como const, y se manda llamar el mensaje para visualizar lo.

const mensaje = `Me llamo ${nombre}, tengo ${edad} años y vivo en ${ciudad}.`;
console.log(mensaje); 

// b)
const productos = [ 
    { nombre: "Laptop", precio: 12000 },
    { nombre: "Mouse", precio: 250 },
    { nombre: "Teclado", precio: 750 },
    { nombre:"Monitor", precio: 3000 }
];
//declaro la accion de filtrar cualquier producto menor a 1000 y de esa manera solo apareceran los mayores al valor establecido.
const FiltraProductos = productos.filter(producto => producto.precio > 1000);
// se encarga de poner los nombres de los productos como areglos 
const nombres = FiltraProductos.map(producto => producto.nombre );

console.log(nombres); 

// c)

const personas = [
    { nombre: "Ana", edad: 22},
    { nombre: "Luis", edad: 35},
    { nombre: "María", edad: 28}
];

const BuscarNombre = personas.find(persona => persona.nombre === "Luis");
console.log("La persona con nombre",BuscarNombre);

//Desicno que cada persona que se encuentra en la variable personas me de sus datos en lista
console.log("\n Personas: ");
personas.forEach(persona => {
    console.log(`Nombre: ${persona.nombre}, edad: ${persona.edad}`);
});


//Declaro la funcion y la desicno una variable donde se almacene la suma de las edades y lo inicializamos en 0 
const Edades = personas.reduce((suma, persona) => suma + persona.edad, 0);
console.log("La suma de las edades es:", Edades);

