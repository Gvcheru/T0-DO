document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: '/tasks',
        dateClick: function(info) {
            var title = prompt('Enter Task Title:');
            var description = prompt('Enter Task Description:');
            var date = info.dateStr;

            fetch('/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: title, description: description, date: date }),
            })
            .then(response => response.json())
            .then(data => {
                calendar.addEvent({
                    title: data.title,
                    start: data.date,
                    description: data.description
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    });

    calendar.render();
});
