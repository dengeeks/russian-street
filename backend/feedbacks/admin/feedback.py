from django.contrib import admin
from unfold.admin import ModelAdmin

from feedbacks.models.feedback import Feedback, FeedbackOrganization


@admin.register(Feedback)
class FeedbackAdmin(ModelAdmin):
    list_display = ('name', 'email', 'phone', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('name', 'email', 'phone')
    readonly_fields = ('created_at', 'updated_at')
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


@admin.register(FeedbackOrganization)
class FeedbackOrganizationAdmin(ModelAdmin):
    list_display = (
        'last_name', 'first_name', 'email',
        'phone', 'region', 'city', 'status', 'created_at'
    )
    list_filter = ('region', 'city', 'status', 'gender')
    search_fields = (
        'first_name', 'last_name', 'middle_name',
        'email', 'phone', 'passport_series', 'passport_number'
    )
    readonly_fields = ('created_at', 'updated_at')
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
