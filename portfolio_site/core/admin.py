from django.contrib import admin
from .models import ContactMessage

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'date_submitted')
    list_filter = ('date_submitted',)
    search_fields = ('name', 'email', 'subject', 'message')
