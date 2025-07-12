import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';

const url = 'http://localhost:4100/ciudadano/';

const modalCiudadano = new bootstrap.Modal('#modalCiudadano') //objeto js para manejar el modal
const btncrear = document.querySelector('#btnCrear');
const frmCiudadano = document.querySelector('#frmCiudadano');

let nombre = document.querySelector('#nombre');
let apellido = document.querySelector('#apellidos');
let apodo = document.querySelector('#apodo');
let fecha_nacimiento = document.querySelector('#fecha_nacimiento');
let planeta_origen = document.querySelector('#planeta_origen');
let planeta_residencia = document.querySelector('#planeta_residencia');
let foto = document.querySelector('#foto');
let codigo_qr = document.querySelector('#codigo_qr');

let codigo; // Variable para almacenar el ID a editar
var opcion = ''; // Variable para determinar si se está creando o editando

const tablaCiudadanos = document.querySelector('#ciudadanos');

const ruta = "http://localhost:4100";

document.addEventListener('DOMContentLoaded', cargarCiudadanos() );tablaCiudadanos.innerHTML

// Función para llenar la tabla con los datos de los aprendices
function llenarTabla(datos) {
    datos.data.forEach((ciudadano)=>{
        let fila = `<tr>
        <td>${ciudadano.codigo}</td>
        <td>${ciudadano.nombre}</td>
        <td>${ciudadano.apellidos}</td>
        <td>${ciudadano.apodo}</td>
        <td>${formatearFecha(ciudadano.fecha_nacimiento)}</td>
        <td>${ciudadano.planeta_origen}</td>
        <td>${ciudadano.planeta_residencia}</td>
        <td><img src="${ruta}${ciudadano.foto}" alt="" width="80"></td>
        <td><img src="${ruta}${ciudadano.codigo_qr}" alt="QR" width="80" /></td>
        <td>
            <button type="button" class="btn btn-primary btnEditar"><i class="bi bi-pencil"></i></button>
            <button type="button" class="btn btn-danger btnEliminar"><i class="bi bi-trash"></i></button>
        </td>
        </tr>`;
        tablaCiudadanos.innerHTML += fila;
    });
}

// Función para formatear la fecha en formato dd/mm/yyyy
function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
}

//funcion para llenar la tabla
function cargarCiudadanos() {
    fetch(url+'listartodos')
    .then(response => response.json())
    .then(datos => {
        llenarTabla(datos);
        console.log(datos);
    });
}

btncrear.addEventListener('click', () => {
    // Limpiar los campos del formulario
    frmCiudadano.reset();

    opcion = 'crear'; // Establecer la opción a crear

    // Mostrar el modal
    modalCiudadano.show();
});

tablaCiudadanos.addEventListener('click',(e)=>{
    if (e.target.closest('.btnEditar')) {
        const boton = e.target.closest('.btnEditar');
        const fila = boton.closest('tr');
        codigo = fila.children[0].textContent;
        nombre.value = fila.children[1].textContent;
        apellido.value = fila.children[2].textContent;
        apodo.value = fila.children[3].textContent;

        // Convertir la fecha de dd/mm/yyyy a yyyy-mm-dd
        const textoFecha = fila.children[4].textContent;
        const [dia, mes, año] = textoFecha.split("/");  
        const fechaFormateada = `${año}-${mes}-${dia}`; 

        fecha_nacimiento.value = fechaFormateada;

        planeta_origen.value = fila.children[5].textContent;
        planeta_residencia.value = fila.children[6].textContent;
        foto.value = fila.children[7].textContent;

        opcion = 'editar';
        modalCiudadano.show();
    }
    if (e.target.closest('.btnEliminar')) {
    const boton = e.target.closest('.btnEliminar');
    const fila = boton.closest('tr');
    codigo = fila.children[0].textContent;

    Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar al ciudadano con código ${codigo}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`${url}eliminar/${codigo}`, {
                method: 'PUT'
            })
            .then(response => response.json())
            .then(res => {
                Swal.fire(
                    'Eliminado',
                    'El ciudadano ha sido eliminado correctamente.',
                    'success'
                );
                recarga(); // Recargar la tabla
            })
            .catch(err => {
                Swal.fire(
                    'Error',
                    'Ocurrió un error al intentar eliminar el ciudadano.',
                    'error'
                );
                console.error(err);
            });
        }
    });
}
})

function recarga(){
    tablaCiudadanos.innerHTML = ''; // Limpiar la tabla antes de llenarla nuevamente
    cargarCiudadanos(); // Recargar la lista
    modalCiudadano.hide(); // Ocultar el modal después de crear
}

//cruds de la app

frmCiudadano.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar recarga de la página

    const formData = new FormData();
    formData.append('nombre', nombre.value);
    formData.append('apellidos', apellidos.value);
    formData.append('apodo', apodo.value);
    formData.append('fecha_nacimiento', fecha_nacimiento.value);
    formData.append('planeta_origen', planeta_origen.value);
    formData.append('planeta_residencia', planeta_residencia.value);

    // Solo añadir foto si se seleccionó
    if (foto.files.length > 0) {
        formData.append('foto', foto.files[0]);
    }

    if (opcion == 'crear') {
        formData.append('estado', 1);

        fetch(url + 'crear', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            Swal.fire({
                title: 'Éxito',
                text: 'Ciudadano creado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            recarga(); // Recargar la lista de ciudadanos
        });
    }

    if (opcion == 'editar') {
        fetch(url + 'actualizar/' + codigo, {
            method: 'PUT',
            body: formData
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            Swal.fire({
                title: 'Éxito',
                text: 'Ciudadano editado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            recarga(); // Recargar la lista de ciudadanos
        });
    }
})