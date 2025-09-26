// b)

function verificarUsuario(usuario) {

    // Se crea la promesa indicando que siempre le de acceso a el admin en caso de que sea cualquier otra persona no te deja entrar
  return new Promise((resolve, reject) => {
    if (usuario === "admin") { // declaro que solamente a admin le den acceso 
      resolve("Acceso concedido");// Verifica que seas la persona autorizada 
    } else {
      reject("Acceso denegado");// En caso de que no coincida con la persona autorizada
    }
  });
}
verificarUsuario("admin")
  .then(res => console.log(res)) 
  .catch(err => console.error(err));

verificarUsuario("Ivan")
  .then(res => console.log(res))
  .catch(err => console.error(err));  

// c)

  function simularPeticionAPI() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Datos recibidos correctamente");
    }, 5000);
  });
}

async function obtenerDatos() {
const respuesta = await// Se utiliza el await para esperar la promesa
simularPeticionAPI();
  
  console.log(respuesta);// para poder mandar la respuesta
}
obtenerDatos();
