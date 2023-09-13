let arrayClientes = [];

function agregar(){

    let inputs = document.getElementsByTagName('input');
    console.log(inputs.length());

    let cliente = {}; 
    cliente.nombre = document.getElementById('inputNombre').value;
    cliente.apellido = document.getElementById('inputApellido').value;
    cliente.cedula = document.getElementById('inputCedula').value;
    cliente.numero = document.getElementById('inputNumero').value;
    cliente.direccion = document.getElementById('inputDireccion').value;
    arrayClientes.push(cliente);
    mostrar(cliente)
}

function mostrar(objeto){
    let contenedor = document.getElementById('contenedor-lista');
    contenedor.innerHTML += `
        <tr>
            <td>${objeto.nombre}</td>
            <td>${objeto.apellido}</td>
            <td>${objeto.cedula}</td>
            <td>${objeto.numero}</td>
            <td>${objeto.direccion}</td>
        </tr>
    `
    localStorage.setItem('lista', JSON.stringify(arrayClientes));
}

function cargarLista(){
    let contenedor = document.getElementById('contenedor-lista');
    let lista = JSON.parse(localStorage.getItem('lista'));
    for(let i of lista){
        contenedor.innerHTML += `
            <tr>
                <td>${i.nombre}</td>
                <td>${i.apellido}</td>
                <td>${i.cedula}</td>
                <td>${i.numero}</td>
                <td>${i.direccion}</td>
            </tr>
        `
    }
}

document.addEventListener('DOMContentLoaded', () =>{
    cargarLista();
    let btnGuardar = document.getElementById('btnGuardar');
    btnGuardar.addEventListener('click', () =>{
        agregar();
    })
})