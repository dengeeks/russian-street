from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from feedbacks.serilaizers.feedback import FeedbackCreateSerializer, FeedbackOrganizationCreateSerializer
from feedbacks.services.feedback import FeedbackService, FeedbackOrganizationService
from feedbacks.trottle import FeedbackRateThrottle, FeedbackOrganizationRateThrottle


class FeedbackCreateAPI(APIView):
    """
    API для создания заявки обратной связи от физического лица.
    """
    throttle_classes = [FeedbackRateThrottle]

    def post(self, request):
        serializer = FeedbackCreateSerializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        FeedbackService.create(serializer.validated_data)
        return Response({'detail': 'Заявка успешно отправлена.'}, status = status.HTTP_201_CREATED)


class FeedbackOrganizationCreateAPI(APIView):
    """
    API для создания заявки обратной связи от организации/представителя.
    """
    permission_classes = [IsAuthenticated]
    throttle_classes = [FeedbackOrganizationRateThrottle]

    def post(self, request):
        serializer = FeedbackOrganizationCreateSerializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        FeedbackOrganizationService.create(serializer.validated_data, self.request.user)
        return Response({'detail': 'Заявка успешно отправлена.'}, status = status.HTTP_201_CREATED)
