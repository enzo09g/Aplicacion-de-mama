let arrayClientes = [];

function agregar(){
    let cliente = {}; 
    cliente.nombre = document.getElementById('inputNombre').value;
    cliente.apellido = document.getElementById('inputApellido').value;
    cliente.cedula = document.getElementById('inputCedula').value;
    cliente.numero = document.getElementById('inputNumero').value;
    cliente.direccion = document.getElementById('inputDireccion').value;
    arrayClientes.push(cliente);
    console.log(arrayClientes)
}

document.addEventListener('DOMContentLoaded', () =>{
    let btnGuardar = document.getElementById('btnGuardar');
    btnGuardar.addEventListener('click', () =>{
        agregar();
    })
})