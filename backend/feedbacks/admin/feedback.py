from django.contrib import admin
from unfold.admin import ModelAdmin

from feedbacks.models.feedback import Feedback, FeedbackProcessing


@admin.register(Feedback)
class FeedbackAdmin(ModelAdmin):
    """
    Класс администратора для модели Feedback.
    """
    pass


@admin.register(FeedbackProcessing)
class FeedbackProcessing(ModelAdmin):
    """
    Класс администратора для модели FeedbackProcessing.
    """
    pass
