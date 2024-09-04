document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar');
    const mealForm = document.getElementById('meal-form');
    const mealInput = document.getElementById('meal-input');
    let selectedDate;

    function createCalendar() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = i;

            if (i === now.getDate() && currentMonth === now.getMonth()) {
                dayElement.classList.add('current');
            }

            dayElement.addEventListener('click', () => showMealForm(i));
            calendar.appendChild(dayElement);
        }
    }

    function showMealForm(day) {
        selectedDate = day;
        mealForm.classList.remove('hidden');
        document.querySelector('#meal-form h2').textContent = `Registrar Comida para el ${day} de Septiembre`;
    }

    mealInput.addEventListener('submit', function(e) {
        e.preventDefault();
        const mealType = document.getElementById('meal-type').value;
        const mealDescription = document.getElementById('meal-description').value;
        const mealQuantity = document.getElementById('meal-quantity').value;

        // Aquí enviaríamos los datos al servidor
        console.log(`Comida registrada para el día ${selectedDate}:`, { mealType, mealDescription, mealQuantity });

        // Actualizar el calendario visualmente
        const dayElement = calendar.children[selectedDate - 1];
        dayElement.style.backgroundColor = '#E8F5E9';

        // Limpiar y ocultar el formulario
        mealInput.reset();
        mealForm.classList.add('hidden');
    });

    function checkMissingMeals() {
        const now = new Date();
        const today = now.getDate();
        
        for (let i = 1; i < today; i++) {
            // Aquí deberíamos verificar con el servidor si hay comidas registradas
            // Por ahora, simularemos que los días impares no tienen comidas registradas
            if (i % 2 !== 0) {
                calendar.children[i - 1].classList.add('missing');
            }
        }
    }

    createCalendar();
    checkMissingMeals();
});