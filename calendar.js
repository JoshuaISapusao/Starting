<script>
  const calendarDates = document.getElementById('calendar-dates');
  const monthYear = document.getElementById('month-year');
  const prevBtn = document.getElementById('prev-month');
  const nextBtn = document.getElementById('next-month');
  const modal = document.getElementById('event-modal');
  const modalDate = document.getElementById('modal-date');
  const eventText = document.getElementById('event-text');
  const saveEventBtn = document.getElementById('save-event');
  const closeBtn = document.querySelector('.close-button');

  let currentDate = new Date();
  let events = {};

  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    calendarDates.innerHTML = '';
    monthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

    for (let i = 0; i < firstDay; i++) {
      calendarDates.innerHTML += `<div></div>`;
    }

    for (let d = 1; d <= lastDate; d++) {
      const isToday = d === today.getDate() &&
                      month === today.getMonth() &&
                      year === today.getFullYear();

      const dateStr = `${year}-${month + 1}-${d}`;
      const hasEvent = events[dateStr];

      calendarDates.innerHTML += `
        <div class="${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}" data-date="${dateStr}">
          ${d}
        </div>`;
    }

    document.querySelectorAll('.calendar-dates div[data-date]').forEach(dateDiv => {
      dateDiv.addEventListener('click', () => {
        const selectedDate = dateDiv.getAttribute('data-date');
        modalDate.textContent = `Events for ${selectedDate}`;
        eventText.value = events[selectedDate] || '';
        modal.style.display = 'flex';
        eventText.setAttribute('data-date', selectedDate);
      });
    });
  }

  prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  saveEventBtn.addEventListener('click', () => {
    const dateKey = eventText.getAttribute('data-date');
    events[dateKey] = eventText.value.trim();
    modal.style.display = 'none';
    renderCalendar(currentDate);
  });

  renderCalendar(currentDate);
</script>
