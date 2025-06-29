from django.conf import settings
from redis import StrictRedis


def setup_image_path(self, filename: str):
    filename = filename.replace(' ', '_')
    return f'uploads/{self.__class__.__name__.lower()}/{self.pk}/{filename}'


def delete_cache(prefixes: list):
    """
    Удаление кеша по префиксам
    :param prefixes: ['test_*','test2_*']
    """
    cache = StrictRedis(
        host = settings.REDIS_HOST,
        port = settings.REDIS_PORT,
        # password = settings.REDIS_PASSWORD,
    )
    pipe = cache.pipeline()

    for prefix in prefixes:
        cursor = None
        SCAN_BATCH_SIZE = 5000
        while cursor != 0:
            cursor, keys = cache.scan(cursor = cursor or 0, match = f'*{prefix}*', count = SCAN_BATCH_SIZE)
            if keys:
                pipe.delete(*keys)
    pipe.execute()
