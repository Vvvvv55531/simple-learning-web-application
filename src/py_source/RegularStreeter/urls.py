"""
Definition of urls for RegularStreeter.
"""

from datetime import datetime
from django.urls import path
from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView
from app import forms, views
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .functions import set_value
from .f1 import get_value
from accounts.f_enter import enter
from accounts.f_catalog import products

urlpatterns = [
    path('api/product', products, name='product'),
    path('api/enter', enter, name='enter'),

    path('api/get_value', set_value, name='get_value'),
    path('api/get_value_2', get_value, name='get_value_2'),

    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls1')), 
    path('', views.index, name='index'),
    path('home/', views.home, name='home'),
    path('order/', views.catalog_view, name='order_page'),
]

if settings.DEBUG:  # Обслуживание медиа-файлов только в режиме DEBUG
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
