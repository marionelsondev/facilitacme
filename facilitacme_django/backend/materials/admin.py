from django.contrib import admin
from .models import Material, Failure

@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ('name', 'material_type', 'current_stage')
    list_filter = ('material_type', 'current_stage')
    search_fields = ('name',)

@admin.register(Failure)
class FailureAdmin(admin.ModelAdmin):
    list_display = ('description', 'stage', 'material')
    list_filter = ('stage', 'material')
    search_fields = ('description', 'material__name')