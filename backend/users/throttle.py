from rest_framework.throttling import AnonRateThrottle


class UserCreateRateThrottle(AnonRateThrottle):
    scope = 'user_create'


class AnonTenPer15MinutesThrottle(AnonRateThrottle):
    scope = None

    def get_rate(self):
        return '5/900'  # 5 запросов за 900 секунд (15 минут)

    def parse_rate(self, rate):
        # Переопределяем, чтобы понимать формат '5/900'
        num, period = rate.split('/')
        return int(num), int(period)
