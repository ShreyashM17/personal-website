"""
WSGI config for portfolio_site project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""
import os

# Default to production settings (since on a real server you'd set the ENV var)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_site.settings.prod')

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
