document.addEventListener('DOMContentLoaded', function() {
    // Универсальная функция для загрузки зависимых полей
    function setupDependentSelect(primarySelectId, dependentSelectId, endpoint) {
        const primarySelect = document.getElementById(primarySelectId);
        const dependentSelect = document.getElementById(dependentSelectId);

        if (!primarySelect || !dependentSelect) return;

        function loadOptions() {
            const primaryValue = primarySelect.value;
            const currentDependentValue = dependentSelect.value;

            if (!primaryValue) {
                dependentSelect.innerHTML = '<option value="">---------</option>';
                return;
            }

            fetch(`${endpoint}?${primarySelectId.replace('id_', '')}_id=${primaryValue}`)
                .then(response => {
                    if (!response.ok) throw new Error('Network error');
                    return response.json();
                })
                .then(data => {
                    dependentSelect.innerHTML = '<option value="">---------</option>';

                    data.forEach(item => {
                        const option = new Option(item.name, item.id);
                        if (item.id == currentDependentValue) {
                            option.selected = true;
                        }
                        dependentSelect.appendChild(option);
                    });
                })
                .catch(error => console.error(`Error loading ${dependentSelectId}:`, error));
        }

        primarySelect.addEventListener('change', loadOptions);

        // Инициализация при загрузке, если есть значение
        if (primarySelect.value) {
            loadOptions();
        }
    }

    // Настройка для регионов и городов
    setupDependentSelect('id_region', 'id_city', '/admin/events/event/get-cities/');

    // Настройка для дисциплин и поддисциплин
    setupDependentSelect('id_discipline', 'id_sub_discipline', '/admin/events/event/get-subdisciplines/');
});