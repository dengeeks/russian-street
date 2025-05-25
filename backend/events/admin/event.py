from django.contrib import admin, messages
from unfold.admin import ModelAdmin, TabularInline

from events.models.event import GalleryEvent, Event, TypeEvent, EventRegistration


class GalleryEventInline(TabularInline):
    """
    Inline-класс для отображения галереи мероприятия в админ панели.
    Этот класс позволяет отображать галерею мероприятия
    в виде таблицы в админ панели.
    """
    model = GalleryEvent


@admin.action(description = 'Подтвердить выбранное мероприятие')
def confirm_event(modeladmin, request, queryset):
    queryset.update(is_moderation = True)
    modeladmin.message_user(
        request,
        f'Мероприятие(я) {queryset} подтверждено(ы)',
        messages.SUCCESS
    )


@admin.register(Event)
class EventAdmin(ModelAdmin):
    """
    Класс администратора для модели Event.
    """
    inlines = (GalleryEventInline,)
    actions = (confirm_event,)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(location__region__owner = request.user)

    def has_view_permission(self, request, obj = None):
        if request.user.is_superuser:
            return True
        if obj is None:
            return True
        return obj.location.region.owner == request.user


@admin.register(TypeEvent)
class TypeEventAdmin(ModelAdmin):
    """
    Класс администратора для модели TypeEvent.
    """
    pass


@admin.register(EventRegistration)
class EventRegistrationAdmin(ModelAdmin):
    """
    Класс администратора для модели Registration
    """
    pass
