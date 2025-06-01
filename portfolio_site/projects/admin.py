# projects/admin.py

from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'short_description', 'date_added')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'tags')
    list_filter = ('date_added',)