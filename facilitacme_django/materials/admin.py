from django.contrib import admin
from .models import Material, Failure

@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'material_type', 'current_stage']

@admin.register(Failure)
class FailureAdmin(admin.ModelAdmin):
    list_display = ['id', 'description', 'stage', 'material']