
//Const en js es una variable constante
// Contiene un objeto, {Clave: "valor"}
const courtNames = {
    futbol5: "Cancha fútbol 5",
    futbol7: "Cancha fútbol 7",
    futbol11: "Cancha fútbol 11",
    padel: "Cancha de pádel"
};
// window.location.search devuelve el contenido str de la url que hay después de '?'
// URLSearchParams lo vuelve un objeto iterable con métodos especiales
// guardado en variable const params
const params = new URLSearchParams(window.location.search);

// Obtiene valor de court en la url
const court = params.get("court");

// Obtiene valor del objeto courtNames según la clave extraida de .get
const courtName = courtNames[court] || "Cancha de fútbol general";

// Busca sección de html 'horarios' y caption dentro de él, lo extrae para trabajrlo en js
const caption = document.querySelector(".horarios caption");

if (caption) {
    caption.textContent = "Horarios disponibles — " + courtName;
}

const form = document.querySelector(".horarios form");

if (form) {
    // Cuando se da a submit (en HTML -> Reservar) se ejecuta la logica de abajo
    form.addEventListener("submit", function (event) {

        // Guarda en la variable checked el o los input seleccionados y marcados
        const checked = form.querySelectorAll("input[name='horario']:checked");

        //Si no se marcó lanza una alerta de seleccionar horario
        if (checked.length === 0) {
            // Evita que se recargue la página en el evento
            event.preventDefault();
            alert("Selecciona al menos un horario.");
        }
    });
}

// Seleccionar dia (Clickeable)

const clickeable = document.querySelector('.calendario')

if (clickeable) {
    const mesActual = clickeable.querySelector('caption');

    clickeable.addEventListener('click', function (event) {

        //currentTarget seria clickeable -> <section class="calendario"> (elemento que tiene el listener)
        // target es el elemento exacto donse hizo click, entonces <td> 
        // tagName devuele el nombre de la etiqueta, en este caso: 'TD'
        if (event.target.tagName === 'TD') {

            if (event.target.textContent.trim() != '') {
                const diaSeleccionadoAnterior = document.querySelector('.dia-seleccionado');

                if (diaSeleccionadoAnterior) {
                    diaSeleccionadoAnterior.classList.remove('dia-seleccionado');
                }

                event.target.classList.add('dia-seleccionado');
                const fecha = document.querySelector(".horarios h3");
                fecha.textContent = "Horarios — " + event.target.textContent + " de " + mesActual.textContent;
            }
        }
    })
}
