function agregar(array) {
  let inputs = document.getElementsByTagName("input");
  let booleanVacio = true;
  for (let i of inputs) {
    if (i.value.trim() == "") {
      booleanVacio = false;
    }
  }

  if (booleanVacio) {
    let cliente = {};
    cliente.nombre = document.getElementById("inputNombre").value;
    cliente.apellido = document.getElementById("inputApellido").value;
    cliente.cedula = document.getElementById("inputCedula").value;
    cliente.numero = document.getElementById("inputNumero").value;
    cliente.direccion = document.getElementById("inputDireccion").value;
    array.push(cliente);
    mostrar(cliente, array);
  }else{
    alert('Ningun campo puede estar vacio')
  }
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
            <td><button></td>

        </tr>
    `;
  localStorage.setItem("lista", JSON.stringify(arrayClientes));
}

function cargarLista() {
  let contenedor = document.getElementById("contenedor-lista");
  let lista = JSON.parse(localStorage.getItem("lista")) || [];
  for (let i of lista) {
    contenedor.innerHTML += `
            <tr>
                <td>${i.nombre}</td>
                <td>${i.apellido}</td>
                <td>${i.cedula}</td>
                <td>${i.numero}</td>
                <td>${i.direccion}</td>
                <td><button></td>

            </tr>
        `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let arrayClientes = JSON.parse(localStorage.getItem("lista")) || [];
  cargarLista();
  let btnGuardar = document.getElementById("btnGuardar");
  btnGuardar.addEventListener("click", () => {
    agregar(arrayClientes);
  });
});
