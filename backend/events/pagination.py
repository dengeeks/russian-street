from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class EventPagination(PageNumberPagination):
    """
    Пагинация для списка мероприятий/площадок

    Параметры:
    - page: Номер страницы
    - page_size: Количество элементов на странице (макс. 100)
    """
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50

    def get_paginated_response(self, data):
        return Response(
            {
                'count': self.page.paginator.count,
                'total_pages': self.page.paginator.num_pages,
                'current_page': self.page.number,
                'results': data
            }
        )