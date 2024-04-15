const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();
    // Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        // Hubo un error
        mostrarError('Ambos campos son obligatorios');
        return;
    }

    // Consultar la API
    consultarApi(ciudad, pais);
    
}

//----------------------------------------------- Funciones 

function mostrarError(mensaje) {
    // Crear una alerta
    const error1 = document.querySelector('.error1');

    if(!error1) {

        const alerta = document.createElement('div');
        alerta.className = 'bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto mt-6 text-center error1';

        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
    
}

// ---------------------------------
function consultarApi(ciudad, pais) {

    const appId = 'd1d806d128801ec25e1653a0f345a1f9';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    spinner(); // Muestra un spinner de carga
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => {
        limpiarHTML(); // Limpiar el HTML previo
        if (datos.cod === '404') {
            mostrarError('Ciudad no encontrada');
            return;
        }
        // Imprime la respuesta en el HTML
        mostrarClima(datos);
    })
}
// ---------------------------------
// La info de la temperatura que proporciona la API esta en grados Kelvin
function mostrarClima(datos) {
    const {name, main: {temp, temp_max, temp_min}} = datos;
    const centigrados = parseInt(temp - 273.15);  // Conversion a grados C.
    const max = parseInt(temp_max - 273.15);  // Conversion a grados C.
    const min = parseInt(temp_min - 273.15);  // Conversion a grados C.
    // Scripting para llevar la info al DOM

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl');
    /////// ------ Se creo el parrafo con la temperatura maxima

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl');
    /////// ------ Se creo el parrafo con la temperatura minima

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`; // innerHTML para usar la entidad
    actual.classList.add('font-bold', 'text-6xl');
    /////// ----- Se creo el parrafo con la info

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);
    /////// ------- Se creo el div para el parrafo.

    resultado.appendChild(resultadoDiv);  
}   // Se mete el div en otro div del DOM
// -----------------------------------
function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}
// ---------------------------------- Spinner
function spinner() {
    limpiarHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('spinner');
    divSpinner.innerHTML = `
        <div class="dot1"></div>
        <div class="dot2"></div>
    `;
    resultado.appendChild(divSpinner);
}











// Basicamente una API es consultar una URL estructurada especialmente para que
// devuelva un resultado esperado, con el formato que pida el proveedor. 
// Siempre hay una forma en la que se tiene que mandar llamar una API y usar 
// su Id, esta varia segun el proveedor. 