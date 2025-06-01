from django.contrib import admin
from django import forms
from ckeditor.widgets import CKEditorWidget
from .models import Post

class PostAdminForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorWidget(config_name='default'))

    class Meta:
        model = Post
        fields = '__all__'

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    form = PostAdminForm
    list_display = ('title', 'slug', 'date_published')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'tags')
    list_filter = ('date_published',)