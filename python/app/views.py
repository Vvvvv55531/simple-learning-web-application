
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from accounts.models import Product

  
def index(request):
    return render(request, 'app/index.html')

@login_required
def home(request):
      products = Product.objects.all() 
      return render(request, 'app/home.html', {'products': products})