# Generated by Django 5.0.6 on 2024-06-27 19:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('materials', '0016_alter_failure_stage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='material',
            name='material_type',
            field=models.CharField(choices=[('Instrumental', 'Instrumental'), ('Descartável', 'Descartável'), ('Equipamento', 'Equipamento'), ('Cirúrgico', 'Cirúrgico')], max_length=50),
        ),
    ]
