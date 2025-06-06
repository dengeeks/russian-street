document.addEventListener('DOMContentLoaded', function () {
    // Определяем поля формы
    const formatTypeField = document.getElementById('id_format_type');
    const videoUrlField = document.querySelector('.form-row .field-video_url');
    const imageField = document.querySelector('.form-row .field-image');

    // Проверка, что элементы существуют
    if (!formatTypeField || !videoUrlField || !imageField) {
        console.error('Один или несколько элементов не найдены.');
        return;
    }

    // Скрыть элемент
    function hideElement(el) {
        el.style.display = 'none';
    }

    // Показать элемент
    function showElement(el) {
        el.style.display = '';
    }

    // Скрыть/показать поля в зависимости от выбранного format_type
    function toggleFields() {
        const formatType = formatTypeField.value;
        console.log(formatType);

        hideElement(videoUrlField);
        hideElement(imageField);

        if (formatType === 'video_url') {
            showElement(videoUrlField);
        } else if (formatType === 'image') {
            showElement(imageField);
        }
    }

    // Первоначальная проверка при загрузке страницы
    toggleFields();

    // Отслеживаем изменения в поле format_type
    formatTypeField.addEventListener('change', toggleFields);
});
