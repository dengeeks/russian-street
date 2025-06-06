import re

from django.core.exceptions import ValidationError

from common.constants.events import MAX_FILE_SIZE


def validate_size_file(value):
    """
    Проверяет превышение размера файла.

    Параметры:
    value (file) - Файл

    Исключения:
    ValidationError: Возникает в случае превышения размера файла.
    """
    filesize = value.size

    if filesize > MAX_FILE_SIZE:
        raise ValidationError(
            f'Превышен максимальный размер файла - '
            f'{MAX_FILE_SIZE / (1024 * 1024)} MB'
        )


def validate_phone_number(value):
    """
    Проверяет правильность введенного номера телефона.

    Параметры:
    value (str) - Номер телефона

    Исключения:
    ValidationError: Возникает в случае, если номер
    телефона не соответствует формату.
    """
    pattern = re.compile(r'^((\+7|7|8)+([0-9]){10})$')
    if not pattern.match(value):
        raise ValidationError('Пожалуйста, введите правильный номер телефона')


def validate_passport_series(value):
    """
    Проверяет правильность введенной серии паспорта.

    Параметры:
    value (str) - Серия паспорта

    Исключения:
    ValidationError: Возникает в случае, если серия
    паспорта не содержит 4 цифры.
    """
    pattern = re.compile(r'^\d{4}$')
    if not pattern.match(value):
        raise ValidationError('Серия паспорта должна содержать 4 цифры.')


def validate_passport_number(value):
    """
    Проверяет правильность введенного номера паспорта.

    Параметры:
    value (str) - Номер паспорта

    Исключения:
    ValidationError: Возникает в случае, если номер
    паспорта не содержит 6 цифр.
    """
    pattern = re.compile(r'^\d{6}$')
    if not pattern.match(value):
        raise ValidationError('Номер паспорта должен содержать 6 цифр.')


def validate_iframe(value):
    """
    Валидатор, проверяющий, что строка содержит тег <iframe>.
    Не проверяет содержимое атрибутов, только наличие самого iframe.
    """
    if not re.search(r'<iframe[^>]*>', value, re.IGNORECASE):
        raise ValidationError('Строка должна содержать HTML-тег <iframe>.')
