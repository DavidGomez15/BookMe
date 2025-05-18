const calendar = document.getElementById('calendar');
const modal = document.getElementById('modal');
const modalDate = document.getElementById('modal-date');
let selectedDate = null;

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

// Crear el calendario
function generateCalendar(month, year) {
  calendar.innerHTML = '';
  const firstDay = new Date(year, month).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Títulos de los días
  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  for (let day of daysOfWeek) {
    const div = document.createElement('div');
    div.className = "font-bold text-center";
    div.textContent = day;
    calendar.appendChild(div);
  }

  // Espacios en blanco antes del primer día
  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement('div'));
  }

  // Días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${month + 1}-${day}`;
    const div = document.createElement('div');
    div.className = "border p-2 cursor-pointer hover:bg-blue-100 rounded";
    div.innerHTML = `<div class="font-bold">${day}</div><div class="text-sm text-gray-600">${getEventsForDate(dateStr)}</div>`;
    div.onclick = () => openModal(dateStr);
    calendar.appendChild(div);
  }
}

function openModal(dateStr) {
  selectedDate = dateStr;
  modalDate.textContent = `Evento para: ${dateStr}`;
  document.getElementById('event-time').value = '';
  document.getElementById('event-desc').value = '';
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

function saveEvent() {
  const time = document.getElementById('event-time').value;
  const desc = document.getElementById('event-desc').value;

  if (!time || !desc) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const events = JSON.parse(localStorage.getItem('events')) || {};
  if (!events[selectedDate]) events[selectedDate] = [];
  events[selectedDate].push({ time, desc });

  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
  generateCalendar(currentMonth, currentYear);
}

function getEventsForDate(dateStr) {
  const events = JSON.parse(localStorage.getItem('events')) || {};
  return events[dateStr]?.map(ev => `${ev.time} - ${ev.desc}`).join('<br>') || '';
}

generateCalendar(currentMonth, currentYear);
