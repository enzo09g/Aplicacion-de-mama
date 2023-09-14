let arrayClientes = [];

function agregar(array) {
  if (checkIdentico(array) && checkVacio() && checkNombre()) {
    let cliente = {};
    cliente.nombre = document.getElementById("inputNombre").value;
    cliente.apellido = document.getElementById("inputApellido").value;
    cliente.cedula = document.getElementById("inputCedula").value;
    cliente.root = document.getElementById("inputRoot").value;
    cliente.numero = document.getElementById("inputNumero").value;
    cliente.direccion = document.getElementById("inputDireccion").value;
    array.push(cliente);
    vaciarInputs();
    enviarLista(array);
    actualizarArrayClientes();
    mostrar(cliente, array);
  }
}

function actualizarArrayClientes() {
  arrayClientes = JSON.parse(localStorage.getItem("lista")) || [];
}

function enviarLista(array) {
  localStorage.setItem("lista", JSON.stringify(array));
}

function obtenerUltimoIndice(array) {
  return array.length - 1;
}

function vaciarInputs() {
  let inputs = document.getElementsByTagName("input");
  for (let i of inputs) {
    i.value = "";
  }
}

function checkNombre() {
  let booleanNombre = true;
  if (
    document.getElementById("inputNombre").value.trim() == "" ||
    document.getElementById("inputApellido").value.trim() == ""
  ) {
    alert("Nombre o apellido vacio");
    booleanNombre = false;
  }
  return booleanNombre;
}

function checkVacio() {
  let inputs = document.getElementsByTagName("input");
  let booleanVacio = true;

  if (
    !(
      inputs[0]?.value ||
      inputs[1]?.value ||
      inputs[2]?.value ||
      inputs[3]?.value ||
      inputs[4]?.value ||
      inputs[5]?.value
    )
  ) {
    alert("Todos los campos estan vacios");
    booleanVacio = false;
  }

  return booleanVacio;
}

function checkIdentico(array) {
  let booleanIdentico = true;
  for (let i of array) {
    if (document.getElementById("inputCedula").value) {
      if (document.getElementById("inputCedula").value == i.cedula) {
        alert("Error! La cedula digitada ya esta en el registro");
        booleanIdentico = false;
        break;
      }
    }
    if (document.getElementById("inputNumero").value) {
      if (document.getElementById("inputNumero").value == i.numero) {
        alert("Error! El numero ingresado ya esta en el registro.");
        booleanIdentico = false;
        break;
      }
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
            <td>${objeto.root}</td>
            <td>${objeto.numero}</td>
            <td>${objeto.direccion}</td>
            <td><button onclick="borrarElemento(${obtenerUltimoIndice(
              arrayClientes
            )})" id="${obtenerUltimoIndice(
    arrayClientes
  )}" class="eliminar btn btn-danger"></td>
            <td><button id="${obtenerUltimoIndice(
              arrayClientes
            )}" class="btn btn-danger"></td>
            </tr>
    `;
}

function cargarLista(lista) {
  let contenedor = document.getElementById("contenedor-lista");
  console.log(typeof lista);
  for (let i = 0; i < lista.length; i++) {
    contenedor.innerHTML += `
            <tr>
                <td>${lista[i].nombre}</td>
                <td>${lista[i].apellido}</td>
                <td>${lista[i].cedula}</td>
                <td>${lista[i].root}</td>
                <td>${lista[i].numero}</td>
                <td>${lista[i].direccion}</td>
                <td><button onclick="borrarElemento(${i})" id="${i}" class="eliminar btn btn-danger"></button></td>
                <td><button id="${i}" class="btn btn-danger"></button></td>
            
                </tr>
        `;
  }
}

function borrarElemento(indice) {
  actualizarArrayClientes();
  arrayClientes.splice(indice, 1);
  enviarLista(arrayClientes);
  document.getElementById("contenedor-lista").textContent = "";
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
