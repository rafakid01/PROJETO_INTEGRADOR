# Generated by Django 4.2.7 on 2023-11-21 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0012_alter_administrador_table'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuarios',
            name='categoria',
            field=models.CharField(choices=[('aluno', 'Aluno'), ('monitor', 'Monitor')], max_length=45),
        ),
    ]
