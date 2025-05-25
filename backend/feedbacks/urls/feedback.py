from django.urls import path

from feedbacks.views.feedback import FeedbackView, FeedbackProcessingView

urlpatterns = [
    path('feedback/', FeedbackView.as_view(), name = 'feedback'),
    path(
        'feedback-proc/', FeedbackProcessingView.as_view(),
        name = 'feedback_processing'
        ),
]
