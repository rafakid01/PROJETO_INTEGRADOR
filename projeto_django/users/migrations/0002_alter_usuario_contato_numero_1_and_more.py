# Generated by Django 4.2.7 on 2023-11-23 22:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='contato_numero_1',
            field=models.CharField(blank=True, max_length=15),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='contato_numero_2',
            field=models.CharField(blank=True, max_length=15),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='foto_perfil',
            field=models.TextField(blank=True),
        ),
    ]
