# blog/models.py

from django.db import models
from django.urls import reverse
from ckeditor_uploader.fields import RichTextUploadingField

class Post(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    excerpt = models.CharField(max_length=300, help_text="Short summary for listing")
    content = RichTextUploadingField(
        config_name='default',  # matches CKEDITOR_CONFIGS['default']
        help_text="Compose your post here with rich formatting."
    )
    featured_image = models.ImageField(
        upload_to='blog/',
        blank=True,
        null=True,
        help_text="Optional: featured image (e.g., 800×600 px)"
    )
    tags = models.CharField(
        max_length=200,
        blank=True,
        help_text="Comma-separated tags (e.g. Django, Python, Tutorial)"
    )
    date_published = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_published']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('blog:detail', kwargs={'slug': self.slug})
