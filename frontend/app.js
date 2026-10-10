let savedDate;
let savedSlots = [];
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

// Busca sección de html 'slots' y caption dentro de él, lo extrae para trabajrlo en js
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
        savedSlots = Array.from(checked, c => c.value)
        //Si no se marcó lanza una alerta de seleccionar horario
        if (checked.length === 0) {
            // Evita que se recargue la página en el evento
            event.preventDefault();
            alert("Selecciona al menos un horario.");
        } else {
            sessionStorage.setItem('slots', JSON.stringify(savedSlots))
            sessionStorage.setItem('court', courtName)
        }
    });
}

// Seleccionar dia (Clickeable)

const calendar = document.querySelector('.calendario')

if (calendar) {
    const currentMonth = calendar.querySelector('caption');

    calendar.addEventListener('click', function (event) {

        //currentTarget seria calendar -> <section class="calendario"> (elemento que tiene el listener)
        // target es el elemento exacto donse hizo click, entonces <td> 
        // tagName devuele el nombre de la etiqueta, en este caso: 'TD'
        if (event.target.tagName === 'TD') {

            if (event.target.textContent.trim() != '') {
                const previousSelectedDay = document.querySelector('.dia-seleccionado');

                if (previousSelectedDay) {
                    previousSelectedDay.classList.remove('dia-seleccionado');
                }

                event.target.classList.add('dia-seleccionado');
                const scheduleHeading = document.querySelector(".horarios h3");
                savedDate = event.target.textContent + " de " + currentMonth.textContent
                sessionStorage.setItem('date', savedDate);
                scheduleHeading.textContent = "Horarios — " + savedDate;
            }
        }
    })
}

const summaryContainer  = document.querySelector('.container-datos div');

if (summaryContainer) {
    const courtSubtitle = document.createElement('h3');
    const dateParagraph = document.createElement('p');
    const slotsParagraph = document.createElement('p');

    courtSubtitle.textContent = sessionStorage.getItem('court') || 'Cancha no seleccionada';
    dateParagraph.textContent = 'Fecha: ' + (sessionStorage.getItem('date') || 'Sin fecha');
    const rawSlots = sessionStorage.getItem('slots');

    // Vuelve a convertirlo en lista
    const slots = rawSlots ? JSON.parse(rawSlots) : [];

    // Se agrega el texto formateado a la variable slotsParagraph
    slotsParagraph.textContent = 'Horario: ' + (slots.length > 0 ? slots.join(', ') : 'Sin horarios');    

    summaryContainer.appendChild(courtSubtitle);
    summaryContainer.appendChild(dateParagraph);
    summaryContainer.appendChild(slotsParagraph);

}
