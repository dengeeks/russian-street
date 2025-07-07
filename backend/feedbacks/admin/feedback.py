from django.contrib import admin
from unfold.admin import ModelAdmin

from common.admin import LinkToDetailMixin
from feedbacks.models.feedback import Feedback, FeedbackOrganization


@admin.register(Feedback)
class FeedbackAdmin(LinkToDetailMixin, ModelAdmin):
    list_display = ('link_to_detail', 'name', 'email', 'phone', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('name', 'email', 'phone')
    readonly_fields = ('link_to_detail', 'created_at', 'updated_at', 'name', 'email', 'phone', 'text')
    fieldsets = (
        (None, {
            'fields': (
                'name',
                'phone',
                'email',
                'text',
                'status',
            )
        }),
        ('Системные поля', {
            'classes': ('collapse',),
            'fields': ('created_at', 'updated_at'),
        }),
    )
    compressed_fields = True

    def has_add_permission(self, request):
        return False


@admin.register(FeedbackOrganization)
class FeedbackOrganizationAdmin(LinkToDetailMixin, ModelAdmin):
    list_display = (
        'link_to_detail', 'last_name', 'first_name', 'email',
        'phone', 'region', 'city', 'status', 'created_at'
    )
    list_filter = ('region', 'city', 'status', 'gender')
    search_fields = (
        'first_name', 'last_name', 'middle_name',
        'email', 'phone', 'passport_series', 'passport_number'
    )
    readonly_fields = (
        'link_to_detail', 'created_at', 'updated_at', 'last_name', 'first_name', 'email', 'phone', 'region', 'city',
        'user', 'middle_name', 'date_of_birth', 'gender', 'social', 'passport_series', 'passport_number',
        'passport_issue_date',
        'passport_issuer'
    )
    fieldsets = (
        ('ФИО и Контакты', {
            'fields': (
                'user', 'last_name', 'first_name', 'middle_name',
                'gender', 'date_of_birth',
                'phone', 'email', 'social',
            )
        }),
        ('Паспортные данные', {
            'fields': (
                'passport_series', 'passport_number',
                'passport_issue_date', 'passport_issuer',
            )
        }),
        ('Регион и город', {
            'fields': ('region', 'city'),
        }),
        ('Статус', {
            'fields': ('status',),
        }),
        ('Системные поля', {
            'classes': ('collapse',),
            'fields': ('created_at', 'updated_at'),
        }),
    )
    compressed_fields = True

    def has_add_permission(self, request):
        return False
