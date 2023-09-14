let arrayClientes = [];

function agregar(array) {
  let inputs = document.getElementsByClassName("formVisible");
  let inputNombre = document.getElementById("inputNombre").value;
  let inputApellido = document.getElementById("inputApellido").value;
  let inputNumero = document.getElementById("inputNumero").value;
  let inputCedula = document.getElementById("inputCedula").value;


  if (
    checkIdentico(array, inputNumero, inputCedula) &&
    checkVacio(inputs) &&
    checkNombre(inputNombre, inputApellido)
  ) {
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

function checkNombre(nombre, apellido) {
  let booleanNombre = true;
  if (nombre.trim() == "" || apellido.trim() == "") {
    alert("Nombre o apellido vacio");
    booleanNombre = false;
  }
  return booleanNombre;
}

function checkVacio(arrayInputs) {
  let booleanVacio = true;

  if (
    !(
      arrayInputs[0]?.value ||
      arrayInputs[1]?.value ||
      arrayInputs[2]?.value ||
      arrayInputs[3]?.value ||
      arrayInputs[4]?.value ||
      arrayInputs[5]?.value
    )
  ) {
    alert("Todos los campos estan vacios");
    booleanVacio = false;
  }

  return booleanVacio;
}

function checkIdentico(array, numero, cedula) {
  let booleanIdentico = true;
  for (let i of array) {
    if (cedula) {
      if (cedula == i.cedula) {
        alert("Error! La cedula digitada ya esta en el registro");
        booleanIdentico = false;
        break;
      }
    }
    if (numero) {
      if (numero == i.numero) {
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
            )}" class="btn btn-warning"></td>
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
                <td><button id="${i}" class="editar btn btn-warning"></button></td>
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

function mostrarEditar(indice) {
  let contenedorEscondido = document.getElementById("escondido");
  contenedorEscondido.innerHTML += `
    <div id="transparente">
    </div>
    <div id="editFormulario" class="overlay align-items-center text-center">
      <div class="card">
        <h5 class="text-center mb-4">Editar Informacion</h5>
  
        <div class="row justify-content-between text-left">
          <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Nombre<span
                class="text-danger"> *</span></label> <input class="formEscondido" value="${arrayClientes[indice].nombre}" type="text" id="editNombre" placeholder="Ingrese nombre">
          </div>
          <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Apellido<span
                class="text-danger"> *</span></label> <input class="formEscondido" value="${arrayClientes[indice].apellido}" type="text" id="editApellido" placeholder="Ingrese apllido">
          </div>
        </div>
        <div class="row justify-content-between text-left">
          <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Cedula<span
                class="text-danger"> *</span></label> <input class="formEscondido" value="${arrayClientes[indice].cedula}" type="text" id="editCedula" placeholder="Ingrese cedula">
          </div>
          <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Root<span
                class="text-danger"> *</span></label> <input class="formEscondido" value="${arrayClientes[indice].root}" type="text" id="editRoot" placeholder="Ingrese root">
          </div>
        </div>
        <div class="row justify-content-between text-left">
          <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Numero<span
                class="text-danger"> *</span></label> <input class="formEscondido" value="${arrayClientes[indice].numero}" type="text" id="editNumero" placeholder="Ingrese numero">
          </div>
          <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Direccion<span
                class="text-danger"> *</span></label> <input class="formEscondido" value="${arrayClientes[indice].direccion}" type="text" id="editDireccion"
              placeholder="Ingrese direccion">
          </div>
        </div>
  
        <div class="row mt-2">
          <div class="form-group col-sm-4 offset-2"> <button id="btnGuardarForm" class="btn btn-block btn-primary">Guardar</button></div>
          <div class="form-group col-sm-4"> <button id="btnCancelar" class="btn btn-block btn-warning">Cancelar</button></div>
        </div>
      </div>
    </div>`;
}

function editarFormulario(indice) {
  let nombreInput = document.getElementById("editNombre").value;
  let apellidoInput = document.getElementById("editApellido").value;
  let numeroInput = document.getElementById("editNumero").value;
  let cedulaInput = document.getElementById("editCedula").value;


  if (
    checkIdentico(arrayClientes, numeroInput, cedulaInput) &&
    checkVacio(document.getElementsByClassName("formEscondido")) &&
    checkNombre(nombreInput, apellidoInput)
  ) {
    arrayClientes[indice].nombre = document.getElementById("editNombre").value;
    arrayClientes[indice].apellido =
      document.getElementById("editApellido").value;
    arrayClientes[indice].cedula = document.getElementById("editCedula").value;
    arrayClientes[indice].root = document.getElementById("editRoot").value;
    arrayClientes[indice].numero = document.getElementById("editNumero").value;
    arrayClientes[indice].direccion =
      document.getElementById("editDireccion").value;

    enviarLista(arrayClientes);
    esconderFormulario();
    document.getElementById("contenedor-lista").textContent = "";
    cargarLista(arrayClientes);
  }
}

function esconderFormulario() {
  let contenedorEscondido = document.getElementById("escondido");
  let formulario = document.getElementById("editFormulario");
  let transparente = document.getElementById("transparente");
  contenedorEscondido.removeChild(formulario);
  contenedorEscondido.removeChild(transparente);
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarArrayClientes();
  let btnGuardar = document.getElementById("btnGuardar");
  cargarLista(arrayClientes);
  btnGuardar.addEventListener("click", () => {
    agregar(arrayClientes);
  });

  let tabla = document.getElementById("tabla");
  tabla.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("editar")) {
      mostrarEditar(evento.target.id);
      console.log(evento.target.id);

      let btnCancelar = document.getElementById("btnCancelar");
      let btnGuardar = document.getElementById("btnGuardarForm");

      btnCancelar.addEventListener("click", () => {
        esconderFormulario();
      });

      btnGuardar.addEventListener("click", () => {
        editarFormulario(evento.target.id);
      });
    }
  });
});
