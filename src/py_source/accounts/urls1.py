from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from django.contrib.auth import views as auth_views
from . import account_views
from .f_enter import enter
from .f_catalog import products

urlpatterns = [
    path('api/product', products, name='product'),
    path('api/enter', enter, name='enter'),

    path('login/', auth_views.LoginView.as_view(template_name='accounts/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='index'), name='logout'),  # выход и перенаправление на главную
    path('register/', account_views.register, name='register'),
]
