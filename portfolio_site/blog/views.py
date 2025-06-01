# blog/views.py

from django.shortcuts import render, get_object_or_404
from .models import Post

def index(request):
    """
    Display all posts, plus build a Python list of unique tags
    and attach a tag_list list to each post.
    """
    all_posts = Post.objects.all()

    # Build a set of all unique tags for the filter buttons
    tag_set = set()
    for post in all_posts:
        if post.tags:
            for t in post.tags.split(','):
                tag_set.add(t.strip())
    tags = sorted(tag_set)

    # Attach a Python list of stripped tags to each post instance:
    for post in all_posts:
        if post.tags:
            post.tag_list = [t.strip() for t in post.tags.split(',')]
        else:
            post.tag_list = []

    return render(request, 'blog/index.html', {
        'posts': all_posts,
        'tags': tags,
    })

def detail(request, slug):
    post = get_object_or_404(Post, slug=slug)
    if post.tags:
        post.tag_list = [t.strip() for t in post.tags.split(',')]
    else:
        post.tag_list = []
    return render(request, 'blog/detail.html', {'post': post})