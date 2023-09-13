let arrayClientes = [];

function agregar(array) {

  if (checkEnviar() && checkIdentico(array)) {
    let cliente = {};
    cliente.nombre = document.getElementById("inputNombre").value;
    cliente.apellido = document.getElementById("inputApellido").value;
    cliente.cedula = document.getElementById("inputCedula").value;
    cliente.numero = document.getElementById("inputNumero").value;
    cliente.direccion = document.getElementById("inputDireccion").value;
    array.push(cliente);
    vaciarInputs();
    enviarLista(array)
    actualizarArrayClientes();
    mostrar(cliente, array);
  }
}

function actualizarArrayClientes(){
  arrayClientes = JSON.parse(localStorage.getItem('lista') || []);
}

function enviarLista(array){
  localStorage.setItem("lista", JSON.stringify(array));
}

function obtenerUltimoIndice(array) {
  return array.length - 1;
}

function vaciarInputs() {
  let inputs = document.getElementsByTagName("input");
  for (let i of inputs) {
    i.value = '';
  }
}

function checkEnviar() {
  let inputs = document.getElementsByTagName("input");
  let booleanVacio = true;
  for (let i of inputs) {
    if (i.value.trim() == "") {
      alert('Error! Ningun campo puede estar vacio')
      booleanVacio = false;
      break;
    }
  }
  return booleanVacio;
}

function checkIdentico(array) {
  let booleanIdentico = true;
  for (let i of array) {
    if (document.getElementById('inputCedula').value == i.cedula) {
      alert('Error! La cedula digitada ya esta en el registro')
      booleanIdentico = false;
      break;
    }
  }
  return booleanIdentico;
}

function mostrar(objeto, arrayClientes) {
  let contenedor = document.getElementById("contenedor-lista");
  contenedor.innerHTML += `
        <tr>
            <td>${objeto.nombre}</td>
            <td>${objeto.apellido}</td>
            <td>${objeto.cedula}</td>
            <td>${objeto.numero}</td>
            <td>${objeto.direccion}</td>
            <td><button onclick="borrarElemento(${obtenerUltimoIndice(arrayClientes)})" id="${obtenerUltimoIndice(arrayClientes)}" class="eliminar btn btn-danger"></td>
        </tr>
    `;

}

function cargarLista(lista) {
  let contenedor = document.getElementById("contenedor-lista");
  console.log(typeof lista)
  for (let i = 0; i < lista.length; i++) {
    contenedor.innerHTML += `
            <tr>
                <td>${lista[i].nombre}</td>
                <td>${lista[i].apellido}</td>
                <td>${lista[i].cedula}</td>
                <td>${lista[i].numero}</td>
                <td>${lista[i].direccion}</td>
                <td><button onclick="borrarElemento(${i})" id="${i}" class="eliminar btn btn-danger"></button></td>
            </tr>
        `;
  }
}

function borrarElemento(indice) {

  actualizarArrayClientes();
  arrayClientes.splice(indice, 1);
  enviarLista(arrayClientes);
  document.getElementById('contenedor-lista').textContent = ""
  actualizarArrayClientes();
  cargarLista(arrayClientes);
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarArrayClientes();
  let btnGuardar = document.getElementById("btnGuardar");
  cargarLista(arrayClientes);
  btnGuardar.addEventListener("click", () => {
    agregar(arrayClientes);
  });
});
