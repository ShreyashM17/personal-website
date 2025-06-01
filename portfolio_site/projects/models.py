# projects/models.py

from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)  # for URL, e.g. “my-cool-project”
    short_description = models.CharField(max_length=300)
    description = models.TextField(blank=True)  # full description (optional)
    image = models.ImageField(
        upload_to='projects/',
        blank=True,
        null=True,
        help_text="Upload a representative thumbnail (e.g., 600×400 px)."
    )
    live_link = models.URLField(blank=True, help_text="Optional: link to live demo or repo")
    github_link = models.URLField(blank=True, help_text="Optional: GitHub repo URL")
    tags = models.CharField(
        max_length=200,
        blank=True,
        help_text="Comma-separated tags (e.g. Django, JavaScript, Python)"
    )
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_added']

    def __str__(self):
        return self.title
