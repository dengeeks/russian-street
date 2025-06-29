document.addEventListener('DOMContentLoaded', function () {
    function toggleFields(row) {
        const formatTypeSelect = row.querySelector('select[name$="-format_type"]');
        const videoField = row.querySelector('.field-video_url');
        const imageField = row.querySelector('.field-image');

        if (!formatTypeSelect || !videoField || !imageField) {
            console.warn('Один или несколько элементов не найдены в строке:', row);
            return;
        }

        function updateVisibility() {
            const value = formatTypeSelect.value;
            if (value === 'video_url') {
                videoField.style.display = '';
                imageField.style.display = 'none';
            } else if (value === 'image') {
                videoField.style.display = 'none';
                imageField.style.display = '';
            } else {
                videoField.style.display = '';
                imageField.style.display = '';
            }
        }

        updateVisibility();
        formatTypeSelect.addEventListener('change', updateVisibility);
    }

    function processAllRows() {
        const rows = document.querySelectorAll('tr[id^="gallery_items-"]:not(.empty-form)');
        rows.forEach(row => {
            if (!row.dataset.initialized) {
                toggleFields(row);
                row.dataset.initialized = 'true';
            }
        });
    }

    function replaceTableHeaders() {
        const imageTh = document.querySelector('th.column-image');
        const videoTh = document.querySelector('th.column-video_url');

        if (!imageTh || !videoTh) return;

        // Скрываем videoTh
        videoTh.style.display = 'none';

        // Меняем содержимое imageTh на общий заголовок
        imageTh.textContent = 'Вставьте фото или видео';

        // Приводим className к нужному виду, если требуется
        imageTh.className = 'align-middle border-b border-base-200 dark:border-base-800 font-semibold px-1.5 py-2 text-left text-font-important-light text-sm whitespace-nowrap dark:text-font-important-dark';
    }

    processAllRows();
    replaceTableHeaders();

    // Отслеживаем клик по кнопке "Добавить еще"
    document.body.addEventListener('click', function (e) {
        const addRowLink = e.target.closest('.add-row a');
        if (addRowLink) {
            // Обрабатываем добавленные строки через небольшой таймаут (динамическая вставка)
            setTimeout(() => {
                processAllRows();
            }, 150);
        }
    });
});
