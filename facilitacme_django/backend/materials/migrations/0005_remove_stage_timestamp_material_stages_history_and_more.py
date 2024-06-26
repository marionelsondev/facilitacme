# Generated by Django 5.0.6 on 2024-06-25 23:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('materials', '0004_remove_material_stages_history_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='stage',
            name='timestamp',
        ),
        migrations.AddField(
            model_name='material',
            name='stages_history',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='material',
            name='current_stage',
            field=models.CharField(choices=[('RECEIVING', 'Recebimento'), ('WASHING', 'Lavagem'), ('PREPARATION', 'Preparo'), ('DISTRIBUTION', 'Distribuição')], default='RECEIVING', max_length=50),
        ),
        migrations.AlterField(
            model_name='material',
            name='material_type',
            field=models.CharField(choices=[('INSTRUMENTALS', 'Instrumentais'), ('DISPOSABLES', 'Descartáveis'), ('CONSUMABLE_MATERIALS', 'Materiais de Consumo'), ('TEXTILE_ARTICLES', 'Artigos Têxteis'), ('IMPLANTS', 'Implantes'), ('GLASS_PLASTICS', 'Vidros e Plásticos'), ('CLEANING_DISINFECTION', 'Materiais de Limpeza e Desinfecção'), ('PACKAGING', 'Embalagens'), ('EQUIPMENT_ACCESSORIES', 'Equipamentos e Acessórios')], max_length=50),
        ),
        migrations.AlterField(
            model_name='material',
            name='traceability',
            field=models.CharField(max_length=200),
        ),
    ]
