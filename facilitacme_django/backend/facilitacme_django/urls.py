from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # URL para a interface administrativa do Django
    path('api/', include('materials.urls')),  # Inclui as URLs do aplicativo 'materials'
]