function cargarMovimientos() {
    console.log('Has llamado a la función para cargar los movimientos');
}

window.onload = function () {
    console.log('Ya se han cargado los elementos de la página');
    const boton = document.getElementById('boton-recarga');
    boton.addEventListener('click', cargarMovimientos);
    console.log('FIN de la función "window.oload"');
}
