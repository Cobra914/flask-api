const peticion = new XMLHttpRequest();

function borrarMovimiento(evento) {
    const target = evento.target;
    const id = target.getAttribute('data-id');

    const borrar = confirm('Seguro que quieres eliminar el movimiento?');
    if (!borrar) {
        return;
    }

    peticion.open('DELETE', `http://127.0.0.1:5000/api/v1/movimientos/${id}`, false);
    peticion.send();
    const resultado = JSON.parse(peticion.responseText);
    console.log('Resultado:', peticion.status, peticion.statusText, resultado);
    if (peticion.status === 200) {
        cargarMovimientos();
    } else {
        alert('El movimiento no se ha podido borrar');
    }
}


function cargarMovimientos() {
    console.log('Has llamado a la función para cargar los movimientos');
    peticion.open('GET', 'http://127.0.0.1:5000/api/v1/movimientos', false);
    peticion.send();
    const resultado = JSON.parse(peticion.responseText);
    const movimientos = resultado.results;

    let html = '';
    /*
    En Python:
        for i in range(len(movimientos)):
            movimientos[i]
            i = i + 1
    */

    for (let i = 0; i < movimientos.length; i++) {
        const mov = movimientos[i];
        html = html + `
            <tr class="fila">
                <td class="dato">${mov.fecha}</td>
                <td class="dato">${mov.concepto}</td>
                <td class="dato">${mov.tipo}</td>
                <td class="dato">${mov.cantidad}</td>
                <td class="acciones">
                    <a href="/editar/${mov.id}" class="mini-boton">
                        <img src="/static/icons/editar.png" alt="Editar">
                    </a>
                    <a class="mini-boton delete" data-id="${mov.id}">&times;</a>
                </td>
            </tr>
        `;
    }
    console.log('html', html);
    const tabla = document.querySelector('#cuerpo-tabla');
    tabla.innerHTML = html;

    const botonBorrar = document.querySelectorAll('.mini-boton.delete');
    console.log('Botones', botonBorrar);
    //botonBorrar.forEach(
    //    (btn) => btn.addEventListener('click', borrarMovimiento)
    //)
    botonBorrar.forEach(
        function (btn) {
            btn.addEventListener('click', borrarMovimiento);
        }
    )

}

window.onload = function () {
    console.log('Ya se han cargado los elementos de la página');

    const boton = document.getElementById('boton-recarga');
    boton.addEventListener('click', cargarMovimientos);

    cargarMovimientos()

    console.log('FIN de la función "window.oload"');
}

