# Generated by Django 5.0.6 on 2024-06-26 00:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('materials', '0006_remove_material_traceability'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Stage',
        ),
    ]
