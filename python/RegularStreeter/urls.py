"""
Definition of urls for RegularStreeter.
"""

from datetime import datetime
from django.urls import path
from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView
from app import forms, views
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls1')), 
    path('', views.index, name='index'),
    path('home/', views.home, name='home'),
]